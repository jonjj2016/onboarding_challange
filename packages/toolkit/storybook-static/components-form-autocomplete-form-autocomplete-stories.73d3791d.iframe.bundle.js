/*! For license information please see components-form-autocomplete-form-autocomplete-stories.73d3791d.iframe.bundle.js.LICENSE.txt */
'use strict';
(self.webpackChunk_contently_toolkit = self.webpackChunk_contently_toolkit || []).push([
  [415],
  {
    './src/components/form-autocomplete/form-autocomplete.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Empty: () => Empty,
          WithSelectedItems: () => WithSelectedItems,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => form_autocomplete_stories,
        }));
      var react = __webpack_require__('../../node_modules/react/index.js'),
        Autocomplete = __webpack_require__(
          '../../node_modules/@mui/material/Autocomplete/Autocomplete.js',
        ),
        TextField = __webpack_require__('../../node_modules/@mui/material/TextField/TextField.js'),
        CircularProgress = __webpack_require__(
          '../../node_modules/@mui/material/CircularProgress/CircularProgress.js',
        ),
        jsx_runtime = __webpack_require__('../../node_modules/react/jsx-runtime.js');
      function _typeof(o) {
        return (
          (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (o) {
                  return typeof o;
                }
              : function (o) {
                  return o &&
                    'function' == typeof Symbol &&
                    o.constructor === Symbol &&
                    o !== Symbol.prototype
                    ? 'symbol'
                    : typeof o;
                }),
          _typeof(o)
        );
      }
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          (r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o));
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                _defineProperty(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                });
        }
        return e;
      }
      function _defineProperty(e, r, t) {
        return (
          (r = (function _toPropertyKey(t) {
            var i = (function _toPrimitive(t, r) {
              if ('object' != _typeof(t) || !t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var i = e.call(t, r || 'default');
                if ('object' != _typeof(i)) return i;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return ('string' === r ? String : Number)(t);
            })(t, 'string');
            return 'symbol' == _typeof(i) ? i : i + '';
          })(r)) in e
            ? Object.defineProperty(e, r, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[r] = t),
          e
        );
      }
      function _regenerator() {
        var e,
          t,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function i(r, n, o, i) {
          var c = n && n.prototype instanceof Generator ? n : Generator,
            u = Object.create(c.prototype);
          return (
            _regeneratorDefine2(
              u,
              '_invoke',
              (function (r, n, o) {
                var i,
                  c,
                  u,
                  f = 0,
                  p = o || [],
                  y = !1,
                  G = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function d(t, r) {
                      return ((i = t), (c = 0), (u = e), (G.n = r), a);
                    },
                  };
                function d(r, n) {
                  for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
                    var o,
                      i = p[t],
                      d = G.p,
                      l = i[2];
                    r > 3
                      ? (o = l === n) && ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = r < 2 && d < i[1])
                          ? ((c = 0), (G.v = n), (G.n = i[1]))
                          : d < l &&
                            (o = r < 3 || i[0] > n || n > l) &&
                            ((i[4] = r), (i[5] = n), (G.n = l), (c = 0)));
                  }
                  if (o || r > 1) return a;
                  throw ((y = !0), n);
                }
                return function (o, p, l) {
                  if (f > 1) throw TypeError('Generator is already running');
                  for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y; ) {
                    i || (c ? (c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : (G.n = u)) : (G.v = u));
                    try {
                      if (((f = 2), i)) {
                        if ((c || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, u)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((u = t.value), c < 2 && (c = 0));
                        } else
                          (1 === c && (t = i.return) && t.call(i),
                            c < 2 &&
                              ((u = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (c = 1)));
                        i = e;
                      } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                    } catch (t) {
                      ((i = e), (c = 1), (u = t));
                    } finally {
                      f = 1;
                    }
                  }
                  return { value: t, done: y };
                };
              })(r, o, i),
              !0,
            ),
            u
          );
        }
        var a = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        t = Object.getPrototypeOf;
        var c = [][n]
            ? t(t([][n]()))
            : (_regeneratorDefine2((t = {}), n, function () {
                return this;
              }),
              t),
          u = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c));
        function f(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, GeneratorFunctionPrototype)
              : ((e.__proto__ = GeneratorFunctionPrototype),
                _regeneratorDefine2(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(u)),
            e
          );
        }
        return (
          (GeneratorFunction.prototype = GeneratorFunctionPrototype),
          _regeneratorDefine2(u, 'constructor', GeneratorFunctionPrototype),
          _regeneratorDefine2(GeneratorFunctionPrototype, 'constructor', GeneratorFunction),
          (GeneratorFunction.displayName = 'GeneratorFunction'),
          _regeneratorDefine2(GeneratorFunctionPrototype, o, 'GeneratorFunction'),
          _regeneratorDefine2(u),
          _regeneratorDefine2(u, o, 'Generator'),
          _regeneratorDefine2(u, n, function () {
            return this;
          }),
          _regeneratorDefine2(u, 'toString', function () {
            return '[object Generator]';
          }),
          (_regenerator = function _regenerator() {
            return { w: i, m: f };
          })()
        );
      }
      function _regeneratorDefine2(e, r, n, t) {
        var i = Object.defineProperty;
        try {
          i({}, '', {});
        } catch (e) {
          i = 0;
        }
        ((_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
          function o(r, n) {
            _regeneratorDefine2(e, r, function (e) {
              return this._invoke(r, n, e);
            });
          }
          r
            ? i
              ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t })
              : (e[r] = n)
            : (o('next', 0), o('throw', 1), o('return', 2));
        }),
          _regeneratorDefine2(e, r, n, t));
      }
      function asyncGeneratorStep(n, t, e, r, o, a, c) {
        try {
          var i = n[a](c),
            u = i.value;
        } catch (n) {
          return void e(n);
        }
        i.done ? t(u) : Promise.resolve(u).then(r, o);
      }
      function _asyncToGenerator(n) {
        return function () {
          var t = this,
            e = arguments;
          return new Promise(function (r, o) {
            var a = n.apply(t, e);
            function _next(n) {
              asyncGeneratorStep(a, r, o, _next, _throw, 'next', n);
            }
            function _throw(n) {
              asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n);
            }
            _next(void 0);
          });
        };
      }
      function _slicedToArray(r, e) {
        return (
          (function _arrayWithHoles(r) {
            if (Array.isArray(r)) return r;
          })(r) ||
          (function _iterableToArrayLimit(r, l) {
            var t =
              null == r
                ? null
                : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
            if (null != t) {
              var e,
                n,
                i,
                u,
                a = [],
                f = !0,
                o = !1;
              try {
                if (((i = (t = t.call(r)).next), 0 === l)) {
                  if (Object(t) !== t) return;
                  f = !1;
                } else
                  for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
              } catch (r) {
                ((o = !0), (n = r));
              } finally {
                try {
                  if (!f && null != t.return && ((u = t.return()), Object(u) !== u)) return;
                } finally {
                  if (o) throw n;
                }
              }
              return a;
            }
          })(r, e) ||
          (function _unsupportedIterableToArray(r, a) {
            if (r) {
              if ('string' == typeof r) return _arrayLikeToArray(r, a);
              var t = {}.toString.call(r).slice(8, -1);
              return (
                'Object' === t && r.constructor && (t = r.constructor.name),
                'Map' === t || 'Set' === t
                  ? Array.from(r)
                  : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                    ? _arrayLikeToArray(r, a)
                    : void 0
              );
            }
          })(r, e) ||
          (function _nonIterableRest() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function FormAutocomplete(_ref) {
        var label = _ref.label,
          value = _ref.value,
          _onChange = _ref.onChange,
          loadOptions = _ref.loadOptions,
          getOptionLabel = _ref.getOptionLabel,
          getOptionKey = _ref.getOptionKey,
          _ref$debounceMs = _ref.debounceMs,
          debounceMs = void 0 === _ref$debounceMs ? 300 : _ref$debounceMs,
          error = _ref.error,
          _ref$isDisabled = _ref.isDisabled,
          isDisabled = void 0 !== _ref$isDisabled && _ref$isDisabled,
          _useState2 = _slicedToArray((0, react.useState)([]), 2),
          options = _useState2[0],
          setOptions = _useState2[1],
          _useState4 = _slicedToArray((0, react.useState)(!1), 2),
          isLoading = _useState4[0],
          setIsLoading = _useState4[1],
          _useState6 = _slicedToArray((0, react.useState)(''), 2),
          inputValue = _useState6[0],
          setInputValue = _useState6[1],
          debounceRef = (0, react.useRef)(null),
          fetchOptions = (0, react.useCallback)(
            function (search) {
              (debounceRef.current && clearTimeout(debounceRef.current),
                (debounceRef.current = setTimeout(
                  _asyncToGenerator(
                    _regenerator().m(function _callee() {
                      var results;
                      return _regenerator().w(
                        function (_context) {
                          for (;;)
                            switch ((_context.p = _context.n)) {
                              case 0:
                                return (
                                  setIsLoading(!0),
                                  (_context.p = 1),
                                  (_context.n = 2),
                                  loadOptions(search)
                                );
                              case 2:
                                ((results = _context.v), setOptions(results));
                              case 3:
                                return ((_context.p = 3), setIsLoading(!1), _context.f(3));
                              case 4:
                                return _context.a(2);
                            }
                        },
                        _callee,
                        null,
                        [[1, , 3, 4]],
                      );
                    }),
                  ),
                  debounceMs,
                )));
            },
            [loadOptions, debounceMs],
          );
        return (
          (0, react.useEffect)(
            function () {
              return (
                fetchOptions(''),
                function () {
                  debounceRef.current && clearTimeout(debounceRef.current);
                }
              );
            },
            [fetchOptions],
          ),
          (0, jsx_runtime.jsx)(Autocomplete.A, {
            multiple: !0,
            value,
            options,
            loading: isLoading,
            disabled: isDisabled,
            inputValue,
            onInputChange: function onInputChange(_, newInput) {
              (setInputValue(newInput), fetchOptions(newInput));
            },
            onChange: function onChange(_, newValue) {
              return _onChange(newValue);
            },
            getOptionLabel,
            isOptionEqualToValue: function isOptionEqualToValue(option, val) {
              return getOptionKey(option) === getOptionKey(val);
            },
            renderInput: function renderInput(params) {
              return (0, jsx_runtime.jsx)(
                TextField.A,
                _objectSpread(
                  _objectSpread({}, params),
                  {},
                  {
                    label,
                    error: !!error,
                    helperText: error,
                    InputProps: _objectSpread(
                      _objectSpread({}, params.InputProps),
                      {},
                      {
                        endAdornment: (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                          children: [
                            isLoading && (0, jsx_runtime.jsx)(CircularProgress.A, { size: 16 }),
                            params.InputProps.endAdornment,
                          ],
                        }),
                      },
                    ),
                  },
                ),
              );
            },
          })
        );
      }
      FormAutocomplete.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'FormAutocomplete',
        props: {
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          value: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'T' }], raw: 'T[]' },
            description: '',
          },
          onChange: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(value: T[]) => void',
              signature: {
                arguments: [
                  { type: { name: 'Array', elements: [{ name: 'T' }], raw: 'T[]' }, name: 'value' },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          loadOptions: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(search: string) => Promise<T[]>',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'search' }],
                return: {
                  name: 'Promise',
                  elements: [{ name: 'Array', elements: [{ name: 'T' }], raw: 'T[]' }],
                  raw: 'Promise<T[]>',
                },
              },
            },
            description: '',
          },
          getOptionLabel: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(option: T) => string',
              signature: {
                arguments: [{ type: { name: 'T' }, name: 'option' }],
                return: { name: 'string' },
              },
            },
            description: '',
          },
          getOptionKey: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(option: T) => string',
              signature: {
                arguments: [{ type: { name: 'T' }, name: 'option' }],
                return: { name: 'string' },
              },
            },
            description: '',
          },
          debounceMs: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '300', computed: !1 },
          },
          error: { required: !1, tsType: { name: 'string' }, description: '' },
          isDisabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
      const form_autocomplete_stories = {
          title: 'Components/FormAutocomplete',
          component: FormAutocomplete,
          tags: ['autodocs'],
        },
        products = [
          { id: '1', name: 'KitchenAid Stand Mixer' },
          { id: '2', name: 'Lodge Cast Iron Skillet' },
          { id: '3', name: 'Le Creuset Dutch Oven' },
        ];
      function AutocompleteDemo({ initialValue }) {
        const [value, setValue] = (0, react.useState)(initialValue);
        return (0, jsx_runtime.jsx)(FormAutocomplete, {
          label: 'Products',
          value,
          onChange: setValue,
          loadOptions: async (search) =>
            products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
          getOptionLabel: (p) => p.name,
          getOptionKey: (p) => p.id,
        });
      }
      const Empty = { render: () => (0, jsx_runtime.jsx)(AutocompleteDemo, { initialValue: [] }) },
        WithSelectedItems = {
          render: () =>
            (0, jsx_runtime.jsx)(AutocompleteDemo, { initialValue: [products[0], products[1]] }),
        },
        __namedExportsOrder = ['Empty', 'WithSelectedItems'];
      ((Empty.parameters = {
        ...Empty.parameters,
        docs: {
          ...Empty.parameters?.docs,
          source: {
            originalSource: '{\n  render: () => <AutocompleteDemo initialValue={[]} />\n}',
            ...Empty.parameters?.docs?.source,
          },
        },
      }),
        (WithSelectedItems.parameters = {
          ...WithSelectedItems.parameters,
          docs: {
            ...WithSelectedItems.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <AutocompleteDemo initialValue={[products[0], products[1]]} />\n}',
              ...WithSelectedItems.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
