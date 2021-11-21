var sygScrollAmount = (function () {
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
            // this.state = []; // data属性に書き出す内容
            // this.observers = [];
            this.isTop = false; // 一番上にスクロールした
            this.isBottom = false; // 一番下にスクロールした
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
                if (this.isTop) {
                    this.opt.onTop();
                }
                else {
                    this.opt.onNotTop();
                }
                if (this.isBottom) {
                    this.opt.onBottom();
                }
                else {
                    this.opt.onNotBottom();
                }
            }
        };
        return SygScrollAmount;
    }());

    return SygScrollAmount;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWFtb3VudC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQWRkIHNjcm9sbGluZyBzdGF0ZSh0b3AgLyBub3QtdG9wIC8gYm90dG9tIC8gbm90LWJvdHRvbSlcbiAqXG4gKiBAYXV0aG9yICAgSGlyb3NoaSBGdWt1ZGEgPGluZm8uc3lnbmFzQGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG5pbXBvcnQgeyBUT3B0aW9uLCBUT3B0aW9uQXJnIH0gZnJvbSBcIi4vVE9wdGlvblwiO1xuXG50eXBlIFRUb3BPckJvdHRvbSA9IFwidG9wXCIgfCBcImJvdHRvbVwiO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vLyDnirbmhYvjgpLku5jkuI7jgZnjgovjgZ/jgoHjga5kYXRh5bGe5oCnXG5jb25zdCBBVFRSX05BTUU6IHN0cmluZyA9IFwiZGF0YS1zY3JvbGwtYW1vdW50XCI7XG5cbi8vIOeKtuaFi+OBruWQjeWJjVxuY29uc3QgQVRUUl9UT1A6IHN0cmluZyA9IFwidG9wXCI7XG5jb25zdCBBVFRSX0JPVFRPTTogc3RyaW5nID0gXCJib3R0b21cIjtcbmNvbnN0IEFUVFJfTk9UX1RPUDogc3RyaW5nID0gXCJub3QtdG9wXCI7XG5jb25zdCBBVFRSX05PVF9CT1RUT006IHN0cmluZyA9IFwibm90LWJvdHRvbVwiO1xuY29uc3QgQVRUUl9QT1NJVElPTjogc3RyaW5nID0gXCJkYXRhLXBvc2l0aW9uXCI7XG5cbi8vIOebo+imlueUqOOCqOODrOODoeODs+ODiOOBruODh+ODleOCqeODq+ODiHN0eWxlXG5jb25zdCBDT01NT05fU1RZTEU6IG9iamVjdCA9IHtcbiAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgbGVmdDogXCIwXCIsXG59O1xuXG4vLyBJbnRlcnNlY3Rpb25PYnNlcnZlcuOBruioreWumlxuY29uc3QgT0JTRVJWRVJfT1BUOiBvYmplY3QgPSB7XG4gIHJvb3Q6IG51bGwsXG4gIHJvb3RNYXJnaW46IFwiMHB4XCIsXG4gIHRocmVzaG9sZDogMCxcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgU3lnU2Nyb2xsQW1vdW50IHtcbiAgcHJpdmF0ZSBvcHQ6IFRPcHRpb247XG4gIHByaXZhdGUgdGFyZ2V0cztcbiAgcHJpdmF0ZSBpc1RvcDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpc0JvdHRvbTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBsYXN0U3RhdGU6IHN0cmluZztcbiAgLy8gcHJpdmF0ZSBvYnNlcnZlcnM6IEludGVyc2VjdGlvbk9ic2VydmVyW107XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKiBAcGFyYW0gdGFyZ2V0IHN0cmluZyDnirbmhYvjgpLku5jkuI7jgZnjgovlr77osaHjgqjjg6zjg6Hjg7Pjg4jjga7jgrvjg6zjgq/jgr/mloflrZfliJdcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhcmdldDogc3RyaW5nLCBvcHRpb25zOiBUT3B0aW9uQXJnID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0czogVE9wdGlvbiA9IHtcbiAgICAgIC8vIOacgOS4iumDqOOBruOCquODleOCu+ODg+ODiFxuICAgICAgb2Zmc2V0VG9wOiBcIjcwcHhcIixcbiAgICAgIC8vIOacgOS4i+mDqOOBruOCquODleOCu+ODg+ODiFxuICAgICAgb2Zmc2V0Qm90dG9tOiBcIjcwcHhcIixcbiAgICAgIC8vIOacgOS4iumDqOOBq+OCueOCr+ODreODvOODq+OBl+OBn+aZguOBq+Wun+ihjFxuICAgICAgb25Ub3AoKSB7fSxcbiAgICAgIC8vIOacgOS4iumDqOOBi+OCiembouOCjOOBn+aZguOBq+Wun+ihjFxuICAgICAgb25Ob3RUb3AoKSB7fSxcbiAgICAgIC8vIOacgOS4i+mDqOOBq+OCueOCr+ODreODvOODq+OBl+OBn+aZguOBq+Wun+ihjFxuICAgICAgb25Cb3R0b20oKSB7fSxcbiAgICAgIC8vIOacgOS4i+mDqOOBi+OCiembouOCjOOBn+aZguOBq+Wun+ihjFxuICAgICAgb25Ob3RCb3R0b20oKSB7fSxcbiAgICB9O1xuXG4gICAgLy8g5LiO44GI44KJ44KM44Gf6Kit5a6a44KS6YGp55SoXG4gICAgdGhpcy5vcHQgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAvLyDnirbmhYvku5jkuI7jga7lr77osaFcbiAgICB0aGlzLnRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50Pih0YXJnZXQpO1xuICAgIC8vIHRoaXMuc3RhdGUgPSBbXTsgLy8gZGF0YeWxnuaAp+OBq+abuOOBjeWHuuOBmeWGheWuuVxuICAgIC8vIHRoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5pc1RvcCA9IGZhbHNlOyAvLyDkuIDnlarkuIrjgavjgrnjgq/jg63jg7zjg6vjgZfjgZ9cbiAgICB0aGlzLmlzQm90dG9tID0gZmFsc2U7IC8vIOS4gOeVquS4i+OBq+OCueOCr+ODreODvOODq+OBl+OBn1xuICAgIC8vIOacgOW+jOOBrueKtuaFi1xuICAgIHRoaXMubGFzdFN0YXRlID0gJyc7XG5cbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICAvKipcbiAgICog55uj6KaW55So44Ko44Os44Oh44Oz44OI5L2c5oiQ44GX44Gm55uj6KaW6ZaL5aeLXG4gICAqL1xuICBjcmVhdGVPYnNlcnZlRWxlbWVudChwb3NpdGlvbjogVFRvcE9yQm90dG9tKTogSFRNTERpdkVsZW1lbnQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgQ09NTU9OX1NUWUxFKTtcbiAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMub3B0Lm9mZnNldFRvcDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShBVFRSX1BPU0lUSU9OLCBwb3NpdGlvbik7XG5cbiAgICBpZiAocG9zaXRpb24gPT09IFwidG9wXCIpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgfVxuICAgIC8vIOODmuODvOOCuOacgOS4i+mDqOOBq+i/veWKoFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICog44K544Kv44Ot44O844Or5qSc55+l5Yem55CG44KS6ZaL5aeLXG4gICAqL1xuICBwcml2YXRlIHN0YXJ0KCkge1xuICAgIC8vIDxib2R5PiDjgasgcG9zaXRpb24g6Kit5a6aXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblxuICAgIC8vIEludGVyc2VjdGlvbk9ic2VydmVy44KS5L2c5oiQ44GX44Gm55uj6KaW6ZaL5aeLXG4gICAgY29uc3Qgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgdGhpcy5vYnNlcnZlckNhbGxiYWNrLmJpbmQodGhpcyksXG4gICAgICBPQlNFUlZFUl9PUFRcbiAgICApO1xuXG4gICAgLy8g55uj6KaW55So44Ko44Os44Oh44Oz44OI5L2c5oiQXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNyZWF0ZU9ic2VydmVFbGVtZW50KFwidG9wXCIpKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuY3JlYXRlT2JzZXJ2ZUVsZW1lbnQoXCJib3R0b21cIikpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCueOCr+ODreODvOODq+WHpueQhlxuICAgKiBJbnRlcnNlY3Rpb25PYnNlcnZlciDjgavlj43lv5zjgZfjgZ8gPGRpdj4g44GMIHRvcC9ib3R0b20g44Gp44Gh44KJ44GL44Gn5Yik5a6a44GZ44KLXG4gICAqL1xuICBwcml2YXRlIG9ic2VydmVyQ2FsbGJhY2soXG4gICAgZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdXG4gICkge1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcG9zaXRpb246IFRUb3BPckJvdHRvbSA9IGVudHJ5LnRhcmdldC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgIEFUVFJfUE9TSVRJT05cbiAgICAgICkgYXMgVFRvcE9yQm90dG9tO1xuXG4gICAgICBpZiAocG9zaXRpb24gPT09IFwidG9wXCIpIHtcbiAgICAgICAgdGhpcy5pc1RvcCA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0JvdHRvbSA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g5bGe5oCn44KS5LuY5LiOXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlsZ7mgKfjgpLku5jkuI5cbiAgICovXG4gIHByaXZhdGUgc2V0QXR0cmlidXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXRlOiBzdHJpbmcgPSBbXG4gICAgICB0aGlzLmlzVG9wID8gQVRUUl9UT1AgOiBBVFRSX05PVF9UT1AsXG4gICAgICB0aGlzLmlzQm90dG9tID8gQVRUUl9CT1RUT00gOiBBVFRSX05PVF9CT1RUT00sXG4gICAgXS5qb2luKCcgJyk7XG5cbiAgICAvLyDntZDmnpzjgpIgZGF0YeWxnuaAp+OBq+WPjeaYoOOBmeOCi1xuICAgIC8vIOWJjeWbnuOBqOWQjOOBmOOBquOCieWPjeaYoOOBl+OBquOBhFxuICAgIGlmIChzdGF0ZSAhPT0gdGhpcy5sYXN0U3RhdGUpIHtcbiAgICAgIHRoaXMubGFzdFN0YXRlPSBzdGF0ZTtcblxuICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShBVFRSX05BTUUsIHN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDjgqrjg5fjgrfjg6fjg7PplqLmlbDjgpLlrp/ooYxcbiAgICAgIGlmKHRoaXMuaXNUb3Ape1xuICAgICAgICB0aGlzLm9wdC5vblRvcCgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMub3B0Lm9uTm90VG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaXNCb3R0b20pe1xuICAgICAgICB0aGlzLm9wdC5vbkJvdHRvbSgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMub3B0Lm9uTm90Qm90dG9tKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU3lnU2Nyb2xsQW1vdW50O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBOzs7Ozs7SUFXQTtJQUdBO0lBQ0EsSUFBTSxTQUFTLEdBQVcsb0JBQW9CLENBQUM7SUFFL0M7SUFDQSxJQUFNLFFBQVEsR0FBVyxLQUFLLENBQUM7SUFDL0IsSUFBTSxXQUFXLEdBQVcsUUFBUSxDQUFDO0lBQ3JDLElBQU0sWUFBWSxHQUFXLFNBQVMsQ0FBQztJQUN2QyxJQUFNLGVBQWUsR0FBVyxZQUFZLENBQUM7SUFDN0MsSUFBTSxhQUFhLEdBQVcsZUFBZSxDQUFDO0lBRTlDO0lBQ0EsSUFBTSxZQUFZLEdBQVc7UUFDM0IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsSUFBSSxFQUFFLEdBQUc7S0FDVixDQUFDO0lBRUY7SUFDQSxJQUFNLFlBQVksR0FBVztRQUMzQixJQUFJLEVBQUUsSUFBSTtRQUNWLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFNBQVMsRUFBRSxDQUFDO0tBQ2IsQ0FBQztJQUVGOzs7Ozs7O1FBYUUseUJBQVksTUFBYyxFQUFFLE9BQXdCO1lBQXhCLHdCQUFBLEVBQUEsWUFBd0I7WUFDbEQsSUFBTSxRQUFRLEdBQVk7O2dCQUV4QixTQUFTLEVBQUUsTUFBTTs7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
