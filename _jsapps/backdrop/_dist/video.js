define("text", ["module"], function (e) { "use strict"; function t(e, t) { return void 0 === e || "" === e ? t : e } function i(e, i, a, o) { if (i === o) return !0; if (e === a) { if ("http" === e) return t(i, "80") === t(o, "80"); if ("https" === e) return t(i, "443") === t(o, "443") } return !1 } var a, o, n, r, d, s = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], l = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, p = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, u = "undefined" != typeof location && location.href, c = u && location.protocol && location.protocol.replace(/\:/, ""), v = u && location.hostname, h = u && (location.port || void 0), m = {}, _ = e.config && e.config() || {}; return a = { version: "2.0.16", strip: function (e) { if (e) { e = e.replace(l, ""); var t = e.match(p); t && (e = t[1]) } else e = ""; return e }, jsEscape: function (e) { return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029") }, createXhr: _.createXhr || function () { var e, t, i; if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest; if ("undefined" != typeof ActiveXObject) for (t = 0; t < 3; t += 1) { i = s[t]; try { e = new ActiveXObject(i) } catch (e) { } if (e) { s = [i]; break } } return e }, parseName: function (e) { var t, i, a, o = !1, n = e.lastIndexOf("."), r = 0 === e.indexOf("./") || 0 === e.indexOf("../"); return -1 !== n && (!r || n > 1) ? (t = e.substring(0, n), i = e.substring(n + 1)) : t = e, a = i || t, n = a.indexOf("!"), -1 !== n && (o = "strip" === a.substring(n + 1), a = a.substring(0, n), i ? i = a : t = a), { moduleName: t, ext: i, strip: o } }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, t, o, n) { var r, d, s, l = a.xdRegExp.exec(e); return !l || (r = l[2], d = l[3], d = d.split(":"), s = d[1], d = d[0], (!r || r === t) && (!d || d.toLowerCase() === o.toLowerCase()) && (!s && !d || i(r, s, t, n))) }, finishLoad: function (e, t, i, o) { i = t ? a.strip(i) : i, _.isBuild && (m[e] = i), o(i) }, load: function (e, t, i, o) { if (o && o.isBuild && !o.inlineText) return void i(); _.isBuild = o && o.isBuild; var n = a.parseName(e), r = n.moduleName + (n.ext ? "." + n.ext : ""), d = t.toUrl(r), s = _.useXhr || a.useXhr; if (0 === d.indexOf("empty:")) return void i(); !u || s(d, c, v, h) ? a.get(d, function (t) { a.finishLoad(e, n.strip, t, i) }, function (e) { i.error && i.error(e) }) : t([r], function (e) { a.finishLoad(n.moduleName + "." + n.ext, n.strip, e, i) }, function (e) { i.error && i.error(e) }) }, write: function (e, t, i, o) { if (m.hasOwnProperty(t)) { var n = a.jsEscape(m[t]); i.asModule(e + "!" + t, "define(function () { return '" + n + "';});\n") } }, writeFile: function (e, t, i, o, n) { var r = a.parseName(t), d = r.ext ? "." + r.ext : "", s = r.moduleName + d, l = i.toUrl(r.moduleName + d) + ".js"; a.load(s, i, function (t) { var i = function (e) { return o(l, e) }; i.asModule = function (e, t) { return o.asModule(e, l, t) }, a.write(e, s, i, n) }, n) } }, "node" === _.env || !_.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (o = require.nodeRequire("fs"), a.get = function (e, t, i) { try { var a = o.readFileSync(e, "utf8"); "\ufeff" === a[0] && (a = a.substring(1)), t(a) } catch (e) { i && i(e) } }) : "xhr" === _.env || !_.env && a.createXhr() ? a.get = function (e, t, i, o) { var n, r = a.createXhr(); if (r.open("GET", e, !0), o) for (n in o) o.hasOwnProperty(n) && r.setRequestHeader(n.toLowerCase(), o[n]); _.onXhr && _.onXhr(r, e), r.onreadystatechange = function (a) { var o, n; 4 === r.readyState && (o = r.status || 0, o > 399 && o < 600 ? (n = new Error(e + " HTTP status: " + o), n.xhr = r, i && i(n)) : t(r.responseText), _.onXhrComplete && _.onXhrComplete(r, e)) }, r.send(null) } : "rhino" === _.env || !_.env && "undefined" != typeof Packages && "undefined" != typeof java ? a.get = function (e, t) { var i, a, o = new java.io.File(e), n = java.lang.System.getProperty("line.separator"), r = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o), "utf-8")), d = ""; try { for (i = new java.lang.StringBuffer, a = r.readLine(), a && a.length() && 65279 === a.charAt(0) && (a = a.substring(1)), null !== a && i.append(a); null !== (a = r.readLine());)i.append(n), i.append(a); d = String(i.toString()) } finally { r.close() } t(d) } : ("xpconnect" === _.env || !_.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (n = Components.classes, r = Components.interfaces, Components.utils.import("resource://gre/modules/FileUtils.jsm"), d = "@mozilla.org/windows-registry-key;1" in n, a.get = function (e, t) { var i, a, o, s = {}; d && (e = e.replace(/\//g, "\\")), o = new FileUtils.File(e); try { i = n["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream), i.init(o, 1, 0, !1), a = n["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream), a.init(i, "utf-8", i.available(), r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), a.readString(i.available(), s), a.close(), i.close(), t(s.value) } catch (e) { throw new Error((o && o.path || "") + ": " + e) } }), a }), define("text!video/template.html", [], function () { return '<div class="backdrop_background"></div>\n\n<div class="video_background">\n\t<div class="video_wrapper_outer">\n\t\t\n\t\t<div class="video_wrapper_inner"><div class="image_overlay"></div></div>\n\t</div>\n</div>\n' }), define("global_libs/require/normalize", [], function () { function e(e, i, o) { if (e.match(d) || e.match(r)) return e; e = n(e); var s = o.match(r), l = i.match(r); return !l || s && s[1] == l[1] && s[2] == l[2] ? a(t(e, i), o) : t(e, i) } function t(e, t) { if ("./" == e.substr(0, 2) && (e = e.substr(2)), e.match(d) || e.match(r)) return e; var i = t.split("/"), a = e.split("/"); for (i.pop(); curPart = a.shift();)".." == curPart ? i.pop() : i.push(curPart); return i.join("/") } function a(e, t) { var a = t.split("/"); for (a.pop(), t = a.join("/") + "/", i = 0; t.substr(i, 1) == e.substr(i, 1);)i++; for (; "/" != t.substr(i, 1);)i--; t = t.substr(i + 1), e = e.substr(i + 1), a = t.split("/"); var o = e.split("/"); for (out = ""; a.shift();)out += "../"; for (; curPart = o.shift();)out += curPart + "/"; return out.substr(0, out.length - 1) } var o = /([^:])\/+/g, n = function (e) { return e.replace(o, "$1/") }, r = /[^\:\/]*:\/\/([^\/])*/, d = /^(\/|data:)/, s = function (t, i, a) { i = n(i), a = n(a); for (var o, r, t, d = /@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi; o = d.exec(t);) { r = o[3] || o[2] || o[5] || o[6] || o[4]; var s; s = e(r, i, a); var l = o[5] || o[6] ? 1 : 0; t = t.substr(0, d.lastIndex - r.length - l - 1) + s + t.substr(d.lastIndex - l - 1), d.lastIndex = d.lastIndex + (s.length - r.length) } return t }; return s.convertURIBase = e, s.absoluteURI = t, s.relativeURI = a, s }), define("css", [], function () { if ("undefined" == typeof window) return { load: function (e, t, i) { i() } }; var e = document.getElementsByTagName("head")[0], t = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0, i = !1, a = !0; t[1] || t[7] ? i = parseInt(t[1]) < 6 || parseInt(t[7]) <= 9 : t[2] || t[8] ? a = !1 : t[4] && (i = parseInt(t[4]) < 18); var o = {}; o.pluginBuilder = "global_libs/require/css-builder"; var n, r, d, s = function () { n = document.createElement("style"), e.appendChild(n), r = n.styleSheet || n.sheet }, l = 0, p = [], u = function (e) { l++, 32 == l && (s(), l = 0), r.addImport(e), n.onload = function () { c() } }, c = function () { d(); var e = p.shift(); return e ? (d = e[1], void u(e[0])) : void (d = null) }, v = function (e, t) { if (r && r.addImport || s(), r && r.addImport) d ? p.push([e, t]) : (u(e), d = t); else { n.textContent = '@import "' + e + '";'; var i = setInterval(function () { try { n.sheet.cssRules, clearInterval(i), t() } catch (e) { } }, 10) } }, h = function (t, i) { var o = document.createElement("link"); if (o.type = "text/css", o.rel = "stylesheet", a) o.onload = function () { o.onload = function () { }, setTimeout(i, 7) }; else var n = setInterval(function () { for (var e = 0; e < document.styleSheets.length; e++) { if (document.styleSheets[e].href == o.href) return clearInterval(n), i() } }, 10); o.href = t, e.appendChild(o) }; return o.normalize = function (e, t) { return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e) }, o.load = function (e, t, a) { (i ? v : h)(t.toUrl(e + ".css"), a) }, o }), define("css!video/style", [], function () { }), define("video/main", ["text!video/template.html", "css!./style"], function (e) { return Backbone.View.extend({ template: _.template(e), deferredLoadEventName: "video-load-complete", defaults: { video_url: "//static.cargo.site/assets/backdrop/video/DTLA_1950.mov", limit_size: !1, scale_option: "cover", overscan: 0, mute: !0, color: "rgba(51,51,51,1)", alpha: 100, preset_image: "/_jsapps/backdrop/video/assets/interlace.png", fallback_active: !0, use_mobile_image: !1, image: "//static.cargo.site/assets/backdrop/default.jpg", hex: "#333", using_preset: !1, preset_width: "1px", preset_height: "3px", image_active: !1, plugin_id: 13, pattern_image: "//static.cargo.site/assets/backdrop/video/icon-image.svg", video_opacity: 100 }, current_volume: 0, canPlayH264: function () { var e = document.createElement("video"); return !(!e.canPlayType || !e.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, "")) }, vimeo_iframe: '<iframe class="video_embed" src="%s" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', youtube_tag: '<div class="video_embed"></div>', ios_video_tag: '<video class="video_embed" autoplay loop="loop" preload="true" webkit-playsinline playsinline muted><source src="%s" type="video/mp4"></video>', video_tag: '<video class="video_embed" autoplay playsinline muted loop="loop"><source src="%s" type="video/mp4"></video>', object_tag: '<object class="video_embed" type="application/x-shockwave-flash" data="/_jsapps/backdrop/video/assets/Persona_vcr.swf?vid=%s"><param name="movie" value="Persona_vcr.swf?vid=%s" /><param name="allowscriptaccess" value="always" /><param name="wmode" value="transparent" /></object>', fallback_tag: '<div class="video_embed fallback_image" style="background-image:url(%s)"></div>', api_player: null, initialize: function (e) { this.el = this.$el.get(0), this.backdropEl = null, this.SetSizeFromMainView = _.bind(this.SetSizeFromMainView, this); this.video_data = { current_url: "", window_width: 0, window_height: 0, vid_width: 1280, vid_height: 720, player_loaded: !1, vid_type: "", player_inited: !1, use_mobile_fallback_image: !1 }, this.paused = !0, this.in_viewport = !1; var t = this.model.get("data"); t = _.defaults(t, this.defaults), this.model.set("data", t), this.Update("mute", !0), this.listenTo(this.model, "reset", this.Init) }, destroy: function () { this.tearDownEmbed(), CargoEditor && CargoEditor.hasOwnProperty("events") && CargoEditor.events.off("editor-content-change", this.resetElementCache); try { parent.document, parent.hasOwnProperty("Cargo") && parent.Cargo.hasOwnProperty("Event") && parent.Cargo.Event.off("applied-presets", this.resetElementCache) } catch (e) { } this.destroyed = !0 }, render: function () { var e = Cargo.Core.Handlebars.Render("{{>loading_animation}}", {}); return e += this.template({ settings: this.model.toJSON() }), this.el.style.opacity = 0, this.$el.html(e), this }, Init: function () { var e = _.clone(this.model.get("data")); _.isEmpty(this.model.attributes) || (void 0 == e.pattern_image && (e[pattern_image] = "blank", this.model.set("data", e)), "" != e.video_url.trim() && e.video_url || (e.video_url = this.defaults.video_url, this.model.set("data", e)), this.initEmbed(), this.UpdateColorOverlay(), this.UpdateImagePattern()) }, Update: function (e, t) { var i = this.model.get("data"); "video_url" == e && t == i[e] || void 0 !== t && (i[e] = t, this.model.set("data", i), "video_url" == e && this.video_data.current_url !== t && this.video_data.current_url !== this.defaults.video_url && ($(".loading_animation", this.el).removeClass("hidden"), this.video_data.current_url = t, this.tearDownEmbed(), this.initEmbed(), this.ResizeVid(), this.UpdateColorOverlay()), this.ResizeVid(), "alpha" != e && "color" != e && "hex" != e || this.UpdateColorOverlay(), "image_active" != e && "pattern_image" != e || this.UpdateImagePattern()) }, showPlayer: function () { $(".video_embed", this.$el).css("visibility", "visible"), $(".loading_animation", this.el).addClass("hidden"), Cargo.Event.trigger(this.deferredLoadEventName) }, tearDownEmbed: function () { "youtube" == this.video_data.vid_type && this.video_data.player_loaded && this.api_player.destroy(), "vimeo" == this.video_data.vid_type && this.video_data.player_loaded && (this.$el.find("[data-vimeo-initialized]").removeAttr("data-vimeo-initialized"), this.api_player.unload()), $(".video_embed", this.$el).remove(), this.api_player = null, this.video_data.player_loaded = !1, this.video_data.player_inited = !1 }, initEmbed: function () { var e = this.in_viewport ? 1 : 0, t = this.model.get("data"), i = t.video_url; if ("undefined" !== i && !this.video_data.player_inited) { if (/<\s*iframe/gi.test(i)) return void this.OnMalformedVideoURL(); var a = this, o = $(".video_wrapper_inner", this.$el); if (Cargo.Helper.isMobile() && t.use_mobile_image && (this.video_data.use_mobile_fallback_image = !0), this.video_data.use_mobile_fallback_image && (i = "image"), this.instanceID || (this.instanceID = _.uniqueId("video_")), /youtu\.?be/.test(i)) { if ("undefined" == typeof YT) { if (!document.getElementById("youtube-api-script")) { var n = document.createElement("script"); n.setAttribute("id", "youtube-api-script"), n.src = "https://www.youtube.com/iframe_api"; var r = document.getElementsByTagName("script")[0]; r.parentNode.insertBefore(n, r), window.onYouTubeIframeAPIReady = $.proxy(function () { !0 !== this.destroyed && Cargo.Event.trigger("youtube_jsapi_load_complete") }, this) } return void Cargo.Event.once("youtube_jsapi_load_complete", function () { a.initEmbed() }) } o.prepend(this.youtube_tag), o.find(".video_embed").attr("id", this.instanceID), this.video_data.vid_type = "youtube"; var d = this.GetYouTubeId(i); this.video_data.player_inited = !0, this.api_player = new YT.Player(this.instanceID, { videoId: d, playerVars: { autoplay: e, controls: 0, disablekb: 0, enablejsapi: 1, fs: 0, iv_load_policy: 3, loop: 1, modestbranding: 1, playsinline: 1, rel: 0, showinfo: 0, theme: "dark" }, events: { onReady: function (e) { !0 !== a.destroyed && (a.api_player.mute(), a.video_data.player_loaded = !0, a.video_data.vid_width = 1280, a.video_data.vid_height = 720, a.UpdateColorOverlay(), a.ResizeVid(), e.target.playVideo(), setTimeout(function () { a.showPlayer() }, 250)) }, onStateChange: function (e) { if (clearTimeout(a.youtubeTimeout), e.data === YT.PlayerState.PLAYING) { var t = a.api_player.getDuration() + -a.api_player.getCurrentTime() + -.033; a.youtubeTimeout = setTimeout(function () { null !== a.api_player && (a.api_player.seekTo(0), a.api_player.playVideo()) }, 1e3 * t) } else e.data === YT.PlayerState.ENDED && a.api_player.playVideo() } } }) } else if (/vimeo.com/.test(i)) { this.video_data.vid_type = "vimeo", this.video_data.player_inited = !0; var e = this.in_viewport ? 1 : 0, d = this.GetVimeoId(t.video_url), s = { muted: !0, id: d, autopause: !1, autoplay: !0, byline: !1, color: "000000", loop: !0, portrait: !1, title: !1, maxwidth: 5e3, maxheight: 5e3, background: 1 }; require(["https://player.vimeo.com/api/player.js"], function (e) { a.$el.find(".video_wrapper_outer").html('<div class="video_wrapper_inner"><div class="image_overlay"></div></div>'), a.UpdateImagePattern(), o = a.$el.find(".video_wrapper_inner"), a.api_player = new e(o.get(0), s), Promise.all([a.api_player.getVideoWidth(), a.api_player.getVideoHeight(), a.api_player.ready()]).then(function (e) { !0 !== a.destroyed && (a.video_data.vid_width = e[0], a.video_data.vid_height = e[1], o.find("iframe").addClass("video_embed").attr({ id: a.instanceID, allow: "autoplay" }), a.video_data.player_loaded = !0, a.UpdateColorOverlay(), a.ResizeVid(), a.api_player.setLoop(!0).then(function (e) { }).catch(function () { a.api_player.on("timeupdate", function (e) { if (!a.api_player.getLoop()) { var t = .25 / e.duration; e.percent + t > 1 && a.api_player.setCurrentTime(0) } }) }), setTimeout(function () { a.showPlayer() }, 400), a.Resume()) }).catch(function () { a.OnMalformedVideoURL() }) }) } else if (/.mp4/.test(i) || /.mov/.test(i) || /.m4v/.test(i)) if (this.canPlayH264()) { this.video_data.vid_type = "file_vid", this.video_data.player_inited = !0; var l; l = Cargo.Helper.isMobile() ? this.ios_video_tag.replace("%s", i) : this.video_tag.replace("%s", i), o.prepend(l), o.find(".video_embed").attr({ id: this.instanceID }); var p = function (e) { !0 !== a.destroyed && ($(".video_embed", a.$el)[0].removeEventListener("loadedmetadata", p, !1), a.video_data.vid_width = this.videoWidth, a.video_data.vid_height = this.videoHeight, a.video_data.player_loaded = !0, a.UpdateColorOverlay(), a.ResizeVid(), a.showPlayer()) }; $(".video_embed", this.$el)[0].addEventListener("loadedmetadata", p, !1) } else this.video_data.vid_type = "file_object", this.video_data.player_inited = !0, o.prepend(this.object_tag.replace("%s", i).replace("%s", i)), o.find(".video_embed").attr("id", this.instanceID), window.getsize = function (e) { if (!0 !== a.destroyed) { a.video_data.player_loaded = !0; var t = e; a.video_data.vid_width = t[0], a.video_data.vid_height = t[1], a.UpdateColorOverlay(), a.ResizeVid(), a.showPlayer() } }; else if (/.m3u8/.test(i)) require(["https://cdn.jsdelivr.net/npm/hls.js@latest"], function (e) { this.video_data.vid_type = "file_vid", this.video_data.player_inited = !0; var t; t = Cargo.Helper.isMobile() ? this.ios_video_tag.replace("%s", i) : this.video_tag.replace("%s", i), o.prepend(t); var a = o.find(".video_embed").attr({ id: this.instanceID })[0], n = function () { !0 !== this.destroyed && (a.removeEventListener("canplay", n, !1), this.video_data.vid_width = a.videoWidth, this.video_data.vid_height = a.videoHeight, this.video_data.player_loaded = !0, this.UpdateColorOverlay(), this.ResizeVid(), this.showPlayer()) }.bind(this); if (a.addEventListener("canplay", n, !1), e.isSupported()) { var r = new e; r.loadSource(i), r.attachMedia(a) } else a.canPlayType("application/vnd.apple.mpegurl") && (a.src = i) }.bind(this)); else if ("image" == i) { this.video_data.vid_type = "image", this.video_data.player_inited = !0; var u = t.image, c = new Image; c.onload = function () { o.prepend(a.fallback_tag.replace("%s", this.src)), u == a.defaults.pattern_image && o.find(".video_embed").css("background-image", ""), o.find(".video_embed").attr("id", a.instanceID), a.video_data.vid_width = this.naturalWidth, a.video_data.vid_height = this.naturalHeight, a.UpdateColorOverlay(), a.ResizeVid(), a.showPlayer() }; var v = Cargo.Collection.Images.fetchImage(u, 250 * Math.ceil(window.innerWidth / 250)); "object" == typeof v ? c.src = v.url : isNaN(parseInt(u)) && "string" == typeof u && (c.src = u) } else this.OnMalformedVideoURL() } }, OnMalformedVideoURL: function () { this.tearDownEmbed(); try { parent.document, parent.Cargo.hasOwnProperty("Editor") && "" !== this.model.get("data").video_url && parent.Cargo.Editor.View.ContentView.$el.find("input#video_url").length > 0 && parent.Cargo.Editor.View.ContentView.$el.find("input#video_url").closest(".text").addClass("error") } catch (e) { } }, GetYouTubeId: function (e) { var t = !1, i = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/, a = e.match(i); return a && 11 == a[7].length && (t = a[7]), t }, GetVimeoId: function (e) { var t = !1, i = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/, a = e.match(i); a && a[3] && (t = a[3]); var o = e.split("/"); return o[o.length - 1] != t && (t += "/" + o[o.length - 1], t = e), t }, SetSizeFromMainView: function (e, t) { this.video_data.window_width == e && this.video_data.window_height == t || (this.video_data.window_width = e, this.video_data.window_height = t, this.ResizeVid()) }, ResizeVid: function () { var e = this, t = this.model.get("data"), i = $(".video_embed", this.$el), a = $(".video_wrapper_inner", this.$el), o = $(".video_wrapper_outer", this.$el), n = parseInt(t.overscan), r = 0, d = 0, s = e.video_data.window_width, l = e.video_data.window_height, p = (e.video_data.vid_width, e.video_data.vid_height), u = 0, c = e.video_data.vid_width / e.video_data.vid_height, v = !1; if (t.hasOwnProperty("margin")) { v = !0; var h = Math.min(l, s), m = Math.max(.01 * t.margin * h); l = Math.max(l - m, .001), s = Math.max(s - m, .001), t.limit_size && "contain" == t.scale_option && (s = Math.min(e.video_data.vid_width, s), l = Math.min(e.video_data.vid_height, l)) } else l = Math.max(n + l, .01), s = Math.max(n + s, .01); u = s / l, "cover" == t.scale_option ? u < c ? (r = c * l, d = l) : (r = s, d = s / c) : "contain" == t.scale_option ? u < c ? (r = s, d = s / c) : (r = l * c, d = l) : "none" == t.scale_option && (v || (p += n), r = c * p, d = p), o.width(s).height(l), a.width(r).height(d), "youtube" == this.video_data.vid_type || "vimeo" == this.video_data.vid_type ? i.width(r).height(d + 400).css({ "margin-top": "-200px" }) : i.width(r).height(d), $(".video_embed", this.$el).css("z-index", 1), setTimeout(function () { $(".video_embed", e.$el).css("z-index", 2) }, 100) }, UpdateImagePattern: function () { var e = this.model.get("data"); if (void 0 != e.image_active && void 0 != e.using_preset) { var t, i = e.pattern_image, a = JSON.parse(e.using_preset), o = e.preset_image, n = JSON.parse(e.image_active), r = $(".image_overlay", this.$el); if (n) { a ? (i = o, r.css({ "background-size": e.preset_width + " " + e.preset_height })) : (t = Cargo.Collection.Images.fetchImage(e.pattern_image, 512)) && (i = t.url); var d = new Image; d.onload = function () { r.css({ "background-image": "url(" + this.src + ")" }), a || r.css({ "background-size": .5 * this.naturalWidth + "px auto" }), r.show() }, i && i != this.defaults.pattern_image ? d.src = i : r.hide() } else r.hide() } }, UpdateColorOverlay: function () { var e = this.model.get("data"); $(".backdrop_background", this.$el).css("background-color", e.color), $(".video_embed", this.$el).css("opacity", e.alpha / 100) }, Pause: function () { if (this.video_data.player_loaded) { this.paused = !0; var e = $(".video_embed", this.$el); "youtube" == this.video_data.vid_type && this.video_data.player_loaded ? this.api_player.pauseVideo() : "vimeo" == this.video_data.vid_type && this.video_data.player_loaded ? this.api_player.pause() : "file_vid" == this.video_data.vid_type && e[0].pause() } }, resume_tries: 0, Resume: function () { var e = this; if (!this.video_data.player_loaded) return void (this.resumeTimeout = setTimeout(function () { e.in_viewport && e.Resume() }, 100)); if (!this.in_viewport) return void this.Pause(); if (this.resume_tries > 30) return void (this.resume_tries = 0); var t = (this.model.get("data").mute, $(".video_embed", this.$el)); if ("youtube" == this.video_data.vid_type) this.api_player.playVideo(); else if ("vimeo" == this.video_data.vid_type) this.api_player.play().then(function () { }).catch(function (e) { }); else if ("file_vid" == this.video_data.vid_type) try { t.get(0).paused && t.get(0).play().then(function () { setTimeout(function () { t.get(0).paused && e.model.get("data").fallback_active && !e.paused && (e.video_data.use_mobile_fallback_image = !0, e.tearDownEmbed(), e.initEmbed()) }, 150), e.resume_tries = 0 }).catch(function (t) { setTimeout(function () { e.Resume() }, 100), e.resume_tries > 20 && e.model.get("data").fallback_active ? (e.video_data.use_mobile_fallback_image = !0, e.tearDownEmbed(), e.initEmbed(), e.resume_tries = 0) : e.resume_tries++ }) } catch (i) { t.get(0).muted = !0; t.get(0).play(); setTimeout(function () { t.get(0).paused && Cargo.Helper.isMobile() && e.model.get("data").fallback_active && e.in_viewport ? (e.video_data.use_mobile_fallback_image = !0, e.tearDownEmbed(), e.initEmbed(), e.resume_tries++) : e.resume_tries = 0 }, 10) } this.paused = !1 } }) }), Backdrop.Data.require_loaded = !0, function (e) { var t = document, i = "appendChild", a = "styleSheet", o = t.createElement("style"); o.type = "text/css", t.getElementsByTagName("head")[0][i](o), o[a] ? o[a].cssText = e : o[i](t.createTextNode(e)) }('[data-backdrop="video"].backdrop > div {\n\topacity: 0;\n}\n\n[data-backdrop="video"].backdrop .backdrop_background {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: #333;\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tz-index: 0;\n\toverflow: hidden;\n\tpointer-events:none;\n}\n\n[data-backdrop="video"].backdrop .video_background {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tz-index: 1;\n\toverflow: hidden;\n\tpointer-events:none;\n}\n\n[data-backdrop="video"].backdrop .video_wrapper_outer {\n\toverflow: hidden;\n\tposition: absolute;\n\tmin-width: 3px;\n\tmin-height: 3px;\n\ttop: -100%;\n\tleft: -2000px;\n\tright: -2000px;\n\tbottom: -100%;\n\tmargin: auto;\n}\n\n[data-backdrop="video"].backdrop .video_wrapper_inner {\n\toverflow: hidden;\n\tposition: absolute;\n\tmin-width: 10px;\n\tmin-height: 10px;\n\tleft: -2000px;\n\tright: -2000px;\n\ttop: -2000px;\n\tbottom: -2000px;\n\tmargin: auto;\n}\n\n[data-backdrop="video"].backdrop .video_embed {\n\tvisibility: hidden;\n\tposition: absolute;\n\tmin-width: 10px;\n\tmin-height: 10px;\n\ttop: 0;\n\tleft: -100%;\n\tright: -100%;\n\tmargin-left: auto;\n\tmargin-right: auto;\n\tpointer-events: none;\n}\n\n[data-backdrop="video"].backdrop ::-webkit-media-controls-panel {\n  display: none!important;\n  -webkit-appearance: none;\n}\n\n/* Old shadow dom for play button */\n\n[data-backdrop="video"].backdrop ::--webkit-media-controls-play-button {\n  display: none!important;\n  -webkit-appearance: none;\n}\n\n/* New shadow dom for play button */\n\n[data-backdrop="video"]. ::-webkit-media-controls-start-playback-button {\n  display: none!important;\n  -webkit-appearance: none;\n}\n\n[data-backdrop="video"].backdrop .video_background.clickable {\n\tpointer-events: auto;\n}\n\n[data-backdrop="video"].backdrop .video_embed.fallback_image {\n\tbackground-repeat:no-repeat;\n\tbackground-size: cover;\n\tbackground-position: center;\n}\n\n[data-backdrop="video"].backdrop .image_overlay {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground-size: 24px;\n\timage-rendering: -moz-pixelated;\n\timage-rendering: -o-pixelated;\n\timage-rendering: -webkit-optimize-contrast;\n\timage-rendering: pixelated;\n\tbackground-position: center;\n\tz-index: 10;\n\tpointer-events:none;\n}\n\n\n@-webkit-keyframes noisemove {\n\t0%   { background-position: 0px 0px; }\n\t33.33%   { background-position: 80px 140px; }\n\t66.66%   { background-position: 200px 30px; }\n\t100%   { background-position: 0px 0px; }\n}\n\n@-moz-keyframes noisemove {\n\t0%   { background-position: 0px 0px; }\n\t33.33%   { background-position: 80px 140px; }\n\t66.66%   { background-position: 200px 30px; }\n\t100%   { background-position: 0px 0px; }\n}\n@-o-keyframes noisemove {\n\t0%   { background-position: 0px 0px; }\n\t33.33%   { background-position: 80px 140px; }\n\t66.66%   { background-position: 200px 30px; }\n\t100%   { background-position: 0px 0px; }\n}\n@keyframes noisemove {\n\t0%   { background-position: 0px 0px; }\n\t33.33%   { background-position: 80px 140px; }\n\t66.66%   { background-position: 200px 30px; }\n\t100%   { background-position: 0px 0px; }\n}\n');