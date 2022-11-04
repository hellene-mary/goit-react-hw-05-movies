import styled from 'styled-components';

export const CastList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 16px;

  margin: 0 auto;
  padding: 10px;
  list-style: none;

  img {
    padding: 10px;
  }
`;

export const NoImage = styled.div`
  width: 200px;
  height: 300px;
  background-color: #727272;
  margin: 10px;
`;
