! function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function() {
  return function(e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = n[o] = {
        exports: {},
        id: o,
        loaded: !1
      };
      return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "dist/", t(0)
  }([function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
        }
        return e
      },
      r = n(1),
      a = (o(r), n(6)),
      u = o(a),
      c = n(7),
      f = o(c),
      s = n(8),
      d = o(s),
      l = n(9),
      p = o(l),
      m = n(10),
      b = o(m),
      v = n(11),
      y = o(v),
      g = n(14),
      h = o(g),
      w = [],
      k = !1,
      x = {
        offset: 120,
        delay: 0,
        easing: "ease",
        duration: 400,
        disable: !1,
        once: !1,
        startEvent: "DOMContentLoaded",
        throttleDelay: 99,
        debounceDelay: 50,
        disableMutationObserver: !1
      },
      j = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (e && (k = !0), k) return w = (0, y.default)(w, x), (0, b.default)(w, x.once), w
      },
      O = function() {
        w = (0, h.default)(), j()
      },
      _ = function() {
        w.forEach(function(e, t) {
          e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
        })
      },
      S = function(e) {
        return e === !0 || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && e() === !0
      },
      z = function(e) {
        x = i(x, e), w = (0, h.default)();
        var t = document.all && !window.atob;
        return S(x.disable) || t ? _() : (document.querySelector("body").setAttribute("data-aos-easing", x.easing), document.querySelector("body").setAttribute("data-aos-duration", x.duration), document.querySelector("body").setAttribute("data-aos-delay", x.delay), "DOMContentLoaded" === x.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? j(!0) : "load" === x.startEvent ? window.addEventListener(x.startEvent, function() {
          j(!0)
        }) : document.addEventListener(x.startEvent, function() {
          j(!0)
        }), window.addEventListener("resize", (0, f.default)(j, x.debounceDelay, !0)), window.addEventListener("orientationchange", (0, f.default)(j, x.debounceDelay, !0)), window.addEventListener("scroll", (0, u.default)(function() {
          (0, b.default)(w, x.once)
        }, x.throttleDelay)), x.disableMutationObserver || (0, d.default)("[data-aos]", O), w)
      };
    e.exports = {
      init: z,
      refresh: j,
      refreshHard: O
    }
  }, function(e, t) {}, , , , , function(e, t) {
    (function(t) {
      "use strict";

      function n(e, t, n) {
        function o(t) {
          var n = b,
            o = v;
          return b = v = void 0, k = t, g = e.apply(o, n)
        }

        function r(e) {
          return k = e, h = setTimeout(s, t), _ ? o(e) : g
        }

        function a(e) {
          var n = e - w,
            o = e - k,
            i = t - n;
          return S ? j(i, y - o) : i
        }

        function c(e) {
          var n = e - w,
            o = e - k;
          return void 0 === w || n >= t || n < 0 || S && o >= y
        }

        function s() {
          var e = O();
          return c(e) ? d(e) : void(h = setTimeout(s, a(e)))
        }

        function d(e) {
          return h = void 0, z && b ? o(e) : (b = v = void 0, g)
        }

        function l() {
          void 0 !== h && clearTimeout(h), k = 0, b = w = v = h = void 0
        }

        function p() {
          return void 0 === h ? g : d(O())
        }

        function m() {
          var e = O(),
            n = c(e);
          if (b = arguments, v = this, w = e, n) {
            if (void 0 === h) return r(w);
            if (S) return h = setTimeout(s, t), o(w)
          }
          return void 0 === h && (h = setTimeout(s, t)), g
        }
        var b, v, y, g, h, w, k = 0,
          _ = !1,
          S = !1,
          z = !0;
        if ("function" != typeof e) throw new TypeError(f);
        return t = u(t) || 0, i(n) && (_ = !!n.leading, S = "maxWait" in n, y = S ? x(u(n.maxWait) || 0, t) : y, z = "trailing" in n ? !!n.trailing : z), m.cancel = l, m.flush = p, m
      }

      function o(e, t, o) {
        var r = !0,
          a = !0;
        if ("function" != typeof e) throw new TypeError(f);
        return i(o) && (r = "leading" in o ? !!o.leading : r, a = "trailing" in o ? !!o.trailing : a), n(e, t, {
          leading: r,
          maxWait: t,
          trailing: a
        })
      }

      function i(e) {
        var t = "undefined" == typeof e ? "undefined" : c(e);
        return !!e && ("object" == t || "function" == t)
      }

      function r(e) {
        return !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
      }

      function a(e) {
        return "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) || r(e) && k.call(e) == d
      }

      function u(e) {
        if ("number" == typeof e) return e;
        if (a(e)) return s;
        if (i(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = i(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(l, "");
        var n = m.test(e);
        return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e
      }
      var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        f = "Expected a function",
        s = NaN,
        d = "[object Symbol]",
        l = /^\s+|\s+$/g,
        p = /^[-+]0x[0-9a-f]+$/i,
        m = /^0b[01]+$/i,
        b = /^0o[0-7]+$/i,
        v = parseInt,
        y = "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t && t.Object === Object && t,
        g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self,
        h = y || g || Function("return this")(),
        w = Object.prototype,
        k = w.toString,
        x = Math.max,
        j = Math.min,
        O = function() {
          return h.Date.now()
        };
      e.exports = o
    }).call(t, function() {
      return this
    }())
  }, function(e, t) {
    (function(t) {
      "use strict";

      function n(e, t, n) {
        function i(t) {
          var n = b,
            o = v;
          return b = v = void 0, O = t, g = e.apply(o, n)
        }

        function r(e) {
          return O = e, h = setTimeout(s, t), _ ? i(e) : g
        }

        function u(e) {
          var n = e - w,
            o = e - O,
            i = t - n;
          return S ? x(i, y - o) : i
        }

        function f(e) {
          var n = e - w,
            o = e - O;
          return void 0 === w || n >= t || n < 0 || S && o >= y
        }

        function s() {
          var e = j();
          return f(e) ? d(e) : void(h = setTimeout(s, u(e)))
        }

        function d(e) {
          return h = void 0, z && b ? i(e) : (b = v = void 0, g)
        }

        function l() {
          void 0 !== h && clearTimeout(h), O = 0, b = w = v = h = void 0
        }

        function p() {
          return void 0 === h ? g : d(j())
        }

        function m() {
          var e = j(),
            n = f(e);
          if (b = arguments, v = this, w = e, n) {
            if (void 0 === h) return r(w);
            if (S) return h = setTimeout(s, t), i(w)
          }
          return void 0 === h && (h = setTimeout(s, t)), g
        }
        var b, v, y, g, h, w, O = 0,
          _ = !1,
          S = !1,
          z = !0;
        if ("function" != typeof e) throw new TypeError(c);
        return t = a(t) || 0, o(n) && (_ = !!n.leading, S = "maxWait" in n, y = S ? k(a(n.maxWait) || 0, t) : y, z = "trailing" in n ? !!n.trailing : z), m.cancel = l, m.flush = p, m
      }

      function o(e) {
        var t = "undefined" == typeof e ? "undefined" : u(e);
        return !!e && ("object" == t || "function" == t)
      }

      function i(e) {
        return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
      }

      function r(e) {
        return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || i(e) && w.call(e) == s
      }

      function a(e) {
        if ("number" == typeof e) return e;
        if (r(e)) return f;
        if (o(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = o(t) ? t + "" : t
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(d, "");
        var n = p.test(e);
        return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e
      }
      var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = "Expected a function",
        f = NaN,
        s = "[object Symbol]",
        d = /^\s+|\s+$/g,
        l = /^[-+]0x[0-9a-f]+$/i,
        p = /^0b[01]+$/i,
        m = /^0o[0-7]+$/i,
        b = parseInt,
        v = "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t && t.Object === Object && t,
        y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self,
        g = v || y || Function("return this")(),
        h = Object.prototype,
        w = h.toString,
        k = Math.max,
        x = Math.min,
        j = function() {
          return g.Date.now()
        };
      e.exports = n
    }).call(t, function() {
      return this
    }())
  }, function(e, t) {
    "use strict";

    function n(e) {
      var t = void 0,
        o = void 0,
        i = void 0;
      for (t = 0; t < e.length; t += 1) {
        if (o = e[t], o.dataset && o.dataset.aos) return !0;
        if (i = o.children && n(o.children)) return !0
      }
      return !1
    }

    function o(e, t) {
      var n = window.document,
        o = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        a = new o(i);
      r = t, a.observe(n.documentElement, {
        childList: !0,
        subtree: !0,
        removedNodes: !0
      })
    }

    function i(e) {
      e && e.forEach(function(e) {
        var t = Array.prototype.slice.call(e.addedNodes),
          o = Array.prototype.slice.call(e.removedNodes),
          i = t.concat(o);
        if (n(i)) return r()
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {};
    t.default = o
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o() {
      return navigator.userAgent || navigator.vendor || window.opera || ""
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
          }
        }
        return function(t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t
        }
      }(),
      r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
      a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
      u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
      c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
      f = function() {
        function e() {
          n(this, e)
        }
        return i(e, [{
          key: "phone",
          value: function() {
            var e = o();
            return !(!r.test(e) && !a.test(e.substr(0, 4)))
          }
        }, {
          key: "mobile",
          value: function() {
            var e = o();
            return !(!u.test(e) && !c.test(e.substr(0, 4)))
          }
        }, {
          key: "tablet",
          value: function() {
            return this.mobile() && !this.phone()
          }
        }]), e
      }();
    t.default = new f
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = function(e, t, n) {
        var o = e.node.getAttribute("data-aos-once");
        t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof o && ("false" === o || !n && "true" !== o) && e.node.classList.remove("aos-animate")
      },
      o = function(e, t) {
        var o = window.pageYOffset,
          i = window.innerHeight;
        e.forEach(function(e, r) {
          n(e, i + o, t)
        })
      };
    t.default = o
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(12),
      r = o(i),
      a = function(e, t) {
        return e.forEach(function(e, n) {
          e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, t.offset)
        }), e
      };
    t.default = a
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(13),
      r = o(i),
      a = function(e, t) {
        var n = 0,
          o = 0,
          i = window.innerHeight,
          a = {
            offset: e.getAttribute("data-aos-offset"),
            anchor: e.getAttribute("data-aos-anchor"),
            anchorPlacement: e.getAttribute("data-aos-anchor-placement")
          };
        switch (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), n = (0, r.default)(e).top, a.anchorPlacement) {
          case "top-bottom":
            break;
          case "center-bottom":
            n += e.offsetHeight / 2;
            break;
          case "bottom-bottom":
            n += e.offsetHeight;
            break;
          case "top-center":
            n += i / 2;
            break;
          case "bottom-center":
            n += i / 2 + e.offsetHeight;
            break;
          case "center-center":
            n += i / 2 + e.offsetHeight / 2;
            break;
          case "top-top":
            n += i;
            break;
          case "bottom-top":
            n += e.offsetHeight + i;
            break;
          case "center-top":
            n += e.offsetHeight / 2 + i
        }
        return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o
      };
    t.default = a
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = function(e) {
      for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
      return {
        top: n,
        left: t
      }
    };
    t.default = n
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = function(e) {
      return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, function(e) {
        return {
          node: e
        }
      })
    };
    t.default = n
  }])
});
/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.6.0
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick.modal.open
 Issues: http://github.com/kenwheeler/slick/issues

 */
! function(a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
  "use strict";
  var b = window.Slick || {};
  b = function() {
    function c(c, d) {
      var f, e = this;
      e.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(c),
        appendDots: a(c),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function(b, c) {
          return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, e.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
    }
    var b = 0;
    return c
  }(), b.prototype.activateADA = function() {
    var a = this;
    a.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    })
  }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
    var e = this;
    if ("boolean" == typeof c) d = c, c = null;
    else if (0 > c || c >= e.slideCount) return !1;
    e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
      a(c).attr("data-slick-index", b)
    }), e.$slidesCache = e.$slides, e.reinit()
  }, b.prototype.animateHeight = function() {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.animate({
        height: b
      }, a.options.speed)
    }
  }, b.prototype.animateSlide = function(b, c) {
    var d = {},
      e = this;
    e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
      left: b
    }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
      top: b
    }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
      animStart: e.currentLeft
    }).animate({
      animStart: b
    }, {
      duration: e.options.speed,
      easing: e.options.easing,
      step: function(a) {
        a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
      },
      complete: function() {
        c && c.call()
      }
    })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
      e.disableTransition(), c.call()
    }, e.options.speed))
  }, b.prototype.getNavTarget = function() {
    var b = this,
      c = b.options.asNavFor;
    return c && null !== c && (c = a(c).not(b.$slider)), c
  }, b.prototype.asNavFor = function(b) {
    var c = this,
      d = c.getNavTarget();
    null !== d && "object" == typeof d && d.each(function() {
      var c = a(this).slick("getSlick");
      c.unslicked || c.slideHandler(b, !0)
    })
  }, b.prototype.applyTransition = function(a) {
    var b = this,
      c = {};
    b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.autoPlay = function() {
    var a = this;
    a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
  }, b.prototype.autoPlayClear = function() {
    var a = this;
    a.autoPlayTimer && clearInterval(a.autoPlayTimer)
  }, b.prototype.autoPlayIterator = function() {
    var a = this,
      b = a.currentSlide + a.options.slidesToScroll;
    a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
  }, b.prototype.buildArrows = function() {
    var b = this;
    b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, b.prototype.buildDots = function() {
    var c, d, b = this;
    if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
      for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
      b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
    }
  }, b.prototype.buildOut = function() {
    var b = this;
    b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
      a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
    }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
  }, b.prototype.buildRows = function() {
    var b, c, d, e, f, g, h, a = this;
    if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
      for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
        var i = document.createElement("div");
        for (c = 0; c < a.options.rows; c++) {
          var j = document.createElement("div");
          for (d = 0; d < a.options.slidesPerRow; d++) {
            var k = b * h + (c * a.options.slidesPerRow + d);
            g.get(k) && j.appendChild(g.get(k))
          }
          i.appendChild(j)
        }
        e.appendChild(i)
      }
      a.$slider.empty().append(e), a.$slider.children().children().children().css({
        width: 100 / a.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, b.prototype.checkResponsive = function(b, c) {
    var e, f, g, d = this,
      h = !1,
      i = d.$slider.width(),
      j = window.innerWidth || a(window).width();
    if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
      f = null;
      for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
      null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
    }
  }, b.prototype.changeSlide = function(b, c) {
    var f, g, h, d = this,
      e = a(b.currentTarget);
    switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
      case "previous":
        g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
        break;
      case "next":
        g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
        break;
      case "index":
        var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
        d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
        break;
      default:
        return
    }
  }, b.prototype.checkNavigable = function(a) {
    var c, d, b = this;
    if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
    else
      for (var e in c) {
        if (a < c[e]) {
          a = d;
          break
        }
        d = c[e]
      }
    return a
  }, b.prototype.cleanUpEvents = function() {
    var b = this;
    b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
      a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.cleanUpSlideEvents = function() {
    var b = this;
    b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
  }, b.prototype.cleanUpRows = function() {
    var b, a = this;
    a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
  }, b.prototype.clickHandler = function(a) {
    var b = this;
    b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
  }, b.prototype.destroy = function(b) {
    var c = this;
    c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
      a(this).attr("style", a(this).data("originalStyling"))
    }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
  }, b.prototype.disableTransition = function(a) {
    var b = this,
      c = {};
    c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
  }, b.prototype.fadeSlide = function(a, b) {
    var c = this;
    c.cssTransitions === !1 ? (c.$slides.eq(a).css({
      zIndex: c.options.zIndex
    }), c.$slides.eq(a).animate({
      opacity: 1
    }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
      opacity: 1,
      zIndex: c.options.zIndex
    }), b && setTimeout(function() {
      c.disableTransition(a), b.call()
    }, c.options.speed))
  }, b.prototype.fadeSlideOut = function(a) {
    var b = this;
    b.cssTransitions === !1 ? b.$slides.eq(a).animate({
      opacity: 0,
      zIndex: b.options.zIndex - 2
    }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
      opacity: 0,
      zIndex: b.options.zIndex - 2
    }))
  }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
    var b = this;
    null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
  }, b.prototype.focusHandler = function() {
    var b = this;
    b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
      c.stopImmediatePropagation();
      var d = a(this);
      setTimeout(function() {
        b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
      }, 0)
    })
  }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
    var a = this;
    return a.currentSlide
  }, b.prototype.getDotCount = function() {
    var a = this,
      b = 0,
      c = 0,
      d = 0;
    if (a.options.infinite === !0)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    else if (a.options.centerMode === !0) d = a.slideCount;
    else if (a.options.asNavFor)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
    return d - 1
  }, b.prototype.getLeft = function(a) {
    var c, d, f, b = this,
      e = 0;
    return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
  }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
    var b = this;
    return b.options[a]
  }, b.prototype.getNavigableIndexes = function() {
    var e, a = this,
      b = 0,
      c = 0,
      d = [];
    for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
    return d
  }, b.prototype.getSlick = function() {
    return this
  }, b.prototype.getSlideCount = function() {
    var c, d, e, b = this;
    return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
      return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
    }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
  }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
    var c = this;
    c.changeSlide({
      data: {
        message: "index",
        index: parseInt(a)
      }
    }, b)
  }, b.prototype.init = function(b) {
    var c = this;
    a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
  }, b.prototype.initADA = function() {
    var b = this;
    b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
      a(this).attr({
        role: "option",
        "aria-describedby": "slick-slide" + b.instanceUid + c
      })
    }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
      a(this).attr({
        role: "presentation",
        "aria-selected": "false",
        "aria-controls": "navigation" + b.instanceUid + c,
        id: "slick-slide" + b.instanceUid + c
      })
    }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
  }, b.prototype.initArrowEvents = function() {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, a.changeSlide))
  }, b.prototype.initDotEvents = function() {
    var b = this;
    b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
      message: "index"
    }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
  }, b.prototype.initSlideEvents = function() {
    var b = this;
    b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
  }, b.prototype.initializeEvents = function() {
    var b = this;
    b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
      a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
  }, b.prototype.initUI = function() {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
  }, b.prototype.keyHandler = function(a) {
    var b = this;
    a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
      data: {
        message: b.options.rtl === !0 ? "next" : "previous"
      }
    }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
      data: {
        message: b.options.rtl === !0 ? "previous" : "next"
      }
    }))
  }, b.prototype.lazyLoad = function() {
    function g(c) {
      a("img[data-lazy]", c).each(function() {
        var c = a(this),
          d = a(this).attr("data-lazy"),
          e = document.createElement("img");
        e.onload = function() {
          c.animate({
            opacity: 0
          }, 100, function() {
            c.attr("src", d).animate({
              opacity: 1
            }, 200, function() {
              c.removeAttr("data-lazy").removeClass("slick-loading")
            }), b.$slider.trigger("lazyLoaded", [b, c, d])
          })
        }, e.onerror = function() {
          c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
        }, e.src = d
      })
    }
    var c, d, e, f, b = this;
    b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
  }, b.prototype.loadSlider = function() {
    var a = this;
    a.setPosition(), a.$slideTrack.css({
      opacity: 1
    }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
  }, b.prototype.next = b.prototype.slickNext = function() {
    var a = this;
    a.changeSlide({
      data: {
        message: "next"
      }
    })
  }, b.prototype.orientationChange = function() {
    var a = this;
    a.checkResponsive(), a.setPosition()
  }, b.prototype.pause = b.prototype.slickPause = function() {
    var a = this;
    a.autoPlayClear(), a.paused = !0
  }, b.prototype.play = b.prototype.slickPlay = function() {
    var a = this;
    a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
  }, b.prototype.postSlide = function(a) {
    var b = this;
    b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
  }, b.prototype.prev = b.prototype.slickPrev = function() {
    var a = this;
    a.changeSlide({
      data: {
        message: "previous"
      }
    })
  }, b.prototype.preventDefault = function(a) {
    a.preventDefault()
  }, b.prototype.progressiveLazyLoad = function(b) {
    b = b || 1;
    var e, f, g, c = this,
      d = a("img[data-lazy]", c.$slider);
    d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() {
      e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
    }, g.onerror = function() {
      3 > b ? setTimeout(function() {
        c.progressiveLazyLoad(b + 1)
      }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
    }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
  }, b.prototype.refresh = function(b) {
    var d, e, c = this;
    e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
      currentSlide: d
    }), c.init(), b || c.changeSlide({
      data: {
        message: "index",
        index: d
      }
    }, !1)
  }, b.prototype.registerBreakpoints = function() {
    var c, d, e, b = this,
      f = b.options.responsive || null;
    if ("array" === a.type(f) && f.length) {
      b.respondTo = b.options.respondTo || "window";
      for (c in f)
        if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
          for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
          b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
        } b.breakpoints.sort(function(a, c) {
        return b.options.mobileFirst ? a - c : c - a
      })
    }
  }, b.prototype.reinit = function() {
    var b = this;
    b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
  }, b.prototype.resize = function() {
    var b = this;
    a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
      b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
    }, 50))
  }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
    var d = this;
    return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
  }, b.prototype.setCSS = function(a) {
    var d, e, b = this,
      c = {};
    b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
  }, b.prototype.setDimensions = function() {
    var a = this;
    a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
      padding: "0px " + a.options.centerPadding
    }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
      padding: a.options.centerPadding + " 0px"
    })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
    var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
    a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
  }, b.prototype.setFade = function() {
    var c, b = this;
    b.$slides.each(function(d, e) {
      c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
        position: "relative",
        right: c,
        top: 0,
        zIndex: b.options.zIndex - 2,
        opacity: 0
      }) : a(e).css({
        position: "relative",
        left: c,
        top: 0,
        zIndex: b.options.zIndex - 2,
        opacity: 0
      })
    }), b.$slides.eq(b.currentSlide).css({
      zIndex: b.options.zIndex - 1,
      opacity: 1
    })
  }, b.prototype.setHeight = function() {
    var a = this;
    if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.css("height", b)
    }
  }, b.prototype.setOption = b.prototype.slickSetOption = function() {
    var c, d, e, f, h, b = this,
      g = !1;
    if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
    else if ("multiple" === h) a.each(e, function(a, c) {
      b.options[a] = c
    });
    else if ("responsive" === h)
      for (d in f)
        if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
        else {
          for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
          b.options.responsive.push(f[d])
        } g && (b.unload(), b.reinit())
  }, b.prototype.setPosition = function() {
    var a = this;
    a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
  }, b.prototype.setProps = function() {
    var a = this,
      b = document.body.style;
    a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
  }, b.prototype.setSlideClasses = function(a) {
    var c, d, e, f, b = this;
    d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
      d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
  }, b.prototype.setupInfinite = function() {
    var c, d, e, b = this;
    if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
      for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
      for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
      b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
        a(this).attr("id", "")
      })
    }
  }, b.prototype.interrupt = function(a) {
    var b = this;
    a || b.autoPlay(), b.interrupted = a
  }, b.prototype.selectHandler = function(b) {
    var c = this,
      d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
      e = parseInt(d.attr("data-slick-index"));
    return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
  }, b.prototype.slideHandler = function(a, b, c) {
    var d, e, f, g, j, h = null,
      i = this;
    return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
      i.postSlide(d)
    }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
      i.postSlide(d)
    }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
      i.postSlide(e)
    })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
      i.postSlide(e)
    }) : i.postSlide(e))))
  }, b.prototype.startLoad = function() {
    var a = this;
    a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
  }, b.prototype.swipeDirection = function() {
    var a, b, c, d, e = this;
    return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
  }, b.prototype.swipeEnd = function(a) {
    var c, d, b = this;
    if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
    if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
      switch (d = b.swipeDirection()) {
        case "left":
        case "down":
          c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
          break;
        case "right":
        case "up":
          c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
      }
      "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
    } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
  }, b.prototype.swipeHandler = function(a) {
    var b = this;
    if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
      case "start":
        b.swipeStart(a);
        break;
      case "move":
        b.swipeMove(a);
        break;
      case "end":
        b.swipeEnd(a)
    }
  }, b.prototype.swipeMove = function(a) {
    var d, e, f, g, h, b = this;
    return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
  }, b.prototype.swipeStart = function(a) {
    var c, b = this;
    return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
  }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
    var a = this;
    null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
  }, b.prototype.unload = function() {
    var b = this;
    a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, b.prototype.unslick = function(a) {
    var b = this;
    b.$slider.trigger("unslick", [b, a]), b.destroy()
  }, b.prototype.updateArrows = function() {
    var b, a = this;
    b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, b.prototype.updateDots = function() {
    var a = this;
    null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
  }, b.prototype.visibility = function() {
    var a = this;
    a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
  }, a.fn.slick = function() {
    var f, g, a = this,
      c = arguments[0],
      d = Array.prototype.slice.call(arguments, 1),
      e = a.length;
    for (f = 0; e > f; f++)
      if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
    return a
  }
});
! function(a) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
  else if ("function" == typeof define && define.amd) define([], a);
  else {
    var b;
    b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.ProgressBar = a()
  }
}(function() {
  var a;
  return function() {
    function a(b, c, d) {
      function e(g, h) {
        if (!c[g]) {
          if (!b[g]) {
            var i = "function" == typeof require && require;
            if (!h && i) return i(g, !0);
            if (f) return f(g, !0);
            var j = new Error("Cannot find module '" + g + "'");
            throw j.code = "MODULE_NOT_FOUND", j
          }
          var k = c[g] = {
            exports: {}
          };
          b[g][0].call(k.exports, function(a) {
            return e(b[g][1][a] || a)
          }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
      }
      for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
      return e
    }
    return a
  }()({
    1: [function(b, c, d) {
      ! function(b, e) {
        "object" == typeof d && "object" == typeof c ? c.exports = e() : "function" == typeof a && a.amd ? a("shifty", [], e) : "object" == typeof d ? d.shifty = e() : b.shifty = e()
      }(window, function() {
        return function(a) {
          function b(d) {
            if (c[d]) return c[d].exports;
            var e = c[d] = {
              i: d,
              l: !1,
              exports: {}
            };
            return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports
          }
          var c = {};
          return b.m = a, b.c = c, b.d = function(a, c, d) {
            b.o(a, c) || Object.defineProperty(a, c, {
              enumerable: !0,
              get: d
            })
          }, b.r = function(a) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, {
              value: "Module"
            }), Object.defineProperty(a, "__esModule", {
              value: !0
            })
          }, b.t = function(a, c) {
            if (1 & c && (a = b(a)), 8 & c) return a;
            if (4 & c && "object" == typeof a && a && a.__esModule) return a;
            var d = Object.create(null);
            if (b.r(d), Object.defineProperty(d, "default", {
              enumerable: !0,
              value: a
            }), 2 & c && "string" != typeof a)
              for (var e in a) b.d(d, e, function(b) {
                return a[b]
              }.bind(null, e));
            return d
          }, b.n = function(a) {
            var c = a && a.__esModule ? function() {
              return a.default
            } : function() {
              return a
            };
            return b.d(c, "a", c), c
          }, b.o = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
          }, b.p = "", b(b.s = 3)
        }([function(a, b, c) {
          "use strict";
          (function(a) {
            function d(a, b) {
              for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
              }
            }

            function e(a) {
              return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                return typeof a
              } : function(a) {
                return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
              })(a)
            }

            function f(a, b) {
              var c = Object.keys(a);
              if (Object.getOwnPropertySymbols) {
                var d = Object.getOwnPropertySymbols(a);
                b && (d = d.filter(function(b) {
                  return Object.getOwnPropertyDescriptor(a, b).enumerable
                })), c.push.apply(c, d)
              }
              return c
            }

            function g(a) {
              for (var b = 1; b < arguments.length; b++) {
                var c = null != arguments[b] ? arguments[b] : {};
                b % 2 ? f(Object(c), !0).forEach(function(b) {
                  h(a, b, c[b])
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : f(Object(c)).forEach(function(b) {
                  Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
                })
              }
              return a
            }

            function h(a, b, c) {
              return b in a ? Object.defineProperty(a, b, {
                value: c,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : a[b] = c, a
            }

            function i() {
              var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                b = new v,
                c = b.tween(a);
              return c.tweenable = b, c
            }
            c.d(b, "e", function() {
              return q
            }), c.d(b, "c", function() {
              return s
            }), c.d(b, "b", function() {
              return t
            }), c.d(b, "a", function() {
              return v
            }), c.d(b, "d", function() {
              return i
            });
            var j = c(1),
              k = "undefined" != typeof window ? window : a,
              l = k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.oRequestAnimationFrame || k.msRequestAnimationFrame || k.mozCancelRequestAnimationFrame && k.mozRequestAnimationFrame || setTimeout,
              m = function() {},
              n = null,
              o = null,
              p = g({}, j),
              q = function(a, b, c, d, e, f, g) {
                var h = a < f ? 0 : (a - f) / e;
                for (var i in b) {
                  var j = g[i],
                    k = j.call ? j : p[j],
                    l = c[i];
                  b[i] = l + (d[i] - l) * k(h)
                }
                return b
              },
              r = function(a, b) {
                var c = a._attachment,
                  d = a._currentState,
                  e = a._delay,
                  f = a._easing,
                  g = a._originalState,
                  h = a._duration,
                  i = a._step,
                  j = a._targetState,
                  k = a._timestamp,
                  l = k + e + h,
                  m = b > l ? l : b,
                  n = h - (l - m);
                m >= l ? (i(j, c, n), a.stop(!0)) : (a._applyFilter("beforeTween"), m < k + e ? (m = 1, h = 1, k = 1) : k += e, q(m, d, g, j, h, k, f), a._applyFilter("afterTween"), i(d, c, n))
              },
              s = function() {
                for (var a = v.now(), b = n; b;) {
                  var c = b._next;
                  r(b, a), b = c
                }
              },
              t = function(a) {
                var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "linear",
                  c = {},
                  d = e(b);
                if ("string" === d || "function" === d)
                  for (var f in a) c[f] = b;
                else
                  for (var g in a) c[g] = b[g] || "linear";
                return c
              },
              u = function(a) {
                if (a === n)(n = a._next) ? n._previous = null : o = null;
                else if (a === o)(o = a._previous) ? o._next = null : n = null;
                else {
                  var b = a._previous,
                    c = a._next;
                  b._next = c, c._previous = b
                }
                a._previous = a._next = null
              },
              v = function() {
                function a() {
                  var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                  ! function(a, b) {
                    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
                  }(this, a), this._currentState = b, this._configured = !1, this._filters = [], this._timestamp = null, this._next = null, this._previous = null, c && this.setConfig(c)
                }
                var b, c, e;
                return b = a, (c = [{
                  key: "_applyFilter",
                  value: function(a) {
                    var b = !0,
                      c = !1,
                      d = void 0;
                    try {
                      for (var e, f = this._filters[Symbol.iterator](); !(b = (e = f.next()).done); b = !0) {
                        var g = e.value[a];
                        g && g(this)
                      }
                    } catch (a) {
                      c = !0, d = a
                    } finally {
                      try {
                        b || null == f.return || f.return()
                      } finally {
                        if (c) throw d
                      }
                    }
                  }
                }, {
                  key: "tween",
                  value: function() {
                    var b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
                      c = this._attachment,
                      d = this._configured;
                    return !b && d || this.setConfig(b), this._pausedAtTime = null, this._timestamp = a.now(), this._start(this.get(), c), this.resume()
                  }
                }, {
                  key: "setConfig",
                  value: function() {
                    var b = this,
                      c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      d = c.attachment,
                      e = c.delay,
                      f = void 0 === e ? 0 : e,
                      h = c.duration,
                      i = void 0 === h ? 500 : h,
                      j = c.easing,
                      k = c.from,
                      l = c.promise,
                      n = void 0 === l ? Promise : l,
                      o = c.start,
                      p = void 0 === o ? m : o,
                      q = c.step,
                      r = void 0 === q ? m : q,
                      s = c.to;
                    this._configured = !0, this._attachment = d, this._isPlaying = !1, this._pausedAtTime = null, this._scheduleId = null, this._delay = f, this._start = p, this._step = r, this._duration = i, this._currentState = g({}, k || this.get()), this._originalState = this.get(), this._targetState = g({}, s || this.get());
                    var u = this._currentState;
                    this._targetState = g({}, u, {}, this._targetState), this._easing = t(u, j);
                    var v = a.filters;
                    for (var w in this._filters.length = 0, v) v[w].doesApply(this) && this._filters.push(v[w]);
                    return this._applyFilter("tweenCreated"), this._promise = new n(function(a, c) {
                      b._resolve = a, b._reject = c
                    }), this._promise.catch(m), this
                  }
                }, {
                  key: "get",
                  value: function() {
                    return g({}, this._currentState)
                  }
                }, {
                  key: "set",
                  value: function(a) {
                    this._currentState = a
                  }
                }, {
                  key: "pause",
                  value: function() {
                    if (this._isPlaying) return this._pausedAtTime = a.now(), this._isPlaying = !1, u(this), this
                  }
                }, {
                  key: "resume",
                  value: function() {
                    if (null === this._timestamp) return this.tween();
                    if (this._isPlaying) return this._promise;
                    var b = a.now();
                    return this._pausedAtTime && (this._timestamp += b - this._pausedAtTime, this._pausedAtTime = null), this._isPlaying = !0, null === n ? (n = this, o = this, function a() {
                      n && (l.call(k, a, 1e3 / 60), s())
                    }()) : (this._previous = o, o._next = this, o = this), this._promise
                  }
                }, {
                  key: "seek",
                  value: function(b) {
                    b = Math.max(b, 0);
                    var c = a.now();
                    return this._timestamp + b === 0 ? this : (this._timestamp = c - b, this._isPlaying || r(this, c), this)
                  }
                }, {
                  key: "stop",
                  value: function() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                      b = this._attachment,
                      c = this._currentState,
                      d = this._easing,
                      e = this._originalState,
                      f = this._targetState;
                    if (this._isPlaying) return this._isPlaying = !1, u(this), a ? (this._applyFilter("beforeTween"), q(1, c, e, f, 1, 0, d), this._applyFilter("afterTween"), this._applyFilter("afterTweenEnd"), this._resolve(c, b)) : this._reject(c, b), this
                  }
                }, {
                  key: "isPlaying",
                  value: function() {
                    return this._isPlaying
                  }
                }, {
                  key: "setScheduleFunction",
                  value: function(b) {
                    a.setScheduleFunction(b)
                  }
                }, {
                  key: "dispose",
                  value: function() {
                    for (var a in this) delete this[a]
                  }
                }]) && d(b.prototype, c), e && d(b, e), a
              }();
            v.setScheduleFunction = function(a) {
              return l = a
            }, v.formulas = p, v.filters = {}, v.now = Date.now || function() {
              return +new Date
            }
          }).call(this, c(2))
        }, function(a, b, c) {
          "use strict";
          c.r(b), c.d(b, "linear", function() {
            return d
          }), c.d(b, "easeInQuad", function() {
            return e
          }), c.d(b, "easeOutQuad", function() {
            return f
          }), c.d(b, "easeInOutQuad", function() {
            return g
          }), c.d(b, "easeInCubic", function() {
            return h
          }), c.d(b, "easeOutCubic", function() {
            return i
          }), c.d(b, "easeInOutCubic", function() {
            return j
          }), c.d(b, "easeInQuart", function() {
            return k
          }), c.d(b, "easeOutQuart", function() {
            return l
          }), c.d(b, "easeInOutQuart", function() {
            return m
          }), c.d(b, "easeInQuint", function() {
            return n
          }), c.d(b, "easeOutQuint", function() {
            return o
          }), c.d(b, "easeInOutQuint", function() {
            return p
          }), c.d(b, "easeInSine", function() {
            return q
          }), c.d(b, "easeOutSine", function() {
            return r
          }), c.d(b, "easeInOutSine", function() {
            return s
          }), c.d(b, "easeInExpo", function() {
            return t
          }), c.d(b, "easeOutExpo", function() {
            return u
          }), c.d(b, "easeInOutExpo", function() {
            return v
          }), c.d(b, "easeInCirc", function() {
            return w
          }), c.d(b, "easeOutCirc", function() {
            return x
          }), c.d(b, "easeInOutCirc", function() {
            return y
          }), c.d(b, "easeOutBounce", function() {
            return z
          }), c.d(b, "easeInBack", function() {
            return A
          }), c.d(b, "easeOutBack", function() {
            return B
          }), c.d(b, "easeInOutBack", function() {
            return C
          }), c.d(b, "elastic", function() {
            return D
          }), c.d(b, "swingFromTo", function() {
            return E
          }), c.d(b, "swingFrom", function() {
            return F
          }), c.d(b, "swingTo", function() {
            return G
          }), c.d(b, "bounce", function() {
            return H
          }), c.d(b, "bouncePast", function() {
            return I
          }), c.d(b, "easeFromTo", function() {
            return J
          }), c.d(b, "easeFrom", function() {
            return K
          }), c.d(b, "easeTo", function() {
            return L
          });
          var d = function(a) {
              return a
            },
            e = function(a) {
              return Math.pow(a, 2)
            },
            f = function(a) {
              return -(Math.pow(a - 1, 2) - 1)
            },
            g = function(a) {
              return (a /= .5) < 1 ? .5 * Math.pow(a, 2) : -.5 * ((a -= 2) * a - 2)
            },
            h = function(a) {
              return Math.pow(a, 3)
            },
            i = function(a) {
              return Math.pow(a - 1, 3) + 1
            },
            j = function(a) {
              return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2)
            },
            k = function(a) {
              return Math.pow(a, 4)
            },
            l = function(a) {
              return -(Math.pow(a - 1, 4) - 1)
            },
            m = function(a) {
              return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2)
            },
            n = function(a) {
              return Math.pow(a, 5)
            },
            o = function(a) {
              return Math.pow(a - 1, 5) + 1
            },
            p = function(a) {
              return (a /= .5) < 1 ? .5 * Math.pow(a, 5) : .5 * (Math.pow(a - 2, 5) + 2)
            },
            q = function(a) {
              return 1 - Math.cos(a * (Math.PI / 2))
            },
            r = function(a) {
              return Math.sin(a * (Math.PI / 2))
            },
            s = function(a) {
              return -.5 * (Math.cos(Math.PI * a) - 1)
            },
            t = function(a) {
              return 0 === a ? 0 : Math.pow(2, 10 * (a - 1))
            },
            u = function(a) {
              return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
            },
            v = function(a) {
              return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * --a))
            },
            w = function(a) {
              return -(Math.sqrt(1 - a * a) - 1)
            },
            x = function(a) {
              return Math.sqrt(1 - Math.pow(a - 1, 2))
            },
            y = function(a) {
              return (a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
            },
            z = function(a) {
              return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            },
            A = function(a) {
              var b = 1.70158;
              return a * a * ((b + 1) * a - b)
            },
            B = function(a) {
              var b = 1.70158;
              return (a -= 1) * a * ((b + 1) * a + b) + 1
            },
            C = function(a) {
              var b = 1.70158;
              return (a /= .5) < 1 ? a * a * ((1 + (b *= 1.525)) * a - b) * .5 : .5 * ((a -= 2) * a * ((1 + (b *= 1.525)) * a + b) + 2)
            },
            D = function(a) {
              return -1 * Math.pow(4, -8 * a) * Math.sin((6 * a - 1) * (2 * Math.PI) / 2) + 1
            },
            E = function(a) {
              var b = 1.70158;
              return (a /= .5) < 1 ? a * a * ((1 + (b *= 1.525)) * a - b) * .5 : .5 * ((a -= 2) * a * ((1 + (b *= 1.525)) * a + b) + 2)
            },
            F = function(a) {
              var b = 1.70158;
              return a * a * ((b + 1) * a - b)
            },
            G = function(a) {
              var b = 1.70158;
              return (a -= 1) * a * ((b + 1) * a + b) + 1
            },
            H = function(a) {
              return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            },
            I = function(a) {
              return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : a < 2.5 / 2.75 ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
            },
            J = function(a) {
              return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2)
            },
            K = function(a) {
              return Math.pow(a, 4)
            },
            L = function(a) {
              return Math.pow(a, .25)
            }
        }, function(a, b) {
          var c;
          c = function() {
            return this
          }();
          try {
            c = c || new Function("return this")()
          } catch (a) {
            "object" == typeof window && (c = window)
          }
          a.exports = c
        }, function(a, b, c) {
          "use strict";

          function d(a) {
            return parseInt(a, 16)
          }

          function e(a) {
            var b = a._currentState;
            [b, a._originalState, a._targetState].forEach(B), a._tokenData = E(b)
          }

          function f(a) {
            var b = a._currentState,
              c = a._originalState,
              d = a._targetState,
              e = a._easing,
              f = a._tokenData;
            K(e, f), [b, c, d].forEach(function(a) {
              return F(a, f)
            })
          }

          function g(a) {
            var b = a._currentState,
              c = a._originalState,
              d = a._targetState,
              e = a._easing,
              f = a._tokenData;
            [b, c, d].forEach(function(a) {
              return J(a, f)
            }), L(e, f)
          }

          function h(a, b) {
            var c = Object.keys(a);
            if (Object.getOwnPropertySymbols) {
              var d = Object.getOwnPropertySymbols(a);
              b && (d = d.filter(function(b) {
                return Object.getOwnPropertyDescriptor(a, b).enumerable
              })), c.push.apply(c, d)
            }
            return c
          }

          function i(a) {
            for (var b = 1; b < arguments.length; b++) {
              var c = null != arguments[b] ? arguments[b] : {};
              b % 2 ? h(Object(c), !0).forEach(function(b) {
                j(a, b, c[b])
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : h(Object(c)).forEach(function(b) {
                Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
              })
            }
            return a
          }

          function j(a, b, c) {
            return b in a ? Object.defineProperty(a, b, {
              value: c,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : a[b] = c, a
          }

          function k(a) {
            return function(a) {
              if (Array.isArray(a)) {
                for (var b = 0, c = new Array(a.length); b < a.length; b++) c[b] = a[b];
                return c
              }
            }(a) || function(a) {
              if (Symbol.iterator in Object(a) || "[object Arguments]" === Object.prototype.toString.call(a)) return Array.from(a)
            }(a) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
          }

          function l(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
          }

          function m(a, b) {
            var c = b.get(a);
            if (!c) throw new TypeError("attempted to get private field on non-instance");
            return c.get ? c.get.call(a) : c.value
          }

          function n(a, b, c, d, e, f) {
            var g, h, i = 0,
              j = 0,
              k = 0,
              l = 0,
              m = 0,
              n = 0,
              o = function(a) {
                return ((i * a + j) * a + k) * a
              },
              p = function(a) {
                return (3 * i * a + 2 * j) * a + k
              },
              q = function(a) {
                return a >= 0 ? a : 0 - a
              };
            return i = 1 - (k = 3 * b) - (j = 3 * (d - b) - k), l = 1 - (n = 3 * c) - (m = 3 * (e - c) - n), g = a, h = function(a) {
              return 1 / (200 * a)
            }(f),
              function(a) {
                return ((l * a + m) * a + n) * a
              }(function(a, b) {
                var c, d, e, f, g, h;
                for (e = a, h = 0; h < 8; h++) {
                  if (f = o(e) - a, q(f) < b) return e;
                  if (g = p(e), q(g) < 1e-6) break;
                  e -= f / g
                }
                if ((e = a) < (c = 0)) return c;
                if (e > (d = 1)) return d;
                for (; c < d;) {
                  if (f = o(e), q(f - a) < b) return e;
                  a > f ? c = e : d = e, e = .5 * (d - c) + c
                }
                return e
              }(g, h))
          }
          c.r(b);
          var o = {};
          c.r(o), c.d(o, "doesApply", function() {
            return M
          }), c.d(o, "tweenCreated", function() {
            return e
          }), c.d(o, "beforeTween", function() {
            return f
          }), c.d(o, "afterTween", function() {
            return g
          });
          var p, q, r = c(0),
            s = /(\d|-|\.)/,
            t = /([^\-0-9.]+)/g,
            u = /[0-9.-]+/g,
            v = (p = u.source, q = /,\s*/.source, new RegExp("rgb\\(".concat(p).concat(q).concat(p).concat(q).concat(p, "\\)"), "g")),
            w = /^.*\(/,
            x = /#([0-9]|[a-f]){3,6}/gi,
            y = function(a, b) {
              return a.map(function(a, c) {
                return "_".concat(b, "_").concat(c)
              })
            },
            z = function(a) {
              return "rgb(".concat((b = a, 3 === (b = b.replace(/#/, "")).length && (b = (b = b.split(""))[0] + b[0] + b[1] + b[1] + b[2] + b[2]), [d(b.substr(0, 2)), d(b.substr(2, 2)), d(b.substr(4, 2))]).join(","), ")");
              var b
            },
            A = function(a, b, c) {
              var d = b.match(a),
                e = b.replace(a, "VAL");
              return d && d.forEach(function(a) {
                return e = e.replace("VAL", c(a))
              }), e
            },
            B = function(a) {
              for (var b in a) {
                var c = a[b];
                "string" == typeof c && c.match(x) && (a[b] = A(x, c, z))
              }
            },
            C = function(a) {
              var b = a.match(u).map(Math.floor);
              return "".concat(a.match(w)[0]).concat(b.join(","), ")")
            },
            D = function(a) {
              return a.match(u)
            },
            E = function(a) {
              var b, c, d = {};
              for (var e in a) {
                var f = a[e];
                "string" == typeof f && (d[e] = {
                  formatString: (b = f, c = void 0, c = b.match(t), c ? (1 === c.length || b.charAt(0).match(s)) && c.unshift("") : c = ["", ""], c.join("VAL")),
                  chunkNames: y(D(f), e)
                })
              }
              return d
            },
            F = function(a, b) {
              var c = function(c) {
                D(a[c]).forEach(function(d, e) {
                  return a[b[c].chunkNames[e]] = +d
                }), delete a[c]
              };
              for (var d in b) c(d)
            },
            G = function(a, b) {
              var c = {};
              return b.forEach(function(b) {
                c[b] = a[b], delete a[b]
              }), c
            },
            H = function(a, b) {
              return b.map(function(b) {
                return a[b]
              })
            },
            I = function(a, b) {
              return b.forEach(function(b) {
                return a = a.replace("VAL", +b.toFixed(4))
              }), a
            },
            J = function(a, b) {
              for (var c in b) {
                var d = b[c],
                  e = d.chunkNames,
                  f = d.formatString,
                  g = I(f, H(G(a, e), e));
                a[c] = A(v, g, C)
              }
            },
            K = function(a, b) {
              var c = function(c) {
                var d = b[c].chunkNames,
                  e = a[c];
                if ("string" == typeof e) {
                  var f = e.split(" "),
                    g = f[f.length - 1];
                  d.forEach(function(b, c) {
                    return a[b] = f[c] || g
                  })
                } else d.forEach(function(b) {
                  return a[b] = e
                });
                delete a[c]
              };
              for (var d in b) c(d)
            },
            L = function(a, b) {
              for (var c in b) {
                var d = b[c].chunkNames,
                  e = a[d[0]];
                a[c] = "string" == typeof e ? d.map(function(b) {
                  var c = a[b];
                  return delete a[b], c
                }).join(" ") : e
              }
            },
            M = function(a) {
              var b = a._currentState;
              return Object.keys(b).some(function(a) {
                return "string" == typeof b[a]
              })
            },
            N = new r.a,
            O = r.a.filters,
            P = function(a, b, c, d) {
              var e = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                f = i({}, a),
                g = Object(r.b)(a, d);
              for (var h in N._filters.length = 0, N.set({}), N._currentState = f, N._originalState = a, N._targetState = b, N._easing = g, O) O[h].doesApply(N) && N._filters.push(O[h]);
              N._applyFilter("tweenCreated"), N._applyFilter("beforeTween");
              var j = Object(r.e)(c, f, a, b, 1, e, g);
              return N._applyFilter("afterTween"), j
            },
            Q = function() {
              function a() {
                ! function(a, b) {
                  if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
                }(this, a), R.set(this, {
                  writable: !0,
                  value: []
                });
                for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
                c.forEach(this.add.bind(this))
              }
              var b, c, d;
              return b = a, (c = [{
                key: "add",
                value: function(a) {
                  return m(this, R).push(a), a
                }
              }, {
                key: "remove",
                value: function(a) {
                  var b = m(this, R).indexOf(a);
                  return ~b && m(this, R).splice(b, 1), a
                }
              }, {
                key: "empty",
                value: function() {
                  return this.tweenables.map(this.remove.bind(this))
                }
              }, {
                key: "isPlaying",
                value: function() {
                  return m(this, R).some(function(a) {
                    return a.isPlaying()
                  })
                }
              }, {
                key: "play",
                value: function() {
                  return m(this, R).forEach(function(a) {
                    return a.tween()
                  }), this
                }
              }, {
                key: "pause",
                value: function() {
                  return m(this, R).forEach(function(a) {
                    return a.pause()
                  }), this
                }
              }, {
                key: "resume",
                value: function() {
                  return m(this, R).forEach(function(a) {
                    return a.resume()
                  }), this
                }
              }, {
                key: "stop",
                value: function(a) {
                  return m(this, R).forEach(function(b) {
                    return b.stop(a)
                  }), this
                }
              }, {
                key: "tweenables",
                get: function() {
                  return k(m(this, R))
                }
              }, {
                key: "promises",
                get: function() {
                  return m(this, R).map(function(a) {
                    return a._promise
                  })
                }
              }]) && l(b.prototype, c), d && l(b, d), a
            }(),
            R = new WeakMap,
            S = function(a, b, c, d, e) {
              var f = function(a, b, c, d) {
                return function(e) {
                  return n(e, a, b, c, d, 1)
                }
              }(b, c, d, e);
              return f.displayName = a, f.x1 = b, f.y1 = c, f.x2 = d, f.y2 = e, r.a.formulas[a] = f
            },
            T = function(a) {
              return delete r.a.formulas[a]
            };
          c.d(b, "processTweens", function() {
            return r.c
          }), c.d(b, "Tweenable", function() {
            return r.a
          }), c.d(b, "tween", function() {
            return r.d
          }), c.d(b, "interpolate", function() {
            return P
          }), c.d(b, "Scene", function() {
            return Q
          }), c.d(b, "setBezierFunction", function() {
            return S
          }), c.d(b, "unsetBezierFunction", function() {
            return T
          }), r.a.filters.token = o
        }])
      })
    }, {}],
    2: [function(a, b, c) {
      var d = a("./shape"),
        e = a("./utils"),
        f = function(a, b) {
          this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, d.apply(this, arguments)
        };
      f.prototype = new d, f.prototype.constructor = f, f.prototype._pathString = function(a) {
        var b = a.strokeWidth;
        a.trailWidth && a.trailWidth > a.strokeWidth && (b = a.trailWidth);
        var c = 50 - b / 2;
        return e.render(this._pathTemplate, {
          radius: c,
          "2radius": 2 * c
        })
      }, f.prototype._trailString = function(a) {
        return this._pathString(a)
      }, b.exports = f
    }, {
      "./shape": 7,
      "./utils": 9
    }],
    3: [function(a, b, c) {
      var d = a("./shape"),
        e = a("./utils"),
        f = function(a, b) {
          this._pathTemplate = b.vertical ? "M {center},100 L {center},0" : "M 0,{center} L 100,{center}", d.apply(this, arguments)
        };
      f.prototype = new d, f.prototype.constructor = f, f.prototype._initializeSvg = function(a, b) {
        var c = b.vertical ? "0 0 " + b.strokeWidth + " 100" : "0 0 100 " + b.strokeWidth;
        a.setAttribute("viewBox", c), a.setAttribute("preserveAspectRatio", "none")
      }, f.prototype._pathString = function(a) {
        return e.render(this._pathTemplate, {
          center: a.strokeWidth / 2
        })
      }, f.prototype._trailString = function(a) {
        return this._pathString(a)
      }, b.exports = f
    }, {
      "./shape": 7,
      "./utils": 9
    }],
    4: [function(a, b, c) {
      b.exports = {
        Line: a("./line"),
        Circle: a("./circle"),
        SemiCircle: a("./semicircle"),
        Square: a("./square"),
        Path: a("./path"),
        Shape: a("./shape"),
        utils: a("./utils")
      }
    }, {
      "./circle": 2,
      "./line": 3,
      "./path": 5,
      "./semicircle": 6,
      "./shape": 7,
      "./square": 8,
      "./utils": 9
    }],
    5: [function(a, b, c) {
      var d = a("shifty"),
        e = a("./utils"),
        f = d.Tweenable,
        g = {
          easeIn: "easeInCubic",
          easeOut: "easeOutCubic",
          easeInOut: "easeInOutCubic"
        },
        h = function a(b, c) {
          if (!(this instanceof a)) throw new Error("Constructor was called without new keyword");
          c = e.extend({
            delay: 0,
            duration: 800,
            easing: "linear",
            from: {},
            to: {},
            step: function() {}
          }, c);
          var d;
          d = e.isString(b) ? document.querySelector(b) : b, this.path = d, this._opts = c, this._tweenable = null;
          var f = this.path.getTotalLength();
          this.path.style.strokeDasharray = f + " " + f, this.set(0)
        };
      h.prototype.value = function() {
        var a = this._getComputedDashOffset(),
          b = this.path.getTotalLength(),
          c = 1 - a / b;
        return parseFloat(c.toFixed(6), 10)
      }, h.prototype.set = function(a) {
        this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(a);
        var b = this._opts.step;
        if (e.isFunction(b)) {
          var c = this._easing(this._opts.easing);
          b(this._calculateTo(a, c), this._opts.shape || this, this._opts.attachment)
        }
      }, h.prototype.stop = function() {
        this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset()
      }, h.prototype.animate = function(a, b, c) {
        b = b || {}, e.isFunction(b) && (c = b, b = {});
        var d = e.extend({}, b),
          g = e.extend({}, this._opts);
        b = e.extend(g, b);
        var h = this._easing(b.easing),
          i = this._resolveFromAndTo(a, h, d);
        this.stop(), this.path.getBoundingClientRect();
        var j = this._getComputedDashOffset(),
          k = this._progressToOffset(a),
          l = this;
        this._tweenable = new f, this._tweenable.tween({
          from: e.extend({
            offset: j
          }, i.from),
          to: e.extend({
            offset: k
          }, i.to),
          duration: b.duration,
          delay: b.delay,
          easing: h,
          step: function(a) {
            l.path.style.strokeDashoffset = a.offset;
            var c = b.shape || l;
            b.step(a, c, b.attachment)
          }
        }).then(function(a) {
          e.isFunction(c) && c()
        }).catch(function(a) {
          throw console.error("Error in tweening:", a), a
        })
      }, h.prototype._getComputedDashOffset = function() {
        var a = window.getComputedStyle(this.path, null);
        return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10)
      }, h.prototype._progressToOffset = function(a) {
        var b = this.path.getTotalLength();
        return b - a * b
      }, h.prototype._resolveFromAndTo = function(a, b, c) {
        return c.from && c.to ? {
          from: c.from,
          to: c.to
        } : {
          from: this._calculateFrom(b),
          to: this._calculateTo(a, b)
        }
      }, h.prototype._calculateFrom = function(a) {
        return d.interpolate(this._opts.from, this._opts.to, this.value(), a)
      }, h.prototype._calculateTo = function(a, b) {
        return d.interpolate(this._opts.from, this._opts.to, a, b)
      }, h.prototype._stopTween = function() {
        null !== this._tweenable && (this._tweenable.stop(!0), this._tweenable = null)
      }, h.prototype._easing = function(a) {
        return g.hasOwnProperty(a) ? g[a] : a
      }, b.exports = h
    }, {
      "./utils": 9,
      shifty: 1
    }],
    6: [function(a, b, c) {
      var d = a("./shape"),
        e = a("./circle"),
        f = a("./utils"),
        g = function(a, b) {
          this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, d.apply(this, arguments)
        };
      g.prototype = new d, g.prototype.constructor = g, g.prototype._initializeSvg = function(a, b) {
        a.setAttribute("viewBox", "0 0 100 50")
      }, g.prototype._initializeTextContainer = function(a, b, c) {
        a.text.style && (c.style.top = "auto", c.style.bottom = "0", a.text.alignToBottom ? f.setStyle(c, "transform", "translate(-50%, 0)") : f.setStyle(c, "transform", "translate(-50%, 50%)"))
      }, g.prototype._pathString = e.prototype._pathString, g.prototype._trailString = e.prototype._trailString, b.exports = g
    }, {
      "./circle": 2,
      "./shape": 7,
      "./utils": 9
    }],
    7: [function(a, b, c) {
      var d = a("./path"),
        e = a("./utils"),
        f = "Object is destroyed",
        g = function a(b, c) {
          if (!(this instanceof a)) throw new Error("Constructor was called without new keyword");
          if (0 !== arguments.length) {
            this._opts = e.extend({
              color: "#555",
              strokeWidth: 1,
              trailColor: null,
              trailWidth: null,
              fill: null,
              text: {
                style: {
                  color: null,
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  padding: 0,
                  margin: 0,
                  transform: {
                    prefix: !0,
                    value: "translate(-50%, -50%)"
                  }
                },
                autoStyleContainer: !0,
                alignToBottom: !0,
                value: null,
                className: "progressbar-text"
              },
              svgStyle: {
                display: "block",
                width: "100%"
              },
              warnings: !1
            }, c, !0), e.isObject(c) && void 0 !== c.svgStyle && (this._opts.svgStyle = c.svgStyle), e.isObject(c) && e.isObject(c.text) && void 0 !== c.text.style && (this._opts.text.style = c.text.style);
            var f, g = this._createSvgView(this._opts);
            if (!(f = e.isString(b) ? document.querySelector(b) : b)) throw new Error("Container does not exist: " + b);
            this._container = f, this._container.appendChild(g.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && e.setStyles(g.svg, this._opts.svgStyle), this.svg = g.svg, this.path = g.path, this.trail = g.trail, this.text = null;
            var h = e.extend({
              attachment: void 0,
              shape: this
            }, this._opts);
            this._progressPath = new d(g.path, h), e.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value)
          }
        };
      g.prototype.animate = function(a, b, c) {
        if (null === this._progressPath) throw new Error(f);
        this._progressPath.animate(a, b, c)
      }, g.prototype.stop = function() {
        if (null === this._progressPath) throw new Error(f);
        void 0 !== this._progressPath && this._progressPath.stop()
      }, g.prototype.pause = function() {
        if (null === this._progressPath) throw new Error(f);
        void 0 !== this._progressPath && this._progressPath._tweenable && this._progressPath._tweenable.pause()
      }, g.prototype.resume = function() {
        if (null === this._progressPath) throw new Error(f);
        void 0 !== this._progressPath && this._progressPath._tweenable && this._progressPath._tweenable.resume()
      }, g.prototype.destroy = function() {
        if (null === this._progressPath) throw new Error(f);
        this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null)
      }, g.prototype.set = function(a) {
        if (null === this._progressPath) throw new Error(f);
        this._progressPath.set(a)
      }, g.prototype.value = function() {
        if (null === this._progressPath) throw new Error(f);
        return void 0 === this._progressPath ? 0 : this._progressPath.value()
      }, g.prototype.setText = function(a) {
        if (null === this._progressPath) throw new Error(f);
        null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), e.isObject(a) ? (e.removeChildren(this.text), this.text.appendChild(a)) : this.text.innerHTML = a
      }, g.prototype._createSvgView = function(a) {
        var b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._initializeSvg(b, a);
        var c = null;
        (a.trailColor || a.trailWidth) && (c = this._createTrail(a), b.appendChild(c));
        var d = this._createPath(a);
        return b.appendChild(d), {
          svg: b,
          path: d,
          trail: c
        }
      }, g.prototype._initializeSvg = function(a, b) {
        a.setAttribute("viewBox", "0 0 100 100")
      }, g.prototype._createPath = function(a) {
        var b = this._pathString(a);
        return this._createPathElement(b, a)
      }, g.prototype._createTrail = function(a) {
        var b = this._trailString(a),
          c = e.extend({}, a);
        return c.trailColor || (c.trailColor = "#eee"), c.trailWidth || (c.trailWidth = c.strokeWidth), c.color = c.trailColor, c.strokeWidth = c.trailWidth, c.fill = null, this._createPathElement(b, c)
      }, g.prototype._createPathElement = function(a, b) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return c.setAttribute("d", a), c.setAttribute("stroke", b.color), c.setAttribute("stroke-width", b.strokeWidth), b.fill ? c.setAttribute("fill", b.fill) : c.setAttribute("fill-opacity", "0"), c
      }, g.prototype._createTextContainer = function(a, b) {
        var c = document.createElement("div");
        c.className = a.text.className;
        var d = a.text.style;
        return d && (a.text.autoStyleContainer && (b.style.position = "relative"), e.setStyles(c, d), d.color || (c.style.color = a.color)), this._initializeTextContainer(a, b, c), c
      }, g.prototype._initializeTextContainer = function(a, b, c) {}, g.prototype._pathString = function(a) {
        throw new Error("Override this function for each progress bar")
      }, g.prototype._trailString = function(a) {
        throw new Error("Override this function for each progress bar")
      }, g.prototype._warnContainerAspectRatio = function(a) {
        if (this.containerAspectRatio) {
          var b = window.getComputedStyle(a, null),
            c = parseFloat(b.getPropertyValue("width"), 10),
            d = parseFloat(b.getPropertyValue("height"), 10);
          e.floatEquals(this.containerAspectRatio, c / d) || (console.warn("Incorrect aspect ratio of container", "#" + a.id, "detected:", b.getPropertyValue("width") + "(width)", "/", b.getPropertyValue("height") + "(height)", "=", c / d), console.warn("Aspect ratio of should be", this.containerAspectRatio))
        }
      }, b.exports = g
    }, {
      "./path": 5,
      "./utils": 9
    }],
    8: [function(a, b, c) {
      var d = a("./shape"),
        e = a("./utils"),
        f = function(a, b) {
          this._pathTemplate = "M 0,{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{strokeWidth}", this._trailTemplate = "M {startMargin},{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{halfOfStrokeWidth}", d.apply(this, arguments)
        };
      f.prototype = new d, f.prototype.constructor = f, f.prototype._pathString = function(a) {
        var b = 100 - a.strokeWidth / 2;
        return e.render(this._pathTemplate, {
          width: b,
          strokeWidth: a.strokeWidth,
          halfOfStrokeWidth: a.strokeWidth / 2
        })
      }, f.prototype._trailString = function(a) {
        var b = 100 - a.strokeWidth / 2;
        return e.render(this._trailTemplate, {
          width: b,
          strokeWidth: a.strokeWidth,
          halfOfStrokeWidth: a.strokeWidth / 2,
          startMargin: a.strokeWidth / 2 - a.trailWidth / 2
        })
      }, b.exports = f
    }, {
      "./shape": 7,
      "./utils": 9
    }],
    9: [function(a, b, c) {
      function d(a, b, c) {
        a = a || {}, b = b || {}, c = c || !1;
        for (var e in b)
          if (b.hasOwnProperty(e)) {
            var f = a[e],
              g = b[e];
            c && l(f) && l(g) ? a[e] = d(f, g, c) : a[e] = g
          } return a
      }

      function e(a, b) {
        var c = a;
        for (var d in b)
          if (b.hasOwnProperty(d)) {
            var e = b[d],
              f = "\\{" + d + "\\}",
              g = new RegExp(f, "g");
            c = c.replace(g, e)
          } return c
      }

      function f(a, b, c) {
        for (var d = a.style, e = 0; e < p.length; ++e) {
          d[p[e] + h(b)] = c
        }
        d[b] = c
      }

      function g(a, b) {
        m(b, function(b, c) {
          null !== b && void 0 !== b && (l(b) && !0 === b.prefix ? f(a, c, b.value) : a.style[c] = b)
        })
      }

      function h(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
      }

      function i(a) {
        return "string" == typeof a || a instanceof String
      }

      function j(a) {
        return "function" == typeof a
      }

      function k(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
      }

      function l(a) {
        return !k(a) && ("object" == typeof a && !!a)
      }

      function m(a, b) {
        for (var c in a)
          if (a.hasOwnProperty(c)) {
            var d = a[c];
            b(d, c)
          }
      }

      function n(a, b) {
        return Math.abs(a - b) < q
      }

      function o(a) {
        for (; a.firstChild;) a.removeChild(a.firstChild)
      }
      var p = "Webkit Moz O ms".split(" "),
        q = .001;
      b.exports = {
        extend: d,
        render: e,
        setStyle: f,
        setStyles: g,
        capitalize: h,
        isString: i,
        isFunction: j,
        isObject: l,
        forEachObject: m,
        floatEquals: n,
        removeChildren: o
      }
    }, {}]
  }, {}, [4])(4)
});

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

! function(t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
    return e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
  "use strict";

  function i(i, r, a) {
    function h(t, e, n) {
      var o, r = "$()." + i + '("' + e + '")';
      return t.each(function(t, h) {
        var u = a.data(h, i);
        if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
        var d = u[e];
        if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
        var l = d.apply(u, n);
        o = void 0 === o ? l : o
      }), void 0 !== o ? o : t
    }

    function u(t, e) {
      t.each(function(t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
      })
    }
    a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function(t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
    }), a.fn[i] = function(t) {
      if ("string" == typeof t) {
        var e = o.call(arguments, 1);
        return h(this, t, e)
      }
      return u(this, t), this
    }, n(a))
  }

  function n(t) {
    !t || t && t.bridget || (t.bridget = i)
  }
  var o = Array.prototype.slice,
    r = t.console,
    s = "undefined" == typeof r ? function() {} : function(t) {
      r.error(t)
    };
  return n(e || t.jQuery), i
}),
  function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
  }("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
      if (t && e) {
        var i = this._events = this._events || {},
          n = i[t] = i[t] || [];
        return -1 == n.indexOf(e) && n.push(e), this
      }
    }, e.once = function(t, e) {
      if (t && e) {
        this.on(t, e);
        var i = this._onceEvents = this._onceEvents || {},
          n = i[t] = i[t] || {};
        return n[e] = !0, this
      }
    }, e.off = function(t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = i.indexOf(e);
        return -1 != n && i.splice(n, 1), this
      }
    }, e.emitEvent = function(t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        i = i.slice(0), e = e || [];
        for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(t, r), delete n[r]), r.apply(this, e)
        }
        return this
      }
    }, e.allOff = function() {
      delete this._events, delete this._onceEvents
    }, t
  }),
  function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
  }(window, function() {
    "use strict";

    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e
    }

    function e() {}

    function i() {
      for (var t = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      }, e = 0; u > e; e++) {
        var i = h[e];
        t[i] = 0
      }
      return t
    }

    function n(t) {
      var e = getComputedStyle(t);
      return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e)
      }
    }

    function r(e) {
      if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
        var r = n(e);
        if ("none" == r.display) return i();
        var a = {};
        a.width = e.offsetWidth, a.height = e.offsetHeight;
        for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
          var c = h[l],
            f = r[c],
            m = parseFloat(f);
          a[c] = isNaN(m) ? 0 : m
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (E ? 0 : p + _));
        var x = t(r.height);
        return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
      }
    }
    var s, a = "undefined" == typeof console ? e : function(t) {
        console.error(t)
      },
      h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      u = h.length,
      d = !1;
    return r
  }),
  function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
  }(window, function() {
    "use strict";
    var t = function() {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o
      }
    }();
    return function(e, i) {
      return e[t](i)
    }
  }),
  function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
      return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
  }(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
      for (var i in e) t[i] = e[i];
      return t
    }, i.modulo = function(t, e) {
      return (t % e + e) % e
    };
    var n = Array.prototype.slice;
    i.makeArray = function(t) {
      if (Array.isArray(t)) return t;
      if (null === t || void 0 === t) return [];
      var e = "object" == typeof t && "number" == typeof t.length;
      return e ? n.call(t) : [t]
    }, i.removeFrom = function(t, e) {
      var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, i.getParent = function(t, i) {
      for (; t.parentNode && t != document.body;)
        if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
      return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
      var e = "on" + t.type;
      this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
      t = i.makeArray(t);
      var o = [];
      return t.forEach(function(t) {
        if (t instanceof HTMLElement) {
          if (!n) return void o.push(t);
          e(t, n) && o.push(t);
          for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
        }
      }), o
    }, i.debounceMethod = function(t, e, i) {
      i = i || 100;
      var n = t.prototype[e],
        o = e + "Timeout";
      t.prototype[e] = function() {
        var t = this[o];
        clearTimeout(t);
        var e = arguments,
          r = this;
        this[o] = setTimeout(function() {
          n.apply(r, e), delete r[o]
        }, i)
      }
    }, i.docReady = function(t) {
      var e = document.readyState;
      "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
      return t.replace(/(.)([A-Z])/g, function(t, e, i) {
        return e + "-" + i
      }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
      i.docReady(function() {
        var r = i.toDashed(n),
          s = "data-" + r,
          a = document.querySelectorAll("[" + s + "]"),
          h = document.querySelectorAll(".js-" + r),
          u = i.makeArray(a).concat(i.makeArray(h)),
          d = s + "-options",
          l = t.jQuery;
        u.forEach(function(t) {
          var i, r = t.getAttribute(s) || t.getAttribute(d);
          try {
            i = r && JSON.parse(r)
          } catch (a) {
            return void(o && o.error("Error parsing " + s + " on " + t.className + ": " + a))
          }
          var h = new e(t, i);
          l && l.data(t, n, h)
        })
      })
    }, i
  }),
  function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
  }(window, function(t, e) {
    "use strict";

    function i(t) {
      for (var e in t) return !1;
      return e = null, !0
    }

    function n(t, e) {
      t && (this.element = t, this.layout = e, this.position = {
        x: 0,
        y: 0
      }, this._create())
    }

    function o(t) {
      return t.replace(/([A-Z])/g, function(t) {
        return "-" + t.toLowerCase()
      })
    }
    var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
      } [s],
      u = {
        transform: a,
        transition: s,
        transitionDuration: s + "Duration",
        transitionProperty: s + "Property",
        transitionDelay: s + "Delay"
      },
      d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function() {
      this._transn = {
        ingProperties: {},
        clean: {},
        onEnd: {}
      }, this.css({
        position: "absolute"
      })
    }, d.handleEvent = function(t) {
      var e = "on" + t.type;
      this[e] && this[e](t)
    }, d.getSize = function() {
      this.size = e(this.element)
    }, d.css = function(t) {
      var e = this.element.style;
      for (var i in t) {
        var n = u[i] || i;
        e[n] = t[i]
      }
    }, d.getPosition = function() {
      var t = getComputedStyle(this.element),
        e = this.layout._getOption("originLeft"),
        i = this.layout._getOption("originTop"),
        n = t[e ? "left" : "right"],
        o = t[i ? "top" : "bottom"],
        r = parseFloat(n),
        s = parseFloat(o),
        a = this.layout.size; - 1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s
    }, d.layoutPosition = function() {
      var t = this.layout.size,
        e = {},
        i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop"),
        o = i ? "paddingLeft" : "paddingRight",
        r = i ? "left" : "right",
        s = i ? "right" : "left",
        a = this.position.x + t[o];
      e[r] = this.getXValue(a), e[s] = "";
      var h = n ? "paddingTop" : "paddingBottom",
        u = n ? "top" : "bottom",
        d = n ? "bottom" : "top",
        l = this.position.y + t[h];
      e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
      var e = this.layout._getOption("horizontal");
      return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
      var e = this.layout._getOption("horizontal");
      return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
      this.getPosition();
      var i = this.position.x,
        n = this.position.y,
        o = t == this.position.x && e == this.position.y;
      if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();
      var r = t - i,
        s = e - n,
        a = {};
      a.transform = this.getTranslate(r, s), this.transition({
        to: a,
        onTransitionEnd: {
          transform: this.layoutPosition
        },
        isCleaning: !0
      })
    }, d.getTranslate = function(t, e) {
      var i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop");
      return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
      this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
      this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function(t) {
      this.css(t.to), t.isCleaning && this._removeStyles(t.to);
      for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
      if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
      var e = this._transn;
      for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
      for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
      if (t.from) {
        this.css(t.from);
        var n = this.element.offsetHeight;
        n = null
      }
      this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function() {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        t = "number" == typeof t ? t + "ms" : t, this.css({
          transitionProperty: l,
          transitionDuration: t,
          transitionDelay: this.staggerDelay || 0
        }), this.element.addEventListener(h, this, !1)
      }
    }, d.onwebkitTransitionEnd = function(t) {
      this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
      this.ontransitionend(t)
    };
    var c = {
      "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = c[t.propertyName] || t.propertyName;
        if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n]
        }
        this.emitEvent("transitionEnd", [this])
      }
    }, d.disableTransition = function() {
      this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
      var e = {};
      for (var i in t) e[i] = "";
      this.css(e)
    };
    var f = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
      this.css(f)
    }, d.stagger = function(t) {
      t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
      this.element.parentNode.removeChild(this.element), this.css({
        display: ""
      }), this.emitEvent("remove", [this])
    }, d.remove = function() {
      return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
        this.removeElem()
      }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
      delete this.isHidden, this.css({
        display: ""
      });
      var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("visibleStyle");
      e[i] = this.onRevealTransitionEnd, this.transition({
        from: t.hiddenStyle,
        to: t.visibleStyle,
        isCleaning: !0,
        onTransitionEnd: e
      })
    }, d.onRevealTransitionEnd = function() {
      this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
      var e = this.layout.options[t];
      if (e.opacity) return "opacity";
      for (var i in e) return i
    }, d.hide = function() {
      this.isHidden = !0, this.css({
        display: ""
      });
      var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("hiddenStyle");
      e[i] = this.onHideTransitionEnd, this.transition({
        from: t.visibleStyle,
        to: t.hiddenStyle,
        isCleaning: !0,
        onTransitionEnd: e
      })
    }, d.onHideTransitionEnd = function() {
      this.isHidden && (this.css({
        display: "none"
      }), this.emitEvent("hide"))
    }, d.destroy = function() {
      this.css({
        position: "",
        left: "",
        right: "",
        top: "",
        bottom: "",
        transition: "",
        transform: ""
      })
    }, n
  }),
  function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) {
      return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
  }(window, function(t, e, i, n, o) {
    "use strict";

    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
      this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
      var o = ++l;
      this.element.outlayerGUID = o, c[o] = this, this._create();
      var r = this._getOption("initLayout");
      r && this.layout()
    }

    function s(t) {
      function e() {
        t.apply(this, arguments)
      }
      return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var o = m[n] || 1;
      return i * o
    }
    var h = t.console,
      u = t.jQuery,
      d = function() {},
      l = 0,
      c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
      containerStyle: {
        position: "relative"
      },
      initLayout: !0,
      originLeft: !0,
      originTop: !0,
      resize: !0,
      resizeContainer: !0,
      transitionDuration: "0.4s",
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.001)"
      },
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)"
      }
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function(t) {
      n.extend(this.options, t)
    }, f._getOption = function(t) {
      var e = this.constructor.compatOptions[t];
      return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
      initLayout: "isInitLayout",
      horizontal: "isHorizontal",
      layoutInstant: "isLayoutInstant",
      originLeft: "isOriginLeft",
      originTop: "isOriginTop",
      resize: "isResizeBound",
      resizeContainer: "isResizingContainer"
    }, f._create = function() {
      this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
      var t = this._getOption("resize");
      t && this.bindResize()
    }, f.reloadItems = function() {
      this.items = this._itemize(this.element.children)
    }, f._itemize = function(t) {
      for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
        var r = e[o],
          s = new i(r, this);
        n.push(s)
      }
      return n
    }, f._filterFindItemElements = function(t) {
      return n.filterFindElements(t, this.options.itemSelector)
    }, f.getItemElements = function() {
      return this.items.map(function(t) {
        return t.element
      })
    }, f.layout = function() {
      this._resetLayout(), this._manageStamps();
      var t = this._getOption("layoutInstant"),
        e = void 0 !== t ? t : !this._isLayoutInited;
      this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function() {
      this.getSize()
    }, f.getSize = function() {
      this.size = i(this.element)
    }, f._getMeasurement = function(t, e) {
      var n, o = this.options[t];
      o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, f.layoutItems = function(t, e) {
      t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, f._getItemsForLayout = function(t) {
      return t.filter(function(t) {
        return !t.isIgnored
      })
    }, f._layoutItems = function(t, e) {
      if (this._emitCompleteOnItems("layout", t), t && t.length) {
        var i = [];
        t.forEach(function(t) {
          var n = this._getItemLayoutPosition(t);
          n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
        }, this), this._processLayoutQueue(i)
      }
    }, f._getItemLayoutPosition = function() {
      return {
        x: 0,
        y: 0
      }
    }, f._processLayoutQueue = function(t) {
      this.updateStagger(), t.forEach(function(t, e) {
        this._positionItem(t.item, t.x, t.y, t.isInstant, e)
      }, this)
    }, f.updateStagger = function() {
      var t = this.options.stagger;
      return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, f._positionItem = function(t, e, i, n, o) {
      n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, f._postLayout = function() {
      this.resizeContainer()
    }, f.resizeContainer = function() {
      var t = this._getOption("resizeContainer");
      if (t) {
        var e = this._getContainerSize();
        e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
      }
    }, f._getContainerSize = d, f._setContainerMeasure = function(t, e) {
      if (void 0 !== t) {
        var i = this.size;
        i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
      }
    }, f._emitCompleteOnItems = function(t, e) {
      function i() {
        o.dispatchEvent(t + "Complete", null, [e])
      }

      function n() {
        s++, s == r && i()
      }
      var o = this,
        r = e.length;
      if (!e || !r) return void i();
      var s = 0;
      e.forEach(function(e) {
        e.once(t, n)
      })
    }, f.dispatchEvent = function(t, e, i) {
      var n = e ? [e].concat(i) : i;
      if (this.emitEvent(t, n), u)
        if (this.$element = this.$element || u(this.element), e) {
          var o = u.Event(e);
          o.type = t, this.$element.trigger(o, i)
        } else this.$element.trigger(t, i)
    }, f.ignore = function(t) {
      var e = this.getItem(t);
      e && (e.isIgnored = !0)
    }, f.unignore = function(t) {
      var e = this.getItem(t);
      e && delete e.isIgnored
    }, f.stamp = function(t) {
      t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, f.unstamp = function(t) {
      t = this._find(t), t && t.forEach(function(t) {
        n.removeFrom(this.stamps, t), this.unignore(t)
      }, this)
    }, f._find = function(t) {
      return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, f._manageStamps = function() {
      this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function() {
      var t = this.element.getBoundingClientRect(),
        e = this.size;
      this._boundingRect = {
        left: t.left + e.paddingLeft + e.borderLeftWidth,
        top: t.top + e.paddingTop + e.borderTopWidth,
        right: t.right - (e.paddingRight + e.borderRightWidth),
        bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
      }
    }, f._manageStamp = d, f._getElementOffset = function(t) {
      var e = t.getBoundingClientRect(),
        n = this._boundingRect,
        o = i(t),
        r = {
          left: e.left - n.left - o.marginLeft,
          top: e.top - n.top - o.marginTop,
          right: n.right - e.right - o.marginRight,
          bottom: n.bottom - e.bottom - o.marginBottom
        };
      return r
    }, f.handleEvent = n.handleEvent, f.bindResize = function() {
      t.addEventListener("resize", this), this.isResizeBound = !0
    }, f.unbindResize = function() {
      t.removeEventListener("resize", this), this.isResizeBound = !1
    }, f.onresize = function() {
      this.resize()
    }, n.debounceMethod(r, "onresize", 100), f.resize = function() {
      this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function() {
      var t = i(this.element),
        e = this.size && t;
      return e && t.innerWidth !== this.size.innerWidth
    }, f.addItems = function(t) {
      var e = this._itemize(t);
      return e.length && (this.items = this.items.concat(e)), e
    }, f.appended = function(t) {
      var e = this.addItems(t);
      e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, f.prepended = function(t) {
      var e = this._itemize(t);
      if (e.length) {
        var i = this.items.slice(0);
        this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
      }
    }, f.reveal = function(t) {
      if (this._emitCompleteOnItems("reveal", t), t && t.length) {
        var e = this.updateStagger();
        t.forEach(function(t, i) {
          t.stagger(i * e), t.reveal()
        })
      }
    }, f.hide = function(t) {
      if (this._emitCompleteOnItems("hide", t), t && t.length) {
        var e = this.updateStagger();
        t.forEach(function(t, i) {
          t.stagger(i * e), t.hide()
        })
      }
    }, f.revealItemElements = function(t) {
      var e = this.getItems(t);
      this.reveal(e)
    }, f.hideItemElements = function(t) {
      var e = this.getItems(t);
      this.hide(e)
    }, f.getItem = function(t) {
      for (var e = 0; e < this.items.length; e++) {
        var i = this.items[e];
        if (i.element == t) return i
      }
    }, f.getItems = function(t) {
      t = n.makeArray(t);
      var e = [];
      return t.forEach(function(t) {
        var i = this.getItem(t);
        i && e.push(i)
      }, this), e
    }, f.remove = function(t) {
      var e = this.getItems(t);
      this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
        t.remove(), n.removeFrom(this.items, t)
      }, this)
    }, f.destroy = function() {
      var t = this.element.style;
      t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
        t.destroy()
      }), this.unbindResize();
      var e = this.element.outlayerGUID;
      delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function(t) {
      t = n.getQueryElement(t);
      var e = t && t.outlayerGUID;
      return e && c[e]
    }, r.create = function(t, e) {
      var i = s(r);
      return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var m = {
      ms: 1,
      s: 1e3
    };
    return r.Item = o, r
  }),
  function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
  }(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function() {
      this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
      for (var t = 0; t < this.cols; t++) this.colYs.push(0);
      this.maxY = 0, this.horizontalColIndex = 0
    }, n.measureColumns = function() {
      if (this.getContainerWidth(), !this.columnWidth) {
        var t = this.items[0],
          i = t && t.element;
        this.columnWidth = i && e(i).outerWidth || this.containerWidth
      }
      var n = this.columnWidth += this.gutter,
        o = this.containerWidth + this.gutter,
        r = o / n,
        s = n - o % n,
        a = s && 1 > s ? "round" : "floor";
      r = Math[a](r), this.cols = Math.max(r, 1)
    }, n.getContainerWidth = function() {
      var t = this._getOption("fitWidth"),
        i = t ? this.element.parentNode : this.element,
        n = e(i);
      this.containerWidth = n && n.innerWidth
    }, n._getItemLayoutPosition = function(t) {
      t.getSize();
      var e = t.size.outerWidth % this.columnWidth,
        i = e && 1 > e ? "round" : "ceil",
        n = Math[i](t.size.outerWidth / this.columnWidth);
      n = Math.min(n, this.cols);
      for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
        x: this.columnWidth * r.col,
        y: r.y
      }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) this.colYs[u] = a;
      return s
    }, n._getTopColPosition = function(t) {
      var e = this._getTopColGroup(t),
        i = Math.min.apply(Math, e);
      return {
        col: e.indexOf(i),
        y: i
      }
    }, n._getTopColGroup = function(t) {
      if (2 > t) return this.colYs;
      for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);
      return e
    }, n._getColGroupY = function(t, e) {
      if (2 > e) return this.colYs[t];
      var i = this.colYs.slice(t, t + e);
      return Math.max.apply(Math, i)
    }, n._getHorizontalColPosition = function(t, e) {
      var i = this.horizontalColIndex % this.cols,
        n = t > 1 && i + t > this.cols;
      i = n ? 0 : i;
      var o = e.size.outerWidth && e.size.outerHeight;
      return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {
        col: i,
        y: this._getColGroupY(i, t)
      }
    }, n._manageStamp = function(t) {
      var i = e(t),
        n = this._getElementOffset(t),
        o = this._getOption("originLeft"),
        r = o ? n.left : n.right,
        s = r + i.outerWidth,
        a = Math.floor(r / this.columnWidth);
      a = Math.max(0, a);
      var h = Math.floor(s / this.columnWidth);
      h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
      for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, n._getContainerSize = function() {
      this.maxY = Math.max.apply(Math, this.colYs);
      var t = {
        height: this.maxY
      };
      return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, n._getContainerFitWidth = function() {
      for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
      return (this.cols - t) * this.columnWidth - this.gutter
    }, n.needsResizeLayout = function() {
      var t = this.containerWidth;
      return this.getContainerWidth(), t != this.containerWidth
    }, i
  });
/**
 * jQuery CSS Customizable Scrollbar
 *
 * Copyright 2015, Yuriy Khabarov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * If you found bug, please contact me via email <13real008@gmail.com>
 *
 * @author Yuriy Khabarov aka Gromo
 * @version 0.2.10
 * @url https://github.com/gromo/jquery.scrollbar/
 *
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(root.jQuery);
  }
}(this, function($) {
  'use strict';

  // init flags & variables
  var debug = false;

  var browser = {
    data: {
      index: 0,
      name: 'scrollbar'
    },
    macosx: /mac/i.test(navigator.platform),
    mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
    overlay: null,
    scroll: null,
    scrolls: [],
    webkit: /webkit/i.test(navigator.userAgent) && !/edge\/\d+/i.test(navigator.userAgent)
  };

  browser.scrolls.add = function(instance) {
    this.remove(instance).push(instance);
  };
  browser.scrolls.remove = function(instance) {
    while ($.inArray(instance, this) >= 0) {
      this.splice($.inArray(instance, this), 1);
    }
    return this;
  };

  var defaults = {
    "autoScrollSize": true, // automatically calculate scrollsize
    "autoUpdate": true, // update scrollbar if content/container size changed
    "debug": false, // debug mode
    "disableBodyScroll": false, // disable body scroll if mouse over container
    "duration": 200, // scroll animate duration in ms
    "ignoreMobile": false, // ignore mobile devices
    "ignoreOverlay": false, // ignore browsers with overlay scrollbars (mobile, MacOS)
    "scrollStep": 30, // scroll step for scrollbar arrows
    "showArrows": false, // add class to show arrows
    "stepScrolling": true, // when scrolling to scrollbar mousedown position

    "scrollx": null, // horizontal scroll element
    "scrolly": null, // vertical scroll element

    "onDestroy": null, // callback function on destroy,
    "onInit": null, // callback function on first initialization
    "onScroll": null, // callback function on content scrolling
    "onUpdate": null // callback function on init/resize (before scrollbar size calculation)
  };


  var BaseScrollbar = function(container) {

    if (!browser.scroll) {
      browser.overlay = isScrollOverlaysContent();
      browser.scroll = getBrowserScrollSize();
      updateScrollbars();

      $(window).resize(function() {
        var forceUpdate = false;
        if (browser.scroll && (browser.scroll.height || browser.scroll.width)) {
          var scroll = getBrowserScrollSize();
          if (scroll.height !== browser.scroll.height || scroll.width !== browser.scroll.width) {
            browser.scroll = scroll;
            forceUpdate = true; // handle page zoom
          }
        }
        updateScrollbars(forceUpdate);
      });
    }

    this.container = container;
    this.namespace = '.scrollbar_' + browser.data.index++;
    this.options = $.extend({}, defaults, window.jQueryScrollbarOptions || {});
    this.scrollTo = null;
    this.scrollx = {};
    this.scrolly = {};

    container.data(browser.data.name, this);
    browser.scrolls.add(this);
  };

  BaseScrollbar.prototype = {

    destroy: function() {

      if (!this.wrapper) {
        return;
      }

      this.container.removeData(browser.data.name);
      browser.scrolls.remove(this);

      // init variables
      var scrollLeft = this.container.scrollLeft();
      var scrollTop = this.container.scrollTop();

      this.container.insertBefore(this.wrapper).css({
        "height": "",
        "margin": "",
        "max-height": ""
      })
        .removeClass('scroll-content scroll-scrollx_visible scroll-scrolly_visible')
        .off(this.namespace)
        .scrollLeft(scrollLeft)
        .scrollTop(scrollTop);

      this.scrollx.scroll.removeClass('scroll-scrollx_visible').find('div').andSelf().off(this.namespace);
      this.scrolly.scroll.removeClass('scroll-scrolly_visible').find('div').andSelf().off(this.namespace);

      this.wrapper.remove();

      $(document).add('body').off(this.namespace);

      if ($.isFunction(this.options.onDestroy)) {
        this.options.onDestroy.apply(this, [this.container]);
      }
    },
    init: function(options) {

      // init variables
      var S = this,
        c = this.container,
        cw = this.containerWrapper || c,
        namespace = this.namespace,
        o = $.extend(this.options, options || {}),
        s = {
          x: this.scrollx,
          y: this.scrolly
        },
        w = this.wrapper;

      var initScroll = {
        "scrollLeft": c.scrollLeft(),
        "scrollTop": c.scrollTop()
      };

      // do not init if in ignorable browser
      if ((browser.mobile && o.ignoreMobile) ||
        (browser.overlay && o.ignoreOverlay) ||
        (browser.macosx && !browser.webkit) // still required to ignore nonWebKit browsers on Mac
      ) {
        return false;
      }

      // init scroll container
      if (!w) {
        this.wrapper = w = $('<div>').addClass('scroll-wrapper').addClass(c.attr('class'))
          .css('position', c.css('position') == 'absolute' ? 'absolute' : 'relative')
          .insertBefore(c).append(c);

        if (c.is('textarea')) {
          this.containerWrapper = cw = $('<div>').insertBefore(c).append(c);
          w.addClass('scroll-textarea');
        }

        cw.addClass('scroll-content').css({
          "height": "auto",
          "margin-bottom": browser.scroll.height * -1 + 'px',
          "margin-right": browser.scroll.width * -1 + 'px',
          "max-height": ""
        });

        c.on('scroll' + namespace, function(event) {
          if ($.isFunction(o.onScroll)) {
            o.onScroll.call(S, {
              "maxScroll": s.y.maxScrollOffset,
              "scroll": c.scrollTop(),
              "size": s.y.size,
              "visible": s.y.visible
            }, {
              "maxScroll": s.x.maxScrollOffset,
              "scroll": c.scrollLeft(),
              "size": s.x.size,
              "visible": s.x.visible
            });
          }
          s.x.isVisible && s.x.scroll.bar.css('left', c.scrollLeft() * s.x.kx + 'px');
          s.y.isVisible && s.y.scroll.bar.css('top', c.scrollTop() * s.y.kx + 'px');
        });

        /* prevent native scrollbars to be visible on #anchor click */
        w.on('scroll' + namespace, function() {
          w.scrollTop(0).scrollLeft(0);
        });

        if (o.disableBodyScroll) {
          var handleMouseScroll = function(event) {
            isVerticalScroll(event) ?
              s.y.isVisible && s.y.mousewheel(event) :
              s.x.isVisible && s.x.mousewheel(event);
          };
          w.on('MozMousePixelScroll' + namespace, handleMouseScroll);
          w.on('mousewheel' + namespace, handleMouseScroll);

          if (browser.mobile) {
            w.on('touchstart' + namespace, function(event) {
              var touch = event.originalEvent.touches && event.originalEvent.touches[0] || event;
              var originalTouch = {
                "pageX": touch.pageX,
                "pageY": touch.pageY
              };
              var originalScroll = {
                "left": c.scrollLeft(),
                "top": c.scrollTop()
              };
              $(document).on('touchmove' + namespace, function(event) {
                var touch = event.originalEvent.targetTouches && event.originalEvent.targetTouches[0] || event;
                c.scrollLeft(originalScroll.left + originalTouch.pageX - touch.pageX);
                c.scrollTop(originalScroll.top + originalTouch.pageY - touch.pageY);
                event.preventDefault();
              });
              $(document).on('touchend' + namespace, function() {
                $(document).off(namespace);
              });
            });
          }
        }
        if ($.isFunction(o.onInit)) {
          o.onInit.apply(this, [c]);
        }
      } else {
        cw.css({
          "height": "auto",
          "margin-bottom": browser.scroll.height * -1 + 'px',
          "margin-right": browser.scroll.width * -1 + 'px',
          "max-height": ""
        });
      }

      // init scrollbars & recalculate sizes
      $.each(s, function(d, scrollx) {

        var scrollCallback = null;
        var scrollForward = 1;
        var scrollOffset = (d === 'x') ? 'scrollLeft' : 'scrollTop';
        var scrollStep = o.scrollStep;
        var scrollTo = function() {
          var currentOffset = c[scrollOffset]();
          c[scrollOffset](currentOffset + scrollStep);
          if (scrollForward == 1 && (currentOffset + scrollStep) >= scrollToValue)
            currentOffset = c[scrollOffset]();
          if (scrollForward == -1 && (currentOffset + scrollStep) <= scrollToValue)
            currentOffset = c[scrollOffset]();
          if (c[scrollOffset]() == currentOffset && scrollCallback) {
            scrollCallback();
          }
        }
        var scrollToValue = 0;

        if (!scrollx.scroll) {

          scrollx.scroll = S._getScroll(o['scroll' + d]).addClass('scroll-' + d);

          if (o.showArrows) {
            scrollx.scroll.addClass('scroll-element_arrows_visible');
          }

          scrollx.mousewheel = function(event) {

            if (!scrollx.isVisible || (d === 'x' && isVerticalScroll(event))) {
              return true;
            }
            if (d === 'y' && !isVerticalScroll(event)) {
              s.x.mousewheel(event);
              return true;
            }

            var delta = event.originalEvent.wheelDelta * -1 || event.originalEvent.detail;
            var maxScrollValue = scrollx.size - scrollx.visible - scrollx.offset;

            if ((delta > 0 && scrollToValue < maxScrollValue) || (delta < 0 && scrollToValue > 0)) {
              scrollToValue = scrollToValue + delta;
              if (scrollToValue < 0)
                scrollToValue = 0;
              if (scrollToValue > maxScrollValue)
                scrollToValue = maxScrollValue;

              S.scrollTo = S.scrollTo || {};
              S.scrollTo[scrollOffset] = scrollToValue;
              setTimeout(function() {
                if (S.scrollTo) {
                  c.stop().animate(S.scrollTo, 240, 'linear', function() {
                    scrollToValue = c[scrollOffset]();
                  });
                  S.scrollTo = null;
                }
              }, 1);
            }

            event.preventDefault();
            return false;
          };

          scrollx.scroll
            .on('MozMousePixelScroll' + namespace, scrollx.mousewheel)
            .on('mousewheel' + namespace, scrollx.mousewheel)
            .on('mouseenter' + namespace, function() {
              scrollToValue = c[scrollOffset]();
            });

          // handle arrows & scroll inner mousedown event
          scrollx.scroll.find('.scroll-arrow, .scroll-element_track')
            .on('mousedown' + namespace, function(event) {

              if (event.which != 1) // lmb
                return true;

              scrollForward = 1;

              var data = {
                "eventOffset": event[(d === 'x') ? 'pageX' : 'pageY'],
                "maxScrollValue": scrollx.size - scrollx.visible - scrollx.offset,
                "scrollbarOffset": scrollx.scroll.bar.offset()[(d === 'x') ? 'left' : 'top'],
                "scrollbarSize": scrollx.scroll.bar[(d === 'x') ? 'outerWidth' : 'outerHeight']()
              };
              var timeout = 0,
                timer = 0;

              if ($(this).hasClass('scroll-arrow')) {
                scrollForward = $(this).hasClass("scroll-arrow_more") ? 1 : -1;
                scrollStep = o.scrollStep * scrollForward;
                scrollToValue = scrollForward > 0 ? data.maxScrollValue : 0;
              } else {
                scrollForward = (data.eventOffset > (data.scrollbarOffset + data.scrollbarSize) ? 1 :
                  (data.eventOffset < data.scrollbarOffset ? -1 : 0));
                scrollStep = Math.round(scrollx.visible * 0.75) * scrollForward;
                scrollToValue = (data.eventOffset - data.scrollbarOffset -
                  (o.stepScrolling ? (scrollForward == 1 ? data.scrollbarSize : 0) :
                    Math.round(data.scrollbarSize / 2)));
                scrollToValue = c[scrollOffset]() + (scrollToValue / scrollx.kx);
              }

              S.scrollTo = S.scrollTo || {};
              S.scrollTo[scrollOffset] = o.stepScrolling ? c[scrollOffset]() + scrollStep : scrollToValue;

              if (o.stepScrolling) {
                scrollCallback = function() {
                  scrollToValue = c[scrollOffset]();
                  clearInterval(timer);
                  clearTimeout(timeout);
                  timeout = 0;
                  timer = 0;
                };
                timeout = setTimeout(function() {
                  timer = setInterval(scrollTo, 40);
                }, o.duration + 100);
              }

              setTimeout(function() {
                if (S.scrollTo) {
                  c.animate(S.scrollTo, o.duration);
                  S.scrollTo = null;
                }
              }, 1);

              return S._handleMouseDown(scrollCallback, event);
            });

          // handle scrollbar drag'n'drop
          scrollx.scroll.bar.on('mousedown' + namespace, function(event) {

            if (event.which != 1) // lmb
              return true;

            var eventPosition = event[(d === 'x') ? 'pageX' : 'pageY'];
            var initOffset = c[scrollOffset]();

            scrollx.scroll.addClass('scroll-draggable');

            $(document).on('mousemove' + namespace, function(event) {
              var diff = parseInt((event[(d === 'x') ? 'pageX' : 'pageY'] - eventPosition) / scrollx.kx, 10);
              c[scrollOffset](initOffset + diff);
            });

            return S._handleMouseDown(function() {
              scrollx.scroll.removeClass('scroll-draggable');
              scrollToValue = c[scrollOffset]();
            }, event);
          });
        }
      });

      // remove classes & reset applied styles
      $.each(s, function(d, scrollx) {
        var scrollClass = 'scroll-scroll' + d + '_visible';
        var scrolly = (d == "x") ? s.y : s.x;

        scrollx.scroll.removeClass(scrollClass);
        scrolly.scroll.removeClass(scrollClass);
        cw.removeClass(scrollClass);
      });

      // calculate init sizes
      $.each(s, function(d, scrollx) {
        $.extend(scrollx, (d == "x") ? {
          "offset": parseInt(c.css('left'), 10) || 0,
          "size": c.prop('scrollWidth'),
          "visible": w.width()
        } : {
          "offset": parseInt(c.css('top'), 10) || 0,
          "size": c.prop('scrollHeight'),
          "visible": w.height()
        });
      });

      // update scrollbar visibility/dimensions
      this._updateScroll('x', this.scrollx);
      this._updateScroll('y', this.scrolly);

      if ($.isFunction(o.onUpdate)) {
        o.onUpdate.apply(this, [c]);
      }

      // calculate scroll size
      $.each(s, function(d, scrollx) {

        var cssOffset = (d === 'x') ? 'left' : 'top';
        var cssFullSize = (d === 'x') ? 'outerWidth' : 'outerHeight';
        var cssSize = (d === 'x') ? 'width' : 'height';
        var offset = parseInt(c.css(cssOffset), 10) || 0;

        var AreaSize = scrollx.size;
        var AreaVisible = scrollx.visible + offset;

        var scrollSize = scrollx.scroll.size[cssFullSize]() + (parseInt(scrollx.scroll.size.css(cssOffset), 10) || 0);

        if (o.autoScrollSize) {
          scrollx.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);
          scrollx.scroll.bar.css(cssSize, scrollx.scrollbarSize + 'px');
        }

        scrollx.scrollbarSize = scrollx.scroll.bar[cssFullSize]();
        scrollx.kx = ((scrollSize - scrollx.scrollbarSize) / (AreaSize - AreaVisible)) || 1;
        scrollx.maxScrollOffset = AreaSize - AreaVisible;
      });

      c.scrollLeft(initScroll.scrollLeft).scrollTop(initScroll.scrollTop).trigger('scroll');
    },

    /**
     * Get scrollx/scrolly object
     *
     * @param {Mixed} scroll
     * @returns {jQuery} scroll object
     */
    _getScroll: function(scroll) {
      var types = {
        advanced: [
          '<div class="scroll-element">',
          '<div class="scroll-element_corner"></div>',
          '<div class="scroll-arrow scroll-arrow_less"></div>',
          '<div class="scroll-arrow scroll-arrow_more"></div>',
          '<div class="scroll-element_outer">',
          '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
          '<div class="scroll-element_inner-wrapper">',
          '<div class="scroll-element_inner scroll-element_track">', // used for handling scrollbar click
          '<div class="scroll-element_inner-bottom"></div>',
          '</div>',
          '</div>',
          '<div class="scroll-bar">', // required
          '<div class="scroll-bar_body">',
          '<div class="scroll-bar_body-inner"></div>',
          '</div>',
          '<div class="scroll-bar_bottom"></div>',
          '<div class="scroll-bar_center"></div>',
          '</div>',
          '</div>',
          '</div>'
        ].join(''),
        simple: [
          '<div class="scroll-element">',
          '<div class="scroll-element_outer">',
          '<div class="scroll-element_size"></div>', // required! used for scrollbar size calculation !
          '<div class="scroll-element_track"></div>', // used for handling scrollbar click
          '<div class="scroll-bar"></div>', // required
          '</div>',
          '</div>'
        ].join('')
      };
      if (types[scroll]) {
        scroll = types[scroll];
      }
      if (!scroll) {
        scroll = types['simple'];
      }
      if (typeof(scroll) == 'string') {
        scroll = $(scroll).appendTo(this.wrapper);
      } else {
        scroll = $(scroll);
      }
      $.extend(scroll, {
        bar: scroll.find('.scroll-bar'),
        size: scroll.find('.scroll-element_size'),
        track: scroll.find('.scroll-element_track')
      });
      return scroll;
    },

    _handleMouseDown: function(callback, event) {

      var namespace = this.namespace;

      $(document).on('blur' + namespace, function() {
        $(document).add('body').off(namespace);
        callback && callback();
      });
      $(document).on('dragstart' + namespace, function(event) {
        event.preventDefault();
        return false;
      });
      $(document).on('mouseup' + namespace, function() {
        $(document).add('body').off(namespace);
        callback && callback();
      });
      $('body').on('selectstart' + namespace, function(event) {
        event.preventDefault();
        return false;
      });

      event && event.preventDefault();
      return false;
    },

    _updateScroll: function(d, scrollx) {

      var container = this.container,
        containerWrapper = this.containerWrapper || container,
        scrollClass = 'scroll-scroll' + d + '_visible',
        scrolly = (d === 'x') ? this.scrolly : this.scrollx,
        offset = parseInt(this.container.css((d === 'x') ? 'left' : 'top'), 10) || 0,
        wrapper = this.wrapper;

      var AreaSize = scrollx.size;
      var AreaVisible = scrollx.visible + offset;

      scrollx.isVisible = (AreaSize - AreaVisible) > 1; // bug in IE9/11 with 1px diff
      if (scrollx.isVisible) {
        scrollx.scroll.addClass(scrollClass);
        scrolly.scroll.addClass(scrollClass);
        containerWrapper.addClass(scrollClass);
      } else {
        scrollx.scroll.removeClass(scrollClass);
        scrolly.scroll.removeClass(scrollClass);
        containerWrapper.removeClass(scrollClass);
      }

      if (d === 'y') {
        if (container.is('textarea') || AreaSize < AreaVisible) {
          containerWrapper.css({
            "height": (AreaVisible + browser.scroll.height) + 'px',
            "max-height": "none"
          });
        } else {
          containerWrapper.css({
            //"height": "auto", // do not reset height value: issue with height:100%!
            "max-height": (AreaVisible + browser.scroll.height) + 'px'
          });
        }
      }

      if (scrollx.size != container.prop('scrollWidth') ||
        scrolly.size != container.prop('scrollHeight') ||
        scrollx.visible != wrapper.width() ||
        scrolly.visible != wrapper.height() ||
        scrollx.offset != (parseInt(container.css('left'), 10) || 0) ||
        scrolly.offset != (parseInt(container.css('top'), 10) || 0)
      ) {
        $.extend(this.scrollx, {
          "offset": parseInt(container.css('left'), 10) || 0,
          "size": container.prop('scrollWidth'),
          "visible": wrapper.width()
        });
        $.extend(this.scrolly, {
          "offset": parseInt(container.css('top'), 10) || 0,
          "size": this.container.prop('scrollHeight'),
          "visible": wrapper.height()
        });
        this._updateScroll(d === 'x' ? 'y' : 'x', scrolly);
      }
    }
  };

  var CustomScrollbar = BaseScrollbar;

  /*
   * Extend jQuery as plugin
   *
   * @param {Mixed} command to execute
   * @param {Mixed} arguments as Array
   * @return {jQuery}
   */
  $.fn.scrollbar = function(command, args) {
    if (typeof command !== 'string') {
      args = command;
      command = 'init';
    }
    if (typeof args === 'undefined') {
      args = [];
    }
    if (!$.isArray(args)) {
      args = [args];
    }
    this.not('body, .scroll-wrapper').each(function() {
      var element = $(this),
        instance = element.data(browser.data.name);
      if (instance || command === 'init') {
        if (!instance) {
          instance = new CustomScrollbar(element);
        }
        if (instance[command]) {
          instance[command].apply(instance, args);
        }
      }
    });
    return this;
  };

  /**
   * Connect default options to global object
   */
  $.fn.scrollbar.options = defaults;


  /**
   * Check if scroll content/container size is changed
   */

  var updateScrollbars = (function() {
    var timer = 0,
      timerCounter = 0;

    return function(force) {
      var i, container, options, scroll, wrapper, scrollx, scrolly;
      for (i = 0; i < browser.scrolls.length; i++) {
        scroll = browser.scrolls[i];
        container = scroll.container;
        options = scroll.options;
        wrapper = scroll.wrapper;
        scrollx = scroll.scrollx;
        scrolly = scroll.scrolly;
        if (force || (options.autoUpdate && wrapper && wrapper.is(':visible') &&
          (container.prop('scrollWidth') != scrollx.size || container.prop('scrollHeight') != scrolly.size || wrapper.width() != scrollx.visible || wrapper.height() != scrolly.visible))) {
          scroll.init();

          if (options.debug) {
            window.console && console.log({
              scrollHeight: container.prop('scrollHeight') + ':' + scroll.scrolly.size,
              scrollWidth: container.prop('scrollWidth') + ':' + scroll.scrollx.size,
              visibleHeight: wrapper.height() + ':' + scroll.scrolly.visible,
              visibleWidth: wrapper.width() + ':' + scroll.scrollx.visible
            }, true);
            timerCounter++;
          }
        }
      }
      if (debug && timerCounter > 10) {
        window.console && console.log('Scroll updates exceed 10');
        updateScrollbars = function() {};
      } else {
        clearTimeout(timer);
        timer = setTimeout(updateScrollbars, 300);
      }
    };
  })();

  /* ADDITIONAL FUNCTIONS */
  /**
   * Get native browser scrollbar size (height/width)
   *
   * @param {Boolean} actual size or CSS size, default - CSS size
   * @returns {Object} with height, width
   */
  function getBrowserScrollSize(actualSize) {

    if (browser.webkit && !actualSize) {
      return {
        "height": 0,
        "width": 0
      };
    }

    if (!browser.data.outer) {
      var css = {
        "border": "none",
        "box-sizing": "content-box",
        "height": "200px",
        "margin": "0",
        "padding": "0",
        "width": "200px"
      };
      browser.data.inner = $("<div>").css($.extend({}, css));
      browser.data.outer = $("<div>").css($.extend({
        "left": "-1000px",
        "overflow": "scroll",
        "position": "absolute",
        "top": "-1000px"
      }, css)).append(browser.data.inner).appendTo("body");
    }

    browser.data.outer.scrollLeft(1000).scrollTop(1000);

    return {
      "height": Math.ceil((browser.data.outer.offset().top - browser.data.inner.offset().top) || 0),
      "width": Math.ceil((browser.data.outer.offset().left - browser.data.inner.offset().left) || 0)
    };
  }

  /**
   * Check if native browser scrollbars overlay content
   *
   * @returns {Boolean}
   */
  function isScrollOverlaysContent() {
    var scrollSize = getBrowserScrollSize(true);
    return !(scrollSize.height || scrollSize.width);
  }

  function isVerticalScroll(event) {
    var e = event.originalEvent;
    if (e.axis && e.axis === e.HORIZONTAL_AXIS)
      return false;
    if (e.wheelDeltaX)
      return false;
    return true;
  }


  /**
   * Extend AngularJS as UI directive
   * and expose a provider for override default config
   *
   */
  if (window.angular) {
    (function(angular) {
      angular.module('jQueryScrollbar', [])
        .provider('jQueryScrollbar', function() {
          var defaultOptions = defaults;
          return {
            setOptions: function(options) {
              angular.extend(defaultOptions, options);
            },
            $get: function() {
              return {
                options: angular.copy(defaultOptions)
              };
            }
          };
        })
        .directive('jqueryScrollbar', ['jQueryScrollbar', '$parse', function(jQueryScrollbar, $parse) {
          return {
            "restrict": "AC",
            "link": function(scope, element, attrs) {
              var model = $parse(attrs.jqueryScrollbar),
                options = model(scope);
              element.scrollbar(options || jQueryScrollbar.options)
                .on('$destroy', function() {
                  element.scrollbar('destroy');
                });
            }
          };
        }]);
    })(window.angular);
  }
}));

// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
! function(t, e, n, o) {
  "use strict";

  function i(t, e) {
    var o, i, a, s = [],
      r = 0;
    t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = h(t.data.options, e)), o = e.$target || n(t.currentTarget).trigger("blur"), (a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o) || (e.selector ? s = n(e.selector) : (i = o.attr("data-fancybox") || "", i ? (s = t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]')) : s = [o]), r = n(s).index(o), r < 0 && (r = 0), a = n.fancybox.open(s, e, r), a.$trigger = o))
  }
  if (t.console = t.console || {
    info: function(t) {}
  }, n) {
    if (n.fn.fancybox) return void console.info("fancyBox already initialized");
    var a = {
        closeExisting: !1,
        loop: !1,
        gutter: 50,
        keyboard: !0,
        preventCaptionOverlap: !0,
        arrows: !0,
        infobar: !0,
        smallBtn: "auto",
        toolbar: "auto",
        buttons: ["zoom", "slideShow", "thumbs", "close"],
        idleTime: 3,
        protect: !1,
        modal: !1,
        image: {
          preload: !1
        },
        ajax: {
          settings: {
            data: {
              fancybox: !0
            }
          }
        },
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
          preload: !0,
          css: {},
          attr: {
            scrolling: "auto"
          }
        },
        video: {
          tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
          format: "",
          autoStart: !0
        },
        defaultType: "image",
        animationEffect: "zoom",
        animationDuration: 366,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
        btnTpl: {
          download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
          zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
          close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
          arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
          arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
          smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
        },
        parentEl: "body",
        hideScrollbar: !0,
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: {
          autoStart: !1
        },
        touch: {
          vertical: !0,
          momentum: !0
        },
        hash: null,
        media: {},
        slideShow: {
          autoStart: !1,
          speed: 3e3
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y"
        },
        wheel: "auto",
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function(t, e) {
          return "image" === t.type && "zoom"
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          preventCaptionOverlap: !1,
          idleTime: !1,
          clickContent: function(t, e) {
            return "image" === t.type && "toggleControls"
          },
          clickSlide: function(t, e) {
            return "image" === t.type ? "toggleControls" : "close"
          },
          dblclickContent: function(t, e) {
            return "image" === t.type && "zoom"
          },
          dblclickSlide: function(t, e) {
            return "image" === t.type && "zoom"
          }
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails",
            DOWNLOAD: "Download",
            SHARE: "Share",
            ZOOM: "Zoom"
          },
          de: {
            CLOSE: "Schlie&szlig;en",
            NEXT: "Weiter",
            PREV: "Zur&uuml;ck",
            ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder",
            DOWNLOAD: "Herunterladen",
            SHARE: "Teilen",
            ZOOM: "Vergr&ouml;&szlig;ern"
          }
        }
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function(t) {
        return t && t.hasOwnProperty && t instanceof n
      },
      d = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
          return t.setTimeout(e, 1e3 / 60)
        }
      }(),
      u = function() {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
          t.clearTimeout(e)
        }
      }(),
      f = function() {
        var t, n = e.createElement("fakeelement"),
          o = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
          };
        for (t in o)
          if (void 0 !== n.style[t]) return o[t];
        return "transitionend"
      }(),
      p = function(t) {
        return t && t.length && t[0].offsetHeight
      },
      h = function(t, e) {
        var o = n.extend(!0, {}, t, e);
        return n.each(e, function(t, e) {
          n.isArray(e) && (o[t] = e)
        }), o
      },
      g = function(t) {
        var o, i;
        return !(!t || t.ownerDocument !== e) && (n(".fancybox-container").css("pointer-events", "none"), o = {
          x: t.getBoundingClientRect().left + t.offsetWidth / 2,
          y: t.getBoundingClientRect().top + t.offsetHeight / 2
        }, i = e.elementFromPoint(o.x, o.y) === t, n(".fancybox-container").css("pointer-events", ""), i)
      },
      b = function(t, e, o) {
        var i = this;
        i.opts = h({
          index: o
        }, n.fancybox.defaults), n.isPlainObject(e) && (i.opts = h(i.opts, e)), n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)), i.id = i.opts.id || ++c, i.currIndex = parseInt(i.opts.index, 10) || 0, i.prevIndex = null, i.prevPos = null, i.currPos = 0, i.firstRun = !0, i.group = [], i.slides = {}, i.addContent(t), i.group.length && i.init()
      };
    n.extend(b.prototype, {
      init: function() {
        var o, i, a = this,
          s = a.group[a.currIndex],
          r = s.opts;
        r.closeExisting && n.fancybox.close(!0), n("body").addClass("fancybox-active"), !n.fancybox.getInstance() && !1 !== r.hideScrollbar && !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (t.innerWidth - e.documentElement.clientWidth) + "px;}</style>"), n("body").addClass("compensate-for-scrollbar")), i = "", n.each(r.buttons, function(t, e) {
          i += r.btnTpl[e] || ""
        }), o = n(a.translate(a, r.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass(r.baseClass).data("FancyBox", a).appendTo(r.parentEl), a.$refs = {
          container: o
        }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
          a.$refs[t] = o.find(".fancybox-" + t)
        }), a.trigger("onInit"), a.activate(), a.jumpTo(a.currIndex)
      },
      translate: function(t, e) {
        var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
        return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
          return void 0 === n[e] ? t : n[e]
        })
      },
      addContent: function(t) {
        var e, o = this,
          i = n.makeArray(t);
        n.each(i, function(t, e) {
          var i, a, s, r, c, l = {},
            d = {};
          n.isPlainObject(e) ? (l = e, d = e.opts || e) : "object" === n.type(e) && n(e).length ? (i = n(e), d = i.data() || {}, d = n.extend(!0, {}, d, d.options), d.$orig = i, l.src = o.opts.src || d.src || i.attr("href"), l.type || l.src || (l.type = "inline", l.src = e)) : l = {
            type: "html",
            src: e + ""
          }, l.opts = n.extend(!0, {}, o.opts, d), n.isArray(d.buttons) && (l.opts.buttons = d.buttons), n.fancybox.isMobile && l.opts.mobile && (l.opts = h(l.opts, l.opts.mobile)), a = l.type || l.opts.type, r = l.src || "", !a && r && ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (a = "video", l.opts.video.format || (l.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? (a = "iframe", l = n.extend(!0, l, {
            contentType: "pdf",
            opts: {
              iframe: {
                preload: !1
              }
            }
          })) : "#" === r.charAt(0) && (a = "inline")), a ? l.type = a : o.trigger("objectNeedsType", l), l.contentType || (l.contentType = n.inArray(l.type, ["html", "inline", "ajax"]) > -1 ? "html" : l.type), l.index = o.group.length, "auto" == l.opts.smallBtn && (l.opts.smallBtn = n.inArray(l.type, ["html", "inline", "ajax"]) > -1), "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn), l.$thumb = l.opts.$thumb || null, l.opts.$trigger && l.index === o.opts.index && (l.$thumb = l.opts.$trigger.find("img:first"), l.$thumb.length && (l.opts.$orig = l.opts.$trigger)), l.$thumb && l.$thumb.length || !l.opts.$orig || (l.$thumb = l.opts.$orig.find("img:first")), l.$thumb && !l.$thumb.length && (l.$thumb = null), l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null), "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(e, [o, l])), "function" === n.type(o.opts.caption) && (l.opts.caption = o.opts.caption.apply(e, [o, l])), l.opts.caption instanceof n || (l.opts.caption = void 0 === l.opts.caption ? "" : l.opts.caption + ""), "ajax" === l.type && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
            trapFocus: !0,
            infobar: 0,
            toolbar: 0,
            smallBtn: 0,
            keyboard: 0,
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,
            clickContent: !1,
            clickSlide: !1,
            clickOutside: !1,
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1
          })), o.group.push(l)
        }), Object.keys(o.slides).length && (o.updateControls(), (e = o.Thumbs) && e.isActive && (e.create(), e.focus()))
      },
      addEvents: function() {
        var e = this;
        e.removeEvents(), e.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
          t.stopPropagation(), t.preventDefault(), e.close(t)
        }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
          t.stopPropagation(), t.preventDefault(), e.previous()
        }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
          t.stopPropagation(), t.preventDefault(), e.next()
        }).on("click.fb", "[data-fancybox-zoom]", function(t) {
          e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
        }), s.on("orientationchange.fb resize.fb", function(t) {
          t && t.originalEvent && "resize" === t.originalEvent.type ? (e.requestId && u(e.requestId), e.requestId = d(function() {
            e.update(t)
          })) : (e.current && "iframe" === e.current.type && e.$refs.stage.hide(), setTimeout(function() {
            e.$refs.stage.show(), e.update(t)
          }, n.fancybox.isMobile ? 600 : 250))
        }), r.on("keydown.fb", function(t) {
          var o = n.fancybox ? n.fancybox.getInstance() : null,
            i = o.current,
            a = t.keyCode || t.which;
          if (9 == a) return void(i.opts.trapFocus && e.focus(t));
          if (!(!i.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input,textarea,video,audio,select"))) return 8 === a || 27 === a ? (t.preventDefault(), void e.close(t)) : 37 === a || 38 === a ? (t.preventDefault(), void e.previous()) : 39 === a || 40 === a ? (t.preventDefault(), void e.next()) : void e.trigger("afterKeydown", t, a)
        }), e.group[e.currIndex].opts.idleTime && (e.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
          e.idleSecondsCounter = 0, e.isIdle && e.showControls(), e.isIdle = !1
        }), e.idleInterval = t.setInterval(function() {
          ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime && !e.isDragging && (e.isIdle = !0, e.idleSecondsCounter = 0, e.hideControls())
        }, 1e3))
      },
      removeEvents: function() {
        var e = this;
        s.off("orientationchange.fb resize.fb"), r.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
      },
      previous: function(t) {
        return this.jumpTo(this.currPos - 1, t)
      },
      next: function(t) {
        return this.jumpTo(this.currPos + 1, t)
      },
      jumpTo: function(t, e) {
        var o, i, a, s, r, c, l, d, u, f = this,
          h = f.group.length;
        if (!(f.isDragging || f.isClosing || f.isAnimating && f.firstRun)) {
          if (t = parseInt(t, 10), !(a = f.current ? f.current.opts.loop : f.opts.loop) && (t < 0 || t >= h)) return !1;
          if (o = f.firstRun = !Object.keys(f.slides).length, r = f.current, f.prevIndex = f.currIndex, f.prevPos = f.currPos, s = f.createSlide(t), h > 1 && ((a || s.index < h - 1) && f.createSlide(t + 1), (a || s.index > 0) && f.createSlide(t - 1)), f.current = s, f.currIndex = s.index, f.currPos = s.pos, f.trigger("beforeShow", o), f.updateControls(), s.forcedDuration = void 0, n.isNumeric(e) ? s.forcedDuration = e : e = s.opts[o ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i = f.isMoved(s), s.$slide.addClass("fancybox-slide--current"), o) return s.opts.animationEffect && e && f.$refs.container.css("transition-duration", e + "ms"), f.$refs.container.addClass("fancybox-is-open").trigger("focus"), f.loadSlide(s), void f.preload("image");
          c = n.fancybox.getTranslate(r.$slide), l = n.fancybox.getTranslate(f.$refs.stage), n.each(f.slides, function(t, e) {
            n.fancybox.stop(e.$slide, !0)
          }), r.pos !== s.pos && (r.isComplete = !1), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), i ? (u = c.left - (r.pos * c.width + r.pos * r.opts.gutter), n.each(f.slides, function(t, o) {
            o.$slide.removeClass("fancybox-animated").removeClass(function(t, e) {
              return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
            });
            var i = o.pos * c.width + o.pos * o.opts.gutter;
            n.fancybox.setTranslate(o.$slide, {
              top: 0,
              left: i - l.left + u
            }), o.pos !== s.pos && o.$slide.addClass("fancybox-slide--" + (o.pos > s.pos ? "next" : "previous")), p(o.$slide), n.fancybox.animate(o.$slide, {
              top: 0,
              left: (o.pos - s.pos) * c.width + (o.pos - s.pos) * o.opts.gutter
            }, e, function() {
              o.$slide.css({
                transform: "",
                opacity: ""
              }).removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === f.currPos && f.complete()
            })
          })) : e && s.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect, r.$slide.addClass("fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")), n.fancybox.animate(r.$slide, d, e, function() {
            r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
          }, !1)), s.isLoaded ? f.revealContent(s) : f.loadSlide(s), f.preload("image")
        }
      },
      createSlide: function(t) {
        var e, o, i = this;
        return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
          pos: t,
          $slide: e,
          isLoaded: !1
        }), i.updateSlide(i.slides[t])), i.slides[t]
      },
      scaleToActual: function(t, e, o) {
        var i, a, s, r, c, l = this,
          d = l.current,
          u = d.$content,
          f = n.fancybox.getTranslate(d.$slide).width,
          p = n.fancybox.getTranslate(d.$slide).height,
          h = d.width,
          g = d.height;
        l.isAnimating || l.isMoved() || !u || "image" != d.type || !d.isLoaded || d.hasError || (l.isAnimating = !0, n.fancybox.stop(u), t = void 0 === t ? .5 * f : t, e = void 0 === e ? .5 * p : e, i = n.fancybox.getTranslate(u), i.top -= n.fancybox.getTranslate(d.$slide).top, i.left -= n.fancybox.getTranslate(d.$slide).left, r = h / i.width, c = g / i.height, a = .5 * f - .5 * h, s = .5 * p - .5 * g, h > f && (a = i.left * r - (t * r - t), a > 0 && (a = 0), a < f - h && (a = f - h)), g > p && (s = i.top * c - (e * c - e), s > 0 && (s = 0), s < p - g && (s = p - g)), l.updateCursor(h, g), n.fancybox.animate(u, {
          top: s,
          left: a,
          scaleX: r,
          scaleY: c
        }, o || 366, function() {
          l.isAnimating = !1
        }), l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
      },
      scaleToFit: function(t) {
        var e, o = this,
          i = o.current,
          a = i.$content;
        o.isAnimating || o.isMoved() || !a || "image" != i.type || !i.isLoaded || i.hasError || (o.isAnimating = !0, n.fancybox.stop(a), e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
          top: e.top,
          left: e.left,
          scaleX: e.width / a.width(),
          scaleY: e.height / a.height()
        }, t || 366, function() {
          o.isAnimating = !1
        }))
      },
      getFitPos: function(t) {
        var e, o, i, a, s = this,
          r = t.$content,
          c = t.$slide,
          l = t.width || t.opts.width,
          d = t.height || t.opts.height,
          u = {};
        return !!(t.isLoaded && r && r.length) && (e = n.fancybox.getTranslate(s.$refs.stage).width, o = n.fancybox.getTranslate(s.$refs.stage).height, e -= parseFloat(c.css("paddingLeft")) + parseFloat(c.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")), o -= parseFloat(c.css("paddingTop")) + parseFloat(c.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")), l && d || (l = e, d = o), i = Math.min(1, e / l, o / d), l *= i, d *= i, l > e - .5 && (l = e), d > o - .5 && (d = o), "image" === t.type ? (u.top = Math.floor(.5 * (o - d)) + parseFloat(c.css("paddingTop")), u.left = Math.floor(.5 * (e - l)) + parseFloat(c.css("paddingLeft"))) : "video" === t.contentType && (a = t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9, d > l / a ? d = l / a : l > d * a && (l = d * a)), u.width = l, u.height = d, u)
      },
      update: function(t) {
        var e = this;
        n.each(e.slides, function(n, o) {
          e.updateSlide(o, t)
        })
      },
      updateSlide: function(t, e) {
        var o = this,
          i = t && t.$content,
          a = t.width || t.opts.width,
          s = t.height || t.opts.height,
          r = t.$slide;
        o.adjustCaption(t), i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && (o.isAnimating = !1, o.updateCursor())), o.adjustLayout(t), r.length && (r.trigger("refresh"), t.pos === o.currPos && o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", r.get(0).scrollHeight > r.get(0).clientHeight)), o.trigger("onUpdate", t, e)
      },
      centerSlide: function(t) {
        var e = this,
          o = e.current,
          i = o.$slide;
        !e.isClosing && o && (i.siblings().css({
          transform: "",
          opacity: ""
        }), i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), n.fancybox.animate(i, {
          top: 0,
          left: 0,
          opacity: 1
        }, void 0 === t ? 0 : t, function() {
          i.css({
            transform: "",
            opacity: ""
          }), o.isComplete || e.complete()
        }, !1))
      },
      isMoved: function(t) {
        var e, o, i = t || this.current;
        return !!i && (o = n.fancybox.getTranslate(this.$refs.stage), e = n.fancybox.getTranslate(i.$slide), !i.$slide.hasClass("fancybox-animated") && (Math.abs(e.top - o.top) > .5 || Math.abs(e.left - o.left) > .5))
      },
      updateCursor: function(t, e) {
        var o, i, a = this,
          s = a.current,
          r = a.$refs.container;
        s && !a.isClosing && a.Guestures && (r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = a.canPan(t, e), i = !!o || a.isZoomable(), r.toggleClass("fancybox-is-zoomable", i), n("[data-fancybox-zoom]").prop("disabled", !i), o ? r.addClass("fancybox-can-pan") : i && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || a.group.length > 1) && "video" !== s.contentType && r.addClass("fancybox-can-swipe"))
      },
      isZoomable: function() {
        var t, e = this,
          n = e.current;
        if (n && !e.isClosing && "image" === n.type && !n.hasError) {
          if (!n.isLoaded) return !0;
          if ((t = e.getFitPos(n)) && (n.width > t.width || n.height > t.height)) return !0
        }
        return !1
      },
      isScaledDown: function(t, e) {
        var o = this,
          i = !1,
          a = o.current,
          s = a.$content;
        return void 0 !== t && void 0 !== e ? i = t < a.width && e < a.height : s && (i = n.fancybox.getTranslate(s), i = i.width < a.width && i.height < a.height), i
      },
      canPan: function(t, e) {
        var o = this,
          i = o.current,
          a = null,
          s = !1;
        return "image" === i.type && (i.isComplete || t && e) && !i.hasError && (s = o.getFitPos(i), void 0 !== t && void 0 !== e ? a = {
          width: t,
          height: e
        } : i.isComplete && (a = n.fancybox.getTranslate(i.$content)), a && s && (s = Math.abs(a.width - s.width) > 1.5 || Math.abs(a.height - s.height) > 1.5)), s
      },
      loadSlide: function(t) {
        var e, o, i, a = this;
        if (!t.isLoading && !t.isLoaded) {
          if (t.isLoading = !0, !1 === a.trigger("beforeLoad", t)) return t.isLoading = !1, !1;
          switch (e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
            case "image":
              a.setImage(t);
              break;
            case "iframe":
              a.setIframe(t);
              break;
            case "html":
              a.setContent(t, t.src || t.content);
              break;
            case "video":
              a.setContent(t, t.opts.video.tpl.replace(/\{\{src\}\}/gi, t.src).replace("{{format}}", t.opts.videoFormat || t.opts.video.format || "").replace("{{poster}}", t.thumb || ""));
              break;
            case "inline":
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
              break;
            case "ajax":
              a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                url: t.src,
                success: function(e, n) {
                  "success" === n && a.setContent(t, e)
                },
                error: function(e, n) {
                  e && "abort" !== n && a.setError(t)
                }
              })), o.one("onReset", function() {
                i.abort()
              });
              break;
            default:
              a.setError(t)
          }
          return !0
        }
      },
      setImage: function(t) {
        var o, i = this;
        setTimeout(function() {
          var e = t.$image;
          i.isClosing || !t.isLoading || e && e.length && e[0].complete || t.hasError || i.showLoading(t)
        }, 50), i.checkSrcset(t), t.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")), !1 !== t.opts.preload && t.opts.width && t.opts.height && t.thumb && (t.width = t.opts.width, t.height = t.opts.height, o = e.createElement("img"), o.onerror = function() {
          n(this).remove(), t.$ghost = null
        }, o.onload = function() {
          i.afterLoad(t)
        }, t.$ghost = n(o).addClass("fancybox-image").appendTo(t.$content).attr("src", t.thumb)), i.setBigImage(t)
      },
      checkSrcset: function(e) {
        var n, o, i, a, s = e.opts.srcset || e.opts.image.srcset;
        if (s) {
          i = t.devicePixelRatio || 1, a = t.innerWidth * i, o = s.split(",").map(function(t) {
            var e = {};
            return t.trim().split(/\s+/).forEach(function(t, n) {
              var o = parseInt(t.substring(0, t.length - 1), 10);
              if (0 === n) return e.url = t;
              o && (e.value = o, e.postfix = t[t.length - 1])
            }), e
          }), o.sort(function(t, e) {
            return t.value - e.value
          });
          for (var r = 0; r < o.length; r++) {
            var c = o[r];
            if ("w" === c.postfix && c.value >= a || "x" === c.postfix && c.value >= i) {
              n = c;
              break
            }
          }!n && o.length && (n = o[o.length - 1]), n && (e.src = n.url, e.width && e.height && "w" == n.postfix && (e.height = e.width / e.height * n.value, e.width = n.value), e.opts.srcset = s)
        }
      },
      setBigImage: function(t) {
        var o = this,
          i = e.createElement("img"),
          a = n(i);
        t.$image = a.one("error", function() {
          o.setError(t)
        }).one("load", function() {
          var e;
          t.$ghost || (o.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), o.afterLoad(t)), o.isClosing || (t.opts.srcset && (e = t.opts.sizes, e && "auto" !== e || (e = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), a.attr("sizes", e).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function() {
            t.$ghost && !o.isClosing && t.$ghost.hide()
          }, Math.min(300, Math.max(1e3, t.height / 1600))), o.hideLoading(t))
        }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (i.complete || "complete" == i.readyState) && a.naturalWidth && a.naturalHeight ? a.trigger("load") : i.error && a.trigger("error")
      },
      resolveImageSlideSize: function(t, e, n) {
        var o = parseInt(t.opts.width, 10),
          i = parseInt(t.opts.height, 10);
        t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), i > 0 && (t.width = Math.floor(i * e / n), t.height = i)
      },
      setIframe: function(t) {
        var e, o = this,
          i = t.opts.iframe,
          a = t.$slide;
        t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(a), a.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content), i.preload ? (o.showLoading(t), e.on("load.fb error.fb", function(e) {
          this.isReady = 1, t.$slide.trigger("refresh"), o.afterLoad(t)
        }), a.on("refresh.fb", function() {
          var n, o, s = t.$content,
            r = i.css.width,
            c = i.css.height;
          if (1 === e[0].isReady) {
            try {
              n = e.contents(), o = n.find("body")
            } catch (t) {}
            o && o.length && o.children().length && (a.css("overflow", "visible"), s.css({
              width: "100%",
              "max-width": "100%",
              height: "9999px"
            }), void 0 === r && (r = Math.ceil(Math.max(o[0].clientWidth, o.outerWidth(!0)))), s.css("width", r || "").css("max-width", ""), void 0 === c && (c = Math.ceil(Math.max(o[0].clientHeight, o.outerHeight(!0)))), s.css("height", c || ""), a.css("overflow", "auto")), s.removeClass("fancybox-is-hidden")
          }
        })) : o.afterLoad(t), e.attr("src", t.src), a.one("onReset", function() {
          try {
            n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
          } catch (t) {}
          n(this).off("refresh.fb").empty(), t.isLoaded = !1, t.isRevealed = !1
        })
      },
      setContent: function(t, e) {
        var o = this;
        o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide.empty(), l(e) && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents()), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function() {
          n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
        }), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass("fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), o.afterLoad(t))
      },
      setError: function(t) {
        t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
      },
      showLoading: function(t) {
        var e = this;
        (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
      },
      hideLoading: function(t) {
        var e = this;
        (t = t || e.current) && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
      },
      afterLoad: function(t) {
        var e = this;
        e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
          return 2 == t.button && t.preventDefault(), !0
        }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.adjustCaption(t), e.adjustLayout(t), t.pos === e.currPos && e.updateCursor(), e.revealContent(t))
      },
      adjustCaption: function(t) {
        var e, n = this,
          o = t || n.current,
          i = o.opts.caption,
          a = o.opts.preventCaptionOverlap,
          s = n.$refs.caption,
          r = !1;
        s.toggleClass("fancybox-caption--separate", a), a && i && i.length && (o.pos !== n.currPos ? (e = s.clone().appendTo(s.parent()), e.children().eq(0).empty().html(i), r = e.outerHeight(!0), e.empty().remove()) : n.$caption && (r = n.$caption.outerHeight(!0)), o.$slide.css("padding-bottom", r || ""))
      },
      adjustLayout: function(t) {
        var e, n, o, i, a = this,
          s = t || a.current;
        s.isLoaded && !0 !== s.opts.disableLayoutFix && (s.$content.css("margin-bottom", ""), s.$content.outerHeight() > s.$slide.height() + .5 && (o = s.$slide[0].style["padding-bottom"], i = s.$slide.css("padding-bottom"), parseFloat(i) > 0 && (e = s.$slide[0].scrollHeight, s.$slide.css("padding-bottom", 0), Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i), s.$slide.css("padding-bottom", o))), s.$content.css("margin-bottom", n))
      },
      revealContent: function(t) {
        var e, o, i, a, s = this,
          r = t.$slide,
          c = !1,
          l = !1,
          d = s.isMoved(t),
          u = t.isRevealed;
        return t.isRevealed = !0, e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"], i = parseInt(void 0 === t.forcedDuration ? i : t.forcedDuration, 10), !d && t.pos === s.currPos && i || (e = !1), "zoom" === e && (t.pos === s.currPos && i && "image" === t.type && !t.hasError && (l = s.getThumbPos(t)) ? c = s.getFitPos(t) : e = "fade"), "zoom" === e ? (s.isAnimating = !0, c.scaleX = c.width / l.width, c.scaleY = c.height / l.height, a = t.opts.zoomOpacity, "auto" == a && (a = Math.abs(t.width / t.height - l.width / l.height) > .1), a && (l.opacity = .1, c.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), l), p(t.$content), void n.fancybox.animate(t.$content, c, i, function() {
          s.isAnimating = !1, s.complete()
        })) : (s.updateSlide(t), e ? (n.fancybox.stop(r), o = "fancybox-slide--" + (t.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e, r.addClass(o).removeClass("fancybox-slide--current"), t.$content.removeClass("fancybox-is-hidden"), p(r), "image" !== t.type && t.$content.hide().show(0), void n.fancybox.animate(r, "fancybox-slide--current", i, function() {
          r.removeClass(o).css({
            transform: "",
            opacity: ""
          }), t.pos === s.currPos && s.complete()
        }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), u || !d || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"), void(t.pos === s.currPos && s.complete())))
      },
      getThumbPos: function(t) {
        var e, o, i, a, s, r = !1,
          c = t.$thumb;
        return !(!c || !g(c[0])) && (e = n.fancybox.getTranslate(c), o = parseFloat(c.css("border-top-width") || 0), i = parseFloat(c.css("border-right-width") || 0), a = parseFloat(c.css("border-bottom-width") || 0), s = parseFloat(c.css("border-left-width") || 0), r = {
          top: e.top + o,
          left: e.left + s,
          width: e.width - i - s,
          height: e.height - o - a,
          scaleX: 1,
          scaleY: 1
        }, e.width > 0 && e.height > 0 && r)
      },
      complete: function() {
        var t, e = this,
          o = e.current,
          i = {};
        !e.isMoved() && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), e.preload("inline"), p(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(e.slides, function(t, o) {
          o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
        }), e.slides = i), e.isAnimating = !1, e.updateCursor(), e.trigger("afterShow"), o.opts.video.autoStart && o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
          Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), e.next()
        }), o.opts.autoFocus && "html" === o.contentType && (t = o.$content.find("input[autofocus]:enabled:visible:first"), t.length ? t.trigger("focus") : e.focus(null, !0)), o.$slide.scrollTop(0).scrollLeft(0))
      },
      preload: function(t) {
        var e, n, o = this;
        o.group.length < 2 || (n = o.slides[o.currPos + 1], e = o.slides[o.currPos - 1], e && e.type === t && o.loadSlide(e), n && n.type === t && o.loadSlide(n))
      },
      focus: function(t, o) {
        var i, a, s = this,
          r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
        s.isClosing || (i = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (o ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible"), i = i.filter(r).filter(function() {
          return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
        }), i.length ? (a = i.index(e.activeElement), t && t.shiftKey ? (a < 0 || 0 == a) && (t.preventDefault(), i.eq(i.length - 1).trigger("focus")) : (a < 0 || a == i.length - 1) && (t && t.preventDefault(), i.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
      },
      activate: function() {
        var t = this;
        n(".fancybox-container").each(function() {
          var e = n(this).data("FancyBox");
          e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
        }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
      },
      close: function(t, e) {
        var o, i, a, s, r, c, l, u = this,
          f = u.current,
          h = function() {
            u.cleanUp(t)
          };
        return !u.isClosing && (u.isClosing = !0, !1 === u.trigger("beforeClose", t) ? (u.isClosing = !1, d(function() {
          u.update()
        }), !1) : (u.removeEvents(), a = f.$content, o = f.opts.animationEffect, i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0, f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== t ? n.fancybox.stop(f.$slide) : o = !1, f.$slide.siblings().trigger("onReset").remove(), i && u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", i + "ms"), u.hideLoading(f), u.hideControls(!0), u.updateCursor(), "zoom" !== o || a && i && "image" === f.type && !u.isMoved() && !f.hasError && (l = u.getThumbPos(f)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), s = n.fancybox.getTranslate(a), c = {
          top: s.top,
          left: s.left,
          scaleX: s.width / l.width,
          scaleY: s.height / l.height,
          width: l.width,
          height: l.height
        }, r = f.opts.zoomOpacity,
        "auto" == r && (r = Math.abs(f.width / f.height - l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox.setTranslate(a, c), p(a), n.fancybox.animate(a, l, i, h), !0) : (o && i ? n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, i, h) : !0 === t ? setTimeout(h, i) : h(), !0)))
      },
      cleanUp: function(e) {
        var o, i, a, s = this,
          r = s.current.opts.$orig;
        s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", e), s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger), r && r.length && (i = t.scrollX, a = t.scrollY, r.trigger("focus"), n("html, body").scrollTop(a).scrollLeft(i))), s.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
      },
      trigger: function(t, e) {
        var o, i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current;
        if (s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), !1 === o) return o;
        "afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i)
      },
      updateControls: function() {
        var t = this,
          o = t.current,
          i = o.index,
          a = t.$refs.container,
          s = t.$refs.caption,
          r = o.opts.caption;
        o.$slide.trigger("refresh"), r && r.length ? (t.$caption = s, s.children().eq(0).html(r)) : t.$caption = null, t.hasHiddenControls || t.isIdle || t.showControls(), a.find("[data-fancybox-count]").html(t.group.length), a.find("[data-fancybox-index]").html(i + 1), a.find("[data-fancybox-prev]").prop("disabled", !o.opts.loop && i <= 0), a.find("[data-fancybox-next]").prop("disabled", !o.opts.loop && i >= t.group.length - 1), "image" === o.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", o.opts.image.src || o.src).show() : o.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), n(e.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
      },
      hideControls: function(t) {
        var e = this,
          n = ["infobar", "toolbar", "nav"];
        !t && e.current.opts.preventCaptionOverlap || n.push("caption"), this.$refs.container.removeClass(n.map(function(t) {
          return "fancybox-show-" + t
        }).join(" ")), this.hasHiddenControls = !0
      },
      showControls: function() {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container;
        t.hasHiddenControls = !1, t.idleSecondsCounter = 0,
          n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons))
            .toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1))
            .toggleClass("fancybox-show-caption", !!t.$caption)
            .toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1))
            .toggleClass("fancybox-is-modal", !!e.modal)
      },
      toggleControls: function() {
        this.hasHiddenControls ? this.showControls() : this.hideControls()
      }
    }), n.fancybox = {
      version: "3.5.7",
      defaults: a,
      getInstance: function(t) {
        var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
          o = Array.prototype.slice.call(arguments, 1);
        return e instanceof b && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
      },
      open: function(t, e, n) {
        return new b(t, e, n)
      },
      close: function(t) {
        var e = this.getInstance();
        e && (e.close(), !0 === t && this.close(t))
      },
      destroy: function() {
        this.close(!0), r.add("body").off("click.fb-start", "**")
      },
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      use3d: function() {
        var n = e.createElement("div");
        return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
      }(),
      getTranslate: function(t) {
        var e;
        return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
          top: e.top || 0,
          left: e.left || 0,
          width: e.width,
          height: e.height,
          opacity: parseFloat(t.css("opacity"))
        })
      },
      setTranslate: function(t, e) {
        var n = "",
          o = {};
        if (t && e) return void 0 === e.left && void 0 === e.top || (n = (void 0 === e.left ? t.position().left : e.left) + "px, " + (void 0 === e.top ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), void 0 !== e.scaleX && void 0 !== e.scaleY ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"), n.length && (o.transform = n), void 0 !== e.opacity && (o.opacity = e.opacity), void 0 !== e.width && (o.width = e.width), void 0 !== e.height && (o.height = e.height), t.css(o)
      },
      animate: function(t, e, o, i, a) {
        var s, r = this;
        n.isFunction(o) && (i = o, o = null), r.stop(t), s = r.getTranslate(t), t.on(f, function(c) {
          (!c || !c.originalEvent || t.is(c.originalEvent.target) && "z-index" != c.originalEvent.propertyName) && (r.stop(t), n.isNumeric(o) && t.css("transition-duration", ""), n.isPlainObject(e) ? void 0 !== e.scaleX && void 0 !== e.scaleY && r.setTranslate(t, {
            top: e.top,
            left: e.left,
            width: s.width * e.scaleX,
            height: s.height * e.scaleY,
            scaleX: 1,
            scaleY: 1
          }) : !0 !== a && t.removeClass(e), n.isFunction(i) && i(c))
        }), n.isNumeric(o) && t.css("transition-duration", o + "ms"), n.isPlainObject(e) ? (void 0 !== e.scaleX && void 0 !== e.scaleY && (delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function() {
          t.trigger(f)
        }, o + 33))
      },
      stop: function(t, e) {
        t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(f), t.off(f).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
      }
    }, n.fn.fancybox = function(t) {
      var e;
      return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
        options: t
      }, i) : this.off("click.fb-start").on("click.fb-start", {
        items: this,
        options: t
      }, i), this
    }, r.on("click.fb-start", "[data-fancybox]", i), r.on("click.fb-start", "[data-fancybox-trigger]", function(t) {
      n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
        $trigger: n(this)
      })
    }),
      function() {
        var t = null;
        r.on("mousedown mouseup focus blur", ".fancybox-button", function(e) {
          switch (e.type) {
            case "mousedown":
              t = n(this);
              break;
            case "mouseup":
              t = null;
              break;
            case "focusin":
              n(".fancybox-button").removeClass("fancybox-focus"), n(this).is(t) || n(this).is("[disabled]") || n(this).addClass("fancybox-focus");
              break;
            case "focusout":
              n(".fancybox-button").removeClass("fancybox-focus")
          }
        })
      }()
  }
}(window, document, jQuery),
  function(t) {
    "use strict";
    var e = {
        youtube: {
          matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: "transparent",
            enablejsapi: 1,
            html5: 1
          },
          paramPlace: 8,
          type: "iframe",
          url: "https://www.youtube-nocookie.com/embed/$4",
          thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1
          },
          paramPlace: 3,
          type: "iframe",
          url: "//player.vimeo.com/video/$2"
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: "image",
          url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: "iframe",
          url: function(t) {
            return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
          }
        },
        gmap_search: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: "iframe",
          url: function(t) {
            return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
          }
        }
      },
      n = function(e, n, o) {
        if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
          e = e.replace("$" + t, n || "")
        }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
      };
    t(document).on("objectNeedsType.fb", function(o, i, a) {
      var s, r, c, l, d, u, f, p = a.src || "",
        h = !1;
      s = t.extend(!0, {}, e, a.opts.media), t.each(s, function(e, o) {
        if (c = p.match(o.matcher)) {
          if (h = o.type, f = e, u = {}, o.paramPlace && c[o.paramPlace]) {
            d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
            for (var i = 0; i < d.length; ++i) {
              var s = d[i].split("=", 2);
              2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
            }
          }
          return l = t.extend(!0, {}, o.params, a.opts[e], u), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : n(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : n(o.thumb, c), "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(t, e, n, o) {
            return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
          }) : "vimeo" === e && (p = p.replace("&%23", "#")), !1
        }
      }), h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (a.opts = t.extend(!0, a.opts, {
        iframe: {
          preload: !1,
          attr: {
            scrolling: "no"
          }
        }
      })), t.extend(a, {
        type: h,
        src: p,
        origSrc: a.src,
        contentSource: f,
        contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
      })) : p && (a.type = a.opts.defaultType)
    });
    var o = {
      youtube: {
        src: "https://www.youtube.com/iframe_api",
        class: "YT",
        loading: !1,
        loaded: !1
      },
      vimeo: {
        src: "https://player.vimeo.com/api/player.js",
        class: "Vimeo",
        loading: !1,
        loaded: !1
      },
      load: function(t) {
        var e, n = this;
        if (this[t].loaded) return void setTimeout(function() {
          n.done(t)
        });
        this[t].loading || (this[t].loading = !0, e = document.createElement("script"), e.type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function() {
          n[t].loaded = !0, n.done(t)
        } : e.onload = function() {
          n[t].loaded = !0, n.done(t)
        }, document.body.appendChild(e))
      },
      done: function(e) {
        var n, o, i;
        "youtube" === e && delete window.onYouTubeIframeAPIReady, (n = t.fancybox.getInstance()) && (o = n.current.$content.find("iframe"), "youtube" === e && void 0 !== YT && YT ? i = new YT.Player(o.attr("id"), {
          events: {
            onStateChange: function(t) {
              0 == t.data && n.next()
            }
          }
        }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && (i = new Vimeo.Player(o), i.on("ended", function() {
          n.next()
        })))
      }
    };
    t(document).on({
      "afterShow.fb": function(t, e, n) {
        e.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && o.load(n.contentSource)
      }
    })
  }(jQuery),
  function(t, e, n) {
    "use strict";
    var o = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
          return t.setTimeout(e, 1e3 / 60)
        }
      }(),
      i = function() {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
          t.clearTimeout(e)
        }
      }(),
      a = function(e) {
        var n = [];
        e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
        for (var o in e) e[o].pageX ? n.push({
          x: e[o].pageX,
          y: e[o].pageY
        }) : e[o].clientX && n.push({
          x: e[o].clientX,
          y: e[o].clientY
        });
        return n
      },
      s = function(t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
      },
      r = function(t) {
        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
          if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1
      },
      c = function(e) {
        var n = t.getComputedStyle(e)["overflow-y"],
          o = t.getComputedStyle(e)["overflow-x"],
          i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
          a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return i || a
      },
      l = function(t) {
        for (var e = !1;;) {
          if (e = c(t.get(0))) break;
          if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
        }
        return e
      },
      d = function(t) {
        var e = this;
        e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
      };
    d.prototype.destroy = function() {
      var t = this;
      t.$container.off(".fb.touch"), n(e).off(".fb.touch"), t.requestId && (i(t.requestId), t.requestId = null), t.tapped && (clearTimeout(t.tapped), t.tapped = null)
    }, d.prototype.ontouchstart = function(o) {
      var i = this,
        c = n(o.target),
        d = i.instance,
        u = d.current,
        f = u.$slide,
        p = u.$content,
        h = "touchstart" == o.type;
      if (h && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && f.length && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
        if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated")) return o.stopPropagation(), void o.preventDefault();
        i.realPoints = i.startPoints = a(o), i.startPoints.length && (u.touch && o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = p, i.opts = u.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.canPan = d.canPan(), i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(f[0].clientWidth), i.canvasHeight = Math.round(f[0].clientHeight), i.contentLastPos = null, i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
          top: 0,
          left: 0
        }, i.sliderStartPos = n.fancybox.getTranslate(f), i.stagePos = n.fancybox.getTranslate(d.$refs.stage), i.sliderStartPos.top -= i.stagePos.top, i.sliderStartPos.left -= i.stagePos.left, i.contentStartPos.top -= i.stagePos.top, i.contentStartPos.left -= i.stagePos.left, n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), ((i.opts || i.canPan) && (c.is(i.$stage) || i.$stage.find(c).length) || (c.is(".fancybox-image") && o.preventDefault(), n.fancybox.isMobile && c.parents(".fancybox-caption").length)) && (i.isScrollable = l(c) || l(c.parent()), n.fancybox.isMobile && i.isScrollable || o.preventDefault(), (1 === i.startPoints.length || u.hasError) && (i.canPan ? (n.fancybox.stop(i.$content), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-is-grabbing")), 2 === i.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))))
      }
    }, d.prototype.onscroll = function(t) {
      var n = this;
      n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
    }, d.prototype.ontouchmove = function(t) {
      var e = this;
      return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling ? void(e.canTap = !1) : (e.newPoints = a(t), void((e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }, d.prototype.onSwipe = function(e) {
      var a, s = this,
        r = s.instance,
        c = s.isSwiping,
        l = s.sliderStartPos.left || 0;
      if (!0 !== c) "x" == c && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? l += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? l -= Math.pow(-s.distanceX, .8) : l += s.distanceX), s.sliderLastPos = {
        top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
        left: l
      }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function() {
        s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
          var o = e.pos - s.instance.currPos;
          n.fancybox.setTranslate(e.$slide, {
            top: s.sliderLastPos.top,
            left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
          })
        }), s.$container.addClass("fancybox-is-sliding"))
      });
      else if (Math.abs(s.distance) > 10) {
        if (s.canTap = !1, r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable) return void(s.isScrolling = !0);
        r.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(r.slides, function(t, e) {
          var o, i;
          n.fancybox.stop(e.$slide), o = n.fancybox.getTranslate(e.$slide), i = n.fancybox.getTranslate(r.$refs.stage), e.$slide.css({
            transform: "",
            opacity: "",
            "transition-duration": ""
          }).removeClass("fancybox-animated").removeClass(function(t, e) {
            return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
          }), e.pos === r.current.pos && (s.sliderStartPos.top = o.top - i.top, s.sliderStartPos.left = o.left - i.left), n.fancybox.setTranslate(e.$slide, {
            top: o.top - i.top,
            left: o.left - i.left
          })
        }), r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
      }
    }, d.prototype.onPan = function() {
      var t = this;
      if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5)) return void(t.startPoints = t.newPoints);
      t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && i(t.requestId), t.requestId = o(function() {
        n.fancybox.setTranslate(t.$content, t.contentLastPos)
      })
    }, d.prototype.limitMovement = function() {
      var t, e, n, o, i, a, s = this,
        r = s.canvasWidth,
        c = s.canvasHeight,
        l = s.distanceX,
        d = s.distanceY,
        u = s.contentStartPos,
        f = u.left,
        p = u.top,
        h = u.width,
        g = u.height;
      return i = h > r ? f + l : f, a = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0), d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, .8) || 0), {
        top: a,
        left: i
      }
    }, d.prototype.limitPosition = function(t, e, n, o) {
      var i = this,
        a = i.canvasWidth,
        s = i.canvasHeight;
      return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
        top: e,
        left: t
      }
    }, d.prototype.onZoom = function() {
      var e = this,
        a = e.contentStartPos,
        r = a.width,
        c = a.height,
        l = a.left,
        d = a.top,
        u = s(e.newPoints[0], e.newPoints[1]),
        f = u / e.startDistanceBetweenFingers,
        p = Math.floor(r * f),
        h = Math.floor(c * f),
        g = (r - p) * e.percentageOfImageAtPinchPointX,
        b = (c - h) * e.percentageOfImageAtPinchPointY,
        m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
        v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
        y = m - e.centerPointStartX,
        x = v - e.centerPointStartY,
        w = l + (g + y),
        $ = d + (b + x),
        S = {
          top: $,
          left: w,
          scaleX: f,
          scaleY: f
        };
      e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && i(e.requestId), e.requestId = o(function() {
        n.fancybox.setTranslate(e.$content, e.contentLastPos)
      })
    }, d.prototype.ontouchend = function(t) {
      var o = this,
        s = o.isSwiping,
        r = o.isPanning,
        c = o.isZooming,
        l = o.isScrolling;
      if (o.endPoints = a(t), o.dMs = Math.max((new Date).getTime() - o.startTime, 1), o.$container.removeClass("fancybox-is-grabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap) return o.onTap(t);
      o.speed = 100, o.velocityX = o.distanceX / o.dMs * .5, o.velocityY = o.distanceY / o.dMs * .5, r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)
    }, d.prototype.endSwiping = function(t, e) {
      var o = this,
        i = !1,
        a = o.instance.group.length,
        s = Math.abs(o.distanceX),
        r = "x" == t && a > 1 && (o.dMs > 130 && s > 10 || s > 50);
      o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
        top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
        opacity: 0
      }, 200), i = o.instance.close(!0, 250)) : r && o.distanceX > 0 ? i = o.instance.previous(300) : r && o.distanceX < 0 && (i = o.instance.next(300)), !1 !== i || "x" != t && "y" != t || o.instance.centerSlide(200), o.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function() {
      var t, e, o, i = this;
      i.contentLastPos && (!1 === i.opts.momentum || i.dMs > 350 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + 500 * i.velocityX, e = i.contentLastPos.top + 500 * i.velocityY), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 366))
    }, d.prototype.endZooming = function() {
      var t, e, o, i, a = this,
        s = a.instance.current,
        r = a.newWidth,
        c = a.newHeight;
      a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
        top: e,
        left: t,
        width: r,
        height: c,
        scaleX: 1,
        scaleY: 1
      }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.animate(a.$content, o, 150)))
    }, d.prototype.onTap = function(e) {
      var o, i = this,
        s = n(e.target),
        r = i.instance,
        c = r.current,
        l = e && a(e) || i.startPoints,
        d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
        u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
        f = function(t) {
          var o = c.opts[t];
          if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
            case "close":
              r.close(i.startEvent);
              break;
            case "toggleControls":
              r.toggleControls();
              break;
            case "next":
              r.next();
              break;
            case "nextOrClose":
              r.group.length > 1 ? r.next() : r.close(i.startEvent);
              break;
            case "zoom":
              "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i.startEvent))
          }
        };
      if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
        if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside";
        else if (s.is(".fancybox-slide")) o = "Slide";
        else {
          if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
          o = "Content"
        }
        if (i.tapped) {
          if (clearTimeout(i.tapped), i.tapped = null, Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50) return this;
          f("dblclick" + o)
        } else i.tapX = d, i.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? i.tapped = setTimeout(function() {
          i.tapped = null, r.isAnimating || f("click" + o)
        }, 500) : f("click" + o);
        return this
      }
    }, n(e).on("onActivate.fb", function(t, e) {
      e && !e.Guestures && (e.Guestures = new d(e))
    }).on("beforeClose.fb", function(t, e) {
      e && e.Guestures && e.Guestures.destroy()
    })
  }(window, document, jQuery),
  function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
      },
      slideShow: {
        autoStart: !1,
        speed: 3e3,
        progress: !0
      }
    });
    var n = function(t) {
      this.instance = t, this.init()
    };
    e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function() {
        var t = this,
          n = t.instance,
          o = n.group[n.currIndex].opts.slideShow;
        t.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
          t.toggle()
        }), n.group.length < 2 || !o ? t.$button.hide() : o.progress && (t.$progress = e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
      },
      set: function(t) {
        var n = this,
          o = n.instance,
          i = o.current;
        i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1) ? n.isActive && "video" !== i.contentType && (n.$progress && e.fancybox.animate(n.$progress.show(), {
          scaleX: 1
        }, i.opts.slideShow.speed), n.timer = setTimeout(function() {
          o.current.opts.loop || o.current.index != o.group.length - 1 ? o.next() : o.jumpTo(0)
        }, i.opts.slideShow.speed)) : (n.stop(), o.idleSecondsCounter = 0, o.showControls())
      },
      clear: function() {
        var t = this;
        clearTimeout(t.timer), t.timer = null, t.$progress && t.$progress.removeAttr("style").hide()
      },
      start: function() {
        var t = this,
          e = t.instance.current;
        e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
      },
      stop: function() {
        var t = this,
          e = t.instance.current;
        t.clear(), t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1, t.instance.trigger("onSlideShowChange", !1), t.$progress && t.$progress.removeAttr("style").hide()
      },
      toggle: function() {
        var t = this;
        t.isActive ? t.stop() : t.start()
      }
    }), e(t).on({
      "onInit.fb": function(t, e) {
        e && !e.SlideShow && (e.SlideShow = new n(e))
      },
      "beforeShow.fb": function(t, e, n, o) {
        var i = e && e.SlideShow;
        o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
      },
      "afterShow.fb": function(t, e, n) {
        var o = e && e.SlideShow;
        o && o.isActive && o.set()
      },
      "afterKeydown.fb": function(n, o, i, a, s) {
        var r = o && o.SlideShow;
        !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
      },
      "beforeClose.fb onDeactivate.fb": function(t, e) {
        var n = e && e.SlideShow;
        n && n.stop()
      }
    }), e(t).on("visibilitychange", function() {
      var n = e.fancybox.getInstance(),
        o = n && n.SlideShow;
      o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
  }(document, jQuery),
  function(t, e) {
    "use strict";
    var n = function() {
      for (var e = [
        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
      ], n = {}, o = 0; o < e.length; o++) {
        var i = e[o];
        if (i && i[1] in t) {
          for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
          return n
        }
      }
      return !1
    }();
    if (n) {
      var o = {
        request: function(e) {
          e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        },
        exit: function() {
          t[n.exitFullscreen]()
        },
        toggle: function(e) {
          e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
        },
        isFullscreen: function() {
          return Boolean(t[n.fullscreenElement])
        },
        enabled: function() {
          return Boolean(t[n.fullscreenEnabled])
        }
      };
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
        },
        fullScreen: {
          autoStart: !1
        }
      }), e(t).on(n.fullscreenchange, function() {
        var t = o.isFullscreen(),
          n = e.fancybox.getInstance();
        n && (n.current && "image" === n.current.type && n.isAnimating && (n.isAnimating = !1, n.update(!0, !0, 0), n.isComplete || n.complete()), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t), n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
      })
    }
    e(t).on({
      "onInit.fb": function(t, e) {
        var i;
        if (!n) return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
        e && e.group[e.currIndex].opts.fullScreen ? (i = e.$refs.container, i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
          t.stopPropagation(), t.preventDefault(), o.toggle()
        }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && o.request(), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
      },
      "afterKeydown.fb": function(t, e, n, o, i) {
        e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle())
      },
      "beforeClose.fb": function(t, e) {
        e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
      }
    })
  }(document, jQuery),
  function(t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(!0, {
      btnTpl: {
        thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
      },
      thumbs: {
        autoStart: !1,
        hideOnClose: !0,
        parentEl: ".fancybox-container",
        axis: "y"
      }
    }, e.fancybox.defaults);
    var o = function(t) {
      this.init(t)
    };
    e.extend(o.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function(t) {
        var e = this,
          n = t.group,
          o = 0;
        e.instance = t, e.opts = n[t.currIndex].opts.thumbs, t.Thumbs = e, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
        for (var i = 0, a = n.length; i < a && (n[i].thumb && o++, !(o > 1)); i++);
        o > 1 && e.opts ? (e.$button.removeAttr("style").on("click", function() {
          e.toggle()
        }), e.isActive = !0) : e.$button.hide()
      },
      create: function() {
        var t, o = this,
          i = o.instance,
          a = o.opts.parentEl,
          s = [];
        o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)), o.$grid.on("click", "a", function() {
          i.jumpTo(e(this).attr("data-index"))
        })), o.$list || (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)), e.each(i.group, function(e, n) {
          t = n.thumb, t || "image" !== n.type || (t = n.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (t && t.length ? ' style="background-image:url(' + t + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
        }), o.$list[0].innerHTML = s.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + i.group.length * o.$list.children().eq(0).outerWidth(!0))
      },
      focus: function(t) {
        var e, n, o = this,
          i = o.$list,
          a = o.$grid;
        o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({
          scrollTop: i.scrollTop() + n.top
        }, t) : "x" === o.opts.axis && (n.left < a.scrollLeft() || n.left > a.scrollLeft() + (a.width() - e.outerWidth())) && i.parent().stop().animate({
          scrollLeft: n.left
        }, t))
      },
      update: function() {
        var t = this;
        t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
      },
      hide: function() {
        this.isVisible = !1, this.update()
      },
      show: function() {
        this.isVisible = !0, this.update()
      },
      toggle: function() {
        this.isVisible = !this.isVisible, this.update()
      }
    }), e(t).on({
      "onInit.fb": function(t, e) {
        var n;
        e && !e.Thumbs && (n = new o(e), n.isActive && !0 === n.opts.autoStart && n.show())
      },
      "beforeShow.fb": function(t, e, n, o) {
        var i = e && e.Thumbs;
        i && i.isVisible && i.focus(o ? 0 : 250)
      },
      "afterKeydown.fb": function(t, e, n, o, i) {
        var a = e && e.Thumbs;
        a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
      },
      "beforeClose.fb": function(t, e) {
        var n = e && e.Thumbs;
        n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
      }
    })
  }(document, jQuery),
  function(t, e) {
    "use strict";

    function n(t) {
      var e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
      };
      return String(t).replace(/[&<>"'`=\/]/g, function(t) {
        return e[t]
      })
    }
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
      },
      share: {
        url: function(t, e) {
          return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
        },
        tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
      }
    }), e(t).on("click", "[data-fancybox-share]", function() {
      var t, o, i = e.fancybox.getInstance(),
        a = i.current || null;
      a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])), o = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({
        src: i.translate(i, o),
        type: "html",
        opts: {
          touch: !1,
          animationEffect: !1,
          afterLoad: function(t, e) {
            i.$refs.container.one("beforeClose.fb", function() {
              t.close(null, 0)
            }), e.$content.find(".fancybox-share__button").click(function() {
              return window.open(this.href, "Share", "width=550, height=450"), !1
            })
          },
          mobile: {
            autoFocus: !1
          }
        }
      }))
    })
  }(document, jQuery),
  function(t, e, n) {
    "use strict";

    function o() {
      var e = t.location.hash.substr(1),
        n = e.split("-"),
        o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
        i = n.join("-");
      return {
        hash: e,
        index: o < 1 ? 1 : o,
        gallery: i
      }
    }

    function i(t) {
      "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
    }

    function a(t) {
      var e, n;
      return !!t && (e = t.current ? t.current.opts : t.opts, "" !== (n = e.hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && n)
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
      return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(t, e) {
        return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
      })
    }), n(function() {
      !1 !== n.fancybox.defaults.hash && (n(e).on({
        "onInit.fb": function(t, e) {
          var n, i;
          !1 !== e.group[e.currIndex].opts.hash && (n = o(), (i = a(e)) && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
        },
        "beforeShow.fb": function(n, o, i, s) {
          var r;
          i && !1 !== i.opts.hash && (r = a(o)) && (o.currentHash = r + (o.group.length > 1 ? "-" + (i.index + 1) : ""), t.location.hash !== "#" + o.currentHash && (s && !o.origHash && (o.origHash = t.location.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer = setTimeout(function() {
            "replaceState" in t.history ? (t.history[s ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + o.currentHash), s && (o.hasCreatedHistory = !0)) : t.location.hash = o.currentHash, o.hashTimer = null
          }, 300)))
        },
        "beforeClose.fb": function(n, o, i) {
          i && !1 !== i.opts.hash && (clearTimeout(o.hashTimer), o.currentHash && o.hasCreatedHistory ? t.history.back() : o.currentHash && ("replaceState" in t.history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + (o.origHash || "")) : t.location.hash = o.origHash), o.currentHash = null)
        }
      }), n(t).on("hashchange.fb", function() {
        var t = o(),
          e = null;
        n.each(n(".fancybox-container").get().reverse(), function(t, o) {
          var i = n(o).data("FancyBox");
          if (i && i.currentHash) return e = i, !1
        }), e ? e.currentHash === t.gallery + "-" + t.index || 1 === t.index && e.currentHash == t.gallery || (e.currentHash = null, e.close()) : "" !== t.gallery && i(t)
      }), setTimeout(function() {
        n.fancybox.getInstance() || i(o())
      }, 50))
    })
  }(window, document, jQuery),
  function(t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
      "onInit.fb": function(t, e, o) {
        e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
          var o = e.current,
            i = (new Date).getTime();
          e.group.length < 2 || !1 === o.opts.wheel || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
        })
      }
    })
  }(document, jQuery);
/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.1
 */
! function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
  var b, c = navigator.userAgent,
    d = /iphone/i.test(c),
    e = /chrome/i.test(c),
    f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function(a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function() {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      })
    },
    unmask: function() {
      return this.trigger("unmask")
    },
    mask: function(c, g) {
      var h, i, j, k, l, m, n, o;
      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0
      }
      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function(a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
      }), this.trigger("unmask").each(function() {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++)
              if (j[a] && C[a] === p(a)) return;
            g.completed.call(B)
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
        }

        function q(a) {
          for (; ++a < n && !j[a];);
          return a
        }

        function r(a) {
          for (; --a >= 0 && !j[a];);
          return a
        }

        function s(a, b) {
          var c, d;
          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++)
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d)
              } z(), B.caret(Math.max(l, a))
          }
        }

        function t(a) {
          var b, c, d, e;
          for (b = a, c = p(a); n > b; b++)
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e
            }
        }

        function u() {
          var a = B.val(),
            b = B.caret();
          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
            if (0 === b.begin)
              for (; b.begin < l && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          }
          h()
        }

        function v() {
          A(), B.val() != E && B.change()
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b, c, e, f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c, d, e, g = b.which || b.keyCode,
              i = B.caret();
            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function() {
                    a.proxy(a.fn.caret, B, e)()
                  };
                  setTimeout(k, 0)
                } else B.caret(e);
                i.begin <= m && h()
              }
              b.preventDefault()
            }
          }
        }

        function y(a, b) {
          var c;
          for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
        }

        function z() {
          B.val(C.join(""))
        }

        function A(a) {
          var b, c, d, e = B.val(),
            f = -1;
          for (b = 0, d = 0; n > b; b++)
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;)
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break
                } if (d > e.length) {
                y(b + 1, n);
                break
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
        }
        var B = a(this),
          C = a.map(c.split(""), function(a, b) {
            return "?" != a ? i[a] ? p(b) : a : void 0
          }),
          D = C.join(""),
          E = B.val();
        B.data(a.mask.dataName, function() {
          return a.map(C, function(a, b) {
            return j[b] && a != p(b) ? a : null
          }).join("")
        }), B.one("unmask", function() {
          B.off(".mask").removeData(a.mask.dataName)
        }).on("focus.mask", function() {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function() {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
            }, 10)
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function() {
          B.prop("readonly") || setTimeout(function() {
            var a = A(!0);
            B.caret(a), h()
          }, 0)
        }), e && f && B.off("input.mask").on("input.mask", u), A()
      })
    }
  })
});
$(function() {
  AOS.init()
}),

  $(document).ready(function() {

    function t() {
      $("#red").val(),
        $("#green").val(),
        $("#blue").val()
    }

    if (window.addEventListener("load", AOS.refresh),
      $(".instructor-slider,.testimonials-slider").slick({
        infinite: !0,
        arrows: !1,
        dots: !1,
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        prevArrow: '<button class="slick-arrow slick-prev"></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !0,
        autoplaySpeed: 1e4,
        speed: 500,
        centerMode: !0,
        variableWidth: !0,
        responsive: [{
          breakpoint: 768,
          settings: {
            centerMode: !1
          }
        }]
      }),
      $(".personalArea-slider").slick({
        infinite: !1,
        arrows: !1,
        dots: !1,
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        prevArrow: '<button class="slick-arrow slick-prev"></button>',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        variableWidth: !0,
        responsive: [{
          breakpoint: 1380,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }]
      }),
      $(".timetables-slider").slick({
        infinite: !1,
        arrows: !1,
        dots: !1,
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        prevArrow: '<button class="slick-arrow slick-prev"></button>',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        variableWidth: !0,
        responsive: [{
          breakpoint: 1380,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 680,
          settings: {
            slidesToShow: 1
          }
        }]
      }),
      $(".file-slider").slick({
        infinite: !1,
        arrows: !1,
        dots: !1,
        nextArrow: '<button class="slick-arrow slick-next"></button>',
        prevArrow: '<button class="slick-arrow slick-prev"></button>',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        variableWidth: !0,
        responsive: [{
          breakpoint: 1380,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 680,
          settings: {
            slidesToShow: 1
          }
        }]
      }),
      $('[data-fancybox="gallery"]').fancybox({
        beforeShow: function() {
          $(".caption--image").remove()
        },
        afterShow: function() {
          var t = $(".fancybox-caption"),
            e = t.clone().addClass("caption--image");
          $(".fancybox-slide--current .fancybox-content").append(e),
            t.not(".caption--image").addClass("caption--bottom")
        }
      }),


      // header-bar click -> header-active
      $('.header-bar').on('click', function() {

        const header = document.querySelector('.header')
        const headerRow = document.querySelector('.header-row')
        const modalOverlay = document.querySelector('.modal-overlay')
        const modal = document.querySelector('.modal')

        const e = $(this).attr('href')

        const modalIsOpen = modal?.classList.contains('open')

        if (!modalIsOpen) {
          headerRow?.classList.toggle('menu--open')
        } else {
          modalOverlay.classList.remove('open-overlay')
          modal.classList.remove('open')

          $('.modal').find('.modal-tab').removeClass('active')
          $('.modal').find('#' + e).addClass('active')
        }

        header.classList.toggle('header-active')

      }),

      Array.from(document.getElementsByClassName('button-modal')).forEach(function(element) {
          element.addEventListener('click', function(t) {
            t.preventDefault()

            const header = document.querySelector('.header')
            const headerRow = document.querySelector('.header-row')
            const modalOverlay = document.querySelector('.modal-overlay')
            const modal = document.querySelector('.modal')

            const e = $(this).attr('href')

            header.classList.add('header-active')

            const menuIsOpen = headerRow.classList.contains('menu--open')

            if (menuIsOpen) {
              headerRow.classList.remove('menu--open')
            }

            modalOverlay.classList.add('open-overlay')
            modal.classList.add('open')
            modal.classList.add(e)

            $('.modal').find('.modal-tab').removeClass('active')
            $('.modal').find('#' + e).addClass('active')
          })
        }
      ),


      $(document).on('click', function(e) {

        const is_contains = (target, el) => {
          if (el) {
            return el === target || el.contains(target)
          }
          return null
        }

        const target = e.target

        const header = document.querySelector('.header')
        const headerBar = document.querySelector('.header-bar')
        const headerRow = document.querySelector('.header-row')
        const menu = document.querySelector('.menu')
        const buttonsModal = document.querySelectorAll('.button-modal')
        const formBtn = document.querySelector('.form-btn')
        const modalOverlay = document.querySelector('.modal-overlay')
        const modal = document.querySelector('.modal')

        const isHeaderBar = is_contains(target, headerBar)
        const isHeaderRow = is_contains(target, headerRow)
        const isModal = is_contains(target, modal)
        const isButtonModal = target.classList.contains('button-modal')
        const isMenu = is_contains(target, menu)

        if (!isHeaderBar && !isHeaderRow && !isModal && !isButtonModal && !isMenu) {
          header.classList.remove('header-active')
          headerRow.classList.remove('menu--open')
          menu && menu.classList.remove('menu-active')

          modalOverlay.classList = ''
          modalOverlay.classList.add('modal-overlay')
          modal.classList = ''
          modal.classList.add('modal')
        }
      }),


      $(".drop-text").on("click", function(t) {
        t.preventDefault(), $(this).parents(".drop").toggleClass("active"), $(window).width() <= 960 && $(this).next().slideToggle()
      }),

      $('.header-user__top').on('click', function() {
        $('.header-user').toggleClass('active')
      }),


      $(document).on("click", function(t) {
        var e = $(".drop");
        e.is(t.target)
        || 0 !== e.has(t.target).length
        || $(".form-btn").is(t.target)
        || $(".drop").removeClass("active")
      }),

      $(document).on('click', function(t) {
        var e = $('.header-user');
        e.is(t.target) || 0 !== e.has(t.target).length || $('.header-user').removeClass('active')
      }),

      $(".slick-current.slick-active .instructor-overlay").on("click", function() {
        var t = $(this).parents(".instructor-video");
        url = $(t).find(".instructor-url").text(), $(t).addClass("active"), $(t).find("iframe").attr("src", url)
      }),
      $(".tab-list li a").on("click", function(t) {
        t.preventDefault(), $(".tab-list li a").removeClass("active"),
          $(".tab").removeClass("tab-active");
        var e = $(t.target).attr("href");
        $(e).addClass("tab-active"),
          $(this).addClass("active")
      }),
      $(".accordeon .accordeon-block").hide().prev().click(function() {
        $(this).parents(".accordeon").hasClass("accordeon-active") ? $(".accordeon").removeClass("accordeon-active") : ($(".accordeon").removeClass("accordeon-active"), $(this).parents(".accordeon").addClass("accordeon-active")), $(this).parents().find(".accordeon-block").not(this).slideUp().prev(), $(this).next().not(":visible").slideDown().prev().parents()
      }),
      $(".grid").masonry({
        itemSelector: ".grid-item",
        percentPosition: !0
      }),
      $(".input-textarea textarea").keyup(function() {
        var t = $(this).val().length;
        $(this).attr("maxlength", "1000").parents(".input-textarea").find(".input-textarea__info b").text(1e3 - t)
      }),

      $("#statistics1").length) {
      var e = new ProgressBar.Circle(statistics1, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = Math.round(e.value() * $("#statistics1-1").text());
          0 === a ? e.setText("") : e.setText(a)
        }
      });
      e.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', e.text.style.fontSize = "48px", e.animate($("#procent-1").text(), {
        duration: 1500
      })
    }
    if ($("#statistics2").length) {
      var a = new ProgressBar.Circle(statistics2, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = Math.round(e.value() * $("#statistics2-2").text());
          0 === a ? e.setText("") : e.setText(a + "<span>+</span>")
        }
      });
      a.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', a.text.style.fontSize = "48px", a.animate($("#procent-2").text(), {
        duration: 1500
      })
    }
    if ($("#statistics3").length) {
      var s = new ProgressBar.Circle(statistics3, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = Math.round(e.value() * $("#statistics3-3").text());
          0 === a ? e.setText("") : e.setText(a + "<span>+</span>")
        }
      });
      s.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', s.text.style.fontSize = "48px", s.animate($("#procent-3").text(), {
        duration: 1500
      })
    }
    if ($("#statistics4").length) {
      var o = new ProgressBar.Circle(statistics4, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = Math.round(e.value() * $("#statistics4-4").text());
          0 === a ? e.setText("") : e.setText(a + "<span>+</span>")
        }
      });
      o.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', o.text.style.fontSize = "48px", o.animate($("#procent-4").text(), {
        duration: 1500
      })
    }
    if ($("#perstatistics1").length) {
      var e = new ProgressBar.Circle(perstatistics1, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = (e.value() * $("#perstatistics1-1").text()).toFixed(1);
          0 === a ? e.setText("") : e.setText(a)
        }
      });
      e.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', e.text.style.fontSize = "48px", e.animate($("#perprocent-1").text(), {
        duration: 1500
      })
    }
    if ($("#perstatistics2").length) {
      var e = new ProgressBar.Circle(perstatistics2, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = (e.value() * $("#perstatistics2-2").text()).toFixed(1);
          0 === a ? e.setText("") : e.setText(a)
        }
      });
      e.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', e.text.style.fontSize = "48px", e.animate($("#perprocent-2").text(), {
        duration: 1500
      })
    }
    if ($("#perstatistics3").length) {
      var e = new ProgressBar.Circle(perstatistics3, {
        color: "#FFB42D",
        strokeWidth: 5,
        trailWidth: 5,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: !1
        },
        from: {
          color: "#FFB42D",
          width: 5
        },
        to: {
          color: "#FFB42D",
          width: 5
        },
        step: function(t, e) {
          e.path.setAttribute("stroke", t.color), e.path.setAttribute("stroke-width", t.width);
          var a = (e.value() * $("#perstatistics3-3").text()).toFixed(1);
          0 === a ? e.setText("") : e.setText(a)
        }
      });
      e.text.style.fontFamily = '"Montserrat", Helvetica, sans-serif', e.text.style.fontSize = "48px", e.animate($("#perprocent-3").text(), {
        duration: 1500
      })
    }

    $(".select").on("click", function(t) {
      if ($(this).hasClass("active")) {
        var e = t.target,
          a = $(this).find(".select-text"),
          s = $(this).find(".select-value");

        "LI" == e.tagName ? ($(a).text($(e).text()),
          $(s).val($(e).text()),
          $(e).hasClass("color-green") ? $(this).find(".select-text").removeClass("color-red").addClass("color-green") : $(e).hasClass("color-red") && $(this).find(".select-text").removeClass("color-green").addClass("color-red")) : "A" == e.tagName && ($(a).html($(e).html()),
          $(s).val($(e).text())),
          $(this).removeClass("active")
      } else {
        $(".select").removeClass("active"),
          $(this).addClass("active")
      }
    }),
      $(document).on("click", function(t) {
        var e = $(".select");
        e.is(t.target) || 0 !== e.has(t.target).length || $(".select").removeClass("active")
      }),

      $(".menu-arrow").on("click", function(t) {
        $(".personalArea").toggleClass("personalArea-active")
      }),
      $(".range-slider").on("init reInit", function(t, e) {
        var a = e.slideCount;
        $(this).parents(".range-slider__wrap").find(".range").attr("max", a)
      }),
      $(".range-slider").on("afterChange", function(t, e, a) {
        $(this).parents(".range-slider__wrap").find(".range").val(a + 1)
      }),
      $(".range").on("input change", function() {
        $(this).parents(".range-slider__wrap").find(".range-slider").slick("slickGoTo", this.value - 1)
      }),
      $(".methods-drop li a").on("click", function(t) {
        t.preventDefault(),
          $(".methods-drop li a").removeClass("active"),
          $(".methods-tab").removeClass("active");
        var e = $(t.target).attr("href");
        $(e).addClass("active"),
          $(this).addClass("active"),
          $(this).parents(".methods-col__menu").find(".methods-last").text($(this).text())
      }),
      $(".methods-col__menu").on("click", function(t) {
        $(this).toggleClass("active")
      });

    var i = $('.modal');
    if (
      // $('.button-modal').on('click', function(t) {
      //   t.preventDefault()
      //     // ,
      //     // $(".header").removeClass('header-active');
      //
      //   var e = $(this).attr("href");
      //
      //   $(i).addClass("open"),
      //     $(".modal-overlay").addClass("open-overlay"),
      //     $(".modal").addClass(e),
      //     $(".modal").find(".modal-tab").removeClass("active"),
      //     $(".modal").find("#" + e).addClass("active")
      // }),

      // $(".modal-close, .modal-overlay").on("click", function() {
      //   $(i).removeClass("open"),
      //     $(".modal-overlay").removeClass("open-overlay")
      // }),

        $(".scrollbar-outer,.menu-over").scrollbar(),

      $(".datepicker").length && $(".datepicker").datepicker({
          dateFormat: "dd-mm-yy",
          monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
          dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          onSelect: function(t) {
            $(this).parents(".master-datepicker").find(".datepicker-input span").text($(this).val())
          }
        },
        $.datepicker.regional.ru),
        $(".vocabulary-ico").on("click", function() {
          $(".vocabulary-ico audio").each(function() {
            this.pause(), this.currentTime = 0
          }),
          $(this).find("audio").length && $(this).find("audio")[0].play()
        }), $(".master-btn").on("click", function(t) {
        t.preventDefault(),
          $(this).parents(".master-wrap").toggleClass("active")
      }),
        $(".lesson-tabs li a").on("click", function(t) {
          t.preventDefault(), $(".lesson-tabs li a").removeClass("active"), $(".lesson-input__copy").removeClass("active");
          var e = $(t.target).attr("href");
          $(e).addClass("active"), $(this).addClass("active")
        }),
        $(window).on("scroll", function() {
          $(".videoCall-col__1").length && ($(this).scrollTop() >= $(".videoCall-row").offset().top - 70 ? $(".videoCall-col__1").addClass("videoCall-fixed") : $(".videoCall-col__1").removeClass("videoCall-fixed"))
        }),
        $(".testing-wrap input").on("keyup", function() {
          $(this).attr("size", $(this).val().length)
        }),
        $(".categories-list.options li a").on("click", function(t) {
          t.preventDefault()
        }),
        $(".profile-edit").on("click", function(t) {
          t.preventDefault(),
            $(this).parents(".profile").toggleClass("profile-changes")
        }),
        $(".input-cardNumber").attr("type", "text").mask("9999 9999 9999 9999", {
          reverse: !0
        }),
        $(".input-expiry").attr("type", "text").mask("99/99", {
          reverse: !0
        }),
        $(".input-cvv").attr("type", "text").mask("999", {
          reverse: !0
        }),
        $(".personalArea-card__input input").on("focus", function() {
          $(this).parents(".personalArea-card__input").addClass("input-active")
        }).on("blur", function() {
          "" != !$(this).val() && $(this).parents(".personalArea-card__input").removeClass("input-active")
        }),
        $(".personalModal-tab").on("click", function(t) {
          t.preventDefault(), $(".personalArea-modal__tabs li a").removeClass("active"),
            $(".personalArea-modal__tab").removeClass("tab-active");
          var e = $(this).attr("href");
          $(e).addClass("tab-active"),
            $(this).addClass("active")
        }),

        $(".topUpAccount-btn").on("click", function(t) {
          t.preventDefault();
          var e = $(this).attr("href");
          $(e).addClass("modal-active")
        }),

        $(".personalArea-modal__close").on("click", function() {
          $(".personalArea-modal").removeClass("modal-active")
        }),
        $(".testing-audio audio").on("play", function(t) {
          $(".testing-audio audio").each(function(e, a) {
            a !== t.currentTarget && this.pause()
          })
        }),
        $(".paint").length
    ) {
      var r,
        n = $(".selected").css("background-color"),
        l = $("canvas"),
        c = l[0].getContext("2d"),
        d = !1,
        u = $(".testing-img").width(),
        h = $(".testing-img").height();

      document.getElementById("mainCanvas").width = u,
        document.getElementById("mainCanvas").height = h,
        console.log(u),
        console.log(h),
        $(".controls").on("click", "li", function() {
          $(this).siblings().removeClass("selected"), $(this).addClass("selected"), n = $(this).css("background-color")
        }),
        $("#revealColorSelect").click(function() {
          t(), $("#colorSelect").toggle()
        }),
        l.mousedown(function(t) {
          r = t, d = !0
        }).mousemove(function(t) {
          d && (c.beginPath(), c.moveTo(r.offsetX, r.offsetY), c.lineTo(t.offsetX, t.offsetY), c.strokeStyle = n, c.lineWidth = 5, c.lineCap = "round", c.stroke(), r = t)
        }).mouseup(function() {
          d = !1
        }).mouseleave(function() {
          l.mouseup()
        })
    }
  });


// Copy bonus
const copyCode = () => {
  const inputCode = document.getElementById('inputCode')
  navigator.clipboard.writeText(inputCode.value)

  const tooltip = document.getElementById('myTooltip')
  tooltip.innerHTML = 'Скопировано'
}

const outFunc = () => {
  const tooltip = document.getElementById('myTooltip')
  tooltip.innerHTML = 'Копировать в буфер обмена'
}


// Snackbar
const showMessage = (data) => {

  const snackbar = document.getElementById('snackbar')
  snackbar.innerText = data.message

  if (data.status === 'error') {
    snackbar.classList.add('show-error')
  }

  snackbar.classList.add('show')

  setTimeout(() => {
    snackbar.innerText = ''
    snackbar.classList.toggle('show')
    snackbar.classList.remove('show-error')
  }, 5500) // In #snackbar.show animation fadeout .5s 5s
}


// Reschedule lesson
function rescheduleLessonHandler(t) {

  const class_name = t.getAttribute('data-class_name')
  const obj_id = t.getAttribute('data-obj_id')

  client.post('reschedule_lesson/', {
    class_name,
    obj_id,
  })
    .then(({data}) => {

      t.style.setProperty('display', 'none')

      showMessage(data)

    })
    .catch((e) => {
      console.error(e)
    })
}
