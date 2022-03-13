var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var n = function(t) {
            e.call(this, t),
            this._labels = {},
            this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren,
            this.smoothChildTiming = !0 === this.vars.smoothChildTiming,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, n, s = this.vars;
            for (n in s)
                i = s[n],
                l(i) && -1 !== i.join("").indexOf("{self}") && (s[n] = this._swapSelfInParams(i));
            l(s.tweens) && this.add(s.tweens, 0, s.align, s.stagger)
        }
          , s = 1e-10
          , r = i._internals
          , a = n._internals = {}
          , o = r.isSelector
          , l = r.isArray
          , c = r.lazyTweens
          , h = r.lazyRender
          , u = _gsScope._gsDefine.globals
          , d = function(t) {
            var e, i = {};
            for (e in t)
                i[e] = t[e];
            return i
        }
          , p = function(t, e, i) {
            var n, s, r = t.cycle;
            for (n in r)
                s = r[n],
                t[n] = "function" == typeof s ? s(i, e[i]) : s[i % s.length];
            delete t.cycle
        }
          , f = a.pauseCallback = function() {}
          , m = function(t) {
            var e, i = [], n = t.length;
            for (e = 0; e !== n; i.push(t[e++]))
                ;
            return i
        }
          , g = n.prototype = new e;
        return n.version = "1.20.5",
        g.constructor = n,
        g.kill()._gc = g._forcingPlayhead = g._hasPause = !1,
        g.to = function(t, e, n, s) {
            var r = n.repeat && u.TweenMax || i;
            return e ? this.add(new r(t,e,n), s) : this.set(t, n, s)
        }
        ,
        g.from = function(t, e, n, s) {
            return this.add((n.repeat && u.TweenMax || i).from(t, e, n), s)
        }
        ,
        g.fromTo = function(t, e, n, s, r) {
            var a = s.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, n, s), r) : this.set(t, s, r)
        }
        ,
        g.staggerTo = function(t, e, s, r, a, l, c, h) {
            var u, f, g = new n({
                onComplete: l,
                onCompleteParams: c,
                callbackScope: h,
                smoothChildTiming: this.smoothChildTiming
            }), v = s.cycle;
            for ("string" == typeof t && (t = i.selector(t) || t),
            t = t || [],
            o(t) && (t = m(t)),
            r = r || 0,
            0 > r && (t = m(t),
            t.reverse(),
            r *= -1),
            f = 0; f < t.length; f++)
                u = d(s),
                u.startAt && (u.startAt = d(u.startAt),
                u.startAt.cycle && p(u.startAt, t, f)),
                v && (p(u, t, f),
                null != u.duration && (e = u.duration,
                delete u.duration)),
                g.to(t[f], e, u, f * r);
            return this.add(g, a)
        }
        ,
        g.staggerFrom = function(t, e, i, n, s, r, a, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(t, e, i, n, s, r, a, o)
        }
        ,
        g.staggerFromTo = function(t, e, i, n, s, r, a, o, l) {
            return n.startAt = i,
            n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
            this.staggerTo(t, e, n, s, r, a, o, l)
        }
        ,
        g.call = function(t, e, n, s) {
            return this.add(i.delayedCall(0, t, e, n), s)
        }
        ,
        g.set = function(t, e, n) {
            return n = this._parseTimeOrLabel(n, 0, !0),
            null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused),
            this.add(new i(t,0,e), n)
        }
        ,
        n.exportRoot = function(t, e) {
            t = t || {},
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var s, r, a, o, l = new n(t), c = l._timeline;
            for (null == e && (e = !0),
            c._remove(l, !0),
            l._startTime = 0,
            l._rawPrevTime = l._time = l._totalTime = c._time,
            a = c._first; a; )
                o = a._next,
                e && a instanceof i && a.target === a.vars.onComplete || (r = a._startTime - a._delay,
                0 > r && (s = 1),
                l.add(a, r)),
                a = o;
            return c.add(l, 0),
            s && l.totalDuration(),
            l
        }
        ,
        g.add = function(s, r, a, o) {
            var c, h, u, d, p, f;
            if ("number" != typeof r && (r = this._parseTimeOrLabel(r, 0, !0, s)),
            !(s instanceof t)) {
                if (s instanceof Array || s && s.push && l(s)) {
                    for (a = a || "normal",
                    o = o || 0,
                    c = r,
                    h = s.length,
                    u = 0; h > u; u++)
                        l(d = s[u]) && (d = new n({
                            tweens: d
                        })),
                        this.add(d, c),
                        "string" != typeof d && "function" != typeof d && ("sequence" === a ? c = d._startTime + d.totalDuration() / d._timeScale : "start" === a && (d._startTime -= d.delay())),
                        c += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof s)
                    return this.addLabel(s, r);
                if ("function" != typeof s)
                    throw "Cannot add " + s + " into the timeline; it is not a tween, timeline, function, or string.";
                s = i.delayedCall(0, s)
            }
            if (e.prototype.add.call(this, s, r),
            s._time && s.render((this.rawTime() - s._startTime) * s._timeScale, !1, !1),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (p = this,
                f = p.rawTime() > s._startTime; p._timeline; )
                    f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
                    p = p._timeline;
            return this
        }
        ,
        g.remove = function(e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale,
                this
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var n = e.length; --n > -1; )
                    this.remove(e[n]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }
        ,
        g._remove = function(t, i) {
            return e.prototype._remove.call(this, t, i),
            this._last ? this._time > this.duration() && (this._time = this._duration,
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        g.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }
        ,
        g.insert = g.insertMultiple = function(t, e, i, n) {
            return this.add(t, e || 0, i, n)
        }
        ,
        g.appendMultiple = function(t, e, i, n) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
        }
        ,
        g.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e),
            this
        }
        ,
        g.addPause = function(t, e, n, s) {
            var r = i.delayedCall(0, f, n, s || this);
            return r.vars.onComplete = r.vars.onReverseComplete = e,
            r.data = "isPause",
            this._hasPause = !0,
            this.add(r, t)
        }
        ,
        g.removeLabel = function(t) {
            return delete this._labels[t],
            this
        }
        ,
        g.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }
        ,
        g._parseTimeOrLabel = function(e, i, n, s) {
            var r, a;
            if (s instanceof t && s.timeline === this)
                this.remove(s);
            else if (s && (s instanceof Array || s.push && l(s)))
                for (a = s.length; --a > -1; )
                    s[a]instanceof t && s[a].timeline === this && this.remove(s[a]);
            if (r = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0,
            "string" == typeof i)
                return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - r : 0, n);
            if (i = i || 0,
            "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = r);
            else {
                if (-1 === (a = e.indexOf("=")))
                    return null == this._labels[e] ? n ? this._labels[e] = r + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(a - 1) + "1", 10) * Number(e.substr(a + 1)),
                e = a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, n) : r
            }
            return Number(e) + i
        }
        ,
        g.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }
        ,
        g.stop = function() {
            return this.paused(!0)
        }
        ,
        g.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }
        ,
        g.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }
        ,
        g.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, r, a, o, l, u, d, p = this._time, f = this._dirty ? this.totalDuration() : this._totalDuration, m = this._startTime, g = this._timeScale, v = this._paused;
            if (p !== this._time && (t += this._time - p),
            t >= f - 1e-7 && t >= 0)
                this._totalTime = this._time = f,
                this._reversed || this._hasPausedChild() || (r = !0,
                o = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === s) && this._rawPrevTime !== t && this._first && (l = !0,
                this._rawPrevTime > s && (o = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s,
                t = f + 1e-4;
            else if (1e-7 > t)
                if (this._totalTime = this._time = 0,
                (0 !== p || 0 === this._duration && this._rawPrevTime !== s && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
                r = this._reversed),
                0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = r = !0,
                    o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s,
                    0 === t && r)
                        for (n = this._first; n && 0 === n._startTime; )
                            n._duration || (r = !1),
                            n = n._next;
                    t = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= p)
                        for (n = this._first; n && n._startTime <= t && !u; )
                            n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n),
                            n = n._next;
                    else
                        for (n = this._last; n && n._startTime >= t && !u; )
                            n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n),
                            n = n._prev;
                    u && (this._time = t = u._startTime,
                    this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== p && this._first || i || l || u) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0),
                0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")),
                (d = this._time) >= p)
                    for (n = this._first; n && (a = n._next,
                    d === this._time && (!this._paused || v)); )
                        (n._active || n._startTime <= d && !n._paused && !n._gc) && (u === n && this.pause(),
                        n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                        n = a;
                else
                    for (n = this._last; n && (a = n._prev,
                    d === this._time && (!this._paused || v)); ) {
                        if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                            if (u === n) {
                                for (u = n._prev; u && u.endTime() > this._time; )
                                    u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i),
                                    u = u._prev;
                                u = null,
                                this.pause()
                            }
                            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                        }
                        n = a
                    }
                this._onUpdate && (e || (c.length && h(),
                this._callback("onUpdate"))),
                o && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (r && (c.length && h(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !e && this.vars[o] && this._callback(o)))
            }
        }
        ,
        g._hasPausedChild = function() {
            for (var t = this._first; t; ) {
                if (t._paused || t instanceof n && t._hasPausedChild())
                    return !0;
                t = t._next
            }
            return !1
        }
        ,
        g.getChildren = function(t, e, n, s) {
            s = s || -9999999999;
            for (var r = [], a = this._first, o = 0; a; )
                a._startTime < s || (a instanceof i ? !1 !== e && (r[o++] = a) : (!1 !== n && (r[o++] = a),
                !1 !== t && (r = r.concat(a.getChildren(!0, e, n)),
                o = r.length))),
                a = a._next;
            return r
        }
        ,
        g.getTweensOf = function(t, e) {
            var n, s, r = this._gc, a = [], o = 0;
            for (r && this._enabled(!0, !0),
            n = i.getTweensOf(t),
            s = n.length; --s > -1; )
                (n[s].timeline === this || e && this._contains(n[s])) && (a[o++] = n[s]);
            return r && this._enabled(!1, !0),
            a
        }
        ,
        g.recent = function() {
            return this._recent
        }
        ,
        g._contains = function(t) {
            for (var e = t.timeline; e; ) {
                if (e === this)
                    return !0;
                e = e.timeline
            }
            return !1
        }
        ,
        g.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var n, s = this._first, r = this._labels; s; )
                s._startTime >= i && (s._startTime += t),
                s = s._next;
            if (e)
                for (n in r)
                    r[n] >= i && (r[n] += t);
            return this._uncache(!0)
        }
        ,
        g._kill = function(t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, s = !1; --n > -1; )
                i[n]._kill(t, e) && (s = !0);
            return s
        }
        ,
        g.clear = function(t) {
            var e = this.getChildren(!1, !0, !0)
              , i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
                e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        g.invalidate = function() {
            for (var e = this._first; e; )
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }
        ,
        g._enabled = function(t, i) {
            if (t === this._gc)
                for (var n = this._first; n; )
                    n._enabled(t, !0),
                    n = n._next;
            return e.prototype._enabled.call(this, t, i)
        }
        ,
        g.totalTime = function(e, i, n) {
            this._forcingPlayhead = !0;
            var s = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            s
        }
        ,
        g.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        g.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, n = 0, s = this._last, r = 999999999999; s; )
                        e = s._prev,
                        s._dirty && s.totalDuration(),
                        s._startTime > r && this._sortChildren && !s._paused && !this._calculatingDuration ? (this._calculatingDuration = 1,
                        this.add(s, s._startTime - s._delay),
                        this._calculatingDuration = 0) : r = s._startTime,
                        s._startTime < 0 && !s._paused && (n -= s._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += s._startTime / this._timeScale,
                        this._time -= s._startTime,
                        this._totalTime -= s._startTime,
                        this._rawPrevTime -= s._startTime),
                        this.shiftChildren(-s._startTime, !1, -9999999999),
                        r = 0),
                        i = s._startTime + s._totalDuration / s._timeScale,
                        i > n && (n = i),
                        s = e;
                    this._duration = this._totalDuration = n,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
        }
        ,
        g.paused = function(e) {
            if (!e)
                for (var i = this._first, n = this._time; i; )
                    i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0),
                    i = i._next;
            return t.prototype.paused.apply(this, arguments)
        }
        ,
        g.usesFrames = function() {
            for (var e = this._timeline; e._timeline; )
                e = e._timeline;
            return e === t._rootFramesTimeline
        }
        ,
        g.rawTime = function(t) {
            return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
        }
        ,
        n
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t) {
    "use strict";
    var e = function() {
        return (_gsScope.GreenSockGlobals || _gsScope).TimelineLite
    };
    "undefined" != typeof module && module.exports ? (require("./TweenLite.min.js"),
    module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite"], e)
}(),
function(t, e) {
    "use strict";
    var i = {}
      , n = t.document
      , s = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (s.TweenLite)
        return s.TweenLite;
    var r, a, o, l, c, h = function(t) {
        var e, i = t.split("."), n = s;
        for (e = 0; e < i.length; e++)
            n[i[e]] = n = n[i[e]] || {};
        return n
    }, u = h("com.greensock"), d = 1e-10, p = function(t) {
        var e, i = [], n = t.length;
        for (e = 0; e !== n; i.push(t[e++]))
            ;
        return i
    }, f = function() {}, m = function() {
        var t = Object.prototype.toString
          , e = t.call([]);
        return function(i) {
            return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
        }
    }(), g = {}, v = function(n, r, a, o) {
        this.sc = g[n] ? g[n].sc : [],
        g[n] = this,
        this.gsClass = null,
        this.func = a;
        var l = [];
        this.check = function(c) {
            for (var u, d, p, f, m = r.length, _ = m; --m > -1; )
                (u = g[r[m]] || new v(r[m],[])).gsClass ? (l[m] = u.gsClass,
                _--) : c && u.sc.push(this);
            if (0 === _ && a) {
                if (d = ("com.greensock." + n).split("."),
                p = d.pop(),
                f = h(d.join("."))[p] = this.gsClass = a.apply(a, l),
                o)
                    if (s[p] = i[p] = f,
                    "undefined" != typeof module && module.exports)
                        if (n === e) {
                            module.exports = i[e] = f;
                            for (m in i)
                                f[m] = i[m]
                        } else
                            i[e] && (i[e][p] = f);
                    else
                        "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                            return f
                        });
                for (m = 0; m < this.sc.length; m++)
                    this.sc[m].check()
            }
        }
        ,
        this.check(!0)
    }, _ = t._gsDefine = function(t, e, i, n) {
        return new v(t,e,i,n)
    }
    , y = u._class = function(t, e, i) {
        return e = e || function() {}
        ,
        _(t, [], function() {
            return e
        }, i),
        e
    }
    ;
    _.globals = s;
    var b = [0, 0, 1, 1]
      , w = y("easing.Ease", function(t, e, i, n) {
        this._func = t,
        this._type = i || 0,
        this._power = n || 0,
        this._params = e ? b.concat(e) : b
    }, !0)
      , x = w.map = {}
      , T = w.register = function(t, e, i, n) {
        for (var s, r, a, o, l = e.split(","), c = l.length, h = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1; )
            for (r = l[c],
            s = n ? y("easing." + r, null, !0) : u.easing[r] || {},
            a = h.length; --a > -1; )
                o = h[a],
                x[r + "." + o] = x[o + r] = s[o] = t.getRatio ? t : t[o] || new t
    }
    ;
    for (o = w.prototype,
    o._calcEnd = !1,
    o.getRatio = function(t) {
        if (this._func)
            return this._params[0] = t,
            this._func.apply(null, this._params);
        var e = this._type
          , i = this._power
          , n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
        return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n),
        1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
    }
    ,
    r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
    a = r.length; --a > -1; )
        o = r[a] + ",Power" + a,
        T(new w(null,null,1,a), o, "easeOut", !0),
        T(new w(null,null,2,a), o, "easeIn" + (0 === a ? ",easeNone" : "")),
        T(new w(null,null,3,a), o, "easeInOut");
    x.linear = u.easing.Linear.easeIn,
    x.swing = u.easing.Quad.easeInOut;
    var S = y("events.EventDispatcher", function(t) {
        this._listeners = {},
        this._eventTarget = t || this
    });
    o = S.prototype,
    o.addEventListener = function(t, e, i, n, s) {
        s = s || 0;
        var r, a, o = this._listeners[t], h = 0;
        for (this !== l || c || l.wake(),
        null == o && (this._listeners[t] = o = []),
        a = o.length; --a > -1; )
            r = o[a],
            r.c === e && r.s === i ? o.splice(a, 1) : 0 === h && r.pr < s && (h = a + 1);
        o.splice(h, 0, {
            c: e,
            s: i,
            up: n,
            pr: s
        })
    }
    ,
    o.removeEventListener = function(t, e) {
        var i, n = this._listeners[t];
        if (n)
            for (i = n.length; --i > -1; )
                if (n[i].c === e)
                    return void n.splice(i, 1)
    }
    ,
    o.dispatchEvent = function(t) {
        var e, i, n, s = this._listeners[t];
        if (s)
            for (e = s.length,
            e > 1 && (s = s.slice(0)),
            i = this._eventTarget; --e > -1; )
                (n = s[e]) && (n.up ? n.c.call(n.s || i, {
                    type: t,
                    target: i
                }) : n.c.call(n.s || i))
    }
    ;
    var E = t.requestAnimationFrame
      , P = t.cancelAnimationFrame
      , k = Date.now || function() {
        return (new Date).getTime()
    }
      , C = k();
    for (r = ["ms", "moz", "webkit", "o"],
    a = r.length; --a > -1 && !E; )
        E = t[r[a] + "RequestAnimationFrame"],
        P = t[r[a] + "CancelAnimationFrame"] || t[r[a] + "CancelRequestAnimationFrame"];
    y("Ticker", function(t, e) {
        var i, s, r, a, o, h = this, u = k(), p = !(!1 === e || !E) && "auto", m = 500, g = 33, v = function(t) {
            var e, n, l = k() - C;
            l > m && (u += l - g),
            C += l,
            h.time = (C - u) / 1e3,
            e = h.time - o,
            (!i || e > 0 || !0 === t) && (h.frame++,
            o += e + (e >= a ? .004 : a - e),
            n = !0),
            !0 !== t && (r = s(v)),
            n && h.dispatchEvent("tick")
        };
        S.call(h),
        h.time = h.frame = 0,
        h.tick = function() {
            v(!0)
        }
        ,
        h.lagSmoothing = function(t, e) {
            return arguments.length ? (m = t || 1 / d,
            void (g = Math.min(e, m, 0))) : 1 / d > m
        }
        ,
        h.sleep = function() {
            null != r && (p && P ? P(r) : clearTimeout(r),
            s = f,
            r = null,
            h === l && (c = !1))
        }
        ,
        h.wake = function(t) {
            null !== r ? h.sleep() : t ? u += -C + (C = k()) : h.frame > 10 && (C = k() - m + 5),
            s = 0 === i ? f : p && E ? E : function(t) {
                return setTimeout(t, 1e3 * (o - h.time) + 1 | 0)
            }
            ,
            h === l && (c = !0),
            v(2)
        }
        ,
        h.fps = function(t) {
            return arguments.length ? (i = t,
            a = 1 / (i || 60),
            o = this.time + a,
            void h.wake()) : i
        }
        ,
        h.useRAF = function(t) {
            return arguments.length ? (h.sleep(),
            p = t,
            void h.fps(i)) : p
        }
        ,
        h.fps(t),
        setTimeout(function() {
            "auto" === p && h.frame < 5 && "hidden" !== (n || {}).visibilityState && h.useRAF(!1)
        }, 1500)
    }),
    o = u.Ticker.prototype = new u.events.EventDispatcher,
    o.constructor = u.Ticker;
    var A = y("core.Animation", function(t, e) {
        if (this.vars = e = e || {},
        this._duration = this._totalDuration = t || 0,
        this._delay = Number(e.delay) || 0,
        this._timeScale = 1,
        this._active = !0 === e.immediateRender,
        this.data = e.data,
        this._reversed = !0 === e.reversed,
        V) {
            c || l.wake();
            var i = this.vars.useFrames ? W : V;
            i.add(this, i._time),
            this.vars.paused && this.paused(!0)
        }
    });
    l = A.ticker = new u.Ticker,
    o = A.prototype,
    o._dirty = o._gc = o._initted = o._paused = !1,
    o._totalTime = o._time = 0,
    o._rawPrevTime = -1,
    o._next = o._last = o._onUpdate = o._timeline = o.timeline = null,
    o._paused = !1;
    var M = function() {
        c && k() - C > 2e3 && ("hidden" !== (n || {}).visibilityState || !l.lagSmoothing()) && l.wake();
        var t = setTimeout(M, 2e3);
        t.unref && t.unref()
    };
    M(),
    o.play = function(t, e) {
        return null != t && this.seek(t, e),
        this.reversed(!1).paused(!1)
    }
    ,
    o.pause = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!0)
    }
    ,
    o.resume = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!1)
    }
    ,
    o.seek = function(t, e) {
        return this.totalTime(Number(t), !1 !== e)
    }
    ,
    o.restart = function(t, e) {
        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
    }
    ,
    o.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e),
        this.reversed(!0).paused(!1)
    }
    ,
    o.render = function(t, e, i) {}
    ,
    o.invalidate = function() {
        return this._time = this._totalTime = 0,
        this._initted = this._gc = !1,
        this._rawPrevTime = -1,
        (this._gc || !this.timeline) && this._enabled(!0),
        this
    }
    ,
    o.isActive = function() {
        var t, e = this._timeline, i = this._startTime;
        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
    }
    ,
    o._enabled = function(t, e) {
        return c || l.wake(),
        this._gc = !t,
        this._active = this.isActive(),
        !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)),
        !1
    }
    ,
    o._kill = function(t, e) {
        return this._enabled(!1, !1)
    }
    ,
    o.kill = function(t, e) {
        return this._kill(t, e),
        this
    }
    ,
    o._uncache = function(t) {
        for (var e = t ? this : this.timeline; e; )
            e._dirty = !0,
            e = e.timeline;
        return this
    }
    ,
    o._swapSelfInParams = function(t) {
        for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
        return i
    }
    ,
    o._callback = function(t) {
        var e = this.vars
          , i = e[t]
          , n = e[t + "Params"]
          , s = e[t + "Scope"] || e.callbackScope || this;
        switch (n ? n.length : 0) {
        case 0:
            i.call(s);
            break;
        case 1:
            i.call(s, n[0]);
            break;
        case 2:
            i.call(s, n[0], n[1]);
            break;
        default:
            i.apply(s, n)
        }
    }
    ,
    o.eventCallback = function(t, e, i, n) {
        if ("on" === (t || "").substr(0, 2)) {
            var s = this.vars;
            if (1 === arguments.length)
                return s[t];
            null == e ? delete s[t] : (s[t] = e,
            s[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i,
            s[t + "Scope"] = n),
            "onUpdate" === t && (this._onUpdate = e)
        }
        return this
    }
    ,
    o.delay = function(t) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
        this._delay = t,
        this) : this._delay
    }
    ,
    o.duration = function(t) {
        return arguments.length ? (this._duration = this._totalDuration = t,
        this._uncache(!0),
        this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
        this) : (this._dirty = !1,
        this._duration)
    }
    ,
    o.totalDuration = function(t) {
        return this._dirty = !1,
        arguments.length ? this.duration(t) : this._totalDuration
    }
    ,
    o.time = function(t, e) {
        return arguments.length ? (this._dirty && this.totalDuration(),
        this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
    }
    ,
    o.totalTime = function(t, e, i) {
        if (c || l.wake(),
        !arguments.length)
            return this._totalTime;
        if (this._timeline) {
            if (0 > t && !i && (t += this.totalDuration()),
            this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var n = this._totalDuration
                  , s = this._timeline;
                if (t > n && !i && (t = n),
                this._startTime = (this._paused ? this._pauseTime : s._time) - (this._reversed ? n - t : t) / this._timeScale,
                s._dirty || this._uncache(!1),
                s._timeline)
                    for (; s._timeline; )
                        s._timeline._time !== (s._startTime + s._totalTime) / s._timeScale && s.totalTime(s._totalTime, !0),
                        s = s._timeline
            }
            this._gc && this._enabled(!0, !1),
            (this._totalTime !== t || 0 === this._duration) && (I.length && J(),
            this.render(t, e, !1),
            I.length && J())
        }
        return this
    }
    ,
    o.progress = o.totalProgress = function(t, e) {
        var i = this.duration();
        return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
    }
    ,
    o.startTime = function(t) {
        return arguments.length ? (t !== this._startTime && (this._startTime = t,
        this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
        this) : this._startTime
    }
    ,
    o.endTime = function(t) {
        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
    }
    ,
    o.timeScale = function(t) {
        if (!arguments.length)
            return this._timeScale;
        var e, i;
        for (t = t || d,
        this._timeline && this._timeline.smoothChildTiming && (e = this._pauseTime,
        i = e || 0 === e ? e : this._timeline.totalTime(),
        this._startTime = i - (i - this._startTime) * this._timeScale / t),
        this._timeScale = t,
        i = this.timeline; i && i.timeline; )
            i._dirty = !0,
            i.totalDuration(),
            i = i.timeline;
        return this
    }
    ,
    o.reversed = function(t) {
        return arguments.length ? (t != this._reversed && (this._reversed = t,
        this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
        this) : this._reversed
    }
    ,
    o.paused = function(t) {
        if (!arguments.length)
            return this._paused;
        var e, i, n = this._timeline;
        return t != this._paused && n && (c || t || l.wake(),
        e = n.rawTime(),
        i = e - this._pauseTime,
        !t && n.smoothChildTiming && (this._startTime += i,
        this._uncache(!1)),
        this._pauseTime = t ? e : null,
        this._paused = t,
        this._active = this.isActive(),
        !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale,
        this.render(e, e === this._totalTime, !0))),
        this._gc && !t && this._enabled(!0, !1),
        this
    }
    ;
    var L = y("core.SimpleTimeline", function(t) {
        A.call(this, 0, t),
        this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    o = L.prototype = new A,
    o.constructor = L,
    o.kill()._gc = !1,
    o._first = o._last = o._recent = null,
    o._sortChildren = !1,
    o.add = o.insert = function(t, e, i, n) {
        var s, r;
        if (t._startTime = Number(e || 0) + t._delay,
        t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
        t.timeline && t.timeline._remove(t, !0),
        t.timeline = t._timeline = this,
        t._gc && t._enabled(!0, !0),
        s = this._last,
        this._sortChildren)
            for (r = t._startTime; s && s._startTime > r; )
                s = s._prev;
        return s ? (t._next = s._next,
        s._next = t) : (t._next = this._first,
        this._first = t),
        t._next ? t._next._prev = t : this._last = t,
        t._prev = s,
        this._recent = t,
        this._timeline && this._uncache(!0),
        this
    }
    ,
    o._remove = function(t, e) {
        return t.timeline === this && (e || t._enabled(!1, !0),
        t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next),
        t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev),
        t._next = t._prev = t.timeline = null,
        t === this._recent && (this._recent = this._last),
        this._timeline && this._uncache(!0)),
        this
    }
    ,
    o.render = function(t, e, i) {
        var n, s = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; s; )
            n = s._next,
            (s._active || t >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
            s = n
    }
    ,
    o.rawTime = function() {
        return c || l.wake(),
        this._totalTime
    }
    ;
    var O = y("TweenLite", function(e, i, n) {
        if (A.call(this, i, n),
        this.render = O.prototype.render,
        null == e)
            throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : O.selector(e) || e;
        var s, r, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
        if (this._overwrite = l = null == l ? G[O.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l],
        (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
            for (this._targets = a = p(e),
            this._propLookup = [],
            this._siblings = [],
            s = 0; s < a.length; s++)
                r = a[s],
                r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(s--, 1),
                this._targets = a = a.concat(p(r))) : (this._siblings[s] = K(r, this, !1),
                1 === l && this._siblings[s].length > 1 && tt(r, this, null, 1, this._siblings[s])) : "string" == typeof (r = a[s--] = O.selector(r)) && a.splice(s + 1, 1) : a.splice(s--, 1);
        else
            this._propLookup = {},
            this._siblings = K(e, this, !1),
            1 === l && this._siblings.length > 1 && tt(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -d,
        this.render(Math.min(0, -this._delay)))
    }, !0)
      , D = function(e) {
        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
    }
      , j = function(t, e) {
        var i, n = {};
        for (i in t)
            U[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!z[i] || z[i] && z[i]._autoCSS) || (n[i] = t[i],
            delete t[i]);
        t.css = n
    };
    o = O.prototype = new A,
    o.constructor = O,
    o.kill()._gc = !1,
    o.ratio = 0,
    o._firstPT = o._targets = o._overwrittenProps = o._startAt = null,
    o._notifyPluginsOfEnabled = o._lazy = !1,
    O.version = "1.20.5",
    O.defaultEase = o._ease = new w(null,null,1,1),
    O.defaultOverwrite = "auto",
    O.ticker = l,
    O.autoSleep = 120,
    O.lagSmoothing = function(t, e) {
        l.lagSmoothing(t, e)
    }
    ,
    O.selector = t.$ || t.jQuery || function(e) {
        var i = t.$ || t.jQuery;
        return i ? (O.selector = i,
        i(e)) : (n || (n = t.document),
        n ? n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e)
    }
    ;
    var I = []
      , R = {}
      , N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
      , F = /[\+-]=-?[\.\d]/
      , H = function(t) {
        for (var e, i = this._firstPT; i; )
            e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s,
            i.m ? e = i.m.call(this._tween, e, this._target || i.t, this._tween) : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0),
            i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e,
            i = i._next
    }
      , $ = function(t, e, i, n) {
        var s, r, a, o, l, c, h, u = [], d = 0, p = "", f = 0;
        for (u.start = t,
        u.end = e,
        t = u[0] = t + "",
        e = u[1] = e + "",
        i && (i(u),
        t = u[0],
        e = u[1]),
        u.length = 0,
        s = t.match(N) || [],
        r = e.match(N) || [],
        n && (n._next = null,
        n.blob = 1,
        u._firstPT = u._applyPT = n),
        l = r.length,
        o = 0; l > o; o++)
            h = r[o],
            c = e.substr(d, e.indexOf(h, d) - d),
            p += c || !o ? c : ",",
            d += c.length,
            f ? f = (f + 1) % 5 : "rgba(" === c.substr(-5) && (f = 1),
            h === s[o] || s.length <= o ? p += h : (p && (u.push(p),
            p = ""),
            a = parseFloat(s[o]),
            u.push(a),
            u._firstPT = {
                _next: u._firstPT,
                t: u,
                p: u.length - 1,
                s: a,
                c: ("=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * parseFloat(h.substr(2)) : parseFloat(h) - a) || 0,
                f: 0,
                m: f && 4 > f ? Math.round : 0
            }),
            d += h.length;
        return p += e.substr(d),
        p && u.push(p),
        u.setRatio = H,
        F.test(e) && (u.end = null),
        u
    }
      , Y = function(t, e, i, n, s, r, a, o, l) {
        "function" == typeof n && (n = n(l || 0, t));
        var c, h = typeof t[e], u = "function" !== h ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), d = "get" !== i ? i : u ? a ? t[u](a) : t[u]() : t[e], p = "string" == typeof n && "=" === n.charAt(1), f = {
            t: t,
            p: e,
            s: d,
            f: "function" === h,
            pg: 0,
            n: s || e,
            m: r ? "function" == typeof r ? r : Math.round : 0,
            pr: 0,
            c: p ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - d || 0
        };
        return ("number" != typeof d || "number" != typeof n && !p) && (a || isNaN(d) || !p && isNaN(n) || "boolean" == typeof d || "boolean" == typeof n ? (f.fp = a,
        c = $(d, p ? parseFloat(f.s) + f.c + (f.s + "").replace(/[0-9\-\.]/g, "") : n, o || O.defaultStringFilter, f),
        f = {
            t: c,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 2,
            pg: 0,
            n: s || e,
            pr: 0,
            m: 0
        }) : (f.s = parseFloat(d),
        p || (f.c = parseFloat(n) - f.s || 0))),
        f.c ? ((f._next = this._firstPT) && (f._next._prev = f),
        this._firstPT = f,
        f) : void 0
    }
      , B = O._internals = {
        isArray: m,
        isSelector: D,
        lazyTweens: I,
        blobDif: $
    }
      , z = O._plugins = {}
      , q = B.tweenLookup = {}
      , X = 0
      , U = B.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1
    }
      , G = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0
    }
      , W = A._rootFramesTimeline = new L
      , V = A._rootTimeline = new L
      , Q = 30
      , J = B.lazyRender = function() {
        var t, e = I.length;
        for (R = {}; --e > -1; )
            (t = I[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0),
            t._lazy = !1);
        I.length = 0
    }
    ;
    V._startTime = l.time,
    W._startTime = l.frame,
    V._active = W._active = !0,
    setTimeout(J, 1),
    A._updateRoot = O.render = function() {
        var t, e, i;
        if (I.length && J(),
        V.render((l.time - V._startTime) * V._timeScale, !1, !1),
        W.render((l.frame - W._startTime) * W._timeScale, !1, !1),
        I.length && J(),
        l.frame >= Q) {
            Q = l.frame + (parseInt(O.autoSleep, 10) || 120);
            for (i in q) {
                for (e = q[i].tweens,
                t = e.length; --t > -1; )
                    e[t]._gc && e.splice(t, 1);
                0 === e.length && delete q[i]
            }
            if ((!(i = V._first) || i._paused) && O.autoSleep && !W._first && 1 === l._listeners.tick.length) {
                for (; i && i._paused; )
                    i = i._next;
                i || l.sleep()
            }
        }
    }
    ,
    l.addEventListener("tick", A._updateRoot);
    var K = function(t, e, i) {
        var n, s, r = t._gsTweenID;
        if (q[r || (t._gsTweenID = r = "t" + X++)] || (q[r] = {
            target: t,
            tweens: []
        }),
        e && (n = q[r].tweens,
        n[s = n.length] = e,
        i))
            for (; --s > -1; )
                n[s] === e && n.splice(s, 1);
        return q[r].tweens
    }
      , Z = function(t, e, i, n) {
        var s, r, a = t.vars.onOverwrite;
        return a && (s = a(t, e, i, n)),
        a = O.onOverwrite,
        a && (r = a(t, e, i, n)),
        !1 !== s && !1 !== r
    }
      , tt = function(t, e, i, n, s) {
        var r, a, o, l;
        if (1 === n || n >= 4) {
            for (l = s.length,
            r = 0; l > r; r++)
                if ((o = s[r]) !== e)
                    o._gc || o._kill(null, t, e) && (a = !0);
                else if (5 === n)
                    break;
            return a
        }
        var c, h = e._startTime + d, u = [], p = 0, f = 0 === e._duration;
        for (r = s.length; --r > -1; )
            (o = s[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (c = c || et(e, 0, f),
            0 === et(o, c, f) && (u[p++] = o)) : o._startTime <= h && o._startTime + o.totalDuration() / o._timeScale > h && ((f || !o._initted) && h - o._startTime <= 2e-10 || (u[p++] = o)));
        for (r = p; --r > -1; )
            if (o = u[r],
            2 === n && o._kill(i, t, e) && (a = !0),
            2 !== n || !o._firstPT && o._initted) {
                if (2 !== n && !Z(o, e))
                    continue;
                o._enabled(!1, !1) && (a = !0)
            }
        return a
    }
      , et = function(t, e, i) {
        for (var n = t._timeline, s = n._timeScale, r = t._startTime; n._timeline; ) {
            if (r += n._startTime,
            s *= n._timeScale,
            n._paused)
                return -100;
            n = n._timeline
        }
        return r /= s,
        r > e ? r - e : i && r === e || !t._initted && 2 * d > r - e ? d : (r += t.totalDuration() / t._timeScale / s) > e + d ? 0 : r - e - d
    };
    o._init = function() {
        var t, e, i, n, s, r, a = this.vars, o = this._overwrittenProps, l = this._duration, c = !!a.immediateRender, h = a.ease;
        if (a.startAt) {
            this._startAt && (this._startAt.render(-1, !0),
            this._startAt.kill()),
            s = {};
            for (n in a.startAt)
                s[n] = a.startAt[n];
            if (s.data = "isStart",
            s.overwrite = !1,
            s.immediateRender = !0,
            s.lazy = c && !1 !== a.lazy,
            s.startAt = s.delay = null,
            s.onUpdate = a.onUpdate,
            s.onUpdateParams = a.onUpdateParams,
            s.onUpdateScope = a.onUpdateScope || a.callbackScope || this,
            this._startAt = O.to(this.target || {}, 0, s),
            c)
                if (this._time > 0)
                    this._startAt = null;
                else if (0 !== l)
                    return
        } else if (a.runBackwards && 0 !== l)
            if (this._startAt)
                this._startAt.render(-1, !0),
                this._startAt.kill(),
                this._startAt = null;
            else {
                0 !== this._time && (c = !1),
                i = {};
                for (n in a)
                    U[n] && "autoCSS" !== n || (i[n] = a[n]);
                if (i.overwrite = 0,
                i.data = "isFromStart",
                i.lazy = c && !1 !== a.lazy,
                i.immediateRender = c,
                this._startAt = O.to(this.target, 0, i),
                c) {
                    if (0 === this._time)
                        return
                } else
                    this._startAt._init(),
                    this._startAt._enabled(!1),
                    this.vars.immediateRender && (this._startAt = null)
            }
        if (this._ease = h = h ? h instanceof w ? h : "function" == typeof h ? new w(h,a.easeParams) : x[h] || O.defaultEase : O.defaultEase,
        a.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, a.easeParams)),
        this._easeType = this._ease._type,
        this._easePower = this._ease._power,
        this._firstPT = null,
        this._targets)
            for (r = this._targets.length,
            t = 0; r > t; t++)
                this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null, t) && (e = !0);
        else
            e = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
        if (e && O._onPluginEvent("_onInitAllProps", this),
        o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
        a.runBackwards)
            for (i = this._firstPT; i; )
                i.s += i.c,
                i.c = -i.c,
                i = i._next;
        this._onUpdate = a.onUpdate,
        this._initted = !0
    }
    ,
    o._initProps = function(e, i, n, s, r) {
        var a, o, l, c, h, u;
        if (null == e)
            return !1;
        R[e._gsTweenID] && J(),
        this.vars.css || e.style && e !== t && e.nodeType && z.css && !1 !== this.vars.autoCSS && j(this.vars, e);
        for (a in this.vars)
            if (u = this.vars[a],
            U[a])
                u && (u instanceof Array || u.push && m(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[a] = u = this._swapSelfInParams(u, this));
            else if (z[a] && (c = new z[a])._onInitTween(e, this.vars[a], this, r)) {
                for (this._firstPT = h = {
                    _next: this._firstPT,
                    t: c,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: a,
                    pg: 1,
                    pr: c._priority,
                    m: 0
                },
                o = c._overwriteProps.length; --o > -1; )
                    i[c._overwriteProps[o]] = this._firstPT;
                (c._priority || c._onInitAllProps) && (l = !0),
                (c._onDisable || c._onEnable) && (this._notifyPluginsOfEnabled = !0),
                h._next && (h._next._prev = h)
            } else
                i[a] = Y.call(this, e, a, "get", u, a, 0, null, this.vars.stringFilter, r);
        return s && this._kill(s, e) ? this._initProps(e, i, n, s, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && tt(e, this, i, this._overwrite, n) ? (this._kill(i, e),
        this._initProps(e, i, n, s, r)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (R[e._gsTweenID] = !0),
        l)
    }
    ,
    o.render = function(t, e, i) {
        var n, s, r, a, o = this._time, l = this._duration, c = this._rawPrevTime;
        if (t >= l - 1e-7 && t >= 0)
            this._totalTime = this._time = l,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
            this._reversed || (n = !0,
            s = "onComplete",
            i = i || this._timeline.autoRemoveChildren),
            0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
            (0 > c || 0 >= t && t >= -1e-7 || c === d && "isPause" !== this.data) && c !== t && (i = !0,
            c > d && (s = "onReverseComplete")),
            this._rawPrevTime = a = !e || t || c === t ? t : d);
        else if (1e-7 > t)
            this._totalTime = this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== o || 0 === l && c > 0) && (s = "onReverseComplete",
            n = this._reversed),
            0 > t && (this._active = !1,
            0 === l && (this._initted || !this.vars.lazy || i) && (c >= 0 && (c !== d || "isPause" !== this.data) && (i = !0),
            this._rawPrevTime = a = !e || t || c === t ? t : d)),
            (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
        else if (this._totalTime = this._time = t,
        this._easeType) {
            var h = t / l
              , u = this._easeType
              , p = this._easePower;
            (1 === u || 3 === u && h >= .5) && (h = 1 - h),
            3 === u && (h *= 2),
            1 === p ? h *= h : 2 === p ? h *= h * h : 3 === p ? h *= h * h * h : 4 === p && (h *= h * h * h * h),
            this.ratio = 1 === u ? 1 - h : 2 === u ? h : .5 > t / l ? h / 2 : 1 - h / 2
        } else
            this.ratio = this._ease.getRatio(t / l);
        if (this._time !== o || i) {
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))
                    return this._time = this._totalTime = o,
                    this._rawPrevTime = c,
                    I.push(this),
                    void (this._lazy = [t, e]);
                this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (!1 !== this._lazy && (this._lazy = !1),
            this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0),
            0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : s || (s = "_dummyGS")),
            this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))),
            r = this._firstPT; r; )
                r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s,
                r = r._next;
            this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, i),
            e || (this._time !== o || n || i) && this._callback("onUpdate")),
            s && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, i),
            n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !e && this.vars[s] && this._callback(s),
            0 === l && this._rawPrevTime === d && a !== d && (this._rawPrevTime = 0))
        }
    }
    ,
    o._kill = function(t, e, i) {
        if ("all" === t && (t = null),
        null == t && (null == e || e === this.target))
            return this._lazy = !1,
            this._enabled(!1, !1);
        e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
        var n, s, r, a, o, l, c, h, u, d = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
        if ((m(e) || D(e)) && "number" != typeof e[0])
            for (n = e.length; --n > -1; )
                this._kill(t, e[n], i) && (l = !0);
        else {
            if (this._targets) {
                for (n = this._targets.length; --n > -1; )
                    if (e === this._targets[n]) {
                        o = this._propLookup[n] || {},
                        this._overwrittenProps = this._overwrittenProps || [],
                        s = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                        break
                    }
            } else {
                if (e !== this.target)
                    return !1;
                o = this._propLookup,
                s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
            }
            if (o) {
                if (c = t || o,
                h = t !== s && "all" !== s && t !== o && ("object" != typeof t || !t._tempKill),
                i && (O.onOverwrite || this.vars.onOverwrite)) {
                    for (r in c)
                        o[r] && (u || (u = []),
                        u.push(r));
                    if ((u || !t) && !Z(this, i, e, u))
                        return !1
                }
                for (r in c)
                    (a = o[r]) && (d && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s,
                    l = !0),
                    a.pg && a.t._kill(c) && (l = !0),
                    a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next),
                    a._next && (a._next._prev = a._prev),
                    a._next = a._prev = null),
                    delete o[r]),
                    h && (s[r] = 1);
                !this._firstPT && this._initted && this._enabled(!1, !1)
            }
        }
        return l
    }
    ,
    o.invalidate = function() {
        return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this),
        this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
        this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
        this._propLookup = this._targets ? {} : [],
        A.prototype.invalidate.call(this),
        this.vars.immediateRender && (this._time = -d,
        this.render(Math.min(0, -this._delay))),
        this
    }
    ,
    o._enabled = function(t, e) {
        if (c || l.wake(),
        t && this._gc) {
            var i, n = this._targets;
            if (n)
                for (i = n.length; --i > -1; )
                    this._siblings[i] = K(n[i], this, !0);
            else
                this._siblings = K(this.target, this, !0)
        }
        return A.prototype._enabled.call(this, t, e),
        !(!this._notifyPluginsOfEnabled || !this._firstPT) && O._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
    }
    ,
    O.to = function(t, e, i) {
        return new O(t,e,i)
    }
    ,
    O.from = function(t, e, i) {
        return i.runBackwards = !0,
        i.immediateRender = 0 != i.immediateRender,
        new O(t,e,i)
    }
    ,
    O.fromTo = function(t, e, i, n) {
        return n.startAt = i,
        n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
        new O(t,e,n)
    }
    ,
    O.delayedCall = function(t, e, i, n, s) {
        return new O(e,0,{
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: n,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: s,
            overwrite: 0
        })
    }
    ,
    O.set = function(t, e) {
        return new O(t,0,e)
    }
    ,
    O.getTweensOf = function(t, e) {
        if (null == t)
            return [];
        t = "string" != typeof t ? t : O.selector(t) || t;
        var i, n, s, r;
        if ((m(t) || D(t)) && "number" != typeof t[0]) {
            for (i = t.length,
            n = []; --i > -1; )
                n = n.concat(O.getTweensOf(t[i], e));
            for (i = n.length; --i > -1; )
                for (r = n[i],
                s = i; --s > -1; )
                    r === n[s] && n.splice(i, 1)
        } else if (t._gsTweenID)
            for (n = K(t).concat(),
            i = n.length; --i > -1; )
                (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
        return n || []
    }
    ,
    O.killTweensOf = O.killDelayedCallsTo = function(t, e, i) {
        "object" == typeof e && (i = e,
        e = !1);
        for (var n = O.getTweensOf(t, e), s = n.length; --s > -1; )
            n[s]._kill(i, t)
    }
    ;
    var it = y("plugins.TweenPlugin", function(t, e) {
        this._overwriteProps = (t || "").split(","),
        this._propName = this._overwriteProps[0],
        this._priority = e || 0,
        this._super = it.prototype
    }, !0);
    if (o = it.prototype,
    it.version = "1.19.0",
    it.API = 2,
    o._firstPT = null,
    o._addTween = Y,
    o.setRatio = H,
    o._kill = function(t) {
        var e, i = this._overwriteProps, n = this._firstPT;
        if (null != t[this._propName])
            this._overwriteProps = [];
        else
            for (e = i.length; --e > -1; )
                null != t[i[e]] && i.splice(e, 1);
        for (; n; )
            null != t[n.n] && (n._next && (n._next._prev = n._prev),
            n._prev ? (n._prev._next = n._next,
            n._prev = null) : this._firstPT === n && (this._firstPT = n._next)),
            n = n._next;
        return !1
    }
    ,
    o._mod = o._roundProps = function(t) {
        for (var e, i = this._firstPT; i; )
            e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")],
            e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e),
            i = i._next
    }
    ,
    O._onPluginEvent = function(t, e) {
        var i, n, s, r, a, o = e._firstPT;
        if ("_onInitAllProps" === t) {
            for (; o; ) {
                for (a = o._next,
                n = s; n && n.pr > o.pr; )
                    n = n._next;
                (o._prev = n ? n._prev : r) ? o._prev._next = o : s = o,
                (o._next = n) ? n._prev = o : r = o,
                o = a
            }
            o = e._firstPT = s
        }
        for (; o; )
            o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
            o = o._next;
        return i
    }
    ,
    it.activate = function(t) {
        for (var e = t.length; --e > -1; )
            t[e].API === it.API && (z[(new t[e])._propName] = t[e]);
        return !0
    }
    ,
    _.plugin = function(t) {
        if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
        var e, i = t.propName, n = t.priority || 0, s = t.overwriteProps, r = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps"
        }, a = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
            it.call(this, i, n),
            this._overwriteProps = s || []
        }, !0 === t.global), o = a.prototype = new it(i);
        o.constructor = a,
        a.API = t.API;
        for (e in r)
            "function" == typeof t[e] && (o[r[e]] = t[e]);
        return a.version = t.version,
        it.activate([a]),
        a
    }
    ,
    r = t._gsQueue) {
        for (a = 0; a < r.length; a++)
            r[a]();
        for (o in g)
            g[o].func || t.console.log("GSAP encountered missing dependency: " + o)
    }
    c = !1
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");