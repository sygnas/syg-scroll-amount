(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@sygnas/throttle')) :
	typeof define === 'function' && define.amd ? define(['@sygnas/throttle'], factory) :
	(global['syg-scroll-amount'] = factory(global.throttle));
}(this, (function (throttle) { 'use strict';

throttle = throttle && throttle.hasOwnProperty('default') ? throttle['default'] : throttle;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * Add scrolling state(top / not-top / bottom / not-bottom)
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

var ATTR_NAME = 'data-scroll-amount';
var ATTR_TOP = 'top';
var ATTR_BOTTOM = 'bottom';
var ATTR_NOT_TOP = 'not-top';
var ATTR_NOT_BOTTOM = 'not-bottom';

var _class = function () {

    /**
     * コンストラクタ
     * @param {string} target DOM Selector
     * @param {object} options
     */
    function _class(target) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, _class);


        var defaults$$1 = {
            // 最上部のオフセット
            offset_top: 70,
            // 最下部のオフセット
            offset_bottom: 70,
            // 最上部にスクロールした時に実行
            onTop: function onTop() {},

            // 最上部から離れた時に実行
            onNotTop: function onNotTop() {},

            // 最下部にスクロールした時に実行
            onBottom: function onBottom() {},

            // 最下部から離れた時に実行
            onNotBottom: function onNotBottom() {}
        };

        this.opt = Object.assign(defaults$$1, options);
        this.target = document.querySelectorAll(target);
        this.win_height = null; // ブラウザウィンドウの高さ
        this.interval_id = null; // スクロールイベントのインターバルチェック
        this.results = []; // data属性に書き出す内容
        this.last_results_str = null;
        this.is_started = false; // 開始した
        this.is_top = false; // 一番上にスクロールした
        this.is_bottom = false; // 一番下にスクロールした

        this.ev_resize = null;
        this.ev_scroll = null;

        // 開始
        this.start();
    }

    /** *******************
     * public
     */

    /**
    * スクロール検知処理を開始
    */


    createClass(_class, [{
        key: 'start',
        value: function start() {
            var _this = this;

            // すでに開始していたら無視
            if (this.is_started) return;

            // イベントオブジェクト
            this.ev_resize = throttle(50, this._resize, this);
            this.ev_scroll = throttle(100, this._scroll, this);

            // リサイズイベントでドキュメント高さチェック
            this._resize();
            window.addEventListener('resize', this.ev_resize);

            // スクロールイベント
            this._scroll();
            this.is_started = true;
            window.addEventListener('scroll', this.ev_scroll);

            // 0.5秒間毎にチェックも入れる
            this.interval_id = setInterval(function () {
                _this._scroll();
            }, 500);
        }

        /**
        * スクロール検知処理を停止
        */

    }, {
        key: 'stop',
        value: function stop() {
            window.removeEventListener('resize', this.ev_resize);
            window.removeEventListener('scroll', this.ev_scroll);
            clearInterval(this.interval_id);
        }

        /** *******************
         * private
         */

        /**
        * スクロール処理
        */

    }, {
        key: '_scroll',
        value: function _scroll() {
            var scroll_top = window.pageYOffset;

            // 初期化
            this.results = [];

            // 位置イベントのチェック
            this._check_top_and_bottom(scroll_top);

            // 属性を付与
            this._set_attribute();
        }

        /**
         * 属性を付与
         */

    }, {
        key: '_set_attribute',
        value: function _set_attribute() {
            var results_str = this.results.join(' ');

            // 結果を data属性に反映する
            // 前回と同じなら反映しない
            if (results_str !== this.last_results_str) {
                this.last_results_str = results_str;
                get_node_array(this.target).forEach(function (target) {
                    target.setAttribute(ATTR_NAME, results_str);
                });
            }
        }

        /**
        * 最上部か最下部かのチェック
        */

    }, {
        key: '_check_top_and_bottom',
        value: function _check_top_and_bottom(scroll_top) {
            var opt = this.opt;
            var doc_height = document.documentElement.scrollHeight;
            var scroll_bottom = doc_height - this.win_height;

            // 最上部か
            if (scroll_top <= opt.offset_top) {
                // ページ最上部
                if (!this.is_top) opt.onTop();
                this.is_top = true;
                this.results.push(ATTR_TOP);
            } else {
                // 最上部から離れた
                if (this.is_top) opt.onNotTop();
                this.is_top = false;
                this.results.push(ATTR_NOT_TOP);
            }

            // 最下部か
            if (scroll_top >= scroll_bottom - opt.offset_bottom) {
                // ページ最下部
                if (!this.is_bottom) opt.onBottom();
                this.is_bottom = true;
                this.results.push(ATTR_BOTTOM);
            } else {
                // 最下部から離れた
                if (this.is_bottom) opt.onNotBottom();
                this.is_bottom = false;
                this.results.push(ATTR_NOT_BOTTOM);
            }
        }

        /**
        * ウィンドウをリサイズしたら高さなどをチェック
        */

    }, {
        key: '_resize',
        value: function _resize() {
            this.win_height = window.window.innerHeight;
        }
    }]);
    return _class;
}();

function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}

return _class;

})));
//# sourceMappingURL=scroll-amount.js.map
