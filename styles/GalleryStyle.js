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
