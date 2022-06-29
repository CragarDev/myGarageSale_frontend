import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
// console.log("::: ShopContext  - context::: ==>", ShopContext);

export const StateContext = ({ children }) => {
  // adding the data for state
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // increase the quantity
  const increaseQty = () => {
    setQty((previousQty) => previousQty + 1);
  };

  // decrease the quantity
  const decreaseQty = () => {
    setQty((previousQty) => {
      if (previousQty - 1 < 1) {
        return 1;
      }
      return previousQty - 1;
    });
  };

  // add product to cart
  const onAdd = (product, quantity) => {
    // increase the total price
    setTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * quantity);
    // increase the total quantity
    setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + quantity);
    // console.log("::: product-onAdd ::: ==>", product);
    // console.log("::: quantity-onAdd ::: ==>", quantity);
    // check to see if the product is already in the cart
    const exists = cartItems.find((item) => item.slug === product.slug);
    if (exists) {
      setCartItems(cartItems.map((item) => (item.slug === product.slug ? { ...exists, quantity: exists.quantity + quantity } : item)));
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const onRemove = (product) => {
    // decrease the total price
    setTotalPrice((previousTotalPrice) => previousTotalPrice - product.price);
    // decrease the total quantity
    setTotalQuantity((previousTotalQuantity) => previousTotalQuantity - 1);
    const exists = cartItems.find((item) => item.slug === product.slug);
    if (exists.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(cartItems.map((item) => (item.slug === product.slug ? { ...exists, quantity: exists.quantity - 1 } : item)));
    }
  };

  // console.log("::: qty - context.js ::: ==>", qty);
  return <ShopContext.Provider value={{ qty, setQty, increaseQty, decreaseQty, showCart, setShowCart, cartItems, onAdd, onRemove, totalQuantity, totalPrice }}>{children}</ShopContext.Provider>;
};

// export default ShopContext;

export const useStateContext = () => useContext(ShopContext);
