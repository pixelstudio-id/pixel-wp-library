import './editor.sass';

( () => {
  var e, t = {
      461: (e, t, r) => {
          "use strict";
          const a = window.wp.i18n
            , o = window.wp.blocks
            , n = window.wp.element;
          var c = r(184)
            , i = r.n(c)
            , l = r(913)
            , s = r.n(l);
          const u = window.wp.blockEditor
            , p = window.wp.components
            , b = window.wp.data
            , d = window.wp.compose
            , f = ["px/tab"]
            , v = {
              name: "px/tab"
          }
            , m = (0,
          d.compose)((0,
          b.withSelect)(( (e, {clientId: t}) => ({
              innerBlocks: e("core/block-editor").getBlocks(t)
          }))), (0,
          b.withDispatch)(( (e, {clientId: t}, {select: r}) => {
              const {getBlock: a} = r("core/block-editor")
                , {updateBlockAttributes: o} = e("core/block-editor")
                , n = a(t)
                , {selectBlock: c} = e(u.store);
              return {
                  selectBlock(e) {
                      c(e)
                  },
                  resetTabOrder() {
                      const e = [];
                      s()(n.innerBlocks.length, (t => {
                          o(n.innerBlocks[t].clientId, {
                              index: t
                          }),
                          e.push(n.innerBlocks[t].attributes.id)
                      }
                      )),
                      o(t, {
                          tabs: e
                      })
                  },
                  updateActiveTab(e) {
                      o(n.clientId, {
                          activeTab: e
                      })
                  }
              }
          }
          )))((function({attributes: e, setAttributes: t, innerBlocks: r, clientId: o, updateActiveTab: c, resetTabOrder: l}) {
              const {defaultTab: s, activeTab: d, layout: {justifyContent: m, orientation: h="horizontal", flexWrap: w="wrap"}={}} = e;
              (0,
              n.useEffect)(( () => {
                  l()
              }
              ), [r]);
              const {getSelectedBlock: g} = (0,
              b.select)(u.store)
                , {innerBlockCount: k, selectedBlock: y, innerBlockIds: _} = (0,
              b.useSelect)((e => ({
                  innerBlockCount: e(u.store).getBlock(o)?.innerBlocks?.length,
                  selectedBlock: g(),
                  innerBlockIds: e(u.store).getBlock(o)?.innerBlocks.map((e => e.attributes.id)).filter((e => void 0 !== e))
              })), [o]);
              (0,
              n.useEffect)(( () => {
                  !d && _.length && (console.log(_),
                  c(_[0]))
              }
              ), [_]),
              (0,
              n.useEffect)(( () => {
                  y && _.includes(y?.attributes?.id) && c(y.attributes.id)
              }
              ), [y]);
              const x = (0,
              u.useBlockProps)({
                  className: i()(),
                  "data-default-tab": s || void 0
              })
                , B = (0,
              u.useInnerBlocksProps)({
                  className: i()("wp-block-px-tabs__inner", {
                      "items-justified-right": "right" === m,
                      "items-justified-space-between": "space-between" === m,
                      "items-justified-left": "left" === m,
                      "items-justified-center": "center" === m,
                      "is-vertical": "vertical" === h,
                      "no-wrap": "nowrap" === w
                  }),
                  style: {
                      gridTemplateColumns: "vertical" !== h ? `repeat(${k}, auto) ${"left" === m ? "1fr" : "auto"}` : void 0,
                      gridTemplateRows: "vertical" === h ? `repeat(${k}, auto) 1fr` : void 0
                  }
              }, {
                  renderAppender: u.InnerBlocks.ButtonBlockAppender,
                  allowedBlocks: f,
                  __experimentalDefaultBlock: v,
                  __experimentalDirectInsert: !0,
                  templateLock: !1,
                  template: [["px/tab", {
                      label: "Tab 1"
                  }, [["core/paragraph", {
                      content: "Tab 1 Content"
                  }]]], ["px/tab", {
                      label: "Tab 2"
                  }, [["core/paragraph", {
                      content: "Tab 2 Content"
                  }]]], ["px/tab", {
                      label: "Tab 3"
                  }, [["core/paragraph", {
                      content: "Tab 3 Content"
                  }]]]]
              });
              return (0,
              n.createElement)(n.Fragment, null, (0,
              n.createElement)(u.InspectorControls, null, (0,
              n.createElement)(p.PanelBody, null, (0,
              n.createElement)(p.SelectControl, {
                  label: (0,
                  a.__)("Default open tab", "simple-tabs-block"),
                  value: s,
                  options: r.map(( (e, t) => ({
                      value: t,
                      label: e.attributes.label
                  }))),
                  onChange: e => t({
                      defaultTab: parseInt(e)
                  })
              }))), (0,
              n.createElement)("div", {
                  ...x
              }, (0,
              n.createElement)("dl", {
                  ...B
              })))
          }
          ))
            , h = [{
              attributes: {
                  uuid: {
                      type: "string"
                  },
                  tabs: {
                      type: "array",
                      default: []
                  },
                  defaultTab: {
                      type: "number",
                      default: 0
                  },
                  activeTab: {
                      type: "string",
                      default: ""
                  }
              },
              save({attributes: e}) {
                  const {uuid: t, tabs: r, defaultTab: o, layout: {justifyContent: c, orientation: l="horizontal", flexWrap: s="wrap"}={}} = e
                    , p = i()("", {
                      "items-justified-right": "right" === c,
                      "items-justified-space-between": "space-between" === c,
                      "items-justified-left": "left" === c,
                      "items-justified-center": "center" === c,
                      "is-vertical": "vertical" === l,
                      "no-wrap": "nowrap" === s
                  });
                  return (0,
                  n.createElement)("div", {
                      ...u.useBlockProps.save({
                          className: p
                      })
                  }, (0,
                  n.createElement)("div", {
                      className: "wp-block-px-tabs__tabs-wrapper"
                  }, (0,
                  n.createElement)("div", {
                      className: "wp-block-px-tabs__tabs",
                      role: "tablist",
                      "aria-orientation": l
                  }, r.map(( (e, t) => {
                      var r, c;
                      return (0,
                      n.createElement)("div", {
                          key: t
                      }, (0,
                      n.createElement)(u.RichText.Content, {
                          value: null !== (r = e?.attributes?.label) && void 0 !== r ? r : (0,
                          a.__)("Title"),
                          tagName: "label",
                          tabIndex: "0",
                          role: "tab",
                          key: t,
                          tabid: t,
                          className: i()("wp-block-px-tab__label", e?.attributes?.className, {
                              active: t === o
                          })
                      }), e?.attributes?.showDescription && (0,
                      n.createElement)(u.RichText.Content, {
                          value: null !== (c = e?.attributes?.description) && void 0 !== c ? c : (0,
                          a.__)("Description"),
                          tagName: "div",
                          className: "wp-block-px-tab__description"
                      }))
                  }
                  )))), (0,
                  n.createElement)("dl", {
                      ...u.useInnerBlocksProps.save({
                          className: "wp-block-px-tabs__inner"
                      })
                  }))
              }
          }];
          (0,
          o.registerBlockType)("px/tabs", {
              edit: m,
              icon: () => (0,
              n.createElement)(p.Icon, {
                  icon: () => (0,
                  n.createElement)(p.SVG, {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24"
                  }, (0,
                  n.createElement)(p.Path, {
                      d: "M19.1 7.8h-7.5v-.7c0-1-.8-1.8-1.8-1.8h-5c-1 0-1.8.8-1.8 1.8v11.6c0 1 .8 1.8 1.8 1.8h14.3c1 0 1.8-.8 1.8-1.8V9.5c0-.9-.8-1.7-1.8-1.7zm.3 10.9c0 .1-.1.3-.3.3H4.9c-.1 0-.3-.1-.3-.3V7.1c0-.1.1-.3.3-.3h5c.1 0 .3.1.3.3V9.2h9.1c.1 0 .3.1.3.3v9.2z"
                  }), (0,
                  n.createElement)(p.Path, {
                      d: "M16.8 13.6H7.2c-.4 0-.7-.3-.7-.8 0-.4.3-.7.7-.7h9.5c.4 0 .8.3.8.7 0 .5-.3.8-.7.8zM16.8 16.6H7.2c-.4 0-.7-.3-.7-.8 0-.4.3-.7.7-.7h9.5c.4 0 .8.3.8.7 0 .5-.3.8-.7.8zM15.1 6.9h-2c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7h2c.4 0 .8.3.8.7-.1.3-.4.7-.8.7zM19.2 6.9h-2c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7h2c.4 0 .8.3.8.7-.1.3-.4.7-.8.7z"
                  }))
              }),
              save: function({attributes: e}) {
                  const {tabs: t, defaultTab: r, layout: {justifyContent: a, orientation: o="horizontal", flexWrap: c="wrap"}={}} = e
                    , l = t.length
                    , s = u.useBlockProps.save({
                      className: i()(),
                      "data-default-tab": r || void 0
                  })
                    , p = u.useInnerBlocksProps.save({
                      className: i()("wp-block-px-tabs__inner", {
                          "items-justified-right": "right" === a,
                          "items-justified-space-between": "space-between" === a,
                          "items-justified-left": "left" === a,
                          "items-justified-center": "center" === a,
                          "is-vertical": "vertical" === o,
                          "no-wrap": "nowrap" === c
                      }),
                      style: {
                        //   gridTemplateColumns: "vertical" !== o ? `repeat(${l}, auto) ${"left" === a ? "1fr" : "auto"}` : void 0,
                        //   gridTemplateRows: "vertical" === o ? `repeat(${l}, auto) 1fr` : void 0
                      }
                  });
                  return (0,
                  n.createElement)("div", {
                      ...s
                  }, (0,
                  n.createElement)("dl", {
                      ...p
                  }))
              },
              deprecated: h,
              example: {
                  attributes: {
                      tabs: ["500", "501", "502"]
                  },
                  innerBlocks: [{
                      name: "px/tab",
                      attributes: {
                          id: "500",
                          index: 0,
                          label: (0,
                          a.__)("Tab 1", "simple-tabs-block")
                      },
                      innerBlocks: [{
                          name: "core/paragraph",
                          attributes: {
                              /* translators: example text. */
                              content: (0,
                              a.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.", "simple-tabs-block")
                          }
                      }]
                  }, {
                      name: "px/tab",
                      attributes: {
                          id: "501",
                          index: 1,
                          label: (0,
                          a.__)("Tab 2", "simple-tabs-block")
                      },
                      innerBlocks: [{
                          name: "core/paragraph",
                          attributes: {
                              /* translators: example text. */
                              content: (0,
                              a.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.")
                          }
                      }]
                  }, {
                      name: "px/tab",
                      attributes: {
                          id: "502",
                          index: 2,
                          label: (0,
                          a.__)("Tab 3", "simple-tabs-block")
                      },
                      innerBlocks: [{
                          name: "core/paragraph",
                          attributes: {
                              /* translators: example text. */
                              content: (0,
                              a.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.")
                          }
                      }]
                  }]
              }
          })
      }
      ,
      184: (e, t) => {
          var r;
          !function() {
              "use strict";
              var a = {}.hasOwnProperty;
              function o() {
                  for (var e = [], t = 0; t < arguments.length; t++) {
                      var r = arguments[t];
                      if (r) {
                          var n = typeof r;
                          if ("string" === n || "number" === n)
                              e.push(r);
                          else if (Array.isArray(r)) {
                              if (r.length) {
                                  var c = o.apply(null, r);
                                  c && e.push(c)
                              }
                          } else if ("object" === n) {
                              if (r.toString !== Object.prototype.toString && !r.toString.toString().includes("[native code]")) {
                                  e.push(r.toString());
                                  continue
                              }
                              for (var i in r)
                                  a.call(r, i) && r[i] && e.push(i)
                          }
                      }
                  }
                  return e.join(" ")
              }
              e.exports ? (o.default = o,
              e.exports = o) : void 0 === (r = function() {
                  return o
              }
              .apply(t, [])) || (e.exports = r)
          }()
      }
      ,
      705: (e, t, r) => {
          var a = r(639).Symbol;
          e.exports = a
      }
      ,
      239: (e, t, r) => {
          var a = r(705)
            , o = r(607)
            , n = r(333)
            , c = a ? a.toStringTag : void 0;
          e.exports = function(e) {
              return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : c && c in Object(e) ? o(e) : n(e)
          }
      }
      ,
      545: e => {
          e.exports = function(e, t) {
              for (var r = -1, a = Array(e); ++r < e; )
                  a[r] = t(r);
              return a
          }
      }
      ,
      561: (e, t, r) => {
          var a = r(990)
            , o = /^\s+/;
          e.exports = function(e) {
              return e ? e.slice(0, a(e) + 1).replace(o, "") : e
          }
      }
      ,
      290: (e, t, r) => {
          var a = r(557);
          e.exports = function(e) {
              return "function" == typeof e ? e : a
          }
      }
      ,
      957: (e, t, r) => {
          var a = "object" == typeof r.g && r.g && r.g.Object === Object && r.g;
          e.exports = a
      }
      ,
      607: (e, t, r) => {
          var a = r(705)
            , o = Object.prototype
            , n = o.hasOwnProperty
            , c = o.toString
            , i = a ? a.toStringTag : void 0;
          e.exports = function(e) {
              var t = n.call(e, i)
                , r = e[i];
              try {
                  e[i] = void 0;
                  var a = !0
              } catch (e) {}
              var o = c.call(e);
              return a && (t ? e[i] = r : delete e[i]),
              o
          }
      }
      ,
      333: e => {
          var t = Object.prototype.toString;
          e.exports = function(e) {
              return t.call(e)
          }
      }
      ,
      639: (e, t, r) => {
          var a = r(957)
            , o = "object" == typeof self && self && self.Object === Object && self
            , n = a || o || Function("return this")();
          e.exports = n
      }
      ,
      990: e => {
          var t = /\s/;
          e.exports = function(e) {
              for (var r = e.length; r-- && t.test(e.charAt(r)); )
                  ;
              return r
          }
      }
      ,
      557: e => {
          e.exports = function(e) {
              return e
          }
      }
      ,
      218: e => {
          e.exports = function(e) {
              var t = typeof e;
              return null != e && ("object" == t || "function" == t)
          }
      }
      ,
      5: e => {
          e.exports = function(e) {
              return null != e && "object" == typeof e
          }
      }
      ,
      448: (e, t, r) => {
          var a = r(239)
            , o = r(5);
          e.exports = function(e) {
              return "symbol" == typeof e || o(e) && "[object Symbol]" == a(e)
          }
      }
      ,
      913: (e, t, r) => {
          var a = r(545)
            , o = r(290)
            , n = r(554)
            , c = 4294967295
            , i = Math.min;
          e.exports = function(e, t) {
              if ((e = n(e)) < 1 || e > 9007199254740991)
                  return [];
              var r = c
                , l = i(e, c);
              t = o(t),
              e -= c;
              for (var s = a(l, t); ++r < e; )
                  t(r);
              return s
          }
      }
      ,
      601: (e, t, r) => {
          var a = r(841);
          e.exports = function(e) {
              return e ? Infinity === (e = a(e)) || e === -1 / 0 ? 17976931348623157e292 * (e < 0 ? -1 : 1) : e == e ? e : 0 : 0 === e ? e : 0
          }
      }
      ,
      554: (e, t, r) => {
          var a = r(601);
          e.exports = function(e) {
              var t = a(e)
                , r = t % 1;
              return t == t ? r ? t - r : t : 0
          }
      }
      ,
      841: (e, t, r) => {
          var a = r(561)
            , o = r(218)
            , n = r(448)
            , c = /^[-+]0x[0-9a-f]+$/i
            , i = /^0b[01]+$/i
            , l = /^0o[0-7]+$/i
            , s = parseInt;
          e.exports = function(e) {
              if ("number" == typeof e)
                  return e;
              if (n(e))
                  return NaN;
              if (o(e)) {
                  var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                  e = o(t) ? t + "" : t
              }
              if ("string" != typeof e)
                  return 0 === e ? e : +e;
              e = a(e);
              var r = i.test(e);
              return r || l.test(e) ? s(e.slice(2), r ? 2 : 8) : c.test(e) ? NaN : +e
          }
      }
  }, r = {};
  function a(e) {
      var o = r[e];
      if (void 0 !== o)
          return o.exports;
      var n = r[e] = {
          exports: {}
      };
      return t[e](n, n.exports, a),
      n.exports
  }
  a.m = t,
  e = [],
  a.O = (t, r, o, n) => {
      if (!r) {
          var c = 1 / 0;
          for (u = 0; u < e.length; u++) {
              for (var [r,o,n] = e[u], i = !0, l = 0; l < r.length; l++)
                  (!1 & n || c >= n) && Object.keys(a.O).every((e => a.O[e](r[l]))) ? r.splice(l--, 1) : (i = !1,
                  n < c && (c = n));
              if (i) {
                  e.splice(u--, 1);
                  var s = o();
                  void 0 !== s && (t = s)
              }
          }
          return t
      }
      n = n || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > n; u--)
          e[u] = e[u - 1];
      e[u] = [r, o, n]
  }
  ,
  a.n = e => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, {
          a: t
      }),
      t
  }
  ,
  a.d = (e, t) => {
      for (var r in t)
          a.o(t, r) && !a.o(e, r) && Object.defineProperty(e, r, {
              enumerable: !0,
              get: t[r]
          })
  }
  ,
  a.g = function() {
      if ("object" == typeof globalThis)
          return globalThis;
      try {
          return this || new Function("return this")()
      } catch (e) {
          if ("object" == typeof window)
              return window
      }
  }(),
  a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  ( () => {
      var e = {
          68: 0,
          370: 0
      };
      a.O.j = t => 0 === e[t];
      var t = (t, r) => {
          var o, n, [c,i,l] = r, s = 0;
          if (c.some((t => 0 !== e[t]))) {
              for (o in i)
                  a.o(i, o) && (a.m[o] = i[o]);
              if (l)
                  var u = l(a)
          }
          for (t && t(r); s < c.length; s++)
              n = c[s],
              a.o(e, n) && e[n] && e[n][0](),
              e[n] = 0;
          return a.O(u)
      }
        , r = globalThis.webpackChunksimple_tabs_block = globalThis.webpackChunksimple_tabs_block || [];
      r.forEach(t.bind(null, 0)),
      r.push = t.bind(null, r.push.bind(r))
  }
  )();
  var o = a.O(void 0, [370], ( () => a(461)));
  o = a.O(o)
}
)();
