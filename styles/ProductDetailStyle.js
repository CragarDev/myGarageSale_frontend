import styled from "styled-components";

export const Detail = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin-top: 1rem;
  img {
    width: 60%;
  }
`;

export const Info = styled.div`
  width: 40%;
  margin: 0 2rem;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .button-block {
    width: 50%;
    margin: 0.5rem auto;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  button {
    /* margin: 0 1rem; */
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.75rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    margin-right: 1rem;
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;
export const Buy = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;
