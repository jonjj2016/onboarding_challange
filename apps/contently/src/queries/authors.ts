import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GET_AUTHORS($search: String, $pageSize: Int) {
    authors(search: $search, pageSize: $pageSize) {
      data {
        id
        name
        email
      }
    }
  }
`;
