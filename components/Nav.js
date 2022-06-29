import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import { NavStyle, NavItems } from "../styles/NavStyles";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
const { AnimatePresence, motion } = require("framer-motion");
import User from "./User";
import { useUser } from "@auth0/nextjs-auth0";

export default function Nav() {
  const { showCart, setShowCart, totalQuantity } = useStateContext();
  const { user, error, isLoading } = useUser();
  console.log("::: user :::==>", user);
  return (
    <NavStyle>
      <Link href="/">myGARAGEsale</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantity > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }} transition={{ delay: 0.02, type: "spring" }}>
              {totalQuantity}
            </motion.span>
          )}
          <FaShoppingBasket />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyle>
  );
}
