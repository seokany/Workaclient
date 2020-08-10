import store from '../state/store';

export type ThemeProps = {
    theme: Theme
}

type Theme = {
    white: string;
    blue: string;
    sky: string;
    gray: string;
    detailBg: string;
    textColor: string;
    maxWidth: number;
    smFont: number;
    mdFont: number;
    lgFont: number;
}
const theme = {
    white: "#FFFFFF",
    blue: "#2999E5",
    sky: "#88C3FC",
    gray: "#7B7B7B",
    detailBg: "#4F79A2",
    textColor: "#F85281",
    maxWidth: 800,
    smFont: 8,
    mdFont: 10,
    lgFont: 12,
}

function update() {
    console.log("UPDATE");
    theme.smFont = 8 + store.getState().setting.addFont;
}

store.subscribe(update);


export default theme;