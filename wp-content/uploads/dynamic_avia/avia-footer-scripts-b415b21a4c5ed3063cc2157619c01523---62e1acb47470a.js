;
if (!Array.isArray) {
    Array.isArray = function(t) {
        return Object.prototype.toString.call(t) === '[object Array]'
    }
}(function(t) {
    'use strict';
    t(function() {
        t.avia_utilities = t.avia_utilities || {};
        a('html');
        n('html');
        c();
        i();
        new t.AviaTooltip({
            'class': 'avia-search-tooltip',
            data: 'avia-search-tooltip',
            event: 'click',
            position: 'bottom',
            scope: 'body',
            attach: 'element',
            within_screen: !0,
            close_keys: 27
        });
        new t.AviaTooltip({
            'class': 'avia-related-tooltip',
            data: 'avia-related-tooltip',
            scope: '.related_posts, .av-share-box',
            attach: 'element',
            delay: 0
        });
        new t.AviaAjaxSearch({
            scope: '#header, .avia_search_element'
        });
        if (t.fn.avia_iso_sort) {
            t('.grid-sort-container').avia_iso_sort()
        };
        o();
        t.avia_utilities.avia_ajax_call()
    });
    t.avia_utilities = t.avia_utilities || {};
    t.avia_utilities.avia_ajax_call = function(e) {
        if (typeof e == 'undefined') {
            e = 'body'
        };
        t('a.avianolink').on('click', function(t) {
            t.preventDefault()
        });
        t('a.aviablank').attr('target', '_blank');
        if (t.fn.avia_activate_lightbox) {
            t(e).avia_activate_lightbox()
        };
        if (t.fn.avia_scrollspy) {
            if (e == 'body') {
                t('body').avia_scrollspy({
                    target: '.main_menu .menu li > a'
                })
            } else {
                t('body').avia_scrollspy('refresh')
            }
        };
        if (t.fn.avia_smoothscroll) {
            t('a[href*="#"]', e).avia_smoothscroll(e)
        };
        l(e);
        s(e);
        r(e);
        if (t.fn.avia_html5_activation && t.fn.mediaelementplayer) {
            t('.avia_video, .avia_audio', e).avia_html5_activation({
                ratio: '16:9'
            })
        }
    };
    t.avia_utilities.log = function(t, e, i) {
        if (typeof console == 'undefined') {
            return
        };
        if (typeof e == 'undefined') {
            e = 'log'
        };
        e = 'AVIA-' + e.toUpperCase();
        console.log('[' + e + '] ' + t);
        if (typeof i != 'undefined') {
            console.log(i)
        }
    };

    function i() {
        var s = t(window),
            i = t('html').is('.html_header_sidebar') ? '#main' : '#header',
            o = t(i),
            r = o.parents('div').eq(0),
            l = t(i + ' .container').first(),
            e = '',
            a = function() {
                var i = '',
                    a = Math.round(l.width()),
                    n = Math.round(o.width()),
                    s = Math.round(r.width());
                i += ' #header .three.units{width:' + (a * 0.25) + 'px;}';
                i += ' #header .six.units{width:' + (a * 0.50) + 'px;}';
                i += ' #header .nine.units{width:' + (a * 0.75) + 'px;}';
                i += ' #header .twelve.units{width:' + (a) + 'px;}';
                i += ' .av-framed-box .av-layout-tab-inner .container{width:' + (s) + 'px;}';
                i += ' .html_header_sidebar .av-layout-tab-inner .container{width:' + (n) + 'px;}';
                i += ' .boxed .av-layout-tab-inner .container{width:' + (n) + 'px;}';
                i += ' .av-framed-box#top .av-submenu-container{width:' + (s) + 'px;}';
                try {
                    e.text(i)
                } catch (h) {
                    e.remove();
                    var c = t('head').first();
                    e = t('<style type=\'text/css\' id=\'av-browser-width-calc\'>' + i + '</style>').appendTo(c)
                }
            };
        if (t('.avia_mega_div').length > 0 || t('.av-layout-tab-inner').length > 0 || t('.av-submenu-container').length > 0) {
            var n = t('head').first();
            e = t('<style type=\'text/css\' id=\'av-browser-width-calc\'></style>').appendTo(n);
            s.on('debouncedresize', a);
            a()
        }
    };

    function o() {
        var e = t('.sidebar_shadow#top #main .sidebar'),
            i = t('.sidebar_shadow .content');
        if (e.height() >= i.height()) {
            e.addClass('av-enable-shadow')
        } else {
            i.addClass('av-enable-shadow')
        }
    };

    function e(e, o) {
        var i = this,
            s = i.process.bind(i),
            a = i.refresh.bind(i),
            r = t(e).is('body') ? t(window) : t(e),
            n;
        i.$body = t('body');
        i.$win = t(window);
        i.options = t.extend({}, t.fn.avia_scrollspy.defaults, o);
        i.selector = (i.options.target || ((n = t(e).attr('href')) && n.replace(/.*(?=#[^\s]+$)/, '')) || '');
        i.activation_true = !1;
        if (i.$body.find(i.selector + '[href*=\'#\']').length) {
            i.$scrollElement = r.on('scroll.scroll-spy.data-api', s);
            i.$win.on('av-height-change', a);
            i.$body.on('av_resize_finished', a);
            i.activation_true = !0;
            i.checkFirst();
            setTimeout(function() {
                i.refresh();
                i.process()
            }, 100)
        }
    };
    e.prototype = {
        constructor: e,
        checkFirst: function() {
            var t = window.location.href.split('#')[0],
                e = this.$body.find(this.selector + '[href=\'' + t + '\']').attr('href', t + '#top')
        },
        refresh: function() {
            if (!this.activation_true) return;
            var e = this,
                i;
            this.offsets = t([]);
            this.targets = t([]);
            i = this.$body.find(this.selector).map(function() {
                var n = t(this),
                    s = n.data('target') || n.attr('href'),
                    i = this.hash,
                    i = i.replace(/\//g, ''),
                    o = /^#\w/.test(i) && t(i),
                    a = e.$scrollElement.get(0),
                    r = a != null && a === a.window;
                return (o && o.length && [
                    [o.position().top + (!r && e.$scrollElement.scrollTop()), s]
                ]) || null
            }).sort(function(t, e) {
                return t[0] - e[0]
            }).each(function() {
                e.offsets.push(this[0]);
                e.targets.push(this[1])
            })
        },
        process: function() {
            if (!this.offsets) return;
            if (isNaN(this.options.offset)) this.options.offset = 0;
            var i = this.$scrollElement.scrollTop() + this.options.offset,
                n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                s = n - this.$scrollElement.height(),
                e = this.offsets,
                o = this.targets,
                a = this.activeTarget,
                t;
            if (i >= s) {
                return a != (t = o.last()[0]) && this.activate(t)
            };
            for (t = e.length; t--;) {
                a != o[t] && i >= e[t] && (!e[t + 1] || i <= e[t + 1]) && this.activate(o[t])
            }
        },
        activate: function(e) {
            var i, o;
            this.activeTarget = e;
            t(this.selector).parent('.' + this.options.applyClass).removeClass(this.options.applyClass);
            o = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]';
            i = t(o).parent('li').addClass(this.options.applyClass);
            if (i.parent('.sub-menu').length) {
                i = i.closest('li.dropdown_ul_available').addClass(this.options.applyClass)
            };
            i.trigger('activate')
        }
    };
    t.fn.avia_scrollspy = function(i) {
        return this.each(function() {
            var a = t(this),
                o = a.data('scrollspy'),
                n = typeof i == 'object' && i;
            if (!o) a.data('scrollspy', (o = new e(this, n)));
            if (typeof i == 'string') o[i]()
        })
    };
    t.fn.avia_scrollspy.Constructor = e;
    t.fn.avia_scrollspy.calc_offset = function() {
        var e = (parseInt(t('.html_header_sticky #main').data('scroll-offset'), 10)) || 0,
            i = (t('.html_header_sticky:not(.html_top_nav_header) #header_main_alternate').outerHeight()) || 0,
            o = (t('.html_header_sticky.html_header_unstick_top_disabled #header_meta').outerHeight()) || 0,
            a = 1,
            n = parseInt(t('html').css('margin-top'), 10) || 0,
            s = parseInt(t('.av-frame-top ').outerHeight(), 10) || 0;
        return e + i + o + a + n + s
    };
    t.fn.avia_scrollspy.defaults = {
        offset: t.fn.avia_scrollspy.calc_offset(),
        applyClass: 'current-menu-item'
    };

    function a(e) {
        var i = {},
            s = function(t) {
                t = t.toLowerCase();
                var e = /(edge)\/([\w.]+)/.exec(t) || /(opr)[\/]([\w.]+)/.exec(t) || /(chrome)[ \/]([\w.]+)/.exec(t) || /(iemobile)[\/]([\w.]+)/.exec(t) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(t) || t.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
                return {
                    browser: e[5] || e[3] || e[1] || '',
                    version: e[2] || e[4] || '0',
                    versionNumber: e[4] || e[2] || '0'
                }
            };
        var a = s(navigator.userAgent);
        if (a.browser) {
            i.browser = a.browser;
            i[a.browser] = !0;
            i.version = a.version
        };
        if (i.chrome) {
            i.webkit = !0
        } else if (i.webkit) {
            i.safari = !0
        };
        if (typeof(i) !== 'undefined') {
            var o = '',
                n = i.version ? parseInt(i.version) : '';
            if (i.msie || i.rv || i.iemobile) {
                o += 'avia-msie'
            } else if (i.webkit) {
                o += 'avia-webkit'
            } else if (i.mozilla) {
                o += 'avia-mozilla'
            };
            if (i.version) o += ' ' + o + '-' + n + ' ';
            if (i.browser) o += ' avia-' + i.browser + ' avia-' + i.browser + '-' + n + ' '
        };
        if (e) {
            t(e).addClass(o)
        };
        return o
    };

    function n(e) {
        var i = [];
        t.avia_utilities.isTouchDevice = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
        i.push(t.avia_utilities.isTouchDevice ? 'touch-device' : 'no-touch-device');
        t.avia_utilities.pointerDevices = [];
        if (typeof window.matchMedia != 'function') {
            t.avia_utilities.pointerDevices.push('undefined');
            i.push('pointer-device-undefined')
        } else {
            var o = !1;
            if (window.matchMedia('(any-pointer: fine)')) {
                i.push('pointer-device-fine');
                t.avia_utilities.pointerDevices.push('fine');
                o = !0
            };
            if (window.matchMedia('(any-pointer: coarse)')) {
                i.push('pointer-device-coarse');
                t.avia_utilities.pointerDevices.push('coarse');
                if (!o) {
                    i.push('pointer-device-coarse-only')
                }
            };
            if (!t.avia_utilities.pointerDevices.length) {
                i.push('pointer-device-none');
                t.avia_utilities.pointerDevices.push('none')
            }
        };
        if ('undefined' == typeof t.avia_utilities.isMobile) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 'ontouchstart' in document.documentElement) {
                t.avia_utilities.isMobile = !0
            } else {
                t.avia_utilities.isMobile = !1
            }
        };
        t(e).addClass(i.join(' '))
    };
    t.fn.avia_html5_activation = function(e) {
        var i = {
            ratio: '16:9'
        };
        var e = t.extend(i, e);
        this.each(function() {
            var e = t(this),
                n = '#' + e.attr('id'),
                a = e.attr('poster'),
                i = ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume'],
                o = e.closest('.avia-video');
            if (o.length > 0 && o.hasClass('av-html5-fullscreen-btn')) {
                i.push('fullscreen')
            };
            e.mediaelementplayer({
                defaultVideoWidth: 480,
                defaultVideoHeight: 270,
                videoWidth: -1,
                videoHeight: -1,
                audioWidth: 400,
                audioHeight: 30,
                startVolume: 0.8,
                loop: !1,
                enableAutosize: !1,
                features: i,
                alwaysShowControls: !1,
                iPadUseNativeControls: !1,
                iPhoneUseNativeControls: !1,
                AndroidUseNativeControls: !1,
                alwaysShowHours: !1,
                showTimecodeFrameCount: !1,
                framesPerSecond: 25,
                enableKeyboard: !0,
                pauseOtherPlayers: !1,
                poster: a,
                success: function(i, o, a) {
                    t.AviaVideoAPI.players[e.attr('id').replace(/_html5/, '')] = a;
                    setTimeout(function() {
                        if (i.pluginType == 'flash') {
                            i.addEventListener('canplay', function() {
                                e.trigger('av-mediajs-loaded')
                            }, !1)
                        } else {
                            e.trigger('av-mediajs-loaded').addClass('av-mediajs-loaded')
                        };
                        i.addEventListener('ended', function() {
                            e.trigger('av-mediajs-ended')
                        }, !1);
                        var o = document.getElementById(t(i).attr('id') + '_html5');
                        if (o && o !== i) {
                            i.addEventListener('ended', function() {
                                t(o).trigger('av-mediajs-ended')
                            })
                        }
                    }, 10)
                },
                error: function() {},
                keyActions: []
            })
        })
    };

    function s(e) {
        if (t.avia_utilities.isMobile) {
            return
        };
        if (t('body').hasClass('av-disable-avia-hover-effect')) {
            return
        };
        var a = '',
            o = t.avia_utilities.supports('transition');
        if (e == 'body') {
            var i = t('#main a img').parents('a').not('.noLightbox, .noLightbox a, .avia-gallery-thumb a, .ls-wp-container a, .noHover, .noHover a, .av-logo-container .logo a').add('#main .avia-hover-fx')
        } else {
            var i = t('a img', e).parents('a').not('.noLightbox, .noLightbox a, .avia-gallery-thumb a, .ls-wp-container a, .noHover, .noHover a, .av-logo-container .logo a').add('.avia-hover-fx', e)
        };
        i.each(function(e) {
            var a = t(this),
                r = a.find('img').first();
            if (r.hasClass('alignleft')) a.addClass('alignleft').css({
                float: 'left',
                margin: 0,
                padding: 0
            });
            if (r.hasClass('alignright')) a.addClass('alignright').css({
                float: 'right',
                margin: 0,
                padding: 0
            });
            if (r.hasClass('aligncenter')) a.addClass('aligncenter').css({
                float: 'none',
                'text-align': 'center',
                margin: 0,
                padding: 0
            });
            if (r.hasClass('alignnone')) {
                a.addClass('alignnone').css({
                    margin: 0,
                    padding: 0
                });
                if (!a.css('display') || a.css('display') == 'inline') {
                    a.css({
                        display: 'inline-block'
                    })
                }
            };
            if (!a.css('position') || a.css('position') == 'static') {
                a.css({
                    position: 'relative',
                    overflow: 'hidden'
                })
            };
            var l = a.attr('href'),
                n = 'overlay-type-video',
                h = a.data('opacity') || 0.7,
                c = 5,
                s = a.find('.image-overlay');
            if (l) {
                if (l.match(/(jpg|gif|jpeg|png|tif)/)) n = 'overlay-type-image';
                if (!l.match(/(jpg|gif|jpeg|png|\.tif|\.mov|\.swf|vimeo\.com|youtube\.com)/)) n = 'overlay-type-extern'
            };
            if (!s.length) {
                s = t('<span class=\'image-overlay ' + n + '\'><span class=\'image-overlay-inside\'></span></span>').appendTo(a)
            };
            a.on('mouseenter', function(e) {
                var i = a.find('img').first(),
                    r = i.get(0),
                    l = i.outerHeight(),
                    f = i.outerWidth(),
                    p = i.position(),
                    d = a.css('display'),
                    s = a.find('.image-overlay');
                if (l > 100) {
                    if (!s.length) {
                        s = t('<span class=\'image-overlay ' + n + '\'><span class=\'image-overlay-inside\'></span></span>').appendTo(a)
                    };
                    if (a.height() == 0) {
                        a.addClass(r.className);
                        r.className = ''
                    };
                    if (!d || d == 'inline') {
                        a.css({
                            display: 'block'
                        })
                    };
                    s.css({
                        left: (p.left - c) + parseInt(i.css('margin-left'), 10),
                        top: p.top + parseInt(i.css('margin-top'), 10)
                    }).css({
                        overflow: 'hidden',
                        display: 'block',
                        'height': l,
                        'width': (f + (2 * c))
                    });
                    if (o === !1) s.stop().animate({
                        opacity: h
                    }, 400)
                } else {
                    s.css({
                        display: 'none'
                    })
                }
            }).on('mouseleave', i, function() {
                if (s.length) {
                    if (o === !1) s.stop().animate({
                        opacity: 0
                    }, 400)
                }
            })
        })
    }(function(t) {
        t.fn.avia_smoothscroll = function(e) {
            if (!this.length) {
                return
            };
            var a = t(window),
                d = t('#header'),
                f = t('.html_header_top.html_header_sticky #main').not('.page-template-template-blank-php #main'),
                u = t('.html_header_top.html_header_unstick_top_disabled #header_meta'),
                v = t('.html_header_top:not(.html_top_nav_header) #header_main_alternate'),
                m = t('.html_header_top.html_top_nav_header'),
                l = t('.html_header_top.html_header_shrinking').length,
                c = t('.av-frame-top'),
                i = 0,
                h = t.avia_utilities.isMobile,
                o = t('.sticky_placeholder').first(),
                p = function() {
                    if (d.css('position') == 'fixed') {
                        var e = parseInt(f.data('scroll-offset'), 10) || 0,
                            o = parseInt(u.outerHeight(), 10) || 0,
                            a = parseInt(v.outerHeight(), 10) || 0;
                        if (e > 0 && l) {
                            e = (e / 2) + o + a
                        } else {
                            e = e + o + a
                        };
                        e += parseInt(t('html').css('margin-top'), 10);
                        i = e
                    } else {
                        i = parseInt(t('html').css('margin-top'), 10)
                    };
                    if (c.length) {
                        i += c.height()
                    };
                    if (m.length) {
                        i = t('.html_header_sticky #header_main_alternate').height() + parseInt(t('html').css('margin-top'), 10)
                    };
                    if (h) {
                        i = 0
                    }
                };
            if (h) {
                l = !1
            };
            p();
            a.on('debouncedresize av-height-change', p);
            var n = window.location.hash.replace(/\//g, '');
            if (i > 0 && n && e == 'body' && n.charAt(1) != '!' && n.indexOf('=') === -1) {
                var s = t(n),
                    r = 0;
                if (s.length) {
                    a.on('scroll.avia_first_scroll', function() {
                        setTimeout(function() {
                            if (o.length && s.offset().top > o.offset().top) {
                                r = o.outerHeight() - 3
                            };
                            a.off('scroll.avia_first_scroll').scrollTop(s.offset().top - i - r)
                        }, 10)
                    })
                }
            };
            return this.each(function() {
                t(this).on('click', function(e) {
                    var n = this.hash.replace(/\//g, ''),
                        c = t(this),
                        f = c.data();
                    if (n != '' && n != '#' && n != '#prev' && n != '#next' && !c.is('.comment-reply-link, #cancel-comment-reply-link, .no-scroll')) {
                        var s = '',
                            d = '';
                        if ('#next-section' == n) {
                            d = n;
                            var g = c.parents('.container_wrap').eq(0).nextAll('.container_wrap');
                            g.each(function() {
                                var e = t(this);
                                if (e.css('display') == 'none' || e.css('visibility') == 'hidden') {
                                    return
                                };
                                s = e;
                                return !1
                            });
                            if ('object' == typeof s && s.length > 0) {
                                n = '#' + s.attr('id')
                            }
                        } else {
                            s = t(this.hash.replace(/\//g, ''))
                        };
                        if (s.length) {
                            var h = a.scrollTop(),
                                p = s.offset().top,
                                r = p - i,
                                l = window.location.hash,
                                l = l.replace(/\//g, ''),
                                u = window.location.href.replace(l, ''),
                                v = this,
                                m = f.duration || 1200,
                                y = f.easing || 'easeInOutQuint';
                            if (o.length && p > o.offset().top) {
                                r -= o.outerHeight() - 3
                            };
                            if (u + n == v || d) {
                                if (h != r) {
                                    if (!(h == 0 && r <= 0)) {
                                        a.trigger('avia_smooth_scroll_start');
                                        t('html:not(:animated),body:not(:animated)').animate({
                                            scrollTop: r
                                        }, m, y, function() {
                                            if (window.history.replaceState) {
                                                window.history.replaceState('', '', n)
                                            }
                                        })
                                    }
                                };
                                e.preventDefault()
                            }
                        }
                    }
                })
            })
        }
    })(jQuery);

    function r(t) {
        var e = jQuery('iframe[src*="youtube.com"]:not(.av_youtube_frame)', t),
            i = jQuery('iframe[src*="youtube.com"]:not(.av_youtube_frame) object, iframe[src*="youtube.com"]:not(.av_youtube_frame) embed', t).attr('wmode', 'opaque');
        e.each(function() {
            var e = jQuery(this),
                t = e.attr('src');
            if (t) {
                if (t.indexOf('?') !== -1) {
                    t += '&wmode=opaque&rel=0'
                } else {
                    t += '?wmode=opaque&rel=0'
                };
                e.attr('src', t)
            }
        })
    };

    function l(t) {
        if (!t) t = document;
        var o = jQuery(window),
            e = jQuery('.avia-iframe-wrap iframe:not(.avia-slideshow iframe):not( iframe.no_resize):not(.avia-video iframe)', t),
            i = function() {
                e.each(function() {
                    var e = jQuery(this),
                        i = e.parent(),
                        t = 56.25;
                    if (this.width && this.height) {
                        t = (100 / this.width) * this.height;
                        i.css({
                            'padding-bottom': t + '%'
                        })
                    }
                })
            };
        i()
    };

    function c() {
        var i = t(window),
            a = !1,
            e = t('#scroll-top-link'),
            o = function() {
                var t = i.scrollTop();
                if (t < 500) {
                    e.removeClass('avia_pop_class')
                } else if (!e.is('.avia_pop_class')) {
                    e.addClass('avia_pop_class')
                }
            };
        i.on('scroll', function() {
            window.requestAnimationFrame(o)
        });
        o()
    };
    t.AviaAjaxSearch = function(e) {
        var i = {
            delay: 300,
            minChars: 3,
            scope: 'body'
        };
        this.options = t.extend({}, i, e);
        this.scope = t(this.options.scope);
        this.timer = !1;
        this.lastVal = '';
        this.bind_events()
    };
    t.AviaAjaxSearch.prototype = {
        bind_events: function() {
            this.scope.on('keyup', '#s:not(".av_disable_ajax_search #s")', this.try_search.bind(this));
            this.scope.on('click', '#s.av-results-parked', this.reset.bind(this))
        },
        try_search: function(e) {
            var i = t(e.currentTarget).parents('form').eq(0),
                o = i.find('.ajax_search_response');
            clearTimeout(this.timer);
            if (e.keyCode === 27) {
                this.reset(e);
                return
            };
            if (e.currentTarget.value.length >= this.options.minChars && this.lastVal != e.currentTarget.value.trim()) {
                this.timer = setTimeout(this.do_search.bind(this, e), this.options.delay)
            } else if (e.currentTarget.value.length == 0) {
                this.timer = setTimeout(this.reset.bind(this, e), this.options.delay)
            }
        },
        reset: function(e) {
            var i = t(e.currentTarget).parents('form').eq(0),
                o = i.find('.ajax_search_response'),
                a = t(i.attr('data-ajaxcontainer')).find('.ajax_search_response'),
                n = t(e.currentTarget);
            if (t(e.currentTarget).hasClass('av-results-parked')) {
                o.show();
                a.show();
                t('body > .ajax_search_response').show()
            } else {
                o.remove();
                a.remove();
                n.val('');
                t('body > .ajax_search_response').remove()
            }
        },
        do_search: function(e) {
            var w = this,
                l = t(e.currentTarget).attr('autocomplete', 'off'),
                c = t(e.currentTarget).parents('.av_searchform_wrapper').eq(0),
                p = c.offset(),
                m = c.outerWidth(),
                y = c.outerHeight(),
                i = l.parents('form').eq(0),
                g = i.find('#searchsubmit'),
                n = i,
                o = n.find('.ajax_search_response'),
                d = t('<div class="ajax_load"><span class="ajax_load_inner"></span></div>'),
                s = i.attr('action'),
                h = i.serialize(),
                f = i.data('element_id'),
                u = i.data('custom_color');
            h += '&action=avia_ajax_search';
            if (!o.length) {
                o = t('<div class="ajax_search_response" style="display:none;"></div>')
            };
            if ('undefined' != typeof f) {
                o.addClass(f)
            };
            if ('undefined' != typeof u && u != '') {
                o.addClass('av_has_custom_color')
            };
            if (i.attr('id') == 'searchform_element') {
                o.addClass('av_searchform_element_results')
            };
            if (s.indexOf('?') != -1) {
                s = s.split('?');
                h += '&' + s[1]
            };
            if (i.attr('data-ajaxcontainer')) {
                var r = i.attr('data-ajaxcontainer');
                if (t(r).length) {
                    t(r).find('.ajax_search_response').remove();
                    n = t(r)
                }
            };
            a = {};
            if (i.hasClass('av_results_container_fixed')) {
                t('body').find('.ajax_search_response').remove();
                n = t('body');
                var a = {
                    top: p.top + y,
                    left: p.left,
                    width: m
                };
                o.addClass('main_color');
                t(window).resize(function() {
                    o.remove();
                    this.reset.bind(this);
                    l.val('')
                })
            };
            if (i.attr('data-results_style')) {
                var v = JSON.parse(i.attr('data-results_style'));
                a = Object.assign(a, v);
                if ('color' in a) {
                    o.addClass('av_has_custom_color')
                }
            };
            o.css(a);
            if (n.hasClass('avia-section')) {
                o.addClass('container')
            };
            o.appendTo(n);
            if (o.find('.ajax_not_found').length && e.currentTarget.value.indexOf(this.lastVal) != -1) {
                return
            };
            this.lastVal = e.currentTarget.value;
            t.ajax({
                url: avia_framework_globals.ajaxurl,
                type: 'POST',
                data: h,
                beforeSend: function() {
                    d.insertAfter(g);
                    i.addClass('ajax_loading_now')
                },
                success: function(t) {
                    if (t == 0) {
                        t = ''
                    };
                    o.html(t).show()
                },
                complete: function() {
                    d.remove();
                    i.removeClass('ajax_loading_now')
                }
            });
            t(document).on('click', function(e) {
                if (!t(e.target).closest(i).length) {
                    if (t(o).is(':visible')) {
                        t(o).hide();
                        l.addClass('av-results-parked')
                    }
                }
            })
        }
    };
    t.AviaTooltip = function(e) {
        var o = {
            delay: 1500,
            delayOut: 300,
            delayHide: 0,
            'class': 'avia-tooltip',
            scope: 'body',
            data: 'avia-tooltip',
            attach: 'body',
            event: 'mouseenter',
            position: 'top',
            extraClass: 'avia-tooltip-class',
            permanent: !1,
            within_screen: !1,
            close_keys: null
        };
        this.options = t.extend({}, o, e);
        var i = '';
        if (this.options.close_keys != null) {
            if (!Array.isArray(this.options.close_keys)) {
                this.options.close_keys = [this.options.close_keys]
            };
            i = ' data-close-keys="' + this.options.close_keys.join(',') + '" '
        };
        this.body = t('body');
        this.scope = t(this.options.scope);
        this.tooltip = t('<div class="' + this.options['class'] + ' avia-tt"' + i + '><span class="avia-arrow-wrap"><span class="avia-arrow"></span></span></div>');
        this.inner = t('<div class="inner_tooltip"></div>').prependTo(this.tooltip);
        this.open = !1;
        this.timer = !1;
        this.active = !1;
        this.bind_events()
    };
    t.AviaTooltip.openTTs = [];
    t.AviaTooltip.openTT_Elements = [];
    t.AviaTooltip.prototype = {
        bind_events: function() {
            var i = '.av-permanent-tooltip [data-' + this.options.data + ']',
                e = '[data-' + this.options.data + ']:not( .av-permanent-tooltip [data-' + this.options.data + '])';
            this.scope.on('av_permanent_show', i, this.display_tooltip.bind(this));
            t(i).addClass('av-perma-tooltip').trigger('av_permanent_show');
            this.scope.on(this.options.event + ' mouseleave', e, this.start_countdown.bind(this));
            if (this.options.event != 'click') {
                this.scope.on('mouseleave', e, this.hide_tooltip.bind(this));
                this.scope.on('click', e, this.hide_on_click_tooltip.bind(this))
            } else {
                this.body.on('mousedown', this.hide_tooltip.bind(this))
            };
            if (this.options.close_keys != null) {
                this.body.on('keyup', this.close_on_keyup.bind(this))
            }
        },
        start_countdown: function(e) {
            clearTimeout(this.timer);
            var o = this.options.event == 'click' ? e.target : e.currentTarget,
                a = t(o);
            if (e.type == this.options.event) {
                var i = this.options.event == 'click' ? 0 : this.open ? 0 : this.options.delay;
                this.timer = setTimeout(this.display_tooltip.bind(this, e), i)
            } else if (e.type == 'mouseleave') {
                if (!a.hasClass('av-close-on-click-tooltip')) {
                    this.timer = setTimeout(this.stop_instant_open.bind(this, e), this.options.delayOut)
                }
            };
            e.preventDefault()
        },
        reset_countdown: function(t) {
            clearTimeout(this.timer);
            this.timer = !1
        },
        display_tooltip: function(e) {
            var g = this,
                w = this.options.event == 'click' ? e.target : e.currentTarget,
                i = t(w),
                h = i.data(this.options.data),
                u = i.data('avia-created-tooltip'),
                v = i.data('avia-tooltip-class'),
                d = this.options.attach == 'element' ? i : this.body,
                s = this.options.attach == 'element' ? i.position() : i.offset(),
                c = i.data('avia-tooltip-position'),
                p = i.data('avia-tooltip-alignment'),
                m = !1,
                o = !1,
                y = !1;
            h = 'string' == typeof h ? h.trim() : '';
            if (i.is('.av-perma-tooltip')) {
                s = {
                    top: 0,
                    left: 0
                };
                d = i;
                m = !0
            };
            if (h == '') {
                return
            };
            if (c == '' || typeof c == 'undefined') {
                c = this.options.position
            };
            if (p == '' || typeof p == 'undefined') {
                p = 'center'
            };
            if (typeof u != 'undefined') {
                o = t.AviaTooltip.openTTs[u]
            } else {
                this.inner.html(h);
                o = this.tooltip.clone();
                y = !0;
                if (this.options.attach == 'element' && m !== !0) {
                    o.insertAfter(d)
                } else {
                    o.appendTo(d)
                };
                if (v != '') {
                    o.addClass(v)
                }
            };
            if (this.open && this.active == o) {
                return
            };
            if (i.hasClass('av-close-on-click-tooltip')) {
                this.hide_all_tooltips()
            };
            this.open = !0;
            this.active = o;
            if ((o.is(':animated:visible') && e.type == 'click') || i.is('.' + this.options['class']) || i.parents('.' + this.options['class']).length != 0) {
                return
            };
            var r = {},
                l = {},
                n = '',
                a = '';
            if (c == 'top' || c == 'bottom') {
                switch (p) {
                    case 'left':
                        a = s.left;
                        break;
                    case 'right':
                        a = s.left + i.outerWidth() - o.outerWidth();
                        break;
                    default:
                        a = (s.left + (i.outerWidth() / 2)) - (o.outerWidth() / 2);
                        break
                };
                if (g.options.within_screen) {
                    var f = i.offset().left + (i.outerWidth() / 2) - (o.outerWidth() / 2) + parseInt(o.css('margin-left'), 10);
                    if (f < 0) {
                        a = a - f
                    }
                }
            } else {
                switch (p) {
                    case 'top':
                        n = s.top;
                        break;
                    case 'bottom':
                        n = s.top + i.outerHeight() - o.outerHeight();
                        break;
                    default:
                        n = (s.top + (i.outerHeight() / 2)) - (o.outerHeight() / 2);
                        break
                }
            };
            switch (c) {
                case 'top':
                    n = s.top - o.outerHeight();
                    r = {
                        top: n - 10,
                        left: a
                    };
                    l = {
                        top: n
                    };
                    break;
                case 'bottom':
                    n = s.top + i.outerHeight();
                    r = {
                        top: n + 10,
                        left: a
                    };
                    l = {
                        top: n
                    };
                    break;
                case 'left':
                    a = s.left - o.outerWidth();
                    r = {
                        top: n,
                        left: a - 10
                    };
                    l = {
                        left: a
                    };
                    break;
                case 'right':
                    a = s.left + i.outerWidth();
                    r = {
                        top: n,
                        left: a + 10
                    };
                    l = {
                        left: a
                    };
                    break
            };
            r['display'] = 'block';
            r['opacity'] = 0;
            l['opacity'] = 1;
            o.css(r).stop().animate(l, 200);
            o.find('input, textarea').trigger('focus');
            if (y) {
                t.AviaTooltip.openTTs.push(o);
                t.AviaTooltip.openTT_Elements.push(i);
                i.data('avia-created-tooltip', t.AviaTooltip.openTTs.length - 1)
            }
        },
        hide_on_click_tooltip: function(e) {
            if (this.options.event == 'click') {
                return
            };
            var i = t(e.currentTarget);
            if (!i.hasClass('av-close-on-click-tooltip')) {
                return
            };
            if (!i.find('a')) {
                e.preventDefault()
            };
            var a = i.data('avia-created-tooltip');
            if ('undefined' != typeof a) {
                var o = t.AviaTooltip.openTTs[a];
                if ('undefined' != typeof o && o == this.active) {
                    this.hide_all_tooltips()
                }
            }
        },
        close_on_keyup: function(e) {
            if (this.options.close_keys == null) {
                return
            };
            if (t.inArray(e.keyCode, this.options.close_keys) < 0) {
                return
            };
            this.hide_all_tooltips(e.keyCode)
        },
        hide_all_tooltips: function(e) {
            var a, n, s, r = 'undefined' != typeof e ? e + '' : null;
            for (var o = 0; o < t.AviaTooltip.openTTs.length; ++o) {
                a = t.AviaTooltip.openTTs[o];
                s = t.AviaTooltip.openTT_Elements[o];
                n = s.data('avia-tooltip-position');
                if (r != null) {
                    var i = a.data('close-keys');
                    if ('undefined' == typeof i) {
                        continue
                    };
                    i = i + '';
                    i = i.split(',');
                    if (t.inArray(r, i) < 0) {
                        continue
                    }
                };
                this.animate_hide_tooltip(a, n)
            };
            this.open = !1;
            this.active = !1
        },
        hide_tooltip: function(e) {
            var i = t(e.currentTarget),
                o, s, a = i.data('avia-tooltip-position'),
                n = i.data('avia-tooltip-alignment'),
                o = !1;
            if (a == '' || typeof a == 'undefined') {
                a = this.options.position
            };
            if (n == '' || typeof n == 'undefined') {
                n = 'center'
            };
            if (this.options.event == 'click') {
                i = t(e.target);
                if (!i.is('.' + this.options['class']) && i.parents('.' + this.options['class']).length == 0) {
                    if (this.active.length) {
                        o = this.active;
                        this.active = !1
                    }
                }
            } else {
                if (!i.hasClass('av-close-on-click-tooltip')) {
                    o = i.data('avia-created-tooltip');
                    o = typeof o != 'undefined' ? t.AviaTooltip.openTTs[o] : !1
                }
            };
            this.animate_hide_tooltip(o, a)
        },
        animate_hide_tooltip: function(t, e) {
            if (t) {
                var i = {
                    opacity: 0
                };
                switch (e) {
                    case 'top':
                        i['top'] = parseInt(t.css('top'), 10) - 10;
                        break;
                    case 'bottom':
                        i['top'] = parseInt(t.css('top'), 10) + 10;
                        break;
                    case 'left':
                        i['left'] = parseInt(t.css('left'), 10) - 10;
                        break;
                    case 'right':
                        i['left'] = parseInt(t.css('left'), 10) + 10;
                        break
                };
                t.animate(i, 200, function() {
                    t.css({
                        display: 'none'
                    })
                })
            }
        },
        stop_instant_open: function(t) {
            this.open = !1
        }
    }
})(jQuery);
! function() {
    'use strict';

    function t(o) {
        if (!o) throw new Error('No options passed to Waypoint constructor');
        if (!o.element) throw new Error('No element option passed to Waypoint constructor');
        if (!o.handler) throw new Error('No handler option passed to Waypoint constructor');
        this.key = 'waypoint-' + i, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? 'horizontal' : 'vertical', this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), e[this.key] = this, i += 1
    };
    var i = 0,
        e = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete e[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var o = [];
        for (var n in e) o.push(e[n]);
        for (var i = 0, a = o.length; a > i; i++) o[i][t]()
    }, t.destroyAll = function() {
        t.invokeAll('destroy')
    }, t.disableAll = function() {
        t.invokeAll('disable')
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var i in e) e[i].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: 'default',
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        'bottom-in-view': function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        'right-in-view': function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    'use strict';

    function n(t) {
        window.setTimeout(t, 1e3 / 60)
    };

    function t(a) {
        this.element = a, this.Adapter = e.Adapter, this.adapter = new this.Adapter(a), this.key = 'waypoint-context-' + o, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, a.waypointContextKey = this.key, i[a.waypointContextKey] = this, o += 1, e.windowContext || (e.windowContext = !0, e.windowContext = new t(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    };
    var o = 0,
        i = {},
        e = window.Waypoint,
        a = window.onload;
    t.prototype.add = function(t) {
        var e = t.options.horizontal ? 'horizontal' : 'vertical';
        this.waypoints[e][t.key] = t, this.refresh()
    }, t.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            o = this.element == this.element.window;
        t && e && !o && (this.adapter.off('.waypoints'), delete i[this.key])
    }, t.prototype.createThrottledResizeHandler = function() {
        function i() {
            t.handleResize(), t.didResize = !1
        };
        var t = this;
        this.adapter.on('resize.waypoints', function() {
            t.didResize || (t.didResize = !0, e.requestAnimationFrame(i))
        })
    }, t.prototype.createThrottledScrollHandler = function() {
        function i() {
            t.handleScroll(), t.didScroll = !1
        };
        var t = this;
        this.adapter.on('scroll.waypoints', function() {
            (!t.didScroll || e.isTouch) && (t.didScroll = !0, e.requestAnimationFrame(i))
        })
    }, t.prototype.handleResize = function() {
        e.Context.refreshAll()
    }, t.prototype.handleScroll = function() {
        var a = {},
            i = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: 'right',
                    backward: 'left'
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: 'down',
                    backward: 'up'
                }
            };
        for (var o in i) {
            var e = i[o],
                p = e.newScroll > e.oldScroll,
                d = p ? e.forward : e.backward;
            for (var h in this.waypoints[o]) {
                var t = this.waypoints[o][h];
                if (null !== t.triggerPoint) {
                    var n = e.oldScroll < t.triggerPoint,
                        s = e.newScroll >= t.triggerPoint,
                        l = n && s,
                        c = !n && !s;
                    (l || c) && (t.queueTrigger(d), a[t.group.id] = t.group)
                }
            }
        };
        for (var r in a) a[r].flushTriggers();
        this.oldScroll = {
            x: i.horizontal.newScroll,
            y: i.vertical.newScroll
        }
    }, t.prototype.innerHeight = function() {
        return this.element == this.element.window ? e.viewportHeight() : this.adapter.innerHeight()
    }, t.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, t.prototype.innerWidth = function() {
        return this.element == this.element.window ? e.viewportWidth() : this.adapter.innerWidth()
    }, t.prototype.destroy = function() {
        var e = [];
        for (var i in this.waypoints)
            for (var a in this.waypoints[i]) e.push(this.waypoints[i][a]);
        for (var t = 0, o = e.length; o > t; t++) e[t].destroy()
    }, t.prototype.refresh = function() {
        var h, a = this.element == this.element.window,
            m = a ? void 0 : this.adapter.offset(),
            n = {};
        this.handleScroll(), h = {
            horizontal: {
                contextOffset: a ? 0 : m.left,
                contextScroll: a ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: 'right',
                backward: 'left',
                offsetProp: 'left'
            },
            vertical: {
                contextOffset: a ? 0 : m.top,
                contextScroll: a ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: 'down',
                backward: 'up',
                offsetProp: 'top'
            }
        };
        for (var c in h) {
            var i = h[c];
            for (var y in this.waypoints[c]) {
                var p, s, r, d, f, t = this.waypoints[c][y],
                    o = t.options.offset,
                    u = t.triggerPoint,
                    v = 0,
                    l = null == u;
                t.element !== t.element.window && (v = t.adapter.offset()[i.offsetProp]), 'function' == typeof o ? o = o.apply(t) : 'string' == typeof o && (o = parseFloat(o), t.options.offset.indexOf('%') > -1 && (o = Math.ceil(i.contextDimension * o / 100))), p = i.contextScroll - i.contextOffset, t.triggerPoint = Math.floor(v + p - o), s = u < i.oldScroll, r = t.triggerPoint >= i.oldScroll, d = s && r, f = !s && !r, !l && d ? (t.queueTrigger(i.backward), n[t.group.id] = t.group) : !l && f ? (t.queueTrigger(i.forward), n[t.group.id] = t.group) : l && i.oldScroll >= t.triggerPoint && (t.queueTrigger(i.forward), n[t.group.id] = t.group)
            }
        };
        return e.requestAnimationFrame(function() {
            for (var t in n) n[t].flushTriggers()
        }), this
    }, t.findOrCreateByElement = function(e) {
        return t.findByElement(e) || new t(e)
    }, t.refreshAll = function() {
        for (var t in i) i[t].refresh()
    }, t.findByElement = function(t) {
        return i[t.waypointContextKey]
    }, window.onload = function() {
        a && a(), t.refreshAll()
    }, e.requestAnimationFrame = function(t) {
        var e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || n;
        e.call(window, t)
    }, e.Context = t
}(),
function() {
    'use strict';

    function i(t, e) {
        return t.triggerPoint - e.triggerPoint
    };

    function a(t, e) {
        return e.triggerPoint - t.triggerPoint
    };

    function t(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + '-' + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    };
    var o = {
            vertical: {},
            horizontal: {}
        },
        e = window.Waypoint;
    t.prototype.add = function(t) {
        this.waypoints.push(t)
    }, t.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, t.prototype.flushTriggers = function() {
        for (var o in this.triggerQueues) {
            var e = this.triggerQueues[o],
                r = 'up' === o || 'left' === o;
            e.sort(r ? a : i);
            for (var t = 0, s = e.length; s > t; t += 1) {
                var n = e[t];
                (n.options.continuous || t === e.length - 1) && n.trigger([o])
            }
        };
        this.clearTriggerQueues()
    }, t.prototype.next = function(t) {
        this.waypoints.sort(i);
        var o = e.Adapter.inArray(t, this.waypoints),
            a = o === this.waypoints.length - 1;
        return a ? null : this.waypoints[o + 1]
    }, t.prototype.previous = function(t) {
        this.waypoints.sort(i);
        var o = e.Adapter.inArray(t, this.waypoints);
        return o ? this.waypoints[o - 1] : null
    }, t.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, t.prototype.remove = function(t) {
        var i = e.Adapter.inArray(t, this.waypoints);
        i > -1 && this.waypoints.splice(i, 1)
    }, t.prototype.first = function() {
        return this.waypoints[0]
    }, t.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, t.findOrCreate = function(e) {
        return o[e.axis][e.name] || new t(e)
    }, e.Group = t
}(),
function() {
    'use strict';

    function e(e) {
        this.$element = t(e)
    };
    var t = window.jQuery,
        i = window.Waypoint;
    t.each(['innerHeight', 'innerWidth', 'off', 'offset', 'on', 'outerHeight', 'outerWidth', 'scrollLeft', 'scrollTop'], function(t, i) {
        e.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), t.each(['extend', 'inArray', 'isEmptyObject'], function(i, o) {
        e[o] = t[o]
    }), i.adapters.push({
        name: 'jquery',
        Adapter: e
    }), i.Adapter = e
}(),
function() {
    'use strict';

    function t(t) {
        return function() {
            var o = [],
                i = arguments[0];
            return 'function' === typeof arguments[0] && (i = t.extend({}, arguments[1]), i.handler = arguments[0]), this.each(function() {
                var a = t.extend({}, i, {
                    element: this
                });
                'string' == typeof a.context && (a.context = t(this).closest(a.context)[0]), o.push(new e(a))
            }), o
        }
    };
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
(function() {
    var i = 0,
        e = ['ms', 'moz', 'webkit', 'o'];
    for (var t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
        window.requestAnimationFrame = window[e[t] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[e[t] + 'CancelAnimationFrame'] || window[e[t] + 'CancelRequestAnimationFrame']
    };
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(t, e) {
        var o = new Date().getTime(),
            a = Math.max(0, 16 - (o - i)),
            n = window.setTimeout(function() {
                t(o + a)
            }, a);
        i = o + a;
        return n
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    }
}());
jQuery.expr.pseudos.regex = function(t, e, o) {
    var i = o[3].split(','),
        a = /^(data|css):/,
        n = {
            method: i[0].match(a) ? i[0].split(':')[0] : 'attr',
            property: i.shift().replace(a, '')
        },
        s = 'ig',
        r = new RegExp(i.join('').replace(/^\s+|\s+$/g, ''), s);
    return r.test(jQuery(t)[n.method](n.property))
};
(function(i) {
    "use strict";
    i(function() {
        i.avia_utilities = i.avia_utilities || {};
        if ("undefined" == typeof i.avia_utilities.isMobile) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && "ontouchstart" in document.documentElement) {
                i.avia_utilities.isMobile = !0
            } else {
                i.avia_utilities.isMobile = !1
            }
        };
        if (i.fn.avia_mobile_fixed) {
            i(".avia-bg-style-fixed").avia_mobile_fixed()
        };
        if (i.fn.avia_browser_height) {
            i(".av-minimum-height, .avia-fullscreen-slider, .av-cell-min-height").avia_browser_height()
        };
        if (i.fn.avia_container_height) {
            i(".av-column-min-height-pc").avia_container_height()
        };
        if (i.fn.avia_video_section) {
            i(".av-section-with-video-bg").avia_video_section()
        };
        new i.AviaTooltip({
            "class": "avia-tooltip",
            data: "avia-tooltip",
            delay: 0,
            scope: "body"
        });
        new i.AviaTooltip({
            "class": "avia-tooltip avia-icon-tooltip",
            data: "avia-icon-tooltip",
            delay: 0,
            scope: "body"
        });
        i.avia_utilities.activate_shortcode_scripts();
        if (i.fn.layer_slider_height_helper) {
            i(".avia-layerslider").layer_slider_height_helper()
        };
        if (i.fn.avia_portfolio_preview) {
            i(".grid-links-ajax").avia_portfolio_preview()
        };
        if (i.fn.avia_masonry) {
            i(".av-masonry").avia_masonry()
        };
        if (i.fn.aviaccordion) {
            i(".aviaccordion").aviaccordion()
        };
        if (i.fn.avia_textrotator) {
            i(".av-rotator-container").avia_textrotator()
        };
        if (i.fn.avia_sc_tab_section) {
            i(".av-tab-section-container").avia_sc_tab_section()
        };
        if (i.fn.avia_hor_gallery) {
            i(".av-horizontal-gallery").avia_hor_gallery()
        };
        if (i.fn.avia_link_column) {
            i(".avia-link-column").avia_link_column()
        };
        if (i.fn.avia_delayed_animation_in_container) {
            i(".av-animation-delay-container").avia_delayed_animation_in_container()
        }
    });
    i.avia_utilities = i.avia_utilities || {};
    i.avia_utilities.activate_shortcode_scripts = function(e) {
        if (typeof e == "undefined") {
            e = "body"
        };
        if (i.fn.avia_ajax_form) {
            i(".avia_ajax_form:not( .avia-disable-default-ajax )", e).avia_ajax_form()
        };
        n(e);
        if (i.fn.aviaVideoApi) {
            i(".avia-slideshow iframe[src*=\"youtube.com\"], .av_youtube_frame, .av_vimeo_frame, .avia-slideshow video").aviaVideoApi({}, "li")
        };
        if (i.fn.avia_sc_toggle) {
            i(".togglecontainer", e).avia_sc_toggle()
        };
        if (i.fn.avia_sc_tabs) {
            i(".top_tab", e).avia_sc_tabs();
            i(".sidebar_tab", e).avia_sc_tabs({
                sidebar: !0
            })
        };
        if (i.fn.avia_sc_gallery) {
            i(".avia-gallery", e).avia_sc_gallery()
        };
        if (i.fn.avia_sc_animated_number) {
            i(".avia-animated-number", e).avia_sc_animated_number()
        };
        if (i.fn.avia_sc_animation_delayed) {
            i(".av_font_icon", e).avia_sc_animation_delayed({
                delay: 100
            });
            i(".avia-image-container", e).avia_sc_animation_delayed({
                delay: 100
            });
            i(".av-hotspot-image-container", e).avia_sc_animation_delayed({
                delay: 100
            });
            i(".av-animated-generic", e).avia_sc_animation_delayed({
                delay: 100
            });
            i(".av-animated-when-visible", e).avia_sc_animation_delayed({
                delay: 100
            });
            i(".av-animated-when-almost-visible", e).avia_sc_animation_delayed({
                delay: 100
            });
            i(".av-animated-when-visible-95", e).avia_sc_animation_delayed({
                delay: 100
            })
        };
        if (i.fn.avia_sc_iconlist) {
            i(".avia-icon-list.av-iconlist-big.avia-iconlist-animate", e).avia_sc_iconlist()
        };
        if (i.fn.avia_sc_progressbar) {
            i(".avia-progress-bar-container", e).avia_sc_progressbar()
        };
        if (i.fn.avia_sc_testimonial) {
            i(".avia-testimonial-wrapper", e).avia_sc_testimonial()
        };
        if (i.fn.aviaFullscreenSlider) {
            i(".avia-slideshow.av_fullscreen", e).aviaFullscreenSlider()
        };
        if (i.fn.aviaSlider) {
            i(".avia-slideshow:not(.av_fullscreen)", e).aviaSlider();
            i(".avia-content-slider-active", e).aviaSlider({
                wrapElement: ".avia-content-slider-inner",
                slideElement: ".slide-entry-wrap",
                fullfade: !0
            });
            i(".avia-slider-testimonials", e).aviaSlider({
                wrapElement: ".avia-testimonial-row",
                slideElement: ".avia-testimonial",
                fullfade: !0
            })
        };
        if (i.fn.aviaMagazine) {
            i(".av-magazine-tabs-active", e).aviaMagazine()
        };
        if (i.fn.aviaHotspots) {
            i(".av-hotspot-image-container", e).aviaHotspots()
        };
        if (i.fn.aviaCountdown) {
            i(".av-countdown-timer", e).aviaCountdown()
        };
        if (i.fn.aviaPlayer) {
            i(".av-player", e).aviaPlayer()
        }
    };

    function n(e) {
        if (i.fn.avia_waypoints) {
            if (typeof e == "undefined") {
                e = "body"
            };
            i(".avia_animate_when_visible", e).avia_waypoints();
            i(".avia_animate_when_almost_visible", e).avia_waypoints({
                offset: "80%"
            });
            i(".av-animated-when-visible", e).avia_waypoints();
            i(".av-animated-when-almost-visible", e).avia_waypoints({
                offset: "80%"
            });
            i(".av-animated-when-visible-95", e).avia_waypoints({
                offset: "95%"
            });
            var a = i("body").hasClass("avia-mobile-no-animations");
            if (e == "body" && a) {
                e = ".avia_desktop body"
            };
            i(".av-animated-generic", e).avia_waypoints({
                offset: "95%"
            })
        }
    };
    i.fn.avia_mobile_fixed = function(e) {
        var a = i.avia_utilities.isMobile;
        if (!a) {
            return
        };
        return this.each(function() {
            var a = i(this).addClass("av-parallax-section"),
                n = a.attr("style"),
                e = a.data("section-bg-repeat"),
                t = "";
            if (e == "stretch" || e == "no-repeat") {
                e = " avia-full-stretch"
            } else {
                e = ""
            };
            t = "<div class='av-parallax " + e + "' data-avia-parallax-ratio='0.0' style = '" + n + "' ></div>";
            a.prepend(t);
            a.attr("style", "")
        })
    };
    i.fn.avia_sc_animation_delayed = function(e) {
        var a = 0,
            n = e.delay || 50,
            t = 10,
            o = setTimeout(function() {
                t = 20
            }, 500);
        return this.each(function() {
            var e = i(this);
            e.on("avia_start_animation", function() {
                var e = i(this);
                if (a < t) {
                    a++
                };
                setTimeout(function() {
                    e.addClass("avia_start_delayed_animation");
                    if (a > 0) {
                        a--
                    }
                }, (a * n))
            })
        })
    };
    i.fn.avia_delayed_animation_in_container = function(e) {
        return this.each(function() {
            var e = i(this);
            e.on("avia_start_animation_if_current_slide_is_active", function() {
                var e = i(this),
                    a = e.find(".avia_start_animation_when_active");
                a.addClass("avia_start_animation").trigger("avia_start_animation")
            });
            e.on("avia_remove_animation", function() {
                var e = i(this),
                    a = e.find(".avia_start_animation_when_active, .avia_start_animation");
                a.removeClass("avia_start_animation avia_start_delayed_animation")
            })
        })
    };
    i.fn.avia_browser_height = function() {
        if (!this.length) {
            return this
        };
        var e = i(window),
            c = i("html"),
            n = i("head").first(),
            r = i("#wpadminbar, #header.av_header_top:not(.html_header_transparency #header), #main>.title_container"),
            a = i("<style type='text/css' id='av-browser-height'></style>").appendTo(n),
            o = i(".html_header_sidebar #top #header_main"),
            l = i(".html_header_sidebar .avia-fullscreen-slider.avia-builder-el-0.avia-builder-el-no-sibling").addClass("av-solo-full"),
            t = [25, 50, 75],
            s = function() {
                var s = "",
                    c = e.height(),
                    l = e.width(),
                    u = c,
                    d = (c / 9) * 16,
                    v = (l / 16) * 9,
                    h = 0;
                if (o.length) {
                    h = o.height()
                };
                r.each(function() {
                    u -= this.offsetHeight - 1
                });
                var f = (u / 9) * 16;
                s += ".avia-section.av-minimum-height .container{opacity: 1; }\n";
                s += ".av-minimum-height-100:not(.av-slideshow-section) .container, .avia-fullscreen-slider .avia-slideshow, #top.avia-blank .av-minimum-height-100 .container, .av-cell-min-height-100 > .flex_cell{height:" + c + "px;}\n";
                s += ".av-minimum-height-100.av-slideshow-section .container { height:unset; }\n";
                s += ".av-minimum-height-100.av-slideshow-section {min-height:" + c + "px;}\n";
                i.each(t, function(i, e) {
                    var a = Math.round(c * (e / 100.0));
                    s += ".av-minimum-height-" + e + ":not(.av-slideshow-section) .container, .av-cell-min-height-" + e + " > .flex_cell	{height:" + a + "px;}\n";
                    s += ".av-minimum-height-" + e + ".av-slideshow-section {min-height:" + a + "px;}\n"
                });
                s += ".avia-builder-el-0.av-minimum-height-100:not(.av-slideshow-section) .container, .avia-builder-el-0.avia-fullscreen-slider .avia-slideshow, .avia-builder-el-0.av-cell-min-height-100 > .flex_cell{height:" + u + "px;}\n";
                s += "#top .av-solo-full .avia-slideshow {min-height:" + h + "px;}\n";
                if (l / c < 16 / 9) {
                    s += "#top .av-element-cover iframe, #top .av-element-cover embed, #top .av-element-cover object, #top .av-element-cover video{width:" + d + "px; left: -" + (d - l) / 2 + "px;}\n"
                } else {
                    s += "#top .av-element-cover iframe, #top .av-element-cover embed, #top .av-element-cover object, #top .av-element-cover video{height:" + v + "px; top: -" + (v - c) / 2 + "px;}\n"
                };
                if (l / u < 16 / 9) {
                    s += "#top .avia-builder-el-0 .av-element-cover iframe, #top .avia-builder-el-0 .av-element-cover embed, #top .avia-builder-el-0 .av-element-cover object, #top .avia-builder-el-0 .av-element-cover video{width:" + f + "px; left: -" + (f - l) / 2 + "px;}\n"
                } else {
                    s += "#top .avia-builder-el-0 .av-element-cover iframe, #top .avia-builder-el-0 .av-element-cover embed, #top .avia-builder-el-0 .av-element-cover object, #top .avia-builder-el-0 .av-element-cover video{height:" + v + "px; top: -" + (v - u) / 2 + "px;}\n"
                };
                try {
                    a.text(s)
                } catch (m) {
                    a.remove();
                    a = i("<style type='text/css' id='av-browser-height'>" + s + "</style>").appendTo(n)
                };
                setTimeout(function() {
                    e.trigger("av-height-change")
                }, 100)
            };
        this.each(function(e) {
            var a = i(this).data("av_minimum_height_pc");
            if ("number" != typeof a) {
                return this
            };
            a = parseInt(a);
            if ((-1 == i.inArray(a, t)) && (a != 100)) {
                t.push(a)
            };
            return this
        });
        e.on("debouncedresize", s);
        s()
    };
    i.fn.avia_container_height = function() {
        if (!this.length) {
            return this
        };
        var e = i(window),
            a = function() {
                var a = i(this),
                    s = a.data("av-column-min-height"),
                    n = parseInt(s["column-min-pc"], 10),
                    t = null,
                    r = 0,
                    o = 0;
                if (isNaN(n) || n == 0) {
                    return
                };
                t = a.closest(".avia-section");
                if (!t.length) {
                    t = a.closest(".av-gridrow-cell")
                };
                if (!t.length) {
                    t = a.closest(".av-layout-tab")
                };
                r = t.length ? t.outerHeight() : e.height();
                o = r * (n / 100.0);
                if (!s["column-equal-height"]) {
                    a.css("min-height", o + "px");
                    a.css("height", "auto")
                } else {
                    a.css("height", o + "px")
                };
                setTimeout(function() {
                    e.trigger("av-height-change")
                }, 100)
            };
        this.each(function(t) {
            var n = i(this),
                o = n.data("av-column-min-height");
            if ("object" != typeof o) {
                return this
            };
            e.on("debouncedresize", a.bind(n));
            a.call(n);
            return this
        })
    };
    i.fn.avia_video_section = function() {
        if (!this.length) return;
        var o = this.length,
            e = "",
            s = i(window),
            t = i("head").first(),
            a = i("<style type='text/css' id='av-section-height'></style>").appendTo(t),
            n = function(n, s) {
                if (s === 0) {
                    e = ""
                };
                var c = "",
                    r = "#" + n.attr("id"),
                    l = n.height(),
                    u = n.width(),
                    d = n.data("sectionVideoRatio").split(":"),
                    v = d[0],
                    f = d[1],
                    h = (l / f) * v,
                    m = (u / v) * f;
                if (u / l < v / f) {
                    c += "#top " + r + " .av-section-video-bg iframe, #top " + r + " .av-section-video-bg embed, #top " + r + " .av-section-video-bg object, #top " + r + " .av-section-video-bg video{width:" + h + "px; left: -" + (h - u) / 2 + "px;}\n"
                } else {
                    c += "#top " + r + " .av-section-video-bg iframe, #top " + r + " .av-section-video-bg embed, #top " + r + " .av-section-video-bg object, #top " + r + " .av-section-video-bg video{height:" + m + "px; top: -" + (m - l) / 2 + "px;}\n"
                };
                e = e + c;
                if (o == s + 1) {
                    try {
                        a.text(e)
                    } catch (p) {
                        a.remove();
                        a = i("<style type='text/css' id='av-section-height'>" + e + "</style>").appendTo(t)
                    }
                }
            };
        return this.each(function(e) {
            var a = i(this);
            s.on("debouncedresize", function() {
                n(a, e)
            });
            n(a, e)
        })
    };
    i.fn.avia_link_column = function() {
        return this.each(function() {
            i(this).on("click", function(e) {
                if ("undefined" !== typeof e.target && "undefined" !== typeof e.target.href) {
                    return
                };
                var t = i(this),
                    a = t.data("link-column-url"),
                    o = t.data("link-column-target"),
                    r = window.location.hostname + window.location.pathname;
                if ("undefined" === typeof a || "string" !== typeof a) {
                    return
                };
                if ("undefined" !== typeof o || "_blank" == o) {
                    var n = document.createElement("a");
                    n.href = a;
                    n.target = "_blank";
                    n.rel = "noopener noreferrer";
                    n.click();
                    return !1
                } else {
                    if (t.hasClass("av-cell-link") || t.hasClass("av-column-link")) {
                        var s = t.hasClass("av-cell-link") ? t.prev("a.av-screen-reader-only").first() : t.find("a.av-screen-reader-only").first();
                        a = a.trim();
                        if ((0 == a.indexOf("#")) || ((a.indexOf(r) >= 0) && (a.indexOf("#") > 0))) {
                            s.trigger("click");
                            if ("undefined" == typeof o || "_blank" != o) {
                                window.location.href = a
                            };
                            return
                        }
                    };
                    window.location.href = a
                };
                e.preventDefault();
                return
            })
        })
    };
    i.fn.avia_waypoints = function(e) {
        if (!i("html").is(".avia_transform")) {
            return
        };
        var a = {
                offset: "bottom-in-view",
                triggerOnce: !0
            },
            t = i.extend({}, a, e),
            n = i.avia_utilities.isMobile;
        return this.each(function() {
            var e = i(this),
                a = e.hasClass("animate-all-devices"),
                o = i("body").hasClass("avia-mobile-no-animations");
            setTimeout(function() {
                if (n && o && !a) {
                    e.addClass("avia_start_animation").trigger("avia_start_animation")
                } else {
                    e.waypoint(function(e) {
                        var t = i(this.element),
                            a = t.parents(".av-animation-delay-container").eq(0);
                        if (a.length) {
                            t.addClass("avia_start_animation_when_active").trigger("avia_start_animation_when_active")
                        };
                        if (!a.length || (a.length && a.is(".__av_init_open")) || (a.length && a.is(".av-active-tab-content"))) {
                            t.addClass("avia_start_animation").trigger("avia_start_animation")
                        }
                    }, t)
                }
            }, 100)
        })
    };
    var t = i.event,
        e, a;
    e = t.special.debouncedresize = {
        setup: function() {
            i(this).on("resize", e.handler)
        },
        teardown: function() {
            i(this).off("resize", e.handler)
        },
        handler: function(i, n) {
            var s = this,
                r = arguments,
                o = function() {
                    i.type = "debouncedresize";
                    t.dispatch.apply(s, r)
                };
            if (a) {
                clearTimeout(a)
            };
            n ? o() : a = setTimeout(o, e.threshold)
        },
        threshold: 150
    }
})(jQuery);
(function(i) {
    "use strict";
    i.avia_utilities = i.avia_utilities || {};
    i.avia_utilities.loading = function(e, t) {
        var a = {
            active: !1,
            show: function() {
                if (a.active === !1) {
                    a.active = !0;
                    a.loading_item.css({
                        display: "block",
                        opacity: 0
                    })
                };
                a.loading_item.stop().animate({
                    opacity: 1
                })
            },
            hide: function() {
                if (typeof t === "undefined") {
                    t = 600
                };
                a.loading_item.stop().delay(t).animate({
                    opacity: 0
                }, function() {
                    a.loading_item.css({
                        display: "none"
                    });
                    a.active = !1
                })
            },
            attach: function() {
                if (typeof e === "undefined") {
                    e = "body"
                };
                a.loading_item = i("<div class=\"avia_loading_icon\"><div class=\"av-siteloader\"></div></div>").css({
                    display: "none"
                }).appendTo(e)
            }
        };
        a.attach();
        return a
    };
    i.avia_utilities.playpause = function(e, t) {
        var a = {
            active: !1,
            to1: "",
            to2: "",
            set: function(i) {
                a.loading_item.removeClass("av-play av-pause");
                a.to1 = setTimeout(function() {
                    a.loading_item.addClass("av-" + i)
                }, 10);
                a.to2 = setTimeout(function() {
                    a.loading_item.removeClass("av-" + i)
                }, 1500)
            },
            attach: function() {
                if (typeof e === "undefined") {
                    e = "body"
                };
                a.loading_item = i("<div class=\"avia_playpause_icon\"></div>").css({
                    display: "none"
                }).appendTo(e)
            }
        };
        a.attach();
        return a
    };
    i.avia_utilities.preload = function(e) {
        new i.AviaPreloader(e)
    };
    i.AviaPreloader = function(e) {
        this.win = i(window);
        this.defaults = {
            container: "body",
            maxLoops: 10,
            trigger_single: !0,
            single_callback: function() {},
            global_callback: function() {}
        };
        this.options = i.extend({}, this.defaults, e);
        this.preload_images = 0;
        this.load_images()
    };
    i.AviaPreloader.prototype = {
        load_images: function() {
            var e = this;
            if (typeof e.options.container === "string") {
                e.options.container = i(e.options.container)
            };
            e.options.container.each(function() {
                var a = i(this);
                a.images = a.find("img");
                a.allImages = a.images;
                e.preload_images += a.images.length;
                setTimeout(function() {
                    e.checkImage(a)
                }, 10)
            })
        },
        checkImage: function(i) {
            var e = this;
            i.images.each(function() {
                if (this.complete === !0) {
                    i.images = i.images.not(this);
                    e.preload_images -= 1
                }
            });
            if (i.images.length && e.options.maxLoops >= 0) {
                e.options.maxLoops -= 1;
                setTimeout(function() {
                    e.checkImage(i)
                }, 500)
            } else {
                e.preload_images = e.preload_images - i.images.length;
                e.trigger_loaded(i)
            }
        },
        trigger_loaded: function(i) {
            var e = this;
            if (e.options.trigger_single !== !1) {
                e.win.trigger("avia_images_loaded_single", [i]);
                e.options.single_callback.call(i)
            };
            if (e.preload_images === 0) {
                e.win.trigger("avia_images_loaded");
                e.options.global_callback.call()
            }
        }
    };
    i.avia_utilities.css_easings = {
        linear: "linear",
        swing: "ease-in-out",
        bounce: "cubic-bezier(0.0, 0.35, .5, 1.3)",
        easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
        easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
        easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
        easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
        easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
        easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
        easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
        easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.04)",
        easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
        easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
        easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
        easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
        easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
        easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
        easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
        easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
        easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
        easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
        easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
        easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
        easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
        easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.55)",
        easeInOutBounce: "cubic-bezier(0.580, -0.365, 0.490, 1.365)",
        easeOutBounce: "cubic-bezier(0.760, 0.085, 0.490, 1.365)"
    };
    i.avia_utilities.supported = {};
    i.avia_utilities.supports = (function() {
        var e = document.createElement("div"),
            i = ["Khtml", "Ms", "Moz", "Webkit"];
        return function(a, t) {
            if (e.style[a] !== undefined) {
                return ""
            };
            if (t !== undefined) {
                i = t
            };
            a = a.replace(/^[a-z]/, function(i) {
                return i.toUpperCase()
            });
            var n = i.length;
            while (n--) {
                if (e.style[i[n] + a] !== undefined) {
                    return "-" + i[n].toLowerCase() + "-"
                }
            };
            return !1
        }
    }());
    i.fn.avia_animate = function(e, a, t, n) {
        if (typeof a === "function") {
            n = a;
            a = !1
        };
        if (typeof t === "function") {
            n = t;
            t = !1
        };
        if (typeof a === "string") {
            t = a;
            a = !1
        };
        if (n === undefined || n === !1) {
            n = function() {}
        };
        if (t === undefined || t === !1) {
            t = "easeInQuad"
        };
        if (a === undefined || a === !1) {
            a = 400
        };
        if (i.avia_utilities.supported.transition === undefined) {
            i.avia_utilities.supported.transition = i.avia_utilities.supports("transition")
        };
        if (i.avia_utilities.supported.transition !== !1) {
            var c = i.avia_utilities.supported.transition + "transition",
                s = {},
                l = {},
                u = document.body.style,
                o = (u.WebkitTransition !== undefined) ? "webkitTransitionEnd" : (u.OTransition !== undefined) ? "oTransitionEnd" : "transitionend";
            t = i.avia_utilities.css_easings[t];
            s[c] = "all " + (a / 1000) + "s " + t;
            o = o + ".avia_animate";
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    l[r] = e[r]
                }
            };
            e = l;
            this.each(function() {
                var t = i(this),
                    v = !1,
                    r, u;
                for (r in e) {
                    if (e.hasOwnProperty(r)) {
                        u = t.css(r);
                        if (e[r] != u && e[r] != u.replace(/px|%/g, "")) {
                            v = !0;
                            break
                        }
                    }
                };
                if (v) {
                    if (!(i.avia_utilities.supported.transition + "transform" in e)) {
                        e[i.avia_utilities.supported.transition + "transform"] = "translateZ(0)"
                    };
                    var l = !1;
                    t.on(o, function(i) {
                        if (i.target != i.currentTarget) return !1;
                        if (l == !0) return !1;
                        l = !0;
                        s[c] = "none";
                        t.off(o);
                        t.css(s);
                        setTimeout(function() {
                            n.call(t)
                        })
                    });
                    setTimeout(function() {
                        if (!l && !avia_is_mobile && i("html").is(".avia-safari")) {
                            t.trigger(o);
                            i.avia_utilities.log("Safari Fallback " + o + " trigger")
                        }
                    }, a + 100);
                    setTimeout(function() {
                        t.css(s)
                    }, 10);
                    setTimeout(function() {
                        t.css(e)
                    }, 20)
                } else {
                    setTimeout(function() {
                        n.call(t)
                    })
                }
            })
        } else {
            this.animate(e, a, t, n)
        };
        return this
    }
})(jQuery);
(function(i) {
    "use strict";
    i.fn.avia_keyboard_controls = function(e) {
        var t = {
                37: ".prev-slide",
                39: ".next-slide"
            },
            a = {
                mousebind: function(i) {
                    i.on("mouseenter", function() {
                        i.mouseover = !0
                    }).on("mouseleave", function() {
                        i.mouseover = !1
                    })
                },
                keybind: function(e) {
                    i(document).on("keydown", function(i) {
                        if (e.mouseover && typeof e.options[i.keyCode] !== "undefined") {
                            var a;
                            if (typeof e.options[i.keyCode] === "string") {
                                a = e.find(e.options[i.keyCode])
                            } else {
                                a = e.options[i.keyCode]
                            };
                            if (a.length) {
                                a.trigger("click", ["keypress"]);
                                return !1
                            }
                        }
                    })
                }
            };
        return this.each(function() {
            var n = i(this);
            n.options = i.extend({}, t, e);
            n.mouseover = !1;
            a.mousebind(n);
            a.keybind(n)
        })
    };
    i.fn.avia_swipe_trigger = function(e) {
        var s = i(window),
            a = i.avia_utilities.isMobile,
            t = i.avia_utilities.isTouchDevice,
            n = {
                prev: ".prev-slide",
                next: ".next-slide",
                event: {
                    prev: "click",
                    next: "click"
                }
            },
            o = {
                activate_touch_control: function(i) {
                    var e, a, t;
                    i.touchPos = {};
                    i.hasMoved = !1;
                    i.on("touchstart", function(e) {
                        i.touchPos.X = e.originalEvent.touches[0].clientX;
                        i.touchPos.Y = e.originalEvent.touches[0].clientY
                    });
                    i.on("touchend", function(e) {
                        i.touchPos = {};
                        if (i.hasMoved) {
                            e.preventDefault()
                        };
                        i.hasMoved = !1
                    });
                    i.on("touchmove", function(n) {
                        if (!i.touchPos.X) {
                            i.touchPos.X = n.originalEvent.touches[0].clientX;
                            i.touchPos.Y = n.originalEvent.touches[0].clientY
                        } else {
                            a = n.originalEvent.touches[0].clientX - i.touchPos.X;
                            t = n.originalEvent.touches[0].clientY - i.touchPos.Y;
                            if (Math.abs(a) > Math.abs(t)) {
                                n.preventDefault();
                                if (i.touchPos !== n.originalEvent.touches[0].clientX) {
                                    if (Math.abs(a) > 50) {
                                        e = a > 0 ? "prev" : "next";
                                        if (typeof i.options[e] === "string") {
                                            i.find(i.options[e]).trigger(i.options.event[e], ["swipe"])
                                        } else {
                                            i.options[e].trigger(i.options.event[e], ["swipe"])
                                        };
                                        i.hasMoved = !0;
                                        i.touchPos = {};
                                        return !1
                                    }
                                }
                            }
                        }
                    })
                }
            };
        return this.each(function() {
            if (a || t) {
                var s = i(this);
                s.options = i.extend({}, n, e);
                o.activate_touch_control(s)
            }
        })
    }
}(jQuery));
(function(i) {
    if (typeof i.easing !== "undefined") {
        i.easing["jswing"] = i.easing["swing"]
    };
    var e = Math.pow,
        n = Math.sqrt,
        a = Math.sin,
        c = Math.cos,
        t = Math.PI,
        o = 1.70158,
        s = o * 1.525,
        l = o + 1,
        u = (2 * t) / 3,
        v = (2 * t) / 4.5;

    function r(i) {
        var a = 7.5625,
            e = 2.75;
        if (i < 1 / e) {
            return a * i * i
        } else if (i < 2 / e) {
            return a * (i -= (1.5 / e)) * i + .75
        } else if (i < 2.5 / e) {
            return a * (i -= (2.25 / e)) * i + .9375
        } else {
            return a * (i -= (2.625 / e)) * i + .984375
        }
    };
    i.extend(i.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return i.easing[i.easing.def](e)
        },
        easeInQuad: function(i) {
            return i * i
        },
        easeOutQuad: function(i) {
            return 1 - (1 - i) * (1 - i)
        },
        easeInOutQuad: function(i) {
            return i < 0.5 ? 2 * i * i : 1 - e(-2 * i + 2, 2) / 2
        },
        easeInCubic: function(i) {
            return i * i * i
        },
        easeOutCubic: function(i) {
            return 1 - e(1 - i, 3)
        },
        easeInOutCubic: function(i) {
            return i < 0.5 ? 4 * i * i * i : 1 - e(-2 * i + 2, 3) / 2
        },
        easeInQuart: function(i) {
            return i * i * i * i
        },
        easeOutQuart: function(i) {
            return 1 - e(1 - i, 4)
        },
        easeInOutQuart: function(i) {
            return i < 0.5 ? 8 * i * i * i * i : 1 - e(-2 * i + 2, 4) / 2
        },
        easeInQuint: function(i) {
            return i * i * i * i * i
        },
        easeOutQuint: function(i) {
            return 1 - e(1 - i, 5)
        },
        easeInOutQuint: function(i) {
            return i < 0.5 ? 16 * i * i * i * i * i : 1 - e(-2 * i + 2, 5) / 2
        },
        easeInSine: function(i) {
            return 1 - c(i * t / 2)
        },
        easeOutSine: function(i) {
            return a(i * t / 2)
        },
        easeInOutSine: function(i) {
            return -(c(t * i) - 1) / 2
        },
        easeInExpo: function(i) {
            return i === 0 ? 0 : e(2, 10 * i - 10)
        },
        easeOutExpo: function(i) {
            return i === 1 ? 1 : 1 - e(2, -10 * i)
        },
        easeInOutExpo: function(i) {
            return i === 0 ? 0 : i === 1 ? 1 : i < 0.5 ? e(2, 20 * i - 10) / 2 : (2 - e(2, -20 * i + 10)) / 2
        },
        easeInCirc: function(i) {
            return 1 - n(1 - e(i, 2))
        },
        easeOutCirc: function(i) {
            return n(1 - e(i - 1, 2))
        },
        easeInOutCirc: function(i) {
            return i < 0.5 ? (1 - n(1 - e(2 * i, 2))) / 2 : (n(1 - e(-2 * i + 2, 2)) + 1) / 2
        },
        easeInElastic: function(i) {
            return i === 0 ? 0 : i === 1 ? 1 : -e(2, 10 * i - 10) * a((i * 10 - 10.75) * u)
        },
        easeOutElastic: function(i) {
            return i === 0 ? 0 : i === 1 ? 1 : e(2, -10 * i) * a((i * 10 - 0.75) * u) + 1
        },
        easeInOutElastic: function(i) {
            return i === 0 ? 0 : i === 1 ? 1 : i < 0.5 ? -(e(2, 20 * i - 10) * a((20 * i - 11.125) * v)) / 2 : e(2, -20 * i + 10) * a((20 * i - 11.125) * v) / 2 + 1
        },
        easeInBack: function(i) {
            return l * i * i * i - o * i * i
        },
        easeOutBack: function(i) {
            return 1 + l * e(i - 1, 3) + o * e(i - 1, 2)
        },
        easeInOutBack: function(i) {
            return i < 0.5 ? (e(2 * i, 2) * ((s + 1) * 2 * i - s)) / 2 : (e(2 * i - 2, 2) * ((s + 1) * (i * 2 - 2) + s) + 2) / 2
        },
        easeInBounce: function(i) {
            return 1 - r(1 - i)
        },
        easeOutBounce: r,
        easeInOutBounce: function(i) {
            return i < 0.5 ? (1 - r(1 - 2 * i)) / 2 : (1 + r(2 * i - 1)) / 2
        }
    })
}(jQuery));
(function(a) {
    a.fn.avia_ajax_form = function(e) {
        var t = {
            sendPath: "send.php",
            responseContainer: ".ajaxresponse"
        };
        var r = a.extend(t, e);
        return this.each(function() {
            var t = a(this),
                i = !1,
                e = {
                    formElements: t.find("textarea, select, input[type=text], input[type=checkbox], input[type=hidden]"),
                    validationError: !1,
                    button: t.find("input:submit"),
                    dataObj: {}
                },
                s = t.next(r.responseContainer).eq(0);
            e.button.on("click", n);
            if (a.avia_utilities.isMobile) {
                e.formElements.each(function(e) {
                    var r = a(this),
                        t = r.hasClass("is_email");
                    if (t) r.attr("type", "email")
                })
            };

            function n(r) {
                e.validationError = !1;
                e.datastring = "ajax=true";
                e.formElements = t.find("textarea, select, input[type=text], input[type=checkbox], input[type=hidden], input[type=email]");
                e.formElements.each(function(l) {
                    var o = a(this),
                        r = o.parent(),
                        s = o.val(),
                        c = o.attr("name"),
                        i = o.attr("class"),
                        n = !0;
                    if (o.is(":checkbox")) {
                        if (o.is(":checked")) {
                            s = !0
                        } else {
                            s = ""
                        }
                    };
                    e.dataObj[c] = encodeURIComponent(s);
                    if (i && i.match(/is_empty/)) {
                        if (s == "" || s == null) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/is_email/)) {
                        if (!s.match(/^[\w|\.|\-]+@\w[\w|\.|\-]*\.[a-zA-Z]{2,20}$/)) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/is_ext_email/)) {
                        if (!s.match(/^[\w\.\-ÄÖÜäöü]+@\w[\w\.\-ÄÖÜäöü]*\.[a-zA-Z]{2,20}$/)) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/is_special_email/)) {
                        if (!s.match(/^[a-zA-Z0-9.!#$%&'*+\-\/=?^_`{|}~ÄÖÜäöü]+@\w[\w\.\-ÄÖÜäöü]*\.[a-zA-Z]{2,20}$/)) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/is_phone/)) {
                        if (!s.match(/^(\d|\s|\-|\/|\(|\)|\[|\]|e|x|t|ension|\.|\+|\_|\,|\:|\;){3,}$/)) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/is_number/)) {
                        if (!s.match(/^-?\s*(0|[1-9]\d*)([\.,]\d+)?$/)) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/is_positiv_number/)) {
                        if (!(d(s)) || s == "" || s < 0) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (i && i.match(/captcha/) && !i.match(/recaptcha/)) {
                        var v = t.find("#" + c + "_verifier").val(),
                            f = v.charAt(v.length - 1),
                            m = v.charAt(f);
                        if (s != m) {
                            r.removeClass("valid error ajax_alert").addClass("error");
                            e.validationError = !0
                        } else {
                            r.removeClass("valid error ajax_alert").addClass("valid")
                        };
                        n = !1
                    };
                    if (n && s != "") {
                        r.removeClass("valid error ajax_alert").addClass("valid")
                    }
                });
                if (e.validationError == !1) {
                    if (t.data("av-custom-send")) {
                        o()
                    } else {
                        l()
                    }
                };
                return !1
            };

            function l() {
                if (i) {
                    return !1
                };
                if (e.button.hasClass("avia_button_inactive")) {
                    return !1
                };
                i = !0;
                e.button.addClass("av-sending-button");
                e.button.val(e.button.data("sending-label"));
                var n = t.data("avia-redirect") || !1,
                    l = t.attr("action"),
                    o = t.is(".av-form-labels-style");
                if (o) return;
                s.load(l + " " + r.responseContainer, e.dataObj, function() {
                    if (n && l != n) {
                        t.attr("action", n);
                        location.href = n
                    } else {
                        s.removeClass("hidden").css({
                            display: "block"
                        });
                        t.slideUp(400, function() {
                            s.slideDown(400, function() {
                                a("body").trigger("av_resize_finished")
                            });
                            e.formElements.val("")
                        })
                    }
                })
            };

            function o() {
                if (i) {
                    return !1
                };
                i = !0;
                var v = e.button.val();
                e.button.addClass("av-sending-button");
                e.button.val(e.button.data("sending-label"));
                e.dataObj.ajax_mailchimp = !0;
                var n = t.data("avia-redirect") || !1,
                    o = t.attr("action"),
                    l = t.find(".av-form-error-container"),
                    d = t.data("avia-form-id");
                a.ajax({
                    url: o,
                    type: "POST",
                    data: e.dataObj,
                    beforeSend: function() {
                        if (l.length) {
                            l.slideUp(400, function() {
                                l.remove();
                                a("body").trigger("av_resize_finished")
                            })
                        }
                    },
                    success: function(l) {
                        var f = jQuery("<div>").append(jQuery.parseHTML(l)),
                            c = f.find(".av-form-error-container");
                        if (c.length) {
                            i = !1;
                            t.prepend(c);
                            c.css({
                                display: "none"
                            }).slideDown(400, function() {
                                a("body").trigger("av_resize_finished")
                            });
                            e.button.removeClass("av-sending-button");
                            e.button.val(v)
                        } else {
                            if (n && o != n) {
                                t.attr("action", n);
                                location.href = n
                            } else {
                                var m = f.find(r.responseContainer + "_" + d);
                                s.html(m).removeClass("hidden").css({
                                    display: "block"
                                });
                                t.slideUp(400, function() {
                                    s.slideDown(400, function() {
                                        a("body").trigger("av_resize_finished")
                                    });
                                    e.formElements.val("")
                                })
                            }
                        }
                    },
                    error: function() {},
                    complete: function() {}
                })
            };

            function d(a) {
                var e = typeof a;
                return (e === "number" || e === "string") && !isNaN(a - parseFloat(a))
            }
        })
    }
})(jQuery);
(function(a) {
    'use strict';
    a.fn.avia_sc_gallery = function(t) {
        return this.each(function() {
            var e = a(this),
                i = e.find('img'),
                t = e.find('.avia-gallery-big');
            e.on('avia_start_animation', function() {
                i.each(function(t) {
                    var e = a(this);
                    setTimeout(function() {
                        e.addClass('avia_start_animation')
                    }, (t * 110))
                })
            });
            if (e.hasClass('deactivate_avia_lazyload')) {
                e.trigger('avia_start_animation')
            };
            if (t.length) {
                e.on('mouseenter', '.avia-gallery-thumb a', function() {
                    var e = a(this),
                        n = e.attr('data-prev-img'),
                        r = t.find('img'),
                        o = r.attr('src');
                    if (n == o) {
                        return
                    };
                    t.height(t.height());
                    t.attr('data-onclick', e.attr('data-onclick'));
                    t.attr('href', e.attr('href'));
                    t.attr('title', e.attr('title'));
                    if ('undefined' == typeof e.data('srcset')) {
                        t.removeAttr('data-srcset');
                        t.removeData('srcset')
                    } else {
                        t.data('srcset', e.data('srcset'));
                        t.attr('data-srcset', e.data('srcset'))
                    };
                    if ('undefined' == typeof e.data('sizes')) {
                        t.removeAttr('data-sizes');
                        t.removeData('sizes')
                    } else {
                        t.data('sizes', e.data('sizes'));
                        t.attr('data-sizes', e.data('sizes'))
                    };
                    var i = e.find('.big-prev-fake img').clone(!0);
                    if (i.length == 0) {
                        var s = new Image();
                        s.src = n;
                        i = a(s)
                    };
                    if (t.hasClass('avia-gallery-big-no-crop-thumb')) {
                        i.css({
                            'height': t.height(),
                            'width': 'auto'
                        })
                    };
                    t.stop().animate({
                        opacity: 0
                    }, function() {
                        i.insertAfter(r);
                        r.remove();
                        t.animate({
                            opacity: 1
                        })
                    })
                });
                t.on('click', function() {
                    var a = e.find('.avia-gallery-thumb a').eq(this.getAttribute('data-onclick') - 1);
                    if (a && !a.hasClass('aviaopeninbrowser')) {
                        a.trigger('click')
                    } else if (a) {
                        var t = a.attr('href'),
                            i = a.hasClass('custom_link') ? 'noopener,noreferrer' : '';
                        if (a.hasClass('aviablank') && t != '') {
                            window.open(t, '_blank', i)
                        } else if (t != '') {
                            window.open(t, '_self', i)
                        }
                    };
                    return !1
                });
                a(window).on('debouncedresize', function() {
                    t.height('auto')
                })
            }
        })
    }
}(jQuery));
! function(t, e) {
    'function' == typeof define && define.amd ? define('jquery-bridget/jquery-bridget', ['jquery'], function(i) {
        return e(t, i)
    }) : 'object' == typeof module && module.exports ? module.exports = e(t, require('jquery')) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    'use strict';

    function n(i, n, a) {
        function h(t, e, n) {
            var s, r = '$().' + i + '("' + e + '")';
            return t.each(function(t, h) {
                var u = a.data(h, i);
                if (!u) return void o(i + ' not initialized. Cannot call methods, i.e. ' + r);
                var c = u[e];
                if (!c || '_' == e.charAt(0)) return void o(r + ' is not a valid method');
                var d = c.apply(u, n);
                s = void 0 === s ? d : s
            }), void 0 !== s ? s : t
        };

        function u(t, e) {
            t.each(function(t, o) {
                var s = a.data(o, i);
                s ? (s.option(e), s._init()) : (s = new n(o, e), a.data(o, i, s))
            })
        };
        a = a || e || t.jQuery, a && (n.prototype.option || (n.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ('string' == typeof t) {
                var e = r.call(arguments, 1);
                return h(this, t, e)
            };
            return u(this, t), this
        }, s(a))
    };

    function s(t) {
        !t || t && t.bridget || (t.bridget = n)
    };
    var r = Array.prototype.slice,
        i = t.console,
        o = 'undefined' == typeof i ? function() {} : function(t) {
            i.error(t)
        };
    return s(e || t.jQuery), n
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('ev-emitter/ev-emitter', e) : 'object' == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}('undefined' != typeof window ? window : this, function() {
    function e() {};
    var t = e.prototype;
    return t.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, t.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, t.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, t.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                var o = i[s],
                    r = n && n[o];
                r && (this.off(t, o), delete n[o]), o.apply(this, e)
            };
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('get-size/get-size', e) : 'object' == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    'use strict';

    function i(t) {
        var e = parseFloat(t),
            i = t.indexOf('%') == -1 && !isNaN(e);
        return i && e
    };

    function h() {};

    function u() {
        for (var i = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, t = 0; t < o; t++) {
            var n = e[t];
            i[n] = 0
        };
        return i
    };

    function s(t) {
        var e = getComputedStyle(t);
        return e || a('Style returned ' + e + '. Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1'), e
    };

    function c() {
        if (!n) {
            n = !0;
            var e = document.createElement('div');
            e.style.width = '200px', e.style.padding = '1px 2px 3px 4px', e.style.borderStyle = 'solid', e.style.borderWidth = '1px 2px 3px 4px', e.style.boxSizing = 'border-box';
            var o = document.body || document.documentElement;
            o.appendChild(e);
            var a = s(e);
            t = 200 == Math.round(i(a.width)), r.isBoxSizeOuter = t, o.removeChild(e)
        }
    };

    function r(n) {
        if (c(), 'string' == typeof n && (n = document.querySelector(n)), n && 'object' == typeof n && n.nodeType) {
            var a = s(n);
            if ('none' == a.display) return u();
            var r = {};
            r.width = n.offsetWidth, r.height = n.offsetHeight;
            for (var w = r.isBorderBox = 'border-box' == a.boxSizing, h = 0; h < o; h++) {
                var v = e[h],
                    b = a[v],
                    x = parseFloat(b);
                r[v] = isNaN(x) ? 0 : x
            };
            var l = r.paddingLeft + r.paddingRight,
                f = r.paddingTop + r.paddingBottom,
                z = r.marginLeft + r.marginRight,
                I = r.marginTop + r.marginBottom,
                p = r.borderLeftWidth + r.borderRightWidth,
                m = r.borderTopWidth + r.borderBottomWidth,
                g = w && t,
                y = i(a.width);
            y !== !1 && (r.width = y + (g ? 0 : l + p));
            var d = i(a.height);
            return d !== !1 && (r.height = d + (g ? 0 : f + m)), r.innerWidth = r.width - (l + p), r.innerHeight = r.height - (f + m), r.outerWidth = r.width + z, r.outerHeight = r.height + I, r
        }
    };
    var t, a = 'undefined' == typeof console ? h : function(t) {
            console.error(t)
        },
        e = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'],
        o = e.length,
        n = !1;
    return r
}),
function(t, e) {
    'use strict';
    'function' == typeof define && define.amd ? define('desandro-matches-selector/matches-selector', e) : 'object' == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    'use strict';
    var t = function() {
        var e = window.Element.prototype;
        if (e.matches) return 'matches';
        if (e.matchesSelector) return 'matchesSelector';
        for (var o = ['webkit', 'moz', 'ms', 'o'], t = 0; t < o.length; t++) {
            var n = o[t],
                i = n + 'MatchesSelector';
            if (e[i]) return i
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function(i) {
        return e(t, i)
    }) : 'object' == typeof module && module.exports ? module.exports = e(t, require('desandro-matches-selector')) : t.fizzyUIUtils = e(t, t.matchesSelector)
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
        var e = 'object' == typeof t && 'number' == typeof t.length;
        return e ? n.call(t) : [t]
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return 'string' == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var s = t.querySelectorAll(o), i = 0; i < s.length; i++) n.push(s[i])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
            o = e + 'Timeout';
        t.prototype[e] = function() {
            var s = this[o];
            clearTimeout(s);
            var e = arguments,
                t = this;
            this[o] = setTimeout(function() {
                n.apply(t, e), delete t[o]
            }, i)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        'complete' == e || 'interactive' == e ? setTimeout(t) : document.addEventListener('DOMContentLoaded', t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + '-' + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var r = i.toDashed(n),
                s = 'data-' + r,
                h = document.querySelectorAll('[' + s + ']'),
                u = document.querySelectorAll('.js-' + r),
                c = i.makeArray(h).concat(i.makeArray(u)),
                d = s + '-options',
                a = t.jQuery;
            c.forEach(function(t) {
                var i, r = t.getAttribute(s) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r)
                } catch (u) {
                    return void(o && o.error('Error parsing ' + s + ' on ' + t.className + ': ' + u))
                };
                var h = new e(t, i);
                a && a.data(t, n, h)
            })
        })
    }, i
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('outlayer/item', ['ev-emitter/ev-emitter', 'get-size/get-size'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('ev-emitter'), require('get-size')) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    'use strict';

    function l(t) {
        for (var e in t) return !1;
        return e = null, !0
    };

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    };

    function f(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return '-' + t.toLowerCase()
        })
    };
    var s = document.documentElement.style,
        o = 'string' == typeof s.transition ? 'transition' : 'WebkitTransition',
        r = 'string' == typeof s.transform ? 'transform' : 'WebkitTransform',
        a = {
            WebkitTransition: 'webkitTransitionEnd',
            transition: 'transitionend'
        }[o],
        d = {
            transform: r,
            transition: o,
            transitionDuration: o + 'Duration',
            transitionProperty: o + 'Property',
            transitionDelay: o + 'Delay'
        },
        i = n.prototype = Object.create(t.prototype);
    i.constructor = n, i._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: 'absolute'
        })
    }, i.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t)
    }, i.getSize = function() {
        this.size = e(this.element)
    }, i.css = function(t) {
        var o = this.element.style;
        for (var e in t) {
            var i = d[e] || e;
            o[i] = t[e]
        }
    }, i.getPosition = function() {
        var o = getComputedStyle(this.element),
            n = this.layout._getOption('originLeft'),
            s = this.layout._getOption('originTop'),
            r = o[n ? 'left' : 'right'],
            a = o[s ? 'top' : 'bottom'],
            t = parseFloat(r),
            e = parseFloat(a),
            i = this.layout.size;
        r.indexOf('%') != -1 && (t = t / 100 * i.width), a.indexOf('%') != -1 && (e = e / 100 * i.height), t = isNaN(t) ? 0 : t, e = isNaN(e) ? 0 : e, t -= n ? i.paddingLeft : i.paddingRight, e -= s ? i.paddingTop : i.paddingBottom, this.position.x = t, this.position.y = e
    }, i.layoutPosition = function() {
        var o = this.layout.size,
            t = {},
            e = this.layout._getOption('originLeft'),
            i = this.layout._getOption('originTop'),
            h = e ? 'paddingLeft' : 'paddingRight',
            u = e ? 'left' : 'right',
            c = e ? 'right' : 'left',
            d = this.position.x + o[h];
        t[u] = this.getXValue(d), t[c] = '';
        var n = i ? 'paddingTop' : 'paddingBottom',
            s = i ? 'top' : 'bottom',
            r = i ? 'bottom' : 'top',
            a = this.position.y + o[n];
        t[s] = this.getYValue(a), t[r] = '', this.css(t), this.emitEvent('layout', [this])
    }, i.getXValue = function(t) {
        var e = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + '%' : t + 'px'
    }, i.getYValue = function(t) {
        var e = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + '%' : t + 'px'
    }, i._transitionTo = function(t, e) {
        this.getPosition();
        var s = this.position.x,
            r = this.position.y,
            a = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), a && !this.isTransitioning) return void this.layoutPosition();
        var o = t - s,
            n = e - r,
            i = {};
        i.transform = this.getTranslate(o, n), this.transition({
            to: i,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, i.getTranslate = function(t, e) {
        var i = this.layout._getOption('originLeft'),
            o = this.layout._getOption('originTop');
        return t = i ? t : -t, e = o ? e : -e, 'translate3d(' + t + 'px, ' + e + 'px, 0)'
    }, i.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, i.moveTo = i._transitionTo, i.setPosition = function(t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, i._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, i.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var i = this._transn;
        for (var e in t.onTransitionEnd) i.onEnd[e] = t.onTransitionEnd[e];
        for (e in t.to) i.ingProperties[e] = !0, t.isCleaning && (i.clean[e] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        };
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var c = 'opacity,' + f(r);
    i.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = 'number' == typeof t ? t + 'ms' : t, this.css({
                transitionProperty: c,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(a, this, !1)
        }
    }, i.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, i.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var u = {
        '-webkit-transform': 'transform'
    };
    i.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                i = u[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[i], l(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = '', delete e.clean[i]), i in e.onEnd) {
                var o = e.onEnd[i];
                o.call(this), delete e.onEnd[i]
            };
            this.emitEvent('transitionEnd', [this])
        }
    }, i.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
    }, i._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = '';
        this.css(e)
    };
    var h = {
        transitionProperty: '',
        transitionDuration: '',
        transitionDelay: ''
    };
    return i.removeTransitionStyles = function() {
        this.css(h)
    }, i.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + 'ms'
    }, i.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ''
        }), this.emitEvent('remove', [this])
    }, i.remove = function() {
        return o && parseFloat(this.layout.options.transitionDuration) ? (this.once('transitionEnd', function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, i.reveal = function() {
        delete this.isHidden, this.css({
            display: ''
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty('visibleStyle');
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, i.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent('reveal')
    }, i.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return 'opacity';
        for (var i in e) return i
    }, i.hide = function() {
        this.isHidden = !0, this.css({
            display: ''
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty('hiddenStyle');
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, i.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: 'none'
        }), this.emitEvent('hide'))
    }, i.destroy = function() {
        this.css({
            position: '',
            left: '',
            right: '',
            top: '',
            bottom: '',
            transition: '',
            transform: ''
        })
    }, n
}),
function(t, e) {
    'use strict';
    'function' == typeof define && define.amd ? define('outlayer/outlayer', ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : 'object' == typeof module && module.exports ? module.exports = e(t, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item')) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, n, o, a) {
    'use strict';

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error('Bad element for ' + this.constructor.namespace + ': ' + (i || t)));
        this.element = i, r && (this.$element = r(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++f;
        this.element.outlayerGUID = n, h[n] = this, this._create();
        var s = this._getOption('initLayout');
        s && this.layout()
    };

    function d(t) {
        function e() {
            t.apply(this, arguments)
        };
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    };

    function p(t) {
        if ('number' == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = l[n] || 1;
        return i * o
    };
    var u = t.console,
        r = t.jQuery,
        c = function() {},
        f = 0,
        h = {};
    s.namespace = 'outlayer', s.Item = a, s.defaults = {
        containerStyle: {
            position: 'relative'
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        }
    };
    var i = s.prototype;
    o.extend(i, e.prototype), i.option = function(t) {
        o.extend(this.options, t)
    }, i._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer'
    }, i._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption('resize');
        t && this.bindResize()
    }, i.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, i._itemize = function(t) {
        for (var i = this._filterFindItemElements(t), r = this.constructor.Item, o = [], e = 0; e < i.length; e++) {
            var n = i[e],
                s = new r(n, this);
            o.push(s)
        };
        return o
    }, i._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, i.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, i.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption('layoutInstant'),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, i._init = i.layout, i._resetLayout = function() {
        this.getSize()
    }, i.getSize = function() {
        this.size = n(this.element)
    }, i._getMeasurement = function(t, e) {
        var o, i = this.options[t];
        i ? ('string' == typeof i ? o = this.element.querySelector(i) : i instanceof HTMLElement && (o = i), this[t] = o ? n(o)[e] : i) : this[t] = 0
    }, i.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, i._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, i._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems('layout', t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, i._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, i._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, i.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = p(t), this.stagger)
    }, i._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, i._postLayout = function() {
        this.resizeContainer()
    }, i.resizeContainer = function() {
        var e = this._getOption('resizeContainer');
        if (e) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, i._getContainerSize = c, i._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? 'width' : 'height'] = t + 'px'
        }
    }, i._emitCompleteOnItems = function(t, e) {
        function n() {
            s.dispatchEvent(t + 'Complete', null, [e])
        };

        function r() {
            i++, i == o && n()
        };
        var s = this,
            o = e.length;
        if (!e || !o) return void n();
        var i = 0;
        e.forEach(function(e) {
            e.once(t, r)
        })
    }, i.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), r)
            if (this.$element = this.$element || r(this.element), e) {
                var o = r.Event(e);
                o.type = t, this.$element.trigger(o, i)
            }
        else this.$element.trigger(t, i)
    }, i.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, i.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, i.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, i.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, i._find = function(t) {
        if (t) return 'string' == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, i._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, i._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect(),
            t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, i._manageStamp = c, i._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            i = this._boundingRect,
            o = n(t),
            s = {
                left: e.left - i.left - o.marginLeft,
                top: e.top - i.top - o.marginTop,
                right: i.right - e.right - o.marginRight,
                bottom: i.bottom - e.bottom - o.marginBottom
            };
        return s
    }, i.handleEvent = o.handleEvent, i.bindResize = function() {
        t.addEventListener('resize', this), this.isResizeBound = !0
    }, i.unbindResize = function() {
        t.removeEventListener('resize', this), this.isResizeBound = !1
    }, i.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, 'onresize', 100), i.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, i.needsResizeLayout = function() {
        var t = n(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, i.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, i.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, i.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, i.reveal = function(t) {
        if (this._emitCompleteOnItems('reveal', t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, i.hide = function(t) {
        if (this._emitCompleteOnItems('hide', t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, i.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, i.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, i.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, i.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, i.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems('remove', e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, i.destroy = function() {
        var t = this.element.style;
        t.height = '', t.position = '', t.width = '', this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete h[e], delete this.element.outlayerGUID, r && r.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && h[e]
    }, s.create = function(t, e) {
        var i = d(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = d(a), o.htmlInit(i, t), r && r.bridget && r.bridget(t, i), i
    };
    var l = {
        ms: 1,
        s: 1e3
    };
    return s.Item = a, s
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('isotope-layout/js/item', ['outlayer/outlayer'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('outlayer')) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    'use strict';

    function i() {
        t.Item.apply(this, arguments)
    };
    var e = i.prototype = Object.create(t.Item.prototype),
        n = e._create;
    e._create = function() {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
    }, e.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData['original-order'] = this.id, this.sortData.random = Math.random();
            var i = this.layout.options.getSortData,
                o = this.layout._sorters;
            for (var t in i) {
                var e = o[t];
                this.sortData[t] = e(this.element, this)
            }
        }
    };
    var o = e.destroy;
    return e.destroy = function() {
        o.apply(this, arguments), this.css({
            display: ''
        })
    }, i
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('isotope-layout/js/layout-mode', ['get-size/get-size', 'outlayer/outlayer'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('get-size'), require('outlayer')) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    'use strict';

    function o(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    };
    var i = o.prototype,
        n = ['_resetLayout', '_getItemLayoutPosition', '_manageStamp', '_getContainerSize', '_getElementOffset', 'needsResizeLayout', '_getOption'];
    return n.forEach(function(t) {
        i[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), i.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, i._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, i.getColumnWidth = function() {
        this.getSegmentSize('column', 'Width')
    }, i.getRowHeight = function() {
        this.getSegmentSize('row', 'Height')
    }, i.getSegmentSize = function(t, e) {
        var i = t + e,
            n = 'outer' + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size['inner' + e]
        }
    }, i.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, i.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, i.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, o.modes = {}, o.create = function(t, e) {
        function n() {
            o.apply(this, arguments)
        };
        return n.prototype = Object.create(i), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, o.modes[t] = n, n
    }, o
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('masonry-layout/masonry', ['outlayer/outlayer', 'get-size/get-size'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('outlayer'), require('get-size')) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var o = t.create('masonry');
    o.compatOptions.fitWidth = 'isFitWidth';
    var i = o.prototype;
    return i._resetLayout = function() {
        this.getSize(), this._getMeasurement('columnWidth', 'outerWidth'), this._getMeasurement('gutter', 'outerWidth'), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, i.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var s = this.items[0],
                r = s && s.element;
            this.columnWidth = r && e(r).outerWidth || this.containerWidth
        };
        var t = this.columnWidth += this.gutter,
            o = this.containerWidth + this.gutter,
            i = o / t,
            n = t - o % t,
            a = n && n < 1 ? 'round' : 'floor';
        i = Math[a](i), this.cols = Math.max(i, 1)
    }, i.getContainerWidth = function() {
        var i = this._getOption('fitWidth'),
            o = i ? this.element.parentNode : this.element,
            t = e(o);
        this.containerWidth = t && t.innerWidth
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var n = t.size.outerWidth % this.columnWidth,
            u = n && n < 1 ? 'round' : 'ceil',
            i = Math[u](t.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var s = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition', e = this[s](i, t), r = {
                x: this.columnWidth * e.col,
                y: e.y
            }, a = e.y + t.size.outerHeight, h = i + e.col, o = e.col; o < h; o++) this.colYs[o] = a;
        return r
    }, i._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, i._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var i = [], o = this.cols + 1 - t, e = 0; e < o; e++) i[e] = this._getColGroupY(e, t);
        return i
    }, i._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, i._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, i._manageStamp = function(t) {
        var r = e(t),
            n = this._getElementOffset(t),
            d = this._getOption('originLeft'),
            a = d ? n.left : n.right,
            h = a + r.outerWidth,
            s = Math.floor(a / this.columnWidth);
        s = Math.max(0, s);
        var o = Math.floor(h / this.columnWidth);
        o -= h % this.columnWidth ? 0 : 1, o = Math.min(this.cols - 1, o);
        for (var u = this._getOption('originTop'), c = (u ? n.top : n.bottom) + r.outerHeight, i = s; i <= o; i++) this.colYs[i] = Math.max(c, this.colYs[i])
    }, i._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption('fitWidth') && (t.width = this._getContainerFitWidth()), t
    }, i._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, i.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, o
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('isotope-layout/js/layout-modes/masonry', ['../layout-mode', 'masonry-layout/masonry'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('../layout-mode'), require('masonry-layout')) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    'use strict';
    var n = t.create('masonry'),
        i = n.prototype,
        a = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var o in e.prototype) a[o] || (i[o] = e.prototype[o]);
    var r = i.measureColumns;
    i.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var s = i._getOption;
    return i._getOption = function(t) {
        return 'fitWidth' == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : s.apply(this.isotope, arguments)
    }, n
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('isotope-layout/js/layout-modes/fit-rows', ['../layout-mode'], e) : 'object' == typeof exports ? module.exports = e(require('../layout-mode')) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    'use strict';
    var i = t.create('fitRows'),
        e = i.prototype;
    return e._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement('gutter', 'outerWidth')
    }, e._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            o = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > o && (this.x = 0, this.y = this.maxY);
        var i = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, i
    }, e._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, i
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('isotope-layout/js/layout-modes/vertical', ['../layout-mode'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('../layout-mode')) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    'use strict';
    var i = t.create('vertical', {
            horizontalAlignment: 0
        }),
        e = i.prototype;
    return e._resetLayout = function() {
        this.y = 0
    }, e._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, e._getContainerSize = function() {
        return {
            height: this.y
        }
    }, i
}),
function(t, e) {
    'function' == typeof define && define.amd ? define(['outlayer/outlayer', 'get-size/get-size', 'desandro-matches-selector/matches-selector', 'fizzy-ui-utils/utils', 'isotope-layout/js/item', 'isotope-layout/js/layout-mode', 'isotope-layout/js/layout-modes/masonry', 'isotope-layout/js/layout-modes/fit-rows', 'isotope-layout/js/layout-modes/vertical'], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : 'object' == typeof module && module.exports ? module.exports = e(t, require('outlayer'), require('get-size'), require('desandro-matches-selector'), require('fizzy-ui-utils'), require('isotope-layout/js/item'), require('isotope-layout/js/layout-mode'), require('isotope-layout/js/layout-modes/masonry'), require('isotope-layout/js/layout-modes/fit-rows'), require('isotope-layout/js/layout-modes/vertical')) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, o, s, n, h, a) {
    function f(t, e) {
        return function(i, o) {
            for (var a = 0; a < t.length; a++) {
                var n = t[a],
                    s = i.sortData[n],
                    r = o.sortData[n];
                if (s > r || s < r) {
                    var h = void 0 !== e[n] ? e[n] : e,
                        u = h ? 1 : -1;
                    return (s > r ? 1 : -1) * u
                }
            };
            return 0
        }
    };
    var u = t.jQuery,
        l = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, '')
        },
        r = e.create('isotope', {
            layoutMode: 'masonry',
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    r.Item = h, r.LayoutMode = a;
    var i = r.prototype;
    i._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ['original-order'];
        for (var t in a.modes) this._initLayoutMode(t)
    }, i.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, i._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        };
        return this._updateItemsSortData(t), t
    }, i._initLayoutMode = function(t) {
        var e = a.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, i.layout = function() {
        return !this._isLayoutInited && this._getOption('initLayout') ? void this.arrange() : void this._layout()
    }, i._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, i.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, i._init = i.arrange, i._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, i._getIsInstant = function() {
        var t = this._getOption('layoutInstant'),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, i._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent('arrangeComplete', null, [n.filteredItems])
        };
        var e, i, o, n = this;
        this.once('layoutComplete', function() {
            e = !0, t()
        }), this.once('hideComplete', function() {
            i = !0, t()
        }), this.once('revealComplete', function() {
            o = !0, t()
        })
    }, i._filter = function(t) {
        var n = this.options.filter;
        n = n || '*';
        for (var s = [], r = [], a = [], h = this._getFilterTest(n), o = 0; o < t.length; o++) {
            var e = t[o];
            if (!e.isIgnored) {
                var i = h(e);
                i && s.push(e), i && e.isHidden ? r.push(e) : i || e.isHidden || a.push(e)
            }
        };
        return {
            matches: s,
            needReveal: r,
            needHide: a
        }
    }, i._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t)
        } : 'function' == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return s(e.element, t)
        }
    }, i.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, i._getSorters = function() {
        var e = this.options.getSortData;
        for (var t in e) {
            var i = e[t];
            this._sorters[t] = d(i)
        }
    }, i._updateItemsSortData = function(t) {
        for (var i = t && t.length, e = 0; i && e < i; e++) {
            var o = t[e];
            o.updateSortData()
        }
    };
    var d = function() {
        function t(t) {
            if ('string' != typeof t) return t;
            var i = l(t).split(' '),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                h = n && n[1],
                s = e(h, o),
                a = r.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(s(t))
            } : function(t) {
                return t && s(t)
            }
        };

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        };
        return t
    }();
    r.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, i._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = f(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, i._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, i._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error('No layout mode: ' + t);
        return e.options = this.options[t], e
    }, i._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, i._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, i._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, i._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, i.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, i.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, i.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, i._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, i.insert = function(t) {
        var i = this.addItems(t);
        if (i.length) {
            var e, n, o = i.length;
            for (e = 0; e < o; e++) n = i[e], this.element.appendChild(n.element);
            var s = this._filter(i).matches;
            for (e = 0; e < o; e++) i[e].isLayoutInstant = !0;
            for (this.arrange(), e = 0; e < o; e++) delete i[e].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = i.remove;
    return i.remove = function(t) {
        t = n.makeArray(t);
        var i = this.getItems(t);
        c.call(this, t);
        for (var o = i && i.length, e = 0; o && e < o; e++) {
            var s = i[e];
            n.removeFrom(this.filteredItems, s)
        }
    }, i.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        };
        this.options.sortBy = 'random', this._sort(), this._layout()
    }, i._noTransition = function(t, e) {
        var o = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var i = t.apply(this, e);
        return this.options.transitionDuration = o, i
    }, i.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, r
});
! function(t, e) {
    'function' == typeof define && define.amd ? define('packery/js/rect', e) : 'object' == typeof module && module.exports ? module.exports = e() : (t.Packery = t.Packery || {}, t.Packery.Rect = e())
}(window, function() {
    function t(e) {
        for (var i in t.defaults) this[i] = t.defaults[i];
        for (i in e) this[i] = e[i]
    };
    t.defaults = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    var e = t.prototype;
    return e.contains = function(t) {
        var e = t.width || 0,
            i = t.height || 0;
        return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
    }, e.overlaps = function(t) {
        var e = this.x + this.width,
            i = this.y + this.height,
            o = t.x + t.width,
            n = t.y + t.height;
        return this.x < o && e > t.x && this.y < n && i > t.y
    }, e.getMaximalFreeRects = function(e) {
        if (!this.overlaps(e)) return !1;
        var i, o = [],
            r = this.x + this.width,
            a = this.y + this.height,
            n = e.x + e.width,
            s = e.y + e.height;
        return this.y < e.y && (i = new t({
            x: this.x,
            y: this.y,
            width: this.width,
            height: e.y - this.y
        }), o.push(i)), r > n && (i = new t({
            x: n,
            y: this.y,
            width: r - n,
            height: this.height
        }), o.push(i)), a > s && (i = new t({
            x: this.x,
            y: s,
            width: this.width,
            height: a - s
        }), o.push(i)), this.x < e.x && (i = new t({
            x: this.x,
            y: this.y,
            width: e.x - this.x,
            height: this.height
        }), o.push(i)), o
    }, e.canFit = function(t) {
        return this.width >= t.width && this.height >= t.height
    }, t
}),
function(t, e) {
    if ('function' == typeof define && define.amd) define('packery/js/packer', ['./rect'], e);
    else if ('object' == typeof module && module.exports) module.exports = e(require('./rect'));
    else {
        var i = t.Packery = t.Packery || {};
        i.Packer = e(i.Rect)
    }
}(window, function(t) {
    function i(t, e, i) {
        this.width = t || 0, this.height = e || 0, this.sortDirection = i || 'downwardLeftToRight', this.reset()
    };
    var e = i.prototype;
    e.reset = function() {
        this.spaces = [];
        var e = new t({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        });
        this.spaces.push(e), this.sorter = o[this.sortDirection] || o.downwardLeftToRight
    }, e.pack = function(t) {
        for (var e = 0; e < this.spaces.length; e++) {
            var i = this.spaces[e];
            if (i.canFit(t)) {
                this.placeInSpace(t, i);
                break
            }
        }
    }, e.columnPack = function(t) {
        for (var i = 0; i < this.spaces.length; i++) {
            var e = this.spaces[i],
                o = e.x <= t.x && e.x + e.width >= t.x + t.width && e.height >= t.height - .01;
            if (o) {
                t.y = e.y, this.placed(t);
                break
            }
        }
    }, e.rowPack = function(t) {
        for (var i = 0; i < this.spaces.length; i++) {
            var e = this.spaces[i],
                o = e.y <= t.y && e.y + e.height >= t.y + t.height && e.width >= t.width - .01;
            if (o) {
                t.x = e.x, this.placed(t);
                break
            }
        }
    }, e.placeInSpace = function(t, e) {
        t.x = e.x, t.y = e.y, this.placed(t)
    }, e.placed = function(t) {
        for (var e = [], i = 0; i < this.spaces.length; i++) {
            var o = this.spaces[i],
                n = o.getMaximalFreeRects(t);
            n ? e.push.apply(e, n) : e.push(o)
        };
        this.spaces = e, this.mergeSortSpaces()
    }, e.mergeSortSpaces = function() {
        i.mergeRects(this.spaces), this.spaces.sort(this.sorter)
    }, e.addSpace = function(t) {
        this.spaces.push(t), this.mergeSortSpaces()
    }, i.mergeRects = function(t) {
        var e = 0,
            i = t[e];
        t: for (; i;) {
            for (var o = 0, n = t[e + o]; n;) {
                if (n == i) o++;
                else {
                    if (n.contains(i)) {
                        t.splice(e, 1), i = t[e];
                        continue;
                        t
                    };
                    i.contains(n) ? t.splice(e + o, 1) : o++
                };
                n = t[e + o]
            };
            e++, i = t[e]
        };
        return t
    };
    var o = {
        downwardLeftToRight: function(t, e) {
            return t.y - e.y || t.x - e.x
        },
        rightwardTopToBottom: function(t, e) {
            return t.x - e.x || t.y - e.y
        }
    };
    return i
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('packery/js/item', ['outlayer/outlayer', './rect'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('outlayer'), require('./rect')) : t.Packery.Item = e(t.Outlayer, t.Packery.Rect)
}(window, function(t, e) {
    var r = document.documentElement.style,
        o = 'string' == typeof r.transform ? 'transform' : 'WebkitTransform',
        n = function() {
            t.Item.apply(this, arguments)
        },
        i = n.prototype = Object.create(t.Item.prototype),
        a = i._create;
    i._create = function() {
        a.call(this), this.rect = new e
    };
    var s = i.moveTo;
    return i.moveTo = function(t, e) {
        var i = Math.abs(this.position.x - t),
            o = Math.abs(this.position.y - e),
            n = this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && 1 > i && 1 > o;
        return n ? void this.goTo(t, e) : void s.apply(this, arguments)
    }, i.enablePlacing = function() {
        this.removeTransitionStyles(), this.isTransitioning && o && (this.element.style[o] = 'none'), this.isTransitioning = !1, this.getSize(), this.layout._setRectSize(this.element, this.rect), this.isPlacing = !0
    }, i.disablePlacing = function() {
        this.isPlacing = !1
    }, i.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent('remove', [this])
    }, i.showDropPlaceholder = function() {
        var t = this.dropPlaceholder;
        t || (t = this.dropPlaceholder = document.createElement('div'), t.className = 'packery-drop-placeholder', t.style.position = 'absolute'), t.style.width = this.size.width + 'px', t.style.height = this.size.height + 'px', this.positionDropPlaceholder(), this.layout.element.appendChild(t)
    }, i.positionDropPlaceholder = function() {
        this.dropPlaceholder.style[o] = 'translate(' + this.rect.x + 'px, ' + this.rect.y + 'px)'
    }, i.hideDropPlaceholder = function() {
        this.layout.element.removeChild(this.dropPlaceholder)
    }, n
}),
function(t, e) {
    'function' == typeof define && define.amd ? define('packery/js/packery', ['get-size/get-size', 'outlayer/outlayer', './rect', './packer', './item'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('get-size'), require('outlayer'), require('./rect'), require('./packer'), require('./item')) : t.Packery = e(t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item)
}(window, function(t, e, o, n, s) {
    function u(t, e) {
        return t.position.y - e.position.y || t.position.x - e.position.x
    };

    function c(t, e) {
        return t.position.x - e.position.x || t.position.y - e.position.y
    };

    function d(t, e) {
        var i = e.x - t.x,
            o = e.y - t.y;
        return Math.sqrt(i * i + o * o)
    };
    o.prototype.canFit = function(t) {
        return this.width >= t.width - 1 && this.height >= t.height - 1
    };
    var r = e.create('packery');
    r.Item = s;
    var i = r.prototype;
    i._create = function() {
        e.prototype._create.call(this), this.packer = new n, this.shiftPacker = new n, this.isEnabled = !0, this.dragItemCount = 0;
        var t = this;
        this.handleDraggabilly = {
            dragStart: function() {
                t.itemDragStart(this.element)
            },
            dragMove: function() {
                t.itemDragMove(this.element, this.position.x, this.position.y)
            },
            dragEnd: function() {
                t.itemDragEnd(this.element)
            }
        }, this.handleUIDraggable = {
            start: function(e, i) {
                i && t.itemDragStart(e.currentTarget)
            },
            drag: function(e, i) {
                i && t.itemDragMove(e.currentTarget, i.position.left, i.position.top)
            },
            stop: function(e, i) {
                i && t.itemDragEnd(e.currentTarget)
            }
        }
    }, i._resetLayout = function() {
        this.getSize(), this._getMeasurements();
        var t, e, i;
        this._getOption('horizontal') ? (t = 1 / 0, e = this.size.innerHeight + this.gutter, i = 'rightwardTopToBottom') : (t = this.size.innerWidth + this.gutter, e = 1 / 0, i = 'downwardLeftToRight'), this.packer.width = this.shiftPacker.width = t, this.packer.height = this.shiftPacker.height = e, this.packer.sortDirection = this.shiftPacker.sortDirection = i, this.packer.reset(), this.maxY = 0, this.maxX = 0
    }, i._getMeasurements = function() {
        this._getMeasurement('columnWidth', 'width'), this._getMeasurement('rowHeight', 'height'), this._getMeasurement('gutter', 'width')
    }, i._getItemLayoutPosition = function(t) {
        if (this._setRectSize(t.element, t.rect), this.isShifting || this.dragItemCount > 0) {
            var e = this._getPackMethod();
            this.packer[e](t.rect)
        } else this.packer.pack(t.rect);
        return this._setMaxXY(t.rect), t.rect
    }, i.shiftLayout = function() {
        this.isShifting = !0, this.layout(), delete this.isShifting
    }, i._getPackMethod = function() {
        return this._getOption('horizontal') ? 'rowPack' : 'columnPack'
    }, i._setMaxXY = function(t) {
        this.maxX = Math.max(t.x + t.width, this.maxX), this.maxY = Math.max(t.y + t.height, this.maxY)
    }, i._setRectSize = function(e, i) {
        var s = t(e),
            o = s.outerWidth,
            n = s.outerHeight;
        (o || n) && (o = this._applyGridGutter(o, this.columnWidth), n = this._applyGridGutter(n, this.rowHeight)), i.width = Math.min(o, this.packer.width), i.height = Math.min(n, this.packer.height)
    }, i._applyGridGutter = function(t, e) {
        if (!e) return t + this.gutter;
        e += this.gutter;
        var i = t % e,
            o = i && 1 > i ? 'round' : 'ceil';
        return t = Math[o](t / e) * e
    }, i._getContainerSize = function() {
        return this._getOption('horizontal') ? {
            width: this.maxX - this.gutter
        } : {
            height: this.maxY - this.gutter
        }
    }, i._manageStamp = function(t) {
        var e, n = this.getItem(t);
        if (n && n.isPlacing) e = n.rect;
        else {
            var i = this._getElementOffset(t);
            e = new o({
                x: this._getOption('originLeft') ? i.left : i.right,
                y: this._getOption('originTop') ? i.top : i.bottom
            })
        };
        this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e)
    }, i.sortItemsByPosition = function() {
        var t = this._getOption('horizontal') ? c : u;
        this.items.sort(t)
    }, i.fit = function(t, e, i) {
        var o = this.getItem(t);
        o && (this.stamp(o.element), o.enablePlacing(), this.updateShiftTargets(o), e = void 0 === e ? o.rect.x : e, i = void 0 === i ? o.rect.y : i, this.shift(o, e, i), this._bindFitEvents(o), o.moveTo(o.rect.x, o.rect.y), this.shiftLayout(), this.unstamp(o.element), this.sortItemsByPosition(), o.disablePlacing())
    }, i._bindFitEvents = function(t) {
        function i() {
            e++, 2 == e && o.dispatchEvent('fitComplete', null, [t])
        };
        var o = this,
            e = 0;
        t.once('layout', i), this.once('layoutComplete', i)
    }, i.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout())
    }, i.needsResizeLayout = function() {
        var i = t(this.element),
            e = this._getOption('horizontal') ? 'innerHeight' : 'innerWidth';
        return i[e] != this.size[e]
    }, i.resizeShiftPercentLayout = function() {
        var n = this._getItemsForLayout(this.items),
            e = this._getOption('horizontal'),
            i = e ? 'y' : 'x',
            u = e ? 'height' : 'width',
            s = e ? 'rowHeight' : 'columnWidth',
            c = e ? 'innerHeight' : 'innerWidth',
            o = this[s];
        if (o = o && o + this.gutter) {
            this._getMeasurements();
            var h = this[s] + this.gutter;
            n.forEach(function(t) {
                var e = Math.round(t.rect[i] / o);
                t.rect[i] = e * h
            })
        } else {
            var r = t(this.element)[c] + this.gutter,
                a = this.packer[u];
            n.forEach(function(t) {
                t.rect[i] = t.rect[i] / a * r
            })
        };
        this.shiftLayout()
    }, i.itemDragStart = function(t) {
        if (this.isEnabled) {
            this.stamp(t);
            var e = this.getItem(t);
            e && (e.enablePlacing(), e.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(e))
        }
    }, i.updateShiftTargets = function(t) {
        this.shiftPacker.reset(), this._getBoundingRect();
        var l = this._getOption('originLeft'),
            f = this._getOption('originTop');
        this.stamps.forEach(function(t) {
            var n = this.getItem(t);
            if (!n || !n.isPlacing) {
                var e = this._getElementOffset(t),
                    i = new o({
                        x: l ? e.left : e.right,
                        y: f ? e.top : e.bottom
                    });
                this._setRectSize(t, i), this.shiftPacker.placed(i)
            }
        }, this);
        var n = this._getOption('horizontal'),
            d = n ? 'rowHeight' : 'columnWidth',
            s = n ? 'height' : 'width';
        this.shiftTargetKeys = [], this.shiftTargets = [];
        var i, e = this[d];
        if (e = e && e + this.gutter) {
            var c = Math.ceil(t.rect[s] / e),
                a = Math.floor((this.shiftPacker[s] + this.gutter) / e);
            i = (a - c) * e;
            for (var r = 0; a > r; r++) this._addShiftTarget(r * e, 0, i)
        } else i = this.shiftPacker[s] + this.gutter - t.rect[s], this._addShiftTarget(0, 0, i);
        var h = this._getItemsForLayout(this.items),
            u = this._getPackMethod();
        h.forEach(function(t) {
            var o = t.rect;
            this._setRectSize(t.element, o), this.shiftPacker[u](o), this._addShiftTarget(o.x, o.y, i);
            var a = n ? o.x + o.width : o.x,
                h = n ? o.y : o.y + o.height;
            if (this._addShiftTarget(a, h, i), e)
                for (var l = Math.round(o[s] / e), r = 1; l > r; r++) {
                    var c = n ? a : o.x + e * r,
                        d = n ? o.y + e * r : h;
                    this._addShiftTarget(c, d, i)
                }
        }, this)
    }, i._addShiftTarget = function(t, e, i) {
        var n = this._getOption('horizontal') ? e : t;
        if (!(0 !== n && n > i)) {
            var o = t + ',' + e,
                s = -1 != this.shiftTargetKeys.indexOf(o);
            s || (this.shiftTargetKeys.push(o), this.shiftTargets.push({
                x: t,
                y: e
            }))
        }
    }, i.shift = function(t, e, i) {
        var o, n = 1 / 0,
            s = {
                x: e,
                y: i
            };
        this.shiftTargets.forEach(function(t) {
            var e = d(t, s);
            n > e && (o = t, n = e)
        }), t.rect.x = o.x, t.rect.y = o.y
    };
    var a = 120;
    i.itemDragMove = function(t, e, i) {
        function r() {
            n.shift(o, e, i), o.positionDropPlaceholder(), n.layout()
        };
        var o = this.isEnabled && this.getItem(t);
        if (o) {
            e -= this.size.paddingLeft, i -= this.size.paddingTop;
            var n = this,
                s = new Date;
            this._itemDragTime && s - this._itemDragTime < a ? (clearTimeout(this.dragTimeout), this.dragTimeout = setTimeout(r, a)) : (r(), this._itemDragTime = s)
        }
    }, i.itemDragEnd = function(t) {
        function o() {
            i++, 2 == i && (e.element.classList.remove('is-positioning-post-drag'), e.hideDropPlaceholder(), n.dispatchEvent('dragItemPositioned', null, [e]))
        };
        var e = this.isEnabled && this.getItem(t);
        if (e) {
            clearTimeout(this.dragTimeout), e.element.classList.add('is-positioning-post-drag');
            var i = 0,
                n = this;
            e.once('layout', o), this.once('layoutComplete', o), e.moveTo(e.rect.x, e.rect.y), this.layout(), this.dragItemCount = Math.max(0, this.dragItemCount - 1), this.sortItemsByPosition(), e.disablePlacing(), this.unstamp(e.element)
        }
    }, i.bindDraggabillyEvents = function(t) {
        this._bindDraggabillyEvents(t, 'on')
    }, i.unbindDraggabillyEvents = function(t) {
        this._bindDraggabillyEvents(t, 'off')
    }, i._bindDraggabillyEvents = function(t, e) {
        var i = this.handleDraggabilly;
        t[e]('dragStart', i.dragStart), t[e]('dragMove', i.dragMove), t[e]('dragEnd', i.dragEnd)
    }, i.bindUIDraggableEvents = function(t) {
        this._bindUIDraggableEvents(t, 'on')
    }, i.unbindUIDraggableEvents = function(t) {
        this._bindUIDraggableEvents(t, 'off')
    }, i._bindUIDraggableEvents = function(t, e) {
        var i = this.handleUIDraggable;
        t[e]('dragstart', i.start)[e]('drag', i.drag)[e]('dragstop', i.stop)
    };
    var h = i.destroy;
    return i.destroy = function() {
        h.apply(this, arguments), this.isEnabled = !1
    }, r.Rect = o, r.Packer = n, r
}),
function(t, e) {
    'function' == typeof define && define.amd ? define(['isotope-layout/js/layout-mode', 'packery/js/packery'], e) : 'object' == typeof module && module.exports ? module.exports = e(require('isotope-layout/js/layout-mode'), require('packery')) : e(t.Isotope.LayoutMode, t.Packery)
}(window, function(t, e) {
    var n = t.create('packery'),
        i = n.prototype,
        u = {
            _getElementOffset: !0,
            _getMeasurement: !0
        };
    for (var o in e.prototype) u[o] || (i[o] = e.prototype[o]);
    var h = i._resetLayout;
    i._resetLayout = function() {
        this.packer = this.packer || new e.Packer, this.shiftPacker = this.shiftPacker || new e.Packer, h.apply(this, arguments)
    };
    var a = i._getItemLayoutPosition;
    i._getItemLayoutPosition = function(t) {
        return t.rect = t.rect || new e.Rect, a.call(this, t)
    };
    var r = i.needsResizeLayout;
    i.needsResizeLayout = function() {
        return this._getOption('horizontal') ? this.needsVerticalResizeLayout() : r.call(this)
    };
    var s = i._getOption;
    return i._getOption = function(t) {
        return 'horizontal' == t ? void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal : s.apply(this.isotope, arguments)
    }, n
});
(function(i) {
    'use strict';
    i.fn.avia_masonry = function(a) {
        if (!this.length) {
            return this
        };
        var s = i('body'),
            e = i(window),
            n = i.avia_utilities.isMobile,
            l = i.avia_utilities.isTouchDevice,
            r = s.hasClass('avia-mobile-no-animations'),
            o = !1,
            t = {
                masonry_filter: function() {
                    var a = i(this),
                        l = a.html(),
                        n = a.data('filter'),
                        o = a.parents('.av-masonry').eq(0),
                        s = o.find('.av-masonry-container').eq(0),
                        v = o.find('.av-masonry-sort a'),
                        r = o.find('.av-current-sort-title');
                    v.removeClass('active_sort');
                    a.addClass('active_sort');
                    s.attr('id', 'masonry_id_' + n);
                    if (r.length) {
                        r.html(l)
                    };
                    t.applyMasonry(s, n, function() {
                        s.css({
                            overflow: 'visible'
                        })
                    });
                    setTimeout(function() {
                        e.trigger('debouncedresize')
                    }, 500);
                    return !1
                },
                applyMasonry: function(a, o, s) {
                    var t = o ? {
                        filter: '.' + o
                    } : {};
                    t['layoutMode'] = 'packery';
                    t['packery'] = {
                        gutter: 0
                    };
                    t['percentPosition'] = !0;
                    t['itemSelector'] = 'a.isotope-item, div.isotope-item';
                    t['originLeft'] = i('body').hasClass('rtl') ? !1 : !0;
                    a.isotope(t, function() {
                        e.trigger('av-height-change')
                    });
                    if (typeof s === 'function') {
                        setTimeout(s, 0)
                    }
                },
                show_bricks: function(a, t) {
                    var s = i.avia_utilities.supports('transition'),
                        o = n && r ? 0 : 100;
                    a.each(function(n) {
                        var r = i(this),
                            l = r.find('.avia-curtain-reveal-overlay');
                        if (l.length > 0) {
                            o = 500;
                            l.on('animationstart', function(i) {
                                r.css({
                                    visibility: 'visible'
                                })
                            });
                            l.on('animationend', function(a) {
                                i(this).remove()
                            })
                        };
                        setTimeout(function() {
                            if (s === !1) {
                                r.css({
                                    visibility: 'visible',
                                    opacity: 0
                                }).animate({
                                    opacity: 1
                                }, 1500)
                            } else {
                                r.addClass('av-masonry-item-loaded');
                                l.addClass('avia_start_delayed_animation')
                            };
                            if (n == a.length - 1 && typeof t == 'function') {
                                t.call();
                                e.trigger('av-height-change')
                            }
                        }, (o * n))
                    })
                },
                loadMore: function(a) {
                    a.preventDefault();
                    if (o) {
                        return !1
                    };
                    o = !0;
                    var l = i(this),
                        n = l.data(),
                        r = l.parents('.av-masonry').eq(0),
                        d = r.find('.av-masonry-container'),
                        f = r.find('.av-masonry-entry'),
                        v = i.avia_utilities.loading(),
                        c = function() {
                            o = !1;
                            v.hide();
                            s.trigger('av_resize_finished')
                        };
                    if (!n.offset) {
                        n.offset = 0
                    };
                    n.offset += n.items;
                    n.action = 'avia_ajax_masonry_more';
                    n.loaded = [];
                    f.each(function() {
                        var a = i(this).data('av-masonry-item');
                        if (a) {
                            n.loaded.push(a)
                        }
                    });
                    i.ajax({
                        url: avia_framework_globals.ajaxurl,
                        type: 'POST',
                        data: n,
                        beforeSend: function() {
                            v.show()
                        },
                        success: function(a) {
                            if (a.indexOf('{av-masonry-loaded}') !== -1) {
                                var a = a.split('{av-masonry-loaded}'),
                                    o = i(a.pop()).filter('.isotope-item');
                                if (o.length > n.items) {
                                    o = o.not(o.last())
                                } else {
                                    l.addClass('av-masonry-no-more-items')
                                };
                                o.find('.avia-animate-admin-preview').removeClass('avia-animate-admin-preview');
                                if (o.find('.avia-curtain-reveal-overlay').length > 0) {
                                    o.css({
                                        visibility: 'hidden'
                                    })
                                };
                                var s = i('<div class="loadcontainer"></div>').append(o);
                                i.avia_utilities.preload({
                                    container: s,
                                    single_callback: function() {
                                        var s = r.find('.av-masonry-sort a'),
                                            a = r.find('.av-sort-by-term'),
                                            n = a.data('av-allowed-sort');
                                        a.hide();
                                        v.hide();
                                        d.isotope('insert', o);
                                        i.avia_utilities.avia_ajax_call(r);
                                        setTimeout(function() {
                                            t.show_bricks(o, c)
                                        }, 150);
                                        setTimeout(function() {
                                            e.trigger('av-height-change')
                                        }, 550);
                                        if (s) {
                                            i(s).each(function(a) {
                                                var t = i(this),
                                                    e = t.data('filter');
                                                if (o) {
                                                    i(o).each(function(a) {
                                                        var s = i(this);
                                                        if (s.hasClass(e) && n.indexOf(e) !== -1) {
                                                            var o = t.find('.avia-term-count').text();
                                                            t.find('.avia-term-count').text(' ' + (parseInt(o) + 1) + ' ');
                                                            if (t.hasClass('avia_hide_sort')) {
                                                                t.removeClass('avia_hide_sort').addClass('avia_show_sort');
                                                                r.find('.av-masonry-sort .' + e + '_sep').removeClass('avia_hide_sort').addClass('avia_show_sort');
                                                                r.find('.av-masonry-sort .av-sort-by-term').removeClass('hidden')
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        };
                                        a.fadeIn()
                                    }
                                })
                            } else {
                                c()
                            }
                        },
                        error: c,
                        complete: function() {
                            setTimeout(function() {
                                e.trigger('debouncedresize')
                            }, 500)
                        }
                    })
                }
            };
        return this.each(function() {
            var a = i(this),
                e = a.find('.av-masonry-container'),
                o = a.find('.isotope-item'),
                s = a.find('.av-masonry-sort').css({
                    visibility: 'visible',
                    opacity: 0
                }).on('click', 'a', t.masonry_filter),
                l = a.find('.av-masonry-load-more').css({
                    visibility: 'visible',
                    opacity: 0
                });
            if (o.find('.avia-curtain-reveal-overlay').length > 0) {
                o.css({
                    visibility: 'hidden'
                })
            };
            i.avia_utilities.preload({
                container: e,
                single_callback: function() {
                    var v = function() {
                        s.animate({
                            opacity: 1
                        }, 400);
                        if (e.outerHeight() + e.offset().top + i('#footer').outerHeight() > i(window).height()) {
                            i('html').css({
                                'overflow-y': 'scroll'
                            })
                        };
                        t.applyMasonry(e, !1, function() {
                            a.addClass('avia_sortable_active');
                            e.removeClass('av-js-disabled')
                        });
                        t.show_bricks(o, function() {
                            l.css({
                                opacity: 1
                            }).on('click', t.loadMore)
                        })
                    };
                    if (n && r) {
                        v()
                    } else {
                        a.waypoint(v, {
                            offset: '80%'
                        })
                    };
                    i(window).on('debouncedresize', function() {
                        t.applyMasonry(e, !1, function() {
                            a.addClass('avia_sortable_active')
                        })
                    })
                }
            })
        })
    }
}(jQuery));
(function(t) {
    t.fn.avia_sc_animated_number = function(a) {
        if (!this.length) return;
        if (this.is('.avia_sc_animated_number_active')) return;
        this.addClass('avia_sc_animated_number_active');
        var e = (a && a.simple_up) ? !0 : !1,
            r = (a && a.start_timer) ? a.start_timer : 300,
            n = function(t, a, n) {
                var r = '',
                    s = n.toString().length - t.toString().length;
                for (var i = s; i > 0; i--) {
                    r += '0'
                };
                t = (e) ? t.toString() : r + t.toString();
                if ('' == a) {
                    return t
                };
                return t.split(/(?=(?:...)*$)/).join(a)
            },
            i = function(t, a, r, u, f, s) {
                var o = u + r,
                    final = '';
                if (o >= f) {
                    final = n(a, s, a);
                    t.text(final)
                } else {
                    final = n(o, s, a);
                    t.text(final);
                    window.requestAnimationFrame(function() {
                        i(t, a, r, o, f, s)
                    })
                }
            };
        return this.each(function() {
            var n = t(this),
                e = n.find('.__av-single-number'),
                s = n.data('timer') || 3000;
            e.each(function(a) {
                var n = t(this),
                    i = n.text();
                if (window.addEventListener) n.text(i.replace(/./g, '0'))
            });
            n.addClass('number_prepared').on('avia_start_animation', function() {
                if (n.is('.avia_animation_done')) return;
                n.addClass('avia_animation_done');
                e.each(function(n) {
                    var a = t(this),
                        e = a.data('number'),
                        f = e,
                        u = parseInt(a.text(), 10),
                        m = /^0+$/.test(e),
                        o = 0,
                        d = '';
                    if ('undefined' != typeof a.data('start_from')) {
                        u = a.data('start_from')
                    };
                    if ('undefined' != typeof a.data('number_format')) {
                        d = a.data('number_format')
                    };
                    if (m && e !== 0) {
                        f = e.replace(/0/g, '9')
                    };
                    o = Math.round(f * 32 / s);
                    if (o == 0 || o % 10 == 0) o += 1;
                    setTimeout(function() {
                        i(a, e, o, u, f, d)
                    }, r)
                })
            });
            if (a && a.instant_start == !0) {
                n.trigger('avia_start_animation')
            }
        })
    }
})(jQuery);
(function(i) {
    'use strict';
    i.AviaSlider = function(s, e) {
        var t = this;
        this.$win = i(window);
        this.$slider = i(e);
        this.isMobile = i.avia_utilities.isMobile;
        this.isTouchDevice = i.avia_utilities.isTouchDevice, this._prepareSlides(s);
        i.avia_utilities.preload({
            container: this.$slider,
            single_callback: function() {
                t._init(s)
            }
        })
    };
    i.AviaSlider.defaults = {
        interval: 5,
        autoplay: !1,
        autoplay_stopper: !1,
        loop_autoplay: 'once',
        loop_manual: 'manual-endless',
        stopinfiniteloop: !1,
        noNavigation: !1,
        animation: 'slide',
        transitionSpeed: 900,
        easing: 'easeInOutQuart',
        wrapElement: '>ul',
        slideElement: '>li',
        hoverpause: !1,
        bg_slider: !1,
        show_slide_delay: 0,
        fullfade: !1,
        keep_padding: !1,
        carousel: 'no',
        carouselSlidesToShow: 3,
        carouselSlidesToScroll: 1,
        carouselResponsive: []
    };
    i.AviaSlider.prototype = {
        _init: function(s) {
            this.options = this._setOptions(s);
            this.$sliderUl = this.$slider.find(this.options.wrapElement);
            this.$slides = this.$sliderUl.find(this.options.slideElement);
            this.slide_arrows = this.$slider.find('.avia-slideshow-arrows');
            this.gotoButtons = this.$slider.find('.avia-slideshow-dots a');
            this.permaCaption = this.$slider.find('>.av-slideshow-caption');
            this.itemsCount = this.$slides.length;
            this.current = 0;
            this.currentCarousel = 0;
            this.slideWidthCarousel = '240';
            this.loopCount = 0;
            this.isAnimating = !1;
            this.browserPrefix = i.avia_utilities.supports('transition');
            this.cssActive = this.browserPrefix !== !1 ? !0 : !1;
            this.css3DActive = document.documentElement.className.indexOf('avia_transform3d') !== -1 ? !0 : !1;
            if (this.options.bg_slider == !0) {
                this.imageUrls = [];
                this.loader = i.avia_utilities.loading(this.$slider);
                this._bgPreloadImages()
            } else {
                this._kickOff()
            };
            if (this.options.carousel === 'yes') {
                this.options.animation = 'carouselslide'
            }
        },
        _setOptions: function(s) {
            var o = this.$slider.data('slideshow-options');
            if ('object' == typeof o) {
                var e = i.extend({}, i.AviaSlider.defaults, s, o);
                if ('undefined' != typeof e.transition_speed) {
                    e.transitionSpeed = e.transition_speed
                };
                return e
            };
            var e = i.extend(!0, {}, i.AviaSlider.defaults, s),
                a = this.$slider.data();
            for (var t in a) {
                var n = ('transition_speed' != t) ? t : 'transitionSpeed';
                if (typeof a[t] === 'string' || typeof a[t] === 'number' || typeof a[t] === 'boolean') {
                    e[n] = a[t]
                };
                if ('undefined' != typeof e.autoplay_stopper && e.autoplay_stopper == 1) {
                    e.autoplay_stopper = !0
                }
            };
            return e
        },
        _prepareSlides: function(s) {
            if (this.isMobile) {
                var e = this.$slider.find('.av-mobile-fallback-image');
                e.each(function() {
                    var e = i(this).removeClass('av-video-slide').data({
                            'avia_video_events': !0,
                            'video-ratio': 0
                        }),
                        n = e.data('mobile-img'),
                        t = e.data('fallback-link'),
                        a = e.find('.avia-slide-wrap');
                    e.find('.av-click-overlay, .mejs-mediaelement, .mejs-container').remove();
                    if (!n) {
                        i('<p class="av-fallback-message"><span>Please set a mobile device fallback image for this video in your wordpress backend</span></p>').appendTo(a)
                    };
                    if (s && s.bg_slider) {
                        e.data('img-url', n);
                        if (t != '') {
                            if (a.is('a')) {
                                a.attr('href', t)
                            } else {
                                a.find('a').remove();
                                a.replaceWith(function() {
                                    var s = i(this);
                                    return i('<a>').attr({
                                        'data-rel': s.data('rel'),
                                        'class': s.attr('class'),
                                        'href': t
                                    }).append(i(this).contents())
                                });
                                a = e.find('.avia-slide-wrap')
                            };
                            if (i.fn.avia_activate_lightbox) {
                                e.parents('#main').avia_activate_lightbox()
                            }
                        }
                    } else {
                        var o = '<img src="' + n + '" alt="" title="" />',
                            l = !1;
                        if ('string' == typeof t && t.trim() != '') {
                            if (a.is('a')) {
                                a.attr('href', t)
                            } else {
                                var r = t.match(/\.(jpg|jpeg|gif|png)$/i) != null ? ' rel="lightbox" ' : '';
                                o = '<a href="' + t.trim() + '"' + r + '>' + o + '</a>'
                            };
                            l = !0
                        };
                        e.find('.avia-slide-wrap').append(o);
                        if (l && i.fn.avia_activate_lightbox) {
                            e.parents('#main').avia_activate_lightbox()
                        }
                    }
                })
            }
        },
        _bgPreloadImages: function(i) {
            this._getImageURLS();
            this._preloadSingle(0, function() {
                this._kickOff();
                this._preloadNext(1)
            })
        },
        _getImageURLS: function() {
            var s = this;
            this.$slides.each(function(e) {
                s.imageUrls[e] = [];
                s.imageUrls[e]['url'] = i(this).data('img-url');
                if (typeof s.imageUrls[e]['url'] == 'string') {
                    s.imageUrls[e]['status'] = !1
                } else {
                    s.imageUrls[e]['status'] = !0
                }
            })
        },
        _preloadSingle: function(s, e) {
            var t = this,
                a = new Image();
            if (typeof t.imageUrls[s]['url'] == 'string') {
                i(a).on('load error', function() {
                    t.imageUrls[s]['status'] = !0;
                    t.$slides.eq(s).css('background-image', 'url(' + t.imageUrls[s]['url'] + ')');
                    if (typeof e == 'function') {
                        e.apply(t, [a, s])
                    }
                });
                if (t.imageUrls[s]['url'] != '') {
                    a.src = t.imageUrls[s]['url']
                } else {
                    i(a).trigger('error')
                }
            } else {
                if (typeof e == 'function') {
                    e.apply(t, [a, s])
                }
            }
        },
        _preloadNext: function(i) {
            if (typeof this.imageUrls[i] != 'undefined') {
                this._preloadSingle(i, function() {
                    this._preloadNext(i + 1)
                })
            }
        },
        _bindEvents: function() {
            var e = this,
                s = i(window);
            this.$slider.on('click', '.next-slide', this.next.bind(this));
            this.$slider.on('click', '.prev-slide', this.previous.bind(this));
            this.$slider.on('click', '.goto-slide', this.go2.bind(this));
            if (this.options.hoverpause) {
                this.$slider.on('mouseenter', this.pause.bind(this));
                this.$slider.on('mouseleave', this.resume.bind(this))
            };
            if (this.permaCaption.length) {
                this.permaCaption.on('click', this._routePermaCaptionClick);
                this.$slider.on('avia_slider_first_slide avia_slider_last_slide avia_slider_navigate_slide', this._setPermaCaptionPointer.bind(this))
            };
            if (this.options.stopinfiniteloop && this.options.autoplay) {
                if (this.options.stopinfiniteloop == 'last') {
                    this.$slider.on('avia_slider_last_slide', this._stopSlideshow.bind(this))
                } else if (this.options.stopinfiniteloop == 'first') {
                    this.$slider.on('avia_slider_first_slide', this._stopSlideshow.bind(this))
                }
            };
            if (this.options.carousel === 'yes') {
                if (!this.isMobile) {
                    s.on('debouncedresize', this._buildCarousel.bind(this))
                }
            } else {
                s.on('debouncedresize.aviaSlider', this._setSize.bind(this))
            };
            if (!this.options.noNavigation) {
                if (!this.isMobile) {
                    this.$slider.avia_keyboard_controls()
                };
                if (this.isMobile || this.isTouchDevice) {
                    this.$slider.avia_swipe_trigger()
                }
            };
            e._attach_video_events()
        },
        _kickOff: function() {
            var s = this,
                e = s.$slides.eq(0),
                t = e.data('video-ratio');
            s._bindEvents();
            s._set_slide_arrows_visibility();
            this.$slider.removeClass('av-default-height-applied');
            if (t) {
                s._setSize(!0)
            } else {
                if (this.options.keep_padding != !0) {
                    s.$sliderUl.css('padding', 0);
                    s.$win.trigger('av-height-change')
                }
            };
            s._setCenter();
            if (this.options.carousel === 'no') {
                e.addClass('next-active-slide');
                e.css({
                    visibility: 'visible',
                    opacity: 0
                }).avia_animate({
                    opacity: 1
                }, function() {
                    var e = i(this).addClass('active-slide');
                    if (s.permaCaption.length) {
                        s.permaCaption.addClass('active-slide')
                    }
                })
            };
            s.$slider.trigger('avia_slider_first_slide');
            if (s.options.autoplay) {
                s._startSlideshow()
            };
            if (s.options.carousel === 'yes') {
                s._buildCarousel()
            };
            s.$slider.trigger('_kickOff')
        },
        _set_slide_arrows_visibility: function() {
            if (this.options.carousel == 'yes') {
                if (0 == this.currentCarousel) {
                    this.slide_arrows.removeClass('av-visible-prev');
                    this.slide_arrows.addClass('av-visible-next')
                } else if (this.currentCarousel + this.options.carouselSlidesToShow >= this.itemsCount) {
                    this.slide_arrows.addClass('av-visible-prev');
                    this.slide_arrows.removeClass('av-visible-next')
                } else {
                    this.slide_arrows.addClass('av-visible-prev');
                    this.slide_arrows.addClass('av-visible-next')
                };
                return
            };
            if ('endless' == this.options.loop_autoplay || 'manual-endless' == this.options.loop_manual) {
                this.slide_arrows.addClass('av-visible-prev');
                this.slide_arrows.addClass('av-visible-next')
            } else if (0 == this.current) {
                this.slide_arrows.removeClass('av-visible-prev');
                this.slide_arrows.addClass('av-visible-next')
            } else if (this.current + 1 >= this.itemsCount) {
                this.slide_arrows.addClass('av-visible-prev');
                this.slide_arrows.removeClass('av-visible-next')
            } else {
                this.slide_arrows.addClass('av-visible-prev');
                this.slide_arrows.addClass('av-visible-next')
            }
        },
        _buildCarousel: function() {
            var r = this,
                a = this.$slider.outerWidth(),
                s = parseInt(a / this.options.carouselSlidesToShow),
                l = window.innerWidth || i(window).width();
            if (this.options.carouselResponsive && this.options.carouselResponsive.length && this.options.carouselResponsive !== null) {
                for (var t in this.options.carouselResponsive) {
                    var n = this.options.carouselResponsive[t]['breakpoint'],
                        e = this.options.carouselResponsive[t]['settings']['carouselSlidesToShow'];
                    if (n >= l) {
                        s = parseInt(a / e);
                        this.options.carouselSlidesToShow = e
                    }
                }
            };
            this.slideWidthCarousel = s;
            this.$slides.each(function(e) {
                i(this).width(s)
            });
            var o = s * this.itemsCount;
            this.$sliderUl.width(o).css('transform', 'translateX(0px)');
            if (this.options.carouselSlidesToShow >= this.itemsCount) {
                this.$slider.find('.av-timeline-nav').hide()
            }
        },
        _navigate: function(i, s) {
            if (this.isAnimating || this.itemsCount < 2  || !this.$slider.is(':visible')) {
                return !1
            };
            this.isAnimating = !0;
            this.prev = this.current;
            if (s !== undefined) {
                this.current = s;
                i = this.current > this.prev ? 'next' : 'prev'
            } else if (i === 'next') {
                this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
                if (this.current === 0 && this.options.autoplay_stopper && this.options.autoplay) {
                    this.isAnimating = !1;
                    this.current = this.prev;
                    this._stopSlideshow();
                    return !1
                };
                if (0 === this.current) {
                    if ('endless' != this.options.loop_autoplay && 'manual-endless' != this.options.loop_manual) {
                        this.isAnimating = !1;
                        this.current = this.prev;
                        return !1
                    }
                }
            } else if (i === 'prev') {
                this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;
                if (this.itemsCount - 1 === this.current) {
                    if ('endless' != this.options.loop_autoplay && 'manual-endless' != this.options.loop_manual) {
                        this.isAnimating = !1;
                        this.current = this.prev;
                        return !1
                    }
                }
            };
            this.gotoButtons.removeClass('active').eq(this.current).addClass('active');
            this._set_slide_arrows_visibility();
            if (this.options.carousel === 'no') {
                this._setSize()
            };
            if (this.options.bg_slider == !0) {
                if (this.imageUrls[this.current]['status'] == !0) {
                    this['_' + this.options.animation].call(this, i)
                } else {
                    this.loader.show();
                    this._preloadSingle(this.current, function() {
                        this['_' + this.options.animation].call(this, i);
                        this.loader.hide()
                    })
                }
            } else {
                this['_' + this.options.animation].call(this, i)
            };
            if (this.current == 0) {
                this.loopCount++;
                this.$slider.trigger('avia_slider_first_slide')
            } else if (this.current == this.itemsCount - 1) {
                this.$slider.trigger('avia_slider_last_slide')
            } else {
                this.$slider.trigger('avia_slider_navigate_slide')
            }
        },
        _setSize: function(i) {
            if (this.options.bg_slider == !0) {
                return
            };
            var n = this,
                s = this.$slides.eq(this.current),
                r = s.find('img'),
                a = Math.floor(this.$sliderUl.height()),
                o = s.data('video-ratio'),
                e = o ? this.$sliderUl.width() / o : Math.floor(s.height()),
                t = s.data('video-height'),
                l = s.data('video-toppos');
            this.$sliderUl.height(a).css('padding', 0);
            if (e != a) {
                if (i == !0) {
                    this.$sliderUl.css({
                        height: e
                    });
                    this.$win.trigger('av-height-change')
                } else {
                    this.$sliderUl.avia_animate({
                        height: e
                    }, function() {
                        n.$win.trigger('av-height-change')
                    })
                }
            };
            this._setCenter();
            if (t && t != 'set') {
                s.find('iframe, embed, video, object, .av_youtube_frame').css({
                    height: t + '%',
                    top: l + '%'
                });
                s.data('video-height', 'set')
            }
        },
        _setCenter: function() {
            var t = this.$slides.eq(this.current),
                o = t.find('img'),
                i = parseInt(o.css('min-width'), 10),
                s = t.width(),
                a = t.find('.av-slideshow-caption'),
                e = ((s - i) / 2);
            if (a.length) {
                if (a.is('.caption_left')) {
                    e = ((s - i) / 1.5)
                } else if (a.is('.caption_right')) {
                    e = ((s - i) / 2.5)
                }
            };
            if (s >= i) {
                e = 0
            };
            o.css({
                left: e
            })
        },
        _carouselmove: function() {
            var i = this.slideWidthCarousel * this.currentCarousel;
            this.$sliderUl.css('transform', 'translateX(-' + i + 'px)')
        },
        _carouselslide: function(i) {
            console.log('_carouselslide:', i, this.currentCarousel);
            if (i === 'next') {
                if (this.options.carouselSlidesToShow + this.currentCarousel < this.itemsCount) {
                    this.currentCarousel++;
                    this._carouselmove()
                }
            } else if (i === 'prev') {
                if (this.currentCarousel > 0) {
                    this.currentCarousel--;
                    this._carouselmove()
                }
            };
            this._set_slide_arrows_visibility();
            this.isAnimating = !1
        },
        _slide: function(i) {
            var l = !1,
                h = l == !0 ? 2 : 1,
                r = this.$slider.width(),
                d = i === 'next' ? -1 : 1,
                s = this.browserPrefix + 'transform',
                a = {},
                e = {},
                t = {},
                o = (r * d * -1),
                n = (r * d) / h;
            if (this.cssActive) {
                s = this.browserPrefix + 'transform';
                if (this.css3DActive) {
                    a[s] = 'translate3d(' + o + 'px, 0, 0)';
                    e[s] = 'translate3d(' + n + 'px, 0, 0)';
                    t[s] = 'translate3d(0,0,0)'
                } else {
                    a[s] = 'translate(' + o + 'px,0)';
                    e[s] = 'translate(' + n + 'px,0)';
                    t[s] = 'translate(0,0)'
                }
            } else {
                a.left = o;
                e.left = n;
                t.left = 0
            };
            if (l) {
                e['z-index'] = '1';
                t['z-index'] = '2'
            };
            this._slide_animate(a, e, t)
        },
        _slide_up: function(i) {
            var l = !0,
                h = l == !0 ? 2 : 1,
                r = this.$slider.height(),
                d = i === 'next' ? -1 : 1,
                s = this.browserPrefix + 'transform',
                a = {},
                e = {},
                t = {},
                o = (r * d * -1),
                n = (r * d) / h;
            if (this.cssActive) {
                s = this.browserPrefix + 'transform';
                if (this.css3DActive) {
                    a[s] = 'translate3d( 0,' + o + 'px, 0)';
                    e[s] = 'translate3d( 0,' + n + 'px, 0)';
                    t[s] = 'translate3d(0,0,0)'
                } else {
                    a[s] = 'translate( 0,' + o + 'px)';
                    e[s] = 'translate( 0,' + n + 'px)';
                    t[s] = 'translate(0,0)'
                }
            } else {
                a.top = o;
                e.top = n;
                t.top = 0
            };
            if (l) {
                e['z-index'] = '1';
                t['z-index'] = '2'
            };
            this._slide_animate(a, e, t)
        },
        _slide_animate: function(i, t, a) {
            var e = this,
                s = this.$slides.eq(this.current),
                o = this.$slides.eq(this.prev);
            o.trigger('pause');
            if (!s.data('disableAutoplay')) {
                if (s.hasClass('av-video-lazyload') && !s.hasClass('av-video-lazyload-complete')) {
                    s.find('.av-click-to-play-overlay').trigger('click')
                } else {
                    s.trigger('play')
                }
            };
            s.css({
                visibility: 'visible',
                zIndex: 4,
                opacity: 1,
                left: 0,
                top: 0
            });
            s.css(i);
            o.avia_animate(t, this.options.transitionSpeed, this.options.easing);
            var n = function() {
                e.isAnimating = !1;
                s.addClass('active-slide');
                o.css({
                    visibility: 'hidden'
                }).removeClass('active-slide next-active-slide');
                e.$slider.trigger('avia-transition-done')
            };
            if (e.options.show_slide_delay > 0) {
                setTimeout(function() {
                    s.addClass('next-active-slide');
                    s.avia_animate(a, e.options.transitionSpeed, e.options.easing, n)
                }, e.options.show_slide_delay)
            } else {
                s.addClass('next-active-slide');
                s.avia_animate(a, e.options.transitionSpeed, e.options.easing, n)
            }
        },
        _fade: function() {
            var s = this,
                i = this.$slides.eq(this.current),
                e = this.$slides.eq(this.prev),
                t = {
                    visibility: 'visible',
                    zIndex: 3,
                    opacity: 0
                },
                a = function() {
                    s.isAnimating = !1;
                    i.addClass('active-slide');
                    e.css({
                        visibility: 'hidden',
                        zIndex: 2
                    }).removeClass('active-slide next-active-slide');
                    s.$slider.trigger('avia-transition-done')
                };
            e.trigger('pause');
            if (!i.data('disableAutoplay')) {
                if (i.hasClass('av-video-lazyload') && !i.hasClass('av-video-lazyload-complete')) {
                    i.find('.av-click-to-play-overlay').trigger('click')
                } else {
                    i.trigger('play')
                }
            };
            i.addClass('next-active-slide');
            if (s.options.fullfade == !0) {
                e.avia_animate({
                    opacity: 0
                }, 200, 'linear', function() {
                    i.css(t).avia_animate({
                        opacity: 1
                    }, s.options.transitionSpeed, 'linear', a)
                })
            } else {
                if (s.current === 0) {
                    e.avia_animate({
                        opacity: 0
                    }, s.options.transitionSpeed / 2, 'linear');
                    i.css(t).avia_animate({
                        opacity: 1
                    }, s.options.transitionSpeed / 2, 'linear', a)
                } else {
                    i.css(t).avia_animate({
                        opacity: 1
                    }, s.options.transitionSpeed / 2, 'linear', function() {
                        e.avia_animate({
                            opacity: 0
                        }, 200, 'linear', a)
                    })
                }
            }
        },
        _attach_video_events: function() {
            var s = this,
                e = i('html');
            s.$slides.each(function(e) {
                var n = i(this),
                    r = n.find('.caption_fullwidth, .av-click-overlay'),
                    d = n.find('.mejs-mediaelement'),
                    l = n.hasClass('av-video-lazyload') ? !0 : !1;
                if (n.data('avia_video_events') != !0) {
                    n.data('avia_video_events', !0);
                    n.on('av-video-events-bound', {
                        slide: n,
                        wrap: d,
                        iteration: e,
                        self: s,
                        lazyload: l
                    }, t);
                    n.on('av-video-ended', {
                        slide: n,
                        self: s
                    }, a);
                    n.on('av-video-play-executed', function() {
                        setTimeout(function() {
                            s.pause()
                        }, 100)
                    });
                    r.on('click', {
                        slide: n
                    }, o);
                    if (n.is('.av-video-events-bound')) {
                        n.trigger('av-video-events-bound')
                    };
                    if (l && e === 0 && !n.data('disableAutoplay')) {
                        n.find('.av-click-to-play-overlay').trigger('click')
                    }
                }
            });

            function t(i) {
                if (i.data.iteration === 0) {
                    i.data.wrap.css('opacity', 0);
                    if (!i.data.self.isMobile && !i.data.slide.data('disableAutoplay')) {
                        i.data.slide.trigger('play')
                    }; ;
                    setTimeout(function() {
                        i.data.wrap.avia_animate({
                            opacity: 1
                        }, 400)
                    }, 50)
                } else if (e.is('.avia-msie') && !i.data.slide.is('.av-video-service-html5')) {
                    if (!i.data.slide.data('disableAutoplay')) {
                        i.data.slide.trigger('play')
                    }
                };
                if (i.data.slide.is('.av-video-service-html5') && i.data.iteration !== 0) {
                    i.data.slide.trigger('pause')
                };
                if (i.data.lazyload) {
                    i.data.slide.addClass('av-video-lazyload-complete');
                    i.data.slide.trigger('play')
                }
            };

            function a(i) {
                if (!i.data.slide.is('.av-single-slide') && !i.data.slide.is('.av-loop-video')) {
                    i.data.slide.trigger('reset');
                    s._navigate('next');
                    s.resume()
                };
                if (i.data.slide.is('.av-loop-video') && i.data.slide.is('.av-video-service-html5')) {
                    if (e.is('.avia-safari-8')) {
                        setTimeout(function() {
                            i.data.slide.trigger('play')
                        }, 1)
                    }
                }
            };

            function o(i) {
                if (i.target.tagName != 'A') {
                    i.data.slide.trigger('toggle')
                }
            }
        },
        _timer: function(i, s, o) {
            var e = this,
                t, a = s;
            e.timerId = 0;
            this.pause = function() {
                window.clearTimeout(e.timerId);
                a -= new Date() - t
            };
            this.resume = function() {
                t = new Date();
                e.timerId = window.setTimeout(i, a)
            };
            this.destroy = function() {
                window.clearTimeout(e.timerId)
            };
            this.resume(!0)
        },
        _startSlideshow: function() {
            var i = this;
            this.isPlaying = !0;
            this.slideshow = new this._timer(function() {
                i._navigate('next');
                if (i.options.autoplay) {
                    i._startSlideshow()
                }
            }, (this.options.interval * 1000))
        },
        _stopSlideshow: function() {
            if (this.options.autoplay) {
                this.slideshow.destroy();
                this.isPlaying = !1;
                this.options.autoplay = !1
            };
            this.options.autoplay = !1;
            this.options.loop_autoplay = 'once';
            this.$slider.removeClass('av-slideshow-autoplay').addClass('av-slideshow-manual');
            this.$slider.removeClass('av-loop-endless').addClass('av-loop-once')
        },
        _setPermaCaptionPointer: function(s) {
            if (!this.permaCaption.length) {
                return
            };
            var e = i(this.$slides[this.current]).find('a').length;
            this.permaCaption.css('cursor', e ? 'pointer' : 'default')
        },
        _routePermaCaptionClick: function(s) {
            var e = i(this).siblings('.avia-slideshow-inner').find('>.active-slide a');
            if (e.length) {
                s.preventDefault();
                e[0].click()
            }
        },
        next: function(i) {
            i.preventDefault();
            this._stopSlideshow();
            this._navigate('next')
        },
        previous: function(i) {
            i.preventDefault();
            this._stopSlideshow();
            this._navigate('prev')
        },
        go2: function(i) {
            if (isNaN(i)) {
                i.preventDefault();
                i = i.currentTarget.hash.replace('#', '')
            };
            i -= 1;
            if (i === this.current || i >= this.itemsCount || i < 0) {
                return !1
            };
            this._stopSlideshow();
            this._navigate(!1, i)
        },
        play: function() {
            if (!this.isPlaying) {
                this.isPlaying = !0;
                this._navigate('next');
                this.options.autoplay = !0;
                this._startSlideshow()
            }
        },
        pause: function() {
            if (this.isPlaying) {
                this.slideshow.pause()
            }
        },
        resume: function() {
            if (this.isPlaying) {
                this.slideshow.resume()
            }
        },
        destroy: function(i) {
            this.slideshow.destroy(i)
        }
    };
    i.fn.aviaSlider = function(s) {
        return this.each(function() {
            var e = i.data(this, 'aviaSlider');
            if (!e) {
                e = i.data(this, 'aviaSlider', new i.AviaSlider(s, this))
            }
        })
    }
})(jQuery);
(function(e) {
    'use strict';
    e.AviaVideoAPI = function(i, t, o) {
        this.videoElement = t;
        this.$video = e(t);
        this.$option_container = o ? e(o) : this.$video;
        this.load_btn = this.$option_container.find('.av-click-to-play-overlay');
        this.video_wrapper = this.$video.parents('ul').eq(0);
        this.lazy_load = this.video_wrapper.hasClass('av-show-video-on-click') ? !0 : !1;
        this.isMobile = e.avia_utilities.isMobile;
        this.fallback = this.isMobile ? this.$option_container.is('.av-mobile-fallback-image') : !1;
        if (this.fallback) {
            return
        };
        this._init(i)
    };
    e.AviaVideoAPI.defaults = {
        loop: !1,
        mute: !1,
        controls: !1,
        events: 'play pause mute unmute loop toggle reset unload'
    };
    e.AviaVideoAPI.apiFiles = {
        youtube: {
            loaded: !1,
            src: 'https://www.youtube.com/iframe_api'
        }
    };
    e.AviaVideoAPI.players = {};
    e.AviaVideoAPI.prototype = {
        _init: function(i) {
            this.options = this._setOptions(i);
            this.type = this._getPlayerType();
            this.player = !1;
            this._bind_player();
            this.eventsBound = !1;
            this.playing = !1;
            this.$option_container.addClass('av-video-paused');
            this.pp = e.avia_utilities.playpause(this.$option_container)
        },
        _setOptions: function(i) {
            var n = e.extend(!0, {}, e.AviaVideoAPI.defaults, i),
                o = this.$option_container.data(),
                t = '';
            for (t in o) {
                if (o.hasOwnProperty(t) && (typeof o[t] === 'string' || typeof o[t] === 'number' || typeof o[t] === 'boolean')) {
                    n[t] = o[t]
                }
            };
            return n
        },
        _getPlayerType: function() {
            var e = this.$video.get(0).src || this.$video.data('src');
            if (this.$video.is('video')) {
                return 'html5'
            };
            if (this.$video.is('.av_youtube_frame')) {
                return 'youtube'
            };
            if (e.indexOf('vimeo.com') != -1) {
                return 'vimeo'
            };
            if (e.indexOf('youtube.com') != -1) {
                return 'youtube'
            }
        },
        _bind_player: function() {
            var t = this,
                o = e('html').hasClass('av-cookies-needs-opt-in') || e('html').hasClass('av-cookies-can-opt-out'),
                i = !0,
                n = e('html').hasClass('av-cookies-user-silent-accept'),
                a = 'html5' == this.type;
            if (o && !n && !a) {
                if (!document.cookie.match(/aviaCookieConsent/) || e('html').hasClass('av-cookies-session-refused')) {
                    i = !1
                } else {
                    if (!document.cookie.match(/aviaPrivacyRefuseCookiesHideBar/)) {
                        i = !1
                    } else if (!document.cookie.match(/aviaPrivacyEssentialCookiesEnabled/)) {
                        i = !1
                    } else if (document.cookie.match(/aviaPrivacyVideoEmbedsDisabled/)) {
                        i = !1
                    }
                }
            };
            if (!i) {
                this._use_external_link();
                return
            };
            if (this.lazy_load && this.load_btn.length && this.type != 'html5') {
                this.$option_container.addClass('av-video-lazyload');
                this.load_btn.on('click', function() {
                    t.load_btn.remove();
                    t._setPlayer()
                })
            } else {
                this.lazy_load = !1;
                this._setPlayer()
            }
        },
        _use_external_link: function() {
            this.$option_container.addClass('av-video-lazyload');
            this.load_btn.on('click', function(i) {
                if (i.originalEvent === undefined) return;
                var t = e(this).parents('.avia-slide-wrap').find('div[data-original_url]').data('original_url');
                if (t) window.open(t, '_blank')
            })
        },
        _setPlayer: function() {
            var t = this;
            switch (this.type) {
                case 'html5':
                    this.player = this.$video.data('mediaelementplayer');
                    if (!this.player) {
                        this.$video.data('mediaelementplayer', e.AviaVideoAPI.players[this.$video.attr('id').replace(/_html5/, '')]);
                        this.player = this.$video.data('mediaelementplayer')
                    };
                    this._playerReady();
                    break;
                case 'vimeo':
                    var i = document.createElement('iframe');
                    var o = e(i);
                    i.onload = function() {
                        t.player = Froogaloop(i);
                        t._playerReady();
                        t.$option_container.trigger('av-video-loaded')
                    };
                    i.setAttribute('src', this.$video.data('src'));
                    o.insertAfter(this.$video);
                    this.$video.remove();
                    this.$video = i;
                    break;
                case 'youtube':
                    this._getAPI(this.type);
                    e('body').on('av-youtube-iframe-api-loaded', function() {
                        t._playerReady()
                    });
                    break
            }
        },
        _getAPI: function(i) {
            if (e.AviaVideoAPI.apiFiles[i].loaded === !1) {
                e.AviaVideoAPI.apiFiles[i].loaded = !0;
                var t = document.createElement('script'),
                    o = document.getElementsByTagName('script')[0];
                t.src = e.AviaVideoAPI.apiFiles[i].src;
                o.parentNode.insertBefore(t, o)
            }
        },
        _playerReady: function() {
            var i = this;
            this.$option_container.on('av-video-loaded', function() {
                i._bindEvents()
            });
            switch (this.type) {
                case 'html5':
                    this.$video.on('av-mediajs-loaded', function() {
                        i.$option_container.trigger('av-video-loaded')
                    });
                    this.$video.on('av-mediajs-ended', function() {
                        i.$option_container.trigger('av-video-ended')
                    });
                    break;
                case 'vimeo':
                    i.player.addEvent('ready', function() {
                        i.$option_container.trigger('av-video-loaded');
                        i.player.addEvent('finish', function() {
                            i.$option_container.trigger('av-video-ended')
                        })
                    });
                    break;
                case 'youtube':
                    var t = i.$video.data();
                    if (i._supports_video()) {
                        t.html5 = 1
                    };
                    i.player = new YT.Player(i.$video.attr('id'), {
                        videoId: t.videoid,
                        height: i.$video.attr('height'),
                        width: i.$video.attr('width'),
                        playerVars: t,
                        events: {
                            'onReady': function() {
                                i.$option_container.trigger('av-video-loaded')
                            },
                            'onError': function(i) {
                                e.avia_utilities.log('YOUTUBE ERROR:', 'error', i)
                            },
                            'onStateChange': function(e) {
                                if (e.data === YT.PlayerState.ENDED) {
                                    var t = i.options.loop != !1 ? 'loop' : 'av-video-ended';
                                    i.$option_container.trigger(t)
                                }
                            }
                        }
                    });
                    break
            };
            setTimeout(function() {
                if (i.eventsBound == !0 || typeof i.eventsBound == 'undefined' || i.type == 'youtube') {
                    return
                };
                e.avia_utilities.log('Fallback Video Trigger "' + i.type + '":', 'log', i);
                i.$option_container.trigger('av-video-loaded')
            }, 2000)
        },
        _bindEvents: function() {
            if (this.eventsBound == !0 || typeof this.eventsBound == 'undefined') {
                return
            };
            var e = this,
                i = 'unmute';
            this.eventsBound = !0;
            this.$option_container.on(this.options.events, function(i) {
                e.api(i.type)
            });
            if (!e.isMobile) {
                if (this.options.mute != !1) {
                    i = 'mute'
                };
                if (this.options.loop != !1) {
                    e.api('loop')
                };
                e.api(i)
            };
            setTimeout(function() {
                e.$option_container.trigger('av-video-events-bound').addClass('av-video-events-bound')
            }, 50)
        },
        _supports_video: function() {
            return !!document.createElement('video').canPlayType
        },
        api: function(e) {
            if (this.isMobile && !this.was_started()) return;
            if (this.options.events.indexOf(e) === -1) return;
            this.$option_container.trigger('av-video-' + e + '-executed');
            if (typeof this['_' + this.type + '_' + e] == 'function') {
                this['_' + this.type + '_' + e].call(this)
            };
            if (typeof this['_' + e] == 'function') {
                this['_' + e].call(this)
            }
        },
        was_started: function() {
            if (!this.player) return !1;
            switch (this.type) {
                case 'html5':
                    if (this.player.getCurrentTime() > 0) {
                        return !0
                    };
                    break;
                case 'vimeo':
                    if (this.player.api('getCurrentTime') > 0) {
                        return !0
                    };
                    break;
                case 'youtube':
                    if (this.player.getPlayerState() !== -1) {
                        return !0
                    };
                    break
            };
            return !1
        },
        _play: function() {
            this.playing = !0;
            this.$option_container.addClass('av-video-playing').removeClass('av-video-paused')
        },
        _pause: function() {
            this.playing = !1;
            this.$option_container.removeClass('av-video-playing').addClass('av-video-paused')
        },
        _loop: function() {
            this.options.loop = !0
        },
        _toggle: function() {
            var e = this.playing == !0 ? 'pause' : 'play';
            this.api(e);
            this.pp.set(e)
        },
        _vimeo_play: function() {
            this.player.api('play')
        },
        _vimeo_pause: function() {
            this.player.api('pause')
        },
        _vimeo_mute: function() {
            this.player.api('setVolume', 0)
        },
        _vimeo_unmute: function() {
            this.player.api('setVolume', 0.7)
        },
        _vimeo_loop: function() {},
        _vimeo_reset: function() {
            this.player.api('seekTo', 0)
        },
        _vimeo_unload: function() {
            this.player.api('unload')
        },
        _youtube_play: function() {
            this.player.playVideo()
        },
        _youtube_pause: function() {
            this.player.pauseVideo()
        },
        _youtube_mute: function() {
            this.player.mute()
        },
        _youtube_unmute: function() {
            this.player.unMute()
        },
        _youtube_loop: function() {
            if (this.playing == !0) this.player.seekTo(0)
        },
        _youtube_reset: function() {
            this.player.stopVideo()
        },
        _youtube_unload: function() {
            this.player.clearVideo()
        },
        _html5_play: function() {
            if (this.player) {
                this.player.options.pauseOtherPlayers = !1;
                this.player.play()
            }
        },
        _html5_pause: function() {
            if (this.player) this.player.pause()
        },
        _html5_mute: function() {
            if (this.player) this.player.setMuted(!0)
        },
        _html5_unmute: function() {
            if (this.player) this.player.setVolume(0.7)
        },
        _html5_loop: function() {
            if (this.player) this.player.options.loop = !0
        },
        _html5_reset: function() {
            if (this.player) this.player.setCurrentTime(0)
        },
        _html5_unload: function() {
            this._html5_pause();
            this._html5_reset()
        }
    };
    e.fn.aviaVideoApi = function(i, t) {
        return this.each(function() {
            var o = this;
            if (t) {
                o = e(this).parents(t).get(0)
            };
            var n = e.data(o, 'aviaVideoApi');
            if (!n) {
                n = e.data(o, 'aviaVideoApi', new e.AviaVideoAPI(i, this, o))
            }
        })
    }
})(jQuery);
window.onYouTubeIframeAPIReady = function() {
    jQuery('body').trigger('av-youtube-iframe-api-loaded')
};
var Froogaloop = (function() {
    function i(e) {
        return new i.fn.init(e)
    };
    var e = {},
        d = !1,
        t = !1,
        p = Array.prototype.slice,
        o = '*';
    i.fn = i.prototype = {
        element: null,
        init: function(e) {
            if (typeof e === 'string') {
                e = document.getElementById(e)
            };
            this.element = e;
            return this
        },
        api: function(e, i) {
            if (!this.element || !e) {
                return !1
            };
            var o = this,
                t = o.element,
                l = t.id !== '' ? t.id : null,
                u = !r(i) ? i : null,
                a = r(i) ? i : null;
            if (a) {
                s(e, a, l)
            };
            n(e, u, t);
            return o
        },
        addEvent: function(e, i) {
            if (!this.element) {
                return !1
            };
            var a = this,
                o = a.element,
                r = o.id !== '' ? o.id : null;
            s(e, i, r);
            if (e != 'ready') {
                n('addEventListener', e, o)
            } else if (e == 'ready' && t) {
                i.call(null, r)
            };
            return a
        },
        removeEvent: function(e) {
            if (!this.element) {
                return !1
            };
            var t = this,
                i = t.element,
                o = i.id !== '' ? i.id : null,
                a = u(e, o);
            if (e != 'ready' && a) {
                n('removeEventListener', e, i)
            }
        }
    };

    function n(e, i, t) {
        if (!t.contentWindow.postMessage) {
            return !1
        };
        var n = JSON.stringify({
            method: e,
            value: i
        });
        t.contentWindow.postMessage(n, o)
    };

    function a(e) {
        var i, r;
        try {
            i = JSON.parse(e.data);
            r = i.event || i.method
        } catch (p) {};
        if (r == 'ready' && !t) {
            t = !0
        };
        if (!(/^https?:\/\/player.vimeo.com/).test(e.origin)) {
            return !1
        };
        if (o === '*') {
            o = e.origin
        };
        var u = i.value,
            d = i.data,
            a = a === '' ? null : i.player_id,
            s = l(r, a),
            n = [];
        if (!s) {
            return !1
        };
        if (u !== undefined) {
            n.push(u)
        };
        if (d) {
            n.push(d)
        };
        if (a) {
            n.push(a)
        };
        return n.length > 0 ? s.apply(null, n) : s.call()
    };

    function s(i, t, o) {
        if (o) {
            if (!e[o]) {
                e[o] = {}
            };
            e[o][i] = t
        } else {
            e[i] = t
        }
    };

    function l(i, t) {
        if (t && e[t] && e[t][i]) {
            return e[t][i]
        } else {
            return e[i]
        }
    };

    function u(i, t) {
        if (t && e[t]) {
            if (!e[t][i]) {
                return !1
            };
            e[t][i] = null
        } else {
            if (!e[i]) {
                return !1
            };
            e[i] = null
        };
        return !0
    };

    function r(e) {
        return !!(e && e.constructor && e.call && e.apply)
    };

    function h(e) {
        return toString.call(e) === '[object Array]'
    };
    i.fn.init.prototype = i.fn;
    if (window.addEventListener) {
        window.addEventListener('message', a, !1)
    } else {
        window.attachEvent('onmessage', a)
    };
    return (window.Froogaloop = window.$f = i)
})();
(function(i) {
    'use strict';
    i.AviaFullscreenSlider = function(t, e) {
        this.$slider = i(e);
        this.$inner = this.$slider.find('.avia-slideshow-inner');
        this.$innerLi = this.$inner.find('>li');
        this.$caption = this.$inner.find('.avia-slide-wrap .caption_container');
        this.$win = i(window);
        this.isMobile = i.avia_utilities.isMobile;
        this.isTouchDevice = i.avia_utilities.isTouchDevice;
        this.mobile_no_animation = i('body').hasClass('avia-mobile-no-animations');
        this.options = {};
        this.property = {};
        this.scrollPos = '0';
        this.transform3d = document.documentElement.className.indexOf('avia_transform3d') !== -1 ? !0 : !1;
        this.ticking = !1;
        if (i.avia_utilities.supported.transition === undefined) {
            i.avia_utilities.supported.transition = i.avia_utilities.supports('transition')
        };
        this._init(t)
    };
    i.AviaFullscreenSlider.defaults = {
        height: 100,
        subtract: '#wpadminbar, #header, #main>.title_container',
        image_attachment: 'scroll',
        parallax_enabled: !0
    };
    i.AviaFullscreenSlider.prototype = {
        _init: function(t) {
            var e = this,
                s = this.$slider.data('slideshow-options');
            this.options = i.extend(!0, {}, i.AviaFullscreenSlider.defaults, t);
            if ('object' == typeof s) {
                this.options.height = 'undefined' != typeof s.slide_height ? s.slide_height : this.options.height;
                this.options.image_attachment = 'undefined' != typeof s.image_attachment ? s.image_attachment : this.options.image_attachment
            } else {
                if (this.$slider.data('slide_height')) {
                    this.options.height = this.$slider.data('slide_height')
                };
                if (this.$slider.data('image_attachment')) {
                    this.options.image_attachment = this.$slider.data('image_attachment')
                }
            };
            this.options.parallax_enabled = this.options.image_attachment == '' ? !0 : !1;
            this.$subtract = i(this.options.subtract);
            this._setSize();
            this.$win.on('debouncedresize', this._setSize.bind(this));
            setTimeout(function() {
                if (e.options.parallax_enabled) {
                    if (!e.isMobile || (e.isMobile && !this.mobile_no_animation)) {
                        e.$win.on('scroll', e._on_scroll.bind(e))
                    }
                }
            }, 100);
            this.$slider.aviaSlider({
                bg_slider: !0
            })
        },
        _on_scroll: function(i) {
            var t = this;
            if (!t.ticking) {
                t.ticking = !0;
                window.requestAnimationFrame(t._parallaxRequest.bind(t))
            }
        },
        _fetch_properties: function(i) {
            this.property.offset = this.$slider.offset().top;
            this.property.wh = this.$win.height();
            this.property.height = i || this.$slider.outerHeight();
            this._parallax_scroll()
        },
        _setSize: function() {
            if (!i.fn.avia_browser_height) {
                var e = this.$win.height(),
                    t = Math.ceil((e / 100) * this.options.height);
                if (this.$subtract.length && this.options.height == 100) {
                    this.$subtract.each(function() {
                        t -= this.offsetHeight - 0.5
                    })
                } else {
                    t -= 1
                };
                this.$slider.height(t).removeClass('av-default-height-applied');
                this.$inner.css('padding', 0)
            };
            this._fetch_properties(t)
        },
        _parallaxRequest: function(i) {
            var t = this;
            setTimeout(t._parallax_scroll.bind(t), 0)
        },
        _parallax_scroll: function(t) {
            if (!this.options.parallax_enabled) {
                return
            };
            if (this.isMobile && this.mobile_no_animation) {
                return
            };
            var s = this.$win.scrollTop(),
                n = s + this.property.wh,
                e = '0',
                a = {};
            if (this.property.offset < s && s <= this.property.offset + this.property.height) {
                e = Math.round((s - this.property.offset) * 0.3)
            };
            if (this.scrollPos != e) {
                this.scrollPos = e;
                if (this.transform3d) {
                    a[i.avia_utilities.supported.transition + 'transform'] = 'translate3d(0px,' + e + 'px,0px)'
                } else {
                    a[i.avia_utilities.supported.transition + 'transform'] = 'translate(0px,' + e + 'px)'
                };
                this.$inner.css(a)
            };
            this.ticking = !1
        }
    };
    i.fn.aviaFullscreenSlider = function(t) {
        return this.each(function() {
            var e = i.data(this, 'aviaFullscreenSlider');
            if (!e) {
                i.data(this, 'aviaFullscreenSlider', 1);
                new i.AviaFullscreenSlider(t, this)
            }
        })
    }
})(jQuery);
(function(t) {
    'use strict';
    t.fn.avia_sc_tabs = function(i) {
        var n = {
            heading: '.tab',
            content: '.tab_content',
            active: 'active_tab',
            sidebar: !1
        };
        var e = t(window),
            i = t.extend(n, i);
        return this.each(function() {
            var n = t(this),
                c = t('<div class="tab_titles"></div>').prependTo(n),
                a = t(i.heading, n),
                r = t(i.content, n),
                o = !1,
                d = !1;
            o = a.clone();
            d = a.addClass('fullsize-tab').attr('aria-hidden', !0);
            a = o;
            a.prependTo(c).each(function(i) {
                var n = t(this),
                    e = !1;
                if (o) {
                    e = d.eq(i)
                };
                n.addClass('tab_counter_' + i).on('click', function() {
                    f(n, i, e);
                    return !1
                });
                n.on('keydown', function(t) {
                    if (t.keyCode === 13) {
                        n.trigger('click')
                    }
                });
                if (o) {
                    e.on('click', function() {
                        f(e, i, n);
                        return !1
                    });
                    e.on('keydown', function(t) {
                        if (t.keyCode === 13) {
                            e.trigger('click')
                        }
                    })
                }
            });
            s();
            l(!1);
            e.on('debouncedresize', s);
            t('a').on('click', function() {
                var i = t(this).attr('href');
                if (typeof i != 'undefined' && i) {
                    i = i.replace(/^.*?#/, '');
                    l('#' + i)
                }
            });

            function s() {
                if (!i.sidebar) {
                    return
                };
                r.css({
                    'min-height': c.outerHeight() + 1
                })
            };

            function f(a, f, o) {
                if (!a.is('.' + i.active)) {
                    t('.' + i.active, n).removeClass(i.active);
                    t('.' + i.active + '_content', n).attr('aria-hidden', !0).removeClass(i.active + '_content');
                    a.addClass(i.active);
                    var s = a.data('fake-id');
                    if (typeof s == 'string') {
                        window.location.replace(s)
                    };
                    if (o) {
                        o.addClass(i.active)
                    };
                    var d = r.eq(f).addClass(i.active + '_content').attr('aria-hidden', !1);
                    if (typeof click_container != 'undefined' && click_container.length) {
                        sidebar_shadow.height(d.outerHeight())
                    };
                    var c = d.offset().top,
                        l = c - 50 - parseInt(t('html').css('margin-top'), 10);
                    if (e.scrollTop() > c) {
                        t('html:not(:animated),body:not(:animated)').scrollTop(l)
                    }
                };
                e.trigger('av-content-el-height-changed', a)
            };

            function l(t) {
                if (!t && window.location.hash) {
                    t = window.location.hash
                };
                if (!t) {
                    return
                };
                var i = a.filter('[data-fake-id="' + t + '"]');
                if (i.length) {
                    if (!i.is('.active_tab')) {
                        i.trigger('click')
                    };
                    window.scrollTo(0, n.offset().top - 70)
                }
            }
        })
    }
}(jQuery));
(function(i) {
    'use strict';
    i('body').on('click', '.av-lazyload-video-embed .av-click-to-play-overlay', function(l) {
        var n = i(this),
            d = i('html').hasClass('av-cookies-needs-opt-in') || i('html').hasClass('av-cookies-can-opt-out'),
            o = !0,
            c = i('html').hasClass('av-cookies-user-silent-accept');
        if (d && !c) {
            if (!document.cookie.match(/aviaCookieConsent/) || i('html').hasClass('av-cookies-session-refused')) {
                o = !1
            } else {
                if (!document.cookie.match(/aviaPrivacyRefuseCookiesHideBar/)) {
                    o = !1
                } else if (!document.cookie.match(/aviaPrivacyEssentialCookiesEnabled/)) {
                    o = !1
                } else if (document.cookie.match(/aviaPrivacyVideoEmbedsDisabled/)) {
                    o = !1
                }
            }
        };
        var a = n.parents('.av-lazyload-video-embed');
        if (a.hasClass('avia-video-lightbox') && a.hasClass('avia-video-standard-html')) {
            o = !0
        };
        if (!o) {
            if (typeof l.originalEvent == 'undefined') {
                return
            };
            var t = a.data('original_url');
            if (t) window.open(t, '_blank', 'noreferrer noopener');
            return
        };
        var s = a.find('.av-video-tmpl').html(),
            e = '';
        if (a.hasClass('avia-video-lightbox')) {
            e = a.find('a.lightbox-link');
            if (e.length == 0) {
                a.append(s);
                setTimeout(function() {
                    e = a.find('a.lightbox-link');
                    if (i('html').hasClass('av-default-lightbox')) {
                        e.addClass('lightbox-added').magnificPopup(i.avia_utilities.av_popup);
                        e.trigger('click')
                    } else {
                        e.trigger('avia-open-video-in-lightbox')
                    }
                }, 100)
            } else {
                e.trigger('click')
            }
        } else {
            a.html(s)
        }
    });
    i('.av-lazyload-immediate .av-click-to-play-overlay').trigger('click')
}(jQuery));
(function(e) {
    'use strict';
    e(function() {
        e.avia_utilities = e.avia_utilities || {};
        if ('undefined' == typeof e.avia_utilities.isMobile) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 'ontouchstart' in document.documentElement) {
                e.avia_utilities.isMobile = !0
            } else {
                e.avia_utilities.isMobile = !1
            }
        };
        i();
        e(window).trigger('resize')
    });
    e.avia_utilities = e.avia_utilities || {};

    function i() {
        var m = e('#header'),
            u = e('#main .av-logo-container'),
            h = e('#avia-menu'),
            l = e('.av-burger-menu-main a'),
            a = e('html').eq(0),
            n = e('<div class="av-burger-overlay"></div>'),
            p = e('<div class="av-burger-overlay-scroll"></div>').appendTo(n),
            g = e('<div class="av-burger-overlay-inner"></div>').appendTo(p),
            k = e('<div class="av-burger-overlay-bg"></div>').appendTo(n),
            r = !1,
            d = {},
            b = e('.av-logo-container .inner-container'),
            C = b.find('.main_menu'),
            v = a.is('.html_av-submenu-display-click.html_av-submenu-clone, .html_av-submenu-display-hover.html_av-submenu-clone'),
            y = !1,
            T = 0;
        var f = e('#avia_alternate_menu');
        if (f.length > 0) {
            h = f
        };
        var c = function() {
                if (e.avia_utilities.isMobile) {
                    p.outerHeight(window.innerHeight)
                }
            },
            o = function(i, u) {
                if (!i) return;
                var c, s, t, r, d, f, m, a, n;
                i.each(function() {
                    t = e(this);
                    r = t.find(' > .sub-menu > li');
                    if (r.length == 0) {
                        r = t.find(' > .children > li')
                    };
                    d = t.find('.avia_mega_div > .sub-menu > li.menu-item');
                    var i = t.find('>a'),
                        c = !0;
                    if (i.length) {
                        if (i.get(0).hash == '#' || 'undefined' == typeof i.attr('href') || i.attr('href') == '#') {
                            if (r.length > 0 || d.length > 0) {
                                c = !1
                            }
                        }
                    };
                    s = i.clone(c).attr('style', '');
                    if ('undefined' == typeof i.attr('href')) {
                        s.attr('href', '#')
                    };
                    a = e('<li>').append(s);
                    var l = [];
                    if ('undefined' != typeof t.attr('class')) {
                        l = t.attr('class').split(/\s+/);
                        e.each(l, function(e, i) {
                            if ((i.indexOf('menu-item') != 0) && (i.indexOf('page-item') < 0) && (i.indexOf('page_item') != 0) && (i.indexOf('dropdown_ul') < 0)) {
                                a.addClass(i)
                            };
                            return !0
                        })
                    };
                    if ('undefined' != typeof t.attr('id') && '' != t.attr('id')) {
                        a.addClass(t.attr('id'))
                    } else {
                        e.each(l, function(e, i) {
                            if (i.indexOf('page-item-') >= 0) {
                                a.addClass(i);
                                return !1
                            }
                        })
                    };
                    u.append(a);
                    if (r.length) {
                        n = e('<ul class="sub-menu">').appendTo(a);
                        if (v && (s.get(0).hash != '#' && s.attr('href') != '#')) {
                            a.clone(!0).prependTo(n)
                        };
                        a.addClass('av-width-submenu').find('>a').append('<span class="av-submenu-indicator">');
                        o(r, n)
                    } else if (d.length) {
                        n = e('<ul class="sub-menu">').appendTo(a);
                        if (v && (s.get(0).hash != '#' && s.attr('href') != '#')) {
                            a.clone(!0).prependTo(n)
                        };
                        d.each(function(i) {
                            var d = e(this),
                                t = d.find('> .sub-menu'),
                                s = d.find('> .mega_menu_title'),
                                c = s.find('a').attr('href') || '#',
                                r = t.length > 0 ? t.find('>li') : null,
                                f = !1,
                                l = a.find('>a'),
                                m = '';
                            if ((r === null) || (r.length == 0)) {
                                if (c == '#') {
                                    m = ' style="display: none;"'
                                }
                            };
                            if (i == 0) a.addClass('av-width-submenu').find('>a').append('<span class="av-submenu-indicator">');
                            if (s.length && s.text() != '') {
                                f = !0;
                                if (i > 0) {
                                    var u = a.parents('li').eq(0);
                                    if (u.length) a = u;
                                    n = e('<ul class="sub-menu">').appendTo(a)
                                };
                                a = e('<li' + m + '>').appendTo(n);
                                n = e('<ul class="sub-menu">').appendTo(a);
                                e('<a href="' + c + '"><span class="avia-bullet"></span><span class="avia-menu-text">' + s.text() + '</span></a>').insertBefore(n);
                                l = a.find('>a');
                                if (v && (t.length > 0) && (l.length && l.get(0).hash != '#' && l.attr('href') != '#')) {
                                    a.clone(!0).addClass('av-cloned-title').prependTo(n)
                                }
                            };
                            if (f && (t.length > 0)) a.addClass('av-width-submenu').find('>a').append('<span class="av-submenu-indicator">');
                            o(r, n)
                        })
                    }
                });
                l.trigger('avia_burger_list_created');
                return c
            },
            s, i;
        e('body').on('mousewheel DOMMouseScroll touchmove', '.av-burger-overlay-scroll', function(e) {
            var n = this.offsetHeight,
                i = this.scrollHeight,
                a = e.originalEvent.wheelDelta;
            if (i != this.clientHeight) {
                if ((this.scrollTop >= (i - n) && a < 0) || (this.scrollTop <= 0 && a > 0)) {
                    e.preventDefault()
                }
            } else {
                e.preventDefault()
            }
        });
        e(document).on('mousewheel DOMMouseScroll touchmove', '.av-burger-overlay-bg, .av-burger-overlay-active .av-burger-menu-main', function(e) {
            e.preventDefault()
        });
        var t = {};
        e(document).on('touchstart', '.av-burger-overlay-scroll', function(e) {
            t.Y = e.originalEvent.touches[0].clientY
        });
        e(document).on('touchend', '.av-burger-overlay-scroll', function(e) {
            t = {}
        });
        e(document).on('touchmove', '.av-burger-overlay-scroll', function(i) {
            if (!t.Y) {
                t.Y = i.originalEvent.touches[0].clientY
            };
            var l = i.originalEvent.touches[0].clientY - t.Y,
                a = this,
                n = a.scrollTop,
                r = a.scrollHeight,
                o = n + a.offsetHeight,
                s = l > 0 ? 'up' : 'down';
            e('body').get(0).scrollTop = t.body;
            if (n <= 0) {
                if (s == 'up') {
                    i.preventDefault()
                }
            } else if (o >= r) {
                if (s == 'down') {
                    i.preventDefault()
                }
            }
        });
        e(window).on('debouncedresize', function(n) {
            var s = !0;
            if (e.avia_utilities.isMobile && a.hasClass('av-mobile-menu-switch-portrait') && a.hasClass('html_text_menu_active')) {
                var t = e(window).height(),
                    o = e(window).width();
                if (o <= t) {
                    a.removeClass('html_burger_menu')
                } else {
                    var r = a.hasClass('html_mobile_menu_phone') ? 768 : 990;
                    if (t < r) {
                        a.addClass('html_burger_menu');
                        s = !1
                    } else {
                        a.removeClass('html_burger_menu')
                    }
                }
            };
            if (s && i && i.length) {
                if (!l.is(':visible')) {
                    i.filter('.is-active').parents('a').eq(0).trigger('click')
                }
            };
            c()
        });
        e('.html_av-overlay-side').on('click', '.av-burger-overlay-bg', function(e) {
            e.preventDefault();
            i.parents('a').eq(0).trigger('click')
        });
        e(window).on('avia_smooth_scroll_start', function() {
            if (i && i.length) {
                i.filter('.is-active').parents('a').eq(0).trigger('click')
            }
        });
        e('.html_av-submenu-display-hover').on('mouseenter', '.av-width-submenu', function(i) {
            e(this).children('ul.sub-menu').slideDown('fast')
        });
        e('.html_av-submenu-display-hover').on('mouseleave', '.av-width-submenu', function(i) {
            e(this).children('ul.sub-menu').slideUp('fast')
        });
        e('.html_av-submenu-display-hover').on('click', '.av-width-submenu > a', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation()
        });
        e('.html_av-submenu-display-hover').on('touchstart', '.av-width-submenu > a', function(i) {
            var a = e(this);
            w(a, i)
        });
        e('.html_av-submenu-display-click').on('click', '.av-width-submenu > a', function(i) {
            var a = e(this);
            w(a, i)
        });
        e('.html_av-submenu-display-click').on('click', '.av-burger-overlay a', function(a) {
            var n = window.location.href.match(/(^[^#]*)/)[0],
                t = e(this).attr('href').match(/(^[^#]*)/)[0];
            if (t == n) {
                a.preventDefault();
                a.stopImmediatePropagation();
                i.parents('a').eq(0).trigger('click');
                return !1
            };
            return !0
        });

        function w(e, i) {
            i.preventDefault();
            i.stopImmediatePropagation();
            var a = e.parents('li').eq(0);
            a.toggleClass('av-show-submenu');
            if (a.is('.av-show-submenu')) {
                a.children('ul.sub-menu').slideDown('fast')
            } else {
                a.children('ul.sub-menu').slideUp('fast')
            }
        };
        (function() {
            if (C.length) {
                return
            };
            var i = e('#header .main_menu').clone(!0),
                t = i.find('ul.av-main-nav'),
                n = t.attr('id');
            if ('string' == typeof n && '' != n.trim()) {
                t.attr('id', n + '-' + T++)
            };
            i.find('.menu-item:not(.menu-item-avia-special)').remove();
            i.insertAfter(b.find('.logo').first());
            var a = e('#header .social_bookmarks').clone(!0);
            if (!a.length) {
                a = e('.av-logo-container .social_bookmarks').clone(!0)
            };
            if (a.length) {
                i.find('.avia-menu').addClass('av_menu_icon_beside');
                i.append(a)
            };
            l = e('.av-burger-menu-main a')
        }());
        l.on('click', function(t) {
            if (r) {
                return
            };
            i = e(this).find('.av-hamburger'), r = !0;
            if (!y) {
                y = !0;
                i.addClass('av-inserted-main-menu');
                s = e('<ul>').attr({
                    id: 'av-burger-menu-ul',
                    class: ''
                });
                var v = h.find('> li:not(.menu-item-avia-special)'),
                    f = o(v, s);
                s.find('.noMobile').remove();
                s.appendTo(g);
                d = g.find('#av-burger-menu-ul > li');
                if (e.fn.avia_smoothscroll) {
                    e('a[href*="#"]', n).avia_smoothscroll(n)
                }
            };
            if (i.is('.is-active')) {
                i.removeClass('is-active');
                a.removeClass('av-burger-overlay-active-delayed');
                n.animate({
                    opacity: 0
                }, function() {
                    n.css({
                        display: 'none'
                    });
                    a.removeClass('av-burger-overlay-active');
                    r = !1
                })
            } else {
                c();
                var l = u.length ? u.outerHeight() + u.position().top : m.outerHeight() + m.position().top;
                n.appendTo(e(t.target).parents('.avia-menu'));
                s.css({
                    padding: (l) + 'px 0px'
                });
                d.removeClass('av-active-burger-items');
                i.addClass('is-active');
                a.addClass('av-burger-overlay-active');
                n.css({
                    display: 'block'
                }).animate({
                    opacity: 1
                }, function() {
                    r = !1
                });
                setTimeout(function() {
                    a.addClass('av-burger-overlay-active-delayed')
                }, 100);
                d.each(function(i) {
                    var a = e(this);
                    setTimeout(function() {
                        a.addClass('av-active-burger-items')
                    }, (i + 1) * 125)
                })
            };
            t.preventDefault()
        })
    }
})(jQuery);
'use strict';
var avia = window.avia || {};
avia.parallax = function() {
    if (avia.parallax.instance) {
        return avia.parallax.instance
    };
    avia.parallax.instance = this;
    this.MediaQueryOptions = {
        'av-mini-': '(max-width: 479px)',
        'av-small-': '(min-width: 480px) and (max-width: 767px)',
        'av-medium-': '(min-width: 768px) and (max-width: 989px)'
    };
    this.elements = [];
    this.bindEvents();
    return this
};
avia.parallax.instance = !1;
avia.parallax.prototype = {
    element: function(t, e) {
        this.dom = t;
        this.config = t.dataset;
        this.scrollspeed = parseFloat(this.config.parallax_speed || this.config.aviaParallaxRatio || 0);
        this.translate = {
            x: 0,
            y: 0,
            z: 0
        };
        this.prev = {
            top: 0,
            left: 0
        };
        this.rect = {};
        this.css = (styles) => Object.assign(this.dom.style, styles);
        this.inViewport = () => {
            this.rect = this.dom.getBoundingClientRect();
            this.translate = this.getTranslateValues();
            return (this.rect.bottom - this.translate.y >= 0 && this.rect.right >= 0 && this.rect.top <= (window.innerHeight || document.documentElement.clientHeight) && this.rect.left <= (window.innerWidth || document.documentElement.clientWidth))
        };
        this.update = (force = !1) => {
            if (!this.scrollspeed) return;
            e.do(function(t) {
                if (!t.inViewport() && !force) return;
                var i = {};
                var a = 0,
                    n = window.scrollY + t.rect.top - t.translate.y,
                    e = (window.scrollY * -1) * t.scrollspeed;
                if (n > window.innerHeight) {
                    e = parseFloat((t.rect.top - window.innerHeight - t.translate.y) * t.scrollspeed)
                };
                console.log(window.innerHeight + t.rect.height);
                if (Math.abs(e) > window.innerHeight + t.rect.height) return;
                if (e != t.translate.y) {
                    i.transform = 'translate3d( ' + a + 'px,' + e + 'px, 0px )';
                    t.css(i)
                }
            }, this)
        };
        this.getTranslateValues = () => {
            const matrix = window.getComputedStyle(this.dom).transform;
            if (matrix === 'none' || typeof matrix === 'undefined') return {
                x: 0,
                y: 0,
                z: 0
            };
            const matrixType = matrix.includes('3d') ? '3d' : '2d';
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            if (matrixType === '2d') {
                return {
                    x: matrixValues[4],
                    y: matrixValues[5],
                    z: 0
                }
            };
            if (matrixType === '3d') {
                return {
                    x: matrixValues[12],
                    y: matrixValues[13],
                    z: matrixValues[14]
                }
            }
        };
        this.update();
        e.showElement(() => this.dom.classList.add('active-parallax'));
        return this
    },
    bindEvents: function() {
        this.addListener(window, ['scroll'], this.updateElements);
        this.addListener(window, ['resize', 'orientationchange', 'load', 'av-height-change'], this.updateElements);
        this.addListener(document.body, ['av_resize_finished'], this.updateElements, !0)
    },
    addListener: function(t, e, i, args = !1) {
        for (var a = 0, n; n = e[a]; a++) {
            t.addEventListener(n, i.bind(this, args), {
                passive: !0
            })
        }
    },
    showElement: function(t) {
        if (document.readyState === 'complete') {
            t()
        } else {
            window.addEventListener('load', t)
        }
    },
    addElements: function(t) {
        for (var e = 0, i; i = document.querySelectorAll(t)[e]; e++) {
            this.elements.push(new this.element(i, this))
        }
    },
    updateElements: function(t, e) {
        for (var i = 0, a; a = this.elements[i]; i++) {
            a.update(t)
        }
    },
    do: function(t, e, delay = 0) {
        requestAnimationFrame(() => {
            setTimeout(() => t.call(this, e), delay)
        })
    },
};
(function(t) {
    if (!window.location.search.includes('new-parallax')) {
        return
    };
    var e = new avia.parallax();
    e.addElements('.av-parallax-object')
})(jQuery);
(function(t) {
    'use strict';
    t.avia_utilities = t.avia_utilities || {};
    t(function() {
        if (t.fn.avia_parallax) {
            t('.av-parallax,.av-parallax-object').avia_parallax()
        }
    });
    var i = function(i, e) {
        if (!(this.transform || this.transform3d)) {
            return
        };
        this.options = t.extend({}, i);
        this.win = t(window);
        this.body = t('body');
        this.isMobile = t.avia_utilities.isMobile, this.winHeight = this.win.height();
        this.winWidth = this.win.width();
        this.el = t(e).addClass('active-parallax');
        this.objectType = this.el.hasClass('av-parallax-object') ? 'object' : 'background-image';
        this.elInner = this.el;
        this.elBackgroundParent = this.el.parent();
        this.elParallax = this.el.data('parallax') || {};
        this.direction = '';
        this.speed = 0.5;
        this.elProperty = {};
        this.ticking = !1, this.isTransformed = !1;
        if (t.avia_utilities.supported.transition === undefined) {
            t.avia_utilities.supported.transition = t.avia_utilities.supports('transition')
        };
        this._init(i)
    };
    i.prototype = {
        mediaQueries: {
            'av-mini-': '(max-width: 479px)',
            'av-small-': '(min-width: 480px) and (max-width: 767px)',
            'av-medium-': '(min-width: 768px) and (max-width: 989px)'
        },
        transform: document.documentElement.className.indexOf('avia_transform') !== -1,
        transform3d: document.documentElement.className.indexOf('avia_transform3d') !== -1,
        mobileNoAnimation: t('body').hasClass('avia-mobile-no-animations'),
        defaultSpeed: 0.5,
        defaultDirections: ['bottom_top', 'left_right', 'right_left', 'no_parallax'],
        transformCSSProps: ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'],
        matrixDef: [1, 0, 0, 1, 0, 0],
        matrix3dDef: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        _init: function() {
            var t = this;
            if (typeof this.el.data('parallax-selector') != 'undefined' && this.el.data('parallax-selector') !== '') {
                this.elInner = this.el.find(this.el.data('parallax-selector'));
                if (this.elInner.length == 0) {
                    this.elInner = this.el
                }
            };
            if ('background-image' == this.objectType) {
                if (this.isMobile && this.mobileNoAnimation) {
                    return
                };
                this.elParallax.parallax = 'bottom_top';
                this.elParallax.parallax_speed = parseFloat(this.el.data('avia-parallax-ratio')) || 0.5
            };
            setTimeout(function() {
                t._fetchProperties()
            }, 30);
            this.win.on('debouncedresize av-height-change', t._fetchProperties.bind(t));
            this.body.on('av_resize_finished', t._fetchProperties.bind(t));
            setTimeout(function() {
                t.win.on('scroll', t._onScroll.bind(t))
            }, 100)
        },
        _setParallaxProps: function() {
            if ('background-image' == this.objectType) {
                this.direction = this.elParallax.parallax;
                this.speed = this.elParallax.parallax_speed;
                return
            };
            var e = this.elParallax.parallax || '',
                s = this.elParallax.parallax_speed || '',
                i = '',
                a = '',
                r = 'all';
            if (this.defaultDirections.indexOf(e) < 0) {
                e = 'no_parallax'
            };
            if (typeof window.matchMedia == 'function') {
                t.each(this.mediaQueries, function(t, i) {
                    var e = window.matchMedia(i);
                    if (e.matches) {
                        r = t;
                        return !1
                    }
                })
            };
            if ('all' == r) {
                this.direction = e;
                this.speed = '' == s ? this.defaultSpeed : parseFloat(s) / 100.0;
                return
            };
            i = this.elParallax[r + 'parallax'] || '';
            a = this.elParallax[r + 'parallax_speed'] || '';
            if ('inherit' == i) {
                i = e;
                a = s
            };
            if (this.defaultDirections.indexOf(i) < 0) {
                i = 'no_parallax'
            };
            this.direction = i;
            this.speed = '' == a ? this.defaultSpeed : parseFloat(a) / 100.0
        },
        _getTranslateObject: function(e) {
            var i = {
                type: '',
                matrix: [],
                x: 0,
                y: 0,
                z: 0
            };
            t.each(this.transformCSSProps, function(t, s) {
                var r = e.css(s);
                if ('string' != typeof r || 'none' == r) {
                    return
                };
                if (r.indexOf('matrix') >= 0) {
                    var a = r.match(/matrix.*\((.+)\)/)[1].split(', ');
                    if (r.indexOf('matrix3d') >= 0) {
                        i.type = '3d';
                        i.matrix = a;
                        i.x = a[12];
                        i.y = a[13];
                        i.z = a[14]
                    } else {
                        i.type = '2d';
                        i.matrix = a;
                        i.x = a[4];
                        i.y = a[5]
                    };
                    return !1
                } else {
                    i.type = '';
                    var n = r.match(/translateX\((-?\d+\.?\d*px)\)/);
                    if (n) {
                        i.x = parseInt(n[1], 10)
                    };
                    var l = r.match(/translateY\((-?\d+\.?\d*px)\)/);
                    if (l) {
                        i.y = parseInt(l[1], 10)
                    }
                }
            });
            return i
        },
        _getTranslateMatrix: function(i, r) {
            var s = '';
            t.each(r, function(t, e) {
                i[t] = e
            });
            if (this.transform3d) {
                var e = this.matrix3dDef.slice(0);
                switch (i.type) {
                    case '2d':
                        e[0] = i.matrix[0];
                        e[1] = i.matrix[1];
                        e[4] = i.matrix[2];
                        e[5] = i.matrix[3];
                        e[12] = i.x;
                        e[13] = i.y;
                        break;
                    case '3d':
                        e = i.matrix.slice(0);
                        e[12] = i.x;
                        e[13] = i.y;
                        e[14] = i.z;
                        break;
                    default:
                        e[12] = i.x;
                        e[13] = i.y;
                        break
                };
                s = 'matrix3d(' + e.join(', ') + ')'
            } else if (this.transform) {
                var a = this.matrixDef.slice(0);
                switch (i.type) {
                    case '2d':
                        a = i.matrix.slice(0);
                        a[4] = i.x;
                        a[5] = i.y;
                        break;
                    case '3d':
                        a[0] = i.matrix[0];
                        a[1] = i.matrix[1];
                        a[2] = i.matrix[4];
                        a[3] = i.matrix[5];
                        a[4] = i.x;
                        a[5] = i.y;
                        break;
                    default:
                        a[4] = i.x;
                        a[5] = i.y;
                        break
                };
                s = 'matrix(' + a.join(', ') + ')'
            };
            return s
        },
        _fetchProperties: function() {
            this._setParallaxProps();
            this.el.css(t.avia_utilities.supported.transition + 'transform', '');
            this.winHeight = this.win.height();
            this.winWidth = this.win.width();
            if ('background-image' == this.objectType) {
                this.elProperty.top = this.elBackgroundParent.offset().top;
                this.elProperty.height = this.elBackgroundParent.outerHeight();
                this.el.height(Math.ceil((this.winHeight * Math.abs(this.speed)) + this.elProperty.height))
            } else {
                this.elProperty.top = this.elInner.offset().top;
                this.elProperty.left = this.elInner.offset().left;
                this.elProperty.height = this.elInner.outerHeight();
                this.elProperty.width = this.elInner.outerWidth();
                this.elProperty.bottom = this.elProperty.top + this.elProperty.height;
                this.elProperty.right = this.elProperty.left + this.elProperty.width;
                this.elProperty.distanceLeft = this.elProperty.right;
                this.elProperty.distanceRight = this.winWidth - this.elProperty.left
            };
            this.elProperty.translateObj = this._getTranslateObject(this.el);
            this._parallaxScroll()
        },
        _onScroll: function(t) {
            var i = this;
            if (!i.ticking) {
                i.ticking = !0;
                window.requestAnimationFrame(i._parallaxRequest.bind(i))
            }
        },
        _inViewport: function(t, i, e, a, r, s, l, n) {
            return !(t > s + 10 || e < r - 10 || a > n + 10 || i < l - 10)
        },
        _parallaxRequest: function(t) {
            var i = this;
            setTimeout(i._parallaxScroll.bind(i), 0)
        },
        _parallaxScroll: function(i) {
            if (('no_parallax' == this.direction || '' == this.direction) && !this.isTransformed) {
                this.ticking = !1;
                return
            };
            var l = this.win.scrollTop(),
                o = this.win.scrollLeft(),
                d = o + this.winWidth,
                s = l + this.winHeight,
                e = 0,
                a = '';
            if ('background-image' == this.objectType) {
                if (this.elProperty.top < s && l <= this.elProperty.top + this.elProperty.height) {
                    e = Math.ceil((s - this.elProperty.top) * this.speed);
                    a = this._getTranslateMatrix(this.elProperty.translateObj, {
                        y: e
                    });
                    this.el.css(t.avia_utilities.supported.transition + 'transform', a)
                };
                this.ticking = !1;
                return
            };
            if (('no_parallax' == this.direction || '' == this.direction)) {
                a = this._getTranslateMatrix(this.elProperty.translateObj, {
                    x: 0,
                    y: 0
                });
                this.el.css(t.avia_utilities.supported.transition + 'transform', a);
                this.ticking = !1;
                this.isTransformed = !1;
                return
            };
            var x = Math.ceil(this.elProperty.top - l),
                p = Math.ceil(s - this.elProperty.top),
                n = 0,
                h = 0,
                r = {
                    x: 0,
                    y: 0
                };
            if (this.elProperty.top < this.winHeight) {
                h = Math.ceil(this.winHeight - this.elProperty.top)
            };
            if (this.elProperty.top > s) {
                n = 0;
                p = 0
            } else {
                n = 1 - (x + h) / this.winHeight
            };
            switch (this.direction) {
                case 'bottom_top':
                    e = Math.ceil((p - h) * this.speed);
                    r.y = -e;
                    a = this._getTranslateMatrix(this.elProperty.translateObj, {
                        y: -e
                    });
                    break;
                case 'left_right':
                    e = Math.ceil(this.elProperty.distanceRight * n * this.speed);
                    r.x = e;
                    a = this._getTranslateMatrix(this.elProperty.translateObj, {
                        x: e
                    });
                    break;
                case 'right_left':
                    e = Math.ceil(this.elProperty.distanceLeft * n * this.speed);
                    r.x = -e;
                    a = this._getTranslateMatrix(this.elProperty.translateObj, {
                        x: -e
                    });
                    break;
                default:
                    break
            };
            var f = this._inViewport(this.elProperty.top, this.elProperty.right, this.elProperty.bottom, this.elProperty.left, l, s, o, d),
                c = this._inViewport(this.elProperty.top + r.y, this.elProperty.right + r.x, this.elProperty.bottom + r.y, this.elProperty.left + r.x, l, s, o, d);
            if (f || c) {
                this.el.css(t.avia_utilities.supported.transition + 'transform', a)
            };
            this.ticking = !1;
            this.isTransformed = !0
        }
    };
    t.fn.avia_parallax = function(e) {
        return this.each(function() {
            var a = t(this),
                r = a.data('aviaParallax');
            if (!r) {
                r = a.data('aviaParallax', new i(e, this))
            }
        })
    }
})(jQuery);
! function(e) {
    'function' == typeof define && define.amd ? define(['jquery'], e) : 'object' == typeof exports ? e(require('jquery')) : e(window.jQuery || window.Zepto)
}((function(t) {
    var e, w, o, m, a, B, A = 'Close',
        Z = 'BeforeClose',
        I = 'MarkupParse',
        L = 'Open',
        H = 'Change',
        F = 'mfp',
        j = '.mfp',
        x = 'mfp-ready',
        R = 'mfp-removing',
        k = 'mfp-prevent-close',
        g = function() {},
        T = !!window.jQuery,
        s = t(window),
        n = function(t, i) {
            e.ev.on(F + t + j, i)
        },
        c = function(e, i, n, r) {
            var o = document.createElement('div');
            return o.className = 'mfp-' + e, n && (o.innerHTML = n), r ? i && i.appendChild(o) : (o = t(o), i && o.appendTo(i)), o
        },
        i = function(t, i) {
            e.ev.triggerHandler(F + t, i), e.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), e.st.callbacks[t] && e.st.callbacks[t].apply(e, Array.isArray(i) ? i : [i]))
        },
        z = function(i) {
            return i === B && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace('%title%', e.st.tClose)), B = i), e.currTemplate.closeBtn
        },
        P = function() {
            t.magnificPopup.instance || ((e = new g).init(), t.magnificPopup.instance = e)
        };
    g.prototype = {
        constructor: g,
        init: function() {
            var i = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = function() {
                var e = document.createElement('p').style,
                    t = ['ms', 'O', 'Moz', 'Webkit'];
                if (void 0 !== e.transition) return !0;
                for (; t.length;)
                    if (t.pop() + 'Transition' in e) return !0;
                return !1
            }(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = t(document), e.popupsCache = {}
        },
        open: function(r) {
            var l;
            if (!1 === r.isObj) {
                e.items = r.items.toArray(), e.index = 0;
                var p, h = r.items;
                for (l = 0; l < h.length; l++)
                    if ((p = h[l]).parsed && (p = p.el[0]), p === r.el[0]) {
                        e.index = l;
                        break
                    }
            } else e.items = Array.isArray(r.items) ? r.items : [r.items], e.index = r.index || 0;
            if (!e.isOpen) {
                e.types = [], a = '', r.mainEl && r.mainEl.length ? e.ev = r.mainEl.eq(0) : e.ev = o, r.key ? (e.popupsCache[r.key] || (e.popupsCache[r.key] = {}), e.currTemplate = e.popupsCache[r.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, r), e.fixedContentPos = 'auto' === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = c('bg').on('click.mfp', (function() {
                    e.close()
                })), e.wrap = c('wrap').attr('tabindex', -1).on('click.mfp', (function(t) {
                    e._checkIfClose(t.target) && e.close()
                })), e.container = c('container', e.wrap)), e.contentContainer = c('content'), e.st.preloader && (e.preloader = c('preloader', e.container, e.st.tLoading));
                var v = t.magnificPopup.modules;
                for (l = 0; l < v.length; l++) {
                    var d = v[l];
                    d = d.charAt(0).toUpperCase() + d.slice(1), e['init' + d].call(e)
                };
                i('BeforeOpen'), e.st.showCloseBtn && (e.st.closeBtnInside ? (n(I, (function(e, t, i, n) {
                    i.close_replaceWith = z(n.type)
                })), a += ' mfp-close-btn-in') : e.wrap.append(z())), e.st.alignTop && (a += ' mfp-align-top'), e.fixedContentPos ? e.wrap.css({
                    overflow: e.st.overflowY,
                    overflowX: 'hidden',
                    overflowY: e.st.overflowY
                }) : e.wrap.css({
                    top: s.scrollTop(),
                    position: 'absolute'
                }), (!1 === e.st.fixedBgPos || 'auto' === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: o.height(),
                    position: 'absolute'
                }), e.st.enableEscapeKey && o.on('keyup.mfp', (function(t) {
                    27 === t.keyCode && e.close()
                })), s.on('resize.mfp', (function() {
                    e.updateSize()
                })), e.st.closeOnContentClick || (a += ' mfp-auto-cursor'), a && e.wrap.addClass(a);
                var g = e.wH = s.height(),
                    f = {};
                if (e.fixedContentPos && e._hasScrollBar(g)) {
                    var m = e._getScrollbarSize();
                    m && (f.marginRight = m)
                };
                e.fixedContentPos && (e.isIE7 ? t('body, html').css('overflow', 'hidden') : f.overflow = 'hidden');
                var u = e.st.mainClass;
                return e.isIE7 && (u += ' mfp-ie7'), u && e._addClassToMFP(u), e.updateItemHTML(), i('BuildControls'), t('html').css(f), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout((function() {
                    e.content ? (e._addClassToMFP(x), e._setFocus()) : e.bgOverlay.addClass(x), o.on('focusin.mfp', e._onFocusIn)
                }), 16), e.isOpen = !0, e.updateSize(g), i(L), r
            };
            e.updateItemHTML()
        },
        close: function() {
            e.isOpen && (i(Z), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(R), setTimeout((function() {
                e._close()
            }), e.st.removalDelay)) : e._close())
        },
        _close: function() {
            i(A);
            var r = 'mfp-removing mfp-ready ';
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (r += e.st.mainClass + ' '), e._removeClassFromMFP(r), e.fixedContentPos) {
                var n = {
                    marginRight: ''
                };
                e.isIE7 ? t('body, html').css('overflow', '') : n.overflow = '', t('html').css(n)
            };
            o.off('keyup.mfp focusin.mfp'), e.ev.off(j), e.wrap.attr('class', 'mfp-wrap').removeAttr('style'), e.bgOverlay.attr('class', 'mfp-bg'), e.container.attr('class', 'mfp-container'), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).trigger('focus'), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, i('AfterClose')
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var o = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * o;
                e.wrap.css('height', n), e.wH = n
            } else e.wH = t || s.height();
            e.fixedContentPos || e.wrap.css('height', e.wH), i('Resize')
        },
        updateItemHTML: function() {
            var o = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), o.parsed || (o = e.parseEl(e.index));
            var n = o.type;
            if (i('BeforeChange', [e.currItem ? e.currItem.type : '', n]), e.currItem = o, !e.currTemplate[n]) {
                var r = !!e.st[n] && e.st[n].markup;
                i('FirstMarkupParse', r), e.currTemplate[n] = !r || t(r)
            };
            m && m !== o.type && e.container.removeClass('mfp-' + m + '-holder');
            var a = e['get' + n.charAt(0).toUpperCase() + n.slice(1)](o, e.currTemplate[n]);
            e.appendContent(a, n), o.preloaded = !0, i(H, o), m = o.type, e.container.prepend(e.contentContainer), i('AfterChange')
        },
        appendContent: function(t, n) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[n] ? e.content.find('.mfp-close').length || e.content.append(z()) : e.content = t : e.content = '', i('BeforeAppend'), e.container.addClass('mfp-' + n + '-holder'), e.contentContainer.append(e.content)
        },
        parseEl: function(n) {
            var s, o = e.items[n];
            if (o.tagName ? o = {
                    el: t(o)
                } : (s = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var a = e.types, r = 0; r < a.length; r++)
                    if (o.el.hasClass('mfp-' + a[r])) {
                        s = a[r];
                        break
                    };
                o.src = o.el.attr('data-mfp-src'), o.src || (o.src = o.el.attr('href'))
            };
            return o.type = s || e.st.type || 'inline', o.index = n, o.parsed = !0, e.items[n] = o, i('ElementParse', o), e.items[n]
        },
        addGroup: function(t, i) {
            var o = function(n) {
                n.mfpEl = this, e._openClick(n, t, i)
            };
            i || (i = {});
            var n = 'click.magnificPopup';
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, o)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, o) : (i.items = t, t.off(n).on(n, o)))
        },
        _openClick: function(i, n, o) {
            if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var r = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (r)
                    if ('function' == typeof r) {
                        if (!r.call(e)) return !0
                    }
                else if (s.width() < r) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o)
            }
        },
        updateStatus: function(t, n) {
            if (e.preloader) {
                w !== t && e.container.removeClass('mfp-s-' + w), n || 'loading' !== t || (n = e.st.tLoading);
                var o = {
                    status: t,
                    text: n
                };
                i('UpdateStatus', o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find('a').on('click', (function(e) {
                    e.stopImmediatePropagation()
                })), e.container.addClass('mfp-s-' + t), w = t
            }
        },
        _checkIfClose: function(i) {
            if (!t(i).hasClass(k)) {
                var n = e.st.closeOnContentClick,
                    o = e.st.closeOnBgClick;
                if (n && o) return !0;
                if (!e.content || t(i).hasClass('mfp-close') || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n) return !0
                } else if (o && t.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? o.height() : document.body.scrollHeight) > (t || s.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).trigger('focus')
        },
        _onFocusIn: function(i) {
            if (i.target !== e.wrap[0] && !t.contains(e.wrap[0], i.target)) return e._setFocus(), !1
        },
        _parseMarkup: function(e, n, o) {
            var r;
            o.data && (n = t.extend(o.data, n)), i(I, [e, n, o]), t.each(n, (function(i, n) {
                if (void 0 === n || !1 === n) return !0;
                if ((r = i.split('_')).length > 1) {
                    var o = e.find('.mfp-' + r[0]);
                    if (o.length > 0) {
                        var a = r[1];
                        'replaceWith' === a ? o[0] !== n[0] && o.replaceWith(n) : 'img' === a ? o.is('img') ? o.attr('src', n) : o.replaceWith(t('<img>').attr('src', n).attr('class', o.attr('class'))) : o.attr(r[1], n)
                    }
                } else e.find('.mfp-' + i).html(n)
            }))
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement('div');
                t.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;', document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            };
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: g.prototype,
        modules: [],
        open: function(e, i) {
            return P(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: '',
            preloader: !0,
            focus: '',
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: 'auto',
            fixedBgPos: 'auto',
            overflowY: 'auto',
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: 'Close (Esc)',
            tLoading: 'Loading...',
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function(i) {
        P();
        var n = t(this);
        if ('string' == typeof i)
            if ('open' === i) {
                var o, r = T ? n.data('magnificPopup') : n[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = n, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), e._openClick({
                    mfpEl: o
                }, n, r)
            }
        else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else i = t.extend(!0, {}, i), T ? n.data('magnificPopup', i) : n[0].magnificPopup = i, e.addGroup(n, i);
        return n
    };
    var l, u, f, O = 'inline',
        M = function() {
            f && (u.after(f.addClass(l)).detach(), f = null)
        };
    t.magnificPopup.registerModule(O, {
        options: {
            hiddenClass: 'hide',
            markup: '',
            tNotFound: 'Content not found'
        },
        proto: {
            initInline: function() {
                e.types.push(O), n('Close.inline', (function() {
                    M()
                }))
            },
            getInline: function(i, n) {
                if (M(), i.src) {
                    var a = e.st.inline,
                        o = t(i.src);
                    if (o.length) {
                        var r = o[0].parentNode;
                        r && r.tagName && (u || (l = a.hiddenClass, u = c(l), l = 'mfp-' + l), f = o.after(u).detach().removeClass(l)), e.updateStatus('ready')
                    } else e.updateStatus('error', a.tNotFound), o = t('<div>');
                    return i.inlineElement = o, o
                };
                return e.updateStatus('ready'), e._parseMarkup(n, {}, i), n
            }
        }
    });
    var d, C = 'ajax',
        b = function() {
            d && t(document.body).removeClass(d)
        },
        E = function() {
            b(), e.req && e.req.abort()
        };
    t.magnificPopup.registerModule(C, {
        options: {
            settings: null,
            cursor: 'mfp-ajax-cur',
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(C), d = e.st.ajax.cursor, n('Close.ajax', E), n('BeforeChange.ajax', E)
            },
            getAjax: function(n) {
                d && t(document.body).addClass(d), e.updateStatus('loading');
                var o = t.extend({
                    url: n.src,
                    success: function(o, r, a) {
                        var s = {
                            data: o,
                            xhr: a
                        };
                        i('ParseAjax', s), e.appendContent(t(s.data), C), n.finished = !0, b(), e._setFocus(), setTimeout((function() {
                            e.wrap.addClass(x)
                        }), 16), e.updateStatus('ready'), i('AjaxContentAdded')
                    },
                    error: function() {
                        b(), n.finished = n.loadError = !0, e.updateStatus('error', e.st.ajax.tError.replace('%url%', n.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(o), ''
            }
        }
    });
    var r, W = function(t) {
        if (t.data && void 0 !== t.data.title) return t.data.title;
        var i = e.st.image.titleSrc;
        if (i) {
            if ('function' == typeof i) return i.call(e, t);
            if (t.el) return t.el.attr(i) || ''
        };
        return ''
    };
    t.magnificPopup.registerModule('image', {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: 'mfp-zoom-out-cur',
            titleSrc: 'title',
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = e.st.image,
                    o = '.image';
                e.types.push('image'), n('Open.image', (function() {
                    'image' === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                })), n('Close.image', (function() {
                    i.cursor && t(document.body).removeClass(i.cursor), s.off('resize.mfp')
                })), n('Resize' + o, e.resizeImage), e.isLowIE && n('AfterChange', e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css('padding-top'), 10) + parseInt(t.img.css('padding-bottom'), 10)), t.img.css('max-height', e.wH - i)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, r && clearInterval(r), t.isCheckingImgSize = !1, i('ImageHasSize', t), t.imgHidden && (e.content && e.content.removeClass('mfp-loading'), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    o = t.img[0],
                    n = function(a) {
                        r && clearInterval(r), r = setInterval((function() {
                            o.naturalWidth > 0 ? e._onImageHasSize(t) : (i > 200 && clearInterval(r), 3 === ++i ? n(10) : 40 === i ? n(50) : 100 === i && n(500))
                        }), a)
                    };
                n(1)
            },
            getImage: function(n, o) {
                var f = 0,
                    c = function() {
                        n && (n.img[0].complete ? (n.img.off('.mfploader'), n === e.currItem && (e._onImageHasSize(n), e.updateStatus('ready')), n.hasSize = !0, n.loaded = !0, i('ImageLoadComplete')) : ++f < 200 ? setTimeout(c, 100) : d())
                    },
                    d = function() {
                        n && (n.img.off('.mfploader'), n === e.currItem && (e._onImageHasSize(n), e.updateStatus('error', p.tError.replace('%url%', n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    p = e.st.image,
                    u = o.find('.mfp-img');
                if (u.length) {
                    var a = document.createElement('img');
                    if (a.className = 'mfp-img', n.el && n.el.find('img').length && (a.alt = n.el.find('img').attr('alt')), n.img = t(a).on('load.mfploader', c).on('error.mfploader', d), a.src = n.src, t('body').hasClass('responsive-images-lightbox-support')) {
                        var s = n.el.data('srcset'),
                            l = n.el.data('sizes');
                        void 0 !== s ? (a.srcset = s, void 0 !== l && (a.sizes = l)) : (void 0 !== (s = n.el.find('img').attr('srcset')) && (a.srcset = s), void 0 !== (l = n.el.find('img').attr('sizes')) && (a.sizes = l))
                    };
                    u.is('img') && (n.img = n.img.clone()), (a = n.img[0]).naturalWidth > 0 ? n.hasSize = !0 : a.width || (n.hasSize = !1)
                };
                return e._parseMarkup(o, {
                    title: W(n),
                    img_replaceWith: n.img
                }, n), e.resizeImage(), n.hasSize ? (r && clearInterval(r), n.loadError ? (o.addClass('mfp-loading'), e.updateStatus('error', p.tError.replace('%url%', n.src))) : (o.removeClass('mfp-loading'), e.updateStatus('ready')), o) : (e.updateStatus('loading'), n.loading = !0, n.hasSize || (n.imgHidden = !0, o.addClass('mfp-loading'), e.findImageSize(n)), o)
            }
        }
    });
    var y;
    t.magnificPopup.registerModule('zoom', {
        options: {
            enabled: !1,
            easing: 'ease-in-out',
            duration: 300,
            opener: function(e) {
                return e.is('img') ? e : e.find('img')
            }
        },
        proto: {
            initZoom: function() {
                var o, a = e.st.zoom,
                    d = '.zoom';
                if (a.enabled && e.supportsTransition) {
                    var r, t, l = a.duration,
                        c = function(e) {
                            var n = e.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                                o = 'all ' + a.duration / 1e3 + 's ' + a.easing,
                                t = {
                                    position: 'fixed',
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    '-webkit-backface-visibility': 'hidden'
                                },
                                i = 'transition';
                            return t['-webkit-' + i] = t['-moz-' + i] = t['-o-' + i] = t[i] = o, n.css(t), n
                        },
                        s = function() {
                            e.content.css('visibility', 'visible')
                        };
                    n('BuildControls' + d, (function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.content.css('visibility', 'hidden'), !(o = e._getItemToZoom())) return void s();
                            (t = c(o)).css(e._getOffset()), e.wrap.append(t), r = setTimeout((function() {
                                t.css(e._getOffset(!0)), r = setTimeout((function() {
                                    s(), setTimeout((function() {
                                        t.remove(), o = t = null, i('ZoomAnimationEnded')
                                    }), 16)
                                }), l)
                            }), 16)
                        }
                    })), n('BeforeClose.zoom', (function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.st.removalDelay = l, !o) {
                                if (!(o = e._getItemToZoom())) return;
                                t = c(o)
                            };
                            t.css(e._getOffset(!0)), e.wrap.append(t), e.content.css('visibility', 'hidden'), setTimeout((function() {
                                t.css(e._getOffset())
                            }), 16)
                        }
                    })), n('Close.zoom', (function() {
                        e._allowZoom() && (s(), t && t.remove(), o = null)
                    }))
                }
            },
            _allowZoom: function() {
                return 'image' === e.currItem.type
            },
            _getItemToZoom: function() {
                return !!e.currItem.hasSize && e.currItem.img
            },
            _getOffset: function(i) {
                var n, r = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                    a = parseInt(n.css('padding-top'), 10),
                    s = parseInt(n.css('padding-bottom'), 10);
                r.top -= t(window).scrollTop() - a;
                var o = {
                    width: n.width(),
                    height: (T ? n.innerHeight() : n[0].offsetHeight) - s - a
                };
                return void 0 === y && (y = void 0 !== document.createElement('p').style.MozTransform), y ? o['-moz-transform'] = o.transform = 'translate(' + r.left + 'px,' + r.top + 'px)' : (o.left = r.left, o.top = r.top), o
            }
        }
    });
    var p = 'iframe',
        h = function(t) {
            if (e.currTemplate.iframe) {
                var i = e.currTemplate.iframe.find('iframe');
                i.length && (t || (i[0].src = '//about:blank'), e.isIE8 && i.css('display', t ? 'block' : 'none'))
            }
        };
    t.magnificPopup.registerModule(p, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: 'iframe_src',
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(p), n('BeforeChange', (function(e, t, i) {
                    t !== i && (t === p ? h() : i === p && h(!0))
                })), n('Close.iframe', (function() {
                    h()
                }))
            },
            getIframe: function(i, n) {
                var o = i.src,
                    r = e.st.iframe;
                t.each(r.patterns, (function() {
                    if (o.indexOf(this.index) > -1) return this.id && (o = 'string' == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace('%id%', o), !1
                }));
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), e._parseMarkup(n, a, i), e.updateStatus('ready'), n
            }
        }
    });
    var v = function(t) {
            var i = e.items.length;
            return t > i - 1 ? t - i : t < 0 ? i + t : t
        },
        S = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    t.magnificPopup.registerModule('gallery', {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%'
        },
        proto: {
            initGallery: function() {
                var r = e.st.gallery,
                    i = '.mfp-gallery';
                if (e.direction = !0, !r || !r.enabled) return !1;
                a += ' mfp-gallery', n(L + i, (function() {
                    r.navigateByImgClick && e.wrap.on('click' + i, '.mfp-img', (function() {
                        if (e.items.length > 1) return e.next(), !1
                    })), o.on('keydown' + i, (function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    }))
                })), n('UpdateStatus' + i, (function(t, i) {
                    i.text && (i.text = S(i.text, e.currItem.index, e.items.length))
                })), n(I + i, (function(t, i, n, o) {
                    var a = e.items.length;
                    n.counter = a > 1 ? S(r.tCounter, o.index, a) : ''
                })), n('BuildControls' + i, (function() {
                    if (e.items.length > 1 && r.arrows && !e.arrowLeft) {
                        var i = r.arrowMarkup,
                            n = e.arrowLeft = t(i.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, 'left')).addClass(k),
                            o = e.arrowRight = t(i.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, 'right')).addClass(k);
                        n.on('click', (function() {
                            e.prev()
                        })), o.on('click', (function() {
                            e.next()
                        })), e.container.append(n.add(o))
                    }
                })), n(H + i, (function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout((function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }), 16)
                })), n(A + i, (function() {
                    o.off(i), e.wrap.off('click' + i), e.arrowRight = e.arrowLeft = null
                }))
            },
            next: function() {
                e.direction = !0, e.index = v(e.index + 1), e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1, e.index = v(e.index - 1), e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, i = e.st.gallery.preload,
                    n = Math.min(i[0], e.items.length),
                    o = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : n); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : o); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function(n) {
                if (n = v(n), !e.items[n].preloaded) {
                    var o = e.items[n];
                    if (o.parsed || (o = e.parseEl(n)), i('LazyLoad', o), 'image' === o.type && (o.img = t('<img class="mfp-img" />').on('load.mfploader', (function() {
                            o.hasSize = !0
                        })).on('error.mfploader', (function() {
                            o.hasSize = !0, o.loadError = !0, i('LazyLoadError', o)
                        })).attr('src', o.src), t('body').hasClass('responsive-images-lightbox-support') && o.el.length > 0)) {
                        var l = t(o.el[0]),
                            r = l.data('srcset'),
                            a = l.data('sizes');
                        if (void 0 !== r) o.img.attr('srcset', r), void 0 !== a && o.img.attr('sizes', a);
                        else {
                            var s = t(o.el[0]).find('img');
                            void 0 !== (r = s.attr('srcset')) && o.img.attr('srcset', r), void 0 !== (a = s.attr('sizes')) && o.img.attr('sizes', a)
                        }
                    };
                    o.preloaded = !0
                }
            }
        }
    });
    var N = 'retina';
    t.magnificPopup.registerModule(N, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, (function(e) {
                    return '@2x' + e
                }))
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var i = e.st.retina,
                        t = i.ratio;
                    (t = isNaN(t) ? t() : t) > 1 && (n('ImageHasSize.retina', (function(e, i) {
                        i.img.css({
                            'max-width': i.img[0].naturalWidth / t,
                            width: '100%'
                        })
                    })), n('ElementParse.retina', (function(e, n) {
                        n.src = i.replaceSrc(n, t)
                    })))
                }
            }
        }
    }), P()
}));
(function(e) {
    'use strict';
    e.avia_utilities = e.avia_utilities || {};
    e.avia_utilities.av_popup = {
        type: 'image',
        mainClass: 'avia-popup mfp-zoom-in',
        tLoading: '',
        tClose: '',
        removalDelay: 300,
        closeBtnInside: !0,
        closeOnContentClick: !1,
        midClick: !0,
        autoFocusLast: !1,
        fixedContentPos: !1,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/watch',
                    id: function(e) {
                        var a = e.match(/[\\?\\&]v=([^\\?\\&]+)/),
                            i, t;
                        if (!a || !a[1]) return null;
                        i = a[1];
                        t = e.split('/watch');
                        t = t[1];
                        return i + t
                    },
                    src: '//www.youtube.com/embed/%id%'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(e) {
                        var a = e.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/),
                            i, t;
                        if (!a || !a[5]) return null;
                        i = a[5];
                        t = e.split('?');
                        t = t[1];
                        return i + '?' + t
                    },
                    src: '//player.vimeo.com/video/%id%'
                }
            }
        },
        image: {
            titleSrc: function(t) {
                var a = t.el.attr('title');
                if (!a) {
                    a = t.el.find('img').attr('title')
                };
                if (!a) {
                    a = t.el.parent().next('.wp-caption-text').html()
                };
                if (typeof a != 'undefined') {
                    return a
                };
                if (!e('body').hasClass('avia-mfp-show-alt-text')) {
                    return ''
                };
                var i = t.el.attr('alt');
                if (typeof i != 'undefined') {
                    return i
                };
                i = t.el.find('img').attr('alt');
                if (typeof i != 'undefined') {
                    return i
                };
                return ''
            }
        },
        gallery: {
            tPrev: '',
            tNext: '',
            tCounter: '%curr% / %total%',
            enabled: !0,
            preload: [1, 1]
        },
        callbacks: {
            beforeOpen: function() {
                if (this.st.el && this.st.el.data('fixed-content')) {
                    this.fixedContentPos = !0
                }
            },
            open: function() {
                e.magnificPopup.instance.next = function() {
                    var t = this;
                    t.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function() {
                        e.magnificPopup.proto.next.call(t)
                    }, 120)
                };
                e.magnificPopup.instance.prev = function() {
                    var t = this;
                    t.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function() {
                        e.magnificPopup.proto.prev.call(t)
                    }, 120)
                };
                if (this.st.el && this.st.el.data('av-extra-class')) {
                    this.wrap.addClass(this.currItem.el.data('av-extra-class'))
                }
            },
            markupParse: function(t, a, r) {
                if (typeof a.img_replaceWith == 'undefined' || typeof a.img_replaceWith.length == 'undefined' || a.img_replaceWith.length == 0) {
                    return
                };
                var o = e(a.img_replaceWith[0]);
                if (typeof o.attr('alt') != 'undefined') {
                    return
                };
                var i = r.el.attr('alt');
                if (typeof i == 'undefined') {
                    i = r.el.find('img').attr('alt')
                };
                if (typeof i != 'undefined') {
                    o.attr('alt', i)
                };
                return
            },
            imageLoadComplete: function() {
                var e = this;
                setTimeout(function() {
                    e.wrap.addClass('mfp-image-loaded')
                }, 16)
            },
            change: function() {
                if (this.currItem.el) {
                    var e = this.currItem.el;
                    this.content.find('.av-extra-modal-content, .av-extra-modal-markup').remove();
                    if (e.data('av-extra-content')) {
                        var a = e.data('av-extra-content');
                        this.content.append('<div class=\'av-extra-modal-content\'>' + a + '</div>')
                    };
                    if (e.data('av-extra-markup')) {
                        var t = e.data('av-extra-markup');
                        this.wrap.append('<div class=\'av-extra-modal-markup\'>' + t + '</div>')
                    }
                }
            }
        }
    }, e.fn.avia_activate_lightbox = function(t) {
        var i = {
                groups: ['.avia-slideshow', '.avia-gallery', '.av-horizontal-gallery', '.av-instagram-pics', '.portfolio-preview-image', '.portfolio-preview-content', '.isotope', '.post-entry', '.sidebar', '#main', '.main_menu', '.woocommerce-product-gallery'],
                autolinkElements: 'a.lightbox, a[rel^="prettyPhoto"], a[rel^="lightbox"], a[href$=jpg], a[href$=webp], a[href$=png], a[href$=gif], a[href$=jpeg], a[href*=".jpg?"], a[href*=".png?"], a[href*=".gif?"], a[href*=".jpeg?"], a[href$=".mov"] , a[href$=".swf"] , a:regex(href, .vimeo\.com/[0-9]) , a[href*="youtube.com/watch"] , a[href*="screenr.com"], a[href*="iframe=true"]',
                videoElements: 'a[href$=".mov"] , a[href$=".swf"] , a:regex(href, .vimeo\.com/[0-9]) , a[href*="youtube.com/watch"] , a[href*="screenr.com"], a[href*="iframe=true"]',
                exclude: '.noLightbox, .noLightbox a, .fakeLightbox, .lightbox-added, a[href*="dropbox.com"]'
            },
            a = e.extend({}, i, t),
            r = !e('html').is('.av-custom-lightbox');
        if (!r) return this;
        return this.each(function() {
            var i = e(this),
                o = e(a.videoElements, this).not(a.exclude).addClass('mfp-iframe'),
                r = !i.is('body') && !i.is('.ajax_slide');
            for (var t = 0; t < a.groups.length; t++) {
                i.find(a.groups[t]).each(function() {
                    var t = e(a.autolinkElements, this);
                    if (r) t.removeClass('lightbox-added');
                    t.not(a.exclude).addClass('lightbox-added').magnificPopup(e.avia_utilities.av_popup)
                })
            }
        })
    }
})(jQuery);
(function(e) {
    'use strict';
    e(function() {
        a()
    });

    function a() {
        var a = e(window),
            d = e('#main'),
            c = e('.html_header_sidebar #header_main'),
            i = e('.html_header_sidebar #header.av_conditional_sticky');
        if (!c.length) {
            return
        };
        if (!i.length) {
            return
        };
        var n = e('#header_main'),
            r = e('#wrap_all'),
            h = parseInt(e('.av-frame-top').height(), 10) * 2 || 0,
            s = parseInt(e('html').css('margin-top'), 10),
            t = function() {
                if (n.outerHeight() + h < a.height()) {
                    i.addClass('av_always_sticky')
                } else {
                    i.removeClass('av_always_sticky')
                };
                r.css({
                    'min-height': a.height() - s
                })
            };
        t();
        a.on('debouncedresize av-height-change', t)
    }
})(jQuery);
(function(n) {
    'use strict';
    var r = null,
        a = null,
        t = null,
        i = null,
        e = null;
    n(function() {
        r = n(window);
        a = n('body');
        if (a.hasClass('av-curtain-footer')) {
            o();
            return
        };
        return
    });

    function o() {
        i = a.find('.av-curtain-footer-container');
        if (i.length == 0) {
            a.removeClass('av-curtain-footer av-curtain-activated av-curtain-numeric av-curtain-screen');
            return
        };
        t = n('<div id="av-curtain-footer-placeholder"></div>');
        i.before(t);
        if (a.hasClass('av-curtain-numeric')) {
            e = i.data('footer_max_height');
            if ('undefined' == typeof e) {
                e = 70
            } else {
                e = parseInt(e, 10);
                if (isNaN(e)) {
                    e = 70
                }
            }
        };
        u();
        r.on('debouncedresize', u)
    };

    function u() {
        var n = Math.floor(i.outerHeight()),
            o = r.innerHeight();
        if (null == e) {
            t.css({
                height: n + 'px'
            })
        } else {
            var u = Math.floor(o * (e / 100.0));
            if (n > u) {
                a.removeClass('av-curtain-activated');
                t.css({
                    height: ''
                })
            } else {
                a.addClass('av-curtain-activated');
                t.css({
                    height: n + 'px'
                })
            }
        }
    }
})(jQuery);
(function(e) {
    'use strict';
    var t = e('.has-background, .has-text-color');
    t.each(function(s) {
        var t = e(this);
        if (!(t.hasClass('has-background') || t.hasClass('has-text-color'))) {
            return
        };
        var o = t.attr('class').split(/\s+/),
            a = '',
            r = '';
        if (t.hasClass('has-background')) {
            e.each(o, function(s, e) {
                e = e.trim().toLowerCase();
                if (0 == e.indexOf('has-col-') && -1 != e.indexOf('-background-color')) {
                    a = e.replace('has-col-', '');
                    a = a.replace('-background-color', '');
                    a = a.replace(/-|[^0-9a-fA-F]/g, '');
                    if (a.length == 3 || a.length == 6) {
                        t.css({
                            'background-color': '',
                            'border-color': ''
                        });
                        r = 'undefined' != typeof t.attr('style') ? t.attr('style') + ';' : '';
                        t.attr('style', r + ' background-color: #' + a + '; border-color: #' + a + ';')
                    }
                }
            })
        };
        if (t.hasClass('has-text-color')) {
            e.each(o, function(s, e) {
                e = e.trim().toLowerCase();
                if (0 == e.indexOf('has-col-') && -1 == e.indexOf('-background-color') && -1 != e.indexOf('-color')) {
                    var a = e.replace('has-col-', '');
                    a = a.replace('-color', '');
                    a = a.replace(/-|[^0-9a-fA-F]/g, '');
                    if (a.length == 3 || a.length == 6) {
                        t.css('color', '');
                        r = 'undefined' != typeof t.attr('style') ? t.attr('style') + ';' : '';
                        t.attr('style', r + ' color: #' + a + ';')
                    }
                }
            })
        }
    });
    t = e('[class^="has-fs-"], [class$="-font-size"]');
    t.each(function(t) {
        var a = e(this),
            s = a.attr('class').split(/\s+/);
        e.each(s, function(t, e) {
            e = e.trim().toLowerCase();
            if (0 == e.indexOf('has-fs-') && -1 != e.indexOf('-font-size')) {
                e = e.replace('has-fs-', '');
                e = e.replace('-font-size', '');
                e = e.split('-');
                if (e.length != 2) {
                    return
                };
                var s = 'undefined' != typeof a.attr('style') ? a.attr('style') + ';' : '';
                a.attr('style', s + ' font-size:' + e[0] + e[1] + ';')
            }
        })
    })
})(jQuery);