import React, {useEffect, Fragment, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Image, Modal, TouchableWithoutFeedback, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {GET_FEED_REQUEST} from "../../state/Feed/Action";

interface Storage {
    id: string
    user_image : string
    username: string
    groups : []
    images : string
    text : string
    create_at : string
    updated_at : string
    number_of_likes : number
    number_of_comments : number
    liked_by_req_user : boolean
    tags : []

};
/*
 분기처리가 필요 -> 로그인했을시, isskip 일시에 따라 api 다르게 줌(현재는 permission필요없는 전체 list만 호출중
  navigator에 대해 물어보고 그부분만 추가기술할예
 */
const FeedHome: React.FC = (props) => {
    const feedState = useSelector<RootState>((state) => state.feed)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // item를 그냥 object로 받아와도 가능하지만 타입체크
    const [storage, setStorage] = useState<Storage>(
        {id: '',
            user_image: '',
            username: '',
            groups: [],
            images:'',
            text:'',
            create_at:'',
            updated_at:'',
            number_of_comments:0,
            number_of_likes:0,
            liked_by_req_user:false,
            tags:[]
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: GET_FEED_REQUEST});
    }, []);

    const feedDetail = async ( item : any) => {
        setStorage({
            id:item.id,
            user_image: item.author.user_image,
            username: item.author.username,
            groups: item.author.groups,
            images :item.images,
            text: item.text,
            create_at: item.create_at,
            updated_at: item.updated_at,
            number_of_comments: item.number_of_comments,
            number_of_likes: item.number_of_likes,
            liked_by_req_user: item.liked_by_req_user,
            tags: item.tags,
        })
        await setModalVisible(!modalVisible)
    }

    const renderFeed = ({item}: any) => {
        return(
            <>
                <TouchableWithoutFeedback onPress={() => feedDetail(item)}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text>
                                    {`${item.id} ${item.text}  ${item.author.username} ${item.author.point} ${item.images}
                         Like:${item.number_of_likes}  comment:${item.number_of_comments} ${item.tags}`}
                                </Text>
                            </View>
                            <Divider/>
                        </View>
                    </TouchableWithoutFeedback>

            </>
        )
    }
    return(
        <Fragment>
            {feedState.fetching ? <Text>'Now Loading'</Text> :
                <View>
                    <FlatList data={feedState} renderItem={renderFeed}/>
                </View>
            }
                <Modal visible={modalVisible} transparent={true} >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style = {styles.viewtest}>
                <TouchableWithoutFeedback>
                <View>
                    <View style={styles.viewWrapImage}>
                        <Image style={styles.avatar} source={{uri: storage.user_image}}/>
                    </View>
                    {/*storage state에서 필요한정보 추출*/}
                <Text>`{storage.text} {storage.tags}`</Text>
                    <Button onPress = { () => setModalVisible(!modalVisible)} title="close">test </Button>
                </View>
                </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
                </Modal>
        </Fragment>
    )
}

export default FeedHome

//이하 초보 스타일 , 다지웁시다
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingLeft: 10, paddingRight: 10
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    viewWrapImage: {
        flexDirection: 'row',
        height: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 5,
    },
    viewtest : {
        flex: 1,
        paddingLeft: 10, paddingRight: 10,
        width: 30,
        height: 30,
        backgroundColor: '#ffffff'
    },
    closebutton: {
        //empty
    }
})