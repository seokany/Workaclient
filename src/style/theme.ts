import store from '../state/store';

export type ThemeProps = {
    theme: Theme
}

type Theme = {
    white: string;
    blue: string;
    sky: string;
    gray: string;
    magenta: string;
    detailTag: string;
    textColor: string;
    maxWidth: number;
    smFont: number;
    mdFont: number;
    lgFont: number;
    mainTitleFont: number;
    profileName: string;
}
const theme = {
    white: "#FFFFFF",
    blue: "#2999E5",
    sky: "#88C3FC",
    gray: "#7B7B7B",
    magenta: "#FA5080",
    detailTag: "#4F79A2",
    textColor: "#F85281",
    maxWidth: 800,
    smFont: 8,
    mdFont: 10,
    lgFont: 14,
    mainTitleFont: 18,
    profileName: "#9ED2FC"
}

// function update() {
//     theme.smFont = 8 + store.getState().setting.addFont;
// }
// store.subscribe(update);


export default theme;