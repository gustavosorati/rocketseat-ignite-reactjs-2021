import Head from 'next/head';
import { GetServerSideProps, GetStaticProps } from 'next';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"  />
      </main>
    </>
  )
}

// SSR
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1J0bACKKZhmsP0BkyDitfyog', {
//     expand: ['product'] // tem acesso a todas informações do produto
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price.unit_amount / 100)
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// SSG
export const getStaticProps: GetStaticProps = async () => {
    // const test = await stripe.prices.list({
    //   limit: 3,
    // })

    
    const price = await stripe.prices.retrieve('price_1J0bACKKZhmsP0BkyDitfyog', {
      expand: ['product'] // tem acesso além do price aos subfilhos do objeto product todas informações do produto
    });
    

    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price.unit_amount / 100)
    }

    console.log(product);

    return {
      props: {
        product
      },
      revalidate: 60 * 60 * 24// 24 horas
    }
  }
