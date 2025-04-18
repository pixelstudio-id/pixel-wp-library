import './editor.sass';

( () => {
  var e = {
      184: (e, t) => {
          var a;
          !function() {
              "use strict";
              var c = {}.hasOwnProperty;
              function l() {
                  for (var e = [], t = 0; t < arguments.length; t++) {
                      var a = arguments[t];
                      if (a) {
                          var n = typeof a;
                          if ("string" === n || "number" === n)
                              e.push(a);
                          else if (Array.isArray(a)) {
                              if (a.length) {
                                  var o = l.apply(null, a);
                                  o && e.push(o)
                              }
                          } else if ("object" === n) {
                              if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]")) {
                                  e.push(a.toString());
                                  continue
                              }
                              for (var r in a)
                                  c.call(a, r) && a[r] && e.push(r)
                          }
                      }
                  }
                  return e.join(" ")
              }
              e.exports ? (l.default = l,
              e.exports = l) : void 0 === (a = function() {
                  return l
              }
              .apply(t, [])) || (e.exports = a)
          }()
      }
  }
    , t = {};
  function a(c) {
      var l = t[c];
      if (void 0 !== l)
          return l.exports;
      var n = t[c] = {
          exports: {}
      };
      return e[c](n, n.exports, a),
      n.exports
  }
  a.n = e => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, {
          a: t
      }),
      t
  }
  ,
  a.d = (e, t) => {
      for (var c in t)
          a.o(t, c) && !a.o(e, c) && Object.defineProperty(e, c, {
              enumerable: !0,
              get: t[c]
          })
  }
  ,
  a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
  ( () => {
      "use strict";
      const e = window.wp.i18n
        , t = window.wp.blocks
        , c = window.wp.element;
      var l = a(184)
        , n = a.n(l);
      let o = e => crypto.getRandomValues(new Uint8Array(e));
      const r = window.wp.components
        , i = window.wp.blockEditor
        , s = [{
          attributes: {
              index: {
                  type: "number"
              },
              label: {
                  type: "string",
                  default: "Title"
              },
              showDescription: {
                  type: "boolean",
                  default: !1
              },
              description: {
                  type: "string",
                  default: ""
              }
          },
          save({attributes: e}) {
              const {index: t} = e
                , a = i.useInnerBlocksProps.save({
                  tabid: t,
                  className: "wp-block-px-tab"
              });
              return (0,
              c.createElement)("dt", {
                  ...a
              })
          }
      }];
      (0,
      t.registerBlockType)("px/tab", {
          edit: function({attributes: t, setAttributes: a, context: l}) {
              var s;
              const {id: d, index: b, label: p, showDescription: u, description: h} = t;
              (0,
              c.useEffect)(( () => {
                  if (!d) {
                      const e = ( (e, t=21) => ( (e, t, a) => {
                          let c = (2 << Math.log(e.length - 1) / Math.LN2) - 1
                            , l = -~(1.6 * c * t / e.length);
                          return (n=t) => {
                              let o = "";
                              for (; ; ) {
                                  let t = a(l)
                                    , r = l;
                                  for (; r--; )
                                      if (o += e[t[r] & c] || "",
                                      o.length === n)
                                          return o
                              }
                          }
                      }
                      )(e, t, o))("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 11);
                      a({
                          id: e()
                      })
                  }
              }
              ), []);
              const m = (0,
              i.useBlockProps)({
                  className: n()({
                      active: d === l["px/tabs/activeTab"]
                  }),
                  role: "tab",
                  tabIndex: "0",
                  tabid: b
              })
                , v = (0,
              i.useInnerBlocksProps)({
                  tabid: b,
                  className: n()("wp-block-px-tab-content", {
                      active: d === l["px/tabs/activeTab"]
                  }),
                  style: {
                      display: d === l["px/tabs/activeTab"] ? "block" : "none"
                  }
              });
              return (0,
              c.createElement)(c.Fragment, null, (0,
              c.createElement)(i.InspectorControls, null, (0,
              c.createElement)(r.PanelBody, null, (0,
              c.createElement)(r.TextControl, {
                  label: (0,
                  e.__)("Tab label"),
                  value: p,
                  onChange: e => a({
                      label: e
                  })
              }), (0,
              c.createElement)(r.ToggleControl, {
                  label: (0,
                  e.__)("Show description"),
                  checked: u,
                  onChange: () => a({
                      showDescription: !u
                  })
              }))), (0,
              c.createElement)("dt", {
                  ...m
              }, (0,
              c.createElement)(i.RichText, {
                  tagName: "label",
                  value: null !== (s = t?.label) && void 0 !== s ? s : (0,
                  e.__)("Title"),
                  onChange: e => a({
                      label: e
                  }),
                  className: "wp-block-px-tab__label"
              }), u && (0,
              c.createElement)(i.RichText, {
                  "aria-label": (0,
                  e.__)("Description"),
                  placeholder: (0,
                  e.__)("Add text…"),
                  value: h,
                  onChange: e => a({
                      description: e
                  }),
                  identifier: "div",
                  className: "wp-block-px-tab__description"
              })), (0,
              c.createElement)("dd", {
                  ...v
              }))
          },
          icon: () => (0,
          c.createElement)(r.Icon, {
              icon: () => (0,
              c.createElement)(r.SVG, {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24"
              }, (0,
              c.createElement)(r.Path, {
                  d: "M19.1 7.8h-7.5v-.7c0-1-.8-1.8-1.8-1.8h-5c-1 0-1.8.8-1.8 1.8v11.6c0 1 .8 1.8 1.8 1.8h14.3c1 0 1.8-.8 1.8-1.8V9.5c0-.9-.8-1.7-1.8-1.7zm.3 10.9c0 .1-.1.3-.3.3H4.9c-.1 0-.3-.1-.3-.3V7.1c0-.1.1-.3.3-.3h5c.1 0 .3.1.3.3V9.2h9.1c.1 0 .3.1.3.3v9.2z"
              }), (0,
              c.createElement)(r.Path, {
                  d: "M16.8 13.6H7.2c-.4 0-.7-.3-.7-.8 0-.4.3-.7.7-.7h9.5c.4 0 .8.3.8.7 0 .5-.3.8-.7.8zM16.8 16.6H7.2c-.4 0-.7-.3-.7-.8 0-.4.3-.7.7-.7h9.5c.4 0 .8.3.8.7 0 .5-.3.8-.7.8z"
              }))
          }),
          save: function({attributes: t}) {
              const {index: a, label: l, showDescription: n, description: o} = t
                , r = i.useBlockProps.save({
                  role: "tab",
                  tabIndex: "0",
                  tabid: a
              })
                , s = i.useInnerBlocksProps.save({
                  tabid: a,
                  className: "wp-block-px-tab-content"
              });
              return (0,
              c.createElement)(c.Fragment, null, (0,
              c.createElement)("dt", {
                  ...r
              }, (0,
              c.createElement)("label", {
                  className: "wp-block-px-tab__label"
              }, null != l ? l : (0,
              e.__)("Title", "simple-tabs-block")), n && o.length > 0 && (0,
              c.createElement)("div", {
                  "aria-label": "Description",
                  className: "wp-block-px-tab__description"
              }, o)), (0,
              c.createElement)("dd", {
                  ...s
              }))
          },
          deprecated: s,
          example: {
              name: "px/tab",
              attributes: {
                  id: "500",
                  index: 0,
                  label: (0,
                  e.__)("Tab 1", "simple-tabs-block")
              },
              innerBlocks: [{
                  name: "core/paragraph",
                  attributes: {
                      /* translators: example text. */
                      content: (0,
                      e.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.", "simple-tabs-block")
                  }
              }]
          }
      })
  }
  )()
}
)();
