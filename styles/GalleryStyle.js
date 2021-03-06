import styled from "styled-components";

export const GalleryStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
  h1 {
    margin-top: 0;
  }
  h3 {
    margin-bottom: 1rem;
  }
`;

export const GalleryHeaders = styled.div`
  h1 {
    margin: 1rem 0;
    padding: 0;
    color: white;
  }
  h3 {
    color: red;
    margin-bottom: 1rem;
  }
`;
