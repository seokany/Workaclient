// import {Action} from "../index";
// import {MAKE_QUESTION_FAIL, MAKE_QUESTION_REQUEST, MAKE_QUESTION_SUCCESS} from "./Action";
//
// export interface QuestionState {
//     fetching: boolean;
//     data: any;
//     err: any;
// }
//
// const initialState: QuestionState = {fetching: false, data: null, err: null};
//
// export const QuestionFeed = (state: QuestionState = initialState, action: Action) => {
//     switch (action.type) {
//         case MAKE_QUESTION_REQUEST:
//             return {
//                 fetching: true,
//                 data: null,
//                 err: null,
//             };
//         case MAKE_QUESTION_SUCCESS:
//             return {
//                 fetching: false,
//                 data: action.payload.data,
//                 err: null,
//             };
//         case MAKE_QUESTION_FAIL:
//             return {
//                 fetching: false,
//                 data: null,
//                 err: action.payload.err,
//             };
//         default:
//             return state;
//     }
// };
