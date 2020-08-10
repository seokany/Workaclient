import React from 'react'
import { useSelector } from 'react-redux'

import AuthNavigation from '../navigator/AuthNavigation';
import BottomNavigation from '../navigator/BottomNavigation'
import Tendency from '../screens/Tendency/Select'

import { RootState } from '../reducers';

type TendencyProps = {
    mbti: string;
    isSkip: boolean;
}

type Props = {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function TendencyController({ mbti, isSkip }: TendencyProps) {
    return (
        <>
            {!isSkip && mbti === "" ? <Tendency /> : <BottomNavigation />}
        </>
    )
}

export default function NavController({ isLogin, setIsLogin }: Props) {
    const rootState = useSelector((state: RootState) => state)
    const loginState = rootState.login;
    // if (!isLogin) {
    //     setIsLogin(loginState.isSkip || loginState.isLogin);
    // }

    const loginController = isLogin || loginState.isSkip || loginState.isLogin
    return (
        <>
            {!loginController ?
                <AuthNavigation />
                :
                <TendencyController mbti={loginState.mbti} isSkip={loginState.isSkip} />
            }
        </>
    )
}

