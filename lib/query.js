// exporting our query for the data to be used in the frontend
export const PRODUCT_QUERY = `
query {
    products {
      data {
        attributes {
          title
          price
          slug
          description
          image {
            data {
              attributes {
                url
                formats
              }
            }
          }
        }
      }
    }
  }
  `;

export const GET_PRODUCT_QUERY = `
  query getProduct($slug: String!) {
    products(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          price
          slug
          description
          image {
            data {
              attributes {
                url
                formats
              }
            }
          }
        }
      }
    }
  }
  `;
