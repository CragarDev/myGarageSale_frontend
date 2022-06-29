import { useStateContext } from "../lib/context";
import { CartWrapper, CartStyle, Card, CardInfo, EmptyCart, CheckOut, Cards } from "../styles/CartStyles";
import { FaShoppingBasket } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Quantity } from "../styles/ProductDetailStyle";
import getStripe from "../lib/getStripe";
import formatMoney from "../lib/formatMoney";

// animations variants
const card = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

const cards = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItems)
    });
    // try {
    //   JSON.parse(data);
    // } catch (error) {
    //   console.log("Error parsing JSON:", error, data);
    // }
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  // // stripe paymentx
  // const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(cartItems)
  //   });
  //   // console.log("::: response ::: ==>", response);
  //   const data = response.json();

  //   // console.log("::: data ::: ==>", data);
  //   await stripe.redirectToCheckout({ sessionId: data.id });
  //   // console.log("::: redirectToCheckout ::: ==>", data.id);
  // };

  return (
    <CartWrapper animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.05 }} onClick={() => setShowCart(false)}>
      <CartStyle initial={{ x: "100%" }} animate={{ x: "0%" }} transition={{ type: "tween" }} exit={{ x: "100%" }} onClick={(e) => e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyCart initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <h1>Your cart is empty</h1>
            <h2>Keep shopping!!!</h2>
            <FaShoppingBasket />
          </EmptyCart>
        )}
        <Cards variants={cards} animate="show" initial="hidden" layout>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                // <Card initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} key={item.slug}>
                // <Card whileHover={{ scale: 1.1 }} onHoverStart={(e) => {}} onHoverEnd={(e) => {}} variants={card} animate="show" initial="hidden" key={item.slug}>
                <Card variants={card} layout key={item.slug}>
                  <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />
                  <CardInfo layout>
                    <h2>{item.title}</h2>
                    <Quantity>
                      <span>Quantity</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                    <h3>{formatMoney(item.price * 100)}</h3>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <CheckOut layout>
            <h3>Subtotal: {formatMoney(totalPrice * 100)}</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </CheckOut>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
