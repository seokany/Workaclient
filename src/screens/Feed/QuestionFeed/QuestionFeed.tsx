import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from "react-redux";
import {GET_QUESTION_REQUEST} from "../../../state/Question/Action";
import {RootState} from "../../../reducers";

const Text = styled.Text`
    font-size: 100px;
`
const QuestionFeed = () => {
    const dispatch = useDispatch()
    const Questions = useSelector((state:RootState) => state.question)
    //퀘스천 목록 불러오기
    // dispatch({type:GET_QUESTION_REQUEST})
    return (
        <Text>QuestionFeed</Text>
    )
}

export default QuestionFeed
