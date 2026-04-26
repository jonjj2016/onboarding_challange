'use strict';
(self.webpackChunk_contently_toolkit = self.webpackChunk_contently_toolkit || []).push([
  [199],
  {
    './src/components/modal/modal.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          LongContent: () => LongContent,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => modal_stories,
        }));
      var _templateObject,
        react = __webpack_require__('../../node_modules/react/index.js'),
        Button = __webpack_require__('../../node_modules/@mui/material/Button/Button.js'),
        emotion_styled_browser_esm = __webpack_require__(
          '../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js',
        ),
        DialogTitle = __webpack_require__(
          '../../node_modules/@mui/material/DialogTitle/DialogTitle.js',
        ),
        Dialog = __webpack_require__('../../node_modules/@mui/material/Dialog/Dialog.js'),
        IconButton = __webpack_require__(
          '../../node_modules/@mui/material/IconButton/IconButton.js',
        ),
        DialogContent = __webpack_require__(
          '../../node_modules/@mui/material/DialogContent/DialogContent.js',
        ),
        Close = __webpack_require__('../../node_modules/@mui/icons-material/Close.js'),
        jsx_runtime = __webpack_require__('../../node_modules/react/jsx-runtime.js');
      var StyledDialogTitle = (0, emotion_styled_browser_esm.A)(DialogTitle.A)(
        _templateObject ||
          (_templateObject = (function _taggedTemplateLiteral(e, t) {
            return (
              t || (t = e.slice(0)),
              Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }))
            );
          })(['\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n'])),
      );
      function Modal(_ref) {
        var isOpen = _ref.isOpen,
          onClose = _ref.onClose,
          title = _ref.title,
          children = _ref.children,
          _ref$maxWidth = _ref.maxWidth,
          maxWidth = void 0 === _ref$maxWidth ? 'sm' : _ref$maxWidth;
        return (0, jsx_runtime.jsxs)(Dialog.A, {
          open: isOpen,
          onClose,
          maxWidth,
          fullWidth: !0,
          children: [
            title &&
              (0, jsx_runtime.jsxs)(StyledDialogTitle, {
                children: [
                  title,
                  (0, jsx_runtime.jsx)(IconButton.A, {
                    onClick: onClose,
                    size: 'small',
                    'aria-label': 'close',
                    children: (0, jsx_runtime.jsx)(Close.A, { fontSize: 'small' }),
                  }),
                ],
              }),
            (0, jsx_runtime.jsx)(DialogContent.A, { children }),
          ],
        });
      }
      Modal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Modal',
        props: {
          isOpen: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onClose: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          title: { required: !1, tsType: { name: 'string' }, description: '' },
          children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
          maxWidth: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'sm' | 'md' | 'lg'",
              elements: [
                { name: 'literal', value: "'sm'" },
                { name: 'literal', value: "'md'" },
                { name: 'literal', value: "'lg'" },
              ],
            },
            description: '',
            defaultValue: { value: "'sm'", computed: !1 },
          },
        },
      };
      const modal_stories = { title: 'Components/Modal', component: Modal, tags: ['autodocs'] };
      function ModalDemo({ title, children }) {
        const [isOpen, setIsOpen] = (0, react.useState)(!1);
        return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
          children: [
            (0, jsx_runtime.jsx)(Button.A, {
              variant: 'contained',
              onClick: () => setIsOpen(!0),
              children: 'Open modal',
            }),
            (0, jsx_runtime.jsx)(Modal, { isOpen, onClose: () => setIsOpen(!1), title, children }),
          ],
        });
      }
      const Default = {
          render: () =>
            (0, jsx_runtime.jsx)(ModalDemo, {
              title: 'Unsaved changes',
              children: 'You have unsaved changes. Are you sure you want to leave?',
            }),
        },
        LongContent = {
          render: () =>
            (0, jsx_runtime.jsx)(ModalDemo, {
              title: 'Terms & Conditions',
              children: (0, jsx_runtime.jsx)('div', {
                children: Array.from({ length: 10 }).map((_, i) =>
                  (0, jsx_runtime.jsx)(
                    'p',
                    {
                      children:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    },
                    i,
                  ),
                ),
              }),
            }),
        },
        __namedExportsOrder = ['Default', 'LongContent'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => <ModalDemo title="Unsaved changes">\n      You have unsaved changes. Are you sure you want to leave?\n    </ModalDemo>\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (LongContent.parameters = {
          ...LongContent.parameters,
          docs: {
            ...LongContent.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <ModalDemo title="Terms & Conditions">\n      <div>\n        {Array.from({\n        length: 10\n      }).map((_, i) => <p key={i}>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor\n            incididunt ut labore et dolore magna aliqua.\n          </p>)}\n      </div>\n    </ModalDemo>\n}',
              ...LongContent.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
