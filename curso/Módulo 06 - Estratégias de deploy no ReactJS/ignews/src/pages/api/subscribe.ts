import { query as q} from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { faunadb } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string;
  }
}
export default async function (req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'POST'){
    const session = await getSession({ req });

    // quando o cliente clicar no painel de compras, cria um customer dentro do painel do stripe
    // ai precisamos saber qual o usuario logado na aplicação, no front end temos o useSession,
    // enquanto na parte do backend do next temos o getSession que busca dos cookies igual o req.cookie

    const user = await faunadb.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customer_id;

    if(!customerId){
      console.log('entorous')
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata
      });

      await faunadb.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id;
    }


    // Cria a checkout session
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1J0bACKKZhmsP0BkyDitfyog', quantity: 1 }
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    console.log('---------------------------------------------------------------')
    console.log('Stripe Checkout Session: ' + stripeCheckoutSession)

    return res.status(200).json({
      sessionId: stripeCheckoutSession.id
    })

  } else {
    // Informa ao HEADER que só estamos aceitando métodos do tipo POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed')
  }
}
