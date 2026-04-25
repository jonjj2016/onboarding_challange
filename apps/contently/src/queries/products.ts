import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($search: String, $pageSize: Int) {
    products(search: $search, pageSize: $pageSize) {
      data {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
