import { useRouter } from "next/router";
import Image from "next/image";
import thankYou from "../public/assets/images/thankYou.jpg";
import { SuccessWrapper, SuccessCard, Address, OrderInfo, InfoWrapper } from "../styles/SuccessStyles";
import formatMoney from "../lib/formatMoney";

const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export async function getServerSideProps(params) {
  console.log(params.query);
  const order = await stripe.checkout.sessions.retrieve(params.query.session_id, {
    expand: ["line_items"]
  });
  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  console.log("order", order);
  return (
    <SuccessWrapper>
      <SuccessCard animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.75 }}>
        <h1>
          Thank you <span>{order.customer_details.name}</span> for your order!
        </h1>
        <h3>A confirmation email has been sent to:</h3>
        <h2>{order.customer_details.email}</h2>

        <InfoWrapper>
          <Address>
            <h2>Address:</h2>
            {/* <h3>{order.customer_details.address.country}</h3>
                <br />
                <h3>{order.customer_details.address.line1}</h3>
                <h3>{order.customer_details.address.line2}</h3>
                <h4>
                  {order.customer_details.address.city},{' '}
                  {order.customer_details.address.state}{' '}
                  {order.customer_details.address.postal_code}
                </h4> */}
            {Object.entries(order.customer_details.address).map(([key, value]) => (
              <p key={key}>
                {key} : {value}
              </p>
            ))}
          </Address>
          <OrderInfo>
            <h2>Products:</h2>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                {/* <Image src={} /> */}
                <h3>Product: {item.description}</h3>
                <h4>Quantity: {item.quantity}</h4>
                <h4>Item Price: {formatMoney(item.price.unit_amount)}</h4>
                <h4>SubTotal: {formatMoney(item.amount_total)}</h4>
                <br />
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <div>
          <h2>Total Amount Purchased: {formatMoney(order.amount_total)}</h2>
        </div>
        <button onClick={() => route.push("/")}>Continue Shopping</button>
        <Image src={thankYou} alt="Thank You" width="300px" height="80px" />
      </SuccessCard>
    </SuccessWrapper>
  );
}
