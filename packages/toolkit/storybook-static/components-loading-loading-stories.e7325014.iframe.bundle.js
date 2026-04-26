'use strict';
(self.webpackChunk_contently_toolkit = self.webpackChunk_contently_toolkit || []).push([
  [463],
  {
    '../../node_modules/@mui/material/CircularProgress/CircularProgress.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => CircularProgress_CircularProgress });
      var objectWithoutPropertiesLoose = __webpack_require__(
          '../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js',
        ),
        esm_extends = __webpack_require__(
          '../../node_modules/@babel/runtime/helpers/esm/extends.js',
        ),
        react = __webpack_require__('../../node_modules/react/index.js'),
        clsx = __webpack_require__('../../node_modules/clsx/dist/clsx.mjs'),
        composeClasses = __webpack_require__(
          '../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js',
        ),
        emotion_react_browser_esm = __webpack_require__(
          '../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
        ),
        capitalize = __webpack_require__('../../node_modules/@mui/material/utils/capitalize.js'),
        DefaultPropsProvider = __webpack_require__(
          '../../node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js',
        ),
        styled = __webpack_require__('../../node_modules/@mui/material/styles/styled.js'),
        generateUtilityClasses = __webpack_require__(
          '../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js',
        ),
        generateUtilityClass = __webpack_require__(
          '../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js',
        );
      function getCircularProgressUtilityClass(slot) {
        return (0, generateUtilityClass.Ay)('MuiCircularProgress', slot);
      }
      (0, generateUtilityClasses.A)('MuiCircularProgress', [
        'root',
        'determinate',
        'indeterminate',
        'colorPrimary',
        'colorSecondary',
        'svg',
        'circle',
        'circleDeterminate',
        'circleIndeterminate',
        'circleDisableShrink',
      ]);
      var jsx_runtime = __webpack_require__('../../node_modules/react/jsx-runtime.js');
      const _excluded = [
        'className',
        'color',
        'disableShrink',
        'size',
        'style',
        'thickness',
        'value',
        'variant',
      ];
      let _t,
        _t2,
        _t3,
        _t4,
        _ = (t) => t;
      const circularRotateKeyframe = (0, emotion_react_browser_esm.i7)(
          _t ||
            (_t = _`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`),
        ),
        circularDashKeyframe = (0, emotion_react_browser_esm.i7)(
          _t2 ||
            (_t2 = _`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`),
        ),
        CircularProgressRoot = (0, styled.Ay)('span', {
          name: 'MuiCircularProgress',
          slot: 'Root',
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              styles[ownerState.variant],
              styles[`color${(0, capitalize.A)(ownerState.color)}`],
            ];
          },
        })(
          ({ ownerState, theme }) =>
            (0, esm_extends.A)(
              { display: 'inline-block' },
              'determinate' === ownerState.variant && {
                transition: theme.transitions.create('transform'),
              },
              'inherit' !== ownerState.color && {
                color: (theme.vars || theme).palette[ownerState.color].main,
              },
            ),
          ({ ownerState }) =>
            'indeterminate' === ownerState.variant &&
            (0, emotion_react_browser_esm.AH)(
              _t3 ||
                (_t3 = _`
      animation: ${0} 1.4s linear infinite;
    `),
              circularRotateKeyframe,
            ),
        ),
        CircularProgressSVG = (0, styled.Ay)('svg', {
          name: 'MuiCircularProgress',
          slot: 'Svg',
          overridesResolver: (props, styles) => styles.svg,
        })({ display: 'block' }),
        CircularProgressCircle = (0, styled.Ay)('circle', {
          name: 'MuiCircularProgress',
          slot: 'Circle',
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.circle,
              styles[`circle${(0, capitalize.A)(ownerState.variant)}`],
              ownerState.disableShrink && styles.circleDisableShrink,
            ];
          },
        })(
          ({ ownerState, theme }) =>
            (0, esm_extends.A)(
              { stroke: 'currentColor' },
              'determinate' === ownerState.variant && {
                transition: theme.transitions.create('stroke-dashoffset'),
              },
              'indeterminate' === ownerState.variant && {
                strokeDasharray: '80px, 200px',
                strokeDashoffset: 0,
              },
            ),
          ({ ownerState }) =>
            'indeterminate' === ownerState.variant &&
            !ownerState.disableShrink &&
            (0, emotion_react_browser_esm.AH)(
              _t4 ||
                (_t4 = _`
      animation: ${0} 1.4s ease-in-out infinite;
    `),
              circularDashKeyframe,
            ),
        ),
        CircularProgress_CircularProgress = react.forwardRef(
          function CircularProgress(inProps, ref) {
            const props = (0, DefaultPropsProvider.b)({
                props: inProps,
                name: 'MuiCircularProgress',
              }),
              {
                className,
                color = 'primary',
                disableShrink = !1,
                size = 40,
                style,
                thickness = 3.6,
                value = 0,
                variant = 'indeterminate',
              } = props,
              other = (0, objectWithoutPropertiesLoose.A)(props, _excluded),
              ownerState = (0, esm_extends.A)({}, props, {
                color,
                disableShrink,
                size,
                thickness,
                value,
                variant,
              }),
              classes = ((ownerState) => {
                const { classes, variant, color, disableShrink } = ownerState,
                  slots = {
                    root: ['root', variant, `color${(0, capitalize.A)(color)}`],
                    svg: ['svg'],
                    circle: [
                      'circle',
                      `circle${(0, capitalize.A)(variant)}`,
                      disableShrink && 'circleDisableShrink',
                    ],
                  };
                return (0, composeClasses.A)(slots, getCircularProgressUtilityClass, classes);
              })(ownerState),
              circleStyle = {},
              rootStyle = {},
              rootProps = {};
            if ('determinate' === variant) {
              const circumference = 2 * Math.PI * ((44 - thickness) / 2);
              ((circleStyle.strokeDasharray = circumference.toFixed(3)),
                (rootProps['aria-valuenow'] = Math.round(value)),
                (circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`),
                (rootStyle.transform = 'rotate(-90deg)'));
            }
            return (0, jsx_runtime.jsx)(
              CircularProgressRoot,
              (0, esm_extends.A)(
                {
                  className: (0, clsx.A)(classes.root, className),
                  style: (0, esm_extends.A)({ width: size, height: size }, rootStyle, style),
                  ownerState,
                  ref,
                  role: 'progressbar',
                },
                rootProps,
                other,
                {
                  children: (0, jsx_runtime.jsx)(CircularProgressSVG, {
                    className: classes.svg,
                    ownerState,
                    viewBox: '22 22 44 44',
                    children: (0, jsx_runtime.jsx)(CircularProgressCircle, {
                      className: classes.circle,
                      style: circleStyle,
                      ownerState,
                      cx: 44,
                      cy: 44,
                      r: (44 - thickness) / 2,
                      fill: 'none',
                      strokeWidth: thickness,
                    }),
                  }),
                },
              ),
            );
          },
        );
    },
    './src/components/loading/loading.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      __webpack_require__.d(__webpack_exports__, { R: () => Loading });
      var _templateObject,
        _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          '../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js',
        ),
        _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          '../../node_modules/@mui/material/CircularProgress/CircularProgress.js',
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          '../../node_modules/react/jsx-runtime.js',
        );
      var sizeMap = { small: 20, medium: 40, large: 60 },
        Wrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__.A.div(
          _templateObject ||
            (_templateObject = (function _taggedTemplateLiteral(e, t) {
              return (
                t || (t = e.slice(0)),
                Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }))
              );
            })(['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n'])),
        );
      function Loading(_ref) {
        var _ref$size = _ref.size,
          size = void 0 === _ref$size ? 'medium' : _ref$size,
          _ref$isCentered = _ref.isCentered,
          isCentered = void 0 !== _ref$isCentered && _ref$isCentered,
          spinner = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
            _mui_material__WEBPACK_IMPORTED_MODULE_1__.A,
            { size: sizeMap[size] },
          );
        return isCentered
          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Wrapper, {
              style: { minHeight: '100vh' },
              children: spinner,
            })
          : spinner;
      }
      Loading.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Loading',
        props: {
          size: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'small' | 'medium' | 'large'",
              elements: [
                { name: 'literal', value: "'small'" },
                { name: 'literal', value: "'medium'" },
                { name: 'literal', value: "'large'" },
              ],
            },
            description: '',
            defaultValue: { value: "'medium'", computed: !1 },
          },
          isCentered: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/components/loading/loading.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Centered: () => Centered,
          Sizes: () => Sizes,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var _loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/components/loading/loading.tsx',
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          '../../node_modules/react/jsx-runtime.js',
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Components/Loading',
          component: _loading__WEBPACK_IMPORTED_MODULE_0__.R,
          tags: ['autodocs'],
        },
        Sizes = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)('div', {
              style: { display: 'flex', gap: 24, alignItems: 'center' },
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                  _loading__WEBPACK_IMPORTED_MODULE_0__.R,
                  { size: 'small' },
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                  _loading__WEBPACK_IMPORTED_MODULE_0__.R,
                  { size: 'medium' },
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                  _loading__WEBPACK_IMPORTED_MODULE_0__.R,
                  { size: 'large' },
                ),
              ],
            }),
        },
        Centered = {
          args: { isCentered: !0, size: 'medium' },
          decorators: [
            (Story) =>
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)('div', {
                style: { height: 200, border: '1px dashed #ccc' },
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story, {}),
              }),
          ],
        },
        __namedExportsOrder = ['Sizes', 'Centered'];
      ((Sizes.parameters = {
        ...Sizes.parameters,
        docs: {
          ...Sizes.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => <div style={{\n    display: \'flex\',\n    gap: 24,\n    alignItems: \'center\'\n  }}>\n      <Loading size="small" />\n      <Loading size="medium" />\n      <Loading size="large" />\n    </div>\n}',
            ...Sizes.parameters?.docs?.source,
          },
        },
      }),
        (Centered.parameters = {
          ...Centered.parameters,
          docs: {
            ...Centered.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    isCentered: true,\n    size: 'medium'\n  },\n  decorators: [Story => <div style={{\n    height: 200,\n    border: '1px dashed #ccc'\n  }}>\n        <Story />\n      </div>]\n}",
              ...Centered.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
//# sourceMappingURL=components-loading-loading-stories.e7325014.iframe.bundle.js.map
