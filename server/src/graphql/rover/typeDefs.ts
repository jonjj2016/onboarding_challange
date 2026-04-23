import gql from 'graphql-tag';

export const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    content(id: ID!): Content
    contents(
      page: Int
      pageSize: Int
      search: String
      status: Int
      authorId: ID
      site: String
      sort: String
    ): ContentsResult!
    author(id: ID!): Author
    authors(page: Int, pageSize: Int, search: String): AuthorsResult!
    isSlugAvailable(slug: String!, site: String!, excludeId: ID): Boolean!
  }

  type Mutation {
    createContent(input: CreateContentInput!): Content!
    updateContent(id: ID!, input: UpdateContentInput!): Content!
  }

  type Content @key(fields: "id") {
    id: ID!
    title: String!
    slug: String!
    body: String!
    status: Int!
    authorId: ID!
    author: Author!
    site: String!
    createdAt: String!
    updatedAt: String!
  }

  type Author @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  type ContentsResult {
    data: [Content!]!
    meta: PaginationMeta!
  }

  type AuthorsResult {
    data: [Author!]!
    meta: PaginationMeta!
  }

  type PaginationMeta @shareable {
    total: Int!
    page: Int!
    pageSize: Int!
  }

  input CreateContentInput {
    title: String!
    slug: String!
    body: String!
    authorId: ID!
    site: String!
  }

  input UpdateContentInput {
    title: String
    slug: String
    body: String
    authorId: ID
    status: Int
  }
`;
