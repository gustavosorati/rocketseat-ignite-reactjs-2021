import { query as q } from "faunadb";
import { fauna } from "../../../../services/fauna";
import { stripe } from "../../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // Buscar o usuario no banco do fauna com o ID {customerID}
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  // Salvar 
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  console.log(createAction)
  if(createAction){
    await fauna.query(
      q.Create(q.Collection("subscriptions"), { data: subscriptionData })
    );
  } else {
    //  Existe dois métodos apra atualizar dados no fauna DB, UPDATE e REPLACE
    // Updade - consigo atualizar alguns dados 
    // Replace - substitui por completo a referncia
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        { data : subscriptionData }
      )
    )
  }
  
}
