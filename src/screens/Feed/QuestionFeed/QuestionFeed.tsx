import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from "react-redux";
import { GET_QUESTION_REQUEST } from "../../../state/Question/Action";
import { RootState } from "../../../reducers";

const Text = styled.Text`
    font-size: 100px;
`
const QuestionFeed = () => {
    const rootState = useSelector((state: RootState) => state);
    const { login: loginState, question: questionState } = rootState;
    const dispatch = useDispatch();

    useEffect(() => {
        if (loginState.isLogin) {
            dispatch({ type: GET_QUESTION_REQUEST, payload: { token: loginState.token } })
        }
    }, [])
    return (
        <Text>QuestionFeed</Text>
    )
}

export default QuestionFeed
