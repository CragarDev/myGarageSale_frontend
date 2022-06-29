import styled from "styled-components";
const { motion } = require("framer-motion");

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  /* display: none; */
`;

export const CartStyle = styled(motion.div)`
  width: 30%;
  padding: 2rem 5rem;
  background: #f1f1f1;
  overflow-y: scroll;
  position: relative;
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  padding: 1.5rem;
  background: grey;
  margin: 2rem 0;
  img {
    width: 30%;
  }
`;

export const CardInfo = styled(motion.div)`
  width: 60%;
  h3 {
    color: gold;
  }
  div {
    display: flex;
    flex-direction: space-between;
  }
`;

export const EmptyCart = styled(motion.div)`
  position: absolute;
  top: 0;
  /* left: 50%; */
  transform: translateX(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;

  svg {
    font-size: 6rem;
    color: var(--secondary);
  }
`;

export const CheckOut = styled(motion.div)`
  button {
    background: var(--primary);
    color: white;
    padding: 1rem 2rem;
    width: 100%;
    margin-top: 2rem;
    cursor: pointer;
    /* border: none; */
  }
`;

export const Cards = styled(motion.div)``;
