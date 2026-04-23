import gql from 'graphql-tag';

export const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    product(id: ID!): Product
    products(page: Int, pageSize: Int, search: String): ProductsResult!
  }

  type Mutation {
    updateContentProducts(contentId: ID!, productIds: [ID!]!): UpdateProductsResult!
  }

  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
    imageUrl: String!
  }

  type Content @key(fields: "id") {
    id: ID!
    products: [Product!]!
  }

  type UpdateProductsResult {
    contentId: ID!
    productIds: [ID!]!
  }

  type ProductsResult {
    data: [Product!]!
    meta: PaginationMeta!
  }

  type PaginationMeta @shareable {
    total: Int!
    page: Int!
    pageSize: Int!
  }
`;
