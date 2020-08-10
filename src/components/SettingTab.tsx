import React, { useRef, useState, useEffect } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import { ThemeProps } from '../style/theme';

type Props = {
    text: string;
    children?: React.ReactNode;
}

const TouchableOpacity = styled.TouchableOpacity`
    width:100%;
`;

const ModalTab = styled.View`
    width:100%;
    height:64px;
    padding-left:16px;
    justify-content:center;
    box-shadow:0px 1px 2px #000;
    border-radius:8px;
    background-color:white;
    elevation:6;
    margin-bottom:7px;
`;

const ModalTabText = styled.Text`
    font-size:12px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
`;

const SettingWrapper = styled.View`
    width:100%;
`;

const SettingTab = ({ text, children }: Props) => {
    const toggle = useRef(new Animated.Value(0)).current;
    const [display, setDisplay] = useState<boolean>(false);

    const animationStyle = {
        width: '100%',
        height: toggle,
        backgroundColor: '#ffffff',
        overflow: 'hidden'
    }

    const toggleTab = () => {
        setDisplay(!display)
    }

    useEffect(() => {
        let toValue = display ? 200 : 0;
        Animated.timing(toggle, {
            toValue,
            duration: 300
        }).start();
    }, [display])
    return (
        <>
            <TouchableOpacity onPress={toggleTab}>
                <ModalTab>
                    <ModalTabText>{text}</ModalTabText>
                </ModalTab>
            </TouchableOpacity>
            <SettingWrapper>
                <Animated.View onStartShouldSetResponder={() => true} style={animationStyle} >
                    {children && children}
                </Animated.View>
            </SettingWrapper>
        </>
    )
}

export default SettingTab
