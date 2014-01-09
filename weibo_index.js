STK.register("kit.dom.parseDOM", function(a) {
	return function(a) {
		for (var b in a) a[b] && a[b].length == 1 && (a[b] = a[b][0]);
		return a
	}
});
STK.register("kit.extra.language", function(a) {
	window.$LANG || (window.$LANG = {});
	return function(b) {
		var c = [].splice.call(arguments, 1, arguments.length),
			d = [b, $LANG].concat(c),
			e = a.core.util.language.apply(this, d);
		return e
	}
});
STK.register("ui.mod.layer", function(a) {
	var b = function(a) {
			var b = {};
			if (a.style.display == "none") {
				a.style.visibility = "hidden";
				a.style.display = "";
				b.w = a.offsetWidth;
				b.h = a.offsetHeight;
				a.style.display = "none";
				a.style.visibility = "visible"
			} else {
				b.w = a.offsetWidth;
				b.h = a.offsetHeight
			}
			return b
		},
		c = function(c, d) {
			d = d || "topleft";
			var e = null;
			if (c.style.display == "none") {
				c.style.visibility = "hidden";
				c.style.display = "";
				e = a.core.dom.position(c);
				c.style.display = "none";
				c.style.visibility = "visible"
			} else e = a.core.dom.position(c);
			if (d !== "topleft") {
				var f = b(c);
				if (d === "topright") e.l = e.l + f.w;
				else if (d === "bottomleft") e.t = e.t + f.h;
				else if (d === "bottomright") {
					e.l = e.l + f.w;
					e.t = e.t + f.h
				}
			}
			return e
		};
	return function(d) {
		var e = a.core.dom.builder(d),
			f = e.list.outer[0],
			g = e.list.inner[0],
			h = a.core.dom.uniqueID(f),
			i = {},
			j = a.core.evt.custEvent.define(i, "show");
		a.core.evt.custEvent.define(j, "hide");
		var k = null;
		i.show = function() {
			f.style.display = "";
			a.core.evt.custEvent.fire(j, "show");
			return i
		};
		i.hide = function() {
			f.style.display = "none";
			a.custEvent.fire(j, "hide");
			return i
		};
		i.getPosition = function(a) {
			return c(f, a)
		};
		i.getSize = function(a) {
			if (a || !k) k = b.apply(i, [f]);
			return k
		};
		i.html = function(a) {
			a !== undefined && (g.innerHTML = a);
			return g.innerHTML
		};
		i.text = function(b) {
			b !== undefined && (g.innerHTML = a.core.str.encodeHTML(b));
			return a.core.str.decodeHTML(g.innerHTML)
		};
		i.appendChild = function(a) {
			g.appendChild(a);
			return i
		};
		i.getUniqueID = function() {
			return h
		};
		i.getOuter = function() {
			return f
		};
		i.getInner = function() {
			return g
		};
		i.getParentNode = function() {
			return f.parentNode
		};
		i.getDomList = function() {
			return e.list
		};
		i.getDomListByKey = function(a) {
			return e.list[a]
		};
		i.getDom = function(a, b) {
			return e.list[a] ? e.list[a][b || 0] : !1
		};
		i.getCascadeDom = function(b, c) {
			return e.list[b] ? a.core.dom.cascadeNode(e.list[b][c || 0]) : !1
		};
		return i
	}
});
STK.register("kit.dom.fix", function(a) {
	function f(c, e, f) {
		if ( !! d(c)) {
			var g = "fixed",
				h, i, j, k, l = c.offsetWidth,
				m = c.offsetHeight,
				n = a.core.util.winSize(),
				o = 0,
				p = 0,
				q = a.core.dom.cssText(c.style.cssText);
			if (!b) {
				g = "absolute";
				var r = a.core.util.scrollPos();
				o = h = r.top;
				p = i = r.left;
				switch (e) {
				case "lt":
					h += f[1];
					i += f[0];
					break;
				case "lb":
					h += n.height - m - f[1];
					i += f[0];
					break;
				case "rt":
					h += f[1];
					i += n.width - l - f[0];
					break;
				case "rb":
					h += n.height - m - f[1];
					i += n.width - l - f[0];
					break;
				case "c":
				default:
					h += (n.height - m) / 2 + f[1];
					i += (n.width - l) / 2 + f[0]
				}
				j = k = ""
			} else {
				h = k = f[1];
				i = j = f[0];
				switch (e) {
				case "lt":
					k = j = "";
					break;
				case "lb":
					h = j = "";
					break;
				case "rt":
					i = k = "";
					break;
				case "rb":
					h = i = "";
					break;
				case "c":
				default:
					h = (n.height - m) / 2 + f[1];
					i = (n.width - l) / 2 + f[0];
					k = j = ""
				}
			}
			if (e == "c") {
				h < o && (h = o);
				i < p && (i = p)
			}
			q.push("position", g).push("top", h + "px").push("left", i + "px").push("right", j + "px").push("bottom", k + "px");
			c.style.cssText = q.getCss()
		}
	}
	function e(b) {
		b = a.core.arr.isArray(b) ? b : [0, 0];
		for (var c = 0; c < 2; c++) typeof b[c] != "number" && (b[c] = 0);
		return b
	}
	function d(b) {
		return a.core.dom.getStyle(b, "display") != "none"
	}
	var b = !(a.core.util.browser.IE6 || document.compatMode !== "CSS1Compat" && STK.IE),
		c = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
	return function(d, g, h) {
		var i, j, k = !0,
			l;
		if (a.core.dom.isNode(d) && c.test(g)) {
			var m = {
				getNode: function() {
					return d
				},
				isFixed: function() {
					return k
				},
				setFixed: function(a) {
					(k = !! a) && f(d, i, j);
					return this
				},
				setAlign: function(a, b) {
					if (c.test(a)) {
						i = a;
						j = e(b);
						k && f(d, i, j)
					}
					return this
				},
				destroy: function() {
					b || b && a.core.evt.removeEvent(window, "scroll", n);
					a.core.evt.removeEvent(window, "resize", n);
					a.core.evt.custEvent.undefine(l)
				}
			};
			l = a.core.evt.custEvent.define(m, "beforeFix");
			m.setAlign(g, h);

			function n(c) {
				c = c || window.event;
				a.core.evt.custEvent.fire(l, "beforeFix", c.type);
				k && (!b || i == "c") && f(d, i, j)
			}
			b || a.core.evt.addEvent(window, "scroll", n);
			a.core.evt.addEvent(window, "resize", n);
			return m
		}
	}
});
STK.register("ui.mask", function(a) {
	function k(b) {
		var c;
		(c = b.getAttribute(f)) || b.setAttribute(f, c = a.getUniqueKey());
		return ">" + b.tagName.toLowerCase() + "[" + f + '="' + c + '"]'
	}
	function j() {
		b = a.C("div");
		var c = '<div node-type="outer">';
		a.core.util.browser.IE6 && (c += '<div style="position:absolute;width:100%;height:100%;"></div>');
		c += "</div>";
		b = a.builder(c).list.outer[0];
		document.body.appendChild(b);
		e = !0;
		d = a.kit.dom.fix(b, "lt");
		var f = function() {
				var c = a.core.util.winSize();
				b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + "px").getCss()
			};
		i.add(d, "beforeFix", f);
		f()
	}
	var b, c = [],
		d, e = !1,
		f = "STK-Mask-Key",
		g = a.core.dom.setStyle,
		h = a.core.dom.getStyle,
		i = a.core.evt.custEvent,
		l = {
			getNode: function() {
				return b
			},
			show: function(c, f) {
				if (e) {
					c = a.core.obj.parseParam({
						opacity: .3,
						background: "#000000"
					}, c);
					b.style.background = c.background;
					g(b, "opacity", c.opacity);
					b.style.display = "";
					d.setAlign("lt");
					f && f()
				} else {
					j();
					l.show(c, f)
				}
				return l
			},
			hide: function() {
				b.style.display = "none";
				c = [];
				return l
			},
			showUnderNode: function(d, e) {
				a.isNode(d) && l.show(e, function() {
					g(b, "zIndex", h(d, "zIndex"));
					var e = k(d),
						f = a.core.arr.indexOf(c, e);
					f != -1 && c.splice(f, 1);
					c.push(e);
					a.core.dom.insertElement(d, b, "beforebegin")
				});
				return l
			},
			back: function() {
				if (c.length < 1) return l;
				var d, e;
				c.pop();
				if (c.length < 1) l.hide();
				else if ((e = c[c.length - 1]) && (d = a.sizzle(e, document.body)[0])) {
					g(b, "zIndex", h(d, "zIndex"));
					a.core.dom.insertElement(d, b, "beforebegin")
				} else l.back();
				return l
			},
			resetSize: function() {
				var c = a.core.util.winSize();
				b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + 22 + "px").getCss();
				return l
			},
			destroy: function() {
				i.remove(d);
				b.style.display = "none"
			}
		};
	return l
});
STK.register("ui.litePrompt", function(a) {
	var b = a.kit.extra.language,
		c = a.core.util.easyTemplate;
	return function(b, d) {
		var e, f, g, h, i, d = a.parseParam({
			hideCallback: a.core.func.empty,
			type: "succM",
			msg: "",
			timeout: ""
		}, d),
			j = d.template || '<#et temp data><div class="W_layer" node-type="outer"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content layer_mini_info_big" node-type="inner"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp; &nbsp; &nbsp;</p></div></td></tr></tbody></table></div></div></#et>',
			k = c(j, {
				type: d.type,
				msg: b
			}).toString();
		f = {};
		g = a.ui.mod.layer(k);
		i = g.getOuter();
		a.custEvent.add(g, "hide", function() {
			a.ui.mask.back();
			d.hideCallback && d.hideCallback();
			a.custEvent.remove(g, "hide", arguments.callee);
			clearTimeout(h)
		});
		a.custEvent.add(g, "show", function() {
			document.body.appendChild(i);
			a.ui.mask.showUnderNode(i);
			a.ui.mask.getNode().style.zIndex = 10002
		});
		g.show();
		d.timeout && (h = setTimeout(g.hide, d.timeout));
		var l = a.core.util.winSize(),
			m = g.getSize(!0);
		i.style.top = a.core.util.scrollPos().top + (l.height - m.h) / 2 + "px";
		i.style.left = (l.width - m.w) / 2 + "px";
		i.style.zIndex = 10002;
		f.layer = g;
		return f
	}
});
STK.register("ui.mod.dialog", function(a) {
	return function(b, c) {
		if (!b) throw "ui.mod.dialog need template as first parameter";
		var d, e, f, g, h, i, j, k, l, m, n, o;
		l = !0;
		var p = function() {
				l !== !1 && e.hide()
			},
			q = function() {
				d = a.parseParam({
					t: null,
					l: null,
					width: null,
					height: null
				}, c);
				e = a.ui.mod.layer(b, d);
				g = e.getOuter();
				h = e.getDom("title");
				k = e.getDom("title_content");
				i = e.getDom("inner");
				j = e.getDom("close");
				a.addEvent(j, "click", function(b) {
					a.preventDefault(b);
					n();
					return !1
				});
				a.custEvent.add(e, "show", function() {
					a.hotKey.add(document.documentElement, ["esc"], p, {
						type: "keyup",
						disableInInput: !0
					})
				});
				a.custEvent.add(e, "hide", function() {
					a.hotKey.remove(document.documentElement, ["esc"], p, {
						type: "keyup"
					});
					l = !0
				})
			};
		q();
		o = a.objSup(e, ["show", "hide"]);
		n = function(b) {
			if (typeof m == "function" && !b && m() === !1) return !1;
			o.hide();
			a.contains(document.body, e.getOuter()) && document.body.removeChild(e.getOuter());
			return f
		};
		f = e;
		f.show = function() {
			a.contains(document.body, e.getOuter()) || document.body.appendChild(e.getOuter());
			o.show();
			return f
		};
		f.hide = n;
		f.setPosition = function(a) {
			g.style.top = a.t + "px";
			g.style.left = a.l + "px";
			return f
		};
		f.setMiddle = function() {
			var b = a.core.util.winSize(),
				c = e.getSize(!0),
				d = a.core.util.scrollPos().top + (b.height - c.h) / 2;
			g.style.top = (d > 0 ? d : 0) + "px";
			g.style.left = (b.width - c.w) / 2 + "px";
			return f
		};
		f.setTitle = function(a) {
			k.innerHTML = a;
			return f
		};
		f.setContent = function(a) {
			typeof a == "string" ? i.innerHTML = a : i.appendChild(a);
			return f
		};
		f.clearContent = function() {
			while (i.children.length) a.removeNode(i.children[0]);
			return f
		};
		f.setAlign = function() {};
		f.setBeforeHideFn = function(a) {
			m = a
		};
		f.clearBeforeHideFn = function() {
			m = null
		};
		f.unsupportEsc = function() {
			l = !1
		};
		f.supportEsc = function() {
			l = !0
		};
		return f
	}
});
STK.register("kit.dom.drag", function(a) {
	return function(b, c) {
		var d, e, f, g, h, i, j, k, l = function() {
				m();
				n()
			},
			m = function() {
				d = a.parseParam({
					moveDom: b,
					perchStyle: "border:solid #999999 2px;",
					dragtype: "perch",
					actObj: {},
					pagePadding: 5
				}, c);
				f = d.moveDom;
				e = {};
				g = {};
				h = a.drag(b, {
					actObj: d.actObj
				});
				if (d.dragtype === "perch") {
					i = a.C("div");
					j = !1;
					k = !1;
					f = i
				}
				b.style.cursor = "move"
			},
			n = function() {
				a.custEvent.add(d.actObj, "dragStart", o);
				a.custEvent.add(d.actObj, "dragEnd", p);
				a.custEvent.add(d.actObj, "draging", q)
			},
			o = function(c, e) {
				document.body.style.cursor = "move";
				var f = a.core.util.pageSize().page;
				g = a.core.dom.position(d.moveDom);
				g.pageX = e.pageX;
				g.pageY = e.pageY;
				g.height = d.moveDom.offsetHeight;
				g.width = d.moveDom.offsetWidth;
				g.pageHeight = f.height;
				g.pageWidth = f.width;
				if (d.dragtype === "perch") {
					var h = [];
					h.push(d.perchStyle);
					h.push("position:absolute");
					h.push("z-index:" + (d.moveDom.style.zIndex + 10));
					h.push("width:" + d.moveDom.offsetWidth + "px");
					h.push("height:" + d.moveDom.offsetHeight + "px");
					h.push("left:" + g.l + "px");
					h.push("top:" + g.t + "px");
					i.style.cssText = h.join(";");
					k = !0;
					setTimeout(function() {
						if (k) {
							document.body.appendChild(i);
							j = !0
						}
					}, 100)
				}
				b.setCapture !== undefined && b.setCapture()
			},
			p = function(a, c) {
				document.body.style.cursor = "auto";
				b.setCapture !== undefined && b.releaseCapture();
				if (d.dragtype === "perch") {
					k = !1;
					d.moveDom.style.top = i.style.top;
					d.moveDom.style.left = i.style.left;
					if (j) {
						document.body.removeChild(i);
						j = !1
					}
				}
			},
			q = function(a, b) {
				var c = g.t + (b.pageY - g.pageY),
					e = g.l + (b.pageX - g.pageX),
					h = c + g.height,
					i = e + g.width,
					j = g.pageHeight - d.pagePadding,
					k = g.pageWidth - d.pagePadding;
				if (h < j && c > 0) f.style.top = c + "px";
				else {
					var l;
					h >= j && (l = j - g.height);
					if (c < 0 || l < 0) l = 0;
					f.style.top = l + "px"
				}
				if (i < k && e > 0) f.style.left = e + "px";
				else {
					e < 0 && (f.style.left = "0px");
					i >= k && (f.style.left = k - g.width + "px")
				}
			};
		l();
		e.destroy = function() {
			document.body.style.cursor = "auto";
			typeof f.setCapture == "function" && f.releaseCapture();
			if (d.dragtype === "perch") {
				k = !1;
				if (j) {
					document.body.removeChild(i);
					j = !1
				}
			}
			a.custEvent.remove(d.actObj, "dragStart", o);
			a.custEvent.remove(d.actObj, "dragEnd", p);
			a.custEvent.remove(d.actObj, "draging", q);
			h.destroy && h.destroy();
			d = null;
			f = null;
			g = null;
			h = null;
			i = null;
			j = null;
			k = null
		};
		e.getActObj = function() {
			return d.actObj
		};
		return e
	}
});
STK.register("kit.io.ajax", function(a) {
	var b = function(b, c, d) {
			c = c | 0 || 1;
			d = d || "fail";
			var e = b.args;
			e.__rnd && delete e.__rnd;
			(new Image).src = "http://weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
		};
	return function(c) {
		var d = {},
			e = [],
			f = null,
			g = !1,
			h = a.parseParam({
				url: "",
				method: "get",
				responseType: "json",
				timeout: 3e4,
				onTraning: a.funcEmpty,
				isEncode: !0
			}, c);
		h.onComplete = function(a) {
			g = !1;
			c.onComplete(a, h.args);
			setTimeout(i, 0)
		};
		h.onFail = function(a) {
			g = !1;
			if (typeof c.onFail == "function") try {
				c.onFail(a, h.args)
			} catch (d) {}
			setTimeout(i, 0);
			try {
				b(h)
			} catch (d) {}
		};
		h.onTimeout = function(a) {
			try {
				b(h);
				c.onTimeout(a)
			} catch (d) {}
		};
		var i = function() {
				if ( !! e.length) {
					if (g === !0) return;
					g = !0;
					h.args = e.shift();
					if (h.method.toLowerCase() == "post") {
						var b = a.core.util.URL(h.url);
						b.setParam("__rnd", +(new Date));
						h.url = b.toString()
					}
					f = a.ajax(h)
				}
			},
			j = function(a) {
				while (e.length) e.shift();
				g = !1;
				if (f) try {
					f.abort()
				} catch (b) {}
				f = null
			};
		d.request = function(a) {
			a || (a = {});
			c.noQueue && j();
			if (!c.uniqueRequest || !f) {
				e.push(a);
				a._t = 0;
				i()
			}
		};
		d.abort = j;
		return d
	}
});
STK.register("kit.io.jsonp", function(a) {
	return function(b) {
		var c = a.parseParam({
			url: "",
			method: "get",
			responseType: "json",
			varkey: "_v",
			timeout: 3e4,
			onComplete: a.funcEmpty,
			onTraning: a.funcEmpty,
			onFail: a.funcEmpty,
			isEncode: !0
		}, b),
			d = [],
			e = {},
			f = !1,
			g = function() {
				if ( !! d.length) {
					if (f === !0) return;
					f = !0;
					e.args = d.shift();
					e.onComplete = function(a) {
						f = !1;
						c.onComplete(a, e.args);
						setTimeout(g, 0)
					};
					e.onFail = function(a) {
						f = !1;
						c.onFail(a);
						setTimeout(g, 0)
					};
					a.jsonp(a.core.json.merge(c, {
						args: e.args,
						onComplete: function(a) {
							e.onComplete(a)
						},
						onFail: function(a) {
							try {
								e.onFail(a)
							} catch (b) {}
						}
					}))
				}
			},
			h = {};
		h.request = function(a) {
			a || (a = {});
			d.push(a);
			a._t = 1;
			g()
		};
		h.abort = function(a) {
			while (d.length) d.shift();
			f = !1;
			e = null
		};
		return h
	}
});
STK.register("kit.io.ijax", function(a) {
	return function(b) {
		var c = a.parseParam({
			url: "",
			timeout: 3e4,
			isEncode: !0,
			abaurl: null,
			responseName: null,
			varkey: "callback",
			abakey: "callback"
		}, b),
			d = [],
			e = null,
			f = !1;
		c.onComplete = function(a, d) {
			f = !1;
			b.onComplete(a, c.form, d);
			c.form = null;
			c.args = null;
			setTimeout(g, 0)
		};
		c.onFail = function(a, d) {
			f = !1;
			b.onFail(a, c.form, d);
			c.form = null;
			c.args = null;
			setTimeout(g, 0)
		};
		var g = function() {
				var b;
				if ( !! d.length) {
					if (f === !0) return;
					f = !0;
					b = d.shift();
					c.args = b.args;
					c.form = b.form;
					e = a.ijax(c)
				}
			},
			h = function(a) {
				while (d.length) d.shift();
				f = !1;
				if (e) try {
					e.abort()
				} catch (b) {}
				e = null
			},
			i = {};
		i.request = function(c, e) {
			if (!a.isNode(c)) throw "[kit.io.ijax.request] need a form as first parameter";
			e || (e = {});
			b.noQueue && h();
			d.push({
				form: c,
				args: e
			});
			g()
		};
		i.abort = h;
		return i
	}
});
STK.register("kit.io.inter", function(a) {
	var b = a.core.json.merge;
	return function() {
		var c = {},
			d = {},
			e = {},
			f = function(a, b) {
				return function(c, d) {
					try {
						b.onComplete(c, d)
					} catch (f) {}
					try {
						if (c.code === "100000") b.onSuccess(c, d);
						else {
							if (c.code === "100002") {
								location.href = c.data;
								return
							}
							b.onError(c, d)
						}
					} catch (f) {}
					for (var g in e[a]) try {
						e[a][g](c, d)
					} catch (f) {}
				}
			};
		c.register = function(a, b) {
			if (typeof d[a] != "undefined") throw a + " registered";
			d[a] = b;
			e[a] = {}
		};
		c.addHook = function(b, c) {
			var d = a.core.util.getUniqueKey();
			e[b][d] = c;
			return d
		};
		c.rmHook = function(a, b) {
			e[a] && e[a][b] && delete e[a][b]
		};
		c.getTrans = function(c, e) {
			var g = b(d[c], e);
			g.onComplete = f(c, e);
			var h = d[c].requestMode,
				i = "ajax";
			if (h === "jsonp" || h === "ijax") i = h;
			return a.kit.io[i](g)
		};
		c.request = function(c, e, g) {
			var h = b(d[c], e);
			h.onComplete = f(c, e);
			h = a.core.obj.cut(h, ["noqueue"]);
			h.args = g;
			var i = d[c].requestMode;
			return i === "jsonp" ? a.jsonp(h) : i === "ijax" ? a.ijax(h) : a.ajax(h)
		};
		return c
	}
});
STK.register("common.trans.custTmpl", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("save", {
		url: "/aj/skin/update?_wv=5",
		method: "post"
	});
	c("checkpriv", {
		url: "/aj/skin/checkpriv?_wv=5",
		method: "get"
	});
	c("updatesys", {
		url: "/aj/skin/updatesys?_wv=5",
		method: "post"
	});
	c("updatecustom", {
		url: "/aj/skin/updatecustom?_wv=5",
		method: "post"
	});
	c("getrecomm", {
		url: "/aj/skin/getrecomm?_wv=5",
		method: "get"
	});
	c("getcustom", {
		url: "/aj/skin/getcustom?_wv=5",
		method: "get"
	});
	c("getskinlist", {
		url: "/aj/skin/getskinlist?_wv=5",
		method: "get"
	});
	c("colorScheme", {
		url: "/aj/custTmpl/colorScheme?_wv=5",
		method: "post"
	});
	c("getCss", {
		url: "/aj/custTmpl/getCss?_wv=5",
		method: "get"
	});
	c("getcolor", {
		url: "/aj/skin/getcolor?_wv=5",
		method: "get"
	});
	return b
});
STK.register("common.trans.cover", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("getcoversystem", {
		url: "/aj/skin/getcoversystem?_wv=5",
		method: "get"
	});
	c("getcovercustom", {
		url: "/aj/skin/getcovercustom?_wv=5",
		method: "get"
	});
	c("setcoversystem", {
		url: "/aj/skin/setcoversystem?_wv=5",
		method: "post"
	});
	c("setcovercustom", {
		url: "/aj/skin/setcovercustom?_wv=5",
		method: "post"
	});
	return b
});
STK.register("kit.extra.crc32", function(a) {
	return function(a, b) {
		function c(a) {
			a = a.replace(/\r\n/g, "\n");
			var b = "";
			for (var c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				if (d < 128) b += String.fromCharCode(d);
				else if (d > 127 && d < 2048) {
					b += String.fromCharCode(d >> 6 | 192);
					b += String.fromCharCode(d & 63 | 128)
				} else {
					b += String.fromCharCode(d >> 12 | 224);
					b += String.fromCharCode(d >> 6 & 63 | 128);
					b += String.fromCharCode(d & 63 | 128)
				}
			}
			return b
		}
		a = c(a);
		var d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D",
			b;
		typeof b == "undefined" && (b = 0);
		var e = 0,
			f = 0;
		b = b ^ -1;
		for (var g = 0, h = a.length; g < h; g++) {
			f = (b ^ a.charCodeAt(g)) & 255;
			e = "0x" + d.substr(f * 9, 8);
			b = b >>> 8 ^ e
		}
		var i = b ^ -1;
		i < 0 && (i = 4294967296 + i);
		return i
	}
});
STK.register("common.extra.imageURL", function(a) {
	return function(b, c) {
		function f(a) {
			a = (a + "").replace(/[^a-f0-9]/gi, "");
			return parseInt(a, 16)
		}
		var d = {
			size: "small"
		};
		if (typeof b == "string") {
			d = a.core.obj.parseParam(d, c);
			var e = d.size,
				g = {
					ss: {
						middle: "&690",
						bmiddle: "&690",
						small: "&690",
						thumbnail: "&690",
						square: "&690",
						orignal: "&690",
						thumb180: "&690"
					},
					ww: {
						middle: "bmiddle",
						large: "large",
						bmiddle: "bmiddle",
						small: "small",
						thumbnail: "thumbnail",
						square: "square",
						orignal: "large",
						thumb180: "thumb180",
						mw690: "mw690",
						mw1024: "mw1024"
					}
				},
				h = b.charAt(9) == "w",
				i = b.charAt(21) == "g" ? ".gif" : ".jpg",
				j = h ? a.kit.extra.crc32(b) % 4 + 1 : f(b.substr(19, 2)) % 16 + 1,
				k = "http://" + (h ? "ww" : "ss") + j + ".sinaimg.cn/" + (h ? g.ww[e] : e) + "/" + b + (h ? i : "") + (h ? "" : g.ss[e]);
			return k
		}
	}
});
STK.register("ui.mod.uploadPic", function(a) {
	return function(b, c) {
		var d = {},
			e, f = a.core.evt.addEvent,
			g = "weibo.com/",
			h = "picupload.service.weibo.com",
			i = c,
			j = {
				complete: function(b, c) {
					a.log("complete", b, i);
					if (!b || b.ret < 0) i.err ? i.err(b) : i.complete(b);
					else {
						var d = j.parseInfo(b);
						a.log("result", d, b, i);
						i.complete(d)
					}
				},
				parseInfo: function(b) {
					var c = a.common.extra.imageURL(b.pid),
						d = [],
						e, f;
					return {
						url: c,
						pid: b.pid
					}
				}
			},
			k = {
				upload: function(b, d) {
					var e = d.value;
					if (a.core.str.trim(e) !== "") {
						c.start && c.start.call();
						a.core.io.ijax({
							url: "http://" + h + "/interface/pic_upload.php",
							form: b,
							abaurl: "http://" + document.domain + "/aj/static/upimgback.html?_wv=5",
							abakey: "cb",
							onComplete: j.complete,
							onTimeout: c.timeout,
							args: {
								marks: 1,
								app: "miniblog",
								s: "rdxt"
							}
						})
					}
				}
			},
			l = {},
			m = {},
			n = function() {
				o();
				p();
				r();
				t();
				u()
			},
			o = function() {
				if (!b) throw "node is not defined"
			},
			p = function() {
				e = a.kit.dom.parseDOM(a.core.dom.builder(b).list);
				if (!e.fileBtn) throw "[common.content.uploadPic]: nodes.fileBtn is not defined.";
				if (!e.form) throw "[common.content.uploadPic]: nodes.form is not defined."
			},
			q = function() {},
			r = function() {
				f(e.fileBtn, "change", function() {
					k.upload(e.form, e.fileBtn)
				})
			},
			s = function() {},
			t = function() {},
			u = function() {},
			v = function() {},
			w = {};
		d.doUpload = k.upload;
		d.destroy = v;
		n();
		return d
	}
});
STK.register("common.listener", function(a) {
	var b = {},
		c = {};
	c.define = function(c, d) {
		if (b[c] != null) throw "common.listener.define: 频道已被占用";
		b[c] = d;
		var e = {};
		e.register = function(d, e) {
			if (b[c] == null) throw "common.listener.define: 频道未定义";
			a.listener.register(c, d, e)
		};
		e.fire = function(d, e) {
			if (b[c] == null) throw "commonlistener.define: 频道未定义";
			a.listener.fire(c, d, e)
		};
		e.remove = function(b, d) {
			a.listener.remove(c, b, d)
		};
		e.cache = function(b) {
			return a.listener.cache(c, b)
		};
		return e
	};
	return c
});
STK.register("common.channel.colorPick", function(a) {
	return a.common.listener.define("common.channel.colorPick", ["setting"])
});
STK.register("common.skin.colorPickerCallBack", function(a) {
	return function(b, c) {
		var d = {};
		a.common.channel.colorPick.fire("setting", [b, c]);
		return d
	}
});
STK.register("common.skin.colorBox", function(a) {
	var b, c;
	return function(d, e) {
		var f = {};
		this.self = this;
		var g = e,
			h = !1,
			i, j, k = d,
			l = function() {
				b = a.C("div");
				b.id = "picker_container";
				c = a.C("div");
				b.appendChild(c);
				c.id = "color_picker";
				b.style.position = "absolute";
				b.style.display = "none";
				b.style.zIndex = "10002";
				b.style.backgroundColor = "#fff";
				document.body.appendChild(b);
				m()
			},
			m = function(c, d) {
				b.innerHTML = "";
				var e = {
					quality: "high",
					allowScriptAccess: "always",
					wmode: "Opaque",
					allowFullscreen: !0
				},
					f = {
						callback: g,
						color: c ? c : "#ffffff",
						who: d ? d : ""
					};
				j = a.core.util.swf.create(b, $CONFIG.jsPath + "home/static/swf/ColorPicker.swf", {
					width: 251,
					height: 264,
					paras: e,
					flashvars: f
				})
			},
			n = function(a, c, d, e) {
				m(c, e);
				b.style.left = a[0] + "px";
				b.style.top = a[1] - 264 + "px";
				b.style.display = "";
				h = !0
			},
			o = function(a, b, c, d) {
				i = d;
				setTimeout(function() {
					h || n(a, b, g, c)
				}, 10)
			},
			p = function() {
				b.style.display = "none";
				h = !1
			},
			q = function(a) {
				k = a
			},
			r = {
				settingCustColor: function(b, c) {
					a.log("setting:", b, c);
					p()
				}
			},
			s = {
				bodyClick: function(c) {
					if ( !! h) {
						c = a.fixEvent(c);
						if (!a.contains(b, c.target) && c.target != i) {
							a.log("hide");
							p()
						}
					}
				}
			},
			t = function() {
				a.common.channel.colorPick.register("setting", r.settingCustColor)
			},
			u = function() {
				a.addEvent(document, "click", s.bodyClick)
			},
			v = function() {
				l();
				u();
				t()
			};
		v();
		var w = function() {
				a.removeEvent(document, "click", s.bodyClick)
			};
		f.show = o;
		f.hide = p;
		f.setControlArea = q;
		f.destroy = w;
		return f
	}
});
STK.register("common.skin.provColorPicker", function(a) {
	var b = a.kit.extra.language,
		c = b('<div style="display:none;z-index:10001;" class="W_layer choose_side_bg"><div node-type="color_list" class="color_list">   <a node-type="setColor" action-type="setColor" action-data="color=#333333&hex=333333" href="#"><span style="background:#333333"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#dcdcdc&hex=dcdcdc" href="#"><span style="background:#dcdcdc"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#f9ebeb&hex=f9ebeb" href="#"><span style="background:#f9ebeb"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#ebd3e2&hex=ebd3e2" href="#"><span style="background:#ebd3e2"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#dde8f1&hex=dde8f1" href="#"><span style="background:#dde8f1"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#525e4c&hex=525e4c" href="#"><span style="background:#525e4c"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#2b303e&hex=2b303e" href="#"><span style="background:#2b303e"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#2f1e15&hex=2f1e15" href="#"><span style="background:#2f1e15"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#f4f3db&hex=f4f3db" href="#"><span style="background:#f4f3db"></span></a>   <a node-type="setColor" action-type="setColor" action-data="color=#d1ded1&hex=d1ded1" href="#"><span style="background:#d1ded1"></span></a></div><p class="btn"><a action-type="okBtn" class="W_btn_b" href="#"><span>#L{确定}</span></a></p></div>');
	return function(b) {
		var d = {},
			e, f, g, h = !1,
			i, j = !1,
			k = 0;
		a.custEvent.define(d, ["selected"]);
		var l = function() {
				var b = a.core.util.easyTemplate(c).toString();
				e = a.core.dom.insertHTML(document.body, b);
				g = a.kit.dom.parseDOM(a.builder(e).list);
				k = a.core.dom.getSize(e).height;
				f = a.core.evt.delegatedEvent(e)
			},
			m = {
				setColorClick: function(b) {
					var c = b.el;
					a.foreach(g.setColor, function(b, c) {
						a.core.dom.removeClassName(b, "current")
					});
					a.core.dom.addClassName(c, "current");
					i = [b.data.color, b.data.hex];
					a.preventDefault();
					return !1
				},
				okClick: function() {
					if ( !! i) {
						a.custEvent.fire(d, "selected", i);
						p();
						a.preventDefault();
						return !1
					}
				},
				bodyClick: function(c) {
					if ( !! j) {
						c = a.fixEvent(c);
						if (!a.contains(e, c.target) && !a.contains(b.target, c.target)) {
							a.log("provColorPicker hide");
							p()
						}
					}
				}
			},
			n = function(b) {
				a.log("show");
				setTimeout(function() {
					if (!j) {
						e.style.left = b[0] + "px";
						e.style.top = b[1] - k + "px";
						e.style.display = "";
						j = !0
					}
				}, 10)
			},
			o = function() {
				a.log("getDisp");
				return e.style.display != "none"
			},
			p = function() {
				e.style.display = "none";
				j = !1
			},
			q = function() {
				f.add("setColor", "click", m.setColorClick);
				f.add("okBtn", "click", m.okClick);
				a.addEvent(document, "click", m.bodyClick)
			},
			r = function() {
				l();
				q();
				h = !0
			},
			s = function() {
				f.remove("setColor", "click");
				f.remove("okBtn", "click");
				a.removeEvent(document, "click", m.bodyClick)
			};
		r();
		d.show = n;
		d.hide = p;
		d.getDisplayStatus = o;
		d.destroy = s;
		return d
	}
});
STK.register("kit.dom.parentAttr", function(a) {
	return function(a, b, c) {
		var d;
		if (a && b) {
			c = c || document.body;
			while (a && a != c && !(d = a.getAttribute(b))) a = a.parentNode
		}
		return d
	}
});
STK.register("kit.extra.merge", function(a) {
	return function(a, b) {
		var c = {};
		for (var d in a) c[d] = a[d];
		for (var d in b) c[d] = b[d];
		return c
	}
});
STK.register("common.getDiss", function(a) {
	return function() {
		var b = {},
			c = 0,
			d = {
				location: $CONFIG.location
			};
		arguments[0] && !a.core.dom.isNode(arguments[0]) && (b = arguments[c++]);
		b = a.kit.extra.merge(b, d);
		if (!arguments[c]) return b;
		b = a.kit.extra.merge(b, a.core.json.queryToJson(a.kit.dom.parentAttr(arguments[c++], "diss-data", arguments[c]) || ""));
		return b
	}
});
STK.register("kit.extra.reuse", function(a) {
	return function(b, c) {
		var d, e, f;
		d = a.parseParam({}, c);
		f = [];
		var g = function() {
				var a = b();
				f.push({
					store: a,
					used: !0
				});
				return a
			},
			h = function(b) {
				a.foreach(f, function(a, c) {
					if (b === a.store) {
						a.used = !0;
						return !1
					}
				})
			},
			i = function(b) {
				a.foreach(f, function(a, c) {
					if (b === a.store) {
						a.used = !1;
						return !1
					}
				})
			},
			j = function() {
				for (var a = 0, b = f.length; a < b; a += 1) if (f[a].used === !1) {
					f[a].used = !0;
					return f[a].store
				}
				return g()
			};
		e = {};
		e.setUsed = h;
		e.setUnused = i;
		e.getOne = j;
		e.getLength = function() {
			return f.length
		};
		return e
	}
});
STK.register("ui.dialog", function(a) {
	var b = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner"></div></div></td></tr></table></div></div>',
		c = a.kit.extra.language,
		d = null,
		e, f = function() {
			var b = a.ui.mod.dialog(c(e.template));
			a.custEvent.add(b, "show", function() {
				a.ui.mask.showUnderNode(b.getOuter())
			});
			a.custEvent.add(b, "hide", function() {
				a.ui.mask.back();
				b.setMiddle()
			});
			a.kit.dom.drag(b.getDom("title"), {
				actObj: b,
				moveDom: b.getOuter()
			});
			b.destroy = function() {
				g(b);
				try {
					b.hide(!0)
				} catch (a) {}
			};
			return b
		},
		g = function(a) {
			a.setTitle("").clearContent();
			d.setUnused(a)
		};
	return function(c) {
		e = a.parseParam({
			template: b,
			isHold: !1
		}, c);
		var h = e.isHold;
		e = a.core.obj.cut(e, ["isHold"]);
		d || (d = a.kit.extra.reuse(f));
		var i = d.getOne();
		h || a.custEvent.add(i, "hide", function() {
			a.custEvent.remove(i, "hide", arguments.callee);
			g(i)
		});
		return i
	}
});
STK.register("kit.extra.textareaUtils", function(a) {
	var b = {},
		c = document.selection;
	b.selectionStart = function(a) {
		if (!c) try {
			return a.selectionStart
		} catch (b) {
			return 0
		}
		var d = c.createRange(),
			e, f, g = 0,
			h = document.body.createTextRange();
		try {
			h.moveToElementText(a)
		} catch (b) {}
		for (g; h.compareEndPoints("StartToStart", d) < 0; g++) h.moveStart("character", 1);
		return g
	};
	b.selectionBefore = function(a) {
		return a.value.slice(0, b.selectionStart(a))
	};
	b.selectText = function(a, b, d) {
		a.focus();
		if (!c) a.setSelectionRange(b, d);
		else {
			var e = a.createTextRange();
			e.collapse(1);
			e.moveStart("character", b);
			e.moveEnd("character", d - b);
			e.select()
		}
	};
	b.insertText = function(a, d, e, f) {
		a.focus();
		f = f || 0;
		if (!c) {
			var g = a.value,
				h = e - f,
				i = h + d.length;
			a.value = g.slice(0, h) + d + g.slice(e, g.length);
			b.selectText(a, i, i)
		} else {
			var j = c.createRange();
			j.moveStart("character", -f);
			j.text = d
		}
	};
	b.replaceText = function(a, d) {
		a.focus();
		var e = a.value,
			f = b.getSelectedText(a),
			g = f.length;
		if (f.length == 0) b.insertText(a, d, b.getCursorPos(a));
		else {
			var h = b.getCursorPos(a);
			if (!c) {
				var j = h + f.length;
				a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
				b.setCursor(a, h + d.length);
				return
			}
			var i = c.createRange();
			i.text = d;
			b.setCursor(a, h + d.length)
		}
	};
	b.getCursorPos = function(a) {
		var b = 0;
		if (STK.core.util.browser.IE) {
			a.focus();
			var d = null;
			d = c.createRange();
			var e = d.duplicate();
			e.moveToElementText(a);
			e.setEndPoint("EndToEnd", d);
			a.selectionStartIE = e.text.length - d.text.length;
			a.selectionEndIE = a.selectionStartIE + d.text.length;
			b = a.selectionStartIE
		} else if (a.selectionStart || a.selectionStart == "0") b = a.selectionStart;
		return b
	};
	b.getSelectedText = function(a) {
		var b = "",
			d = function(a) {
				return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
			};
		window.getSelection ? b = d(a) : b = c.createRange().text;
		return b
	};
	b.setCursor = function(a, b, c) {
		b = b == null ? a.value.length : b;
		c = c == null ? 0 : c;
		a.focus();
		if (a.createTextRange) {
			var d = a.createTextRange();
			d.move("character", b);
			d.moveEnd("character", c);
			d.select()
		} else a.setSelectionRange(b, b + c)
	};
	b.unCoverInsertText = function(a, b, c) {
		c = c == null ? {} : c;
		c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
		c.rccl = c.rccl == null ? 0 : c.rccl * 1;
		var d = a.value,
			e = d.slice(0, c.rcs),
			f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
		a.value = e + b + f;
		this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
	};
	return b
});
STK.register("kit.extra.count", function(a) {
	function b(b) {
		var c = 41,
			d = 140,
			e = 20,
			f = b,
			g = b.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [],
			h = 0;
		for (var i = 0, j = g.length; i < j; i++) {
			var k = a.core.str.bLength(g[i]);
			if (/^(http:\/\/t.cn)/.test(g[i])) continue;
			/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
			f = f.replace(g[i], "")
		}
		var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
		return l
	}
	return function(a) {
		a = a.replace(/\r\n/g, "\n");
		return b(a)
	}
});
STK.register("ui.mod.editor", function(a) {
	var b = a.core.evt.addEvent,
		c = a.core.evt.custEvent,
		d = a.core.dom.getStyle,
		e = a.core.dom.setStyle;
	return function(b, c) {
		var d = {},
			c = c,
			e = {},
			f = "",
			g = "",
			h = "",
			i = {
				reset: function() {
					e.textEl.value = "";
					a.core.evt.custEvent.fire(d, "changed");
					e.textEl.removeAttribute("extra");
					f = g = h = ""
				},
				delWords: function(a) {
					var b = i.getWords();
					if (!(b.indexOf(a) > -1)) return !1;
					e.textEl.value = "";
					k.textInput(b.replace(a, ""))
				},
				getWords: function() {
					return a.core.str.trim(e.textEl.value)
				},
				getExtra: function() {
					var b, c = e.textEl.getAttribute("extra") || "";
					c != null && (b = a.core.str.trim(c));
					return b
				},
				focus: function(b, c) {
					if (typeof b != "undefined") a.kit.extra.textareaUtils.setCursor(e.textEl, b, c);
					else {
						var d = e.textEl.value.length;
						a.kit.extra.textareaUtils.setCursor(e.textEl, d)
					}
					j.cacheCurPos()
				},
				blur: function() {
					e.textEl.blur()
				},
				addExtraInfo: function(a) {
					typeof a == "string" && e.textEl.setAttribute("extra", a)
				},
				disableEditor: function(b) {
					a.core.evt.removeEvent(e.textEl, "mouseup", j.cacheCurPos);
					if (b === !0) e.textEl.setAttribute("disabled", "disabled");
					else {
						a.core.evt.addEvent(e.textEl, "mouseup", j.cacheCurPos);
						e.textEl.removeAttribute("disabled")
					}
				},
				getCurPos: function() {
					var a = e.textEl.getAttribute("range") || "0&0";
					return a.split("&")
				},
				count: function() {
					var b = a.core.str.trim(e.textEl.value).length == 0 ? a.core.str.trim(e.textEl.value) : e.textEl.value;
					return a.kit.extra.count(b)
				},
				addShortUrlLog: function(b) {
					b = b && a.trim(b);
					if (b) {
						var c = new RegExp("^" + b + "$|" + "_" + b + "$|^" + b + "_|" + "_" + b + "_");
						c.test(f) || (f ? f = f + "_" + b : f = b)
					}
				},
				getShortUrlLog: function() {
					return f
				},
				setCurrentLogType: function(a) {
					g = a
				},
				getCurrentLogType: function() {
					return g
				},
				setImageLogType: function(a) {
					h = a
				},
				getImageLogType: function() {
					return h
				}
			},
			j = {
				textElFocus: function() {
					e.recommendTopic && a.core.dom.setStyle(e.recommendTopic, "display", "none");
					a.custEvent.fire(d, "focus");
					e.num && a.core.dom.setStyle(e.num, "display", "block");
					i.getWords() == c.tipText && i.delWords(c.tipText)
				},
				textElBlur: function() {
					setTimeout(function() {
						if (e.textEl.value.length === 0) {
							e.recommendTopic && a.core.dom.setStyle(e.recommendTopic, "display", "block");
							e.num && e.recommendTopic && a.core.dom.setStyle(e.num, "display", "none");
							a.custEvent.fire(d, "blur");
							typeof c.tipText != "undefined" && (e.textEl.value = c.tipText)
						}
					}, 50)
				},
				cacheCurPos: function() {
					var b = a.kit.extra.textareaUtils.getSelectedText(e.textEl),
						c = b == "" || b == null ? 0 : b.length,
						d = a.core.dom.textSelectArea(e.textEl).start,
						f = d + "&" + c;
					e.textEl.setAttribute("range", f)
				}
			},
			k = {
				textChanged: function() {
					a.custEvent.fire(d, "keyUpCount")
				},
				textInput: function(b, f) {
					var g = i.getCurPos(),
						f = g[0],
						h = g[1];
					i.getWords() == c.tipText && b != c.tipText && i.delWords(c.tipText);
					a.kit.extra.textareaUtils.unCoverInsertText(e.textEl, b, {
						rcs: g[0],
						rccl: g[1]
					});
					j.cacheCurPos();
					a.core.evt.custEvent.fire(d, "changed")
				}
			},
			l = {},
			m = function() {
				p();
				q()
			},
			n = function() {
				r();
				t();
				u();
				o()
			},
			o = function() {
				c.storeWords ? e.textEl.value.length == 0 && k.textInput(c.storeWords) : c.tipText && (e.textEl.value = c.tipText)
			},
			p = function() {
				if (!b) throw "node is not defined in module editor"
			},
			q = function() {
				var c = a.core.dom.builder(b).list;
				e = a.kit.dom.parseDOM(c);
				if (!e.widget) throw "can not find nodes.widget in module editor"
			},
			r = function() {
				a.core.evt.addEvent(e.textEl, "focus", j.textElFocus);
				a.core.evt.addEvent(e.textEl, "blur", j.textElBlur);
				a.core.evt.addEvent(e.textEl, "mouseup", j.cacheCurPos);
				a.core.evt.addEvent(e.textEl, "keyup", j.cacheCurPos)
			},
			s = function() {
				a.core.evt.custEvent.define(d, "changed")
			},
			t = function() {
				s();
				a.core.evt.custEvent.add(d, "changed", k.textChanged)
			},
			u = function() {},
			v = function() {};
		m();
		var w = {
			reset: i.reset,
			getWords: i.getWords,
			getExtra: i.getExtra,
			delWords: i.delWords,
			focus: i.focus,
			blur: i.blur,
			insertText: k.textInput,
			check: k.textChanged,
			addExtraInfo: i.addExtraInfo,
			disableEditor: i.disableEditor,
			getCurPos: i.getCurPos,
			count: i.count,
			textElFocus: j.textElFocus,
			cacheCurPos: j.cacheCurPos,
			addShortUrlLog: i.addShortUrlLog,
			getShortUrlLog: i.getShortUrlLog,
			setCurrentLogType: i.setCurrentLogType,
			getCurrentLogType: i.getCurrentLogType,
			setImageLogType: i.setImageLogType,
			getImageLogType: i.getImageLogType
		};
		d.destroy = v;
		d.API = w;
		d.nodeList = e;
		d.init = n;
		d.opts = c;
		return d
	}
});
STK.register("common.editor.plugin.count", function(a) {
	function e(a, b) {
		if (!a.textEl) throw "[editor plugin count]: plz check nodeList"
	}
	function d(a) {
		var d = c(a),
			e = Math.abs(b - d),
			f;
		d > b || d < 1 ? f = {
			wordsnum: d,
			vnum: e,
			overflow: !0
		} : d == 0 ? f = {
			wordsnum: d,
			vnum: e,
			overflow: !0
		} : f = {
			wordsnum: d,
			vnum: e,
			overflow: !1
		};
		return f
	}
	function c(b) {
		var c = 41,
			d = 140,
			e = 20,
			f = b,
			g = b.match(/(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\,\:;@&=\?~#%]*)*/gi) || [],
			h = 0;
		for (var i = 0, j = g.length; i < j; i++) {
			var k = a.core.str.bLength(g[i]);
			if (/^(http:\/\/t.cn)/.test(g[i])) continue;
			/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
			f = f.replace(g[i], "")
		}
		var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
		return l
	}
	var b;
	return function(c) {
		var f = c.nodeList,
			g, h = c.opts,
			i = a.kit.extra.language;
		b = h.limitNum;
		e(f);
		a.core.evt.custEvent.define(c, "textNum");
		a.custEvent.define(c, "keyUpCount");
		var j = f.textEl,
			k = f.num;
		a.addEvent(j, "focus", function() {
			g = setInterval(function() {
				l()
			}, 200)
		});
		a.addEvent(j, "blur", function() {
			clearInterval(g)
		});
		var l = function() {
				var b = a.core.str.trim(j.value).length == 0 ? a.core.str.trim(j.value) : j.value,
					e = c && c.opts && c.opts.extendText;
				b = b.replace(/\r\n/g, "\n");
				var f = d(b, h.limitNum);
				b.length >= 0 && j.focus ? f.overflow && f.wordsnum != 0 ? k.innerHTML = (e ? i(e) : "") + i("#L{已经超过%s字}", '<span class="S_error">' + f.vnum + "</span>") : k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入%s字}", "<span>" + f.vnum + "</span>") : b.length === 0 && (k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入%s字}", "<span>" + f.vnum + "</span>"));
				a.core.evt.custEvent.fire(c, "textNum", {
					count: f.wordsnum,
					isOver: f.overflow
				})
			};
		STK.core.evt.addEvent(j, "keyup", l);
		a.custEvent.add(c, "keyUpCount", l)
	}
});
STK.register("kit.dom.cssText", function(a) {
	var b = function(a, b) {
			var c = (a + ";" + b).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"),
				d;
			while (c && (d = c.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i))) c = c.replace(d[1] + d[2] + d[3], "");
			return c
		};
	return function(a) {
		a = a || "";
		var c = [],
			d = {
				push: function(a, b) {
					c.push(a + ":" + b);
					return d
				},
				remove: function(a) {
					for (var b = 0; b < c.length; b++) c[b].indexOf(a + ":") == 0 && c.splice(b, 1);
					return d
				},
				getStyleList: function() {
					return c.slice()
				},
				getCss: function() {
					return b(a, c.join(";"))
				}
			};
		return d
	}
});
STK.register("kit.dom.isTurnoff", function(a) {
	return function(a) {
		return !a.parentNode || a.parentNode.nodeType == 11 || !! a.disabled
	}
});
STK.register("ui.mod.at", function(a) {
	var b = window,
		c = document,
		d = a.core.util.browser,
		e = "font-family:Tahoma,宋体;",
		f = a.kit.extra.textareaUtils.selectionStart,
		g, h, i, j, k, l = function() {
			var a = {
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"\\": "&#92;",
				"&": "&amp;",
				"'": "&#039;",
				"\r": "",
				"\n": "<br>",
				" ": (navigator.userAgent.match(/.+(?:ie) ([\d.]+)/i) || [8])[1] < 8 ? ['<pre style="overflow:hidden;display:inline;', e, 'word-wrap:break-word;"> </pre>'].join("") : ['<span style="white-space:pre-wrap;', e, '"> </span>'].join("")
			};
			return function(b) {
				var c = b.replace(/(<|>|\"|\\|&|\'|\n|\r| )/g, function(b) {
					return a[b]
				});
				return c
			}
		}(),
		m = function() {
			var b = [],
				c = g.textEl.style.cssText,
				d;
			a.foreach(["margin", "padding", "border"], function(c) {
				a.foreach(["Top", "Left", "Bottom", "Right"], function(d) {
					var e;
					c != "border" ? e = b.push(c, "-", d.toLowerCase(), ":", a.getStyle(g.textEl, c + d), ";") : a.foreach(["Style", "Width"], function(e) {
						b.push(c, "-", d.toLowerCase(), "-", e.toLowerCase(), ":", a.getStyle(g.textEl, [c, d, e].join("")), ";")
					})
				})
			});
			b.push("font-size:" + a.getStyle(g.textEl, "fontSize") + ";");
			return a.kit.dom.cssText([c, b.join(""), e, "\n\t\t\tword-wrap: break-word;\n\t\t\tline-height: 18px;\n\t\t\toverflow-y:auto;\n\t\t\toverflow-x:hidden;\n\t\t\toutline:none;\n\t\t"].join("")).getCss()
		},
		n = function() {
			var b = a.builder(['<div node-type="wrap" style="display:none;">', '<span node-type="before"></span>', '<span node-type="flag"></span>', '<span node-type="after"></span>', "</div>"].join("")).list,
				e = b.wrap[0],
				f = b.flag[0],
				h = b.after[0],
				i = b.before[0],
				j = 0,
				n, o, p, q = function(a) {
					return d.MOZ ? -2 : d.MOBILE && d.SAFARI && (d.IPAD || d.ITOUCH || d.IPHONE) ? -2 : 0
				};
			return {
				bind: function() {
					if (o !== g.textEl) {
						k = a.position(g.textEl);
						var b = ["left:", k.l, "px;top:", k.t + 20, "px;"].join("");
						o = g.textEl;
						var d = m();
						o.style.cssText = d;
						p = [b, d, "\n\t\t\t\t\tposition:absolute;\n\t\t\t\t\tfilter:alpha(opacity=0);\n\t\t\t\t\topacity:0;\n\t\t\t\t\tz-index:-1000;\n\t\t\t\t"].join("");
						e.style.cssText = p;
						if (!j) {
							j = 1;
							c.body.appendChild(e)
						}
					}
				},
				content: function(b, c, d, j) {
					e.style.cssText = [p, "\n\t\t\t\t\twidth:", (parseInt(a.getStyle(o, "width")) || o.offsetWidth) + q(), "px;\n\t\t\t\t\theight:", parseInt(a.getStyle(o, "height")) || o.offsetHeight, "px;\n\t\t\t\t\toverflow-x:hidden;\n\t\t\t\t\toverflow-y:", /webkit/i.test(navigator.userAgent) ? "hidden" : a.getStyle(o, "overflowY"), ";\n\t\t\t\t"].join("");
					i.innerHTML = l(b);
					f.innerHTML = l(c) || "&thinsp;";
					h.innerHTML = l([d, j].join(""));
					clearTimeout(n);
					n = setTimeout(function() {
						var b = a.position(f);
						a.custEvent.fire(g.eId, "at", {
							t: b.t - o.scrollTop - k.t,
							l: b.l - k.l,
							fl: b.l,
							key: d,
							flag: c,
							textarea: g.textEl
						})
					}, 30)
				},
				hide: function() {
					e.style.display = "none"
				},
				show: function() {
					e.style.display = ""
				}
			}
		}(),
		o = function() {
			if (a.kit.dom.isTurnoff(g.textEl)) clearInterval(h);
			else {
				var b = g.textEl.value.replace(/\r/g, ""),
					c = f(g.textEl);
				if (c < 0 || c == j) return;
				j = c;
				var d = b.slice(0, c),
					e = d.match(new RegExp(["(", g.flag, ")([a-zA-Z0-9一-龥_-]{0,20})$"].join("")));
				if (!e) {
					a.custEvent.fire(g.eId, "hidden");
					return
				}
				var i = b.slice(c);
				d = d.slice(0, -e[0].length);
				n.content(d, e[1], e[2], i)
			}
		};
	return function(b) {
		if ( !! b && !! b.textEl) {
			b = a.parseParam({
				textEl: null,
				flag: "@",
				eId: a.custEvent.define({}, ["at", "hidden"])
			}, b);
			var c = function() {
					if ( !! g) {
						clearInterval(h);
						a.removeEvent(g.textEl, "blur", c);
						n.hide()
					}
				},
				d = function() {
					c();
					g = b;
					j = null;
					n.bind();
					n.show();
					h = setInterval(o, 200);
					a.addEvent(b.textEl, "blur", c)
				};
			a.addEvent(b.textEl, "focus", d);
			return b.eId
		}
	}
});
STK.register("common.trans.global", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("language", {
		url: "/aj/user/lang?_wv=5",
		method: "post"
	});
	c("followList", {
		url: "/aj/mblog/attention?_wv=5"
	});
	c("topicList", {
		url: "/aj/mblog/topic?_wv=5"
	});
	c("myFollowList", {
		url: "/aj/relation/attention?_wv=5"
	});
	c("closetipsbar", {
		url: "/aj/tipsbar/closetipsbar?_wv=5",
		method: "post"
	});
	c("weiqunnew", {
		url: "/ajm/weiqun?action=aj_remindunread"
	});
	c("quiet_suggest", {
		url: "/aj/f/lenovo?ct=10&_wv=5",
		method: "get"
	});
	return b
});
STK.register("ui.mod.suggest", function(a) {
	var b = null,
		c = a.custEvent,
		d = c.define,
		e = c.fire,
		f = c.add,
		g = a.addEvent,
		h = a.removeEvent,
		i = a.stopEvent,
		j = [],
		k = {},
		l = {
			ENTER: 13,
			ESC: 27,
			UP: 38,
			DOWN: 40,
			TAB: 9
		},
		m = function(b) {
			var c = -1,
				j = [],
				k = b.textNode,
				m = b.uiNode,
				n = a.core.evt.delegatedEvent(m),
				o = d(k, ["open", "close", "indexChange", "onSelect", "onIndexChange", "onClose", "onOpen", "openSetFlag"]);
			o.setFlag = p;
			var p = function(a) {
					b.flag = a
				},
				q = function() {
					return a.sizzle(["[action-type=", b.actionType, "]"].join(""), m)
				},
				r = function() {
					c = -1;
					h(k, "keydown", s);
					n.destroy()
				},
				s = function(d) {
					var f, g;
					if ( !! (f = d) && !! (g = f.keyCode)) {
						if (g == l.ENTER) {
							e(o, "onSelect", [c, k, b.flag]);
							a.preventDefault()
						}
						if (g == l.UP) {
							i();
							var h = q().length;
							c = c < 1 ? h - 1 : c - 1;
							e(o, "onIndexChange", [c]);
							return !1
						}
						if (g == l.DOWN) {
							i();
							var h = q().length;
							c = c == h - 1 ? 0 : c + 1;
							e(o, "onIndexChange", [c]);
							return !1
						}
						if (g == l.ESC) {
							i();
							r();
							e(o, "onClose");
							return !1
						}
						if (g == l.TAB) {
							r();
							e(o, "onClose");
							return !1
						}
					}
				},
				t = function(c) {
					e(o, "onSelect", [a.core.arr.indexOf(c.el, q()), k, b.flag])
				},
				u = function(b) {
					c = a.core.arr.indexOf(b.el, q());
					e(o, "onIndexChange", [a.core.arr.indexOf(b.el, q())])
				};
			f(o, "open", function(a, c) {
				k = c;
				r();
				g(c, "keydown", s);
				n.add(b.actionType, "mouseover", u);
				n.add(b.actionType, "click", t);
				e(o, "onOpen", [b.flag])
			});
			f(o, "openSetFlag", function(a, b) {
				p(b)
			});
			f(o, "close", function() {
				r();
				e(o, "onClose", [b.flag])
			});
			f(o, "indexChange", function(a, d) {
				c = d;
				e(o, "onIndexChange", [c, b.flag])
			});
			return o
		},
		n = function(b) {
			var c = b.textNode,
				d = a.core.arr.indexOf(c, j);
			if (!k[d]) {
				j[d = j.length] = c;
				k[d] = m(b)
			}
			return k[d]
		};
	return function(c) {
		if ( !! c.textNode && !! c.uiNode) {
			c = a.parseParam({
				textNode: b,
				uiNode: b,
				actionType: "item",
				actionData: "index",
				flag: ""
			}, c);
			return n(c)
		}
	}
});
STK.register("common.channel.at", function(a) {
	var b = ["open", "close"];
	return a.common.listener.define("common.channel.at", b)
});
STK.register("kit.dom.layoutPos", function(a) {
	return function(b, c, d) {
		if (!a.isNode(c)) throw "kit.dom.layerOutElement need element as first parameter";
		if (c === document.body) return !1;
		if (!c.parentNode) return !1;
		if (c.style.display === "none") return !1;
		var e, f, g, h, i, j, k;
		e = a.parseParam({
			pos: "left-bottom",
			offsetX: 0,
			offsetY: 0
		}, d);
		f = c;
		if (!f) return !1;
		while (f !== document.body) {
			f = f.parentNode;
			if (f.style.display === "none") return !1;
			j = a.getStyle(f, "position");
			k = f.getAttribute("layout-shell");
			if (j === "absolute" || j === "fixed") break;
			if (k === "true" && j === "relative") break
		}
		f.appendChild(b);
		g = a.position(c, {
			parent: f
		});
		h = {
			w: c.offsetWidth,
			h: c.offsetHeight
		};
		i = e.pos.split("-");
		i[0] === "left" ? b.style.left = g.l + e.offsetX + "px" : i[0] === "right" ? b.style.left = g.l + h.w + e.offsetX + "px" : i[0] === "center" && (b.style.left = g.l + h.w / 2 + e.offsetX + "px");
		i[1] === "top" ? b.style.top = g.t + e.offsetY + "px" : i[1] === "bottom" ? b.style.top = g.t + h.h + e.offsetY + "px" : i[1] === "middle" && (b.style.top = g.t + h.h / 2 + e.offsetY + "px");
		return !0
	}
});
STK.register("common.editor.plugin.at", function(a) {
	var b = a.kit.extra.language,
		c = '<div style="" class="layer_menu_list"><ul node-type="suggestWrap"></ul></div>',
		d = {
			"@": {
				normalTitle: b("#L{选择昵称或轻敲空格完成输入}"),
				moreTitle: b("#L{选择最近@的人或直接输入}"),
				noTilte: b("#L{轻敲空格完成输入}")
			},
			"#": {
				normalTitle: b("#L{想用什么话题？}")
			}
		},
		e = {
			"@": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.screen_name}" value="${list.screen_name}"><a href="#">${list.screen_name}<#if (list.remark)>(${list.remark})</#if></a></li><#if (list.count)><span>${list.count}</span></#if></#list></#et>',
			"#": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.topic}" value="${list.topic}"><a href="#">${list.topic}<#if (list.count)>(${list.count})</#if></a></li></#list></#et>'
		},
		f, g, h, i, j, k, l = !1,
		m, n, o = {
			"@": "followList",
			"#": "topicList"
		},
		p = 0,
		q = function() {
			setTimeout(function() {
				a.custEvent.fire(f, "close")
			}, 200)
		},
		r = function() {
			j.style.display = "none"
		},
		s = function() {
			a.custEvent.add(f, "onIndexChange", function(a, b) {
				x(b)
			});
			a.custEvent.add(f, "onSelect", function(b, c, d, e) {
				p = 0;
				a.core.evt.stopEvent();
				var g = n[c].getAttribute("value") + "";
				g = g.replace(/\(.*\)/, "");
				try {
					d.focus()
				} catch (h) {}
				var i = a.kit.extra.textareaUtils.selectionStart(d) * 1,
					j = new RegExp(e + "([a-zA-Z0-9一-龥_-]{0,20})$"),
					k = d.value.replace(/\r+/g, "").slice(0, i).match(j),
					l = d.value.slice(i, i + 1);
				k = k && k[1] ? k[1].length : 0;
				var m = a.kit.extra.textareaUtils;
				e == "#" ? typeof l != "undefined" && l != e && (g = g + e + " ") : g = g + " ";
				m.insertText(d, g, i, k);
				var o = m.getCursorPos(d);
				if (e == "#" && l == e) {
					m.setCursor(d, o + 1);
					m.insertText(d, " ", o + 1, 0)
				}
				o = m.getCursorPos(d);
				var q = m.getSelectedText(d),
					r = q == "" || q == null ? 0 : q.length;
				d.setAttribute("range", o + "&" + r);
				a.custEvent.fire(f, "close")
			});
			a.addEvent(h.textEl, "blur", q);
			a.custEvent.add(f, "onClose", r);
			a.custEvent.add(f, "onOpen", function(b, c) {
				i.style.display = "";
				j.style.display = "";
				l = !0;
				setTimeout(function() {
					a.custEvent.fire(f, "indexChange", 0)
				}, 100)
			})
		},
		t = function(b, c, f) {
			b == "@" ? c.data && c.data.length > 0 ? c.title = f == "" ? d[b].moreTitle : d[b].normalTitle : c.title = d[b].noTilte : c.title = d[b].normalTitle;
			var g = a.core.util.easyTemplate(e[b], c);
			return g
		},
		u = function() {
			a.core.evt.custEvent.add(g, "hidden", function(b, c) {
				a.custEvent.fire(f, "close")
			});
			a.core.evt.custEvent.add(g, "at", function(b, c) {
				k = c.key;
				var d = c.flag;
				if (k.length == 0 && d != "@") a.custEvent.fire(f, "close");
				else var e = a.common.trans.global.getTrans(o[d], {
					onSuccess: function(b, e) {
						var g = t(d, b, k);
						a.custEvent.fire(f, "openSetFlag", d);
						a.custEvent.fire(f, "open", c.textarea);
						var h = a.core.dom.builder(g),
							l = h.box;
						i.innerHTML = l;
						j.style.cssText = ["z-index:11001;background-color:#ffffff;position:absolute;"].join("");
						a.common.channel.at.fire("open");
						var m = c.l;
						document.body.clientWidth < c.fl + a.core.dom.getSize(j).width && c.fl > a.core.dom.getSize(j).width && (m = c.l - a.core.dom.getSize(j).width);
						a.kit.dom.layoutPos(j, c.textarea, {
							pos: "left-top",
							offsetX: m,
							offsetY: c.t
						})
					},
					onError: function() {
						a.custEvent.fire(f, "close")
					}
				}).request({
					q: k
				})
			})
		},
		v = function() {
			m = h.textEl;
			g = a.ui.mod.at({
				textEl: m,
				flag: "@|#"
			})
		},
		w = function(b) {
			p = 0;
			j && (j.style.display = "none");
			j && (j.innerHTML = "");
			j = STK.C("div");
			document.body.appendChild(j);
			if (j.innerHTML.length == 0) {
				j.innerHTML = c;
				i = a.core.dom.sizzle('[node-type="suggestWrap"]', j)[0];
				j.style.display = "none"
			}
			f && a.custEvent.fire(f, "close");
			f && a.custEvent.remove(f);
			f = a.ui.mod.suggest({
				textNode: b,
				uiNode: i,
				actionType: "item",
				actionData: "value",
				flag: "@"
			});
			s()
		},
		x = function(b) {
			n = a.sizzle("li[class!=suggest_title]", i);
			n && n[0] && a.core.dom.removeClassName(n[p], "cur");
			a.core.dom.addClassName(n[b], "cur");
			p = b
		};
	return function(a, b) {
		h = a.nodeList;
		var c = {};
		c.init = function() {
			v();
			w(h.textEl);
			u()
		};
		return c
	}
});
STK.register("common.editor.base", function(a) {
	function c() {}
	var b = {
		limitNum: 140
	};
	return function(c, d) {
		var e = {},
			f, g, h, i;
		f = a.kit.extra.merge(b, d);
		g = a.ui.mod.editor(c, f);
		h = g.nodeList;
		i = [];
		if (typeof d.count == "undefined" || d.count == "enable") var j = a.common.editor.plugin.count(g, f);
		var k = a.common.editor.plugin.at(g, f);
		k.init();
		g.init();
		g.widget = function(a, b, c) {
			i.push(a);
			a.init(g, b, c);
			return g
		};
		g.closeWidget = function() {
			if (i && i.length != 0) for (var a = 0, b = i.length; a < b; a++) i[a].hide()
		};
		return g
	}
});
STK.register("ui.mod.bubble", function(a) {
	return function(b, c) {
		var d, e, f, g, h, i, j;
		e = a.parseParam({
			width: null,
			height: null,
			parent: document.body
		}, c);
		f = a.ui.mod.layer(b);
		g = f.getDom("outer");
		h = f.getDom("inner");
		f.getDomListByKey("close") && (i = f.getDom("close"));
		g.style.display = "none";
		j = !1;
		var k = function(b) {
				if (j) return !0;
				var c = a.fixEvent(b);
				a.contains(g, c.target) || f.hide()
			};
		i && a.addEvent(i, "click", f.hide);
		a.custEvent.add(f, "show", function() {
			setTimeout(function() {
				a.addEvent(document.body, "click", k)
			}, 0)
		});
		a.custEvent.add(f, "hide", function() {
			j = !1;
			a.removeEvent(document.body, "click", k)
		});
		d = f;
		d.setPosition = function(a) {
			g.style.top = a.t + "px";
			g.style.left = a.l + "px";
			return d
		};
		d.setAlignPos = function(b, c, d) {
			d = a.parseParam({
				offset: {
					left: 0,
					top: 0
				},
				arrowOffset: 0,
				align: "left",
				fail: a.funcEmpty
			}, d);
			if ( !! a.isNode(b) && !! a.isNode(c)) {
				var e = b,
					h;
				while (e !== document.body) {
					e = e.parentNode;
					h = a.getStyle(e, "position");
					if (h === "absolute") break
				}
				e.appendChild(g);
				h = a.position(e);
				h || (h = {
					l: 0,
					t: 0
				});
				var i = a.core.dom.getSize,
					j = a.position(c),
					k = a.position(b),
					l = i(b),
					m = 6,
					n = 14,
					o, p, q, r = d.offset,
					s = d.arrowOffset,
					t = i(g),
					u = i(c),
					v = 2;
				if (d.align === "left") {
					if (t.width < k.l - j.l + Math.ceil(l.width / 2)) {
						d.fail();
						return
					}
				} else if (j.l + u.width - k.l - Math.ceil(l.width / 2) > t.width) {
					d.fail();
					return
				}
				d.align === "left" ? o = j.l - v : o = j.l + u.width - t.width + v;
				p = k.t + l.height + m;
				q = k.l + Math.ceil((l.width - n) / 2) - o;
				p -= h.t;
				o -= h.l;
				p += r.top;
				o += r.left;
				q += s;
				g.style.left = o + "px";
				g.style.top = p + "px";
				if (f.getDomListByKey("arrow")) {
					arrow = f.getDom("arrow");
					arrow.style.left = q + "px"
				}
			}
		};
		d.setLayout = function(b, c) {
			if (!a.isNode(b)) throw "ui.mod.bubble.setDown need element as first parameter";
			if (f.getDomListByKey("arrow")) {
				arrow = f.getDom("arrow");
				arrow.style.cssText = ""
			}
			a.kit.dom.layoutPos(g, b, c);
			return d
		};
		d.setContent = function(b) {
			typeof b == "string" ? h.innerHTML = b : a.isNode(b) && h.appendChild(b);
			return d
		};
		d.setArrow = function(a) {
			var b;
			if (f.getDomListByKey("arrow")) {
				b = f.getDom("arrow");
				a.className && (b.className = a.className || "");
				a.style && (b.style.cssText = a.style || "")
			}
		};
		d.clearContent = function() {
			while (h.children.length) a.removeNode(h.children[0])
		};
		d.stopBoxClose = function() {
			j = !0
		};
		d.startBoxClose = function() {
			j = !1
		};
		d.destroy = function() {
			a.removeEvent(document.body, "click", k);
			f = null;
			g = null;
			h = null;
			i = null
		};
		return d
	}
});
STK.register("ui.bubble", function(a) {
	var b = ['<div class="W_layer" node-type="outer">', '<div class="bg">', '<table cellspacing="0" cellpadding="0" border="0">', '<tbody><tr><td><div class="content" node-type="layoutContent">', '<a class="W_close" href="javascript:void(0);" node-type="close" title="关闭"></a>', '<div node-type="inner"></div>', "</div></td></tr></tbody>", "</table>", '<div class="arrow arrow_t" node-type="arrow"></div>', "</div>", "</div>"].join(""),
		c = [];
	return function(d) {
		var e = a.parseParam({
			template: b,
			isHold: !1
		}, d),
			f = {
				get: function() {
					return e.isHold ? a.ui.mod.bubble(e.template, e) : f.checkBob()
				},
				checkBob: function() {
					var a;
					for (var b = 0, d = c.length; b < d; b++) if (!c[b].used) {
						a = c[b].bub;
						continue
					}
					a || (a = f.create());
					return a
				},
				refresh: function(a, b) {
					for (var d = 0, e = c.length; d < e; d++) if (a === c[d].bub) {
						c[d].used = b;
						return
					}
				},
				cevt: function(b) {
					a.custEvent.add(b, "hide", function() {
						f.refresh(b, !1);
						b.clearContent()
					});
					a.custEvent.add(b, "show", function() {
						f.refresh(b, !0)
					})
				},
				create: function() {
					var b = a.ui.mod.bubble(e.template, e);
					c.push({
						bub: b,
						used: !0
					});
					f.cevt(b);
					return b
				}
			};
		return f.get()
	}
});
STK.register("common.trans.editor", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("face", {
		url: "/aj/mblog/face?type=face&_wv=5"
	});
	c("magicFace", {
		url: "/aj/mblog/face?type=ani&_wv=5"
	});
	c("getTopic", {
		url: "/aj/mblog/trend?_wv=5"
	});
	c("cartoon", {
		url: "/aj/mblog/face?type=cartoon&_wv=5"
	});
	c("suggestMusic", {
		url: "/aj/mblog/music/suggest?_wv=5",
		requestMode: "jsonp"
	});
	c("searchMusic", {
		url: "http://music.weibo.com/t/port/ajax_search_music_song.php",
		method: "get",
		requestMode: "jsonp"
	});
	c("addMusic", {
		url: "/aj/mblog/music/submit?_wv=5",
		requestMode: "jsonp"
	});
	c("parseMusic", {
		url: "/aj/mblog/music/parse?_wv=5",
		requestMode: "jsonp"
	});
	c("parseVideo", {
		url: "/aj/mblog/video?_wv=5"
	});
	c("waterMark", {
		url: "/aj/account/watermark?_wv=5"
	});
	c("publishToWeiqun", {
		url: "/aj/weiqun/add?_wv=5",
		method: "post"
	});
	c("rectopic", {
		url: "/aj/mblog/rectopic?_wv=5"
	});
	c("interactive", {
		url: "/aj/mblog/interactive?_wv=5",
		method: "post"
	});
	c("plugin", {
		url: "/aj/publishplug/plug?_wv=5",
		method: "post"
	});
	c("favSongSearch", {
		url: "http://music.weibo.com/yueku/port/sina_t_getcollect.php",
		method: "get",
		requestMode: "jsonp"
	});
	c("getOutlinkInfo", {
		url: "http://api.weibo.com/widget/info.json",
		varkey: "callback",
		method: "get",
		requestMode: "jsonp"
	});
	c("tabLog", {
		url: "http://music.weibo.com/t/port/ajax_log_action.php",
		method: "get",
		requestMode: "jsonp"
	});
	c("getPublish", {
		url: "/aj/top/usergroup?_wv=5",
		method: "get"
	});
	c("getTvLink", {
		url: "/aj/proxy/thirdapi?_wv=5",
		method: "get"
	});
	c("getuserlist", {
		url: "/aj/gift/getuserlist?_wv=5",
		method: "get"
	});
	c("getlist", {
		url: "/aj/gift/getlist?_wv=5",
		method: "post"
	});
	c("sendGift", {
		url: "/aj/gift/send?_wv=5",
		method: "post"
	});
	c("newyear", {
		url: "/aj/publishplug/bainian?_wv=5",
		method: "get"
	});
	return b
});
STK.register("ui.mod.mask", function(a) {
	function k(b) {
		var c;
		(c = b.getAttribute(f)) || b.setAttribute(f, c = a.getUniqueKey());
		return ">" + b.tagName.toLowerCase() + "[" + f + '="' + c + '"]'
	}
	function j() {
		b = a.C("div");
		var c = '<div node-type="outer">';
		a.core.util.browser.IE6 && (c += '<div style="position:absolute;width:100%;height:100%;"></div>');
		c += "</div>";
		b = a.builder(c).list.outer[0];
		document.body.appendChild(b);
		e = !0;
		d = a.kit.dom.fix(b, "lt");
		var f = function() {
				var c = a.core.util.winSize();
				b.style.cssText = a.kit.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + "px").getCss()
			};
		i.add(d, "beforeFix", f);
		f()
	}
	var b, c = [],
		d, e = !1,
		f = "STK-Mask-Key",
		g = a.core.dom.setStyle,
		h = a.core.dom.getStyle,
		i = a.core.evt.custEvent,
		l = {
			getNode: function() {
				return b
			},
			show: function(c, f) {
				if (e) {
					c = a.core.obj.parseParam({
						opacity: .3,
						background: "#000000"
					}, c);
					b.style.background = c.background;
					g(b, "opacity", c.opacity);
					b.style.display = "";
					d.setAlign("lt");
					f && f()
				} else {
					j();
					l.show(c, f)
				}
				return l
			},
			hide: function() {
				b.style.display = "none";
				c = [];
				return l
			},
			showUnderNode: function(d, e) {
				a.isNode(d) && l.show(e, function() {
					g(b, "zIndex", h(d, "zIndex"));
					var e = k(d),
						f = a.core.arr.indexOf(c, e);
					f != -1 && c.splice(f, 1);
					c.push(e);
					a.core.dom.insertElement(d, b, "beforebegin")
				});
				return l
			},
			back: function() {
				if (c.length < 1) return l;
				var d, e;
				c.pop();
				if (c.length < 1) l.hide();
				else if ((e = c[c.length - 1]) && (d = a.sizzle(e, document.body)[0])) {
					g(b, "zIndex", h(d, "zIndex"));
					a.core.dom.insertElement(d, b, "beforebegin")
				} else l.back();
				return l
			},
			resetSize: function() {
				var c = a.core.util.winSize();
				b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + 22 + "px").getCss();
				return l
			},
			destroy: function() {
				i.remove(d);
				b.style.display = "none"
			}
		};
	return l
});
STK.register("kit.extra.destroyFlash", function(a) {
	var b = a.core.util.browser,
		c = function(a) {
			if (a) {
				for (var b in a) typeof a[b] == "function" && (a[b] = null);
				a.parentNode.removeChild(a)
			}
		};
	return function(d) {
		if ( !! a.isNode(d) && d && d.nodeName === "OBJECT") if (a.IE && b.OS === "windows") {
			d.style.display = "none";
			(function() {
				d.readyState === 4 ? c(d) : setTimeout(arguments.callee, 10)
			})()
		} else d.parentNode.removeChild(d)
	}
});
STK.register("common.magic", function(a) {
	var b = a.core.util.swf,
		c = a.ui.mod.mask,
		d, e, f, g, h, i, j, k = (new Date).getTime() + "",
		l = (Math.random() + "").replace(".", ""),
		m = "STK_flash_" + k + l,
		n = function(b) {
			if (!d) {
				d = a.C("div");
				if (!b) d.style.cssText = "display:none;width:440px;height:360px;z-index:100000;";
				else {
					var c = a.core.util.winSize();
					d.style.cssText = "display:none;width:" + c.width + "px;height:" + c.height + "px;z-index:100000;"
				}
				e = a.core.dom.uniqueID(d);
				h = function(b) {
					b = a.fixEvent(b || window.event);
					b.target.getAttribute("name") != e && o.hide()
				};
				document.body.appendChild(d)
			}
		},
		o = function(k, l, p) {
			j = typeof l == "function" ? l : a.funcEmpty;
			p = a.parseParam({
				isV5update: !1
			}, p);
			n(p.isV5update);
			if (!f) {
				f = !0;
				c.showUnderNode(d);
				a.addEvent(c.getNode(), "click", h);
				c.getNode().title = "点击关闭";
				d.style.display = "";
				if (!p.isV5update) {
					g ? g.setAlign("c") : g = a.kit.dom.fix(d, "c");
					d.innerHTML = b.html(k, {
						id: e,
						width: 440,
						height: 360,
						paras: {
							allowScriptAccess: "never",
							wmode: "transparent"
						},
						attrs: {
							name: e
						},
						flashvars: {
							playMovie: "true"
						}
					})
				} else {
					g ? g.setAlign("lb") : g = a.kit.dom.fix(d, "lb");
					_closeFun = function() {
						o.hide()
					};
					d.innerHTML = b.html(k, {
						id: e,
						width: "100%",
						height: "100%",
						paras: {
							menu: "false",
							scale: "noScale",
							allowFullscreen: "false",
							allowScriptAccess: "always",
							bgcolor: "#FFFFFF",
							wmode: "transparent",
							base: "http://flashcrossdomain.mps.weibo.com/t5/home/static/upgrade/v5/"
						},
						attrs: {
							name: e
						},
						flashvars: {
							closeAPI: m,
							v: $CONFIG.version,
							bgMusic: "http://service.weibo.com/staticjs/v5/bg001.mp3"
						}
					})
				}
				clearInterval(i);
				i = setInterval(function() {
					var a = document[e] || window[e],
						b = 0;
					if (a && a.PercentLoaded() == 100) {
						clearInterval(i);
						i = setInterval(function() {
							var c = a.CurrentFrame(),
								d;
							try {
								d = a.TotalFrames()
							} catch (e) {
								d = a.TotalFrames
							}
							c < 0 || (c < d && b <= c ? b = c : o.hide())
						}, 80)
					}
				}, 100)
			}
		};
	o.hide = function() {
		clearInterval(i);
		if (d) {
			d.style.display = "none";
			a.kit.extra.destroyFlash(a.sizzle("embed,object", d)[0]);
			d.innerHTML = ""
		}
		a.removeEvent(c.getNode(), "click", h);
		c.getNode().title = "";
		c.back();
		f = !1;
		setTimeout(function() {
			typeof j == "function" && j()
		}, 0);
		return o
	};
	o.destroy = function() {
		o.hide();
		g && g.destroy();
		a.removeNode(d);
		i = d = e = f = g = h
	};
	window[m] = function() {
		o.hide()
	};
	return o
});
STK.register("common.bubble.face", function(a) {
	var b = "",
		c, d = " pftb_itm_lst ";
	if ($CONFIG && $CONFIG.brand && $CONFIG.brand == 1) {
		d = "";
		b = '<li class="pftb_itm pftb_itm_lst S_line1"><a  href="javascript:void(0);" class="pftb_lk S_line5 S_txt1 S_bg1"  node-type="brand">品牌专区</a></li>';
		c = {
			init: function() {
				s.inner.innerHTML = m;
				a.common.trans.editor.getTrans("face", {
					onSuccess: function(a, b) {
						c.cache = a.data.brand.norm || {};
						c.categorys = [q];
						for (var d in c.cache) c.categorys.push(d);
						var e = [];
						for (var f in a.data.brand.norm) e.push(f);
						c.cache[q] = a.data.brand.norm[e[0]];
						c.init = function() {
							c.page = 0;
							c.cPoniter = 0;
							c.currentCategory = q;
							c.rend();
							A(c);
							B(c)
						};
						c.init()
					},
					onError: function(a, b) {}
				}).request({})
			},
			rend: function() {
				var b = c.currentCategory,
					d = c.cache[y(b)],
					e = c.page,
					f = c.itemNumber;
				d = d.slice(e * f, e * f + f);
				d = a.foreach(d, function(b, c) {
					b.phraseB = b.phrase.slice(1, -1);
					return a.templet(i, b)
				});
				s.inner.innerHTML = d.join("")
			},
			page: 0,
			cache: null,
			hotList: null,
			cPoniter: 0,
			categorys: [],
			currentCategory: q,
			itemNumber: 72
		}
	}
	var e = '<div node-type="outer"><div  class="profile_tab layer_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a href="javascript:void(0);" class="pftb_lk current S_line5 S_txt1 S_bg5" node-type="general">常用表情</a></li><li class="pftb_itm' + d + ' S_line1"><a  href="javascript:void(0);"  node-type="magic">魔法表情</a></li>' + b + "</ul>" + "</div>" + '<div class="layer_faces">' + '<div class="tab_nosep">' + '<span class="right">' + '<a href="javascript:void(0);" node-type="prev" action-type="prev" class="W_btn_c btn_page_prevdis"><span><em class="W_ico12 ico_page_prev"></em></span></a>' + '<a href="javascript:void(0);" node-type="next" action-type="next" class="W_btn_c btn_page_next"><span><em class="W_ico12 ico_page_next"></em></span></a>' + "</span>" + '<ul class="t_ul clearfix"  node-type="categorys"></ul>' + "</div>" + '<div class="detail">' + '<ul class="faces_list faces_list_hot clearfix" node-type="hotFace"></ul>' + '<ul class="faces_list" node-type="inner"></ul>' + '<div class="W_pages_minibtn" node-type="page"></div>' + "</div>" + "</div>" + "</div></div>",
		f = '<li class="t_itm"><a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{itemEncode}" class="t_lk S_txt1">#{item}</a></li>',
		g = '<li class="t_itm current"><a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{itemEncode}" class="t_lk S_txt1 S_bg2">#{item}</a></li>',
		h = '<li action-type="insert" action-data="text=#{phrase}"><img src="#{icon}" alt="#{phraseB}" title="#{phraseB}"/></li>',
		i = '<li action-type="insert" action-data="text=#{value}"><img src="#{icon}" alt="#{phraseB}" title="#{phraseB}"/></li>',
		j = '<li><a action-type="insert" action-data="text=#{value}" class="img" href="javascript:void(0);"><img src="#{icon}" alt="#{phrase}" title="#{phrase}"/></a><a title="表情预览" href="javascript:void(0);" action-type="play" action-data="swf=#{swf}"><span class="W_ico16 icon_toplay"></span></a><span>#{phrase}</span></li>',
		k = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);" class="page S_bg1" onclick="return false;">#{label}</a>',
		l = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);" class="page S_txt1" onclick="return false;">#{label}</a>',
		m = '<div class="W_loading"><span>正在加载，请稍候...</span></div>',
		n = '<li class="clear"></li>',
		o = "",
		p = 5,
		q = "默认",
		r, s, t, u, v, w;
	w = {};
	var x = window.encodeURIComponent,
		y = window.decodeURIComponent,
		z = function(a, b, c) {
			for (var d = 0; b[d]; d++) a[b[d]] && (a[b[d]].style.display = "");
			for (var d = 0; c[d]; d++) a[c[d]] && (a[c[d]].style.display = "none")
		},
		A = function(b) {
			var c = b.cPoniter,
				d = b.categorys,
				e = y(b.currentCategory),
				h = d.slice(c, c + p);
			h = a.foreach(h, function(b, c) {
				return e === b ? a.templet(g, {
					item: b,
					itemEncode: x(b)
				}) : a.templet(f, {
					item: b,
					itemEncode: x(b)
				})
			});
			s.categorys.innerHTML = h.join(o);
			c + p >= d.length ? s.next.className = "W_btn_c_disable btn_page_nextdis" : s.next.className = "W_btn_c btn_page_next";
			c <= 0 ? s.prev.className = "W_btn_c_disable btn_page_prevdis" : s.prev.className = "W_btn_c btn_page_prev"
		},
		B = function(b) {
			var c = b.page,
				d = b.cache[y(b.currentCategory)],
				e = d.length / b.itemNumber,
				f = [];
			if (e > 1) for (var g = 0; g < e; g += 1) c == g ? f.push(a.templet(l, {
				number: g,
				label: g + 1
			})) : f.push(a.templet(k, {
				number: g,
				label: g + 1
			}));
			s.page.innerHTML = f.join("");
			c === 0 && b === H && y(b.currentCategory) === q ? s.hotFace.style.display = "" : s.hotFace.style.display = "none"
		},
		C = {
			general: function(a) {
				z(s, ["categorys", "hotFace", "prev", "next"], []);
				v = H;
				v.init();
				s.general.className = "pftb_lk current S_line5 S_txt1 S_bg5";
				s.magic.className = "pftb_lk S_line5 S_txt1 S_bg1";
				s.brand && (s.brand.className = "pftb_lk S_line5 S_txt1 S_bg1");
				s.inner.className = "faces_list clearfix"
			},
			magic: function(a) {
				z(s, ["categorys", "hotFace", "prev", "next"], []);
				v = I;
				v.init();
				s.general.className = "pftb_lk S_line5 S_txt1 S_bg1";
				s.magic.className = "pftb_lk current S_line5 S_txt1 S_bg5";
				s.brand && (s.brand.className = "pftb_lk S_line5 S_txt1 S_bg1");
				s.inner.className = "faces_magic_list"
			},
			brand: function(a) {
				z(s, [], ["categorys", "hotFace", "prev", "next"]);
				v = c;
				v.init();
				s.general.className = "pftb_lk S_line5 S_txt1 S_bg1";
				s.magic.className = "pftb_lk S_line5 S_txt1 S_bg1";
				s.brand && (s.brand.className = "pftb_lk current S_line5 S_txt1 S_bg5");
				s.inner.className = "faces_list clearfix"
			}
		},
		D = {
			category: function(a) {
				v.page = 0;
				v.currentCategory = a.data.category;
				v.rend();
				setTimeout(function() {
					A(v);
					B(v)
				}, 0)
			},
			prev: function(a) {
				var b = v.cPoniter,
					c = v.categorys;
				if (b <= 0) return !1;
				v.cPoniter -= p;
				A(v)
			},
			next: function(a) {
				var b = v.cPoniter,
					c = v.categorys;
				if (b >= c.length - p) return !1;
				v.cPoniter += p;
				A(v)
			},
			play: function(b) {
				t.stopBoxClose();
				a.common.magic(b.data.swf, function() {
					t.startBoxClose()
				})
			},
			insert: function(b) {
				a.custEvent.fire(w, "insert", {
					value: b.data.text
				})
			},
			page: function(a) {
				v.page = parseInt(a.data.num, 10);
				v.rend();
				setTimeout(function() {
					B(v)
				}, 0)
			}
		},
		E = function(b) {
			t = a.ui.bubble();
			F();
			G();
			C[b]();
			a.custEvent.add(t, "hide", function(b) {
				return function() {
					a.custEvent.remove(b, "hide", arguments.callee);
					a.custEvent.fire(w, "hide", {})
				}
			}(t))
		},
		F = function() {
			r = a.ui.mod.layer(e);
			s = {};
			var b = r.getDomList();
			for (var c in b) s[c] = b[c][0];
			F = function() {
				t.setContent(s.outer)
			};
			F()
		},
		G = function() {
			a.custEvent.define(w, "insert");
			a.custEvent.define(w, "hide");
			a.addEvent(s.general, "click", C.general);
			a.addEvent(s.magic, "click", C.magic);
			s.brand && a.addEvent(s.brand, "click", C.brand);
			u = a.core.evt.delegatedEvent(s.outer);
			u.add("category", "click", D.category);
			u.add("prev", "click", D.prev);
			u.add("next", "click", D.next);
			u.add("insert", "click", D.insert);
			u.add("play", "click", D.play);
			u.add("page", "click", D.page);
			G = function() {}
		},
		H = {
			init: function() {
				s.inner.innerHTML = m;
				a.common.trans.editor.getTrans("face", {
					onSuccess: function(b, c) {
						H.cache = b.data.more || {};
						try {
							H.hotList = b.data.usual.hot.slice(0, 12);
							s.hotFace.innerHTML = a.foreach(H.hotList, function(b, c) {
								b.phraseB = b.phrase.slice(1, -1);
								return a.templet(h, b)
							}).join("")
						} catch (d) {}
						H.categorys = [q];
						for (var e in H.cache) H.categorys.push(e);
						H.cache[q] = b.data.usual.norm;
						H.init = function() {
							H.page = 0;
							H.cPoniter = 0;
							H.currentCategory = q;
							H.rend();
							A(H);
							B(H)
						};
						H.init()
					},
					onError: function(a, b) {}
				}).request({})
			},
			rend: function() {
				var b = H.currentCategory,
					c = H.cache[y(b)],
					d = H.page,
					e = H.itemNumber;
				c = c.slice(d * e, d * e + e);
				c = a.foreach(c, function(b, c) {
					b.phraseB = b.phrase.slice(1, -1);
					return a.templet(h, b)
				});
				s.inner.innerHTML = c.join("")
			},
			page: 0,
			cache: null,
			hotList: null,
			cPoniter: 0,
			categorys: [],
			currentCategory: q,
			itemNumber: 72
		},
		I = {
			init: function() {
				s.inner.innerHTML = m;
				s.hotFace.style.display = "none";
				a.common.trans.editor.getTrans("magicFace", {
					onSuccess: function(a, b) {
						I.cache = a.data.more || {};
						I.categorys = [q];
						for (var c in I.cache) I.categorys.push(c);
						I.cache[q] = a.data.usual.norm;
						I.init = function() {
							I.page = 0;
							I.cPoniter = 0;
							I.currentCategory = q;
							I.rend();
							A(I);
							B(I)
						};
						I.init()
					},
					onError: function(a, b) {}
				}).request({
					type: "ani"
				})
			},
			rend: function(b, c) {
				var d = I.currentCategory,
					e = I.cache[y(d)],
					f = I.page,
					g = I.itemNumber;
				e = e.slice(f * g, f * g + g);
				e = a.foreach(e, function(b, c) {
					b.swf = b.icon.slice(0, -4) + ".swf";
					return a.templet(j, b)
				});
				e.push(n);
				s.inner.innerHTML = e.join("")
			},
			page: 0,
			cache: null,
			cPoniter: 0,
			categorys: [],
			currentCategory: q,
			itemNumber: 12
		};
	w.getBub = function() {
		return t
	};
	return function(b, c) {
		if (!a.isNode(b)) throw "common.bubble.face need el as first parameter!";
		E("general");
		if (c.useAlign) {
			c.fail = function() {
				t.setLayout(b, {
					offsetX: -29,
					offsetY: 5
				})
			};
			t.setAlignPos(b, c.refer, c)
		} else t.setLayout(b, {
			offsetX: -29,
			offsetY: 5
		});
		t.show();
		return w
	}
});
STK.register("common.editor.widget.face", function(a) {
	return function(b) {
		var c = {},
			d, e, f, g;
		g = a.parseParam({
			t: 0,
			l: -15,
			useAlign: !1
		}, b);
		var h = function(a, b) {
				d.API.insertText(b.value);
				e.getBub().hide()
			},
			i = function() {
				a.core.evt.preventDefault();
				g.refer = d.nodeList.textEl;
				e = a.common.bubble.face(d.nodeList[f], g);
				a.custEvent.add(e, "insert", h);
				a.custEvent.fire(c, "show", e);
				a.custEvent.add(e, "hide", function() {
					a.custEvent.remove(e, "hide", arguments.callee);
					a.custEvent.remove(e, "insert", h);
					a.custEvent.fire(c, "hide", e)
				})
			};
		c.init = function(b, e, g) {
			d = b;
			f = e;
			a.addEvent(b.nodeList[f], "click", i);
			a.custEvent.define(c, "show");
			a.custEvent.define(c, "hide")
		};
		c.clear = function() {};
		c.show = function() {};
		c.hide = function() {};
		c.destroy = function() {
			d = null;
			a.custEvent.undefine(c)
		};
		return c
	}
});
STK.register("ui.alert", function(a) {
	var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a></div></div>',
		c = {
			success: "icon_succM",
			error: "icon_errorM",
			warn: "icon_warnM",
			"delete": "icon_delM",
			question: "icon_questionM"
		},
		d = a.kit.extra.language,
		e = null,
		f = function(a, b) {
			a.getDom("icon").className = b.icon;
			a.getDom("textLarge").innerHTML = b.textLarge;
			a.getDom("textSmall").innerHTML = b.textSmall;
			a.getDom("OK").innerHTML = "<span>" + b.OKText + "</span>"
		};
	return function(g, h) {
		var i, j, k, l, m;
		i = a.parseParam({
			title: d("#L{提示}"),
			icon: "warn",
			textLarge: g,
			textSmall: "",
			OK: a.funcEmpty,
			OKText: d("#L{确定}"),
			timeout: 0
		}, h);
		i.icon = c[i.icon];
		j = {};
		e || (e = a.kit.extra.reuse(function() {
			var c = a.ui.mod.layer(d(b));
			return c
		}));
		k = e.getOne();
		l = a.ui.dialog();
		l.setContent(k.getOuter());
		l.setTitle(i.title);
		f(k, i);
		var n = function(b) {
				a.preventDefault(b);
				l.hide()
			};
		a.addEvent(k.getDom("OK"), "click", n);
		a.custEvent.add(l, "hide", function() {
			a.custEvent.remove(l, "hide", arguments.callee);
			a.removeEvent(k.getDom("OK"), "click", n);
			e.setUnused(k);
			clearTimeout(m);
			i.OK()
		});
		i.timeout && (m = setTimeout(l.hide, i.timeout));
		l.show().setMiddle();
		k.getDom("OK").focus();
		j.alt = k;
		j.dia = l;
		return j
	}
});
STK.register("ui.mod.tab", function(a) {
	return function(b, c) {
		function u(b, c) {
			var e = {
				evtType: "click",
				tNodes: "",
				dNodes: "",
				className: "cur",
				addClassNames: "",
				removeClassNames: "",
				cb: function() {},
				defaultIdx: 0
			};
			e = a.core.obj.parseParam(e, c);
			l = e.cb;
			n = e.className;
			p = e.defaultIdx;
			q = e.removeClassNames;
			r = e.addClassNames;
			m = e.evtType;
			j = typeof e.tNodes == "string" ? a.sizzle(e.tNodes, b) : e.tNodes;
			o = j.length;
			if (e.dNodes !== "") {
				k = typeof e.dNodes == "string" ? a.sizzle(e.dNodes, b) : e.dNodes;
				t()
			}
			for (var f = 0; f < o; f++) d(j[f], m, function(a) {
				return function() {
					h();
					s(a)
				}
			}(f))
		}
		function t() {
			if (!g(j)) throw "ui.mod.tab needs tNodes as Array!";
			if (!g(k)) throw "ui.mod.tab needs tNodes as Array!";
			if (j.length != k.length) throw "ui.mod.tab needs tNodes'length equal to dNodes'length!"
		}
		function s(a) {
			var b = g(l) ? l[a] : l,
				c = j[a],
				d = g(k) ? k[a] : null,
				h = j[p],
				m = g(k) ? k[p] : null;
			if (d) {
				i(k[p], "display", "none");
				i(k[a], "display", "")
			}
			if (!q && !r) {
				f(j[p], n);
				e(j[a], n)
			} else {
				j[p].className = q;
				j[a].className = r
			}
			if (a != p) {
				b({
					idx: a,
					node: d
				});
				p = a
			}
		}
		var d = a.core.evt.addEvent,
			e = a.core.dom.addClassName,
			f = a.core.dom.removeClassName,
			g = a.core.arr.isArray,
			h = a.core.evt.preventDefault,
			i = a.core.dom.setStyle,
			j, k, l, m, n, o, p, q, r, v = {};
		v.initView = function(a) {
			a = a || c.defaultIdx;
			i(k[a], "display", "");
			e(j[a], n);
			var b = g(l) ? l[a] : l,
				d = g(k) ? k[a] : null;
			b({
				idx: a,
				node: d
			});
			p = a
		};
		v.refresh = function(b) {
			j[b] && a.fireEvent(j[b], "click")
		};
		u(b, c);
		return v
	}
});
STK.register("kit.extra.swfobject", function(a) {
	var b = function() {
			function W(b) {
				var c = /[\\\"<>\.;]/,
					d = c.exec(b) != null;
				return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
			}
			function V(a, b) {
				if ( !! y) {
					var c = b ? "visible" : "hidden";
					u && Q(a) ? Q(a).style.visibility = c : U("#" + a, "visibility:" + c)
				}
			}
			function U(b, d, e, f) {
				if (!z.ie || !z.mac) {
					var g = j.getElementsByTagName("head")[0];
					if (!g) return;
					var h = e && typeof e == "string" ? e : "screen";
					if (f) {
						w = null;
						x = null
					}
					if (!w || x != h) {
						var i = R("style");
						i.setAttribute("type", "text/css");
						i.setAttribute("media", h);
						w = g.appendChild(i);
						z.ie && z.win && typeof j.styleSheets != a && j.styleSheets.length > 0 && (w = j.styleSheets[j.styleSheets.length - 1]);
						x = h
					}
					z.ie && z.win ? w && typeof w.addRule == c && w.addRule(b, d) : w && typeof j.createTextNode != a && w.appendChild(j.createTextNode(b + " {" + d + "}"))
				}
			}
			function T(a) {
				var b = z.pv,
					c = a.split(".");
				c[0] = parseInt(c[0], 10);
				c[1] = parseInt(c[1], 10) || 0;
				c[2] = parseInt(c[2], 10) || 0;
				return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
			}
			function S(a, b, c) {
				a.attachEvent(b, c);
				p[p.length] = [a, b, c]
			}
			function R(a) {
				return j.createElement(a)
			}
			function Q(a) {
				var b = null;
				try {
					b = j.getElementById(a)
				} catch (c) {}
				return b
			}
			function P(a) {
				var b = Q(a);
				if (b) {
					for (var c in b) typeof b[c] == "function" && (b[c] = null);
					b.parentNode.removeChild(b)
				}
			}
			function O(a) {
				var b = Q(a);
				if (b && b.nodeName == "OBJECT") if (z.ie && z.win) {
					b.style.display = "none";
					(function() {
						b.readyState == 4 ? P(a) : setTimeout(arguments.callee, 10)
					})()
				} else b.parentNode.removeChild(b)
			}
			function N(a, b, c) {
				var d = R("param");
				d.setAttribute("name", b);
				d.setAttribute("value", c);
				a.appendChild(d)
			}
			function M(b, d, e) {
				var g, h = Q(e);
				if (z.wk && z.wk < 312) return g;
				if (h) {
					typeof b.id == a && (b.id = e);
					if (z.ie && z.win) {
						var i = "";
						for (var j in b) b[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = b[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + b[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + b[j] + '"'));
						var k = "";
						for (var l in d) d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
						h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>";
						o[o.length] = b.id;
						g = Q(b.id)
					} else {
						var m = R(c);
						m.setAttribute("type", f);
						for (var n in b) b[n] != Object.prototype[n] && (n.toLowerCase() == "styleclass" ? m.setAttribute("class", b[n]) : n.toLowerCase() != "classid" && m.setAttribute(n, b[n]));
						for (var p in d) d[p] != Object.prototype[p] && p.toLowerCase() != "movie" && N(m, p, d[p]);
						h.parentNode.replaceChild(m, h);
						g = m
					}
				}
				return g
			}
			function L(a) {
				var b = R("div");
				if (z.win && z.ie) b.innerHTML = a.innerHTML;
				else {
					var d = a.getElementsByTagName(c)[0];
					if (d) {
						var e = d.childNodes;
						if (e) {
							var f = e.length;
							for (var g = 0; g < f; g++)(e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && b.appendChild(e[g].cloneNode(!0))
						}
					}
				}
				return b
			}
			function K(a) {
				if (z.ie && z.win && a.readyState != 4) {
					var b = R("div");
					a.parentNode.insertBefore(b, a);
					b.parentNode.replaceChild(L(a), b);
					a.style.display = "none";
					(function() {
						a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
					})()
				} else a.parentNode.replaceChild(L(a), a)
			}
			function J(b, c, d, e) {
				v = !0;
				s = e || null;
				t = {
					success: !1,
					id: d
				};
				var f = Q(d);
				if (f) {
					if (f.nodeName == "OBJECT") {
						q = L(f);
						r = null
					} else {
						q = f;
						r = d
					}
					b.id = g;
					if (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310) b.width = "310";
					if (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137) b.height = "137";
					j.title = j.title.slice(0, 47) + " - Flash Player Installation";
					var h = z.ie && z.win ? "ActiveX" : "PlugIn",
						k = "MMredirectURL=" + i.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + h + "&MMdoctitle=" + j.title;
					typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k;
					if (z.ie && z.win && f.readyState != 4) {
						var l = R("div");
						d += "SWFObjectNew";
						l.setAttribute("id", d);
						f.parentNode.insertBefore(l, f);
						f.style.display = "none";
						(function() {
							f.readyState == 4 ? f.parentNode.removeChild(f) : setTimeout(arguments.callee, 10)
						})()
					}
					M(b, c, d)
				}
			}
			function I() {
				return !v && T("6.0.65") && (z.win || z.mac) && !(z.wk && z.wk < 312)
			}
			function H(b) {
				var d = null,
					e = Q(b);
				if (e && e.nodeName == "OBJECT") if (typeof e.SetVariable != a) d = e;
				else {
					var f = e.getElementsByTagName(c)[0];
					f && (d = f)
				}
				return d
			}
			function G() {
				var b = n.length;
				if (b > 0) for (var c = 0; c < b; c++) {
					var d = n[c].id,
						e = n[c].callbackFn,
						f = {
							success: !1,
							id: d
						};
					if (z.pv[0] > 0) {
						var g = Q(d);
						if (g) if (T(n[c].swfVersion) && !(z.wk && z.wk < 312)) {
							V(d, !0);
							if (e) {
								f.success = !0;
								f.ref = H(d);
								e(f)
							}
						} else if (n[c].expressInstall && I()) {
							var h = {};
							h.data = n[c].expressInstall;
							h.width = g.getAttribute("width") || "0";
							h.height = g.getAttribute("height") || "0";
							g.getAttribute("class") && (h.styleclass = g.getAttribute("class"));
							g.getAttribute("align") && (h.align = g.getAttribute("align"));
							var i = {},
								j = g.getElementsByTagName("param"),
								k = j.length;
							for (var l = 0; l < k; l++) j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
							J(h, i, d, e)
						} else {
							K(g);
							e && e(f)
						}
					} else {
						V(d, !0);
						if (e) {
							var m = H(d);
							if (m && typeof m.SetVariable != a) {
								f.success = !0;
								f.ref = m
							}
							e(f)
						}
					}
				}
			}
			function F() {
				var b = j.getElementsByTagName("body")[0],
					d = R(c);
				d.setAttribute("type", f);
				var e = b.appendChild(d);
				if (e) {
					var g = 0;
					(function() {
						if (typeof e.GetVariable != a) {
							var c = e.GetVariable("$version");
							if (c) {
								c = c.split(" ")[1].split(",");
								z.pv = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]
							}
						} else if (g < 10) {
							g++;
							setTimeout(arguments.callee, 10);
							return
						}
						b.removeChild(d);
						e = null;
						G()
					})()
				} else G()
			}
			function E() {
				l ? F() : G()
			}
			function D(b) {
				if (typeof i.addEventListener != a) i.addEventListener("load", b, !1);
				else if (typeof j.addEventListener != a) j.addEventListener("load", b, !1);
				else if (typeof i.attachEvent != a) S(i, "onload", b);
				else if (typeof i.onload == "function") {
					var c = i.onload;
					i.onload = function() {
						c();
						b()
					}
				} else i.onload = b
			}
			function C(a) {
				u ? a() : m[m.length] = a
			}
			function B() {
				if (!u) {
					try {
						var a = j.getElementsByTagName("body")[0].appendChild(R("span"));
						a.parentNode.removeChild(a)
					} catch (b) {
						return
					}
					u = !0;
					var c = m.length;
					for (var d = 0; d < c; d++) m[d]()
				}
			}
			var a = "undefined",
				c = "object",
				d = "Shockwave Flash",
				e = "ShockwaveFlash.ShockwaveFlash",
				f = "application/x-shockwave-flash",
				g = "SWFObjectExprInst",
				h = "onreadystatechange",
				i = window,
				j = document,
				k = navigator,
				l = !1,
				m = [E],
				n = [],
				o = [],
				p = [],
				q, r, s, t, u = !1,
				v = !1,
				w, x, y = !0,
				z = function() {
					var b = typeof j.getElementById != a && typeof j.getElementsByTagName != a && typeof j.createElement != a,
						g = k.userAgent.toLowerCase(),
						h = k.platform.toLowerCase(),
						m = h ? /win/.test(h) : /win/.test(g),
						n = h ? /mac/.test(h) : /mac/.test(g),
						o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
						p = !1,
						q = [0, 0, 0],
						r = null;
					if (typeof k.plugins != a && typeof k.plugins[d] == c) {
						r = k.plugins[d].description;
						if (r && (typeof k.mimeTypes == a || !k.mimeTypes[f] || !! k.mimeTypes[f].enabledPlugin)) {
							l = !0;
							p = !1;
							r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
							q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10);
							q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
							q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
						}
					} else if (typeof i.ActiveXObject != a) try {
						var s = new ActiveXObject(e);
						if (s) {
							r = s.GetVariable("$version");
							if (r) {
								p = !0;
								r = r.split(" ")[1].split(",");
								q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]
							}
						}
					} catch (t) {}
					return {
						w3: b,
						pv: q,
						wk: o,
						ie: p,
						win: m,
						mac: n
					}
				}(),
				A = function() {
					if ( !! z.w3) {
						(typeof j.readyState != a && j.readyState == "complete" || typeof j.readyState == a && (j.getElementsByTagName("body")[0] || j.body)) && B();
						if (!u) {
							typeof j.addEventListener != a && j.addEventListener("DOMContentLoaded", B, !1);
							if (z.ie && z.win) {
								j.attachEvent(h, function() {
									if (j.readyState == "complete") {
										j.detachEvent(h, arguments.callee);
										B()
									}
								});
								i == top &&
								function() {
									if (!u) {
										try {
											j.documentElement.doScroll("left")
										} catch (a) {
											setTimeout(arguments.callee, 0);
											return
										}
										B()
									}
								}()
							}
							z.wk &&
							function() {
								if (!u) {
									if (!/loaded|complete/.test(j.readyState)) {
										setTimeout(arguments.callee, 0);
										return
									}
									B()
								}
							}();
							D(B)
						}
					}
				}(),
				X = function() {
					z.ie && z.win && window.attachEvent("onunload", function() {
						var a = p.length;
						for (var c = 0; c < a; c++) p[c][0].detachEvent(p[c][1], p[c][2]);
						var d = o.length;
						for (var e = 0; e < d; e++) O(o[e]);
						for (var f in z) z[f] = null;
						z = null;
						for (var g in b) b[g] = null;
						b = null
					})
				}();
			return {
				registerObject: function(a, b, c, d) {
					if (z.w3 && a && b) {
						var e = {};
						e.id = a;
						e.swfVersion = b;
						e.expressInstall = c;
						e.callbackFn = d;
						n[n.length] = e;
						V(a, !1)
					} else d && d({
						success: !1,
						id: a
					})
				},
				getObjectById: function(a) {
					if (z.w3) return H(a)
				},
				embedSWF: function(b, d, e, f, g, h, i, j, k, l) {
					var m = {
						success: !1,
						id: d
					};
					if (z.w3 && !(z.wk && z.wk < 312) && b && d && e && f && g) {
						V(d, !1);
						C(function() {
							e += "";
							f += "";
							var n = {};
							if (k && typeof k === c) for (var o in k) n[o] = k[o];
							n.data = b;
							n.width = e;
							n.height = f;
							var p = {};
							if (j && typeof j === c) for (var q in j) p[q] = j[q];
							if (i && typeof i === c) for (var r in i) typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
							if (T(g)) {
								var s = M(n, p, d);
								n.id == d && V(d, !0);
								m.success = !0;
								m.ref = s
							} else {
								if (h && I()) {
									n.data = h;
									J(n, p, d, l);
									return
								}
								V(d, !0)
							}
							l && l(m)
						})
					} else l && l(m)
				},
				switchOffAutoHideShow: function() {
					y = !1
				},
				ua: z,
				getFlashPlayerVersion: function() {
					return {
						major: z.pv[0],
						minor: z.pv[1],
						release: z.pv[2]
					}
				},
				hasFlashPlayerVersion: T,
				createSWF: function(a, b, c) {
					return z.w3 ? M(a, b, c) : undefined
				},
				showExpressInstall: function(a, b, c, d) {
					z.w3 && I() && J(a, b, c, d)
				},
				removeSWF: function(a) {
					z.w3 && O(a)
				},
				createCSS: function(a, b, c, d) {
					z.w3 && U(a, b, c, d)
				},
				addDomLoadEvent: C,
				addLoadEvent: D,
				getQueryParamValue: function(a) {
					var b = j.location.search || j.location.hash;
					if (b) {
						/\?/.test(b) && (b = b.split("?")[1]);
						if (a == null) return W(b);
						var c = b.split("&");
						for (var d = 0; d < c.length; d++) if (c[d].substring(0, c[d].indexOf("=")) == a) return W(c[d].substring(c[d].indexOf("=") + 1))
					}
					return ""
				},
				expressInstallCallback: function() {
					if (v) {
						var a = Q(g);
						if (a && q) {
							a.parentNode.replaceChild(q, a);
							if (r) {
								V(r, !0);
								z.ie && z.win && (q.style.display = "block")
							}
							s && s(t)
						}
						v = !1
					}
				}
			}
		}();
	return b
});
STK.register("common.flash.imgUpload", function(a) {
	var b = document.documentElement,
		c = document.body,
		d = {
			getScroll: function() {
				var a, d, e, f;
				if (b && b.scrollTop) {
					a = b.scrollTop;
					d = b.scrollLeft;
					e = b.scrollWidth;
					f = b.scrollHeight
				} else if (c) {
					a = c.scrollTop;
					d = c.scrollLeft;
					e = c.scrollWidth;
					f = c.scrollHeight
				}
				return {
					t: a,
					l: d,
					w: e,
					h: f
				}
			},
			getScreen: function() {
				var c = {};
				if (a.IE) {
					c.w = b.clientWidth;
					c.h = b.clientHeight
				} else {
					c.w = window.innerWidth;
					c.h = window.innerHeight
				}
				return c
			}
		},
		e = function(a) {
			var b = {
				cn: "zh_CN",
				tw: "zh_TW",
				en: "en",
				hk: "zh_HK"
			};
			a = a.toLowerCase();
			a = a.replace(/zh-/g, "");
			return b[a]
		};
	return function(b, f) {
		var g = {
			version: $CONFIG.version,
			swf_path: $CONFIG.jsPath + "home/static/swf/img/",
			service: b.service,
			ed_swf: b.swf || "PhotoEditor.swf",
			exp_swf: "expressInstall.swf",
			h: b.h || 385,
			w: b.w || 528,
			f_version: "10.0.0",
			channel: b.id + "_channel",
			id_panel: b.id + "_panel",
			id_swf: b.id + "_swf"
		},
			h = {},
			i, j, k = {
				init: function() {
					f.init && f.init(h, b)
				},
				setHeight: function(b) {
					a.IE || (m.getFlash(g.id_swf).height = b)
				},
				upComplate: function(a) {
					b.sucess && b.sucess(a);
					i.style.display = "none";
					h.destory()
				},
				closeEditor: function() {
					i.style.display = "none";
					h.destory();
					f.close && f.close(h, b)
				},
				suda: function(a) {
					SUDA && SUDA.uaTrack && SUDA.uaTrack("meitu", "v4||" + a)
				}
			},
			l = {
				version: g.version,
				userid: $CONFIG.uid,
				language: e($CONFIG.lang),
				channel: g.channel,
				JSHandler: "STK.core.util.listener.fire",
				initFun: "init",
				changeFlashHeightFun: "setHeight",
				uploadCompleteFun: "upComplate",
				closePhotoEditorFun: "closeEditor",
				suda: "suda"
			},
			m = {
				init: function() {
					if ( !! b.id) {
						i = a.E(g.id_panel);
						j = a.E(g.id_swf);
						if (!i) {
							i = a.C("div");
							i.id = g.id_panel;
							c.appendChild(i)
						}
						if (!j) {
							j = a.C("div");
							j.id = g.id_swf;
							i.appendChild(j)
						}
						i.style.display = "none";
						m.getFlash(g.id_swf) || m.build()
					}
				},
				checkAction: function(a, b) {
					var c = STK.core.util.listener.list;
					return !!c[a] && !! c[a][b]
				},
				bindEvt: function(a) {
					for (var b in a) k[a[b]] && !m.checkAction(g.channel, a[b]) && STK.core.util.listener.register(g.channel, a[b], k[a[b]])
				},
				build: function() {
					var c = b.baseDir ? b.baseDir + "/" : "",
						d = {
							menu: "true",
							scale: "noScale",
							allowFullscreen: "true",
							allowScriptAccess: "always",
							bgcolor: "#FFFFFF",
							wmode: a.IE ? "window" : "transparent",
							base: g.swf_path + c
						},
						e = {
							id: b.id
						};
					m.bindEvt(l);
					a.kit.extra.swfobject.embedSWF(g.swf_path + c + g.ed_swf + "?version=" + g.version, g.id_swf, g.w, g.h, g.f_version, g.swf_path + g.exp_swf, l, d, e)
				},
				getFlash: function() {
					return a.kit.extra.swfobject.getObjectById(b.id)
				},
				setPos: function() {
					var c, e, f, h, j = d.getScroll(),
						k = d.getScreen();
					f = Math.round(g.h > k.h ? k.h / 5 + j.t : (k.h - g.h) / 2 + j.t);
					h = Math.round(g.w > k.w ? k.w / 5 + j.l : (k.w - g.w) / 2 + j.l);
					c = b.pos.t - 1 || f;
					e = b.pos.l || h;
					i.style.zIndex = b.zIndex || 2e4;
					a.setStyle(i, "position", "absolute");
					a.setStyle(i, "left", e + "px");
					a.setStyle(i, "top", c + "px");
					m.autoScroll(j.t, j.t + (c - f))
				},
				autoScroll: function(a, b, c) {
					var d, e, f, g = 8,
						h;
					g = c || g;
					h = a - b;
					e = [h];
					e[g] = 0;
					f = 1;
					for (f; f < g; f++) e[f] = h = h / 2;
					clearInterval(d);
					d = setInterval(function() {
						e.length ? window.scrollTo(0, b + e.shift()) : clearInterval(d)
					}, 30)
				}
			};
		h.show = function(a) {
			a && (b.id = a);
			i && (i.style.display = "");
			m.setPos();
			return this
		};
		h.hide = function() {
			i && (i.style.display = "");
			return this
		};
		h.setPars = function(a) {
			var b = {
				imageURL: a || "",
				uploadURL: g.service
			};
			m.getFlash(g.id_swf).editPhoto(b);
			return this
		};
		h.getSwf = m.getFlash;
		h.destory = function() {
			for (var a in l) k[l[a]] && STK.core.util.listener.remove(g.channel, l[a], k[l[a]]);
			i.innerHTML = ""
		};
		m.init();
		return h
	}
});
STK.register("kit.extra.watermark", function(a) {
	var b = {
		trans: null,
		conf: null,
		success: function(a, c) {
			b.conf = a.data
		}
	},
		c = [];
	return function(d) {
		if (typeof d == "function") {
			c.push(d);
			if (b.conf) for (var e = 0; e < c.length; e++) {
				c[e] && c[e](b.conf);
				c[e] = null
			} else {
				b.trans || (b.trans = a.common.trans.editor.getTrans("waterMark", {
					onSuccess: function() {
						b.success.apply(null, arguments);
						for (var a = 0; a < c.length; a++) {
							c[a] && c[a](b.conf);
							c[a] = null
						}
					},
					onError: a.funcEmpty,
					onFail: a.funcEmpty
				}));
				b.trans.abort();
				b.trans.request()
			}
		}
	}
});
STK.register("common.flash.uploadLog", function(a) {
	return function() {
		var b = {},
			c = function(b) {
				var c = new Image,
					d = encodeURIComponent(navigator.userAgent),
					e = window.$CONFIG,
					f = a.kit.extra.merge(b, {
						cl: d,
						rnd: (new Date).getTime(),
						uid: e ? e.uid : 0,
						referer: encodeURIComponent(location),
						tm: Math.floor(+(new Date) / 1e3),
						ip: "",
						t: 0
					});
				f.ret == "none" && (f.err = "10003");
				f = a.core.json.jsonToQuery(f);
				f = "http://stats.t.sinaimg.cn/do_not_delete/fc.html?" + f;
				c.setAttribute("src", f)
			},
			d = function(b) {
				var c = new Image,
					d = encodeURIComponent(navigator.userAgent),
					e = window.$CONFIG,
					f = a.kit.extra.merge(b, {
						rnd: (new Date).getTime(),
						uid: e ? e.uid : 0,
						cl: d,
						tm: +(new Date),
						ip: "",
						t: 2,
						sz: 0
					});
				f = a.core.json.jsonToQuery(f);
				f = "http://stats.t.sinaimg.cn/do_not_delete/fc.html?" + f;
				c.setAttribute("src", f)
			};
		b.sendSucc = d;
		b.sendError = c;
		b.destroy = function() {};
		return b
	}
});
STK.register("kit.extra.upload", function(a) {
	var b = a.kit.extra.language,
		c = "ww1.sinaimg.cn/do_not_delete/fc.html?t=1";
	return function(c) {
		var d = {},
			e = window.location.href,
			f, g, h = a.common.flash.uploadLog();
		c = a.parseParam({
			type: "common",
			form: null,
			base64Str: "",
			imgName: "",
			uploadArgs: {},
			app: ""
		}, c);
		a.custEvent.define(d, ["uploadError", "uploadSucc"]);
		var i = {
			base64form: null,
			upload: function(b) {
				var d, e = b,
					h = "weibo.com/",
					j = window.$CONFIG,
					k = c.type;
				if (k === "common") d = c.form;
				else if (k === "base64") {
					d = a.C("form");
					i.base64form = d;
					d.method = "POST";
					var l = a.C("input");
					l.name = "b64_data";
					l.type = "hidden";
					l.value = c.base64Str;
					d.appendChild(l);
					document.body.appendChild(d)
				}
				var m = {
					marks: 1,
					app: "miniblog",
					s: "rdxt"
				};
				c.type === "common" || c.type === "base64" ? m = a.kit.extra.merge({
					url: e.domain == "1" ? h + (j && j.watermark || j.domain) : 0,
					markpos: e.position || "",
					logo: e.logo || "",
					nick: e.nickname == "1" ? "@" + (j && j.nick) : 0
				}, m) : c.type === "custom" && (m = a.kit.extra.merge(c.uploadArgs, m));
				k === "base64" && (m = a.kit.extra.merge({
					mime: "image/jpeg",
					data: "base64"
				}, m));
				g = new Date;
				f = a.core.io.ijax({
					url: "http://picupload.service.weibo.com/interface/pic_upload.php",
					form: d,
					abaurl: "http://" + document.domain + "/aj/static/upimgback.html?_wv=5",
					abakey: "cb",
					timeout: 18e5,
					onComplete: i.handle,
					onTimeout: i.handle,
					args: m
				})
			},
			sendError: function(b) {
				var d = new Image,
					f = encodeURIComponent(navigator.userAgent),
					g = window.$CONFIG,
					h = a.kit.extra.merge(b, {
						cl: f,
						rnd: (new Date).getTime(),
						uid: g ? g.uid : 0,
						referer: encodeURIComponent(e),
						tm: +(new Date),
						ip: "",
						app: c.app
					});
				h.ret == "none" && (h.err = "10003");
				h = a.core.json.jsonToQuery(h);
				h = "http://ww1.sinaimg.cn/do_not_delete/fc.html?" + h;
				d.setAttribute("src", h)
			},
			sendSucc: function(b) {
				var d = new Date - g,
					e = new Image,
					f = encodeURIComponent(navigator.userAgent),
					h = window.$CONFIG,
					i = a.kit.extra.merge(b, {
						ct: "1",
						rnd: (new Date).getTime(),
						el: d,
						uid: h ? h.uid : 0,
						cl: f,
						tm: +(new Date),
						ip: "",
						app: c.app
					});
				i = a.core.json.jsonToQuery(i);
				i = "http://ww1.sinaimg.cn/do_not_delete/fc.html?" + i;
				e.setAttribute("src", i)
			},
			handle: function(e) {
				a.removeNode(i.base64form);
				i.base64form = null;
				var f = Math.abs(e.ret);
				if (!e || e.ret < 0) {
					var j = "";
					switch (f) {
					case 1:
						j = "#L{没有登录}";
						break;
					case 4:
					case 9:
						j = "#L{请上传5M以内的JPG、GIF、PNG图片。}";
						break;
					default:
						j = "#L{上传图片超时}"
					}
					e ? h.sendError({
						ret: e.ret,
						app: "1001"
					}) : h.sendError({
						ret: "none",
						app: "1001"
					});
					a.custEvent.fire(d, "uploadError", {
						code: f,
						msg: b(j)
					})
				} else {
					var k = new Date,
						l = function(a) {
							return a < 10 ? "0" + a : a
						},
						m;
					if (c.type === "common") m = c.imgName;
					else if (c.type === "base64") {
						var n = [k.getFullYear(), l(k.getMonth() + 1), l(k.getDate()), l(k.getHours()), l(k.getMinutes()), l(k.getSeconds())].join("");
						m = b("#L{微博桌面截图}") + n + ".jpg"
					}
					a.custEvent.fire(d, "uploadSucc", {
						pid: e.pid,
						imgName: m
					});
					var o = new Date - g;
					h.sendSucc({
						pids: e.pid,
						ret: e.ret,
						app: "1001",
						el: o,
						ct: "1"
					})
				}
			},
			init: function() {
				c.type === "common" || c.type === "base64" ? a.kit.extra.watermark(function(a) {
					i.upload(a)
				}) : i.upload()
			},
			destroy: function() {
				a.custEvent.undefine(d);
				a.removeNode(i.base64form)
			}
		};
		i.init();
		d.destroy = i.destroy;
		d.abort = function() {
			if (f) try {
				f.abort()
			} catch (a) {}
		};
		return d
	}
});
STK.register("common.plugin.plugInstallState", function(a) {
	return function(b, c, d, e) {
		var f = {},
			g = a.core.util.browser,
			h = window.navigator,
			i = a.IE,
			j = g.MOZ,
			k = g.OPERA,
			l = g.SAFARI,
			m = g.CHROME,
			n = g.Version,
			o = c.embedId,
			p = c.embedType,
			q = b.pluginName,
			r = b.activeXName;
		f.instance = e;
		var s = function() {
				var a;
				for (a = 0; a < d.length; a++) if (!(d.param[a] in f.instance)) break;
				return a < d.length - 1 ? !1 : !0
			};
		f.getInstallState = function() {
			if (i) {
				var b;
				if (!f.instance) try {
					f.instance = new ActiveXObject(r);
					b = !0
				} catch (c) {
					f.instance = null
				}
				if (f.instance) {
					if (s()) return "ieinstalled";
					if (!b) try {
						f.instance = new ActiveXObject(r)
					} catch (c) {
						f.instance = null
					}
					return f.instance ? s() ? "ieinstalled" : "ieneedUpdate" : "ieneedInstall"
				}
				return "ieneedInstall"
			}
			var d = h.plugins,
				e;
			if (d && d.length) for (var g = 0, j = d.length; g < j; g++) {
				var k = d[g];
				if (k && k.name && k.name === q) {
					e = !0;
					break
				}
			}
			if (e) {
				if (!f.instance) {
					var l = a.C("embed");
					l.id = o;
					l.type = p;
					l.setAttribute("hidden", !0);
					document.body.appendChild(l);
					f.instance = l
				}
				return "installed"
			}
			f.instance = null;
			return "needInstall"
		};
		return f
	}
});
STK.register("common.plugin.screenCapture", function(a) {
	var b = a.core.util.browser,
		c = a.kit.extra.language,
		d = function(a, b) {
			window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(a, b)
		},
		e = a.IE,
		f = b.MOZ,
		g = b.OPERA,
		h = b.SAFARI,
		i = b.CHROME,
		j = b.Version,
		k = "weibo_screen_grab_download",
		l = {
			pluginName: "npScreenGrab Plugin",
			activeXName: "ScreenGrab.ScreenGrabCom.1"
		},
		m = {
			embedId: "weibo_screen_grab_embed",
			embedType: "application/x-screengrab-sina"
		},
		n = {
			param1: "OnGrapContent",
			param2: "CloseScreenGrabCtrlWnd",
			param3: "onmsgfireevent"
		},
		o, p = {
			spec: null,
			setCurrentSpec: function(a) {
				p.spec = a
			},
			setup: function() {
				if (typeof o.OnGrapContent != "function") {
					o.OnGrapContent = function(a, b, c, d) {
						var e = p.spec;
						q.focusWindow();
						if (a === 2) {
							if (e.captureType === "base64") e.captureSuccess(c);
							else if (e.captureType === "pid") {
								e.beforeUpload();
								e.upload(c)
							}
						} else if (a === 3) {
							q.focusWindow();
							e.captureCancel()
						}
					};
					o.onmsgfireevent = function(a, b) {
						if (b === 2) {
							q.focusWindow();
							spec.captureCancel()
						}
					};
					a.addEvent(window, "unload", function() {
						a.removeEvent(window, "unload", arguments.callee);
						if (o) try {
							o.CloseScreenGrabCtrlWnd();
							o.onmsgfireevent = null;
							o.OnGrapContent = null;
							o = null
						} catch (b) {}
					})
				}
			}
		},
		q = {};
	q.isSupport = function() {
		return b.OS === "windows" ? e ? !0 : f ? j >= 3.6 ? !0 : !1 : g ? !1 : h ? !1 : i ? j >= 4 ? !0 : !1 : !1 : !1
	};
	q.focusWindow = function() {
		window.focus()
	};
	q.hide = function() {
		o && o.CloseScreenGrabCtrlWnd()
	};
	q.screenCapture = function(b) {
		var g, h = {
			uploadSucc: function(a, c) {
				q.focusWindow();
				b.captureSuccess(c)
			},
			uploadErr: function(a, c) {
				b.captureError(c)
			}
		},
			j = function(b) {
				g && g.destroy();
				g = a.kit.extra.upload({
					type: "base64",
					base64Str: b,
					app: "1001"
				});
				a.custEvent.add(g, "uploadSucc", h.uploadSucc);
				a.custEvent.add(g, "uploadError", h.uploadErr)
			},
			r = function() {
				b.upload = function(a) {
					j(a)
				};
				p.setup();
				p.setCurrentSpec(b);
				if (a.isArray(b.showPos)) {
					var c = b.showPos;
					o.ShowControlWnd(c[0], c[1], c[2], c[3])
				} else if (typeof b.showPos == "function") {
					var c = b.showPos();
					a.isArray(c) && o.ShowControlWnd(c[0], c[1], c[2], c[3])
				} else if (b.showPos === "center") {
					var d = a.scrollPos(),
						e = 200,
						f = 200,
						g = a.winSize(),
						h = Math.floor(d.top + (g.height - e) / 2),
						i = Math.floor(d.left + (g.width - f) / 2);
					o.ShowControlWnd(window.screenLeft + i, window.screenTop + h, f, e)
				} else b.showPos === "default" && o.ShowControlWnd(-1, -1, -1, -1)
			},
			s = function(b, e) {
				var f = "http://desktop.weibo.com/download.php?source=jietu",
					g = '<#et screentip data><div class="layer_screenshot_tips"><p class="tip" style="width:338px"><span class="icon_warnM"></span>${data.titletip}。</p><div><a href="http://desktop.weibo.com" target="_blank"><img src="${data.imgsrc}" width="338" height="147"/></a></div><div class="btn"><a node-type="download" href="javascript:void(0)" class="W_btn_a"><span>${data.downloadTitle}</span></a><a node-type="nodownload" href="javascript:void(0)" class="W_btn_b"><span>#L{取消下载}</span></a></div></div></#et>',
					h = {
						imgsrc: (window.$CONFIG && window.$CONFIG.imgPath || "http://img.t.sinajs.cn/t4/") + "style/images/index/pic_screenshot.png?version=" + (window.$CONFIG && window.$CONFIG.version || ""),
						titletip: b === "IE" ? "#L{使用此功能，需要先安装微博桌面}" : "#L{使用此功能，需要先安装微博桌面插件}" + (b === "FF" ? "，#L{并重新启动浏览器才能使用}" : ""),
						downloadTitle: "#L{立即下载}"
					},
					i = a.ui.dialog();
				i.setTitle(c("#L{截屏插件安装提示}"));
				i.setContent(c(a.core.util.easyTemplate(g, h).toString()));
				i.show();
				i.setMiddle();
				var j = a.kit.dom.parseDOM(a.builder(i.getInner()).list),
					l = function() {
						i.hide();
						d("tblog_image_cut", "cancel_download")
					},
					m = function(b) {
						var c = a.E(k);
						if (!c) {
							c = a.C("iframe");
							c.id = k;
							c.style.display = "none";
							a.core.util.hideContainer.appendChild(c)
						}
						c.src = f;
						d("tblog_image_cut", "download");
						i.hide()
					};
				a.addEvent(j.download, "click", m);
				a.addEvent(j.nodownload, "click", l);
				a.custEvent.add(i, "hide", function() {
					a.custEvent.remove(i, "hide", arguments.callee);
					a.removeEvent(j.download, "click", m);
					a.removeEvent(j.nodownload, "click", l);
					e()
				})
			},
			t = function() {
				b.beforeSupportTip();
				a.ui.alert(c("#L{微博截图功能暂未支持你的浏览器，目前微博截图插件支持Windows系统下的以下浏览器：IE浏览器，支持IE6及更新版本。IE内核浏览器，如360安全浏览器，傲游等浏览器。Firefox浏览器，支持3.6及更新版本。Chrome浏览器，支持4.0及更新版本。Chronium内核浏览器，如360急速浏览器，搜狗等浏览器}。"), {
					title: c("#L{暂不支持当前浏览器}"),
					OK: function() {
						setTimeout(function() {
							b.supportTipOk()
						}, 0)
					}
				});
				d("tblog_image_cut", "not_support_browser")
			},
			u = function() {
				var c = e ? "IE" : f ? "FF" : i ? "CHROME" : "";
				b = a.parseParam({
					captureType: "base64",
					captureSuccess: a.funcEmpty,
					captureCancel: a.funcEmpty,
					captureError: a.funcEmpty,
					beforeUpload: a.funcEmpty,
					showPos: "default",
					beforeSupportTip: a.funcEmpty,
					supportTip: t,
					supportTipOk: a.funcEmpty,
					beforeIeInstallTip: a.funcEmpty,
					ieInstallTip: function() {
						b.beforeIeInstallTip();
						s(c, b.ieInstallTipOk)
					},
					ieInstallTipOk: a.funcEmpty,
					beforeInstallTip: a.funcEmpty,
					installTip: function() {
						b.beforeInstallTip();
						s(c, b.installTipOk)
					},
					installTipOk: a.funcEmpty
				}, b || {});
				var d = q.isSupport();
				if (!d) b.supportTip();
				else {
					var g = a.common.plugin.plugInstallState(l, m, n, o),
						h = g.getInstallState();
					o = g.instance;
					h === "installed" || h === "ieinstalled" ? r() : h === "ieneedUpdate" || h === "ieneedInstall" ? b.ieInstallTip() : h === "needInstall" && b.installTip()
				}
			};
		return {
			doit: u,
			hide: q.hide,
			focusWindow: q.focusWindow,
			abort: function() {
				try {
					g && g.abort()
				} catch (a) {}
			}
		}
	};
	return q
});
STK.register("kit.extra.getFlashVersion", function(a) {
	return function() {
		var a = "1",
			b = navigator;
		if (b.plugins && b.plugins.length) {
			for (var c = 0; c < b.plugins.length; c++) if (b.plugins[c] && b.plugins[c].name && b.plugins[c].name.indexOf("Shockwave Flash") != -1) {
				a = b.plugins[c].description.split("Shockwave Flash ")[1];
				break
			}
		} else if (window.ActiveXObject) for (var c = 10; c >= 2; c--) try {
			var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
			if (d) {
				a = c + ".0";
				break
			}
		} catch (e) {}
		return parseInt(a.split(".")[0])
	}
});
STK.register("kit.io.cssLoader", function(a) {
	var b = "",
		c = "http://img.t.sinajs.cn/t4/",
		d = "http://timg.sjs.sinajs.cn/t4/";
	if (typeof $CONFIG != "undefined") {
		c = $CONFIG.cssPath || c;
		b = $CONFIG.version || ""
	}
	var e = {};
	return function(f, g, h, i, j) {
		i = i || b;
		h = h ||
		function() {};
		var k = function(a, b) {
				var c = e[a] || (e[a] = {
					loaded: !1,
					list: []
				});
				if (c.loaded) {
					b(a);
					return !1
				}
				c.list.push(b);
				return c.list.length > 1 ? !1 : !0
			},
			l = function(a) {
				var b = e[a].list;
				for (var c = 0; c < b.length; c++) b[c](a);
				e[a].loaded = !0;
				delete e[a].list
			};
		if ( !! k(f, h)) {
			var m;
			j ? m = d + f : m = c + f + "?version=" + i;
			var n = a.C("link");
			n.setAttribute("rel", "Stylesheet");
			n.setAttribute("type", "text/css");
			n.setAttribute("charset", "utf-8");
			n.setAttribute("href", m);
			document.getElementsByTagName("head")[0].appendChild(n);
			var o = a.C("div");
			o.id = g;
			a.core.util.hideContainer.appendChild(o);
			var p = 3e3,
				q = function() {
					if (parseInt(a.core.dom.getStyle(o, "height")) == 42) {
						a.core.util.hideContainer.removeChild(o);
						l(f)
					} else if (--p > 0) setTimeout(q, 10);
					else {
						a.log(f + "timeout!");
						a.core.util.hideContainer.removeChild(o);
						delete e[f]
					}
				};
			setTimeout(q, 50)
		}
	}
});
STK.register("kit.extra.installFlash", function(a) {
	var b = a.kit.extra.language;
	return function(c) {
		c = a.parseParam({
			onHide: a.funcEmpty
		}, c);
		var d = '<div class="layer_version_upgrade"><dl class="point clearfix"><dt><span class="icon_versionup"></span></dt><dd><p class="S_txt1">#L{你的Flash版本过低，请安装更高版本的Flash插件后，再刷新页面重试}</p></dd></dl><div class="versionup_btn"><a class="btn_l" href="http://get.adobe.com/cn/flashplayer/" target="_blank"><img width="16" height="16" class="icon_install" title="" src="' + $CONFIG.imgPath + 'style/images/common/transparent.gif">' + '<span class="txt">#L{安装更新}</span></a><a class="btn_r" href="javascript:void(0);" onclick="window.location.reload()">' + ' <img width="16" height="16" class="icon_refreshpage" title="" src="' + $CONFIG.imgPath + 'style/images/common/transparent.gif">' + '<span class="txt">#L{刷新页面}</span></a></div>' + "</div>";
		a.kit.io.cssLoader("style/css/module/layer/layer_version_upgrade.css", "js_style_css_module_layer_layer_version_upgrade", function() {
			var e = a.ui.dialog();
			e.setTitle(b("#L{提示}"));
			var f = a.C("div");
			f.innerHTML = b(d);
			e.appendChild(f);
			f = null;
			e.show();
			e.setMiddle();
			a.custEvent.add(e, "hide", function() {
				a.custEvent.remove(e, "hide", arguments.callee);
				setTimeout(function() {
					c.onHide()
				}, 0)
			})
		})
	}
});
STK.register("common.bubble.image", function(a) {
	var b = window.$CONFIG,
		c = [];
	(function() {
		b && b.bigpipe === "true" && a.historyM && a.historyM.onpopstate(function(b, d) {
			if (d) {
				a.foreach(c, function(a) {
					a()
				});
				c = []
			}
		})
	})();
	return function(d, e) {
		var f, g = a.common.plugin.screenCapture,
			h = a.kit.extra.language,
			i = '<div node-type="outer"><div class="layer_send_pic" node-type="wrap"><div node-type="inner"><div class="profile_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a class="pftb_lk current S_line5 S_txt1 S_bg5" href="javascript:void(0);" node-type="tab">#L{本地上传}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a  class="pftb_lk S_line5 S_txt1 S_bg1" href="javascript:void(0);" node-type="tab">#L{推荐配图}</a></li></ul></div><div node-type="content"></div></div><div node-type="uploaded" style="display:none"><div class="laPic_tit"><span node-type="pName"></span><span class="right"></span></div><div node-type="picWrap" class="laPic_Pic"></div><div class="lapic_edit"><a class="beautify" href="javascript:void(0);" node-type="beautify" action-type="beautify" suda-data="key=meitu&value=v4||publish||editor"><span class="W_ico12 icon_edit"></span>#L{编辑}</a><a class="delete" href="javascript:void(0);" action-type="delete"><span class="W_ico12 ico_del"></span>#L{删除}</a></div></div></div><div node-type="flashPanel"></div>',
			j = '<#et uppic data><div node-type="uppic">    <div class="laPic_btnBox clearfix">        <div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" node-type="inputCover">                <span><em class="ico_one"></em>#L{单张图片}</span>                <form node-type="form" action-type="form" id="pic_upload" name="pic_upload" target="upload_target" enctype="multipart/form-data" method="POST" action="">                    <input class="input_f" type="file" hidefoucs="true" style="" node-type="fileBtn" name="pic1"/>                </form></a>        </div>        <div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" action-type="more" suda-data="key=meitu&value=v4||publish||more">                <span><em class="ico_ones"></em>#L{多张图片}</span>            </a>        </div>        <#if (data.supportCapture)><div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" action-type="screen_window" suda-data="key=tblog_image_cut&value=open_image_cut">                <span><em class="ico_screenshot"></em>#L{截屏上传}</span>            </a>        </div></#if>       <div class="laPic_btnmore">           <a href="javascript:void(0);" class="W_btn_e" action-type="face_sticker">               <span><em class="ico_bigface"></em>#L{大 头 贴}</span>           </a>       </div>       <div class="laPic_btnmore">           <a href="javascript:void(0);" class="W_btn_e" action-type="upload_album">               <span><em class="ico_toalbum"></em>#L{上传到相册}</span>           </a>       </div>    </div></div><div node-type="loading"  style="width:230px;display:none"><div class="laPic_con"><div class="W_loading"><span>#L{图片正在上传，请等待}...</span></div></div><div class="laPic_btn"><a href="javascript:void(0);" class="W_btn_b" action-type="cancel"><span>#L{取消上传}</span></a></div></div></#et>',
			k = '<p class="tab_kind S_link2"><span class="right"><a class="pre_d" action-type="prev" node-type="prev" href="javascript:void(0);"></a><a class="next" action-type="next" node-type="next" href="javascript:void(0);"></a></span><em node-type="categorys"></em></p><div node-type="loading"></div><div class="detail"><ul node-type="list" class="faces_magic_list clearfix"></ul><div node-type="page" class="W_pages_minibtn"></div></div>',
			l = '<div class="W_loading"><span>正在加载，请稍候...</span></div>',
			m = '<a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{item}">#{item}</a>',
			n = '<a href="javascript:void(0);"  onclick="return false;" action-type="category" action-data="category=#{item}" class="current S_txt1">#{item}</a>',
			o = '<li><a action-type="insertSmiley" action-data="url=#{thumb}&pid=#{picid}&value=#{value}" class="img" href="javascript:void(0);"><img src="#{thumb}" original="#{original}" title="#{value}" alt="#{phrase}" /></a><span title="#{value}"  action-type="insertSmiley" action-data="url=#{thumb}&pid=#{picid}&value=#{value}">#{phrase}</span></li>',
			p = '<a action-type="page" class="page S_bg1" action-data="num=#{number}" href="javascript:void(0);" >#{label}</a>',
			q = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);"  class="page S_txt1"  onclick="return false;">#{label}</a>',
			r = "",
			s = h("#L{默认}"),
			t = "#L{分享图片}",
			u = "##L{微博大头贴}#",
			v = 5,
			w = "weibo.com/",
			x, y, z, A, B, C, D, E, F, G, H, I, J = {},
			K = {
				page: 0,
				cache: null,
				cPoniter: 0,
				categorys: [],
				currentCategory: s,
				itemNumber: 10
			},
			L, M, N = a.core.dom.position,
			O = a.core.evt.addEvent,
			P = a.core.evt.removeEvent,
			Q = function() {
				z = R;
				a.custEvent.define(J, ["uploaded", "hide", "insert", "deletePIC", "picLoad"]);
				a.custEvent.add(f, "hide", function(b) {
					return function() {
						R.abortUpload();
						R.hideCapture();
						a.custEvent.remove(b, "hide", arguments.callee);
						a.custEvent.fire(J, "hide", {});
						F = 0
					}
				}(f));
				a.ui.mod.tab(x, {
					evtType: "click",
					tNodes: '[node-type="tab"]',
					className: "current",
					removeClassNames: "pftb_lk S_line5 S_txt1 S_bg1",
					addClassNames: "pftb_lk current S_line5 S_txt1 S_bg5",
					cb: [R.init, S.init]
				});
				I = a.core.evt.delegatedEvent(x);
				R.bind()
			},
			R = {
				abortUpload: function() {
					C && C.abort();
					D && D.abort()
				},
				init: function() {
					z = R;
					R.initDom();
					R.bind()
				},
				initDom: function() {
					var b;
					L.wrap.className = "layer_send_pic";
					var c = {
						supportCapture: !0
					};
					L.content.innerHTML = h(a.core.util.easyTemplate(j, c).toString());
					L.close = f.getDomList().close[0];
					b = a.kit.dom.parseDOM(a.core.dom.builder(x).list);
					L = a.kit.extra.merge(L, b);
					R.exchangeInput()
				},
				bind: function() {
					O(L.fileBtn, "change", T.upload);
					O(L.fileBtn, "click", R.hideCapture);
					I.add("delete", "click", R.deletePic);
					I.add("cancel", "click", R.cancelUpload);
					I.add("more", "click", R.morePic);
					I.add("beautify", "click", R.beautify);
					I.add("screen_window", "click", R.captureWindow);
					I.add("face_sticker", "click", R.faceSticker);
					I.add("upload_album", "click", R.uploadAblum)
				},
				destroy: function() {
					L.fileBtn && P(L.fileBtn, "click", R.hideCapture);
					L.fileBtn && P(L.fileBtn, "change", T.upload)
				},
				handleError: function(b) {
					R.stopUpload();
					f.stopBoxClose();
					R.resetInput();
					a.ui.alert(h(b.msg), {
						OK: function() {
							b.code == 1 && window.location.reload();
							setTimeout(function() {
								f.startBoxClose()
							}, 0)
						}
					})
				},
				handleSucc: function(a) {
					R.rendSucc(a);
					R.stopUpload()
				},
				rendLoad: function() {
					f.stopBoxClose();
					L.uppic.style.display = "none";
					L.loading.style.display = ""
				},
				rendSucc: function(b) {
					var c = a.common.extra.imageURL(b.pid),
						d = [],
						e, f;
					H = H || b.pid;
					d = H.split(/\/|\\/);
					e = d[d.length - 1];
					d = e.split(".");
					if (d.length > 1 && a.bLength(d[0]) > 20) {
						d[0] = a.leftB(d[0], 20);
						f = [d[0], "...", d[1]].join("")
					} else f = e;
					B = b.pid;
					T.loadPic({
						url: c,
						value: f,
						pid: b.pid
					});
					L.beautify && (L.beautify.style.display = "")
				},
				deletePic: function() {
					a.preventDefault();
					L.close.style.display = "";
					L.inner.style.display = "";
					L.wrap.style.width = "";
					L.uploaded.style.display = "none";
					L.picWrap.innerHTML = "";
					z.destroy();
					z.init();
					f.startBoxClose();
					a.custEvent.fire(J, "deletePIC", {
						text: h(G)
					});
					F = 0
				},
				stopUpload: function() {
					L.loading.style.display = "none";
					L.uppic.style.display = ""
				},
				cancelUpload: function() {
					R.abortUpload();
					R.stopUpload();
					R.resetInput();
					f.startBoxClose()
				},
				exchangeInput: function() {
					var b = L.fileBtn,
						c = b.parentNode,
						d = b.className,
						e = b.name,
						f = a.C("input");
					f.className = d;
					f.name = e;
					f.type = "file";
					f.hideFocus = "true";
					L.fileBtn = f;
					c.removeChild(b);
					c.appendChild(f)
				},
				resetInput: function() {
					P(L.fileBtn, "click", R.hideCapture);
					P(L.fileBtn, "change", T.upload);
					R.exchangeInput();
					O(L.fileBtn, "change", T.upload);
					O(L.fileBtn, "click", R.hideCapture)
				},
				beautifySucess: function(a) {
					H = a;
					R.handleSucc({
						pid: a
					})
				},
				faceStickerSucess: function(a) {
					F = 1;
					H = a;
					R.handleSucc({
						pid: a
					})
				},
				morePic: function() {
					R.uploadWaterMarkFlash({
						id: "photo_merge",
						swf: "SinaCollage.swf",
						width: 528,
						height: 470,
						sucess: R.beautifySucess
					})
				},
				faceSticker: function() {
					R.uploadWaterMarkFlash({
						id: "photo_facesticker",
						swf: "FacePhoto.swf",
						width: 568,
						height: 478,
						baseDir: "facesticker",
						sucess: R.faceStickerSucess
					})
				},
				uploadWaterMarkFlash: function(c) {
					a.preventDefault();
					R.hideCapture();
					f.stopBoxClose();
					if (a.kit.extra.getFlashVersion() < 10) a.kit.extra.installFlash({
						onHide: function() {
							f.startBoxClose()
						}
					});
					else {
						var d = function(d) {
								var e = d.nickname != "0" || d.logo != "0" || d.domain != "0",
									g = b && b.nick || "",
									h = "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&marks=" + (e ? "1" : "0") + (d.logo == "1" ? "&logo=1" : "") + (d.nickname == "1" ? "&nick=" + (g ? encodeURIComponent("@" + g) : "") : "") + (d.domain == "1" ? "&url=" + w + (b && b.watermark || b.domain) : "") + (d.position ? "&markpos=" + d.position : "") + "&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1",
									i = {
										id: c.id,
										pos: f.getPosition(),
										service: h,
										sucess: c.sucess,
										h: c.height,
										w: c.width,
										swf: c.swf,
										baseDir: c.baseDir || ""
									};
								a.common.flash.imgUpload(i, {
									init: function(a, b) {
										a.setPars()
									},
									close: function(a, b) {
										setTimeout(function() {
											f.startBoxClose()
										}, 100)
									}
								}).show()
							};
						a.kit.extra.watermark(function(a) {
							d(a)
						})
					}
				},
				beautify: function() {
					a.preventDefault();
					if (a.kit.extra.getFlashVersion() < 10) a.kit.extra.installFlash();
					else {
						var b = {
							id: "photo_editor",
							pos: f.getPosition(),
							service: "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1",
							sucess: R.beautifySucess,
							h: 385,
							w: 528,
							swf: "PhotoEditor.swf"
						};
						a.common.flash.imgUpload(b, {
							init: function(b, c) {
								b.setPars(a.common.extra.imageURL(B, {
									size: "large"
								}))
							},
							close: function(a, b) {}
						}).show()
					}
				},
				hideCapture: function() {
					D && D.hide()
				},
				captureWindow: function() {
					a.preventDefault();
					if (!D) {
						var b = function() {
								f.stopBoxClose()
							},
							c = function() {
								f.startBoxClose()
							};
						D = g.screenCapture({
							captureType: "pid",
							beforeUpload: R.beforeCaptureUpload,
							captureSuccess: R.captureSuccess,
							captureError: R.handleError,
							beforeSupportTip: b,
							supportTipOk: c,
							beforeIeInstallTip: b,
							ieInstallTipOk: c,
							beforeInstallTip: b,
							installTipOk: c
						})
					}
					D.doit()
				},
				beforeCaptureUpload: function() {
					R.rendLoad()
				},
				captureSuccess: function(a) {
					H = a.imgName;
					E = 1;
					R.handleSucc(a)
				},
				uploadAblum: function() {
					window.open("http://photo.weibo.com/upload/weibo", "", "width=650, height=470, top=300, left=400")
				}
			},
			S = {
				init: function() {
					z = S;
					R.abortUpload();
					R.hideCapture();
					var b;
					L.wrap.className = "layer_faces";
					R.destroy();
					L.content.innerHTML = h(k);
					b = a.kit.dom.parseDOM(a.core.dom.builder(x).list);
					L = a.kit.extra.merge(L, b);
					L.loading.innerHTML = h(l);
					S.cartoonStart();
					S.bind()
				},
				bind: function() {
					I.add("insertSmiley", "click", function(a) {
						STK.core.evt.preventDefault();
						L.beautify && (L.beautify.style.display = "none");
						var b = a.data.url,
							c = a.data.pid,
							d = a.data.value;
						T.loadPic({
							url: b,
							value: d,
							pid: c
						})
					});
					I.add("category", "click", function(a) {
						K.page = 0;
						K.currentCategory = a.data.category;
						S.rend();
						setTimeout(function() {
							S.rendCategory(K);
							S.rendPage(K)
						}, 0)
					});
					I.add("prev", "click", function(b) {
						a.preventDefault(b.evt);
						var c = K.cPoniter;
						if (c <= 0) return !1;
						K.cPoniter -= v;
						S.rendCategory(K)
					});
					I.add("next", "click", function(b) {
						a.preventDefault(b.evt);
						var c = K.cPoniter,
							d = K.categorys;
						if (c >= d.length - v) return !1;
						K.cPoniter += v;
						S.rendCategory(K)
					});
					I.add("page", "click", function(a) {
						K.page = parseInt(a.data.num, 10);
						S.rend();
						setTimeout(function() {
							S.rendPage(K)
						}, 0);
						return STK.preventDefault(a.evt)
					})
				},
				cartoonStart: function() {
					a.common.trans.editor.getTrans("cartoon", {
						onSuccess: function(a, b) {
							K.cache = a.data.more || {};
							K.categorys = [s];
							for (var c in K.cache) K.categorys.push(c);
							K.cache[s] = a.data.usual.norm;
							S.cartoonStart = function() {
								K.page = 0;
								K.cPoniter = 0;
								K.currentCategory = s;
								S.rend();
								S.rendCategory(K);
								S.rendPage(K)
							};
							S.cartoonStart()
						}
					}).request({})
				},
				rend: function(b, c) {
					var d = K.currentCategory,
						e = K.cache[d],
						f = K.page,
						g = K.itemNumber;
					e = e.slice(f * g, f * g + g);
					e = a.foreach(e, function(b, c) {
						a.bLength(b.phrase) > 8 && (b.phrase = [a.leftB(b.phrase, 6), "..."].join(""));
						return a.templet(h(o), b)
					});
					L.loading.innerHTML = "";
					L.list.innerHTML = e.join("")
				},
				rendCategory: function(b) {
					var c = b.cPoniter,
						d = b.categorys,
						e = b.currentCategory,
						f = d.slice(c, c + v);
					f = a.foreach(f, function(b, c) {
						return e === b ? a.templet(h(n), {
							item: b
						}) : a.templet(h(m), {
							item: b
						})
					});
					L.categorys.innerHTML = f.join(r);
					c + 6 >= d.length ? L.next.className = "next_d" : L.next.className = "next";
					c <= 0 ? L.prev.className = "pre_d" : L.prev.className = "pre"
				},
				rendPage: function(b) {
					var c = b.page,
						d = b.cache[b.currentCategory],
						e = d.length / b.itemNumber,
						f = [];
					for (var g = 0; g < e; g += 1) c == g ? f.push(a.templet(h(q), {
						number: g,
						label: g + 1
					})) : f.push(a.templet(h(p), {
						number: g,
						label: g + 1
					}));
					L.page.innerHTML = f.join("")
				},
				destroy: function() {}
			},
			T = {
				trans: function() {
					C && C.destroy();
					C = a.kit.extra.upload({
						type: "common",
						form: L.form,
						imgName: H,
						app: 1001
					});
					a.custEvent.add(C, "uploadSucc", function(a, b) {
						R.handleSucc(b)
					});
					a.custEvent.add(C, "uploadError", function(a, b) {
						R.handleError(b)
					})
				},
				upload: function() {
					H = L.fileBtn.value;
					if (a.core.str.trim(H) !== "") {
						R.rendLoad();
						T.trans()
					}
				},
				loadPic: function(b) {
					L.picWrap.innerHTML = "";
					var c = b.url,
						d = L.close,
						e = a.C("img");
					b.value && (L.pName.innerHTML = b.value);
					E && (e.onload = function() {
						window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_image_cut", "succeed_image_cut")
					});
					E = 0;
					e.src = c;
					f.stopBoxClose();
					G = F ? u : t;
					a.core.evt.custEvent.fire(J, "uploaded", {
						text: h(G),
						pid: b.pid
					});
					L.wrap.style.display = "";
					L.wrap.className = "layer_send_pic";
					L.wrap.style.width = "240px";
					L.inner.style.display = "none";
					L.uploaded.style.display = "";
					d.style.display = "none";
					L.picWrap.appendChild(e)
				}
			},
			U = {};
		J = {};
		J.getBub = function() {
			return f
		};
		if (!a.isNode(d)) throw "common.bubble.image need el as first parameter!";
		M = window.location.href;
		L = a.kit.dom.parseDOM(a.core.dom.builder(h(i)).list);
		x = L.outer;
		f = a.ui.bubble();
		R.initDom();
		if (e && e.pid) {
			var V = a.common.extra.imageURL(e.pid);
			T.loadPic({
				url: V,
				pid: e.pid
			})
		}
		Q();
		f.setContent(x);
		e.fail = function() {
			f.setLayout(d, {
				offsetX: -24,
				offsetY: 5
			})
		};
		f.setAlignPos(d, e.refer, e);
		J.bubble = f;
		f.show();
		c.push(function() {
			f && f.hide()
		});
		return J
	}
});
STK.register("common.editor.widget.image", function(a) {
	return function(b) {
		a.log(b);
		var c = {},
			d, e, f, g, h, i = function(a, b) {
				d.API.insertText(b.value);
				e.getBub().hide()
			},
			j = function(b, c) {
				a.log("upload");
				var e = d.API.getWords();
				e.length == 0 && d.API.insertText(c.text);
				d.API.addExtraInfo(c.pid);
				g = !0
			},
			k = function(a, b) {
				d.API.delWords(b.text);
				d.API.addExtraInfo("");
				clearInterval(h)
			},
			l = function(b) {
				if (!g) {
					a.core.evt.preventDefault();
					var c = d.nodeList.textEl;
					if (typeof b == "string") {
						e = a.common.bubble.image(d.nodeList[f], {
							pid: b,
							refer: c,
							arrowOffset: -5
						});
						a.log("has pid");
						h = setInterval(function() {
							e.bubble.setLayout(d.nodeList[f], {
								offsetX: -29,
								offsetY: 5
							})
						}, 200)
					} else e = a.common.bubble.image(d.nodeList[f], {
						refer: c,
						arrowOffset: -5
					});
					a.custEvent.add(e, "uploaded", j);
					a.log(2222);
					a.custEvent.add(e, "insert", i);
					a.custEvent.add(e, "deletePIC", k);
					a.custEvent.add(e, "hide", function() {
						a.custEvent.remove(e, "hide", arguments.callee);
						a.custEvent.remove(e, "uploaded", j);
						a.custEvent.remove(e, "insert", i);
						a.custEvent.remove(e, "deletePIC", k);
						a.custEvent.remove(e, "changeType");
						g = !1
					})
				}
			};
		c.init = function(b, c, e) {
			d = b;
			f = c;
			a.addEvent(b.nodeList[f], "click", l);
			e && e.pid && l(e.pid)
		};
		c.clear = function() {};
		c.show = function() {};
		c.hide = function() {
			e && e.getBub().hide()
		};
		c.resetBubble = function(a) {
			if (e) {
				var b = {
					fail: function() {
						e.bubble.setLayout(a, {
							offsetX: -29,
							offsetY: 5
						})
					},
					arrowOffset: -5
				};
				e.bubble.setAlignPos(a, d.nodeList.textEl, b)
			}
		};
		c.destroy = function() {
			d = null
		};
		return c
	}
});
STK.register("common.trans.feed", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("publish", {
		url: "/aj/mblog/add?_wv=5",
		method: "post"
	});
	c("delete", {
		url: "/aj/mblog/del?_wv=5",
		method: "post"
	});
	c("forward", {
		url: "/aj/mblog/forward?_wv=5",
		method: "post"
	});
	c("mediaShow", {
		url: "http://api.weibo.com/widget/show.jsonp",
		varkey: "jsonp",
		method: "get",
		requestMode: "jsonp"
	});
	c("qingShow", {
		url: "http://api.t.sina.com.cn/widget/show.json?source=3818214747",
		varkey: "callback",
		method: "get",
		requestMode: "jsonp"
	});
	c("profileSearch", {
		url: "/aj/mblog/mbloglist?_wv=5",
		method: "get"
	});
	c("homeSearch", {
		url: "/aj/mblog/fsearch?_wv=5",
		method: "get"
	});
	c("groupSearch", {
		url: "/aj/relation/status?_wv=5",
		method: "get"
	});
	c("sendMeSearch", {
		url: "/aj/mblog/sendme?_wv=5",
		method: "get"
	});
	c("atMeSearch", {
		url: "/aj/at/mblog/list?_wv=5",
		method: "get"
	});
	c("atMeShield", {
		url: "/aj/at/mblog/shield?_wv=5",
		method: "post"
	});
	c("widget", {
		url: "/aj/mblog/showinfo?_wv=5",
		method: "post"
	});
	c("third_rend", {
		url: "/aj/mblog/renderfeed?_wv=5",
		method: "post"
	});
	c("feedShield", {
		url: "/aj/user/block?_wv=5",
		method: "post"
	});
	c("feedTagList", {
		url: "/aj/mblog/tag/mytaglist?_wv=5",
		method: "post"
	});
	c("feedTagListHtml", {
		url: "/aj/mblog/tag/list?_wv=5",
		method: "get"
	});
	c("feedTagUpdate", {
		url: "/aj/mblog/tag/updatetags?_wv=5",
		method: "post"
	});
	c("feedTagDel", {
		url: "/aj/mblog/tag/destroy?_wv=5",
		method: "post"
	});
	c("feedTagEdit", {
		url: "/aj/mblog/tag/update?_wv=5",
		method: "post"
	});
	c("getAtmeComment", {
		url: "/aj/at/comment/comment?_wv=5",
		method: "get"
	});
	c("getAtmeBlog", {
		url: "/aj/at/mblog/mblog?_wv=5",
		method: "get"
	});
	c("getCommonComent", {
		url: "/aj/commentbox/common?_wv=5",
		method: "get"
	});
	c("getAttiudeList", {
		url: "/aj/attiudebox/in?_wv=5",
		method: "get"
	});
	c("memberTopFeed", {
		url: "/aj/mblog/markmembermblog?_wv=5",
		method: "post"
	});
	c("activityDelete", {
		url: "/aj/activities/del?_wv=5",
		method: "post"
	});
	c("activityShield", {
		url: "/aj/activities/block?_wv=5",
		method: "post"
	});
	c("common_media", {
		url: "http://api.weibo.com/widget/object_render.jsonp?source=3818214747",
		varkey: "callback",
		method: "get",
		requestMode: "jsonp"
	});
	c("showblock", {
		url: "/aj/blockword/showblock?_wv=5",
		method: "get"
	});
	c("update", {
		url: "/aj/blockword/update?_wv=5",
		method: "get"
	});
	c("showfiltermblogs", {
		url: "/aj/mblog/showfiltermblogs?_wv=5",
		method: "get"
	});
	c("refreshRecommend", {
		url: "/aj/mblog/recfeed?_wv=5",
		method: "get"
	});
	c("closeRecommend", {
		url: "/aj/mblog/recfeedclose?_wv=5",
		method: "get"
	});
	c("translate", {
		url: "/aj/mblog/translation?_wv=5",
		method: "get"
	});
	c("adShield", {
		url: "/aj/user/blockad?_wv=5",
		method: "post"
	});
	c("recmodlayer", {
		url: "/aj/photo/recomlayer?_wv=5",
		method: "get"
	});
	c("setAD", {
		url: "/aj/proxy/adclickserve?_wv=5",
		method: "post"
	});
	c("feedViews", {
		url: "/aj/vtasks/recom?_wv=5",
		method: "post"
	});
	return b
});
STK.register("common.channel.feed", function(a) {
	var b = ["forward", "publish", "comment", "delete", "refresh", "reply", "feedTagUpdate", "feedTagMoreUpdate", "qfaceAdd", "qfaceCount"];
	return a.common.listener.define("common.channel.feed", b)
});
STK.register("common.extra.shine", function(a) {
	var b = function(a) {
			return a.slice(0, a.length - 1).concat(a.concat([]).reverse())
		};
	return function(c, d) {
		var e = a.parseParam({
			start: "#fff",
			color: "#fbb",
			times: 2,
			step: 5,
			length: 4
		}, d),
			f = e.start.split(""),
			g = e.color.split(""),
			h = [];
		for (var i = 0; i < e.step; i += 1) {
			var j = f[0];
			for (var k = 1; k < e.length; k += 1) {
				var l = parseInt(f[k], 16),
					m = parseInt(g[k], 16);
				j += Math.floor(parseInt(l + (m - l) * i / e.step, 10)).toString(16)
			}
			h.push(j)
		}
		for (var i = 0; i < e.times; i += 1) h = b(h);
		var n = !1,
			o = a.timer.add(function() {
				if (!h.length) a.timer.remove(o);
				else {
					if (n) {
						n = !1;
						return
					}
					n = !0;
					c.style.backgroundColor = h.pop()
				}
			})
	}
});
STK.register("common.trans.validateCode", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("checkValidate", {
		url: "/aj/pincode/verified?_wv=5",
		method: "post"
	});
	return b
});
STK.register("common.dialog.validateCode", function(a) {
	var b = window.$LANG,
		c = a.kit.extra.language,
		d = "/aj/pincode/pin?_wv=5&type=rule&lang=" + $CONFIG.lang + "&ts=",
		e = {
			dialog_html: '<div class="layer_veriyfycode"><div class="v_image"><img height="50" width="450" class="yzm_img" /></div><p class="v_chng"><a href="#" onclick="return false;" class="yzm_change" action-type="yzm_change">#L{换另一组题目}</a></p><p class="v_ans_t">#L{请输入上面问题的答案}：</p><p class="v_ans_i"><input type="text" class="W_inputStp v_inp yzm_input ontext" action-type="yzm_input"/><div class="M_notice_del yzm_error" style="display:none;"><span class="icon_del"></span><span class="txt"></span></div></p><p class="v_btn"><a class="W_btn_d yzm_submit" href="#" action-type="yzm_submit"><span>#L{确定}</span></a><a class="W_btn_b yzm_cancel" href="#" action-type="yzm_cancel" action-data="value=frombtn"><span>#L{取消}</span></a></p></div>'
		},
		f;
	return function() {
		if (f) return f;
		var b = {},
			g = {},
			h, i, j, k, l = function() {
				g.yzm_error.innerHTML = "";
				g.yzm_error.parentNode.style.display = "none"
			},
			m = function(a) {
				g.yzm_error.innerHTML = a;
				g.yzm_error.parentNode.style.display = ""
			},
			n = function() {
				a.kit.io.cssLoader("style/css/module/layer/layer_verifycode.css", "js_style_css_module_layer_layer_verifycode", function() {
					h || o();
					l();
					h.show();
					t.changesrc();
					h.setMiddle();
					g.input_text.value = "";
					a.hotKey.add(document.documentElement, ["esc"], t.closeDialog, {
						type: "keyup",
						disableInInput: !0
					})
				})
			},
			o = function() {
				h = a.ui.dialog({
					isHold: !0
				});
				h.setTitle(c("#L{请输入验证码}"));
				h.setContent(c(e.dialog_html));
				var b = h.getOuter();
				s(b);
				u()
			},
			p = a.common.trans.validateCode.getTrans("checkValidate", {
				onError: function() {
					m(c("#L{验证码错误}"));
					t.changesrc();
					j = !1;
					g.input_text.value = ""
				},
				onFail: function() {
					m(c("#L{验证码错误}"));
					t.changesrc();
					g.input_text.value = "";
					j = !1
				},
				onSuccess: function(b, c) {
					var d = b.data.retcode;
					l();
					g.input_text.value = "";
					h.hide();
					var e = i.requestAjax,
						f = a.kit.extra.merge(i.param, {
							retcode: d
						});
					e.request(f);
					j = !1
				}
			}),
			q = function() {},
			r = function() {},
			s = function(b) {
				g.vImg = a.core.dom.sizzle("img.yzm_img", b)[0];
				g.yzm_change = a.core.dom.sizzle("a.yzm_change", b)[0];
				g.yzm_submit = a.core.dom.sizzle("a.yzm_submit", b)[0];
				g.yzm_cancel = a.core.dom.sizzle("a.yzm_cancel", b)[0];
				g.input_text = a.core.dom.sizzle("input.yzm_input", b)[0];
				g.yzm_error = a.core.dom.sizzle("div.yzm_error span.txt", b)[0];
				g.close_icon = h.getDom("close")
			},
			t = {
				enter: function() {
					a.fireEvent(g.yzm_submit, "click")
				},
				changesrc: function() {
					var b = d + a.getUniqueKey();
					g.vImg.setAttribute("src", b);
					try {
						g.yzm_change.blur()
					} catch (c) {}
				},
				checkValidateCode: function() {
					l();
					var b = a.core.str.trim(g.input_text.value);
					if (!b) m(c("#L{请输入验证码}"));
					else if (!j) {
						j = !0;
						p.request({
							secode: b,
							type: "rule"
						})
					}
					try {
						g.yzm_submit.blur()
					} catch (d) {}
				},
				closeDialog: function(b) {
					typeof b == "object" && b.el && h.hide();
					typeof i == "object" && i.onRelease && typeof i.onRelease == "function" && i.onRelease();
					a.hotKey.remove(document.documentElement, ["esc"], t.closeDialog, {
						type: "keyup"
					});
					try {
						a.preventDefault()
					} catch (c) {}
				},
				onFocus: function(b) {
					b = a.core.evt.getEvent();
					var c = b.target || b.srcElement,
						d = c.value;
					d || l()
				}
			},
			u = function() {
				var b = h.getOuter();
				k = a.core.evt.delegatedEvent(b);
				k.add("yzm_change", "click", function() {
					t.changesrc();
					a.preventDefault()
				});
				k.add("yzm_submit", "click", function() {
					t.checkValidateCode();
					a.preventDefault()
				});
				k.add("yzm_cancel", "click", t.closeDialog);
				a.core.evt.addEvent(g.close_icon, "click", t.closeDialog);
				a.core.evt.addEvent(g.input_text, "focus", t.onFocus);
				a.core.evt.addEvent(g.input_text, "blur", t.onFocus);
				a.hotKey.add(g.input_text, ["enter"], t.enter, {
					type: "keyup"
				})
			},
			v = function() {
				if (h) {
					k.destroy();
					a.core.evt.removeEvent(g.close_icon, "click", t.closeDialog);
					a.core.evt.removeEvent(g.input_text, "focus", t.onFocus);
					a.core.evt.removeEvent(g.input_text, "blur", t.onFocus);
					h && h.destroy && h.destroy()
				}
				h = f = null
			},
			w = function(a, b, c) {
				if (a.code == "100027") {
					i = c;
					n()
				} else if (a.code === "100000") try {
					var d = c.onSuccess;
					d && d(a, b)
				} catch (e) {} else try {
					if (a.code === "100002") {
						window.location.href = a.data;
						return
					}
					var d = c.onError;
					d && d(a, b)
				} catch (e) {}
			};
		r();
		r = null;
		b.destroy = v;
		b.validateIntercept = w;
		b.addUnloadEvent = function() {
			h && a.core.evt.addEvent(window, "unload", v)
		};
		f = b;
		return b
	}
});
STK.register("common.trans.group", function(a) {
	var b = a.kit.io.inter(),
		c = b.register;
	c("add", {
		url: "/aj/f/group/add?_wv=5",
		method: "post"
	});
	c("modify", {
		url: "/aj/relation/rename?_wv=5",
		method: "post"
	});
	c("del", {
		url: "/aj/relation/delete?_wv=5",
		method: "post"
	});
	c("info", {
		url: "/aj/f/group/getgroupinfo?_wv=5",
		method: "get"
	});
	c("set", {
		url: "/aj3/attention/aj_group_update_v4.php",
		method: "post"
	});
	c("batchSet", {
		url: "/aj3/attention/aj_group_batchupdate_v4.php",
		method: "post"
	});
	c("list", {
		url: "/aj/f/group/list?_wv=5",
		method: "get"
	});
	c("order", {
		url: "/aj/f/group/order?_wv=5",
		method: "post"
	});
	c("listbygroup", {
		url: "/aj/f/attchoose?_wv=5",
		method: "post"
	});
	c("infolist", {
		url: "/aj/f/attfilterlist?_wv=5",
		method: "get"
	});
	c("orientGroup", {
		url: "/aj/f/group/groupmembers?_wv=5",
		method: "get"
	});
	c("recommendfollow", {
		url: "/aj3/recommend/aj_addrecommend.php",
		method: "post"
	});
	c("groupupdate", {
		url: "/aj/relation/groupupdate?_wv=5",
		method: "post"
	});
	c("unInterest", {
		url: "/aj/f/group/notinterest?_wv=5",
		method: "post"
	});
	c("editdesc", {
		url: "/aj/f/group/editdesc?_wv=5",
		method: "post"
	});
	c("update", {
		url: "/aj/f/group/update?_wv=5",
		method: "post"
	});
	c("followgroup", {
		url: "/aj/f/group/followgroup?_wv=5",
		method: "post"
	});
	c("getGroupDesc", {
		url: "/aj/f/group/getdesc?_wv=5",
		method: "get"
	});
	c("closebubble", {
		url: "/aj/bubble/closebubble?_wv=5",
		method: "get"
	});
	return b
});
STK.register("kit.extra.actionData", function(a) {
	return function(b) {
		return {
			set: function(c, d) {
				if ( !! a.isNode(b)) {
					var e = a.queryToJson(b.getAttribute("action-data") || "") || {};
					e[c] = d;
					b.setAttribute("action-data", a.jsonToQuery(e))
				}
			},
			del: function(c) {
				if ( !! a.isNode(b)) {
					var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
					delete d[c];
					b.setAttribute("action-data", a.jsonToQuery(d))
				}
			},
			get: function(c) {
				if (!a.isNode(b)) return "";
				var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
				return d[c] || ""
			}
		}
	}
});
STK.register("kit.dom.outerHeight", function(a) {
	return function(b) {
		if (!a.core.dom.isNode(b)) throw "Parameter must be an HTMLEelement!";
		return a.core.dom.getSize(b).height + (parseFloat(a.core.dom.getStyle(b, "marginTop")) || 0) + (parseFloat(a.core.dom.getStyle(b, "marginBottom")) || 0)
	}
});
STK.register("common.extra.keyboardCapture", function(a) {
	var b = {
		13: "enter",
		27: "esc",
		32: "space",
		38: "up",
		40: "down",
		9: "tab"
	};
	return function(c, d) {
		d = d || {};
		var e = {},
			f, g = {
				keydown: function(c) {
					d.stopScroll && a.stopEvent();
					var f, g; !! (f = c) && !! (g = f.keyCode) && b[g] && a.custEvent.fire(e, b[g])
				}
			},
			h = {
				init: function() {
					h.pars();
					h.bind()
				},
				pars: function() {},
				bind: function() {
					for (var b in g) a.addEvent(c, b, g[b])
				},
				getKey: function(a) {
					return b[a]
				},
				destroy: function() {
					for (var b in g) a.removeEvent(c, b, g[b])
				}
			};
		h.init();
		e.getKey = h.getKey;
		e.destroy = h.destroy;
		return e
	}
});
STK.register("common.editor.plugin.publishTo", function(a) {
	var b = a.kit.extra.language,
		c = a.core.util.templet,
		d = a.core.util.easyTemplate,
		e;
	return function(c) {
		var d, f, g = c && c.editorWrapEl,
			h = c && c.textEl,
			i = {},
			j = [],
			k, l = {},
			m, n, o = function() {
				if (!a.isNode(g)) throw "publishTo need a wrapper node to parseDOM"
			},
			p = a.getUniqueKey(),
			q = function(a) {
				var b = [],
					c;
				b.push('<div style="position: absolute;display:none;z-index:29999;outline:none;" hideFocus="true" node-type="publishTo" class="layer_menu_list" tabindex="10">');
				b.push('<ul id="' + p + '">');
				b.push('<li><a title="#L{公开-你发表的微博可以被大家公开查看哦}" suda-data="key=tblog_edit_exposure&value=edit_public" href="javascript:void(0)" action-data="rank=0&text=#L{公开}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_public"></i>#L{公开}</a></li>');
				b.push($CONFIG.miyou === 1 ? '<li><a title="#L{密友圈-发表的微博只有你的密友才能看到}" href="javascript:void(0)" action-data="rank=2&text=#L{密友圈}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_close_friend"></i>#L{密友圈}</a></li>' : "");
				b.push('<li><a title="#L{仅自己可见-发表的微博只有自己才能看到}" suda-data="key=tblog_edit_exposure&value=edit_private" href="javascript:void(0)" action-data="rank=1&text=#L{仅自己可见}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_private"></i>#L{仅自己可见}</a></li>');
				b.push('<li class="line"></li>');
				b.push('<li><a action-type="more" href="javascript:void(0);"><i class="W_ico16 i_conn_list"></i>#L{分组可见}</a></li>');
				b.push("</ul></div>");
				return b.join("")
			},
			r = function(a) {
				var b = [],
					c = a.length,
					d;
				c > 8 ? b.push('<ul class="scroll_bar" style="width:110px;" id="' + p + '">') : b.push('<ul class="scroll_bar" style="height:auto;width:110px;" id="' + p + '">');
				for (var e = 0; e < c; e++) {
					d = a[e];
					b.push('<li><a action-type="publishTo" action-data="rank=3&text=' + d.gname + "&rankid=" + d.gid + '" title="' + d.gname + '" href="javascript:void(0);" onclick="return false;"><i class="W_ico16 i_conn_list"></i>' + d.gname + "</a></li>")
				}
				b.push("</ul>");
				b.push('<ul><li class="line"></li>');
				b.push('<li class="opt"><a href="javascript:void(0)" onclick="return false;" action-type="back">#L{返回}</a></li>');
				b.push("</ul>");
				return b.join("")
			},
			s = function() {
				f = a.kit.dom.parseDOM(a.builder(g).list);
				f.wrap || (f.wrap = g);
				n = f.wrap.className
			},
			t = function() {
				d = function() {
					var c = {},
						d, i, l, o, s = f.showPublishTo;
					i = d = s && s.getAttribute("action-data") && a.core.json.queryToJson(s.getAttribute("action-data")) || {
						rank: "all",
						rankid: ""
					};
					c.node = a.core.evt.delegatedEvent(g);
					var t = !1,
						u = {
							hotKeyChangeRank: function(c, f) {
								var g = f.match(/\d+/);
								if (g && g[0]) {
									var h = parseInt(g[0], 10) - 1,
										i = [{
											rank: 0,
											rankid: "",
											text: b("#L{公开}"),
											title: b("#L{公开-你发表的微博可以被大家公开查看哦}")
										}, {
											rank: 2,
											rankid: "",
											text: b("#L{密友圈}"),
											title: b("#L{密友圈-发表的微博只有你的密友才能看到}")
										}, {
											rank: 1,
											rankid: "",
											text: b("#L{仅自己可见}"),
											title: b("#L{仅自己可见-发表的微博只有自己才能看到}")
										}],
										j = function() {
											a.foreach(k, function(a) {
												a.rank = 3;
												a.rankid = a.gid;
												a.text = a.gname;
												a.title = a.gname
											});
											i = i.concat(k);
											var b = window.$CONFIG && window.$CONFIG.miyou == "1";
											b || i.splice(1, 1);
											if (i[h]) {
												d = i[h];
												z.btnContent(d.text);
												z.btnTitle(d.title);
												t = !1;
												a.custEvent.fire(z, "changeRank", d)
											}
										},
										k = function() {
											if (e) return a.core.arr.copy(e);
											A.group.request(function(b) {
												k = a.core.arr.copy(b);
												j()
											});
											return null
										}();
									k && j()
								}
							}
						},
						v = function() {
							c.node.add("showPublishTo", "click", z.show)
						},
						w = function() {
							A.normal.bind();
							A.group.bind();
							x.bind()
						},
						x = {
							keyboardManager: null,
							keyTypes: ["up", "down", "esc", "enter"],
							getIndex: function(b) {
								var c = x.getList(),
									d = x.lastCur,
									e;
								a.foreach(c, function(a, b) {
									if (d === a) {
										e = b;
										return !1
									}
								});
								b > 0 ? e++ : e--;
								e >= c.length ? e = 0 : e < 0 && (e = c.length - 1);
								return e
							},
							up: function() {
								var a = x.getIndex(-1),
									b = x.getList()[a];
								x.setCur(b, a)
							},
							down: function() {
								var a = x.getIndex(1),
									b = x.getList()[a];
								x.setCur(b, a)
							},
							enter: function() {
								var b = x.lastCur;
								b.getAttribute("action-type") || (b = a.sizzle("[action-type]", b)[0]);
								b && c.layer.fireDom(b, "click", null)
							},
							esc: function() {
								z.hide()
							},
							bind: function() {
								x.keyboardManager = a.common.extra.keyboardCapture(f.publishTo, {
									stopScroll: !0
								});
								a.custEvent.define(x.keyboardManager, x.keyTypes);
								for (var b = 0, c = x.keyTypes.length; b < c; b++) {
									var d = x.keyTypes[b];
									a.custEvent.add(x.keyboardManager, d, x[d])
								}
							},
							list: null,
							lastCur: null,
							focusPublishTo: function() {
								f.publishTo.focus();
								var a = this.getList(!0);
								this.setCur(a[0], 0)
							},
							setCur: function(b, c) {
								this.lastCur && a.removeClassName(this.lastCur, "cur");
								a.addClassName(b, "cur");
								this.lastCur = b;
								var d = a.E(p);
								if (a.contains(d, b)) {
									var e = a.kit.dom.outerHeight,
										f = c + 1,
										g = Math.max(e(b), e(a.sizzle("a", b)[0]));
									f > 7 ? d.scrollTop = (f - 7) * g : d.scrollTop = 0
								}
							},
							getList: function(b) {
								if (b || !this.list) {
									var c = a.sizzle("li", f.publishTo),
										d = [];
									a.foreach(c, function(b) {
										a.getStyle(b, "display") != "none" && b.className != "line" && d.push(b)
									});
									this.list = d
								}
								return this.list
							}
						},
						y = {
							setPos: function() {
								var b = a.core.dom.getSize,
									c = b(f.showPublishTo).width - b(f.publishTo).width;
								a.kit.dom.layoutPos(f.publishTo, f.showPublishTo, {
									offsetX: c + 2,
									offsetY: 2
								})
							},
							init: function() {
								c.layer = a.core.evt.delegatedEvent(f.publishTo);
								c.closeFriend = a.core.evt.delegatedEvent(f.publishTo)
							},
							setArrow: function(a) {
								var b = f.showPublishTo;
								!b || (a == "up" ? b.className = "W_arrow_turn" : a == "down" && (b.className = ""))
							},
							show: function() {
								a.foreach(a.sizzle("li", f.publishTo), function(b) {
									var c = a.sizzle("a", b)[0];
									if (c) {
										var e = a.kit.extra.actionData(c),
											f = e.get("rank"),
											g = e.get("rankid");
										d.rank != "3" ? d.rank == f && f != "" && a.setStyle(b, "display", "none") : d.rankid == g && a.setStyle(b, "display", "none")
									}
								});
								y.setPos();
								a.setStyle(f.publishTo, "display", "");
								x.focusPublishTo();
								y.setArrow("up");
								if (!k) {
									k = 1;
									y.bindBodyEvt()
								}
								return !1
							},
							hide: function() {
								a.setStyle(f.publishTo, "display", "none");
								t = !1;
								if (k) {
									k = 0;
									y.removeBodyEvt()
								}
							},
							autoHide: function(b) {
								b = a.core.evt.fixEvent(b);
								f.showPublishTo !== b.target && !a.core.dom.contains(f.showPublishTo, b.target) && !a.core.dom.contains(f.publishTo, b.target) && z.hide()
							},
							content: function(a) {
								if (typeof a == "undefined") return f.publishTo.innerHTML;
								f.publishTo.innerHTML = a
							},
							bindBodyEvt: function() {
								a.addEvent(document.body, "click", y.autoHide)
							},
							removeBodyEvt: function() {
								a.removeEvent(document.body, "click", y.autoHide)
							}
						},
						z = {
							enable: function() {
								f.showPublishTo.setAttribute("action-type", "showPublishTo")
							},
							disable: function() {
								f.showPublishTo.setAttribute("action-type", "")
							},
							miYouStyle: function(b, c) {
								var d = "2",
									e = $CONFIG.lang == "zh-cn" ? "" : "_CHT";
								d == c.rank ? a.core.dom.addClassName(f.wrap, "send_weibo_cf" + e) : a.core.dom.removeClassName(f.wrap, "send_weibo_cf" + e)
							},
							show: function() {
								var b = function() {
										a.custEvent.fire(z, "show");
										t ? A.group.show() : A.normal.show()
									};
								if (f.publishTo) {
									var c = a.getStyle(f.publishTo, "display");
									if (c === "none") b();
									else {
										a.setStyle(f.publishTo, "display", "none");
										t = !1;
										y.setArrow("down")
									}
								} else b();
								a.preventDefault()
							},
							btnContent: function(a) {
								a && (l.innerHTML = a)
							},
							btnTitle: function(a) {
								a && f.showPublishTo.setAttribute("title", a)
							},
							hide: function() {
								y.hide();
								y.setArrow("down")
							},
							toggle: function() {
								t || (f.publishTo.style.display == "none" ? z.show() : z.hide())
							},
							rank: function() {
								return d
							},
							reset: function() {
								z.enable();
								f.wrap.className = n;
								z.btnContent(o.content);
								z.btnTitle(o.title);
								d = null;
								t = !1;
								d = i
							},
							destroy: function() {
								try {
									for (var b in c) c[b].destroy()
								} catch (d) {}
								j.length && a.hotKey.remove(h, j, u.hotKeyChangeRank);
								a.removeNode(f.publishTo);
								a.custEvent.undefine(z);
								if (x.keyboardManager) {
									x.keyboardManager.destroy();
									a.custEvent.undefine(x.keyboardManager, x.keyTypes)
								}
							},
							changeRank: function(b) {
								b = b > 0 ? b - 1 : 0;
								var c = a.sizzle('a[action-type="publishTo"]', f.publishTo)[b];
								if (c) {
									A.normal.changeRank({
										el: c,
										data: a.core.json.queryToJson(c.getAttribute("action-data") || "")
									});
									var d = c.getAttribute("suda-data");
									if (d) {
										var e = d.match(/key=(.+?)&value=(.+)/);
										e && e.length === 3 && window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(e[1], e[2])
									}
								}
							},
							getDomHeight: function() {
								return f.publishTo.style.display == "none" ? {
									width: 0,
									heigth: 0
								} : a.core.dom.getSize(f.publishTo)
							},
							bindAltKey: function() {
								if (a.isNode(h)) {
									var b = a.core.util.browser.OS === "macintosh";
									if (b) for (var c = 1; c <= 9; c++) j.push("ctrl+" + c);
									else for (var c = 1; c <= 9; c++) j.push("alt+" + c);
									a.hotKey.add(h, j, u.hotKeyChangeRank)
								}
							}
						},
						A = {
							normal: {
								bind: function() {
									c.layer.add("publishTo", "click", A.normal.changeRank);
									c.layer.add("more", "click", A.normal.more)
								},
								getList: function() {
									y.content(m)
								},
								more: function() {
									A.group.show();
									t = !0;
									a.core.evt.stopEvent()
								},
								show: function() {
									var a = function() {
											if (!f.publishTo) {
												B();
												y.init();
												w()
											}
											A.normal.getList();
											y.show()
										};
									e ? a() : A.group.request(a)
								},
								changeRank: function(b) {
									try {
										a.preventDefault(b.evt)
									} catch (c) {}
									d = b.data;
									var e = b.data.text;
									z.btnContent(e);
									z.btnTitle(b.el.getAttribute("title"));
									d.rank == "group" ? A.group.show() : z.hide();
									a.custEvent.fire(z, "changeRank", d)
								}
							},
							group: {
								request: function(b) {
									a.common.trans.group.getTrans("list", {
										onSuccess: function(a) {
											var c = a.data.length;
											for (var d = 0; d < c; d++) a.data[d].index = d + 1;
											e = a.data;
											b && b(e)
										}
									}).request({})
								},
								bind: function() {
									c.layer.add("back", "click", A.group.back)
								},
								getList: function() {
									if (!A.group.cache) {
										var a = b(r(e));
										A.group.cache = a;
										y.content(A.group.cache)
									} else y.content(A.group.cache)
								},
								show: function() {
									A.group.getList();
									y.show()
								},
								back: function() {
									var b = a.core.evt.fixEvent();
									a.core.evt.stopEvent(b);
									t = !1;
									A.normal.show()
								}
							}
						},
						B = function(c) {
							var d = b(q(c));
							f.publishTo = a.insertHTML(document.body, d, "beforeend");
							m = f.publishTo.innerHTML
						},
						C = function() {
							if (!a.isNode(f.showPublishTo)) return 0;
							l = f.publishTotext;
							o = {
								content: l.innerHTML,
								title: f.showPublishTo.getAttribute("title")
							};
							v();
							return 1
						},
						D = C();
					a.custEvent.define(z, ["show", "hide", "changeRank"]);
					return D ? z : null
				}();
				d && d.bindAltKey && d.bindAltKey()
			},
			u = function() {
				o();
				s();
				t()
			};
		u();
		return d
	}
});
STK.register("ui.confirm", function(a) {
	var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b" node-type="cancel"></a></div></div>',
		c = {
			success: "icon_succM",
			error: "icon_errorM",
			warn: "icon_warnM",
			"delete": "icon_delM",
			question: "icon_questionM"
		},
		d = a.kit.extra.language,
		e = null;
	return function(f, g) {
		var h, i, j, k, l, m;
		h = a.parseParam({
			title: d("#L{提示}"),
			icon: "question",
			textLarge: f,
			textComplex: "",
			textSmall: "",
			OK: a.funcEmpty,
			OKText: d("#L{确定}"),
			cancel: a.funcEmpty,
			cancelText: d("#L{取消}"),
			hideCallback: a.funcEmpty
		}, g);
		h.icon = c[h.icon];
		i = {};
		e || (e = a.kit.extra.reuse(function() {
			var c = a.ui.mod.layer(b);
			return c
		}));
		j = e.getOne();
		k = a.ui.dialog();
		k.setContent(j.getOuter());
		j.getDom("icon").className = h.icon;
		j.getDom("textLarge").innerHTML = h.textLarge;
		j.getDom("textComplex").innerHTML = h.textComplex;
		j.getDom("textSmall").innerHTML = h.textSmall;
		j.getDom("OK").innerHTML = "<span>" + h.OKText + "</span>";
		j.getDom("cancel").innerHTML = "<span>" + h.cancelText + "</span>";
		k.setTitle(h.title);
		var n = function() {
				l = !0;
				m = a.htmlToJson(j.getDom("textComplex"));
				k.hide()
			};
		a.addEvent(j.getDom("OK"), "click", n);
		a.addEvent(j.getDom("cancel"), "click", k.hide);
		a.custEvent.add(k, "hide", function() {
			a.custEvent.remove(k, "hide", arguments.callee);
			a.removeEvent(j.getDom("OK"), "click", n);
			a.removeEvent(j.getDom("cancel"), "click", k.hide);
			e.setUnused(j);
			l ? h.OK(m) : h.cancel(m);
			h.hideCallback()
		});
		k.show().setMiddle();
		j.getDom("OK").focus();
		i.cfm = j;
		i.dia = k;
		return i
	}
});
STK.register("ui.vipConfirm", function(a) {
	var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_a" node-type="toBeVip"></a><a href="javascript:void(0)" class="W_btn_b" node-type="OK"></a></div></div>',
		c = {
			success: "icon_succM",
			error: "icon_errorM",
			warn: "icon_warnM",
			"delete": "icon_delM",
			question: "icon_questionM"
		},
		d = a.kit.extra.language,
		e = null;
	return function(f, g) {
		var h, i, j, k, l, m, n;
		h = a.parseParam({
			title: d("#L{提示}"),
			icon: "question",
			textLarge: f,
			textComplex: "",
			textSmall: "",
			OK: a.funcEmpty,
			OKText: d("#L{确定}"),
			cancel: a.funcEmpty,
			cancelText: d("#L{取消}"),
			toBeVip: a.funcEmpty,
			toBeVipText: ""
		}, g);
		h.icon = c[h.icon];
		i = {};
		e || (e = a.kit.extra.reuse(function() {
			var c = a.ui.mod.layer(b);
			return c
		}));
		j = e.getOne();
		k = a.ui.dialog();
		k.setContent(j.getOuter());
		j.getDom("icon").className = h.icon;
		j.getDom("textLarge").innerHTML = h.textLarge;
		j.getDom("textComplex").innerHTML = h.textComplex;
		j.getDom("textSmall").innerHTML = h.textSmall;
		j.getDom("OK").innerHTML = "<span>" + h.OKText + "</span>";
		j.getDom("toBeVip").innerHTML = '<span><em class="W_ico16 ico_member"></em>' + h.toBeVipText + "</span>";
		k.setTitle(h.title);
		var o = function() {
				l = !0;
				m = a.htmlToJson(j.getDom("textComplex"));
				k.hide()
			},
			p = function() {
				n = !0;
				k.hide()
			};
		a.addEvent(j.getDom("OK"), "click", o);
		a.addEvent(j.getDom("toBeVip"), "click", p);
		a.custEvent.add(k, "hide", function() {
			a.custEvent.remove(k, "hide", arguments.callee);
			a.removeEvent(j.getDom("OK"), "click", o);
			a.removeEvent(j.getDom("toBeVip"), "click", p);
			e.setUnused(j);
			l ? h.OK(m) : h.cancel(m);
			n && h.toBeVip()
		});
		k.show().setMiddle();
		i.cfm = j;
		i.dia = k;
		return i
	}
});
STK.register("common.dialog.authentication", function(a) {
	return function(b) {
		var c = a.kit.extra.language,
			d = a.core.util.browser;
		b = a.parseParam({
			src: "http://weibo.com/a/verify/realname?stage=home_verification",
			icon: "warn",
			isHold: !0,
			width: "380px",
			height: "240px",
			title: c("#L{帐号验证}")
		}, b || {});
		var e = {},
			f, g, h = !1,
			i = "tblog_checkfailed_reform",
			j = {
				init: function() {
					!d.IE6 && !d.IE7 && (window.document.domain = "weibo.com");
					f = a.ui.dialog(b);
					var c = [];
					c.push('<iframe id="account_authentication" name="account_authentication" node-type="frame" width="' + b.width + '" height="' + b.height + '" allowtransparency="true" scrolling="no" frameborder="0" src=""></iframe>');
					var e = a.builder(c.join(""));
					f.setTitle(b.title);
					f.setContent(e.box);
					var g = f.getDomList();
					a.addEvent(g.close[0], "click", function() {
						window.location.reload()
					})
				},
				show: function() {
					try {
						SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_box")
					} catch (c) {}
					h || a.kit.io.cssLoader("style/css/module/layer/layer_check_identity.css", "js_style_css_module_layer_check_identity", function() {
						h = !0
					});
					f.show().setMiddle();
					g = a.E("account_authentication");
					var d = decodeURIComponent(b.src) + "&rnd=";
					g.attachEvent ? g.attachEvent("onload", function() {
						g.height = b.height;
						f.setMiddle()
					}) : g.onload = function() {
						g.height = b.height;
						f.setMiddle()
					};
					g.src = d + a.core.util.getUniqueKey()
				},
				destroy: function() {},
				hook: function(a, b) {
					try {
						a == "100000" ? j.verifySucc() : j.verifyFail()
					} catch (c) {}
				},
				verifySucc: function() {
					SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_success");
					f.hide();
					var b = {
						title: c("#L{提示}"),
						icon: "success",
						OK: function() {
							SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_play");
							history.go(0)
						},
						OKText: c("#L{进入首页}"),
						msg: c("#L{恭喜，您的身份已验证成功，马上进入新浪微博。}")
					},
						d = a.ui.alert(b.msg, b);
					a.custEvent.add(d, "hide", function() {
						history.go(0)
					})
				},
				verifyFail: function() {
					SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_twotimes");
					f.hide();
					var b = {
						title: c("#L{提示}"),
						icon: "warn",
						OK: function() {
							SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_triple");
							j.show()
						},
						OKText: c("#L{再次验证}"),
						msg: c("#L{抱歉，您的身份信息不准确，请再次验证。<br/>}") + '<a class="S_spetxt" suda-data="key=tblog_checkfailed_reform&value=checkfailed_havealook" href="http://weibo.com">' + c("#L{您也可以先体验微博，随后再验证身份信息>>}") + "</a>"
					},
						d = a.ui.alert(b.msg, b);
					a.custEvent.add(d, "hide", function() {
						history.go(0)
					})
				}
			};
		j.init();
		e.destroy = j.destory;
		e.show = j.show;
		window.App = window.App || {};
		window.App.checkRealName = j.hook;
		return e
	}
});
STK.register("common.dialog.memberDialog", function(a) {
	var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt1" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a class="W_btn_b" node-type="OK"></a><a class="W_btn_d" node-type="cancel"></a><a href="http://vip.weibo.com/paycenter?pageid=byebank" class="W_btn_v" node-type="member"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div></div>',
		c = {
			success: "icon_succM",
			error: "icon_errorM",
			warn: "icon_warnM",
			"delete": "icon_delM",
			question: "icon_questionM"
		},
		d = a.kit.extra.language,
		e = function(e, f) {
			var g, h, i, j, k, l;
			g = a.parseParam({
				title: d("#L{提示}"),
				icon: "warn",
				textLarge: e,
				textComplex: "",
				textSmall: "",
				OK: a.funcEmpty,
				OKText: d("#L{确定}"),
				cancel: a.funcEmpty,
				cancelText: d("#L{确认}")
			}, f);
			g.icon = c[g.icon];
			h = {};
			var i = a.ui.mod.layer(d(b));
			j = a.ui.dialog();
			j.setContent(i.getOuter());
			i.getDom("icon").className = g.icon;
			i.getDom("textLarge").innerHTML = g.textLarge;
			i.getDom("textComplex").innerHTML = g.textComplex;
			i.getDom("textSmall").innerHTML = g.textSmall;
			i.getDom("OK").innerHTML = "<span>" + g.OKText + "</span>";
			i.getDom("cancel").innerHTML = "<span>" + g.cancelText + "</span>";
			j.setTitle(g.title);
			var m = function() {
					k = !0;
					l = a.htmlToJson(i.getDom("textComplex"));
					j.hide()
				};
			a.addEvent(i.getDom("OK"), "click", m);
			a.addEvent(i.getDom("cancel"), "click", j.hide);
			a.custEvent.add(j, "hide", function() {
				a.custEvent.remove(j, "hide", arguments.callee);
				a.removeEvent(i.getDom("OK"), "click", m);
				a.removeEvent(i.getDom("cancel"), "click", j.hide);
				k ? g.OK(l) : g.cancel(l)
			});
			j.show().setMiddle();
			h.cfm = i;
			h.dia = j;
			return h
		};
	return function(b) {
		b = a.parseParam({
			type: "follow",
			errortype: "1"
		}, b);
		var c, f, g = {
			textLarge: d("#L{您已达到悄悄关注上限！}"),
			textComplex: d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}'),
			textSmall: d('#L{可}<a href="http://vip.weibo.com/paycenter?pageid=byebank" class="S_link2">#L{开通会员}</a>#L{或先将悄悄关注减少至10人以下，再添加}'),
			OKText: d("#L{管理我的悄悄关注}"),
			OK: function() {
				a.preventDefault();
				window.location.href = "/" + $CONFIG.uid + "/whisper"
			}
		},
			h = {
				textLarge: d("#L{您已达到关注上限！}"),
				textComplex: d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}'),
				textSmall: d('#L{可}<a href="http://vip.weibo.com/paycenter?pageid=byebank" class="S_link2">#L{开通会员}</a>#L{或先将关注减少至2000人以下，再添加}'),
				OKText: d("#L{管理我的关注}"),
				OK: function() {
					a.preventDefault();
					window.location.href = "/" + $CONFIG.uid + "/follow"
				}
			};
		if (b.type == "quiet") {
			switch (parseInt(b.errortype, 10)) {
			case 2:
				g.textLarge = d("#L{您当前已达会员等级悄悄关注上限啦！}");
				g.textSmall = "";
				g.textComplex = d('<a href="http://vip.weibo.com/privilege" class="S_link2">#L{了解更多会员特权信息»}</a>');
				break;
			case 1:
				g.textLarge = d("#L{您已达到悄悄关注上限！}");
				g.textSmall = "";
				g.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}');
				break;
			case 3:
				g.textLarge = d("#L{您已达到悄悄关注上限！}");
				g.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}');
				g.textSmall = d('#L{可}<a href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{或将悄悄关注减少至10人以下，再添加}')
			}
			c = g
		} else {
			switch (parseInt(b.errortype, 10)) {
			case 2:
				h.textLarge = d("#L{您当前已达会员等级关注上限啦！}");
				h.textSmall = "";
				h.textComplex = d('<a href="http://vip.weibo.com/privilege" class="S_link2">#L{了解更多会员特权信息»}</a>');
				break;
			case 1:
				h.textLarge = d("#L{您已达到关注上限！}");
				h.textSmall = "";
				h.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}');
				break;
			case 3:
				h.textLarge = d("#L{您已达到关注上限！}");
				h.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}');
				h.textSmall = d('#L{可}<a href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{或将关注减少至2000人以下，再添加}')
			}
			c = h
		}
		f = e("", c);
		parseInt(b.errortype, 10) == 2 ? f.cfm.getDom("member").style.display = "none" : f.cfm.getDom("cancel").style.display = "none"
	}
});
STK.register("common.layer.ioError", function(a) {
	var b = a.kit.extra.language,
		c;
	return function(d, e, f) {
		var g = {},
			h, i, j = function() {},
			k = {
				title: b("#L{发布失败}"),
				warnMsg: b("#L{该组成员已达上限，不能对该组发布定向微博。}"),
				OKText: b("#L{知道了}"),
				textComplex: b('#L{微博会员可以提高分组上限} <a href="http://vip.weibo.com/prividesc?priv=1110">#L{了解更多}»</a>'),
				vip: b("#L{开通会员}")
			},
			l = {
				init: function() {
					l.data()
				},
				data: function() {
					i = a.parseParam({
						auto: !0,
						call: j,
						ok: j,
						cancel: j
					}, f);
					h = a.parseParam({
						location: "",
						icon: "warn",
						title: b("#L{提示}"),
						OKText: b("#L{确 定}"),
						cancelText: b("#L{取 消}"),
						suda: ""
					}, e.data);
					h.msg = e.msg || b("#L{系统繁忙}");
					h.OK = function() {
						a.preventDefault();
						var b = a.queryToJson(h.suda || "");
						b = b.ok || {};
						SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
						i.ok();
						h.location && (window.location.href = h.location)
					};
					h.cancel = function() {
						a.preventDefault();
						var b = a.queryToJson(h.suda || "");
						b = b.cancel || {};
						SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
						i.cancel()
					}
				},
				run: function() {
					var a = m[e.code] || m[100001];
					return a() || i.call(h, e)
				},
				destroy: function() {
					c && c.destroy()
				}
			},
			m = {
				100001: function() {
					a.ui.alert(h.msg, h)
				},
				100002: function() {
					window.location.reload()
				},
				100003: function() {
					a.ui.confirm(h.msg, h)
				},
				100004: function() {
					c || (c = a.common.dialog.authentication());
					c.show()
				},
				100005: function() {
					h.type = e.data && (e.data.type ? e.data.type : "follow");
					h.errortype = e.data && (e.data.errortype || "1");
					return a.common.dialog.memberDialog(h || {})
				},
				100006: function() {
					a.ui.alert(k.warnMsg, {
						title: k.title,
						OKText: k.OKText
					})
				},
				100007: function() {
					a.ui.vipConfirm(k.warnMsg, {
						icon: "warn",
						title: k.title,
						toBeVipText: k.vip,
						textComplex: k.textComplex,
						OKText: k.OKText,
						toBeVip: function() {
							a.preventDefault();
							window.location.href = "http://vip.weibo.com/paycenter?refer=publish"
						}
					})
				}
			};
		l.init();
		g.getdata = function() {
			return h
		};
		g.getAction = function(a) {
			return a ? m[a] : m
		};
		g.getCode = function() {
			return e.code || ""
		};
		g.run = l.run;
		i.auto && l.run();
		return g
	}
});
STK.register("common.dialog.publish", function(a) {
	var b = '<#et temp data><div class="detail" node-type="outer"><div class="send_weibo clearfix" node-type="wrap"><div class="title_area clearfix"><div class="title" node-type="info"></div><div class="num S_txt2" node-type="num"><span>140</span>#L{字}</div><div class="key S_textb"  ></div></div><div class="input clicked" style="width:460px;"><textarea name="" class="input_detail" node-type="textEl"></textarea><div class="send_succpic" style="display:none" node-type="successTip"></div><span class="arrow"></span></div><div class="func_area clearfix"><div class="func"><div class="limits"><a href="javascript:void(0);" node-type="showPublishTo" action-type="showPublishTo" action-data="rank=0"><span node-type="publishTotext" class="W_autocut">#L{公开}</span><span class="W_arrow"><em node-type="publish_to_arrow">◆</em></span></a></div><a href="javascript:void(0)" class="send_btn disable" diss-data="module=shissue" node-type="submit">#L{发布}</a></div><div class="kind S_txt3" node-type="widget"><span class="kind_detail"><#if (data.smileyBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_face" node-type="smileyBtn">#L{表情}</a></#if><#if (data.picBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_img" node-type="picBtn">#L{图片}</a></#if></span></div></div></div></div>',
		c = {
			title: "#L{有什么新鲜事想告诉大家}"
		},
		d = a.kit.extra.language,
		e = {
			limitNum: 140,
			extendText: '<a target="_blank" class="S_txt2" href="http://weibo.com/z/guize/gongyue.html">#L{发言请遵守社区公约}</a>，'
		};
	return function(f) {
		var g = {},
			h, i, j, k, l, m, n, o, p, q, r;
		h = a.parseParam({
			templete: d(b),
			appkey: "",
			styleId: "1",
			smileyBtn: !0,
			picBtn: !0,
			pid: ""
		}, f);
		o = a.custEvent.define(g, "publish");
		a.custEvent.define(g, "hide");
		var s = function() {
				var b = l.textEl;
				if (i) j === "error" && a.common.extra.shine(b);
				else {
					i = !0;
					j = "loading";
					var c = a.common.getDiss(t(), l.submit);
					c.pub_type = "dialog";
					r && r.disable();
					n.request(c)
				}
			},
			t = function() {
				var b = m.API.getWords();
				p && b.indexOf(p) === -1 && (b = b + p);
				var c = {};
				c.appkey = h.appkey;
				c.style_type = h.styleId;
				c.text = b;
				var d = m.API.getExtra();
				if (d) if (d.indexOf("=") < 0) c.pic_id = m.API.getExtra() || "";
				else {
					var e = d,
						f = a.core.json.queryToJson(e);
					for (var g in f) c[g] = f[g];
					a.log(c)
				}
				if (r && r.rank) {
					var i = r.rank();
					c.rank = i.rank;
					c.rankid = i.rankid
				}
				return c
			},
			u = function(a) {
				if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
					s();
					m.API.blur()
				}
			},
			v = function(a, b) {
				var c = b.isOver;
				if (!c) {
					i = !1;
					j = "";
					l.submit.className = "send_btn";
					l.num.innerHTML = (e.extendText ? d(e.extendText) : "") + d("#L{还可以输入%s字}", "<span>" + (140 - b.count) + "</span>")
				} else {
					i = !0;
					j = "error";
					l.submit.className = "send_btn disable"
				}
			},
			w = function(b, c) {
				j = "";
				l.successTip.style.display = "";
				l.textEl.value = "";
				setTimeout(function() {
					i = !1;
					l.successTip.style.display = "none";
					k && k.hide();
					l.submit && (l.submit.className = "send_btn")
				}, 2e3);
				a.custEvent.fire(o, "publish", [b.data, c]);
				a.common.channel.feed.fire("publish", [b.data, c]);
				l.submit.className = "send_btn disable";
				m.API.reset();
				r && r.reset && r.reset()
			},
			x = function(b, c) {
				i = !1;
				j = "";
				b.msg = b.msg || d("操作失败");
				a.common.layer.ioError(b.code, b);
				l.submit && (l.submit.className = "send_btn");
				r && r.enable()
			},
			y = function(a) {
				l.textEl.value = "";
				m.API.insertText(a.content);
				l.info.innerHTML = a.info;
				a.appkey && (h.appkey = a.appkey);
				if (a.content) {
					i = !1;
					j = "";
					l.submit.className = "send_btn"
				} else {
					i = !0;
					j = "error";
					l.submit.className = "send_btn disable"
				}
			},
			z = function() {
				i = !1
			},
			A = function() {
				m = a.common.editor.base(a.core.util.easyTemplate(a.kit.extra.language(h.templete), h).toString(), e);
				h.smileyBtn && m.widget(a.common.editor.widget.face({
					useAlign: !0
				}), "smileyBtn");
				h.picBtn && m.widget(a.common.editor.widget.image(), "picBtn");
				l = m.nodeList;
				r = a.common.editor.plugin.publishTo({
					editorWrapEl: l.wrap,
					textEl: l.textEl
				});
				q = a.common.dialog.validateCode()
			},
			B = function() {
				a.addEvent(l.submit, "click", s);
				a.addEvent(l.textEl, "keypress", u)
			},
			C = function() {
				r && r.miYouStyle.apply(null, arguments)
			},
			D = function() {
				a.custEvent.add(m, "textNum", v);
				r && a.custEvent.add(r, "changeRank", C)
			},
			E = function() {
				n = a.common.trans.feed.getTrans("publish", {
					onComplete: function(a, b) {
						var c = {
							onSuccess: w,
							onError: x,
							requestAjax: n,
							param: t(),
							onRelease: function() {
								i = !1;
								j = "";
								l.submit && (l.submit.className = "send_btn");
								r && r.enable()
							}
						};
						q.validateIntercept(a, b, c)
					},
					onFail: x,
					onTimeout: x
				})
			},
			F = function() {
				A();
				B();
				D();
				E()
			},
			G = function(b) {
				m || F();
				var e = a.parseParam({
					appkey: "",
					content: "",
					defaultValue: "",
					info: "",
					title: d(c.title)
				}, b);
				k = a.ui.dialog();
				k.setTitle(e.title);
				k.appendChild(l.outer);
				k.show();
				k.setMiddle();
				y(e);
				m.API.focus();
				a.custEvent.add(k, "hide", function() {
					a.custEvent.remove(k, "hide", arguments.callee);
					m.closeWidget();
					z();
					k = null;
					a.custEvent.fire(o, "hide")
				});
				p = e.defaultValue
			},
			H = function() {
				k.hide()
			},
			I = function(a) {
				m.API.addExtraInfo(a)
			},
			J = function(a) {
				m.API.disableEditor(a)
			},
			K = function() {
				k && k.hide();
				l && l.submit && a.removeEvent(l.submit, "click", s);
				l && l.textEl && a.removeEvent(l.textEl, "keypress", u);
				a.custEvent.remove(m, "textNum", v);
				r && a.custEvent.remove(r, "changeRank", C);
				a.custEvent.undefine(o, "publish");
				q && q.destroy && q.destroy();
				r && r.destroy && r.destroy();
				l = null;
				n = null;
				i = !1;
				for (var b in g) delete g[b];
				g = null
			};
		g.addExtraInfo = I;
		g.disableEditor = J;
		g.show = G;
		g.hide = H;
		g.destroy = K;
		return g
	}
});
STK.register("common.cover.custCover", function(a) {
	var b = a.kit.extra.language,
		c = a.core.util.easyTemplate,
		d = b("#L{封面图设置}"),
		e = a.getUniqueKey,
		f = $CONFIG.jsPath,
		g = a.kit.extra.swfobject,
		h = a.common.trans.cover,
		i = a.ui.alert,
		j = b("#L{保存封面图失败}！"),
		k = b('<#et temp data><div node-type="tip" class="W_tips tips_error clearfix" style="display:none;width:507px;margin-top:5px;" ><p class="icon"><span class="icon_errorS"></span></p><p class="txt">#L{提示：封面图不能用作商业用途，请谨慎选择}。</p><p class="close"><a href="javascript:void(0);" onclick="STK.core.dom.dir.parent(this, {expr:\'[node-type=tip]\'})[0].style.display=\'none\';" class="W_ico12 icon_close"></a></p></div><div node-type="swfContainer" style="width:535px;margin-top:5px;margin-left:-5px"></div></#et>'),
		l = b('<#et temp data><div id="${data.id}"><h1>Flash#L{区域}</h1><p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p></div></#et>'),
		m = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "true",
			allowScriptAccess: "always",
			bgcolor: "#ffffff",
			wmode: "transparent"
		};
	return function(b, d) {
		var n = {},
			o, p = a.builder(c(k, {}).toString()),
			q = p.list,
			r = p.box,
			s = q.swfContainer[0],
			t = q.tip[0],
			u = {},
			v = !d.is_customize && d.customize_pic;
		a.custEvent.define(n, ["save", "saveReady", "autoOpen"]);
		b.innerHTML = d.nav_html;
		b.appendChild(r);
		a.custEvent.fire(n, "autoOpen");
		var w = !1,
			x = !1,
			y = "coverSWF" + e(),
			z = "coverSWFInit" + e(),
			A = "coverSWFCS" + e(),
			B = "coverSaveComplete" + e(),
			C = {
				id: y,
				name: y
			},
			D = function() {
				return g.getObjectById(y)
			},
			E = {
				readyCallback: z,
				stateCallback: A,
				saveCallback: B
			};
		window[z] = function(a) {
			d.show_tip && (t.style.display = "");
			g.getObjectById(a).initialize({
				userImg: d.customize_pic || ""
			})
		};
		window[A] = function(b) {
			u = b;
			a.custEvent.fire(n, "saveReady", v || u.saveReady)
		};
		var F = function() {
				x = !1;
				a.custEvent.fire(n, "save", !0)
			},
			G = function() {
				x = !1;
				i(j);
				a.custEvent.fire(n, "save", !1)
			};
		window[B] = function(a) {
			x = !1;
			w || (a.success ? H(a) : G())
		};
		var H = function(a) {
				var b = a.rect;
				h.getTrans("setcovercustom", {
					onSuccess: F,
					onFail: G,
					onError: G
				}).request({
					picid: a.picid,
					coordinates: b ? b.x + "," + b.y + "|" + b.w + "," + b.h : ""
				})
			};
		n.save = function() {
			if (!x) if (u.saveReady) {
				x = !0;
				setTimeout(function() {
					D().saveCover()
				}, 33)
			} else if (v) {
				x = !0;
				h.getTrans("setcoversystem", {
					onSuccess: F,
					onFail: G,
					onError: G
				}).request({
					cover_id: 0
				})
			}
		};
		n.cancel = function() {
			w = !0
		};
		if (d.member) {
			o = "altC_" + e();
			s.innerHTML = c(l, {
				id: o
			}).toString();
			g.embedSWF(f + "home/static/swf/img/mycoverupload.swf?version=" + $CONFIG.version, o, "100%", "242px", "10.2", f + "home/static/swf/img/expressInstall.swf?version=" + $CONFIG.version, E, m, C)
		} else {
			s.style.marginLeft = 0;
			s.innerHTML = "<a href='http://vip.weibo.com/paycenter?from=covermap' target='_blank'><img src='http://img.t.sinajs.cn/t5/style/images/skin/notvip.jpg'/></a>"
		}
		n.destroy = function() {
			a.custEvent.undefine(n)
		};
		return n
	}
});
STK.register("common.cover.cover", function(a) {
	var b = a.kit.extra.language,
		c = a.common.trans.cover,
		d = a.ui.alert,
		e = b("#L{获取封面图信息失败}！"),
		f = b("#L{保存封面图失败}！");
	return function(b) {
		function o(f, i) {
			c.getTrans(f, {
				onSuccess: function(c) {
					var d = c.data;
					if (f == "getcovercustom") {
						j = !1;
						n(d)
					} else {
						j = !0;
						b.innerHTML = d.cover_html;
						j || a.custEvent.fire(g, "saveReady", !1)
					}
					if (!h) {
						a.custEvent.fire(g, "inited");
						h = !0
					}
				},
				onFail: function() {
					d(e)
				},
				onError: function(a) {
					d(e)
				}
			}).request(i || {})
		}
		function n(c) {
			l && l.destroy();
			l = a.common.cover.custCover(b, c);
			a.custEvent.add(l, "saveReady", function(b, c) {
				a.custEvent.fire(g, "saveReady", c)
			});
			a.custEvent.add(l, "save", function(b, c) {
				a.custEvent.fire(g, "save", c)
			});
			!c.is_customize && c.customize_pic && a.custEvent.fire(g, "saveReady", !0)
		}
		var g = {},
			h, i = a.delegatedEvent(b),
			j, k, l, m = {
				type: 1
			};
		a.custEvent.define(g, ["inited", "save", "coverChange", "saveReady", "tabChange"]);
		i.add("loadSysCover", "click", function(b) {
			if (!a.hasClassName(b.el.parentNode, "current")) {
				m = b.data;
				a.custEvent.fire(g, "tabChange", b.data);
				o("getcoversystem", b.data);
				a.preventDefault(b.evt)
			}
		});
		i.add("sysCover", "click", function(b) {
			var c = b.el;
			k = b.data;
			var d = a.sizzle("a.current", c.parentNode)[0];
			d && a.removeClassName(d, "current");
			a.addClassName(c, "current");
			a.custEvent.fire(g, "coverChange", {
				bigUrl: decodeURIComponent(b.data.big)
			});
			a.custEvent.fire(g, "saveReady", !0);
			a.preventDefault(b.evt)
		});
		i.add("loadCustCover", "click", function(b) {
			m = b.data;
			if (!a.hasClassName(b.el.parentNode, "current")) {
				a.custEvent.fire(g, "tabChange", b.data);
				o("getcovercustom", b.data);
				a.preventDefault(b.evt)
			}
		});
		g.init = function() {
			h ? a.custEvent.fire(g, "tabChange", m) : o("getcoversystem")
		};
		var p = function() {
				a.custEvent.fire(g, "save", !0)
			},
			q = function() {
				a.custEvent.fire(g, "save", !1);
				d(f)
			};
		g.save = function() {
			j ? c.getTrans("setcoversystem", {
				onSuccess: p,
				onFail: q,
				onError: q
			}).request({
				cover_id: k.cover_id
			}) : l.save()
		};
		g.destroy = function() {
			i.destroy();
			m = null
		};
		return g
	}
});
STK.register("common.skin.custTmpl", function(a) {
	var b = a.kit.extra.language,
		c = a.common.trans.custTmpl,
		d = a.core.util.easyTemplate,
		e = a.core.dom.getStyle,
		f = a.core.dom.setStyle,
		g = a.core.json.clone,
		h = a.core.dom.removeNode,
		i = a.common.extra.imageURL,
		j = 950,
		k, l, m, n = a.addEvent,
		o = a.kit.extra.swfobject,
		p = a.ui.alert,
		q = !1,
		r = b('<#et temp data><div class="setup_template" node-type="custTmplContainer"><div class="profile_tab S_line5" node-type="tabList"><div class="tab_plus" node-type="openMemLink" style="display:none"><a href="http://vip.weibo.com/paycenter?from=skin" target="_blank"><span class="icon_warnS"></span>开通微博会员</a></div><div class="tab_plus" node-type="seeMemLink" style="display:none"><a href="/z/vipskin?from=skin" target="_blank"><span class="icon_warnS"></span>查看全部会员模版</a></div><ul class="pftb_ul S_line1"><li class="pftb_itm S_line1"><a href="javascript:;" suda-data="key=tblog_mode_cover&value=set_tab" class="pftb_lk S_line5 S_txt1 current S_bg5" node-type="tabSuit" action-type="tab" action-data="type=suit">#L{套装}</a></li><li class="pftb_itm S_line1"><a href="javascript:;" suda-data="key=tblog_mode_cover&value=recommend_mode" class="pftb_lk S_line5 S_txt1 S_bg1" node-type="tabTemp" action-type="tab" action-data="type=sys">#L{模板}</a></li><li class="pftb_itm S_line1"><a href="javascript:;" suda-data="key=tblog_mode_cover&value=personal_page_cover" class="pftb_lk S_line5 S_txt1 S_bg1" action-type="tab" action-data="type=cover">#L{封面图}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a href="javascript:;" suda-data="key=tblog_mode_cover&value=custom_tab" class="pftb_lk S_line5 S_txt1 S_bg1" node-type="tabDiy" action-type="tab" action-data="type=diy">#L{自定义}</a></li></ul></div><div><div node-type="suitControlPanel"></div><div node-type="sysControlPanel"></div><div node-type="coverControlPanel"></div><div node-type="diyControlPanel"></div></div><div class="btn clearfix"><span class="W_fl"><label><input type="checkbox" checked="checked" node-type="sync" class="W_checkbox">同步到微博</label></span><a href="javascript:;" action-type="save" class="${data.saveClass}" node-type="save"><span>#L{保存}</span></a><a href="javascript:;" action-type="cancel" class="W_btn_b" node-type="canncel"><span>#L{取消}</span></a><a target="_blank" href="http://vip.weibo.com/paycenter?from=covermap"  class="W_btn_v" node-type="gomember" style="display:none;"><span><em class="W_ico16 ico_member"></em>#L{开通会员}</span></a></div></div></#et>'),
		s = {
			succ: '<div class="W_tips tips_succ"><p class="icon"><span class="icon_succ"></span></p><p class="txt">图片上传成功</p></div>',
			warn: '<div class="W_tips tips_warn"><p class="icon"><span class="icon_warnS"></span></p><p class="txt">警告</p></div>',
			del: '<div class="W_tips tips_del"><p class="icon"><span class="icon_delS"></span></p><p class="txt">错误</p></div>'
		},
		t = "W_btn_a",
		u = b("#L{保存皮肤失败}！"),
		v = b("#L{获取封面图信息失败}！"),
		w = b("#L{保存封面图失败}！");
	return function(o, s) {
		function bg() {
			var a = [];
			O.locus.each(function(b, c) {
				b !== "switchType" && a.push({
					key: c
				})
			});
			return a.length > 0
		}
		var x, y, z, A, B, C = {},
			D = !1,
			E, F = o && o.isProfile,
			G, H, I, J, K = !1,
			L = !1;
		a.custEvent.define(C, ["load", "hide", "noprivilege", "coverChange", "reposition"]);
		var M = {
			setCurrent: function(b, c, d) {
				var e = a.sizzle(".current", d),
					f = !1;
				for (var g = 0; g < e.length; g++) {
					e[g] === c && (f = !0);
					!f && a.core.dom.removeClassName(e[g], "current")
				}!f && a.core.dom.addClassName(c, "current");
				return !f
			}
		},
			N = a.E("custom_style");
		f = function(b, c, d) {
			a.E("custom_style") && h(a.E("custom_style"));
			N = a.C("style");
			N.setAttribute("type", "text/css");
			N.id = "custom_style";
			document.getElementsByTagName("head")[0].appendChild(N);
			h(a.E("skin_transformers"));
			var e = O.skinFuns.getCustColorObj(),
				f = [];
			f.push("@import url('" + $CONFIG.cssPath + "skin/public/base.css?version=" + J + "');");
			if (b && c && d) {
				f.push("@import url('" + $CONFIG.cssPath + "skin/diy/" + (O._tempSkin.scheme || $CONFIG.scheme || "diy006") + "/skin.css?version=" + J + "');");
				f.push(c + ":" + d);
				f.push("body{")
			} else if (O._diyDom) {
				var g = O.DiyStyleFun.getDiyControlPanelData(O._diyDom);
				g.scheme && f.push("@import url('" + $CONFIG.cssPath + "skin/diy/" + g.scheme + "/skin.css?version=" + J + "');");
				f.push("body{");
				O._tempSkin.pid = g.pid;
				O._tempSkin.position = g.position;
				O._tempSkin.useBg = g.useBg ? "1" : "0";
				O._tempSkin.lock = g.lock ? "1" : "0";
				O._tempSkin.repeat = g.repeat ? "1" : "0";
				if (g.useBg) {
					f.push("background-image:url(" + (g.pid ? i(g.pid, {
						size: "large"
					}) : "") + ");");
					f.push("background-attachment:" + (g.lock ? "fixed" : "scroll") + ";");
					var j = g.position;
					switch (parseInt(j)) {
					case 0:
						j = "left";
						break;
					case 1:
						j = "center";
						break;
					case 2:
						j = "right";
						break;
					default:
						j = "center"
					}
					j += " 0";
					f.push("background-position:" + j + ";");
					f.push("background-repeat:" + (g.repeat ? "repeat" : "no-repeat") + ";")
				} else f.push("background-image:none")
			}
			f.push("}");
			f.push(".W_miniblog" + (O.isNarrow ? "_narrow" : "") + "{background-image: none;}");
			f.push(".S_profile .W_miniblog{padding-top:40px;}");
			if (e) {
				e.page_bg && f.push("body{background-color:" + e.page_bg + ";}");
				if (e.content_bg) {
					f.push(".S_bg4,.W_main_a{background-color:" + e.content_bg + ";}");
					f.push(".S_bg4_c{color:" + e.content_bg + ";}")
				}
				if (e.main_char) {
					f.push("body,.S_txt1,.SW_fun .S_func1,.current .S_func1:hover{color:" + e.main_char + ";text-decoration:none;}");
					f.push(".S_txt1_bg{ background-color:" + e.main_char + ";}");
					f.push(".S_txt1_br{ border-color:" + e.main_char + ";}")
				}
				if (e.main_link) {
					f.push("a,.S_link1,.S_func1:hover,.S_bg5 .S_func1:hover,.SW_fun:hover .S_func1,.SW_fun2:hover .S_func3,.SW_fun2:hover .S_func4{ color:" + e.main_link + ";}");
					f.push(".S_link1_bg{ background-color:" + e.main_link + ";}");
					f.push(".S_link1_br{ border-color:" + e.main_link + ";}")
				}
				if (e.minor_link) {
					f.push(".S_link2,.SW_fun2:hover .S_func2{ color:" + e.minor_link + ";}");
					f.push(".S_link2_bg{ background-color:" + e.minor_link + ";}");
					f.push(".S_link2_br{ border-color:" + e.minor_link + ";}")
				}
				if (e.border && O._tempSkin.colors_type == "1") {
					var k = e.border;
					f.push(".W_main_bg { background:url(" + $CONFIG.imgPath + "skin/diy/images/" + k.replace(/^#/, "") + "_repeat_bg_y.png?id=" + J + ") repeat-y left 0; _background-image:url(" + $CONFIG.imgPath + "skin/diy/images/" + k.replace(/^#/, "") + "_repeat_bg_y.gif?id=" + J + ")}")
				}
			}
			if (q) {
				f.push(".SW_fun2,.SW_fun2 .S_func3{ color:#888;}");
				f.push(".W_btn_b,.W_btn_c,.W_btn_c_disable,.W_btn_c_disable:hover,.W_btn_b span,.W_btn_c span,.W_btn_c_disable span,.W_btn_c_disable:hover span,.W_btn_c:hover,.W_btn_c:hover span,.W_btn_round,.W_btn_round_ico,.W_btn_round2:hover,.W_btn_round span,.W_btn_round2:hover span,.W_btn_round_ico span,.W_btn_round2,.W_btn_round_ico:hover,.W_btn_round2 span,.W_btn_round_ico:hover span,.W_btn_e,.W_btn_f,.W_btn_e span,.W_btn_f span,.W_btn_f:hover,.W_btn_f:hover span,.W_btn_arrow,.W_btn_arrow span{ color:#888;}");
				f.push(".WB_left_nav .S_txt1,.WB_left_nav .S_func1{ color:#888;}");
				f.push(".S_bg5,.S_bg5 .S_func1,.S_bg5 .S_txt1,.S_line5 .S_txt1{ color:#888;}")
			}
			var l = f.join("\n");
			N.styleSheet ? N.styleSheet.cssText = l : N.innerHTML = l
		};
		var O = {
			DOM: {},
			objs: {},
			anonymousCheck: !1,
			custColor: {},
			share: !0,
			isNarrow: !1,
			_vote: !1,
			controlPanel: null,
			_tempList: null,
			_custCover: {},
			_tempSkin: {},
			_locus: {},
			locus: {
				add: function(a, b, c) {
					if (!O._tmplCache[a] || !! c) {
						O._locus[a] = b;
						return O._locus
					}
				},
				get: function(a) {
					return O._locus[a]
				},
				each: function(a) {
					for (var b in O._locus) a.apply(this, [b, O._locus[b]]);
					return O._locus
				},
				remove: function(a) {
					O._locus[a] = null;
					delete O._locus[a];
					return O._locus
				},
				clear: function() {
					for (var a in O._locus) {
						O._locus[a] = null;
						delete O._locus[a]
					}
				}
			},
			DefaultSkin: {
				skinId: $CONFIG.skin,
				pid: $CONFIG.background,
				scheme: $CONFIG.scheme,
				position: "1",
				topHeight: 20,
				useBg: !1,
				lock: !1,
				repeat: !1
			},
			_tmplCache: {},
			_useCache: !0,
			TmplCacheFun: {
				set: function(a, b) { !! O._useCache && !O._tmplCache[a] && (O._tmplCache[a] = b)
				},
				get: function(a) {
					return O._tmplCache[a]
				},
				clear: function() {
					for (var a in O._tmplCache) {
						O._tmplCache[a] = null;
						delete O._tmplCache[a]
					}
				}
			},
			uploadFuns: {
				setTips: function(b, c) {
					var d = {
						common: "warn",
						success: "succ",
						error: "del"
					},
						e = O._diyDom.uploadMSG,
						f = O._diyDom.uploadMsgSpan,
						g = O._diyDom.uploadMsgTxt,
						h = O._diyDom.normTip;
					for (var i in d) if (i === b) {
						a.addClassName(e, "tips_" + d[i]);
						f.className = "icon_" + d[i] + "S"
					} else a.removeClassName(e, "tips_" + d[i]);
					g.innerHTML = c;
					e.style.display = "";
					h.style.display = "none"
				},
				setDisable: function() {
					a.removeNode(x);
					var b = function(b) {
							var c = a.core.dom.getSize(b),
								d = a.position(b),
								e = a.core.dom.cssText();
							e.push("position", "absolute");
							e.push("left", d.l + "px");
							e.push("top", d.t + "px");
							e.push("width", c.width + "px");
							e.push("height", c.height + "px");
							e.push("z-index", "10002");
							e.push("background-color", "black");
							var f = a.C("div");
							f.style.cssText = e.getCss();
							a.setStyle(f, "opacity", 0);
							document.body.appendChild(f);
							return f
						};
					clearTimeout(z);
					z = setTimeout(function() {
						x = b(O._diyDom.upload_pic)
					}, 500)
				},
				setEnable: function() {
					clearTimeout(z);
					a.removeNode(x)
				},
				start: function() {
					O.uploadFuns.setTips("common", b("#L{正在上传}..."));
					O.uploadFuns.setDisable()
				},
				errFunc: function(a) {
					O.uploadFuns.setEnable();
					O.locus.add("upload", "err");
					O.uploadFuns.setTips("error", a)
				},
				complete: function(c) {
					var d = O._diyDom.uploadBtnText;
					d && (d.innerHTML = b('<i class="W_ico16 icon_upload_redo"></i>#L{重新选择}'));
					O.uploadFuns.setEnable();
					O._tempSkin.pid = c.pid;
					O.uploadFuns.setTips("success", b("#L{上传成功！}"));
					O._diyDom.upload_pic.innerHTML = '<img class="usr_bg" src=' + i(c.pid, {
						size: "thumb180"
					}) + "/>";
					var e = O._diyDom.use_bg;
					e.checked = !0;
					e.removeAttribute("disabled");
					var f = new Image;
					f.src = i(c.pid, {
						size: "thumb180"
					});
					a.core.util.hideContainer.appendChild(f);
					f.onload = function() {
						O._diyDom.repeat_bg.checked = this.width <= j;
						var b = O._diyDom.alignment;
						b.options[1].selected = !0;
						b.removeAttribute("disabled");
						O.DiyStyleFun.setBg(c.pid, !0);
						this.onload = null;
						a.core.dom.removeNode(this)
					};
					O.locus.add("upload", c.pid)
				},
				err: function() {
					O.uploadFuns.errFunc(b("#L{上传失败！仅支持大小不超过5M的jpg、gif、png图片上传。}"))
				},
				timeout: function() {
					O.uploadFuns.errFunc(b("#L{上传失败}！#L{网络超时请稍后再试}。"))
				}
			},
			DiyStyleFun: {
				getDiyControlPanelData: function(b) {
					var c = a.sizzle("img", b.upload_pic)[0],
						d = a.sizzle(".current", O.diyList)[0];
					d && (d = a.core.json.queryToJson(d.getAttribute("action-data")).scheme);
					var e = b.alignment.value;
					return {
						skinId: $CONFIG.skin,
						pid: O._tempSkin.pid || $CONFIG.background || "",
						useBg: b.use_bg.checked,
						lock: b.lock_bg.checked,
						repeat: b.repeat_bg.checked,
						scheme: d || $CONFIG.scheme,
						position: e
					}
				},
				getDefaultStyles: function() {
					return {
						skinId: $CONFIG.skin,
						pid: $CONFIG.background,
						topHeight: e(document.body, "backgroundPosition"),
						useBg: !0,
						position: e(document.body, "backgroundPosition"),
						lock: e(document.body, "backgroundAttachment"),
						repeat: e(document.body, "backgroundRepeat")
					}
				},
				setDiyStyles: function(a) {
					O.DiyStyleFun.setBg(a.pid, a.useBg);
					O.DiyStyleFun.setAligin(a.position);
					O.DiyStyleFun.setBgLock(a.lock);
					O.DiyStyleFun.setBgRepeat(a.repeat)
				},
				setBg: function(a, b) {
					a = typeof a == "undefined" ? "" : a;
					a = i(a, {
						size: "large"
					});
					a = b ? a == "url()" ? "" : "url(" + a + ")" : "url()";
					if (O._diyDom) {
						O._diyDom.lock_bg.disabled = !b;
						O._diyDom.repeat_bg.disabled = !b
					}
					f();
					O._tempSkin.useBg = b ? "1" : "0"
				},
				setBgLock: function(a) {
					O._tempSkin.lock = a ? "1" : "0";
					a = a == undefined ? "" : a ? "fixed" : "scroll";
					f()
				},
				setBgRepeat: function(a) {
					typeof a == "boolean" && (a = a ? "repeat" : "no-repeat");
					f();
					O._tempSkin.repeat = a === "repeat" ? "1" : "0"
				},
				setAligin: function(a) {
					a = a == undefined ? "" : a;
					O._tempSkin.position = a;
					f()
				},
				setTopHeight: function(a) {
					a = a == undefined ? "" : a;
					O._tempSkin.topHeight = parseInt(a, 10);
					f()
				},
				setScheme: function(b, c) {
					var d;
					if (typeof b == "string") d = {
						el: a.sizzle('[action-data="scheme=' + b + '"]', O._diyDom.diy_list)[0],
						scheme: b
					};
					else {
						var e = a.sizzle(".current", b)[0];
						e || (e = a.sizzle("a", b)[0]);
						d = a.core.json.queryToJson(e.getAttribute("action-data"))
					}
					O.DOM_eventFun.useScheme({
						el: e,
						data: d
					}, !0, c)
				}
			},
			skinFuns: {
				cancelHilightScheme: function() {
					if (O._diyDom && O._diyDom.diy_list) {
						var b = O._diyDom.diy_list,
							c = a.sizzle('[action-type="useScheme"]', b);
						a.foreach(c, function(b) {
							a.removeClassName(b, "current")
						})
					}
				},
				getCustColorObj: function() {
					if ( !! O._diyDom) {
						var b = O._diyDom.cust_color_list;
						if (!b) return {};
						var c = {},
							d = a.sizzle("li", b);
						a.foreach(d, function(b) {
							var d = a.queryToJson(b.getAttribute("action-data"));
							if (d.pos === "content_bg") {
								var e = a.sizzle("span", b)[0];
								c.content_bg_rgb = e.style.backgroundColor
							}
							c[d.pos] = d.color
						});
						return c
					}
				},
				setCustColorObj: function(b) {
					var c = b;
					delete c.scheme;
					for (var d in c) {
						var e = a.sizzle("span", O._diyDom["cust_" + d])[0];
						e.style.backgroundColor = c[d];
						var f = e.parentNode;
						f.setAttribute("action-data", a.jsonToQuery({
							pos: d,
							color: c[d]
						}))
					}
				},
				setCurrentSkin: function(b) {
					if (!O._tempSkin || !! O._tempSkin.skinId) {
						if (b == "temp") {
							var c = a.sizzle(".current", a.sizzle("div.templete_list", O.sysControlPanel)[0])[0];
							c && a.core.dom.removeClassName(c, "current");
							var d = a.sizzle("a", a.sizzle("div.templete_list", O.sysControlPanel)[0])
						} else if (b == "suit") {
							var c = a.sizzle(".current", a.sizzle("div.templete_list", O.suitControlPanel)[0])[0];
							c && a.core.dom.removeClassName(c, "current");
							var d = a.sizzle("a", a.sizzle("div.templete_list", O.suitControlPanel)[0])
						}
						for (var e = 0; e < d.length; e++) {
							var f = d[e];
							if (O._tempSkin.skinId == a.core.json.queryToJson(f.getAttribute("action-data")).skinId) {
								a.core.dom.addClassName(f, "current");
								break
							}
						}
					}
				}
			},
			TransFun: {
				getSuitAndTempInnerHtml: function(b, d) {
					var e = b.isSuit != 1,
						f = b.page || "";
					f === "1" && (f = "");
					var g = b.curcate + f,
						h = O.TmplCacheFun.get(g);
					if (h) if (e) {
						O.sysControlPanel.innerHTML = h;
						O.skinFuns.setCurrentSkin("temp")
					} else {
						O.suitControlPanel.innerHTML = h;
						O.skinFuns.setCurrentSkin("suit")
					} else c.getTrans("getskinlist", {
						onSuccess: function(c) {
							var f = c.data;
							G = f.is_member;
							H = f.user_cover;
							I = f.is_suit;
							J = f.ver;
							var h = f.html;
							O.TmplCacheFun.set(g, h);
							if (G) {
								O.seeMemLink.style.display = "";
								O.openMemLink.style.display = "none"
							} else {
								O.seeMemLink.style.display = "none";
								O.openMemLink.style.display = ""
							}
							if (e) {
								O.sysControlPanel.innerHTML = h;
								if (d) {
									l = h;
									if (b.skinId) {
										O.locus.add("skinId", b.skinId);
										O._tempSkin.skinId = b.skinId;
										bd("sys", !0)
									}
									a.custEvent.fire(C, "load", [b.skinId, f.skin_name || ""])
								} else O.skinFuns.setCurrentSkin("temp")
							} else {
								O.suitControlPanel.innerHTML = h;
								if (d) {
									m = h;
									if (b.skinId) {
										O.locus.add("skinId", b.skinId);
										O._tempSkin.skinId = b.skinId;
										bd("suit", !0)
									}
									a.custEvent.fire(C, "load", [b.skinId, f.skin_name || ""])
								} else O.skinFuns.setCurrentSkin("suit")
							}
						},
						onFail: function() {},
						onError: function(a) {}
					}).request(b)
				},
				getDiyInnerHtml: function(b, d) {
					var e = "diy",
						f = O.TmplCacheFun.get(e);
					if (f) {
						O.diyControlPanel.innerHTML = f;
						O.diyList = a.sizzle('[node-type="diy_list"]', O.diyControlPanel)[0];
						var g = O.diyControlPanel,
							i = a.kit.dom.parseDOM(a.builder(g).list);
						O._diyDom = i;
						var j = function() {
								h(N)
							};
						W("diy", undefined, j)
					} else c.getTrans("getcustom", {
						onSuccess: function(b) {
							var c = b.data;
							G = c.is_member;
							var d = c.html;
							O.TmplCacheFun.set(e, d);
							O.diyControlPanel.innerHTML = d;
							O.diyList = a.sizzle('[node-type="diy_list"]', O.diyControlPanel)[0];
							var f = O.diyControlPanel,
								g = a.kit.dom.parseDOM(a.builder(f).list);
							O._diyDom = g;
							if (s && s.custTemp) {
								O.tabSuit.className = "pftb_lk S_line5 S_txt1 S_bg1";
								O.tabDiy.className = "pftb_lk S_line5 S_txt1 current S_bg5";
								a.custEvent.fire(C, "load")
							}
							W("diy", O.locus.get("skinId") !== "diy")
						},
						onFail: function() {},
						onError: function(a) {}
					}).request(b)
				}
			},
			loadProvColorPicker: function() {
				O.colorPicker = a.common.skin.colorBox(undefined, "STK.common.skin.colorPickerCallBack");
				a.common.channel.colorPick.register("setting", O.listenerFun.settingCustColor)
			},
			listenerFun: {
				settingCustColor: function(b, c) {
					var d = O._diyDom.cust_color_list;
					if ( !! d) {
						q = !0;
						var e = a.sizzle('[node-type="cust_' + c + '"] > span', d)[0];
						if (e) {
							e.style.backgroundColor = "#" + b;
							e.parentNode.setAttribute("action-data", "pos=" + c + "&color=#" + b)
						}
						c === "content_bg" && (O.custColor.content_bg_rgb = e.style.backgroundColor);
						O.custColor[c] = "#" + b;
						O.skinFuns.cancelHilightScheme();
						O._tempSkin.colors_type = "1";
						f()
					}
				}
			},
			DOM_eventFun: {
				useTmpl: function(b, c) {
					q = !1;
					O._tempSkin.skinId != b.data.skinId && bd("sys", !0);
					var d = b.el;
					O._lock && V();
					O._tempList = a.sizzle("div.templete_list", O.sysControlPanel)[0];
					if (M.setCurrent("current", d, O._tempList) || c) {
						O._tempSkin.isSuit = 0;
						O._tempSkin.tmplPid = b.data.picid;
						O._tempSkin.skinName = b.data.skinname;
						O.DOM_eventFun.switchCss(!0);
						O._tempSkin.skinId = b.data.skinId;
						O.locus.add("skinId", b.data.skinId);
						var e = function() {
								h(N)
							};
						O.shouldLinkCSS = !0;
						W(b.data.skinId, undefined, e);
						var f = a.sizzle('[node-type="coverPreview"]', O.sysControlPanel)[0];
						if (f) if (F && b.data.coverurl) {
							f.style.display = "none";
							a.custEvent.fire(C, "coverChange", {
								bigUrl: decodeURIComponent(b.data.coverurl),
								isFlash: !1
							})
						} else if (b.data.previewurl) {
							f.style.display = "";
							var g = a.sizzle('[node-type="wrapImg"]', f)[0],
								i = a.sizzle('[node-type="flashBg"]', f)[0];
							g.style.display = "";
							i.style.display = "none";
							a.sizzle("img", f)[0].src = decodeURIComponent(b.data.previewurl)
						} else f.style.display = "none"
					}
					a.preventDefault();
					return !1
				},
				useSuit: function(b, c) {
					q = !1;
					O._tempSkin.skinId != b.data.skinId && bd("suit", !0);
					var d = b.el;
					O._lock && V();
					O._tempList = a.sizzle("div.templete_list", O.suitControlPanel)[0];
					if (M.setCurrent("current", d, O._tempList) || c) {
						O._tempSkin.isSuit = 1;
						O._tempSkin.tmplPid = b.data.picid;
						O._tempSkin.skinName = b.data.skinname;
						O.DOM_eventFun.switchCss(!0);
						O._tempSkin.skinId = b.data.skinId;
						O.locus.add("skinId", b.data.skinId);
						var e = function() {
								h(N)
							};
						O.shouldLinkCSS = !0;
						W(b.data.skinId, undefined, e);
						var f = a.sizzle('[node-type="coverPreview"]', O.suitControlPanel)[0];
						if (b.data.skinId.indexOf("vipf") != -1) {
							var g = $CONFIG.imgPath + "skin/" + b.data.skinId + "/images/cover.swf?version=" + J,
								i = $CONFIG.imgPath + "skin/" + b.data.skinId + "/images/profile_cover_m.swf?version=" + J;
							if (f) if (F && b.data.coverurl) {
								f.style.display = "none";
								a.custEvent.fire(C, "coverChange", {
									bigUrl: decodeURIComponent(b.data.coverurl),
									isFlash: !0,
									flashUrl: g
								})
							} else if (b.data.previewurl) {
								f.style.display = "";
								var j = a.sizzle('[node-type="wrapImg"]', f)[0],
									k = a.sizzle('[node-type="flashBg"]', f)[0];
								j.style.display = "none";
								k.style.display = "";
								var l = a.core.dom.firstChild(k);
								if (l.tagName.toLowerCase() != "div" && l.tagName.toLowerCase() == "object") {
									a.removeNode(l);
									var m = a.C("div");
									m.id = "flashPreview";
									k.appendChild(m)
								}
								var n = {
									id: "flashPreview",
									name: "flashPreview"
								},
									o = {},
									p = {
										menu: "false",
										scale: "noScale",
										allowFullscreen: "true",
										allowScriptAccess: "always",
										bgcolor: "#000",
										wmode: "transparent"
									};
								a.kit.extra.swfobject.embedSWF(i, "flashPreview", "530px", "133px", "10.2", "expressInstall.swf", o, p, n)
							} else f.style.display = "none"
						} else if (f) if (F && b.data.coverurl) {
							f.style.display = "none";
							a.custEvent.fire(C, "coverChange", {
								bigUrl: decodeURIComponent(b.data.coverurl),
								isFlash: !1
							})
						} else if (b.data.previewurl) {
							f.style.display = "";
							var j = a.sizzle('[node-type="wrapImg"]', f)[0],
								k = a.sizzle('[node-type="flashBg"]', f)[0];
							j.style.display = "";
							k.style.display = "none";
							a.sizzle("img", f)[0].src = decodeURIComponent(b.data.previewurl)
						} else f.style.display = "none"
					}
					a.preventDefault();
					return !1
				},
				useScheme: function(b, c, d) {
					O._lock && V();
					var e = b.el;
					if ( !! c || !! M.setCurrent("current", e, O.diyList)) {
						var g = b.data.scheme;
						O.custColor = {};
						O._lock = !0;
						var i = "diy/" + g + (O.isNarrow ? "/skin_narrow.css" : "/skin.css"),
							j = "diy_" + g;
						i = $CONFIG.cssPath + "skin/" + i;
						var k = a.E("skin_transformers1");
						k && (k.id = "skin_transformers_temp1");
						var l = "js_skin_" + j + "_skin";
						O._tempSkin.scheme = g;
						if (!d) {
							O._tempSkin.colors_type = "";
							O.skinFuns.setCustColorObj(b.data)
						}
						U(i, j, l, function(c, d, e) {
							O._lock = !1;
							O.locus.add("scheme", g);
							var i = a.E("skin_transformers_temp1");
							i && h(i);
							f(b)
						}, "skin_transformers1");
						b.evt && a.preventDefault();
						return !1
					}
				},
				switchType: function(b) {
					O.locus.add("switchType", b.data.type || b.data.cate);
					if (b.data.type == "cust") {
						O.TransFun.getDiyInnerHtml(b.data);
						a.preventDefault();
						return !1
					}
					if (!a.core.dom.hasClassName(b.el, "current") || b.data.type == 1) {
						var c = b.data.suit;
						b.data.cate && (c ? a.kit.extra.actionData(O.tabSuit).set("cate", b.data.cate) : a.kit.extra.actionData(O.tabTemp).set("cate", b.data.cate));
						var d = a.parseParam({
							pcate: c ? 1 : 0,
							curcate: b.data.cate || "cate001",
							skinId: "",
							type: "1",
							page: b.data.page || "1",
							isSuit: b.data.suit
						}, b.data);
						O.TransFun.getSuitAndTempInnerHtml(d)
					} else(!a.core.dom.hasClassName(b.el, "current") || b.data.type == 2) && O.TransFun.getDiyInnerHtml(b.data);
					a.preventDefault();
					return !1
				},
				switchCss: function(b) {
					var c = "skin_transformers" + (b ? "1" : ""),
						d = a.E(c);
					d && (d.href = "")
				},
				alignment: function(a) {
					O.locus.add("position", a);
					O.DiyStyleFun.setAligin(a);
					return !1
				},
				setTopHeight: function(a) {
					O.locus.add("topHeight", a);
					O.DiyStyleFun.setTopHeight(a);
					return !1
				},
				useBackground: function(b) {
					var c = a.sizzle("img", O._diyDom.upload_pic)[0],
						d = O._tempSkin.pid || $CONFIG.background || "";
					O.locus.add("useBg", b.el.checked);
					O.locus.add("pid", d);
					O.DiyStyleFun.setBg(d, b.el.checked);
					return !1
				},
				lockBackground: function(a) {
					O.locus.add("lock", a.el.checked);
					O.DiyStyleFun.setBgLock(a.el.checked);
					return !1
				},
				repeatBackground: function(a) {
					O.locus.add("reapeat", a.el.checked);
					O.DiyStyleFun.setBgRepeat(a.el.checked ? "repeat" : "no-repeat");
					return !1
				},
				uploadPic: function(b) {
					var c = a.fixEvent(b.evt),
						d = b.el;
					if ( !! O._diyDom) {
						var e = O._diyDom.upload_dom,
							f = a.core.dom.position(d),
							g = a.core.dom.position(E),
							h = a.scrollPos(),
							i = h.top + c.clientY,
							j = h.left + c.clientX,
							k = parseInt(e.offsetWidth / 2),
							l = parseInt(e.offsetHeight / 2),
							m = i - f.t,
							n = j - f.l,
							o = m - l + (f.t - g.t);
						e.style.left = n - k + (f.l - g.l) + "px";
						e.style.top = o + "px";
						return !1
					}
				},
				reUpload: function(a) {
					return !1
				},
				custColor: function(b) {
					if ( !! O.colorPicker) {
						var c = b.data,
							d = b.el,
							e = a.position(d),
							f = a.core.dom.getSize(d),
							g = e.l + f.width,
							h = e.t + f.height;
						O.colorPicker.show([g, h], c.color, c.pos, d)
					}
				},
				borderColor: function(b) {
					var c = b.el;
					if (!O.provColorPicker) {
						O.provColorPicker = a.common.skin.provColorPicker({
							target: b.el
						});
						a.custEvent.add(O.provColorPicker, "selected", function(b, d, e) {
							O.custColor.border = d;
							var g = a.sizzle("span", c)[0];
							if (g) {
								g.style.backgroundColor = d;
								g.parentNode.setAttribute("action-data", "pos=border&color=" + d)
							}
							O.skinFuns.cancelHilightScheme();
							O._tempSkin.colors_type = "1";
							f({
								setBorder: !0
							})
						})
					}
					var d = a.position(c);
					O.provColorPicker.getDisplayStatus() || O.provColorPicker.show([d.l, d.t])
				},
				save: function(d, e) {
					if (O.save.className != t + "_disable") {
						var f = {},
							h = bc.cover,
							i = bc.diyCover,
							j = function(b, c) {
								f[b] = c;
								var d, e = !0;
								for (var g in f) {
									if (f[g] == undefined) return;
									f[g] == !1 ? e = !1 : d = f[g]
								}
								O.save.className = t;
								if (e) {
									O.saved = !0;
									d = f[L ? "cover" : "skin"] || d;
									L === !0 && (d = [d, undefined, undefined, undefined, K]);
									d[d.length] = O.sync.checked;
									a.custEvent.fire(C, "hide", d)
								}
							},
							k = function() {
								O.save.className = t + "_disable";
								if (h && (typeof e == "undefined" || e == 1)) {
									f.cover = undefined;
									a.custEvent.once(A, "save", function(a, b) {
										j("cover", b ? "cover" : !1)
									});
									A.save()
								}
								if (i && (typeof e == "undefined" || e == 1)) {
									a.custEvent.once(B, "save", function(a, b) {
										j("cover", b ? "cover" : !1)
									});
									B.save()
								}
							};
						if (bc.diyCover) {
							k();
							return
						}
						if (!(bc.suit || bc.sys || bc.diy)) {
							k();
							return
						}
						f.skin = undefined;
						if (O._tempSkin.skinId === "diy") {
							typeof O._tempSkin.lock == "boolean" && (O._tempSkin.lock = O._tempSkin.lock ? "1" : "0");
							typeof O._tempSkin.repeat == "boolean" && (O._tempSkin.repeat = O._tempSkin.repeat ? "1" : "0");
							typeof O._tempSkin.useBg == "boolean" && (O._tempSkin.useBg = O._tempSkin.useBg ? "1" : "0");
							var l = [];
							for (var m in O.custColor) m !== "content_bg_rgb" && l.push('"' + m + '"' + ':"' + O.custColor[m] + '"');
							l.length > 0 && (O._tempSkin.color = "{" + l.join(",") + "}")
						} else if (typeof e == "undefined" && O._tempSkin.skinId.indexOf("vip") != -1) {
							if (!G) {
								var s = g(O._tempSkin);
								s.skinId == "" && (s.skinId = window.$CONFIG && window.$CONFIG.skin || "");
								c.getTrans("checkpriv", {
									onComplete: function(c) {
										if (c.code == "100000") {
											if (h || H) {
												var d = '<#et tip data><div class="layer_point"><dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您选择的套装已为您搭配更精美封面图，保存后原封面图将会被替换}。</p><label for="oldCover0009"><input class="W_checkbox" type="checkbox" node-type="oldCover" name="oldCover0009" id="oldCover0009">#L{保留原封面图同时使用套装模板}</label></dd></dl><div class="btn"><a href="javascript:;" node-type="ok" class="W_btn_a"><span>#L{确定}</span></a><a href="javascript:;" node-type="cancel" class="W_btn_b"><span>#L{取消}</span></a></div></div></#et>',
													e = a.ui.dialog();
												e.setTitle(b("#L{提示}"));
												e.setContent(a.core.util.easyTemplate(b(d), {}).toString());
												e.show();
												e.setMiddle();
												var f = a.kit.dom.parseDOM(a.builder(e.getInner()).list);
												n(f.cancel, "click", e.hide);
												n(f.ok, "click", function() {
													O.DOM_eventFun.save({}, f.oldCover.checked ? 1 : 0);
													e.hide()
												});
												return
											}
											O.DOM_eventFun.save({}, 0)
										} else if (c.code == "100001") a.custEvent.fire(C, "noprivilege", []);
										else {
											p(w);
											j("skin", !1)
										}
									}
								}).request({
									skinId: s.skinId
								});
								return
							}
							if (h || H) {
								var o = '<#et tip data><div class="layer_point"><dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您选择的套装已为您搭配更精美封面图，保存后原封面图将会被替换}。</p><label for="oldCover0009"><input class="W_checkbox" type="checkbox" node-type="oldCover" name="oldCover0009" id="oldCover0009">#L{保留原封面图同时使用套装模板}</label></dd></dl><div class="btn"><a href="javascript:;" node-type="ok" class="W_btn_a"><span>#L{确定}</span></a><a href="javascript:;" node-type="cancel" class="W_btn_b"><span>#L{取消}</span></a></div></div></#et>',
									q = a.ui.dialog();
								q.setTitle(b("#L{提示}"));
								q.setContent(a.core.util.easyTemplate(b(o), {}).toString());
								q.show();
								q.setMiddle();
								var r = a.kit.dom.parseDOM(a.builder(q.getInner()).list);
								n(r.cancel, "click", q.hide);
								n(r.ok, "click", function() {
									O.DOM_eventFun.save({}, r.oldCover.checked ? 1 : 0);
									q.hide()
								});
								return
							}
						} else if (typeof e == "undefined" && parseInt(O._tempSkin.isSuit, 10) == 1 || typeof e == "undefined" && parseInt(I, 10) == 1) if (h || H) {
							var o = '<#et tip data><div class="layer_point"><dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您选择的套装已为您搭配更精美封面图，保存后原封面图将会被替换}。</p><label for="oldCover0009"><input class="W_checkbox" type="checkbox" node-type="oldCover" name="oldCover0009" id="oldCover0009">#L{保留原封面图同时使用套装模板}</label></dd></dl><div class="btn"><a href="javascript:;" node-type="ok" class="W_btn_a"><span>#L{确定}</span></a><a href="javascript:;" node-type="cancel" class="W_btn_b"><span>#L{取消}</span></a></div></div></#et>',
								v = a.ui.dialog();
							v.setTitle(b("#L{提示}"));
							v.setContent(a.core.util.easyTemplate(b(o), {}).toString());
							v.show();
							v.setMiddle();
							var r = a.kit.dom.parseDOM(a.builder(v.getInner()).list);
							n(r.cancel, "click", v.hide);
							n(r.ok, "click", function() {
								O.DOM_eventFun.save({}, r.oldCover.checked ? 1 : 0);
								v.hide()
							});
							return
						}
						k();
						var s = g(O._tempSkin);
						s.replace_cover = e;
						s.skinId == "" && (s.skinId = window.$CONFIG && window.$CONFIG.skin || "");
						O._tempSkin.skinId != "diy" ? c.getTrans("updatesys", {
							onSuccess: function(b) {
								if (b.data.noprivilege) a.custEvent.fire(C, "noprivilege", []);
								else {
									O._tempSkin.skinId && ($CONFIG.skin = O._tempSkin.skinId);
									if (b.data.skinid != b.data.old_skinid) {
										b.data.skinid && (O._tempSkin.skinId = b.data.skinid);
										b.data.skin_picid && (O._tempSkin.tmplPid = b.data.skin_picid);
										b.data.skin_name && (O._tempSkin.skinName = b.data.skin_name)
									}
									j("skin", [O._tempSkin.skinName, O._tempSkin.skinId, O._tempSkin.tmplPid, b.data.mblog_text])
								}
							},
							onFail: function() {
								p(w);
								j("skin", !1)
							},
							onError: function(a) {
								p(w);
								j("skin", !1)
							}
						}).request({
							skinId: O._tempSkin.skinId,
							replace_cover: e,
							suit: O._tempSkin.isSuit
						}) : c.getTrans("updatecustom", {
							onSuccess: function(b) {
								if (b.data.noprivilege) a.custEvent.fire(C, "noprivilege", []);
								else {
									$CONFIG.skin = "diy";
									$CONFIG.background = O._tempSkin.pid || "";
									$CONFIG.scheme = O._tempSkin.scheme;
									if (b.data.skinid != b.data.old_skinid) {
										b.data.skinid && (O._tempSkin.skinId = b.data.skinid);
										b.data.skin_picid && (O._tempSkin.tmplPid = b.data.skin_picid);
										b.data.skin_name && (O._tempSkin.skinName = b.data.skin_name)
									}
									j("skin", [O._tempSkin.skinName, O._tempSkin.skinId, O._tempSkin.tmplPid, b.data.mblog_text])
								}
							},
							onFail: function() {
								p(u);
								j("skin", !1)
							},
							onError: function(a) {
								p(u);
								j("skin", !1)
							}
						}).request(s);
						a.preventDefault();
						return !1
					}
				},
				cancel: function() {
					a.custEvent.fire(C, "hide", ["cancel"]);
					a.preventDefault();
					return !1
				},
				swapBtn: function(a) {
					var b = O.DOM.list;
					if (a) {
						b.save && (b.save[0].style.display = "none");
						b.canncel && (b.canncel[0].style.display = "none");
						b.gomember && (b.gomember[0].style.display = "")
					} else {
						b.save && (b.save[0].style.display = "");
						b.canncel && (b.canncel[0].style.display = "");
						b.gomember && (b.gomember[0].style.display = "none")
					}
				},
				tab: function(b) {
					var c = b.data.type,
						d = b.el;
					if (!a.hasClassName(d, "current")) {
						a.removeNode(x);
						var e = a.sizzle("a.current", O.tabList)[0],
							f = e.className;
						e.className = d.className;
						d.className = f;
						L = !1;
						if (c == "suit") {
							Z(!1, {
								cate: b.data.cate
							});
							O.DOM_eventFun.swapBtn(!1);
							O.locus.add("switchType", d.cate);
							bd("suit", !0)
						} else if (c == "sys") {
							O.DOM_eventFun.swapBtn(!1);
							O.locus.add("switchType", d.type);
							bd("sys", !0);
							O.DOM_eventFun.switchType({
								el: d,
								data: {
									type: "1",
									curcate: b.data.cate
								}
							})
						} else if (c == "diy") {
							O.shouldLinkCSS = !1;
							if (b.data.ctype == "custTemp") {
								bd("diy", !0);
								O.DOM_eventFun.swapBtn(!1);
								O.DOM_eventFun.switchType({
									el: d,
									data: {
										type: "2"
									}
								})
							} else O.DOM_eventFun.custCover(b.data)
						} else {
							O.DOM_eventFun.swapBtn(!1);
							L = !0;
							A.init()
						}
						O.suitControlPanel.style.display = "none";
						O.sysControlPanel.style.display = "none";
						O.diyControlPanel.style.display = "none";
						O.coverControlPanel.style.display = "none";
						O[c + "ControlPanel"].style.display = ""
					}
				},
				custTemp: function(b) {
					O.shouldLinkCSS = !1;
					var c = b.el;
					if (!a.hasClassName(c, "current")) {
						a.kit.extra.actionData(O.tabDiy).set("ctype", b.data.ctype);
						bd("diy", !0);
						O.DOM_eventFun.swapBtn(!1);
						O.DOM_eventFun.switchType({
							el: c,
							data: {
								type: "cust"
							}
						})
					}
				},
				custCover: function(b) {
					function j(b, c) {
						a.common.trans.cover.getTrans(b, {
							onSuccess: function(c) {
								var d = c.data;
								if (b == "getcovercustom") {
									isSysCover = !1;
									G = d.member;
									O.tabSuit.className = "pftb_lk S_line5 S_txt1 S_bg1";
									O.tabDiy.className = "pftb_lk S_line5 S_txt1 current S_bg5";
									s && s.custCover && a.custEvent.fire(C, "load");
									i(d)
								}
								if (!inited) {
									a.custEvent.fire(C, "inited");
									inited = !0
								}
							},
							onFail: function() {
								p(v)
							},
							onError: function(a) {
								p(v)
							}
						}).request(c || {})
					}
					function i(b) {
						B && B.destroy();
						B = a.common.cover.custCover(O.diyControlPanel, b);
						if (s && s.custCover) {
							bd("diyCover", !0);
							G ? O.DOM_eventFun.swapBtn(!1) : O.DOM_eventFun.swapBtn(!0);
							setTimeout(function() {
								a.custEvent.fire(C, "reposition")
							}, 300)
						}
						a.custEvent.add(B, "saveReady", function(a, b) {
							bd("diyCover", !0)
						});
						a.custEvent.add(B, "save", function(b, c) {
							a.custEvent.fire(C, "save", c)
						});
						!b.is_customize && b.customize_pic && bd("diyCover", !0);
						O.save.className = t + "_disable"
					}
					if (s === undefined || s && !s.custCover) {
						O.DOM_eventFun.switchCss(!0);
						var c = function() {
								h(N)
							};
						O.shouldLinkCSS = !0;
						W(O._custCover.skinId, undefined, c)
					}
					var d;
					b.ctype == "custCover" && (d = !0);
					bc.diyCover = !0;
					if (!d) {
						var e = b.el;
						if (e != undefined) {
							if (e && a.hasClassName(e, "current")) return;
							a.kit.extra.actionData(O.tabDiy).set("ctype", b.data.ctype);
							a.kit.extra.actionData(O.tabDiy).set("ttype", b.data.type)
						}
						G ? O.DOM_eventFun.swapBtn(!1) : O.DOM_eventFun.swapBtn(!0);
						if (e != undefined) {
							K = b.data.type == "vip" ? !0 : !1;
							b.data.filter = 1;
							j("getcovercustom", b.data)
						} else {
							K = G ? !0 : !1;
							var b = {};
							b.data = {};
							b.data.filter = 1;
							b.data.ctype = "custCover";
							j("getcovercustom", b.data)
						}
					} else {
						var f = b.type;
						G ? O.DOM_eventFun.swapBtn(!1) : O.DOM_eventFun.swapBtn(!0);
						K = f == "vip" ? !0 : !1;
						var g = {
							type: b.ttype,
							filter: 1
						};
						j("getcovercustom", g)
					}
				}
			}
		},
			P = {},
			Q = function(b, c) {
				a.common.trans.cover.getTrans(b, {
					onSuccess: function(c) {
						var d = c.data;
						if (b == "getcovercustom") {
							isSysCover = !1;
							initCustCover(d)
						} else {
							isSysCover = !0;
							node.innerHTML = d.cover_html;
							isSysCover || a.custEvent.fire(C, "saveReady", !1)
						}
						if (!inited) {
							a.custEvent.fire(C, "inited");
							inited = !0
						}
					},
					onFail: function() {
						p(v)
					},
					onError: function(a) {
						p(v)
					}
				}).request(c || {})
			},
			R = function(a, b) {
				var c = P[a] || (P[a] = {
					loaded: !1,
					list: []
				});
				if (c.loaded) {
					b(a, !0);
					return !1
				}
				c.list.push(b);
				return c.list.length <= 1
			},
			S = function(a, b) {
				var c = P[a].list;
				for (var d = 0; d < c.length; d++) c[d](a, !1, b);
				P[a].loaded = !0;
				delete P[a].list
			},
			T = function() {
				var b = a.C("link");
				b.setAttribute("rel", "Stylesheet");
				b.setAttribute("type", "text/css");
				b.setAttribute("charset", "utf-8");
				return b
			},
			U = function(b, c, d, e, f) {
				var g = T();
				O.requestUrl = b + "?version=" + J;
				g.setAttribute("href", O.requestUrl);
				g.id = f || "skin_transformers";
				var h = a.E("custom_style");
				O.shouldLinkCSS && (h ? a.insertBefore(g, h) : document.getElementsByTagName("head")[0].appendChild(g));
				var i = a.C("div");
				i.id = d;
				a.core.util.hideContainer.appendChild(i);
				var j = 3e3,
					k = function() {
						if (parseInt(a.core.dom.getStyle(i, "height")) == 42) {
							a.core.util.hideContainer.removeChild(i);
							O.requestUrl = "";
							e(b)
						} else if (--j <= 0 || O.abort) {
							O._lock = !1;
							a.core.util.hideContainer.removeChild(i);
							O.requestUrl = "";
							O.abort = !1;
							e(b, !1, !0);
							delete P[b]
						} else e(b)
					};
				setTimeout(k, 50)
			},
			V = function(b) {
				var c = a.sizzle('link:[href="' + O.requestUrl + '"]', document.head)[0];
				if (!c) return !1;
				var d = c.id,
					e = "skin_transformers_temp" + (d === "skin_transformers" ? "" : "1"),
					f = a.E(e);
				f && a.core.dom.removeNode(f);
				a.core.dom.removeNode(c);
				var g = T();
				g.id = d;
				document.getElementsByTagName("head")[0].appendChild(g);
				O.abort = !0
			},
			W = function(b, c, d) {
				O._lock && V(b);
				var e = b.replace("_", "") + (O.isNarrow && b != "diy" ? "/skin_narrow.css" : "/skin.css");
				$CONFIG.lang === "zh-tw" && (e = e.replace(/(skin.*?)\.css$/, "$1_CHT.css"));
				O._tempSkin.skinId != "diy" && (O._custCover.skinId = O._tempSkin.skinId);
				b == "diy" && (O._tempSkin.skinId = "diy");
				if (e === "diy/skin.css" && a.core.util.browser.IE6) {
					d && d();
					X()
				} else {
					var f = b + "_skin",
						g = a.E("skin_transformers");
					g && (g.id = "skin_transformers_temp");
					var i = "js_skin_" + e.replace(/^\/?(.*)\.css$/i, "$1").replace(/\//g, "_");
					e = $CONFIG.cssPath + "skin/" + e;
					if ($CONFIG.skin == b && b == "diy" && !O.locus.get("changeSkin")) {
						g && (g.id = "skin_transformers");
						var j = !0;
						O._lock = !0;
						typeof c != "undefined" && (j = !c);
						X(j);
						return
					}
					O._lock = !0;
					U(e, f, i, function(c, e, f) {
						O._lock = !1;
						!f && d && d();
						var g = a.E("skin_transformers_temp");
						g && h(g);
						b === "diy" && X()
					}, undefined);
					b === "diy" && X()
				}
			},
			X = function(b) {
				O._lock = !1;
				var d, e = "skin_transformers1";
				O.locus.add("skinId", "diy");
				var f = O.diyControlPanel,
					h = a.kit.dom.parseDOM(a.builder(f).list);
				if ( !! h.alignment) {
					O._diyDom = h;
					var i = h.alignment;
					n(i, "change", function() {
						if (i.getAttribute("disabled") !== "true") {
							var a = i.value;
							O.DOM_eventFun.alignment(a)
						}
					});
					var j = h.colorPanel;
					a.delegatedEvent(j).add("colorPage", "click", function(b) {
						c.getTrans("getcolor", {
							onSuccess: function(b) {
								h.diy_panel.innerHTML = b.data;
								O.diyList = a.sizzle('[node-type="diy_list"]', j)[0]
							}
						}).request({
							page: b.data.page,
							count: b.data.count
						});
						a.preventDefault()
					});
					a.foreach(a.sizzle("label[for]", f), function(b) {
						var c = "for_" + a.getUniqueKey();
						b.setAttribute("for", c);
						var d = a.sizzle("input[type=checkbox]", b)[0];
						d.setAttribute("id", c);
						d.setAttribute("name", c)
					});
					var k = h.upload_div,
						l = a.sizzle("img", h.upload_pic)[0];
					O._tempSkin = O.DiyStyleFun.getDiyControlPanelData(h);
					O._tempSkin.skinId = "diy";
					O._tempSkin.colors_type = $CONFIG.colors_type;
					O.DefaultSkin = a.core.obj.parseParam(O.DefaultSkin, g(O._tempSkin));
					d = T();
					d.id = e;
					b || O.DiyStyleFun.setScheme($CONFIG.scheme || h.diy_list, !0);
					var m = a.ui.mod.uploadPic(f, O.uploadFuns),
						o = h.UploadForm,
						p = h.uploadFileBtn;
					p.setAttribute("name", "pic1");
					n(p, "change", function() {
						m.doUpload(o, p)
					});
					D = !0
				}
			},
			Y = function() {},
			Z = function(b, c) {
				var d = a.parseParam({
					pcate: 1,
					curcate: c && c.cate || s && s.cate,
					isSuit: 1,
					skinId: ""
				}, o),
					e = d.curcate,
					f = O.TmplCacheFun.get(e);
				s && s.cate && O.tabSuit && a.kit.extra.actionData(O.tabSuit).set("cate", s.cate);
				f ? O.suitControlPanel.innerHTML = f : O.TransFun.getSuitAndTempInnerHtml(d, b)
			},
			_ = function() {
				var c = /skinId=/.test(window.location.href) && !/skinId=setskin/.test(window.location.href);
				O.DOM = a.builder(d(r, {
					saveClass: c ? "W_btn_a" : "W_btn_a_disable"
				}).toString());
				O.tabSuit = O.DOM.list.tabSuit[0];
				O.tabTemp = O.DOM.list.tabTemp[0];
				O.tabDiy = O.DOM.list.tabDiy[0];
				O.sync = O.DOM.list.sync[0];
				O.suitControlPanel = O.DOM.list.suitControlPanel[0];
				O.sysControlPanel = O.DOM.list.sysControlPanel[0];
				O.coverControlPanel = O.DOM.list.coverControlPanel[0];
				O.diyControlPanel = O.DOM.list.diyControlPanel[0];
				O.container = O.DOM.list.custTmplContainer[0];
				O.tabList = O.DOM.list.tabList[0];
				O.DEvent = a.core.evt.delegatedEvent(O.container);
				O.save = a.sizzle('[action-type="save"]', O.container)[0];
				O.seeMemLink = O.DOM.list.seeMemLink[0];
				O.openMemLink = O.DOM.list.openMemLink[0];
				var e = (new Date).valueOf(),
					f = (new Date(2013, 5, 14)).valueOf();
				e <= f && (O.openMemLink.innerHTML = b('<a href="/z/vipskin?from=skin" target="_blank"><span class="icon_warnS"></span>#L{全部会员模板免费使用，快来看看吧！}</a>'));
				O.locus.add("skinId", $CONFIG.skin)
			},
			ba = function() {
				s && !s.custCover && !s.custTemp ? Z(!0) : s === undefined && Z(!0);
				O.DefaultSkin = O.DiyStyleFun.getDefaultStyles();
				O._tempSkin = g(O.DefaultSkin);
				O._custCover.skinId = O._tempSkin.skinId;
				O.loadProvColorPicker();
				A = a.common.cover.cover(O.coverControlPanel);
				if (s && s.custTemp) {
					var b = a.queryToJson(O.tabDiy.getAttribute("action-data")),
						c = {
							el: O.tabDiy,
							data: b
						};
					O.DOM_eventFun.custTemp(c)
				}
				if (s && s.custCover) {
					O.tabDiy && a.kit.extra.actionData(O.tabDiy).set("ctype", "custCover");
					var b = a.queryToJson(O.tabDiy.getAttribute("action-data")),
						c = {
							el: O.tabDiy,
							data: b
						};
					O.DOM_eventFun.custCover(c)
				}
				a.custEvent.add(A, "coverChange", function(b, c) {
					a.custEvent.fire(C, "coverChange", {
						bigUrl: c.bigUrl,
						isFlash: !1
					})
				});
				a.custEvent.add(A, "tabChange", function(a, b) {
					b.type ? O.DOM_eventFun.swapBtn(!1) : O.DOM_eventFun.swapBtn(!0);
					K = b.type == "vip" ? !0 : !1
				});
				a.custEvent.add(A, "saveReady", function(a, b) {
					bd("cover", b)
				})
			},
			bb = function() {
				O.DEvent.add("useTmpl", "click", O.DOM_eventFun.useTmpl);
				O.DEvent.add("useSuit", "click", O.DOM_eventFun.useSuit);
				O.DEvent.add("useScheme", "click", O.DOM_eventFun.useScheme);
				O.DEvent.add("switchType", "click", O.DOM_eventFun.switchType);
				O.DEvent.add("use_bg", "click", O.DOM_eventFun.useBackground);
				O.DEvent.add("lock_bg", "click", O.DOM_eventFun.lockBackground);
				O.DEvent.add("repeat_bg", "click", O.DOM_eventFun.repeatBackground);
				O.DEvent.add("upload_pic", "mousemove", O.DOM_eventFun.uploadPic);
				O.DEvent.add("reUpload", "click", O.DOM_eventFun.reUpload);
				O.DEvent.add("cust_color", "click", O.DOM_eventFun.custColor);
				O.DEvent.add("border_color", "click", O.DOM_eventFun.borderColor);
				O.DEvent.add("save", "click", O.DOM_eventFun.save);
				O.DEvent.add("cancel", "click", O.DOM_eventFun.cancel);
				O.DEvent.add("tab", "click", O.DOM_eventFun.tab);
				O.DEvent.add("custTemp", "click", O.DOM_eventFun.custTemp);
				O.DEvent.add("custCover", "click", O.DOM_eventFun.custCover)
			},
			bc = {
				suit: !1,
				sys: !1,
				diy: !1,
				cover: !1,
				diyCover: !1
			},
			bd = function(a, b) {
				bc[a] = b;
				for (var c in bc) a == c ? bc[c] = b : bc[c] = !1;
				for (var d in bc) if (bc[d]) {
					O.save.className = t;
					return
				}
				O.save.className = t + "_disable"
			},
			be = function() {
				O.DEvent.destroy();
				O.TmplCacheFun.clear();
				A && A.destroy();
				O.DOM = null;
				k = l = null
			},
			bf = function() {
				Y();
				_();
				ba();
				bb()
			};
		bf();
		C.getDom = function() {
			return O.DOM.box
		};
		C.destroy = be;
		C.hide = function() {
			O.locus.clear()
		};
		C.setOuter = function(a) {
			E = a
		};
		C.save = function() {
			a.core.evt.fireEvent(O.save, "click")
		};
		var bh = function() {
				if (window.location.href.match(/skinId/)) setTimeout(function() {
					window.location.href = window.location.href.split("?")[0]
				}, 10);
				else if (window.location.href.match(/homeskin/)) setTimeout(function() {
					window.location.href = window.location.href.split("?")[0]
				}, 10);
				else if (window.location.href.match(/profilecustcover/)) setTimeout(function() {
					window.location.href = window.location.href.split("?")[0]
				}, 10);
				else {
					var a = window.location.href.replace(/^[^?]*\?/g, "");
					a === "setskin" ? window.location.href = window.location.href.replace(/\?.*/g, "") : window.location.reload()
				}
			};
		C.canClose = function() {
			if (!O.saved) {
				if (bg() && O.save.className == t) {
					a.ui.confirm(b("#L{您的个性化设置还没有保存，确认关闭吗？}"), {
						icon: "warn",
						OK: function() {
							a.custEvent.fire(C, "hide", ["force"]);
							bh()
						}
					});
					return !1
				}
				bh();
				return !0
			}
			return !0
		};
		C.getDomList = function() {
			return O.DOM.list
		};
		return C
	}
});
STK.register("common.skin.skinManager", function(a) {
	var b = {
		title: "#L{个性化设置}"
	},
		c = a.kit.extra.language,
		d = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner"></div></div></td></tr></table></div></div>';
	return function(e) {
		var f = {};
		a.custEvent.define(f, ["coverChange"]);
		var g, h, i, j;
		g = a.parseParam({
			styleId: "1",
			isProfile: !1
		}, e);
		var k, l, m;
		a.custEvent.define(f, ["hide"]);
		var n = !0,
			o = function() {
				clearTimeout(m);
				m = null
			},
			p = function(e, h) {
				function m() {
					return i.canClose()
				}
				j = a.ui.mod.dialog(c(d));
				a.kit.dom.drag(j.getDom("title"), {
					actObj: j,
					moveDom: j.getOuter()
				});
				j.setTitle(c(b.title));
				i = a.common.skin.custTmpl({
					skinId: e,
					isProfile: g.isProfile
				}, h);
				j.appendChild(i.getDom());
				k = j.getInner();
				k.className = "";
				l = j.getOuter();
				i.setOuter(l);
				j.setBeforeHideFn(m);
				a.custEvent.add(i, "load", function(b, d, e) {
					j.show();
					j.setMiddle();
					!e || a.ui.confirm(c("#L{确认使用} “" + e + "” #L{模板替换原有模板}？"), {
						icon: "question",
						OK: i.save
					})
				});
				a.custEvent.add(i, "reposition", function() {
					j.setMiddle()
				});
				a.custEvent.add(i, "coverChange", function(b, c) {
					a.custEvent.fire(f, "coverChange", c)
				});
				a.custEvent.add(i, "noprivilege", function(b) {
					var d = '<#et tip data><div class="layer_point"><dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{你还不是微博会员不能使用会员专属模板}！</p><p class="S_txt2"><a class="S_link2" href="${data.memberlink}" target="_blank">#L{微博会员}</a>#L{可使用会员专属模板}</p></dd></dl><div class="btn"><a href="javascript:void(0)" node-type="backToSkin">#L{返回模板设置}</a><a class="W_btn_v" href="${data.joinmember}" target="_blank"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div></div></#et>',
						e = a.ui.dialog();
					e.setTitle(c("#L{提示}"));
					e.setContent(a.core.util.easyTemplate(c(d), {
						imgsrc: window.$CONFIG.imgPath + "style/images/common/transparent.gif",
						memberlink: "http://vip.weibo.com/privilege",
						joinmember: "http://vip.weibo.com/paycenter?from=skintry"
					}).toString());
					e.show();
					e.setMiddle();
					var f = a.kit.dom.parseDOM(a.builder(e.getInner()).list),
						g = function() {
							e.hide()
						};
					a.addEvent(f.backToSkin, "click", g);
					a.custEvent.add(e, "hide", function() {
						a.custEvent.remove(e, "hide", arguments.callee);
						a.removeEvent(f.backToSkin, "click", g)
					})
				});
				a.custEvent.add(i, "hide", function(b, d, e, f, g, h) {
					var i = arguments[arguments.length - 1];
					j.hide(d === "force");
					var k = function(b) {
							var d = a.common.trans.feed,
								e = function(b, d) {
									a.common.channel.feed.fire("publish", b.data.html);
									a.ui.litePrompt(c("#L{保存成功}！"), {
										type: "succM",
										timeout: "800",
										hideCallback: function() {
											q()
										}
									})
								},
								f = function(b, d) {
									a.ui.litePrompt(c("#L{保存成功}！"), {
										type: "succM",
										timeout: "800",
										hideCallback: function() {
											q()
										}
									})
								},
								g = d.getTrans("publish", {
									onSuccess: e,
									onError: f,
									onTimeout: f
								}).request(b)
						};
					if (d !== "cancel" && d !== "force") {
						if (!i) {
							a.ui.litePrompt(c("#L{保存成功}！"), {
								type: "succM",
								timeout: "500",
								hideCallback: function() {
									o();
									q()
								}
							});
							return
						}
						if (d == "cover") {
							var l, m = h ? c("#L{#个性封面图#我刚刚更换了我的个人主页封面图，一张图就能代表我的态度，欢迎来围观}") : c("#L{我刚刚更换了个人主页封面图，欢迎大家围观哦～}");
							m += "@" + $CONFIG.nick + " http://" + window.location.hostname + "/" + $CONFIG.uid + "/profile";
							i && k({
								text: m,
								source: "fengmian"
							});
							return
						}
						var n = !1,
							p, r = 3e3;
						if (d && e) {
							var m = g || c("#L{我刚换了}“") + d + c("”#L{模板}"),
								s = (new Date).valueOf(),
								t = (new Date(2013, 5, 14)).valueOf();
							s <= t && e.indexOf("vip") != -1 && (m = c("#L{#微博会员周年回馈，模板免费使用#}") + m);
							i && k({
								text: m,
								pic_id: f || "",
								skin_id: e
							})
						} else a.ui.litePrompt(c("#L{保存成功}！"), {
							type: "succM",
							timeout: "500",
							hideCallback: function() {
								o();
								q()
							}
						})
					}
				});
				a.custEvent.add(j, "hide", function() {
					i.hide();
					j.clearBeforeHideFn();
					a.custEvent.remove(j, "hide", arguments.callee);
					v()
				})
			},
			q = function() {
				setTimeout(function() {
					window.location.href = window.location.toString().replace(/(\?|#).*$/, "")
				}, 10);
				return !1
			},
			r = function() {
				j.hide()
			},
			s = function() {
				j.setMiddle(k)
			},
			t = function() {
				j.getOuter().style.position = "absolute";
				u()
			},
			u = function() {
				var b = {},
					c, d = a.core.util.winSize(),
					e = j.getSize(!0),
					c = a.core.util.scrollPos().top + d.height - e.h;
				b.t = c > 0 ? c : 0;
				b.l = d.width - e.w;
				j.setPosition(b)
			},
			v = function() {
				o();
				j.destroy();
				i.destroy()
			};
		f.show = p;
		return f
	}
});
STK.register("common.skin.business", function(a) {
	var b = a.kit.extra.language,
		c = b('<#et picData data><div class="layer_other_templete">   <dl class="clearfix">\t    <dt><img alt="" src="${data.url}"></dt>   \t<dd>\t\t    <p class="son_title">#L{确认要替换为此模板吗}？</p>\t\t    <p class=""><a href="javascript:void(0);" action-type="save" class="W_btn_b"><span>#L{保存}</span></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" action-type="cancel" class="W_btn_d"><span>#L{取消}</span></a></p>\t    </dd>   </dl></div>');
	return function(d) {
		var e = {},
			f, g, h = a.common.trans.custTmpl,
			i, j, k = function() {
				j = a.core.util.easyTemplate(c, d);
				f = a.ui.dialog();
				g = a.core.evt.delegatedEvent(f.getInner())
			},
			l = function() {
				f.setTitle(b("#L{模板设置}"));
				f.setContent(j.toString());
				f.show();
				f.setMiddle()
			},
			m = function() {
				if (!d.pid) throw new Error("common.skin.business 没有pid!");
				i = d.pid;
				d.url = $CONFIG.imgPath + "/skin/" + d.pid + "/layer.png?version=" + $CONFIG.version
			},
			n = function() {
				setTimeout(function() {
					window.location.href = window.location.href.split("?")[0]
				}, 10);
				return !1
			},
			o = function() {
				a.ui.litePrompt(b("#L{系统繁忙，请稍后再试}！"), {
					type: "error",
					timeout: "1000",
					hideCallback: l
				})
			},
			p = function(c, d, e, g) {
				a.ui.confirm(b("#L{保存成功}！<br>#L{将我使用的模板推荐给粉丝}？"), {
					icon: "success",
					OK: function() {
						setTimeout(function() {
							var h = a.common.dialog.publish({
								styleId: "1",
								picBtn: !1
							});
							g = g || b("#L{我刚换了}") + c + b("#L{模板}");
							h.show({
								title: b("#L{聊聊你的新模板，推荐给你的粉丝吧} O(∩_∩)O"),
								content: g
							});
							d && h.addExtraInfo("pic_id=" + d + "&skin_id=" + e);
							a.custEvent.add(h, "publish", function() {
								f.hide();
								h.hide();
								a.ui.litePrompt(b("#L{推荐成功。}"), {
									type: "succM",
									timeout: "500",
									hideCallback: function() {
										n()
									}
								});
								a.custEvent.remove(h, "publish", arguments.callee)
							});
							a.custEvent.add(h, "hide", function() {
								a.custEvent.remove(h, "hide", arguments.callee);
								n()
							})
						}, 0)
					},
					cancel: function() {
						n()
					}
				})
			},
			q = {
				save: function() {
					h.getTrans("save", {
						onSuccess: function(c) {
							var d = c.data;
							if (d.skinid == d.old_skinid) {
								f.hide();
								a.ui.litePrompt(b("#L{保存成功}！"), {
									type: "succM",
									timeout: "1000",
									hideCallback: n
								})
							} else p(d.skin_name, d.skin_picid, d.skinid, d.mblog_text)
						},
						onFail: function() {
							o()
						},
						onError: function() {
							o()
						}
					}).request({
						skinId: i
					});
					a.preventDefault();
					return !1
				},
				cancel: function() {
					n()
				}
			},
			r = function() {
				a.custEvent.add(f, "hide", function() {
					a.custEvent.remove(f, "hide", arguments.callee);
					u();
					n()
				})
			},
			s = function() {
				g.add("save", "click", q.save);
				g.add("cancel", "click", q.cancel)
			},
			t = function() {
				m();
				k();
				s();
				r()
			};
		t();
		l();
		var u = function() {
				g.remove("save", "click", q.save);
				g.remove("cancel", "click", q.cancel)
			};
		e.destroy = u;
		return e
	}
});
STK.register("pl.content.setSkin.source.init", function(a) {
	return function(b, c) {
		var d = {};
		a.custEvent.define(d, "coverChange");
		var e = a.core.dom.sizzle,
			f = e('[node-type="set_skin"]', b)[0],
			g, h = !1,
			i = function(b, e) {
				b = typeof b != "string" ? undefined : b;
				g = g || a.common.skin.skinManager({
					isProfile: c && c.isProfile || !1
				});
				a.custEvent.add(g, "coverChange", function(b, c) {
					a.custEvent.fire(d, "coverChange", c)
				});
				g.show(b == "setskin" ? undefined : b, e)
			},
			j = function(a, b) {
				if (!h) {
					h = !0;
					i(a, b)
				}
			},
			k = function(a, b) {
				j(a, b);
				return !1
			};
		a.addEvent(f, "click", k);
		if (window.location.href.match(/setskin/)) j("setskin");
		else {
			var l = window.location.search.replace("?", "");
			l = a.core.json.queryToJson(l);
			if (l.skinId) {
				var m = l.skinId.match(/skin3/) && window.$CONFIG && window.$CONFIG.skin == l.skinId;
				m ? a.common.skin.business({
					pid: l.skinId
				}) : j(l.skinId)
			} else if (l.homeskin) {
				l.homeskin == "member" ? l.homeskin = "cate024" : l.homeskin == "dyna" && (l.homeskin = "cate025");
				k(undefined, {
					cate: l.homeskin
				})
			}
		}
		d.destroy = function() {
			return
		};
		return d
	}
});
STK.pageletM.register("pl.content.setSkin.index", function(a) {
	var b = a.E("pl_content_setSkin"),
		c = a.pl.content.setSkin.source.init(b);
	return c
});