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

export const UPDATE_CONTENT = gql`
  mutation UPDATE_CONTENT($id: ID!, $input: UpdateContentInput!) {
    updateContent(id: $id, input: $input) {
      id
      title
      slug
      body
      status
      authorId
      updatedAt
      author {
        id
        name
      }
    }
  }
`;

export const CREATE_CONTENT = gql`
  mutation CREATE_CONTENT($input: CreateContentInput!) {
    createContent(input: $input) {
      id
      title
      slug
      status
    }
  }
`;

export const UPDATE_CONTENT_PRODUCTS = gql`
  mutation UPDATE_CONTENT_PRODUCTS($contentId: ID!, $productIds: [ID!]!) {
    updateContentProducts(contentId: $contentId, productIds: $productIds) {
      contentId
      productIds
    }
  }
`;

export const IS_SLUG_AVAILABLE = gql`
  query IS_SLUG_AVAILABLE($slug: String!, $site: String!, $excludeId: ID) {
    isSlugAvailable(slug: $slug, site: $site, excludeId: $excludeId)
  }
`;
