/**
 * Add scrolling state(top / not-top / bottom / not-bottom)
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TOption, TTopOrBottom } from "./types";
declare class SygScrollAmount {
    private opt;
    private targets;
    private isTop;
    private isBottom;
    private lastState;
    /**
     * コンストラクタ
     * @param target string 状態を付与する対象エレメントのセレクタ文字列
     */
    constructor(target: string, options?: TOption);
    /**
     * 監視用エレメント作成して監視開始
     */
    createObserveElement(position: TTopOrBottom): HTMLDivElement;
    /**
     * スクロール検知処理を開始
     */
    private start;
    /**
     * スクロール処理
     * IntersectionObserver に反応した <div> が top/bottom どちらかで判定する
     */
    private observerCallback;
    /**
     * 属性を付与
     */
    private setAttribute;
}
export default SygScrollAmount;
