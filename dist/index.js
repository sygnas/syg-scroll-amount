'use strict';

/**
 * Add scrolling state(top / not-top / bottom / not-bottom)
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
///////////////////////////////////////
// 状態を付与するためのdata属性
var ATTR_NAME = "data-scroll-amount";
// 状態の名前
var ATTR_TOP = "top";
var ATTR_BOTTOM = "bottom";
var ATTR_NOT_TOP = "not-top";
var ATTR_NOT_BOTTOM = "not-bottom";
var ATTR_POSITION = "data-position";
// 監視用エレメントのデフォルトstyle
var COMMON_STYLE = {
    position: "absolute",
    left: "0",
};
// IntersectionObserverの設定
var OBSERVER_OPT = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
};
///////////////////////////////////////
var SygScrollAmount = /** @class */ (function () {
    // private observers: IntersectionObserver[];
    /**
     * コンストラクタ
     * @param target string 状態を付与する対象エレメントのセレクタ文字列
     */
    function SygScrollAmount(target, options) {
        if (options === void 0) { options = {}; }
        var defaults = {
            // 最上部のオフセット
            offsetTop: "70px",
            // 最下部のオフセット
            offsetBottom: "70px",
            // 最上部にスクロールした時に実行
            onTop: function () { },
            // 最上部から離れた時に実行
            onNotTop: function () { },
            // 最下部にスクロールした時に実行
            onBottom: function () { },
            // 最下部から離れた時に実行
            onNotBottom: function () { },
        };
        // 与えられた設定を適用
        this.opt = Object.assign(defaults, options);
        // 状態付与の対象
        this.targets = document.querySelectorAll(target);
        // 一番上にスクロールした
        this.isTop = false;
        // 一番下にスクロールした
        this.isBottom = false;
        // 最後の状態
        this.lastState = '';
        this.start();
    }
    /**
     * 監視用エレメント作成して監視開始
     */
    SygScrollAmount.prototype.createObserveElement = function (position) {
        var element = document.createElement("div");
        Object.assign(element.style, COMMON_STYLE);
        element.style.height = this.opt.offsetTop;
        element.setAttribute(ATTR_POSITION, position);
        if (position === "top") {
            element.style.top = "0";
        }
        else {
            element.style.bottom = "0";
        }
        // ページ最下部に追加
        document.body.appendChild(element);
        return element;
    };
    /**
     * スクロール検知処理を開始
     */
    SygScrollAmount.prototype.start = function () {
        // <body> に position 設定
        document.body.style.position = "relative";
        // IntersectionObserverを作成して監視開始
        var observer = new IntersectionObserver(this.observerCallback.bind(this), OBSERVER_OPT);
        // 監視用エレメント作成
        observer.observe(this.createObserveElement("top"));
        observer.observe(this.createObserveElement("bottom"));
    };
    /**
     * スクロール処理
     * IntersectionObserver に反応した <div> が top/bottom どちらかで判定する
     */
    SygScrollAmount.prototype.observerCallback = function (entries) {
        var _this = this;
        entries.forEach(function (entry) {
            var position = entry.target.getAttribute(ATTR_POSITION);
            if (position === "top") {
                _this.isTop = entry.isIntersecting;
            }
            else {
                _this.isBottom = entry.isIntersecting;
            }
        });
        // 属性を付与
        this.setAttribute();
    };
    /**
     * 属性を付与
     */
    SygScrollAmount.prototype.setAttribute = function () {
        var state = [
            this.isTop ? ATTR_TOP : ATTR_NOT_TOP,
            this.isBottom ? ATTR_BOTTOM : ATTR_NOT_BOTTOM,
        ].join(' ');
        // 結果を data属性に反映する
        // 前回と同じなら反映しない
        if (state !== this.lastState) {
            this.lastState = state;
            this.targets.forEach(function (target) {
                target.setAttribute(ATTR_NAME, state);
            });
            // オプション関数を実行
            if (this.isTop && this.opt.onTop) {
                this.opt.onTop();
            }
            else if (this.opt.onNotTop) {
                this.opt.onNotTop();
            }
            if (this.isBottom && this.opt.onBottom) {
                this.opt.onBottom();
            }
            else if (this.opt.onNotBottom) {
                this.opt.onNotBottom();
            }
        }
    };
    return SygScrollAmount;
}());

module.exports = SygScrollAmount;
