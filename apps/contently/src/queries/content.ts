import { gql } from '@apollo/client';

export const GET_CONTENTS = gql`
  query GET_CONTENTS(
    $site: String!
    $page: Int
    $pageSize: Int
    $search: String
    $status: Int
    $authorId: ID
    $sort: String
  ) {
    contents(
      site: $site
      page: $page
      pageSize: $pageSize
      search: $search
      status: $status
      authorId: $authorId
      sort: $sort
    ) {
      data {
        id
        title
        slug
        status
        updatedAt
        author {
          id
          name
        }
        products {
          id
        }
      }
      meta {
        total
        page
        pageSize
      }
    }
  }
`;

export const GET_CONTENT = gql`
  query GET_CONTENT($id: ID!) {
    content(id: $id) {
      id
      title
      slug
      body
      status
      authorId
      site
      updatedAt
      author {
        id
        name
        email
      }
      products {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const IS_SLUG_AVAILABLE = gql`
  query IS_SLUG_AVAILABLE($slug: String!, $site: String!, $excludeId: ID) {
    isSlugAvailable(slug: $slug, site: $site, excludeId: $excludeId)
  }
`;
