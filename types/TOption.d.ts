declare type TOptionArg = {
    offsetTop?: string;
    offsetBottom?: string;
    onTop?: () => void;
    onNotTop?: () => void;
    onBottom?: () => void;
    onNotBottom?: () => void;
};
declare type TOption = {
    offsetTop: string;
    offsetBottom: string;
    onTop: () => void;
    onNotTop: () => void;
    onBottom: () => void;
    onNotBottom: () => void;
};
export type { TOptionArg, TOption };
