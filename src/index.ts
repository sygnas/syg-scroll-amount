/**
 * Add scrolling state(top / not-top / bottom / not-bottom)
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import { TOption, TTopOrBottom } from "./types";


///////////////////////////////////////


// 状態を付与するためのdata属性
const ATTR_NAME: string = "data-scroll-amount";

// 状態の名前
const ATTR_TOP: string = "top";
const ATTR_BOTTOM: string = "bottom";
const ATTR_NOT_TOP: string = "not-top";
const ATTR_NOT_BOTTOM: string = "not-bottom";
const ATTR_POSITION: string = "data-position";

// 監視用エレメントのデフォルトstyle
const COMMON_STYLE: object = {
  position: "absolute",
  left: "0",
};

// IntersectionObserverの設定
const OBSERVER_OPT: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

///////////////////////////////////////
class SygScrollAmount {
  private opt: TOption;
  private targets;
  private isTop: boolean;
  private isBottom: boolean;
  private lastState: string;
  // private observers: IntersectionObserver[];

  /**
   * コンストラクタ
   * @param target string 状態を付与する対象エレメントのセレクタ文字列
   */
  constructor(target: string, options: TOption = {}) {
    const defaults: TOption = {
      // 最上部のオフセット
      offsetTop: "70px",
      // 最下部のオフセット
      offsetBottom: "70px",
      // 最上部にスクロールした時に実行
      onTop() {},
      // 最上部から離れた時に実行
      onNotTop() {},
      // 最下部にスクロールした時に実行
      onBottom() {},
      // 最下部から離れた時に実行
      onNotBottom() {},
    };

    // 与えられた設定を適用
    this.opt = Object.assign(defaults, options);
    // 状態付与の対象
    this.targets = document.querySelectorAll<HTMLElement>(target);
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
  createObserveElement(position: TTopOrBottom): HTMLDivElement {
    const element: HTMLDivElement = document.createElement("div");

    Object.assign(element.style, COMMON_STYLE);
    element.style.height = this.opt.offsetTop as string;
    element.setAttribute(ATTR_POSITION, position);

    if (position === "top") {
      element.style.top = "0";
    } else {
      element.style.bottom = "0";
    }
    // ページ最下部に追加
    document.body.appendChild(element);
    return element;
  }

  /**
   * スクロール検知処理を開始
   */
  private start() {
    // <body> に position 設定
    document.body.style.position = "relative";

    // IntersectionObserverを作成して監視開始
    const observer: IntersectionObserver = new IntersectionObserver(
      this.observerCallback.bind(this),
      OBSERVER_OPT
    );

    // 監視用エレメント作成
    observer.observe(this.createObserveElement("top"));
    observer.observe(this.createObserveElement("bottom"));
  }

  /**
   * スクロール処理
   * IntersectionObserver に反応した <div> が top/bottom どちらかで判定する
   */
  private observerCallback( entries: IntersectionObserverEntry[]): void {

    entries.forEach((entry) => {
      const position: TTopOrBottom = entry.target.getAttribute(
        ATTR_POSITION
      ) as TTopOrBottom;

      if (position === "top") {
        this.isTop = entry.isIntersecting;
      } else {
        this.isBottom = entry.isIntersecting;
      }
    });

    // 属性を付与
    this.setAttribute();
  }

  /**
   * 属性を付与
   */
  private setAttribute(): void {
    const state: string = [
      this.isTop ? ATTR_TOP : ATTR_NOT_TOP,
      this.isBottom ? ATTR_BOTTOM : ATTR_NOT_BOTTOM,
    ].join(' ');

    // 結果を data属性に反映する
    // 前回と同じなら反映しない
    if (state !== this.lastState) {
      this.lastState= state;

      this.targets.forEach((target: HTMLElement) => {
        target.setAttribute(ATTR_NAME, state);
      });

      // オプション関数を実行
      if(this.isTop && this.opt.onTop){
        this.opt.onTop();
      }else if(this.opt.onNotTop){
        this.opt.onNotTop();
      }

      if(this.isBottom && this.opt.onBottom){
        this.opt.onBottom();
      }else if(this.opt.onNotBottom){
        this.opt.onNotBottom();
      }
    }
  }
}


export default SygScrollAmount;
