# syg-scroll-amount

ページの最上部、最下部、それ以外の状態を data属性に付与する。

## History

- 2021.11.21  ver.2.0.0
  - TypeScriptで書き直した
  - スクロールイベントではなく intersectionObserver を使うようにした
  - スクロール位置検知用エレメントを `position:absolut` で配置する関係で、<body> に `position:relative` が付与される。

## Description
ページ最上部にいる時は`data-scroll-amount`属性に「top」を付与します。
最下部は「bottom」、それ以外は「no-top」「no-bottom」を付与します。

固定ヘッダーの出し入れや、ページトップボタンの出し入れなどに使います。


## Usage
### Install
```sh
npm install --save @sygnas/scroll-amount
```
### html / JS / css
```html
<header class="js-scroll-amount scroll-amount">
    出し入れしたい内容
</header>
```

```JavaScript
import ScrollAmount from '@sygnas/scroll-amount';

const target1 = new ScrollAmount('.js-scroll-amount', {
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
<header class="js-scroll-amount scroll-amount" data-scroll-amount="top no-bottom">
```

| name | comment |
| ---- | ---- |
| top | スクロール位置が最上部 |
| not-top | スクロール位置が最上部ではない |
| bottom | スクロール位置が最下部 |
| not-bottom | スクロール位置が最下部ではない |


## Options

| option | default | comment |
| ---- | ---- | ---- |
| offsetTop | 70px | スクロール位置がこの値より上ならページ最上部と判断 |
| offsetBottom | 70px | スクロール位置がこの値より下ならページ最下部と判断 |
| onTop | function | 最上部にスクロールした時に実行 |
| onNotTop | function | 最上部から離れた時に実行 |
| onBottom | function | 最下部にスクロールした時に実行 |
| onNotBottom | function | 最下部から離れた時に実行 |


## License
MIT