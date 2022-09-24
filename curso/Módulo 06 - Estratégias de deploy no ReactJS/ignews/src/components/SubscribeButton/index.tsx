import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../pages/api/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const {data: session} = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if(!session){
      signIn('github');
      return;
    }

    if(session.activeSubscription){
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = await response.data;
      console.log('sessionID: ' + sessionId)
      // o stripe tem 2 SDK: uma para quando utilizamos no backend com a chave privada e
      // outra no front-end
      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({
        sessionId
      });
    } catch (err) {
      alert(err.message);
    }

    // criação da checkout session
    // não conseguimos escrever aqui o código do checkout do stripe, pois temos uma variavel secreta do stripe que não pode
    // mos torna-la publica

    // no next temos apenas 3 lugares que podemos acessar keys:
    // SSR - só acontece quando a página é renderizada
    // SSG - só acontece quando a página é renderizada
    // API routes

    // Dentro da página API criar um arquivo subscribe, lá que terá a lógica da subscrição
  }


  return  (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
