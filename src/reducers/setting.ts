import { handleActions } from 'redux-actions';

export const SMALL_FONT = "SMALL_FONT" as const;
export const MIDDLE_FONT = "MIDDLE_FONT" as const;
export const LARGE_FONT = "LARGE_FONT" as const;

export type SettingState = {
    addFont: number;
}

const initialState: SettingState = {
    addFont: 0,
};

const reducer = handleActions(
    {
        [SMALL_FONT]: (state) => ({
            ...state,
            addFont: 0,
        }),
        [MIDDLE_FONT]: (state) => ({
            ...state,
            addFont: 2,
        }),
        [LARGE_FONT]: (state) => ({
            ...state,
            addFont: 4
        }),
    },
    initialState,
);

export default reducer;
