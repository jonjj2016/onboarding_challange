/**
 * Disallows destructuring from Zustand store hooks.
 *
 * Bad:  const { count } = useCountStore()
 * Good: const count = useCountStore(s => s.count)
 *
 * Detected by: VariableDeclarator where the id is ObjectPattern
 * and the init is a CallExpression to a function ending in "Store".
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow destructuring from Zustand store hooks — use selectors instead',
    },
    schema: [],
    messages: {
      noDestructure: "Don't destructure Zustand stores. Use a selector: useStore(s => s.x)",
    },
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        const isDestructured = node.id.type === 'ObjectPattern';
        const isStoreCall =
          node.init?.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier' &&
          node.init.callee.name.endsWith('Store');

        if (isDestructured && isStoreCall) {
          context.report({ node, messageId: 'noDestructure' });
        }
      },
    };
  },
};
