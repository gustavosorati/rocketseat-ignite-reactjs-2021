import { query as q } from "faunadb";
import { faunadb } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";


export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // Buscar o usuario no banco do Fauna com o ID { customerId }
  const userRef = await faunadb.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  console.log('---------------------------------------')
  console.log('Us')
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  // Salvar os dados da subscription no FaunaDB
  await faunadb.query(
    q.Create(
      q.Collection('subscriptions'),
      { data : subscriptionData }
    )
  )
}