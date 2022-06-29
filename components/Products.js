// import styled from "styled-components";
import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
  // get product from props
  const { title, price, description, image, slug } = product.attributes;

  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{formatMoney(price * 100)}</h3>
      {/* <PriceStyle>${price}</PriceStyle> */}
      {/* <p>{slug}</p> */}
      <p>{description}</p>
    </ProductStyle>
  );
}

// const PriceStyle = styled.h4`
//   color: green;
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin: 30px;
//   padding: 0;
//   text-align: left;
//   margin-top: -1rem;
//   margin-right: 1rem;
//   margin-bottom: 1rem;
// `;
