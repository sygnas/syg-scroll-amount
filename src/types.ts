
type TTopOrBottom = "top" | "bottom";

// 引数用に省略可能オプション「?」がついてる
// type TOptionArg = {
type TOption = {
  // 最上部のオフセット
  offsetTop?: string;
  // 最下部のオフセット
  offsetBottom?: string;
  // 最上部にスクロールした時に実行
  onTop?: () => void;
  // 最上部から離れた時に実行
  onNotTop?:  () => void;
  // 最下部にスクロールした時に実行
  onBottom?:  () => void;
  // 最下部から離れた時に実行
  onNotBottom?:  () => void;
};

// type TOption = {
//   offsetTop: string;
//   offsetBottom: string;
//   onTop: () => void;
//   onNotTop:  () => void;
//   onBottom:  () => void;
//   onNotBottom:  () => void;
// };

export type {TOption, TTopOrBottom}
