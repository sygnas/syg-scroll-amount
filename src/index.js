/**
 * Add scrolling state(top / not-top / bottom / not-bottom)
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import throttle from 'syg-throttle';

const ATTR_NAME = 'data-scroll-amount';
const ATTR_TOP = 'top';
const ATTR_BOTTOM = 'bottom';
const ATTR_NOT_TOP = 'not-top';
const ATTR_NOT_BOTTOM = 'not-bottom';

export default class {

    /**
     * コンストラクタ
     * @param {string} target DOM Selector
     * @param {object} options
     */
    constructor(target, options = {}) {

        const defaults = {
            // 最上部のオフセット
            offset_top: 70,
            // 最下部のオフセット
            offset_bottom: 70,
            // 最上部にスクロールした時に実行
            onTop() { },
            // 最上部から離れた時に実行
            onNotTop() { },
            // 最下部にスクロールした時に実行
            onBottom() { },
            // 最下部から離れた時に実行
            onNotBottom() { }
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
    start() {
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
        this.interval_id = setInterval(() => { this._scroll(); }, 500);
    }

    /**
    * スクロール検知処理を停止
    */
    stop() {
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
    _scroll() {
        const scroll_top = window.pageYOffset;

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
    _set_attribute() {
        const results_str = this.results.join(' ');

        // 結果を data属性に反映する
        // 前回と同じなら反映しない
        if (results_str !== this.last_results_str) {
            this.last_results_str = results_str;
            get_node_array(this.target).forEach((target) => {
                target.setAttribute(ATTR_NAME, results_str);
            });
        }
    }

    /**
    * 最上部か最下部かのチェック
    */
    _check_top_and_bottom(scroll_top) {
        const opt = this.opt;
        const doc_height = document.documentElement.scrollHeight;
        const scroll_bottom = doc_height - this.win_height;

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
    _resize() {
        this.win_height = window.window.innerHeight;
    }
}



/**
 * NodeListをArrayとして取り出す（IE対策）
 */
function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}
