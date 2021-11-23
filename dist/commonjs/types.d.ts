declare type TTopOrBottom = "top" | "bottom";
declare type TOption = {
    offsetTop?: string;
    offsetBottom?: string;
    onTop?: () => void;
    onNotTop?: () => void;
    onBottom?: () => void;
    onNotBottom?: () => void;
};
export type { TOption, TTopOrBottom };
