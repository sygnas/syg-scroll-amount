/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sygScrollAmount = __webpack_require__(2);

var _sygScrollAmount2 = _interopRequireDefault(_sygScrollAmount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var target1 = new _sygScrollAmount2.default('.js-scroll-amount', {
    onTop: function onTop() {
        console.log("top");
    },
    onBottom: function onBottom() {
        console.log("bottom");
    }
});

var btn = document.querySelectorAll('.js-stop')[0];
btn.addEventListener('click', function () {
    target1.stop();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (timing, func, scope) {
    var id = null;

    return function () {
        if (id !== null) return;
        func.apply(scope);

        id = setTimeout(function () {
            id = null;
        }, timing);
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Add scrolling state(top / not-top / bottom / not-bottom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license  MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _sygThrottle = __webpack_require__(1);

var _sygThrottle2 = _interopRequireDefault(_sygThrottle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        _classCallCheck(this, _class);

        var defaults = {
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

        this.opt = Object.assign(defaults, options);
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


    _createClass(_class, [{
        key: 'start',
        value: function start() {
            var _this = this;

            // すでに開始していたら無視
            if (this.is_started) return;

            // イベントオブジェクト
            this.ev_resize = (0, _sygThrottle2.default)(50, this._resize, this);
            this.ev_scroll = (0, _sygThrottle2.default)(100, this._scroll, this);

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
            var $target = this.target;
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

/**
 * NodeListをArrayとして取り出す（IE対策）
 */


exports.default = _class;
function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);