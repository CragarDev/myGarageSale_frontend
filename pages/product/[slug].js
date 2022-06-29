import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { Detail, Info, Quantity, Buy } from "../../styles/ProductDetailStyle";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";

// example one way of doing this
// import ShopContext from "../../lib/context";
// import { useContext } from "react";

// console.log("::: ShopContext - slug ::: ==>", ShopContext);

// import styles from "../styles/about.module.css"; -- Using the css styling can make your code bloated

export default function ProductDetails() {
  // fetch slug from url
  const { query } = useRouter();
  // console.log("::: query ::: ==>", query.slug);

  // reset the qty to 1 when the product is added to the cart
  useEffect(() => {
    setQty(1);
  }, []);

  // example of using context and state
  // const { qty } = useContext(ShopContext);
  const { qty, setQty, increaseQty, decreaseQty, onAdd } = useStateContext();
  // console.log("::: qty - slug ::: ==>", qty);

  // fetch graphql query
  const [results] = useQuery({ query: GET_PRODUCT_QUERY, variables: { slug: query.slug } });
  // console.log("::: results ::: ==>", results);
  // data, error, fetching from results
  const { data, error, fetching } = results;

  if (fetching) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  // const products = data.products.data;
  // console.log("::: data.products.data[0] ::: ==>", data.products.data[0]);

  // destructuring the data
  const { title, price, description, image, slug } = data.products.data[0].attributes;
  // console.log("::: data.products.data[0].attributes ::: ==>", data.products.data[0].attributes);

  // create a toast
  const notify = () => {
    qty === 1 ? toast.success(`${qty} ${title} has been added to the cart!`, { duration: 1500 }) : toast.success(`${qty} ${title}'s have been added to the cart!`, { duration: 1500 });
  };

  return (
    <>
      <div>
        {/* <Link href={"/"}>Home</Link> */}
        {/* <h1>My Garage Sale - Details Page</h1> */}
        <Detail>
          <img src={image.data.attributes.formats.medium.url} alt={title} />

          <Info>
            <div>
              <h2>{title}</h2>
              <h3>${price}</h3>
              <p>{description}</p>
            </div>
            <Quantity>
              <span>Quantity</span>
              <button onClick={decreaseQty}>
                <AiFillMinusCircle />
              </button>
              <p>{qty}</p>
              <button onClick={increaseQty}>
                <AiFillPlusCircle />
              </button>
            </Quantity>
            <Buy
              onClick={() => {
                onAdd(data.products.data[0].attributes, qty);
                notify();
              }}
              className="button-block"
            >
              Add to cart
            </Buy>
          </Info>
        </Detail>
        {/* <Link href={"/about"}>About</Link> */}
      </div>
    </>
  );
}
