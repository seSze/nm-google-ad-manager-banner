function An(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function On(e) {
  if (S(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = ne(s) ? Ti(s) : On(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else {
    if (ne(e))
      return e;
    if (Y(e))
      return e;
  }
}
const wi = /;(?![^(]*\))/g, yi = /:([^]+)/, xi = /\/\*.*?\*\//gs;
function Ti(e) {
  const t = {};
  return e.replace(xi, "").split(wi).forEach((n) => {
    if (n) {
      const s = n.split(yi);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Cn(e) {
  let t = "";
  if (ne(e))
    t = e;
  else if (S(e))
    for (let n = 0; n < e.length; n++) {
      const s = Cn(e[n]);
      s && (t += s + " ");
    }
  else if (Y(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ai = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oi = /* @__PURE__ */ An(Ai);
function Os(e) {
  return !!e || e === "";
}
const W = {}, Qe = [], he = () => {
}, Ci = () => !1, Ri = /^on[^a-z]/, Bt = (e) => Ri.test(e), Rn = (e) => e.startsWith("onUpdate:"), Q = Object.assign, In = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ii = Object.prototype.hasOwnProperty, D = (e, t) => Ii.call(e, t), S = Array.isArray, at = (e) => Ht(e) === "[object Map]", Mi = (e) => Ht(e) === "[object Set]", P = (e) => typeof e == "function", ne = (e) => typeof e == "string", Mn = (e) => typeof e == "symbol", Y = (e) => e !== null && typeof e == "object", Cs = (e) => Y(e) && P(e.then) && P(e.catch), Si = Object.prototype.toString, Ht = (e) => Si.call(e), Pi = (e) => Ht(e).slice(8, -1), Ni = (e) => Ht(e) === "[object Object]", Sn = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ct = /* @__PURE__ */ An(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), jt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Li = /-(\w)/g, Se = jt((e) => e.replace(Li, (t, n) => n ? n.toUpperCase() : "")), Di = /\B([A-Z])/g, pe = jt((e) => e.replace(Di, "-$1").toLowerCase()), Rs = jt((e) => e.charAt(0).toUpperCase() + e.slice(1)), en = jt((e) => e ? `on${Rs(e)}` : ""), dt = (e, t) => !Object.is(e, t), tn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Pt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Nt = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Zn;
const Fi = () => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let xe;
class ki {
  constructor(t = !1) {
    this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = xe, !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = xe;
      try {
        return xe = this, t();
      } finally {
        xe = n;
      }
    }
  }
  on() {
    xe = this;
  }
  off() {
    xe = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this.active = !1;
    }
  }
}
function Ui(e, t = xe) {
  t && t.active && t.effects.push(e);
}
const Pn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Is = (e) => (e.w & Ue) > 0, Ms = (e) => (e.n & Ue) > 0, Bi = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ue;
}, Hi = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      Is(i) && !Ms(i) ? i.delete(e) : t[n++] = i, i.w &= ~Ue, i.n &= ~Ue;
    }
    t.length = n;
  }
}, fn = /* @__PURE__ */ new WeakMap();
let ct = 0, Ue = 1;
const un = 30;
let _e;
const Ge = Symbol(""), dn = Symbol("");
class Nn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ui(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = _e, n = Fe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = _e, _e = this, Fe = !0, Ue = 1 << ++ct, ct <= un ? Bi(this) : Qn(this), this.fn();
    } finally {
      ct <= un && Hi(this), Ue = 1 << --ct, _e = this.parent, Fe = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    _e === this ? this.deferStop = !0 : this.active && (Qn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Qn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Fe = !0;
const Ss = [];
function it() {
  Ss.push(Fe), Fe = !1;
}
function rt() {
  const e = Ss.pop();
  Fe = e === void 0 ? !0 : e;
}
function ae(e, t, n) {
  if (Fe && _e) {
    let s = fn.get(e);
    s || fn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = Pn()), Ps(i);
  }
}
function Ps(e, t) {
  let n = !1;
  ct <= un ? Ms(e) || (e.n |= Ue, n = !Is(e)) : n = !e.has(_e), n && (e.add(_e), _e.deps.push(e));
}
function Pe(e, t, n, s, i, r) {
  const o = fn.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && S(e)) {
    const a = Nt(s);
    o.forEach((u, m) => {
      (m === "length" || m >= a) && c.push(u);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        S(e) ? Sn(n) && c.push(o.get("length")) : (c.push(o.get(Ge)), at(e) && c.push(o.get(dn)));
        break;
      case "delete":
        S(e) || (c.push(o.get(Ge)), at(e) && c.push(o.get(dn)));
        break;
      case "set":
        at(e) && c.push(o.get(Ge));
        break;
    }
  if (c.length === 1)
    c[0] && pn(c[0]);
  else {
    const a = [];
    for (const u of c)
      u && a.push(...u);
    pn(Pn(a));
  }
}
function pn(e, t) {
  const n = S(e) ? e : [...e];
  for (const s of n)
    s.computed && es(s);
  for (const s of n)
    s.computed || es(s);
}
function es(e, t) {
  (e !== _e || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const ji = /* @__PURE__ */ An("__proto__,__v_isRef,__isVue"), Ns = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Mn)
), Ki = /* @__PURE__ */ Ln(), Vi = /* @__PURE__ */ Ln(!1, !0), Wi = /* @__PURE__ */ Ln(!0), ts = /* @__PURE__ */ zi();
function zi() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = F(this);
      for (let r = 0, o = this.length; r < o; r++)
        ae(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(F)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      it();
      const s = F(this)[t].apply(this, n);
      return rt(), s;
    };
  }), e;
}
function Ln(e = !1, t = !1) {
  return function(s, i, r) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && r === (e ? t ? lr : Us : t ? ks : Fs).get(s))
      return s;
    const o = S(s);
    if (!e && o && D(ts, i))
      return Reflect.get(ts, i, r);
    const c = Reflect.get(s, i, r);
    return (Mn(i) ? Ns.has(i) : ji(i)) || (e || ae(s, "get", i), t) ? c : te(c) ? o && Sn(i) ? c : c.value : Y(c) ? e ? Bs(c) : Vt(c) : c;
  };
}
const $i = /* @__PURE__ */ Ls(), qi = /* @__PURE__ */ Ls(!0);
function Ls(e = !1) {
  return function(n, s, i, r) {
    let o = n[s];
    if (nt(o) && te(o) && !te(i))
      return !1;
    if (!e && (!Lt(i) && !nt(i) && (o = F(o), i = F(i)), !S(n) && te(o) && !te(i)))
      return o.value = i, !0;
    const c = S(n) && Sn(s) ? Number(s) < n.length : D(n, s), a = Reflect.set(n, s, i, r);
    return n === F(r) && (c ? dt(i, o) && Pe(n, "set", s, i) : Pe(n, "add", s, i)), a;
  };
}
function Gi(e, t) {
  const n = D(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Pe(e, "delete", t, void 0), s;
}
function Yi(e, t) {
  const n = Reflect.has(e, t);
  return (!Mn(t) || !Ns.has(t)) && ae(e, "has", t), n;
}
function Xi(e) {
  return ae(e, "iterate", S(e) ? "length" : Ge), Reflect.ownKeys(e);
}
const Ds = {
  get: Ki,
  set: $i,
  deleteProperty: Gi,
  has: Yi,
  ownKeys: Xi
}, Ji = {
  get: Wi,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Zi = /* @__PURE__ */ Q({}, Ds, {
  get: Vi,
  set: qi
}), Dn = (e) => e, Kt = (e) => Reflect.getPrototypeOf(e);
function Et(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = F(e), r = F(t);
  n || (t !== r && ae(i, "get", t), ae(i, "get", r));
  const { has: o } = Kt(i), c = s ? Dn : n ? Un : pt;
  if (o.call(i, t))
    return c(e.get(t));
  if (o.call(i, r))
    return c(e.get(r));
  e !== i && e.get(t);
}
function wt(e, t = !1) {
  const n = this.__v_raw, s = F(n), i = F(e);
  return t || (e !== i && ae(s, "has", e), ae(s, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function yt(e, t = !1) {
  return e = e.__v_raw, !t && ae(F(e), "iterate", Ge), Reflect.get(e, "size", e);
}
function ns(e) {
  e = F(e);
  const t = F(this);
  return Kt(t).has.call(t, e) || (t.add(e), Pe(t, "add", e, e)), this;
}
function ss(e, t) {
  t = F(t);
  const n = F(this), { has: s, get: i } = Kt(n);
  let r = s.call(n, e);
  r || (e = F(e), r = s.call(n, e));
  const o = i.call(n, e);
  return n.set(e, t), r ? dt(t, o) && Pe(n, "set", e, t) : Pe(n, "add", e, t), this;
}
function is(e) {
  const t = F(this), { has: n, get: s } = Kt(t);
  let i = n.call(t, e);
  i || (e = F(e), i = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return i && Pe(t, "delete", e, void 0), r;
}
function rs() {
  const e = F(this), t = e.size !== 0, n = e.clear();
  return t && Pe(e, "clear", void 0, void 0), n;
}
function xt(e, t) {
  return function(s, i) {
    const r = this, o = r.__v_raw, c = F(o), a = t ? Dn : e ? Un : pt;
    return !e && ae(c, "iterate", Ge), o.forEach((u, m) => s.call(i, a(u), a(m), r));
  };
}
function Tt(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = F(i), o = at(r), c = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, u = i[e](...s), m = n ? Dn : t ? Un : pt;
    return !t && ae(r, "iterate", a ? dn : Ge), {
      next() {
        const { value: w, done: b } = u.next();
        return b ? { value: w, done: b } : {
          value: c ? [m(w[0]), m(w[1])] : m(w),
          done: b
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Le(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Qi() {
  const e = {
    get(r) {
      return Et(this, r);
    },
    get size() {
      return yt(this);
    },
    has: wt,
    add: ns,
    set: ss,
    delete: is,
    clear: rs,
    forEach: xt(!1, !1)
  }, t = {
    get(r) {
      return Et(this, r, !1, !0);
    },
    get size() {
      return yt(this);
    },
    has: wt,
    add: ns,
    set: ss,
    delete: is,
    clear: rs,
    forEach: xt(!1, !0)
  }, n = {
    get(r) {
      return Et(this, r, !0);
    },
    get size() {
      return yt(this, !0);
    },
    has(r) {
      return wt.call(this, r, !0);
    },
    add: Le("add"),
    set: Le("set"),
    delete: Le("delete"),
    clear: Le("clear"),
    forEach: xt(!0, !1)
  }, s = {
    get(r) {
      return Et(this, r, !0, !0);
    },
    get size() {
      return yt(this, !0);
    },
    has(r) {
      return wt.call(this, r, !0);
    },
    add: Le("add"),
    set: Le("set"),
    delete: Le("delete"),
    clear: Le("clear"),
    forEach: xt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Tt(r, !1, !1), n[r] = Tt(r, !0, !1), t[r] = Tt(r, !1, !0), s[r] = Tt(r, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [er, tr, nr, sr] = /* @__PURE__ */ Qi();
function Fn(e, t) {
  const n = t ? e ? sr : nr : e ? tr : er;
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(D(n, i) && i in s ? n : s, i, r);
}
const ir = {
  get: /* @__PURE__ */ Fn(!1, !1)
}, rr = {
  get: /* @__PURE__ */ Fn(!1, !0)
}, or = {
  get: /* @__PURE__ */ Fn(!0, !1)
}, Fs = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap();
function cr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ar(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : cr(Pi(e));
}
function Vt(e) {
  return nt(e) ? e : kn(e, !1, Ds, ir, Fs);
}
function fr(e) {
  return kn(e, !1, Zi, rr, ks);
}
function Bs(e) {
  return kn(e, !0, Ji, or, Us);
}
function kn(e, t, n, s, i) {
  if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = ar(e);
  if (o === 0)
    return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return i.set(e, c), c;
}
function et(e) {
  return nt(e) ? et(e.__v_raw) : !!(e && e.__v_isReactive);
}
function nt(e) {
  return !!(e && e.__v_isReadonly);
}
function Lt(e) {
  return !!(e && e.__v_isShallow);
}
function Hs(e) {
  return et(e) || nt(e);
}
function F(e) {
  const t = e && e.__v_raw;
  return t ? F(t) : e;
}
function js(e) {
  return Pt(e, "__v_skip", !0), e;
}
const pt = (e) => Y(e) ? Vt(e) : e, Un = (e) => Y(e) ? Bs(e) : e;
function Ks(e) {
  Fe && _e && (e = F(e), Ps(e.dep || (e.dep = Pn())));
}
function Vs(e, t) {
  e = F(e), e.dep && pn(e.dep);
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
function Dt(e) {
  return ur(e, !1);
}
function ur(e, t) {
  return te(e) ? e : new dr(e, t);
}
class dr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : F(t), this._value = n ? t : pt(t);
  }
  get value() {
    return Ks(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Lt(t) || nt(t);
    t = n ? t : F(t), dt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : pt(t), Vs(this));
  }
}
function _n(e) {
  return te(e) ? e.value : e;
}
const pr = {
  get: (e, t, n) => _n(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return te(i) && !te(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ws(e) {
  return et(e) ? e : new Proxy(e, pr);
}
var zs;
class _r {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[zs] = !1, this._dirty = !0, this.effect = new Nn(t, () => {
      this._dirty || (this._dirty = !0, Vs(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = F(this);
    return Ks(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
zs = "__v_isReadonly";
function mr(e, t, n = !1) {
  let s, i;
  const r = P(e);
  return r ? (s = e, i = he) : (s = e.get, i = e.set), new _r(s, i, r || !i, n);
}
function ke(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    Wt(r, t, n);
  }
  return i;
}
function ue(e, t, n, s) {
  if (P(e)) {
    const r = ke(e, t, n, s);
    return r && Cs(r) && r.catch((o) => {
      Wt(o, t, n);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(ue(e[r], t, n, s));
  return i;
}
function Wt(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy, c = n;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let m = 0; m < u.length; m++)
          if (u[m](e, o, c) === !1)
            return;
      }
      r = r.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      ke(a, null, 10, [e, o, c]);
      return;
    }
  }
  gr(e, n, i, s);
}
function gr(e, t, n, s = !0) {
  console.error(e);
}
let _t = !1, mn = !1;
const ee = [];
let Oe = 0;
const tt = [];
let Me = null, ze = 0;
const $s = /* @__PURE__ */ Promise.resolve();
let Bn = null;
function Ft(e) {
  const t = Bn || $s;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hr(e) {
  let t = Oe + 1, n = ee.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    mt(ee[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Hn(e) {
  (!ee.length || !ee.includes(e, _t && e.allowRecurse ? Oe + 1 : Oe)) && (e.id == null ? ee.push(e) : ee.splice(hr(e.id), 0, e), qs());
}
function qs() {
  !_t && !mn && (mn = !0, Bn = $s.then(Ys));
}
function br(e) {
  const t = ee.indexOf(e);
  t > Oe && ee.splice(t, 1);
}
function vr(e) {
  S(e) ? tt.push(...e) : (!Me || !Me.includes(e, e.allowRecurse ? ze + 1 : ze)) && tt.push(e), qs();
}
function os(e, t = _t ? Oe + 1 : 0) {
  for (; t < ee.length; t++) {
    const n = ee[t];
    n && n.pre && (ee.splice(t, 1), t--, n());
  }
}
function Gs(e) {
  if (tt.length) {
    const t = [...new Set(tt)];
    if (tt.length = 0, Me) {
      Me.push(...t);
      return;
    }
    for (Me = t, Me.sort((n, s) => mt(n) - mt(s)), ze = 0; ze < Me.length; ze++)
      Me[ze]();
    Me = null, ze = 0;
  }
}
const mt = (e) => e.id == null ? 1 / 0 : e.id, Er = (e, t) => {
  const n = mt(e) - mt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Ys(e) {
  mn = !1, _t = !0, ee.sort(Er);
  const t = he;
  try {
    for (Oe = 0; Oe < ee.length; Oe++) {
      const n = ee[Oe];
      n && n.active !== !1 && ke(n, null, 14);
    }
  } finally {
    Oe = 0, ee.length = 0, Gs(), _t = !1, Bn = null, (ee.length || tt.length) && Ys();
  }
}
function wr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || W;
  let i = n;
  const r = t.startsWith("update:"), o = r && t.slice(7);
  if (o && o in s) {
    const m = `${o === "modelValue" ? "model" : o}Modifiers`, { number: w, trim: b } = s[m] || W;
    b && (i = n.map((C) => ne(C) ? C.trim() : C)), w && (i = n.map(Nt));
  }
  let c, a = s[c = en(t)] || s[c = en(Se(t))];
  !a && r && (a = s[c = en(pe(t))]), a && ue(a, e, 6, i);
  const u = s[c + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ue(u, e, 6, i);
  }
}
function Xs(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, c = !1;
  if (!P(e)) {
    const a = (u) => {
      const m = Xs(u, t, !0);
      m && (c = !0, Q(o, m));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !c ? (Y(e) && s.set(e, null), null) : (S(r) ? r.forEach((a) => o[a] = null) : Q(o, r), Y(e) && s.set(e, o), o);
}
function zt(e, t) {
  return !e || !Bt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, pe(t)) || D(e, t));
}
let me = null, Js = null;
function kt(e) {
  const t = me;
  return me = e, Js = e && e.type.__scopeId || null, t;
}
function yr(e, t = me, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && ms(-1);
    const r = kt(t);
    let o;
    try {
      o = e(...i);
    } finally {
      kt(r), s._d && ms(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function nn(e) {
  const { type: t, vnode: n, proxy: s, withProxy: i, props: r, propsOptions: [o], slots: c, attrs: a, emit: u, render: m, renderCache: w, data: b, setupState: C, ctx: k, inheritAttrs: O } = e;
  let z, U;
  const re = kt(e);
  try {
    if (n.shapeFlag & 4) {
      const V = i || s;
      z = Ae(m.call(V, V, w, r, C, b, k)), U = a;
    } else {
      const V = t;
      z = Ae(V.length > 1 ? V(r, { attrs: a, slots: c, emit: u }) : V(r, null)), U = t.props ? a : xr(a);
    }
  } catch (V) {
    ut.length = 0, Wt(V, e, 1), z = Ce(be);
  }
  let I = z;
  if (U && O !== !1) {
    const V = Object.keys(U), { shapeFlag: X } = I;
    V.length && X & 7 && (o && V.some(Rn) && (U = Tr(U, o)), I = Be(I, U));
  }
  return n.dirs && (I = Be(I), I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs), n.transition && (I.transition = n.transition), z = I, kt(re), z;
}
const xr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Bt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Tr = (e, t) => {
  const n = {};
  for (const s in e)
    (!Rn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ar(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: c, patchFlag: a } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ls(s, o, u) : !!o;
    if (a & 8) {
      const m = t.dynamicProps;
      for (let w = 0; w < m.length; w++) {
        const b = m[w];
        if (o[b] !== s[b] && !zt(u, b))
          return !0;
      }
    }
  } else
    return (i || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? o ? ls(s, o, u) : !0 : !!o;
  return !1;
}
function ls(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !zt(n, r))
      return !0;
  }
  return !1;
}
function Or({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Cr = (e) => e.__isSuspense;
function Rr(e, t) {
  t && t.pendingBranch ? S(e) ? t.effects.push(...e) : t.effects.push(e) : vr(e);
}
function Ir(e, t) {
  if (Z) {
    let n = Z.provides;
    const s = Z.parent && Z.parent.provides;
    s === n && (n = Z.provides = Object.create(s)), n[e] = t;
  }
}
function Rt(e, t, n = !1) {
  const s = Z || me;
  if (s) {
    const i = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && P(t) ? t.call(s.proxy) : t;
  }
}
const At = {};
function It(e, t, n) {
  return Zs(e, t, n);
}
function Zs(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = W) {
  const c = Z;
  let a, u = !1, m = !1;
  if (te(e) ? (a = () => e.value, u = Lt(e)) : et(e) ? (a = () => e, s = !0) : S(e) ? (m = !0, u = e.some((I) => et(I) || Lt(I)), a = () => e.map((I) => {
    if (te(I))
      return I.value;
    if (et(I))
      return Ze(I);
    if (P(I))
      return ke(I, c, 2);
  })) : P(e) ? t ? a = () => ke(e, c, 2) : a = () => {
    if (!(c && c.isUnmounted))
      return w && w(), ue(e, c, 3, [b]);
  } : a = he, t && s) {
    const I = a;
    a = () => Ze(I());
  }
  let w, b = (I) => {
    w = U.onStop = () => {
      ke(I, c, 4);
    };
  }, C;
  if (ht)
    if (b = he, t ? n && ue(t, c, 3, [
      a(),
      m ? [] : void 0,
      b
    ]) : a(), i === "sync") {
      const I = Ro();
      C = I.__watcherHandles || (I.__watcherHandles = []);
    } else
      return he;
  let k = m ? new Array(e.length).fill(At) : At;
  const O = () => {
    if (U.active)
      if (t) {
        const I = U.run();
        (s || u || (m ? I.some((V, X) => dt(V, k[X])) : dt(I, k))) && (w && w(), ue(t, c, 3, [
          I,
          k === At ? void 0 : m && k[0] === At ? [] : k,
          b
        ]), k = I);
      } else
        U.run();
  };
  O.allowRecurse = !!t;
  let z;
  i === "sync" ? z = O : i === "post" ? z = () => oe(O, c && c.suspense) : (O.pre = !0, c && (O.id = c.uid), z = () => Hn(O));
  const U = new Nn(a, z);
  t ? n ? O() : k = U.run() : i === "post" ? oe(U.run.bind(U), c && c.suspense) : U.run();
  const re = () => {
    U.stop(), c && c.scope && In(c.scope.effects, U);
  };
  return C && C.push(re), re;
}
function Mr(e, t, n) {
  const s = this.proxy, i = ne(e) ? e.includes(".") ? Qs(s, e) : () => s[e] : e.bind(s, s);
  let r;
  P(t) ? r = t : (r = t.handler, n = t);
  const o = Z;
  st(this);
  const c = Zs(i, r.bind(s), n);
  return o ? st(o) : Ye(), c;
}
function Qs(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function Ze(e, t) {
  if (!Y(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), te(e))
    Ze(e.value, t);
  else if (S(e))
    for (let n = 0; n < e.length; n++)
      Ze(e[n], t);
  else if (Mi(e) || at(e))
    e.forEach((n) => {
      Ze(n, t);
    });
  else if (Ni(e))
    for (const n in e)
      Ze(e[n], t);
  return e;
}
function Sr() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Gt(() => {
    e.isMounted = !0;
  }), Yt(() => {
    e.isUnmounting = !0;
  }), e;
}
const fe = [Function, Array], Pr = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: fe,
    onEnter: fe,
    onAfterEnter: fe,
    onEnterCancelled: fe,
    onBeforeLeave: fe,
    onLeave: fe,
    onAfterLeave: fe,
    onLeaveCancelled: fe,
    onBeforeAppear: fe,
    onAppear: fe,
    onAfterAppear: fe,
    onAppearCancelled: fe
  },
  setup(e, { slots: t }) {
    const n = wo(), s = Sr();
    let i;
    return () => {
      const r = t.default && ti(t.default(), !0);
      if (!r || !r.length)
        return;
      let o = r[0];
      if (r.length > 1) {
        for (const O of r)
          if (O.type !== be) {
            o = O;
            break;
          }
      }
      const c = F(e), { mode: a } = c;
      if (s.isLeaving)
        return sn(o);
      const u = cs(o);
      if (!u)
        return sn(o);
      const m = gn(u, c, s, n);
      hn(u, m);
      const w = n.subTree, b = w && cs(w);
      let C = !1;
      const { getTransitionKey: k } = u.type;
      if (k) {
        const O = k();
        i === void 0 ? i = O : O !== i && (i = O, C = !0);
      }
      if (b && b.type !== be && (!$e(u, b) || C)) {
        const O = gn(b, c, s, n);
        if (hn(b, O), a === "out-in")
          return s.isLeaving = !0, O.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, sn(o);
        a === "in-out" && u.type !== be && (O.delayLeave = (z, U, re) => {
          const I = ei(s, b);
          I[String(b.key)] = b, z._leaveCb = () => {
            U(), z._leaveCb = void 0, delete m.delayedLeave;
          }, m.delayedLeave = re;
        });
      }
      return o;
    };
  }
}, Nr = Pr;
function ei(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function gn(e, t, n, s) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: c, onEnter: a, onAfterEnter: u, onEnterCancelled: m, onBeforeLeave: w, onLeave: b, onAfterLeave: C, onLeaveCancelled: k, onBeforeAppear: O, onAppear: z, onAfterAppear: U, onAppearCancelled: re } = t, I = String(e.key), V = ei(n, e), X = (M, L) => {
    M && ue(M, s, 9, L);
  }, $ = (M, L) => {
    const H = L[1];
    X(M, L), S(M) ? M.every((le) => le.length <= 1) && H() : M.length <= 1 && H();
  }, J = {
    mode: r,
    persisted: o,
    beforeEnter(M) {
      let L = c;
      if (!n.isMounted)
        if (i)
          L = O || c;
        else
          return;
      M._leaveCb && M._leaveCb(!0);
      const H = V[I];
      H && $e(e, H) && H.el._leaveCb && H.el._leaveCb(), X(L, [M]);
    },
    enter(M) {
      let L = a, H = u, le = m;
      if (!n.isMounted)
        if (i)
          L = z || a, H = U || u, le = re || m;
        else
          return;
      let ve = !1;
      const Re = M._enterCb = (ot) => {
        ve || (ve = !0, ot ? X(le, [M]) : X(H, [M]), J.delayedLeave && J.delayedLeave(), M._enterCb = void 0);
      };
      L ? $(L, [M, Re]) : Re();
    },
    leave(M, L) {
      const H = String(e.key);
      if (M._enterCb && M._enterCb(!0), n.isUnmounting)
        return L();
      X(w, [M]);
      let le = !1;
      const ve = M._leaveCb = (Re) => {
        le || (le = !0, L(), Re ? X(k, [M]) : X(C, [M]), M._leaveCb = void 0, V[H] === e && delete V[H]);
      };
      V[H] = e, b ? $(b, [M, ve]) : ve();
    },
    clone(M) {
      return gn(M, t, n, s);
    }
  };
  return J;
}
function sn(e) {
  if ($t(e))
    return e = Be(e), e.children = null, e;
}
function cs(e) {
  return $t(e) ? e.children ? e.children[0] : void 0 : e;
}
function hn(e, t) {
  e.shapeFlag & 6 && e.component ? hn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ti(e, t = !1, n) {
  let s = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const c = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === Te ? (o.patchFlag & 128 && i++, s = s.concat(ti(o.children, t, c))) : (t || o.type !== be) && s.push(c != null ? Be(o, { key: c }) : o);
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
function ni(e) {
  return P(e) ? { setup: e, name: e.name } : e;
}
const Mt = (e) => !!e.type.__asyncLoader, $t = (e) => e.type.__isKeepAlive;
function Lr(e, t) {
  si(e, "a", t);
}
function Dr(e, t) {
  si(e, "da", t);
}
function si(e, t, n = Z) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (qt(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      $t(i.parent.vnode) && Fr(s, t, n, i), i = i.parent;
  }
}
function Fr(e, t, n, s) {
  const i = qt(t, e, s, !0);
  ii(() => {
    In(s[t], i);
  }, n);
}
function qt(e, t, n = Z, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      it(), st(n);
      const c = ue(t, n, e, o);
      return Ye(), rt(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Ne = (e) => (t, n = Z) => (!ht || e === "sp") && qt(e, (...s) => t(...s), n), kr = Ne("bm"), Gt = Ne("m"), Ur = Ne("bu"), Br = Ne("u"), Yt = Ne("bum"), ii = Ne("um"), Hr = Ne("sp"), jr = Ne("rtg"), Kr = Ne("rtc");
function Vr(e, t = Z) {
  qt("ec", e, t);
}
function Ke(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const c = i[o];
    r && (c.oldValue = r[o].value);
    let a = c.dir[s];
    a && (it(), ue(a, n, 8, [
      e.el,
      c,
      e,
      t
    ]), rt());
  }
}
const Wr = Symbol(), bn = (e) => e ? hi(e) ? Wn(e) || e.proxy : bn(e.parent) : null, ft = /* @__PURE__ */ Q(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => bn(e.parent),
  $root: (e) => bn(e.root),
  $emit: (e) => e.emit,
  $options: (e) => jn(e),
  $forceUpdate: (e) => e.f || (e.f = () => Hn(e.update)),
  $nextTick: (e) => e.n || (e.n = Ft.bind(e.proxy)),
  $watch: (e) => Mr.bind(e)
}), rn = (e, t) => e !== W && !e.__isScriptSetup && D(e, t), zr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: c, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const C = o[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (rn(s, t))
          return o[t] = 1, s[t];
        if (i !== W && D(i, t))
          return o[t] = 2, i[t];
        if ((u = e.propsOptions[0]) && D(u, t))
          return o[t] = 3, r[t];
        if (n !== W && D(n, t))
          return o[t] = 4, n[t];
        vn && (o[t] = 0);
      }
    }
    const m = ft[t];
    let w, b;
    if (m)
      return t === "$attrs" && ae(e, "get", t), m(e);
    if ((w = c.__cssModules) && (w = w[t]))
      return w;
    if (n !== W && D(n, t))
      return o[t] = 4, n[t];
    if (b = a.config.globalProperties, D(b, t))
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return rn(i, t) ? (i[t] = n, !0) : s !== W && D(s, t) ? (s[t] = n, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r } }, o) {
    let c;
    return !!n[o] || e !== W && D(e, o) || rn(t, o) || (c = r[0]) && D(c, o) || D(s, o) || D(ft, o) || D(i.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : D(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let vn = !0;
function $r(e) {
  const t = jn(e), n = e.proxy, s = e.ctx;
  vn = !1, t.beforeCreate && as(t.beforeCreate, e, "bc");
  const {
    data: i,
    computed: r,
    methods: o,
    watch: c,
    provide: a,
    inject: u,
    created: m,
    beforeMount: w,
    mounted: b,
    beforeUpdate: C,
    updated: k,
    activated: O,
    deactivated: z,
    beforeDestroy: U,
    beforeUnmount: re,
    destroyed: I,
    unmounted: V,
    render: X,
    renderTracked: $,
    renderTriggered: J,
    errorCaptured: M,
    serverPrefetch: L,
    expose: H,
    inheritAttrs: le,
    components: ve,
    directives: Re,
    filters: ot
  } = t;
  if (u && qr(u, s, null, e.appContext.config.unwrapInjectedRef), o)
    for (const q in o) {
      const j = o[q];
      P(j) && (s[q] = j.bind(n));
    }
  if (i) {
    const q = i.call(n, n);
    Y(q) && (e.data = Vt(q));
  }
  if (vn = !0, r)
    for (const q in r) {
      const j = r[q], He = P(j) ? j.bind(n, n) : P(j.get) ? j.get.bind(n, n) : he, bt = !P(j) && P(j.set) ? j.set.bind(n) : he, je = xn({
        get: He,
        set: bt
      });
      Object.defineProperty(s, q, {
        enumerable: !0,
        configurable: !0,
        get: () => je.value,
        set: (Ee) => je.value = Ee
      });
    }
  if (c)
    for (const q in c)
      ri(c[q], s, n, q);
  if (a) {
    const q = P(a) ? a.call(n) : a;
    Reflect.ownKeys(q).forEach((j) => {
      Ir(j, q[j]);
    });
  }
  m && as(m, e, "c");
  function se(q, j) {
    S(j) ? j.forEach((He) => q(He.bind(n))) : j && q(j.bind(n));
  }
  if (se(kr, w), se(Gt, b), se(Ur, C), se(Br, k), se(Lr, O), se(Dr, z), se(Vr, M), se(Kr, $), se(jr, J), se(Yt, re), se(ii, V), se(Hr, L), S(H))
    if (H.length) {
      const q = e.exposed || (e.exposed = {});
      H.forEach((j) => {
        Object.defineProperty(q, j, {
          get: () => n[j],
          set: (He) => n[j] = He
        });
      });
    } else
      e.exposed || (e.exposed = {});
  X && e.render === he && (e.render = X), le != null && (e.inheritAttrs = le), ve && (e.components = ve), Re && (e.directives = Re);
}
function qr(e, t, n = he, s = !1) {
  S(e) && (e = En(e));
  for (const i in e) {
    const r = e[i];
    let o;
    Y(r) ? "default" in r ? o = Rt(r.from || i, r.default, !0) : o = Rt(r.from || i) : o = Rt(r), te(o) && s ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (c) => o.value = c
    }) : t[i] = o;
  }
}
function as(e, t, n) {
  ue(S(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ri(e, t, n, s) {
  const i = s.includes(".") ? Qs(n, s) : () => n[s];
  if (ne(e)) {
    const r = t[e];
    P(r) && It(i, r);
  } else if (P(e))
    It(i, e.bind(n));
  else if (Y(e))
    if (S(e))
      e.forEach((r) => ri(r, t, n, s));
    else {
      const r = P(e.handler) ? e.handler.bind(n) : t[e.handler];
      P(r) && It(i, r, e);
    }
}
function jn(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: i, optionsCache: r, config: { optionMergeStrategies: o } } = e.appContext, c = r.get(t);
  let a;
  return c ? a = c : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach((u) => Ut(a, u, o, !0)), Ut(a, t, o)), Y(t) && r.set(t, a), a;
}
function Ut(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Ut(e, r, n, !0), i && i.forEach((o) => Ut(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = Gr[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const Gr = {
  data: fs,
  props: We,
  emits: We,
  methods: We,
  computed: We,
  beforeCreate: ie,
  created: ie,
  beforeMount: ie,
  mounted: ie,
  beforeUpdate: ie,
  updated: ie,
  beforeDestroy: ie,
  beforeUnmount: ie,
  destroyed: ie,
  unmounted: ie,
  activated: ie,
  deactivated: ie,
  errorCaptured: ie,
  serverPrefetch: ie,
  components: We,
  directives: We,
  watch: Xr,
  provide: fs,
  inject: Yr
};
function fs(e, t) {
  return t ? e ? function() {
    return Q(P(e) ? e.call(this, this) : e, P(t) ? t.call(this, this) : t);
  } : t : e;
}
function Yr(e, t) {
  return We(En(e), En(t));
}
function En(e) {
  if (S(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function We(e, t) {
  return e ? Q(Q(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Xr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Q(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ie(e[s], t[s]);
  return n;
}
function Jr(e, t, n, s = !1) {
  const i = {}, r = {};
  Pt(r, Jt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), oi(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : fr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Zr(e, t, n, s) {
  const { props: i, attrs: r, vnode: { patchFlag: o } } = e, c = F(i), [a] = e.propsOptions;
  let u = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const m = e.vnode.dynamicProps;
      for (let w = 0; w < m.length; w++) {
        let b = m[w];
        if (zt(e.emitsOptions, b))
          continue;
        const C = t[b];
        if (a)
          if (D(r, b))
            C !== r[b] && (r[b] = C, u = !0);
          else {
            const k = Se(b);
            i[k] = wn(a, c, k, C, e, !1);
          }
        else
          C !== r[b] && (r[b] = C, u = !0);
      }
    }
  } else {
    oi(e, t, i, r) && (u = !0);
    let m;
    for (const w in c)
      (!t || !D(t, w) && ((m = pe(w)) === w || !D(t, m))) && (a ? n && (n[w] !== void 0 || n[m] !== void 0) && (i[w] = wn(a, c, w, void 0, e, !0)) : delete i[w]);
    if (r !== c)
      for (const w in r)
        (!t || !D(t, w)) && (delete r[w], u = !0);
  }
  u && Pe(e, "set", "$attrs");
}
function oi(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let a in t) {
      if (Ct(a))
        continue;
      const u = t[a];
      let m;
      i && D(i, m = Se(a)) ? !r || !r.includes(m) ? n[m] = u : (c || (c = {}))[m] = u : zt(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, o = !0);
    }
  if (r) {
    const a = F(n), u = c || W;
    for (let m = 0; m < r.length; m++) {
      const w = r[m];
      n[w] = wn(i, a, w, u[w], e, !D(u, w));
    }
  }
  return o;
}
function wn(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const c = D(o, "default");
    if (c && s === void 0) {
      const a = o.default;
      if (o.type !== Function && P(a)) {
        const { propsDefaults: u } = i;
        n in u ? s = u[n] : (st(i), s = u[n] = a.call(null, t), Ye());
      } else
        s = a;
    }
    o[0] && (r && !c ? s = !1 : o[1] && (s === "" || s === pe(n)) && (s = !0));
  }
  return s;
}
function li(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, c = [];
  let a = !1;
  if (!P(e)) {
    const m = (w) => {
      a = !0;
      const [b, C] = li(w, t, !0);
      Q(o, b), C && c.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m);
  }
  if (!r && !a)
    return Y(e) && s.set(e, Qe), Qe;
  if (S(r))
    for (let m = 0; m < r.length; m++) {
      const w = Se(r[m]);
      us(w) && (o[w] = W);
    }
  else if (r)
    for (const m in r) {
      const w = Se(m);
      if (us(w)) {
        const b = r[m], C = o[w] = S(b) || P(b) ? { type: b } : Object.assign({}, b);
        if (C) {
          const k = _s(Boolean, C.type), O = _s(String, C.type);
          C[0] = k > -1, C[1] = O < 0 || k < O, (k > -1 || D(C, "default")) && c.push(w);
        }
      }
    }
  const u = [o, c];
  return Y(e) && s.set(e, u), u;
}
function us(e) {
  return e[0] !== "$";
}
function ds(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function ps(e, t) {
  return ds(e) === ds(t);
}
function _s(e, t) {
  return S(t) ? t.findIndex((n) => ps(n, e)) : P(t) && ps(t, e) ? 0 : -1;
}
const ci = (e) => e[0] === "_" || e === "$stable", Kn = (e) => S(e) ? e.map(Ae) : [Ae(e)], Qr = (e, t, n) => {
  if (t._n)
    return t;
  const s = yr((...i) => Kn(t(...i)), n);
  return s._c = !1, s;
}, ai = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (ci(i))
      continue;
    const r = e[i];
    if (P(r))
      t[i] = Qr(i, r, s);
    else if (r != null) {
      const o = Kn(r);
      t[i] = () => o;
    }
  }
}, fi = (e, t) => {
  const n = Kn(t);
  e.slots.default = () => n;
}, eo = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = F(t), Pt(t, "_", n)) : ai(t, e.slots = {});
  } else
    e.slots = {}, t && fi(e, t);
  Pt(e.slots, Jt, 1);
}, to = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = W;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? r = !1 : (Q(i, t), !n && c === 1 && delete i._) : (r = !t.$stable, ai(t, i)), o = t;
  } else
    t && (fi(e, t), o = { default: 1 });
  if (r)
    for (const c in i)
      !ci(c) && !(c in o) && delete i[c];
};
function ui() {
  return {
    app: null,
    config: {
      isNativeTag: Ci,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let no = 0;
function so(e, t) {
  return function(s, i = null) {
    P(s) || (s = Object.assign({}, s)), i != null && !Y(i) && (i = null);
    const r = ui(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const a = r.app = {
      _uid: no++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Io,
      get config() {
        return r.config;
      },
      set config(u) {
      },
      use(u, ...m) {
        return o.has(u) || (u && P(u.install) ? (o.add(u), u.install(a, ...m)) : P(u) && (o.add(u), u(a, ...m))), a;
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), a;
      },
      component(u, m) {
        return m ? (r.components[u] = m, a) : r.components[u];
      },
      directive(u, m) {
        return m ? (r.directives[u] = m, a) : r.directives[u];
      },
      mount(u, m, w) {
        if (!c) {
          const b = Ce(s, i);
          return b.appContext = r, m && t ? t(b, u) : e(b, u, w), c = !0, a._container = u, u.__vue_app__ = a, Wn(b.component) || b.component.proxy;
        }
      },
      unmount() {
        c && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, m) {
        return r.provides[u] = m, a;
      }
    };
    return a;
  };
}
function yn(e, t, n, s, i = !1) {
  if (S(e)) {
    e.forEach((b, C) => yn(b, t && (S(t) ? t[C] : t), n, s, i));
    return;
  }
  if (Mt(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? Wn(s.component) || s.component.proxy : s.el, o = i ? null : r, { i: c, r: a } = e, u = t && t.r, m = c.refs === W ? c.refs = {} : c.refs, w = c.setupState;
  if (u != null && u !== a && (ne(u) ? (m[u] = null, D(w, u) && (w[u] = null)) : te(u) && (u.value = null)), P(a))
    ke(a, c, 12, [o, m]);
  else {
    const b = ne(a), C = te(a);
    if (b || C) {
      const k = () => {
        if (e.f) {
          const O = b ? D(w, a) ? w[a] : m[a] : a.value;
          i ? S(O) && In(O, r) : S(O) ? O.includes(r) || O.push(r) : b ? (m[a] = [r], D(w, a) && (w[a] = m[a])) : (a.value = [r], e.k && (m[e.k] = a.value));
        } else
          b ? (m[a] = o, D(w, a) && (w[a] = o)) : C && (a.value = o, e.k && (m[e.k] = o));
      };
      o ? (k.id = -1, oe(k, n)) : k();
    }
  }
}
const oe = Rr;
function io(e) {
  return ro(e);
}
function ro(e, t) {
  const n = Fi();
  n.__VUE__ = !0;
  const { insert: s, remove: i, patchProp: r, createElement: o, createText: c, createComment: a, setText: u, setElementText: m, parentNode: w, nextSibling: b, setScopeId: C = he, insertStaticContent: k } = e, O = (l, f, d, _ = null, p = null, v = null, y = !1, h = null, E = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !$e(l, f) && (_ = vt(l), Ee(l, p, v, !0), l = null), f.patchFlag === -2 && (E = !1, f.dynamicChildren = null);
    const { type: g, ref: T, shapeFlag: x } = f;
    switch (g) {
      case Xt:
        z(l, f, d, _);
        break;
      case be:
        U(l, f, d, _);
        break;
      case on:
        l == null && re(f, d, _, y);
        break;
      case Te:
        ve(l, f, d, _, p, v, y, h, E);
        break;
      default:
        x & 1 ? X(l, f, d, _, p, v, y, h, E) : x & 6 ? Re(l, f, d, _, p, v, y, h, E) : (x & 64 || x & 128) && g.process(l, f, d, _, p, v, y, h, E, Xe);
    }
    T != null && p && yn(T, l && l.ref, v, f || l, !f);
  }, z = (l, f, d, _) => {
    if (l == null)
      s(f.el = c(f.children), d, _);
    else {
      const p = f.el = l.el;
      f.children !== l.children && u(p, f.children);
    }
  }, U = (l, f, d, _) => {
    l == null ? s(f.el = a(f.children || ""), d, _) : f.el = l.el;
  }, re = (l, f, d, _) => {
    [l.el, l.anchor] = k(l.children, f, d, _, l.el, l.anchor);
  }, I = ({ el: l, anchor: f }, d, _) => {
    let p;
    for (; l && l !== f; )
      p = b(l), s(l, d, _), l = p;
    s(f, d, _);
  }, V = ({ el: l, anchor: f }) => {
    let d;
    for (; l && l !== f; )
      d = b(l), i(l), l = d;
    i(f);
  }, X = (l, f, d, _, p, v, y, h, E) => {
    y = y || f.type === "svg", l == null ? $(f, d, _, p, v, y, h, E) : L(l, f, p, v, y, h, E);
  }, $ = (l, f, d, _, p, v, y, h) => {
    let E, g;
    const { type: T, props: x, shapeFlag: A, transition: R, dirs: N } = l;
    if (E = l.el = o(l.type, v, x && x.is, x), A & 8 ? m(E, l.children) : A & 16 && M(l.children, E, null, _, p, v && T !== "foreignObject", y, h), N && Ke(l, null, _, "created"), x) {
      for (const B in x)
        B !== "value" && !Ct(B) && r(E, B, null, x[B], v, l.children, _, p, Ie);
      "value" in x && r(E, "value", null, x.value), (g = x.onVnodeBeforeMount) && ye(g, _, l);
    }
    J(E, l, l.scopeId, y, _), N && Ke(l, null, _, "beforeMount");
    const K = (!p || p && !p.pendingBranch) && R && !R.persisted;
    K && R.beforeEnter(E), s(E, f, d), ((g = x && x.onVnodeMounted) || K || N) && oe(() => {
      g && ye(g, _, l), K && R.enter(E), N && Ke(l, null, _, "mounted");
    }, p);
  }, J = (l, f, d, _, p) => {
    if (d && C(l, d), _)
      for (let v = 0; v < _.length; v++)
        C(l, _[v]);
    if (p) {
      let v = p.subTree;
      if (f === v) {
        const y = p.vnode;
        J(l, y, y.scopeId, y.slotScopeIds, p.parent);
      }
    }
  }, M = (l, f, d, _, p, v, y, h, E = 0) => {
    for (let g = E; g < l.length; g++) {
      const T = l[g] = h ? De(l[g]) : Ae(l[g]);
      O(null, T, f, d, _, p, v, y, h);
    }
  }, L = (l, f, d, _, p, v, y) => {
    const h = f.el = l.el;
    let { patchFlag: E, dynamicChildren: g, dirs: T } = f;
    E |= l.patchFlag & 16;
    const x = l.props || W, A = f.props || W;
    let R;
    d && Ve(d, !1), (R = A.onVnodeBeforeUpdate) && ye(R, d, f, l), T && Ke(f, l, d, "beforeUpdate"), d && Ve(d, !0);
    const N = p && f.type !== "foreignObject";
    if (g ? H(l.dynamicChildren, g, h, d, _, N, v) : y || j(l, f, h, null, d, _, N, v, !1), E > 0) {
      if (E & 16)
        le(h, f, x, A, d, _, p);
      else if (E & 2 && x.class !== A.class && r(h, "class", null, A.class, p), E & 4 && r(h, "style", x.style, A.style, p), E & 8) {
        const K = f.dynamicProps;
        for (let B = 0; B < K.length; B++) {
          const G = K[B], de = x[G], Je = A[G];
          (Je !== de || G === "value") && r(h, G, de, Je, p, l.children, d, _, Ie);
        }
      }
      E & 1 && l.children !== f.children && m(h, f.children);
    } else
      !y && g == null && le(h, f, x, A, d, _, p);
    ((R = A.onVnodeUpdated) || T) && oe(() => {
      R && ye(R, d, f, l), T && Ke(f, l, d, "updated");
    }, _);
  }, H = (l, f, d, _, p, v, y) => {
    for (let h = 0; h < f.length; h++) {
      const E = l[h], g = f[h], T = E.el && (E.type === Te || !$e(E, g) || E.shapeFlag & 70) ? w(E.el) : d;
      O(E, g, T, null, _, p, v, y, !0);
    }
  }, le = (l, f, d, _, p, v, y) => {
    if (d !== _) {
      if (d !== W)
        for (const h in d)
          !Ct(h) && !(h in _) && r(l, h, d[h], null, y, f.children, p, v, Ie);
      for (const h in _) {
        if (Ct(h))
          continue;
        const E = _[h], g = d[h];
        E !== g && h !== "value" && r(l, h, g, E, y, f.children, p, v, Ie);
      }
      "value" in _ && r(l, "value", d.value, _.value);
    }
  }, ve = (l, f, d, _, p, v, y, h, E) => {
    const g = f.el = l ? l.el : c(""), T = f.anchor = l ? l.anchor : c("");
    let { patchFlag: x, dynamicChildren: A, slotScopeIds: R } = f;
    R && (h = h ? h.concat(R) : R), l == null ? (s(g, d, _), s(T, d, _), M(f.children, d, T, p, v, y, h, E)) : x > 0 && x & 64 && A && l.dynamicChildren ? (H(l.dynamicChildren, A, d, p, v, y, h), (f.key != null || p && f === p.subTree) && di(l, f, !0)) : j(l, f, d, T, p, v, y, h, E);
  }, Re = (l, f, d, _, p, v, y, h, E) => {
    f.slotScopeIds = h, l == null ? f.shapeFlag & 512 ? p.ctx.activate(f, d, _, y, E) : ot(f, d, _, p, v, y, E) : $n(l, f, E);
  }, ot = (l, f, d, _, p, v, y) => {
    const h = l.component = Eo(l, _, p);
    if ($t(l) && (h.ctx.renderer = Xe), yo(h), h.asyncDep) {
      if (p && p.registerDep(h, se), !l.el) {
        const E = h.subTree = Ce(be);
        U(null, E, f, d);
      }
      return;
    }
    se(h, l, f, d, p, v, y);
  }, $n = (l, f, d) => {
    const _ = f.component = l.component;
    if (Ar(l, f, d))
      if (_.asyncDep && !_.asyncResolved) {
        q(_, f, d);
        return;
      } else
        _.next = f, br(_.update), _.update();
    else
      f.el = l.el, _.vnode = f;
  }, se = (l, f, d, _, p, v, y) => {
    const h = () => {
      if (l.isMounted) {
        let { next: T, bu: x, u: A, parent: R, vnode: N } = l, K = T, B;
        Ve(l, !1), T ? (T.el = N.el, q(l, T, y)) : T = N, x && tn(x), (B = T.props && T.props.onVnodeBeforeUpdate) && ye(B, R, T, N), Ve(l, !0);
        const G = nn(l), de = l.subTree;
        l.subTree = G, O(
          de,
          G,
          w(de.el),
          vt(de),
          l,
          p,
          v
        ), T.el = G.el, K === null && Or(l, G.el), A && oe(A, p), (B = T.props && T.props.onVnodeUpdated) && oe(() => ye(B, R, T, N), p);
      } else {
        let T;
        const { el: x, props: A } = f, { bm: R, m: N, parent: K } = l, B = Mt(f);
        if (Ve(l, !1), R && tn(R), !B && (T = A && A.onVnodeBeforeMount) && ye(T, K, f), Ve(l, !0), x && Qt) {
          const G = () => {
            l.subTree = nn(l), Qt(x, l.subTree, l, p, null);
          };
          B ? f.type.__asyncLoader().then(
            () => !l.isUnmounted && G()
          ) : G();
        } else {
          const G = l.subTree = nn(l);
          O(null, G, d, _, l, p, v), f.el = G.el;
        }
        if (N && oe(N, p), !B && (T = A && A.onVnodeMounted)) {
          const G = f;
          oe(() => ye(T, K, G), p);
        }
        (f.shapeFlag & 256 || K && Mt(K.vnode) && K.vnode.shapeFlag & 256) && l.a && oe(l.a, p), l.isMounted = !0, f = d = _ = null;
      }
    }, E = l.effect = new Nn(
      h,
      () => Hn(g),
      l.scope
    ), g = l.update = () => E.run();
    g.id = l.uid, Ve(l, !0), g();
  }, q = (l, f, d) => {
    f.component = l;
    const _ = l.vnode.props;
    l.vnode = f, l.next = null, Zr(l, f.props, _, d), to(l, f.children, d), it(), os(), rt();
  }, j = (l, f, d, _, p, v, y, h, E = !1) => {
    const g = l && l.children, T = l ? l.shapeFlag : 0, x = f.children, { patchFlag: A, shapeFlag: R } = f;
    if (A > 0) {
      if (A & 128) {
        bt(g, x, d, _, p, v, y, h, E);
        return;
      } else if (A & 256) {
        He(g, x, d, _, p, v, y, h, E);
        return;
      }
    }
    R & 8 ? (T & 16 && Ie(g, p, v), x !== g && m(d, x)) : T & 16 ? R & 16 ? bt(g, x, d, _, p, v, y, h, E) : Ie(g, p, v, !0) : (T & 8 && m(d, ""), R & 16 && M(x, d, _, p, v, y, h, E));
  }, He = (l, f, d, _, p, v, y, h, E) => {
    l = l || Qe, f = f || Qe;
    const g = l.length, T = f.length, x = Math.min(g, T);
    let A;
    for (A = 0; A < x; A++) {
      const R = f[A] = E ? De(f[A]) : Ae(f[A]);
      O(l[A], R, d, null, p, v, y, h, E);
    }
    g > T ? Ie(l, p, v, !0, !1, x) : M(f, d, _, p, v, y, h, E, x);
  }, bt = (l, f, d, _, p, v, y, h, E) => {
    let g = 0;
    const T = f.length;
    let x = l.length - 1, A = T - 1;
    for (; g <= x && g <= A; ) {
      const R = l[g], N = f[g] = E ? De(f[g]) : Ae(f[g]);
      if ($e(R, N))
        O(R, N, d, null, p, v, y, h, E);
      else
        break;
      g++;
    }
    for (; g <= x && g <= A; ) {
      const R = l[x], N = f[A] = E ? De(f[A]) : Ae(f[A]);
      if ($e(R, N))
        O(R, N, d, null, p, v, y, h, E);
      else
        break;
      x--, A--;
    }
    if (g > x) {
      if (g <= A) {
        const R = A + 1, N = R < T ? f[R].el : _;
        for (; g <= A; )
          O(null, f[g] = E ? De(f[g]) : Ae(f[g]), d, N, p, v, y, h, E), g++;
      }
    } else if (g > A)
      for (; g <= x; )
        Ee(l[g], p, v, !0), g++;
    else {
      const R = g, N = g, K = /* @__PURE__ */ new Map();
      for (g = N; g <= A; g++) {
        const ce = f[g] = E ? De(f[g]) : Ae(f[g]);
        ce.key != null && K.set(ce.key, g);
      }
      let B, G = 0;
      const de = A - N + 1;
      let Je = !1, Yn = 0;
      const lt = new Array(de);
      for (g = 0; g < de; g++)
        lt[g] = 0;
      for (g = R; g <= x; g++) {
        const ce = l[g];
        if (G >= de) {
          Ee(ce, p, v, !0);
          continue;
        }
        let we;
        if (ce.key != null)
          we = K.get(ce.key);
        else
          for (B = N; B <= A; B++)
            if (lt[B - N] === 0 && $e(ce, f[B])) {
              we = B;
              break;
            }
        we === void 0 ? Ee(ce, p, v, !0) : (lt[we - N] = g + 1, we >= Yn ? Yn = we : Je = !0, O(ce, f[we], d, null, p, v, y, h, E), G++);
      }
      const Xn = Je ? oo(lt) : Qe;
      for (B = Xn.length - 1, g = de - 1; g >= 0; g--) {
        const ce = N + g, we = f[ce], Jn = ce + 1 < T ? f[ce + 1].el : _;
        lt[g] === 0 ? O(null, we, d, Jn, p, v, y, h, E) : Je && (B < 0 || g !== Xn[B] ? je(we, d, Jn, 2) : B--);
      }
    }
  }, je = (l, f, d, _, p = null) => {
    const { el: v, type: y, transition: h, children: E, shapeFlag: g } = l;
    if (g & 6) {
      je(l.component.subTree, f, d, _);
      return;
    }
    if (g & 128) {
      l.suspense.move(f, d, _);
      return;
    }
    if (g & 64) {
      y.move(l, f, d, Xe);
      return;
    }
    if (y === Te) {
      s(v, f, d);
      for (let x = 0; x < E.length; x++)
        je(E[x], f, d, _);
      s(l.anchor, f, d);
      return;
    }
    if (y === on) {
      I(l, f, d);
      return;
    }
    if (_ !== 2 && g & 1 && h)
      if (_ === 0)
        h.beforeEnter(v), s(v, f, d), oe(() => h.enter(v), p);
      else {
        const { leave: x, delayLeave: A, afterLeave: R } = h, N = () => s(v, f, d), K = () => {
          x(v, () => {
            N(), R && R();
          });
        };
        A ? A(v, N, K) : K();
      }
    else
      s(v, f, d);
  }, Ee = (l, f, d, _ = !1, p = !1) => {
    const { type: v, props: y, ref: h, children: E, dynamicChildren: g, shapeFlag: T, patchFlag: x, dirs: A } = l;
    if (h != null && yn(h, null, d, l, !0), T & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const R = T & 1 && A, N = !Mt(l);
    let K;
    if (N && (K = y && y.onVnodeBeforeUnmount) && ye(K, f, l), T & 6)
      Ei(l.component, d, _);
    else {
      if (T & 128) {
        l.suspense.unmount(d, _);
        return;
      }
      R && Ke(l, null, f, "beforeUnmount"), T & 64 ? l.type.remove(l, f, d, p, Xe, _) : g && (v !== Te || x > 0 && x & 64) ? Ie(g, f, d, !1, !0) : (v === Te && x & 384 || !p && T & 16) && Ie(E, f, d), _ && qn(l);
    }
    (N && (K = y && y.onVnodeUnmounted) || R) && oe(() => {
      K && ye(K, f, l), R && Ke(l, null, f, "unmounted");
    }, d);
  }, qn = (l) => {
    const { type: f, el: d, anchor: _, transition: p } = l;
    if (f === Te) {
      vi(d, _);
      return;
    }
    if (f === on) {
      V(l);
      return;
    }
    const v = () => {
      i(d), p && !p.persisted && p.afterLeave && p.afterLeave();
    };
    if (l.shapeFlag & 1 && p && !p.persisted) {
      const { leave: y, delayLeave: h } = p, E = () => y(d, v);
      h ? h(l.el, v, E) : E();
    } else
      v();
  }, vi = (l, f) => {
    let d;
    for (; l !== f; )
      d = b(l), i(l), l = d;
    i(f);
  }, Ei = (l, f, d) => {
    const { bum: _, scope: p, update: v, subTree: y, um: h } = l;
    _ && tn(_), p.stop(), v && (v.active = !1, Ee(y, l, f, d)), h && oe(h, f), oe(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Ie = (l, f, d, _ = !1, p = !1, v = 0) => {
    for (let y = v; y < l.length; y++)
      Ee(l[y], f, d, _, p);
  }, vt = (l) => l.shapeFlag & 6 ? vt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : b(l.anchor || l.el), Gn = (l, f, d) => {
    l == null ? f._vnode && Ee(f._vnode, null, null, !0) : O(f._vnode || null, l, f, null, null, null, d), os(), Gs(), f._vnode = l;
  }, Xe = {
    p: O,
    um: Ee,
    m: je,
    r: qn,
    mt: ot,
    mc: M,
    pc: j,
    pbc: H,
    n: vt,
    o: e
  };
  let Zt, Qt;
  return t && ([Zt, Qt] = t(Xe)), {
    render: Gn,
    hydrate: Zt,
    createApp: so(Gn, Zt)
  };
}
function Ve({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function di(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (S(s) && S(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let c = i[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = i[r] = De(i[r]), c.el = o.el), n || di(o, c)), c.type === Xt && (c.el = o.el);
    }
}
function oo(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, c;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        c = r + o >> 1, e[n[c]] < u ? r = c + 1 : o = c;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
const lo = (e) => e.__isTeleport, Te = Symbol(void 0), Xt = Symbol(void 0), be = Symbol(void 0), on = Symbol(void 0), ut = [];
let ge = null;
function pi(e = !1) {
  ut.push(ge = e ? null : []);
}
function co() {
  ut.pop(), ge = ut[ut.length - 1] || null;
}
let gt = 1;
function ms(e) {
  gt += e;
}
function _i(e) {
  return e.dynamicChildren = gt > 0 ? ge || Qe : null, co(), gt > 0 && ge && ge.push(e), e;
}
function ao(e, t, n, s, i, r) {
  return _i(gi(e, t, n, s, i, r, !0));
}
function fo(e, t, n, s, i) {
  return _i(Ce(e, t, n, s, i, !0));
}
function uo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function $e(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Jt = "__vInternal", mi = ({ key: e }) => e ?? null, St = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? ne(e) || te(e) || P(e) ? { i: me, r: e, k: t, f: !!n } : e : null;
function gi(e, t = null, n = null, s = 0, i = null, r = e === Te ? 0 : 1, o = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mi(t),
    ref: t && St(t),
    scopeId: Js,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: me
  };
  return c ? (Vn(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= ne(n) ? 8 : 16), gt > 0 && !o && ge && (a.patchFlag > 0 || r & 6) && a.patchFlag !== 32 && ge.push(a), a;
}
const Ce = po;
function po(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Wr) && (e = be), uo(e)) {
    const c = Be(e, t, !0);
    return n && Vn(c, n), gt > 0 && !r && ge && (c.shapeFlag & 6 ? ge[ge.indexOf(e)] = c : ge.push(c)), c.patchFlag |= -2, c;
  }
  if (Oo(e) && (e = e.__vccOpts), t) {
    t = _o(t);
    let { class: c, style: a } = t;
    c && !ne(c) && (t.class = Cn(c)), Y(a) && (Hs(a) && !S(a) && (a = Q({}, a)), t.style = On(a));
  }
  const o = ne(e) ? 1 : Cr(e) ? 128 : lo(e) ? 64 : Y(e) ? 4 : P(e) ? 2 : 0;
  return gi(e, t, n, s, i, o, r, !0);
}
function _o(e) {
  return e ? Hs(e) || Jt in e ? Q({}, e) : e : null;
}
function Be(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = e, c = t ? ho(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && mi(c),
    ref: t && t.ref ? n && i ? S(i) ? i.concat(St(t)) : [i, St(t)] : St(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Te ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Be(e.ssContent),
    ssFallback: e.ssFallback && Be(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function mo(e = " ", t = 0) {
  return Ce(Xt, null, e, t);
}
function go(e = "", t = !1) {
  return t ? (pi(), fo(be, null, e)) : Ce(be, null, e);
}
function Ae(e) {
  return e == null || typeof e == "boolean" ? Ce(be) : S(e) ? Ce(
    Te,
    null,
    e.slice()
  ) : typeof e == "object" ? De(e) : Ce(Xt, null, String(e));
}
function De(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Be(e);
}
function Vn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (S(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Vn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(Jt in t) ? t._ctx = me : i === 3 && me && (me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    P(t) ? (t = { default: t, _ctx: me }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [mo(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ho(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Cn([t.class, s.class]));
      else if (i === "style")
        t.style = On([t.style, s.style]);
      else if (Bt(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(S(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function ye(e, t, n, s = null) {
  ue(e, t, 7, [
    n,
    s
  ]);
}
const bo = ui();
let vo = 0;
function Eo(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || bo, r = {
    uid: vo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new ki(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: li(s, i),
    emitsOptions: Xs(s, i),
    emit: null,
    emitted: null,
    propsDefaults: W,
    inheritAttrs: s.inheritAttrs,
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
    setupContext: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = wr.bind(null, r), e.ce && e.ce(r), r;
}
let Z = null;
const wo = () => Z || me, st = (e) => {
  Z = e, e.scope.on();
}, Ye = () => {
  Z && Z.scope.off(), Z = null;
};
function hi(e) {
  return e.vnode.shapeFlag & 4;
}
let ht = !1;
function yo(e, t = !1) {
  ht = t;
  const { props: n, children: s } = e.vnode, i = hi(e);
  Jr(e, n, i, t), eo(e, s);
  const r = i ? xo(e, t) : void 0;
  return ht = !1, r;
}
function xo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = js(new Proxy(e.ctx, zr));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? Ao(e) : null;
    st(e), it();
    const r = ke(s, e, 0, [e.props, i]);
    if (rt(), Ye(), Cs(r)) {
      if (r.then(Ye, Ye), t)
        return r.then((o) => {
          gs(e, o, t);
        }).catch((o) => {
          Wt(o, e, 0);
        });
      e.asyncDep = r;
    } else
      gs(e, r, t);
  } else
    bi(e, t);
}
function gs(e, t, n) {
  P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = Ws(t)), bi(e, n);
}
let hs;
function bi(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && hs && !s.render) {
      const i = s.template || jn(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: a } = s, u = Q(Q({
          isCustomElement: r,
          delimiters: c
        }, o), a);
        s.render = hs(i, u);
      }
    }
    e.render = s.render || he;
  }
  st(e), it(), $r(e), rt(), Ye();
}
function To(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ae(e, "get", "$attrs"), t[n];
    }
  });
}
function Ao(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = To(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Wn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ws(js(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ft)
          return ft[n](e);
      },
      has(t, n) {
        return n in t || n in ft;
      }
    }));
}
function Oo(e) {
  return P(e) && "__vccOpts" in e;
}
const xn = (e, t) => mr(e, t, ht), Co = Symbol(""), Ro = () => Rt(Co), Io = "3.2.45", Mo = "http://www.w3.org/2000/svg", qe = typeof document < "u" ? document : null, bs = qe && /* @__PURE__ */ qe.createElement("template"), So = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? qe.createElementNS(Mo, e) : qe.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => qe.createTextNode(e),
  createComment: (e) => qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => qe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      bs.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = bs.content;
      if (s) {
        const a = c.firstChild;
        for (; a.firstChild; )
          c.appendChild(a.firstChild);
        c.removeChild(a);
      }
      t.insertBefore(c, n);
    }
    return [
      o ? o.nextSibling : t.firstChild,
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Po(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function No(e, t, n) {
  const s = e.style, i = ne(n);
  if (n && !i) {
    for (const r in n)
      Tn(s, r, n[r]);
    if (t && !ne(t))
      for (const r in t)
        n[r] == null && Tn(s, r, "");
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const vs = /\s*!important$/;
function Tn(e, t, n) {
  if (S(n))
    n.forEach((s) => Tn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Lo(e, t);
    vs.test(n) ? e.setProperty(pe(s), n.replace(vs, ""), "important") : e[s] = n;
  }
}
const Es = ["Webkit", "Moz", "ms"], ln = {};
function Lo(e, t) {
  const n = ln[t];
  if (n)
    return n;
  let s = Se(t);
  if (s !== "filter" && s in e)
    return ln[t] = s;
  s = Rs(s);
  for (let i = 0; i < Es.length; i++) {
    const r = Es[i] + s;
    if (r in e)
      return ln[t] = r;
  }
  return t;
}
const ws = "http://www.w3.org/1999/xlink";
function Do(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ws, t.slice(6, t.length)) : e.setAttributeNS(ws, t, n);
  else {
    const r = Oi(t);
    n == null || r && !Os(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Fo(e, t, n, s, i, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, i, r), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const a = n ?? "";
    (e.value !== a || e.tagName === "OPTION") && (e.value = a), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Os(n) : n == null && a === "string" ? (n = "", c = !0) : a === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function ko(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Uo(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Bo(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [c, a] = Ho(t);
    if (s) {
      const u = r[t] = Vo(s, i);
      ko(e, c, u, a);
    } else
      o && (Uo(e, c, o, a), r[t] = void 0);
  }
}
const ys = /(?:Once|Passive|Capture)$/;
function Ho(e) {
  let t;
  if (ys.test(e)) {
    t = {};
    let s;
    for (; s = e.match(ys); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : pe(e.slice(2)), t];
}
let cn = 0;
const jo = /* @__PURE__ */ Promise.resolve(), Ko = () => cn || (jo.then(() => cn = 0), cn = Date.now());
function Vo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ue(Wo(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = Ko(), n;
}
function Wo(e, t) {
  if (S(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const xs = /^on[a-z]/, zo = (e, t, n, s, i = !1, r, o, c, a) => {
  t === "class" ? Po(e, s, i) : t === "style" ? No(e, n, s) : Bt(t) ? Rn(t) || Bo(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : $o(e, t, s, i)) ? Fo(e, t, s, r, o, c, a) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Do(e, t, s, i));
};
function $o(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && xs.test(t) && P(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || xs.test(t) && ne(n) ? !1 : t in e;
}
function qo(e, t) {
  const n = ni(e);
  class s extends zn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const Go = typeof HTMLElement < "u" ? HTMLElement : class {
};
class zn extends Go {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Ft(() => {
      this._connected || (As(null, this.shadowRoot), this._instance = null);
    });
  }
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const i of s)
        this._setAttr(i.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, i = !1) => {
      const { props: r, styles: o } = s;
      let c;
      if (r && !S(r))
        for (const a in r) {
          const u = r[a];
          (u === Number || u && u.type === Number) && (a in this._props && (this._props[a] = Nt(this._props[a])), (c || (c = /* @__PURE__ */ Object.create(null)))[Se(a)] = !0);
        }
      this._numberProps = c, i && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = S(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of s.map(Se))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = Se(t);
    this._numberProps && this._numberProps[s] && (n = Nt(n)), this._setProp(s, n, !1);
  }
  _getProp(t) {
    return this._props[t];
  }
  _setProp(t, n, s = !0, i = !0) {
    n !== this._props[t] && (this._props[t] = n, i && this._instance && this._update(), s && (n === !0 ? this.setAttribute(pe(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(pe(t), n + "") : n || this.removeAttribute(pe(t))));
  }
  _update() {
    As(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ce(this._def, Q({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, o) => {
        this.dispatchEvent(new CustomEvent(r, {
          detail: o
        }));
      };
      n.emit = (r, ...o) => {
        s(r, o), pe(r) !== r && s(pe(r), o);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof zn) {
          n.parent = i._instance, n.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const Yo = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Nr.props;
const Xo = /* @__PURE__ */ Q({ patchProp: zo }, So);
let Ts;
function Jo() {
  return Ts || (Ts = io(Xo));
}
const As = (...e) => {
  Jo().render(...e);
}, Zo = (e, {
  enabled: t = !0,
  onChange: n = () => {
  },
  offset: s = 100,
  once: i = !0
}) => {
  const r = Vt({
    observer: null,
    inViewport: !1,
    isVisible: !1
  }), o = typeof window > "u", c = () => {
    o || !e.value || (r.observer = new IntersectionObserver((a) => {
      const u = Math.max(...a.map((m) => m.intersectionRatio));
      r.inViewport = u > 0, n(r.inViewport);
    }, {
      threshold: new Array(101).fill(0).map((a, u) => u * 0.01),
      rootMargin: [`${s}px 0px`]
    }), r.observer.observe(e.value));
  };
  return It(() => r.inViewport, (a) => {
    a && r.observer && i && r.observer.disconnect();
  }), Gt(() => {
    r.isVisible = !t, t && c();
  }), Yt(() => {
    const { observer: a } = r;
    a && a.disconnect();
  }), {
    ...r
  };
}, Ot = {
  MOBILE: {
    v1: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|FBAN|FBAV|fennec|hiptop|iemobile|ip(hone|od)|Instagram|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
    v2: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
  },
  MOBILE_OR_TABLET: {
    v1: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|FBAN|FBAV|fennec|hiptop|iemobile|ip(hone|od)|Instagram|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
    v2: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
  }
}, Qo = () => {
  const e = (navigator == null ? void 0 : navigator.userAgent) || "", t = xn(() => Ot.MOBILE.v1.test(e) || Ot.MOBILE.v2.test(e.substr(0, 4))), n = xn(() => Ot.MOBILE_OR_TABLET.v1.test(e) || Ot.MOBILE_OR_TABLET.v2.test(e.substr(0, 4)));
  return {
    isMobile: t,
    isMobileOrTablet: n
  };
}, el = () => Math.random().toString(36).substring(6), tl = (e = !1) => {
  const t = Dt(!1);
  return {
    isLoaded: t,
    load: () => {
      t.value = !0;
    }
  };
}, an = "js-google-ad-manager", nl = "https://securepubads.g.doubleclick.net/tag/js/gpt.js", sl = 1013417, il = ({ targeting: e, refresh: t, isOutOfPage: n, unit: s, onIntersect: i, size: r, element: o } = {}) => {
  const { isMobileOrTablet: c } = Qo(), a = window.$adManager, { defaults: u, onIntersect: m, uid: w } = a;
  if (typeof i > "u" && (i = m), typeof s > "u" && (s = u == null ? void 0 : u.unit), typeof r > "u" && (r = (u == null ? void 0 : u.size) || "banner"), !s)
    throw new Error("Banner is missing unit name");
  const b = Dt({}), C = Dt(null), { isLoaded: k, load: O } = tl(), z = () => !!document.getElementById(an), U = () => new Promise(($, J) => {
    if (typeof window > "u" || z())
      return $(!0), !0;
    const L = document.createElement("script");
    L.src = nl, L.async = !0, L.id = an, L.type = "text/javascript", L.onload = () => {
      $(!0);
    }, document.body.appendChild(L), window.googletag = window.googletag || { cmd: [] }, window.googletag.cmd.push(() => {
      window.googletag.pubads().enableSingleRequest(), window.googletag.pubads().collapseEmptyDivs(), window.googletag.pubads().setTargeting("DEVICE", [c.value ? "mobile" : "desktop"]), window.googletag.pubads(), window.googletag.enableServices();
    });
  }), re = () => {
    for (const $ of Object.keys(e || {})) {
      const J = Array.isArray(e == null ? void 0 : e[$]) ? e == null ? void 0 : e[$] : [e == null ? void 0 : e[$]];
      b.value.slot.setTargeting($, J);
    }
  }, I = () => {
    b.value.id = el();
  }, V = () => {
    const { sizing: $ } = window == null ? void 0 : window.$adManager, J = window.googletag.sizeMapping(), M = ($ == null ? void 0 : $[r]) || [];
    for (const { window: L, sizes: H } of M)
      J.addSize(L, H);
    b.value.slot.defineSizeMapping(J.build()).addService(window.googletag.pubads());
  }, X = () => {
    const { uid: $, sizing: J } = window.$adManager, M = Object.values((J == null ? void 0 : J[r]) || {}).reduce((L, { sizes: H }) => [.../* @__PURE__ */ new Set([
      ...L,
      ...H
    ])], []);
    window.googletag.cmd.push(() => {
      b.value.slot = window.googletag.defineSlot(`/${$ || sl}/${s}`, M, b.value.id).setTargeting("URL", [window.location.pathname]), V(), re(), window.googletag.pubads().addEventListener("slotOnload", (L) => {
        L.slot.getSlotElementId() === b.value.id && O();
      }), b.value.element = o, window.googletag.display(b.value.element);
    }), t && Number.isInteger(t) && (C.value = setInterval(() => {
      window.googletag.cmd.push(() => {
        const { slot: L } = F(b.value);
        window.googletag.pubads().refresh([L]);
      });
    }, t * 1e3));
  };
  return i ? Zo(b.value.element, {
    offset: 200,
    onChange: ($) => {
      $ && (I(), U().then(() => {
        Ft(X);
      }));
    }
  }) : Gt(() => {
    I(), U().then(() => {
      Ft(X);
    });
  }), Yt(() => {
    t && clearInterval(C.value), b.value.slot && window.googletag.destroySlots([b.value.slot]);
  }), {
    isLoaded: k,
    SCRIPT_TAG_ID: an,
    isScriptLoaded: z,
    bootstrap: U,
    banner: b
  };
}, rl = ["id"], ol = /* @__PURE__ */ ni({
  __name: "Banner.ce",
  props: {
    unit: null,
    size: null,
    targeting: null,
    isOutOfPage: { type: Boolean },
    onIntersect: { type: Boolean },
    refresh: null
  },
  setup(e) {
    const t = e, n = Dt();
    t.refresh && Number.isInteger(t.refresh) && t.refresh > 0 && t.refresh;
    const { banner: s } = il({
      ...t,
      element: n
    });
    return (i, r) => _n(s) ? (pi(), ao("div", {
      key: 0,
      id: _n(s).id,
      ref_key: "element",
      ref: n,
      class: "banner"
    }, null, 8, rl)) : go("", !0);
  }
}), ll = qo(ol);
customElements.define("gam-banner", ll);
