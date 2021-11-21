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

    return SygScrollAmount;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWFtb3VudC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQWRkIHNjcm9sbGluZyBzdGF0ZSh0b3AgLyBub3QtdG9wIC8gYm90dG9tIC8gbm90LWJvdHRvbSlcbiAqXG4gKiBAYXV0aG9yICAgSGlyb3NoaSBGdWt1ZGEgPGluZm8uc3lnbmFzQGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG5pbXBvcnQgeyBUT3B0aW9uLCBUVG9wT3JCb3R0b20gfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vIOeKtuaFi+OCkuS7mOS4juOBmeOCi+OBn+OCgeOBrmRhdGHlsZ7mgKdcbmNvbnN0IEFUVFJfTkFNRTogc3RyaW5nID0gXCJkYXRhLXNjcm9sbC1hbW91bnRcIjtcblxuLy8g54q25oWL44Gu5ZCN5YmNXG5jb25zdCBBVFRSX1RPUDogc3RyaW5nID0gXCJ0b3BcIjtcbmNvbnN0IEFUVFJfQk9UVE9NOiBzdHJpbmcgPSBcImJvdHRvbVwiO1xuY29uc3QgQVRUUl9OT1RfVE9QOiBzdHJpbmcgPSBcIm5vdC10b3BcIjtcbmNvbnN0IEFUVFJfTk9UX0JPVFRPTTogc3RyaW5nID0gXCJub3QtYm90dG9tXCI7XG5jb25zdCBBVFRSX1BPU0lUSU9OOiBzdHJpbmcgPSBcImRhdGEtcG9zaXRpb25cIjtcblxuLy8g55uj6KaW55So44Ko44Os44Oh44Oz44OI44Gu44OH44OV44Kp44Or44OIc3R5bGVcbmNvbnN0IENPTU1PTl9TVFlMRTogb2JqZWN0ID0ge1xuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICBsZWZ0OiBcIjBcIixcbn07XG5cbi8vIEludGVyc2VjdGlvbk9ic2VydmVy44Gu6Kit5a6aXG5jb25zdCBPQlNFUlZFUl9PUFQ6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHtcbiAgcm9vdDogbnVsbCxcbiAgcm9vdE1hcmdpbjogXCIwcHhcIixcbiAgdGhyZXNob2xkOiAwLFxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jbGFzcyBTeWdTY3JvbGxBbW91bnQge1xuICBwcml2YXRlIG9wdDogVE9wdGlvbjtcbiAgcHJpdmF0ZSB0YXJnZXRzO1xuICBwcml2YXRlIGlzVG9wOiBib29sZWFuO1xuICBwcml2YXRlIGlzQm90dG9tOiBib29sZWFuO1xuICBwcml2YXRlIGxhc3RTdGF0ZTogc3RyaW5nO1xuICAvLyBwcml2YXRlIG9ic2VydmVyczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJbXTtcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqIEBwYXJhbSB0YXJnZXQgc3RyaW5nIOeKtuaFi+OCkuS7mOS4juOBmeOCi+WvvuixoeOCqOODrOODoeODs+ODiOOBruOCu+ODrOOCr+OCv+aWh+Wtl+WIl1xuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0OiBzdHJpbmcsIG9wdGlvbnM6IFRPcHRpb24gPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzOiBUT3B0aW9uID0ge1xuICAgICAgLy8g5pyA5LiK6YOo44Gu44Kq44OV44K744OD44OIXG4gICAgICBvZmZzZXRUb3A6IFwiNzBweFwiLFxuICAgICAgLy8g5pyA5LiL6YOo44Gu44Kq44OV44K744OD44OIXG4gICAgICBvZmZzZXRCb3R0b206IFwiNzBweFwiLFxuICAgICAgLy8g5pyA5LiK6YOo44Gr44K544Kv44Ot44O844Or44GX44Gf5pmC44Gr5a6f6KGMXG4gICAgICBvblRvcCgpIHt9LFxuICAgICAgLy8g5pyA5LiK6YOo44GL44KJ6Zui44KM44Gf5pmC44Gr5a6f6KGMXG4gICAgICBvbk5vdFRvcCgpIHt9LFxuICAgICAgLy8g5pyA5LiL6YOo44Gr44K544Kv44Ot44O844Or44GX44Gf5pmC44Gr5a6f6KGMXG4gICAgICBvbkJvdHRvbSgpIHt9LFxuICAgICAgLy8g5pyA5LiL6YOo44GL44KJ6Zui44KM44Gf5pmC44Gr5a6f6KGMXG4gICAgICBvbk5vdEJvdHRvbSgpIHt9LFxuICAgIH07XG5cbiAgICAvLyDkuI7jgYjjgonjgozjgZ/oqK3lrprjgpLpgannlKhcbiAgICB0aGlzLm9wdCA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIC8vIOeKtuaFi+S7mOS4juOBruWvvuixoVxuICAgIHRoaXMudGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KHRhcmdldCk7XG4gICAgLy8g5LiA55Wq5LiK44Gr44K544Kv44Ot44O844Or44GX44GfXG4gICAgdGhpcy5pc1RvcCA9IGZhbHNlO1xuICAgIC8vIOS4gOeVquS4i+OBq+OCueOCr+ODreODvOODq+OBl+OBn1xuICAgIHRoaXMuaXNCb3R0b20gPSBmYWxzZTtcbiAgICAvLyDmnIDlvozjga7nirbmhYtcbiAgICB0aGlzLmxhc3RTdGF0ZSA9ICcnO1xuXG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOebo+imlueUqOOCqOODrOODoeODs+ODiOS9nOaIkOOBl+OBpuebo+imlumWi+Wni1xuICAgKi9cbiAgY3JlYXRlT2JzZXJ2ZUVsZW1lbnQocG9zaXRpb246IFRUb3BPckJvdHRvbSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgICBjb25zdCBlbGVtZW50OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIENPTU1PTl9TVFlMRSk7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLm9wdC5vZmZzZXRUb3AgYXMgc3RyaW5nO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKEFUVFJfUE9TSVRJT04sIHBvc2l0aW9uKTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIikge1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICB9XG4gICAgLy8g44Oa44O844K45pyA5LiL6YOo44Gr6L+95YqgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrnjgq/jg63jg7zjg6vmpJznn6Xlh6bnkIbjgpLplovlp4tcbiAgICovXG4gIHByaXZhdGUgc3RhcnQoKSB7XG4gICAgLy8gPGJvZHk+IOOBqyBwb3NpdGlvbiDoqK3lrppcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXG4gICAgLy8gSW50ZXJzZWN0aW9uT2JzZXJ2ZXLjgpLkvZzmiJDjgZfjgabnm6Poppbplovlp4tcbiAgICBjb25zdCBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICB0aGlzLm9ic2VydmVyQ2FsbGJhY2suYmluZCh0aGlzKSxcbiAgICAgIE9CU0VSVkVSX09QVFxuICAgICk7XG5cbiAgICAvLyDnm6PoppbnlKjjgqjjg6zjg6Hjg7Pjg4jkvZzmiJBcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuY3JlYXRlT2JzZXJ2ZUVsZW1lbnQoXCJ0b3BcIikpO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5jcmVhdGVPYnNlcnZlRWxlbWVudChcImJvdHRvbVwiKSk7XG4gIH1cblxuICAvKipcbiAgICog44K544Kv44Ot44O844Or5Yem55CGXG4gICAqIEludGVyc2VjdGlvbk9ic2VydmVyIOOBq+WPjeW/nOOBl+OBnyA8ZGl2PiDjgYwgdG9wL2JvdHRvbSDjganjgaHjgonjgYvjgafliKTlrprjgZnjgotcbiAgICovXG4gIHByaXZhdGUgb2JzZXJ2ZXJDYWxsYmFjayggZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwb3NpdGlvbjogVFRvcE9yQm90dG9tID0gZW50cnkudGFyZ2V0LmdldEF0dHJpYnV0ZShcbiAgICAgICAgQVRUUl9QT1NJVElPTlxuICAgICAgKSBhcyBUVG9wT3JCb3R0b207XG5cbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIikge1xuICAgICAgICB0aGlzLmlzVG9wID0gZW50cnkuaXNJbnRlcnNlY3Rpbmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzQm90dG9tID0gZW50cnkuaXNJbnRlcnNlY3Rpbmc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDlsZ7mgKfjgpLku5jkuI5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWxnuaAp+OCkuS7mOS4jlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRBdHRyaWJ1dGUoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhdGU6IHN0cmluZyA9IFtcbiAgICAgIHRoaXMuaXNUb3AgPyBBVFRSX1RPUCA6IEFUVFJfTk9UX1RPUCxcbiAgICAgIHRoaXMuaXNCb3R0b20gPyBBVFRSX0JPVFRPTSA6IEFUVFJfTk9UX0JPVFRPTSxcbiAgICBdLmpvaW4oJyAnKTtcblxuICAgIC8vIOe1kOaenOOCkiBkYXRh5bGe5oCn44Gr5Y+N5pig44GZ44KLXG4gICAgLy8g5YmN5Zue44Go5ZCM44GY44Gq44KJ5Y+N5pig44GX44Gq44GEXG4gICAgaWYgKHN0YXRlICE9PSB0aGlzLmxhc3RTdGF0ZSkge1xuICAgICAgdGhpcy5sYXN0U3RhdGU9IHN0YXRlO1xuXG4gICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCgodGFyZ2V0OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKEFUVFJfTkFNRSwgc3RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIOOCquODl+OCt+ODp+ODs+mWouaVsOOCkuWun+ihjFxuICAgICAgaWYodGhpcy5pc1RvcCAmJiB0aGlzLm9wdC5vblRvcCl7XG4gICAgICAgIHRoaXMub3B0Lm9uVG9wKCk7XG4gICAgICB9ZWxzZSBpZih0aGlzLm9wdC5vbk5vdFRvcCl7XG4gICAgICAgIHRoaXMub3B0Lm9uTm90VG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaXNCb3R0b20gJiYgdGhpcy5vcHQub25Cb3R0b20pe1xuICAgICAgICB0aGlzLm9wdC5vbkJvdHRvbSgpO1xuICAgICAgfWVsc2UgaWYodGhpcy5vcHQub25Ob3RCb3R0b20pe1xuICAgICAgICB0aGlzLm9wdC5vbk5vdEJvdHRvbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFN5Z1Njcm9sbEFtb3VudDtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTs7Ozs7O0lBVUE7SUFHQTtJQUNBLElBQU0sU0FBUyxHQUFXLG9CQUFvQixDQUFDO0lBRS9DO0lBQ0EsSUFBTSxRQUFRLEdBQVcsS0FBSyxDQUFDO0lBQy9CLElBQU0sV0FBVyxHQUFXLFFBQVEsQ0FBQztJQUNyQyxJQUFNLFlBQVksR0FBVyxTQUFTLENBQUM7SUFDdkMsSUFBTSxlQUFlLEdBQVcsWUFBWSxDQUFDO0lBQzdDLElBQU0sYUFBYSxHQUFXLGVBQWUsQ0FBQztJQUU5QztJQUNBLElBQU0sWUFBWSxHQUFXO1FBQzNCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLElBQUksRUFBRSxHQUFHO0tBQ1YsQ0FBQztJQUVGO0lBQ0EsSUFBTSxZQUFZLEdBQTZCO1FBQzdDLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLEtBQUs7UUFDakIsU0FBUyxFQUFFLENBQUM7S0FDYixDQUFDO0lBRUY7Ozs7Ozs7UUFhRSx5QkFBWSxNQUFjLEVBQUUsT0FBcUI7WUFBckIsd0JBQUEsRUFBQSxZQUFxQjtZQUMvQyxJQUFNLFFBQVEsR0FBWTs7Z0JBRXhCLFNBQVMsRUFBRSxNQUFNOztnQkFFakIsWUFBWSxF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
