import React, { useEffect, useState, Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AuthNavigation from '../navigator/AuthNavigation';
import BottomNavigation from '../navigator/BottomNavigation'
import Tendency from '../screens/Tendency/Select'

import { RootState } from '../reducers';
import { LOGIN_SUCCESS, LOGIN_REQUESTED, LOGIN_INIT } from "../reducers/login";
import { LoginInfo } from "../../App";
import { GET_FEED_REQUEST, GET_FEED_INIT } from "../state/Feed/Action";
import { ActivityIndicator } from 'react-native';

type TendencyProps = {
    token: string;
}

type Props = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

function TendencyController({ token }: TendencyProps) {
    const dispatch = useDispatch()
    const rootState = useSelector((state: RootState) => state);
    const loginState = rootState.login;
    const feedState = rootState.feed;

    const getFeed = async () => {
        dispatch({ type: GET_FEED_REQUEST, payload: { token: token || loginState.token } })
    }
    useEffect(() => {
        getFeed();
        return () => {
            dispatch({ type: GET_FEED_INIT });
            dispatch({ type: LOGIN_INIT });
        }
    }, [])
    return (
        <>
            {
                !loginState.mbti ?
                    <Tendency /> :
                    <BottomNavigation />

            }
        </>
    )
}

export default function NavController({ token, setToken }: Props) {
    const rootState = useSelector((state: RootState) => state)
    const feedState = rootState.feed
    const loginState = rootState.login;
    const loginController = loginState.isLogin || token
    if(feedState.err || loginState.isLogin) {
        setToken('')
    }
    useEffect(() => {
    }, [])
    return (
        <>
            {!loginController ?
                <AuthNavigation />
                :
                <TendencyController token={token} />
            }
        </>
    )
}

