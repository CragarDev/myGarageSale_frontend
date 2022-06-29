import styled from "styled-components";
const { motion } = require("framer-motion");
export const SuccessWrapper = styled.div`
  margin: 5rem 15rem;

  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #f1f1f1;
  padding: 2rem;
  h1 {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  p {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  } */
`;

export const SuccessCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 2rem;
  padding: 3rem 3rem;
  h1 {
    margin: 1rem 0;
    padding: 0;
  }
  h2 {
    margin: 0rem 0rem 2rem 0rem;
    padding: 0;
    color: green;
  }
  span {
    color: green;
  }
  button {
    color: white;
    background: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    cursor: pointer;
    margin: 1rem;
  }
`;

export const Address = styled.div`
  font-size: 1rem;
  width: 100%;
  h2 {
    margin: 0;
    padding: 0;
    color: gold;
  }
`;

export const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  h2 {
    margin: 0rem 0rem 1rem 0rem;
    padding: 0;
    color: gold;
  }
  div {
    padding-bottom: 1rem;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;
