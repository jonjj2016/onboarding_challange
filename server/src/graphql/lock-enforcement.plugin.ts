import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { ArgumentNode, FieldNode, GraphQLError } from 'graphql';

import { ILockRepository } from '../modules/lock-content/lock-content.interface';

// Maps mutation field name → the argument that carries the content ID
const LOCKED_MUTATIONS: Record<string, string> = {
  updateContent: 'id',
  updateContentProducts: 'contentId',
};

interface UserContext {
  user?: { sub: string; name: string; email: string };
}

export const createLockEnforcementPlugin = (
  lockRepository: ILockRepository,
): ApolloServerPlugin<UserContext> => {
  return {
    async requestDidStart(): Promise<GraphQLRequestListener<UserContext>> {
      return {
        async didResolveOperation({ request, document, contextValue }) {
          for (const def of document.definitions) {
            if (def.kind !== 'OperationDefinition' || def.operation !== 'mutation') continue;

            for (const selection of def.selectionSet.selections) {
              if (selection.kind !== 'Field') continue;

              const field = selection as FieldNode;
              const contentIdArgName = LOCKED_MUTATIONS[field.name.value];
              if (!contentIdArgName) continue;

              const contentId = resolveArgValue(field, contentIdArgName, request.variables);
              if (!contentId) continue;

              const lock = await lockRepository.getLock(contentId);
              if (!lock) continue;

              if (lock.userId !== contextValue.user?.sub) {
                throw new GraphQLError(`Content is locked by ${lock.userName}`, {
                  extensions: { code: 'CONTENT_LOCKED', http: { status: 423 } },
                });
              }
            }
          }
        },
      };
    },
  };
};

const resolveArgValue = (
  field: FieldNode,
  argName: string,
  variables?: Record<string, unknown>,
): string | null => {
  const arg = field.arguments?.find((a: ArgumentNode) => a.name.value === argName);
  if (!arg) return null;

  if (arg.value.kind === 'StringValue') return arg.value.value;
  if (arg.value.kind === 'Variable') {
    const varName = arg.value.name.value;
    return (variables?.[varName] as string) ?? null;
  }
  return null;
};
