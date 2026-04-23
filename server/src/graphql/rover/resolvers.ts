import type { RoverDataSource, Content, Author } from './RoverDataSource';

interface RoverContext {
  dataSources: { rover: RoverDataSource };
}

type ContentRef = { id: string };
type AuthorRef = { id: string };

export const resolvers = {
  Query: {
    content: (_: unknown, { id }: { id: string }, { dataSources }: RoverContext) =>
      dataSources.rover.getContent(id),

    contents: (
      _: unknown,
      args: {
        page?: number;
        pageSize?: number;
        search?: string;
        status?: number;
        authorId?: string;
        site?: string;
        sort?: string;
      },
      { dataSources }: RoverContext,
    ) => {
      const params: Record<string, string> = {};
      if (args.page) params['page'] = String(args.page);
      if (args.pageSize) params['page_size'] = String(args.pageSize);
      if (args.search) params['search'] = args.search;
      if (args.status !== undefined) params['status'] = String(args.status);
      if (args.authorId) params['author_id'] = args.authorId;
      if (args.site) params['site'] = args.site;
      if (args.sort) params['sort'] = args.sort;
      return dataSources.rover.getContents(params);
    },

    author: (_: unknown, { id }: { id: string }, { dataSources }: RoverContext) =>
      dataSources.rover.getAuthorById(id),

    authors: (
      _: unknown,
      args: { page?: number; pageSize?: number; search?: string },
      { dataSources }: RoverContext,
    ) => {
      const params: Record<string, string> = {};
      if (args.page) params['page'] = String(args.page);
      if (args.pageSize) params['page_size'] = String(args.pageSize);
      if (args.search) params['search'] = args.search;
      return dataSources.rover.getAuthors(params);
    },

    isSlugAvailable: (
      _: unknown,
      { slug, site, excludeId }: { slug: string; site: string; excludeId?: string },
      { dataSources }: RoverContext,
    ) => dataSources.rover.isSlugAvailable(slug, site, excludeId),
  },

  Mutation: {
    createContent: (
      _: unknown,
      { input }: { input: Record<string, unknown> },
      { dataSources }: RoverContext,
    ) => {
      // Map camelCase GraphQL input back to snake_case for the REST API
      const { authorId, ...rest } = input as { authorId: string } & Record<string, unknown>;
      return dataSources.rover.createContent({ ...rest, author_id: authorId });
    },

    updateContent: (
      _: unknown,
      { id, input }: { id: string; input: Record<string, unknown> },
      { dataSources }: RoverContext,
    ) => {
      const { authorId, ...rest } = input as { authorId?: string } & Record<string, unknown>;
      const payload = authorId ? { ...rest, author_id: authorId } : rest;
      return dataSources.rover.updateContent(id, payload);
    },
  },

  Content: {
    // Called by the gateway when it needs to hydrate a Content entity by id
    __resolveReference: (ref: ContentRef, { dataSources }: RoverContext) =>
      dataSources.rover.getContent(ref.id),

    // Resolves the author field — DataLoader batches these across content list
    author: (content: Content, _: unknown, { dataSources }: RoverContext) =>
      dataSources.rover.getAuthorById(content.authorId),
  },

  Author: {
    __resolveReference: (ref: AuthorRef, { dataSources }: RoverContext) =>
      dataSources.rover.getAuthorById(ref.id),
  },
};
