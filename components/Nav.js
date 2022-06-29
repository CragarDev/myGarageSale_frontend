import Link from "next/link";
import { FaShoppingBasket, FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { NavStyle, NavItems, Logo } from "../styles/NavStyles";
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
      <Logo>
        <Link href="/">
          <div>
            <SiHomeassistantcommunitystore />
            <h3>myGARAGEsale</h3>
          </div>
        </Link>
      </Logo>

      <NavItems>
        <a href="mailto:cragardev@gmail.com">
          <div>
            <AiOutlineMail />
            Contact
          </div>
        </a>
        <a href="https://github.com/CragarDev/myGarageSale_frontend" target="_blank" rel="noopener noreferrer">
          <div>
            <FaGithub />
            Code
          </div>
        </a>
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
