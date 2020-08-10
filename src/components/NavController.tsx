import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AuthNavigation from '../navigator/AuthNavigation';
import BottomNavigation from '../navigator/BottomNavigation'
import Tendency from '../screens/Tendency/Select'

import { RootState } from '../reducers';
import { LOGIN_SUCCESS } from "../reducers/login";
import { LoginInfo } from "../../App";
import { GET_FEED_REQUEST } from "../state/Feed/Action";

type TendencyProps = {
    mbti: string;
    token: string;
}

type Props = {
    token: string
}

function TendencyController({ token, mbti }: TendencyProps) {
    const dispatch = useDispatch()
    const rootState = useSelector((state: RootState) => state);
    const loginState = rootState.login;
    const feedState = rootState.feed;
    useEffect(() => {
        console.log("DISPATCH FEED REQUEST");
        dispatch({ type: GET_FEED_REQUEST, payload: { token: token || loginState.token } })
    }, [])
    return (
        <>
            {!mbti || !loginState.mbti ? <Tendency /> : <BottomNavigation />}
        </>
    )
}

export default function NavController({ token }: Props) {
    const rootState = useSelector((state: RootState) => state)
    const loginState = rootState.login;
    const loginController = loginState.isLogin || token
    return (
        <>
            {!loginController ?
                <AuthNavigation />
                :
                <TendencyController token={token} mbti={loginState.mbti} />
            }
        </>
    )
}

