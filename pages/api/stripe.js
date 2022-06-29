import Stripe from "stripe";
import { getSession } from "@auth0/nextjs-auth0";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;
  if (user) {
    const stripeId = user["http://localhost:3000/stripe_customer_id"];
    // console.log("::: user :::==>", user);
    if (req.method === "POST") {
      // console.log("::: stripe.js- req.body :::", req.body);
      try {
        // checkout session
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          customer: stripeId,
          mode: "payment",
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB", "AU", "IE", "NZ"]
          },
          // allow for coupons
          allow_promotion_codes: true,
          shipping_options: [{ shipping_rate: `shr_1LF0IUHvhBC9xCSIE8fx2ugW` }, { shipping_rate: "shr_1LF0bXHvhBC9xCSIJfTj0tj9" }],

          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.title,
                  description: item.description,
                  images: [item.image.data.attributes.formats.thumbnail.url]
                },
                unit_amount: item.price * 100
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1
              },
              quantity: item.quantity
            };
          }),
          // success or failure redirect
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cancel`
        });
        res.status(200).json(session);
      } catch (error) {
        console.log("::: stripe.js- error :::", error);
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  } else {
    // console.log("::: user :::==>", user);
    if (req.method === "POST") {
      // console.log("::: stripe.js- req.body :::", req.body);
      try {
        // checkout session
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",

          mode: "payment",
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB", "AU", "IE", "NZ"]
          },
          // allow for coupons
          allow_promotion_codes: true,
          shipping_options: [{ shipping_rate: `shr_1LF0IUHvhBC9xCSIE8fx2ugW` }, { shipping_rate: "shr_1LF0bXHvhBC9xCSIJfTj0tj9" }],

          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.title,
                  description: item.description,
                  images: [item.image.data.attributes.formats.thumbnail.url]
                },
                unit_amount: item.price * 100
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1
              },
              quantity: item.quantity
            };
          }),
          // success or failure redirect
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cancel`
        });
        res.status(200).json(session);
      } catch (error) {
        console.log("::: stripe.js- error :::", error);
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }
} // end handler
