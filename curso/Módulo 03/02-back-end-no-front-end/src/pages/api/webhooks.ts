import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./auth/_lib/manageSubscription";

// converter Readable em uma String
async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

// Desabilita o entendimento padrão do que ele está recebendo
// pq no caso irá receber um stream
export const config = {
  api: {
    bodyParser: false,
  },
};

// Eventos que serão ouvidos
const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscriptions.created",
  "customer.subscriptions.updated",
  "customer.subscriptions.deleted",

]);


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Aconteceu algo");
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {

          case "customer.subscriptions.created":           
          case "customer.subscriptions.updated":
          case "customer.subscriptions.deleted":

            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id, 
              subscription.customer.toString(),
              type === 'customer.subscriptions.created'
            );

            break;


          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );

            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        //  sentry, bugsnag
        return res.json({ error: "Webhook handle failed" });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
