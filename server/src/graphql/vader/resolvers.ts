import type { VaderDataSource } from './VaderDataSource';

interface VaderContext {
  dataSources: { vader: VaderDataSource };
}

type ContentRef = { id: string };

export const resolvers = {
  Query: {
    product: (_: unknown, { id }: { id: string }, { dataSources }: VaderContext) =>
      dataSources.vader.getProduct(id),

    products: (
      _: unknown,
      args: { page?: number; pageSize?: number; search?: string },
      { dataSources }: VaderContext,
    ) => {
      const params: Record<string, string> = {};
      if (args.page) params['page'] = String(args.page);
      if (args.pageSize) params['page_size'] = String(args.pageSize);
      if (args.search) params['search'] = args.search;
      return dataSources.vader.getProducts(params);
    },
  },

  Mutation: {
    updateContentProducts: (
      _: unknown,
      { contentId, productIds }: { contentId: string; productIds: string[] },
      { dataSources }: VaderContext,
    ) => dataSources.vader.updateContentProducts(contentId, productIds),
  },

  Content: {
    // Gateway calls this for each Content entity that needs products resolved.
    // DataLoader in VaderDataSource batches all of these into one REST call.
    __resolveReference: (ref: ContentRef, { dataSources }: VaderContext) =>
      dataSources.vader.getProductsForContent(ref.id).then((products) => ({
        id: ref.id,
        products,
      })),
  },
};
