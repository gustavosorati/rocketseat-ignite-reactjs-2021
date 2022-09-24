import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

// Converte Stream em String
async function buffer (readable: Readable) {
  const chunks = [];

  for await (const chunk of readable){
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

// Por padrão o Next tem um formato de entender como as requisições estão vindo
// por padrão geralmente JSON, mas nesse caso é uma stream(readable), então
// desabilitamos o entendimento padrão do que está vindo na requisição
export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvent = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export default async (req: NextApiRequest, res: NextApiResponse) => { 
  // console.log('evento recebido')

  // No momento que recebermos a requisição, leremos ela utilizando o Readable
  if(req.method === "POST") {
    const buf = await buffer(req);

    // isso é uma rota que pode ser acessada externamente caso alguem descubra, então se um usuário descobre
    // essa rota ele pode começar a fazer coisas indesejadas.
    // Então é muito comum quando precisa existir uma comunicação com webhooks, a aplicação terceira manda um código
    // para o app, para saber que é uma comunicação real e segura
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
       event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err){
      return res.status(400).send('Webhook error: ' + err.message);
    }

    const type = event.type;

    if(relevantEvent.has(type)){
      // console.log('Evento recebido', event);

      try{
        switch(type) {



          case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );

            break;
          default:
            // sentry, bugsnag -> errp que não é tratado como erro
            throw new Error('Unhandled event.')
        }
      } catch (err){
        return res.json({ error : 'Webhook handler failed' });
      }
    }
    
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');

  }

}