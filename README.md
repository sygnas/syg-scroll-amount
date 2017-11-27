# syg-scroll-amount
Set data attribute according to status at the time of page scroll(top / not-top / bottom / not-bottom ..)

ページスクロール時にステータスに応じたdata属性を付与する（top / not-top / bottom / not-bottom ..）。

## Description
スクロールに応じた固定ヘッダーの出し入れなどに使います。
ブラウザがページスクロールした時に、「ページ最上部にいる」「ページ最上部にいない」などのステータスのdata属性をエレメントに付与します。

## Usage
### Install
```sh
npm install syg-scroll-amount
```
### html / JS / css
```html
<header class="js-scroll-amount scroll-amount">
    ...menu...
</header>
```

```JavaScript
import ScrollAmount from 'syg-scroll-amount';

const target1 = new ScrollAmount($('.js-scroll-amount'), {
    // Options
});
```

```Sass
.scroll-amount{
    transition: .2s;

    &[data-scroll-amount ~= "top"]{
        transform: translateY(-40px);
    }
}
```

## Attributes

属性 `data-scroll-amount` にステータスが書き出されます。

```Example
<header class="js-scroll-amount scroll-amount" data-scroll-amount="top pin">
```

| name | comment |
| ---- | ---- |
| top | スクロール位置が最上部 |
| not-top | スクロール位置が最上部ではない |
| bottom | スクロール位置が最下部 |
| not-bottom | スクロール位置が最下部ではない |


## Options

| option | default | comment |
| ---- | ---- | ---- |
| offset_top | 50 | スクロール位置がこの値より上ならページ最上部と判断 |
| offset_bottom | 50 | スクロール位置がこの値より下ならページ最下部と判断 |
| onTop | function | 最上部にスクロールした時に実行 |
| onNotTop | function | 最上部から離れた時に実行 |
| onBottom | function | 最下部にスクロールした時に実行 |
| onNotBottom | function | 最下部から離れた時に実行 |


## License
MIT