import React, { useState, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, View, Animated, FlatList, Button, ActivityIndicator, Alert } from 'react-native'
import styled from 'styled-components/native';

import { ThemeProps } from '../style/theme';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../reducers';

import DownArrow from '../../assets/DownArrow.svg';
import UpArrow from '../../assets/UpArrow.svg';
import Tag from './Tag';
import { questionCard } from '../state/Question/Reducer';
import { GET_QUESTION_DETAIL_REQUEST, QUESTION_COMMENTS_REQUEST, MAKE_QUESTION_COMMENT_REQUEST, GET_QUESTION_DETAIL_INIT, QUESTION_COMMENTS_INIT, PATCH_QUESTION_REQUEST, PATCH_QUESTION_INIT, PATCH_QUESTION_PAGE_REQUEST, PATCH_QUESTION_PAGE_INIT, DELETE_QUESTION_PAGE_INIT, DELETE_QUESTION_PAGE_REQUEST, GET_QUESTION_REQUEST, THUMP_HANDLE_REQUEST } from "../state/Question/Action";
import { TextInput } from 'react-native-gesture-handler';
import { PROFILE_REQUEST } from '../state/Profile/Action';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { SearchStackParamList } from '../navigator/SeachNavigation';

interface Props extends questionCard {
    visible: boolean;
    navigation?: StackNavigationProp<SearchStackParamList, 'Home'>;
    onPress: () => void;
}

const ModalWrapper = styled.Modal`
    flex:1;
`;

const Wrapper = styled.View`
    width:100%;
    height:100%;
    background-color:rgba(112,112,112,0.9);
    justify-content:center;
    align-items:center;
    padding:0px 10px;
`;

const QuestionWrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    height:70%;
    background-color:${({ theme }: ThemeProps): string => theme.detailTag};
`;

const ModalTabWrapper = styled.View`
    width:100%;
    background-color:${({ theme }: ThemeProps): string => theme.white};
    margin-bottom:5px;
    overflow:hidden;
`;

const TileWrapper = styled.View`
    flex-direction:row;
    height:64px;
`;

const TextWrapper = styled.View`
    height:64px;
    padding:0px 10px;
    justify-content:center;
`;

const BodyWrapper = styled.View`
    flex:1
`;

const DropDownWrapper = styled.View`
    align-items:center;
`;

const AnswerWrapper = styled.View`
    width:100%;
    margin-top:10px;
    padding:0px 10px;
`;

const UsernameWrapper = styled.View`
    flex-direction:row;
`;

const RatingWrapper = styled.View`
    flex-direction:row;
    justify-content:flex-end;
`;

const TagWrapper = styled.View`
    min-height:90px;
    padding:15px;
    justify-content:space-around;
`;

const TendencyTagWrapper = styled.View`
    flex-direction:row;
`;

const UserTagWrapper = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;

const PostComment = styled.View`
    flex:1;
    min-height:60px;
    margin-top:10px;
    justify-content:flex-end;
    padding:10px;
`;

const CommnetWrapper = styled.View`
    border:1px solid black;
    border-radius:3px;
    flex-direction:row;
`;

const EditWrapper = styled.View`
    padding:10px;
    align-items:flex-end;
`;

const Image = styled.Image`
    width:64px;
    height:64px;
    resize-mode:stretch;
`;

const Desc = styled.Text`
    text-align:center;
    font-size:${({ theme }: ThemeProps): number => theme.smFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    line-height:12px;
`;

const QuestionText = styled.Text`
    text-align:center;
    font-size:${({ theme }: ThemeProps): number => theme.lgFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    font-weight:800;
    line-height:12px;
`;

const AnswerUsername = styled.Text`
    color:${({ theme }: ThemeProps): string => theme.textColor};
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
    font-weight:800;
    margin-bottom:4px;
`;

type animationState = {
    detailIndex?: number;
    animationOn: boolean;
}

export default function QuestionModal({
    visible,
    onPress,
    navigation,
    id,
    author: {
        username,
        user_image,
        pk
    },
    title,
    tags,
    questions,
    created_at,
}: Props) {
    // animation
    const [animationState, setAnimationState] = useState<animationState>({
        detailIndex: undefined,
        animationOn: false
    })

    // modify question ( not commnet );
    const [isEdit, setIsEdit] = useState({
        edit: false,
        index: 0,
        id: 0,
    });
    const [modifyText, setModifyText] = useState("");

    //modify question title, tags;
    const [isEditPages, setIsEditPages] = useState(false)
    const [editTitle, setEditTitle] = useState("");
    const [editTags, setEditTags] = useState("");

    const { detailIndex, animationOn } = animationState;
    const slideToggle = useRef(new Animated.Value(0)).current;
    // redux
    const dispatch = useDispatch()
    const rootState = useSelector((state: RootState) => state);
    const {
        login: loginState,
        questionComment: questionComment,
        questionDetail: questionDetail,
        patchQuestionPage,
        deleteQuestionPage,
        patchQuestion } = rootState;
    // refresh

    const setDetailStyle = (index: number): { display?: 'none' | 'flex', height?: Animated.Value, flex?: number, overFlow?: string } => {
        return (
            typeof detailIndex === 'number' && detailIndex === index ?
                { height: slideToggle }
                :
                { display: 'none' }
        )
    }
    const [text, setText] = useState('');

    const closeModal = () => {
        onPress();
    }

    const handleDetail = (index: number) => {
        const isClose = index === detailIndex
        if (animationOn) {
            setAnimationState({
                detailIndex: isClose ? undefined : index,
                animationOn: isClose ? false : true
            })
            Animated.timing(slideToggle, {
                toValue: 0,
                duration: 1000
            }).start(() => { });
        } else {
            setAnimationState({
                detailIndex: index === detailIndex ? undefined : index,
                animationOn: true
            })
        }
    };

    const handleModifyQ = (e: string) => {
        setModifyText(e);
    }

    const handleModifyAction = () => {
        dispatch({
            type: PATCH_QUESTION_REQUEST,
            payload: {
                token: loginState.token,
                content: modifyText,
                id,
                index: isEdit.id
            }
        })
    }

    const handleModifyTitle = () => {
        setIsEditPages(true);
    }

    const handleUpdate = () => {
        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        const tagsValid = editTags.trim().replace(/,/gi, '').replace(regExp, '').replace(/\s{2,}/gi, ' ').split(' ');
        dispatch({
            type: PATCH_QUESTION_PAGE_REQUEST,
            payload: {
                token: loginState.token,
                id,
                title: editTitle,
                tags: tagsValid
            }
        })
    }

    const dispatchDelete = () => {
        dispatch({
            type: DELETE_QUESTION_PAGE_REQUEST,
            payload: {
                token: loginState.token,
                id,
            }
        })
    }

    const handleDelete = () => {
        Alert.alert("WORKA!", "정말 질문카드를 지우시겠습니까?",
            [
                {
                    text: "삭제",
                    onPress: dispatchDelete
                },
                {
                    text: "취소"
                }
            ]
        )
    }

    const handleError = () => {
        Alert.alert("WORKA!", "올바르지 않은 접근입니다. 다시 시도해주세요");
        onPress();
    }

    if (patchQuestionPage.posting) {
        setIsEditPages(false);
        dispatch({ type: PROFILE_REQUEST, payload: { token: loginState.token, pk: loginState.data.pk } });
        dispatch({ type: GET_QUESTION_REQUEST, payload: { token: loginState.token } });
        dispatch({ type: PATCH_QUESTION_PAGE_INIT });
    }

    if (deleteQuestionPage.posting) {
        Alert.alert("WORKA!", "해당 질문 카드가 성공적으로 삭제되었습니다.", [{ text: "확인", onPress: closeModal }]);
        setIsEditPages(false);
        dispatch({ type: PROFILE_REQUEST, payload: { token: loginState.token, pk: loginState.data.pk } });
        dispatch({ type: GET_QUESTION_REQUEST, payload: { token: loginState.token } });
        dispatch({ type: DELETE_QUESTION_PAGE_INIT });
    }

    if (patchQuestionPage.err || deleteQuestionPage.err) {
        handleError()
        dispatch({ type: PATCH_QUESTION_PAGE_INIT });
        dispatch({ type: DELETE_QUESTION_PAGE_INIT });
    }

    const postComments = () => {
        dispatch({
            type: MAKE_QUESTION_COMMENT_REQUEST,
            payload: {
                token: loginState.token,
                question_pk: detailIndex,
                page_pk: id,
                text,
            }
        })
        setText("");
    }

    const timestamp = (date:string) => {
        const today = new Date()
        const Hour = today.getHours()
        const days = date.split('T')[0].split('-')
        const times = date.split('T')[1].split('.')[0].split(':')
        if((today.getFullYear() - Number(days[0])) >= 1){
            return today.getFullYear() - Number(days[0]) + 'Years'
        }else if((today.getMonth()- Number(days[1])) >= 1) {
            return today.getMonth()- Number(days[1]) + 'Month'
        }else if((today.getDate() - Number(days[2])) >=1) {
            return today.getDate() - Number(days[2]) + 'Days'
        }else if ((today.getHours() - Number(times[0])) >= 1) {
            return today.getHours() - Number(times[0]) + 'Hours'
        }else{
            return today.getMinutes() - Number(times[1]) + 'Minutes'
        }
    }
    const questionCommentsRequest = (index: number) => {
        dispatch({
            type: QUESTION_COMMENTS_REQUEST,
            payload:
            {
                token: loginState.token,
                id,
                questionId: index
            }
        })
    }

    const getQuestionDetailRequest = () => {
        dispatch({
            type: GET_QUESTION_DETAIL_REQUEST,
            payload:
            {
                token: loginState.token,
                id: id
            }
        })
    }

    const handleTitle = (e: string) => {
        setEditTitle(e);
    }

    const handleTags = (e: string) => {
        setEditTags(e);
    }

    const handleThump = (questionId: number, commentId: number) => {
        dispatch(
            {
                type: THUMP_HANDLE_REQUEST,
                payload:
                {
                    id,
                    questionId,
                    commentId,
                    token: loginState.token,

                }
            }
        )
    }

    if (patchQuestion.posting) {
        dispatch({ type: PATCH_QUESTION_INIT });
        getQuestionDetailRequest();
        setIsEdit({
            edit: false,
            index: 0,
            id: 0
        })
    }

    useEffect(() => {
        if (animationOn && typeof detailIndex === 'number') {
            questionCommentsRequest(detailIndex);
            Animated.timing(slideToggle, {
                toValue: 300,
                duration: 1000
            }).start();
        }
    }, [animationState]);

    useEffect(() => {
        if (visible) {
            setIsEdit({
                edit: false,
                index: 0,
                id: 0
            })
            setIsEditPages(false);
            setEditTitle(title);
            setEditTags(tags.join(' '));
        }
    }, [visible])

    useEffect(() => {
        getQuestionDetailRequest()
        return () => {
            dispatch({ type: GET_QUESTION_DETAIL_INIT });
            dispatch({ type: QUESTION_COMMENTS_INIT });
        }
    }, []);

    useEffect(() => {
        if (isEdit.edit) {
            setModifyText(questionDetail.data.results[isEdit.index].content)
        } else {
            setModifyText("");
        }
    }, [isEdit.edit])

    return (
        <ModalWrapper visible={visible} transparent={true} onRequestClose={closeModal} >
            <TouchableWithoutFeedback onPress={closeModal}>
                <Wrapper>
                    <QuestionWrapper onStartShouldSetResponder={() => true} >
                        <ModalTabWrapper>
                            <TileWrapper >
                                <TextWrapper style={{ flex: 1 }}>
                                    {isEditPages
                                        ?
                                        <TextInput value={editTitle} onChangeText={handleTitle} />
                                        :
                                        <Desc>{editTitle}</Desc>
                                    }
                                    {isEditPages
                                        ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <TouchableOpacity onPress={handleUpdate} >
                                                <Desc style={{ marginRight: 10 }}>수정, 등록</Desc>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleDelete}>
                                                <Desc>삭제</Desc>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        (pk === loginState.data.pk &&
                                            <TouchableOpacity onPress={handleModifyTitle}>
                                                <Desc style={{ textAlign: 'right', color: 'blue', opacity: 0.8 }}>edit</Desc>
                                            </TouchableOpacity>
                                        )
                                    }
                                </TextWrapper>
                                <Image source={{ uri: user_image || "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" }} />
                            </TileWrapper>
                        </ModalTabWrapper>
                        <BodyWrapper >
                            {/*detailQuestion*/}
                            {questionDetail.data.results && !questionDetail.fetching ? (
                                <FlatList
                                    // scrollEnabled
                                    nestedScrollEnabled={true}
                                    data={questionDetail.data.results}
                                    keyExtractor={(item) => `${item.id}`}
                                    renderItem={({ item, index }) =>
                                        <ModalTabWrapper key={`q-${item.id}`} onStartShouldSetResponder={() => false}>
                                            <TextWrapper>
                                                {isEdit.edit && isEdit.index === index ?
                                                    <TextInput value={modifyText} onChangeText={handleModifyQ} />
                                                    :
                                                    <QuestionText>Q{index + 1}.{item.content}</QuestionText>
                                                }
                                            </TextWrapper>
                                            <View style={{ flex: 1, display: detailIndex === item.id ? 'flex' : 'none' }} >
                                                {/*comment*/}
                                                {questionComment.fetching ? (
                                                    <ActivityIndicator />
                                                ) : (
                                                        <FlatList
                                                            nestedScrollEnabled={true}
                                                            scrollEnabled={true}
                                                            initialNumToRender={8}
                                                            horizontal={false}
                                                            data={questionComment.data}
                                                            keyExtractor={(item) => `${item.id}`}
                                                            extraData={questionComment.data}
                                                            renderItem={({ item: questionComment }) =>
                                                                <AnswerWrapper onStartShouldSetResponder={() => true}>
                                                                    <UsernameWrapper>
                                                                        <TouchableOpacity onPress={() => {
                                                                            closeModal();
                                                                            if (navigation) {
                                                                                navigation.navigate('Profile', { pk: questionComment.author.pk })
                                                                            }
                                                                        }}>
                                                                            <AnswerUsername style={{ opacity: 0.6 }}>{questionComment.author.username}</AnswerUsername>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() => handleThump(item.id, questionComment.id)}>
                                                                            <AnswerUsername> 👍 </AnswerUsername>
                                                                        </TouchableOpacity>
                                                                    </UsernameWrapper>
                                                                    <AnswerUsername>{questionComment.text}, {timestamp(questionComment.created_at)}</AnswerUsername>
                                                                    {/* <RatingWrapper>
                                                                        <ThumpsUp style={{ marginRight: 7 }} />
                                                                        <ThumpsDown style={{ marginRight: 5 }} />
                                                                    </RatingWrapper> */}
                                                                    <AnswerUsername style={{ opacity: 0.3 }}>{questionComment.is_like && "본인 포함 "}{questionComment.like_count}명이 THUMP UP!!</AnswerUsername>
                                                                </AnswerWrapper>
                                                            }
                                                        />
                                                    )}
                                                {loginState.data.pk !== pk ?
                                                    <PostComment>
                                                        <CommnetWrapper>
                                                            <TextInput
                                                                style={{ flex: 1, fontSize: 10, padding: 3 }}
                                                                multiline={true}
                                                                autoCorrect={false}
                                                                value={text}
                                                                onChangeText={(e) => setText(e)}
                                                            />
                                                            {questionComment.fetching ?
                                                                <ActivityIndicator />
                                                                :
                                                                <Button title="등록" onPress={postComments} />
                                                            }
                                                        </CommnetWrapper>
                                                    </PostComment>
                                                    :
                                                    <EditWrapper>
                                                        {isEdit.edit
                                                            ?
                                                            <TouchableOpacity onPress={handleModifyAction}>
                                                                <AnswerUsername style={{ color: 'blue', opacity: 0.4 }}>
                                                                    수정
                                                                </AnswerUsername>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity onPress={() => setIsEdit({ edit: true, index, id: item.id })}>
                                                                <AnswerUsername style={{ color: 'blue', opacity: 0.4 }}>EDIT</AnswerUsername>
                                                            </TouchableOpacity>
                                                        }
                                                    </EditWrapper>
                                                }
                                            </View>
                                            <DropDownWrapper >
                                                <TouchableOpacity onPress={() => handleDetail(item.id)} style={{ padding: 10 }}>
                                                    {detailIndex === item.id ? <UpArrow /> : <DownArrow />}
                                                </TouchableOpacity>
                                            </DropDownWrapper>
                                        </ModalTabWrapper>
                                    }
                                />
                            ) : <ActivityIndicator />}
                            <TagWrapper >
                                <TendencyTagWrapper>
                                    {isEditPages
                                        ?
                                        <TextInput value={editTags} onChangeText={handleTags} />
                                        :
                                        editTags.split(' ').map((tag, tagIndex) => <Tag key={`tag-${tagIndex}`} text={tag} fontColor="#FFFFFF" />)
                                    }
                                </TendencyTagWrapper>
                                <UserTagWrapper>
                                    <Tag text={username} fontColor="#FFFFFF" />
                                </UserTagWrapper>
                            </TagWrapper>
                        </BodyWrapper>
                    </QuestionWrapper>
                </Wrapper>
            </TouchableWithoutFeedback>
        </ModalWrapper>
    )
}


/*  question comment slide down animated
const setDetailStyle = (index: number): { display?: 'none' | 'flex', height?: Animated.Value, flex?: number, overFlow?: string } => {
        return (
            typeof detailIndex === 'number' && detailIndex === index ?
                { height: slideToggle }
                :
                { display: 'none' }
        )
    }
    */