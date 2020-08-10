import React, { useState, useEffect } from 'react'
import { Animated, Dimensions, Easing } from 'react-native'
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient'

type card = {
    colors: string[];
}

const Wrapper = styled.View`
    position:absolute;
    width:100%;
    height:100%;
    align-items:center;
    padding:20px;
    background-color:rgba(101, 101, 101, 0.4)
`;

const AnimationWrapper = styled.View`
    position:absolute;
    height:200px;
`;
const Loading = () => {
    const height = Dimensions.get('screen').height;
    const [slideUp] = useState(new Animated.Value(height * 0.3));
    const [cards, setCards] = useState([
        { colors: ["#90D40D", "#CFFB45"] },
        { colors: ["#E15807", "#FD9C1F"] },
        { colors: ["#202020", "#434343"] },
        { colors: ["#11A8D3", "#5ADCFC"] },
        { colors: ["#C70221", "#F53E83"] }
    ])
    const widthHeight = [['46.5%', '72%'], ['43.5%', '79%'], ['40%', "86%"], ['35%', '93%']]
    useEffect(() => {
        Animated.sequence([
            Animated.timing(slideUp, {
                toValue: height,
                duration: 1500,
            }),
            Animated.timing(slideUp, {
                toValue: height * 0.3,
                duration: 0
            })
        ]).start(() => {
            const newCards = cards.map((el) => ({ colors: [...el.colors] }))
            const popCards: card = newCards.pop() || { colors: ["black", "white"] }
            newCards.unshift(popCards);
            setCards(newCards);
        })
    }, [cards]);
    return (
        <Wrapper>
            {cards.map((card, idx) => {
                if (idx < 4) {
                    return (
                        <AnimationWrapper style={{ bottom: widthHeight[idx][0], width: widthHeight[idx][1] }} key={`card${idx}`}>
                            <LinearGradient colors={card.colors} start={[1, 0]} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                        </AnimationWrapper>
                    )
                }
                return (
                    <Animated.View style={{ bottom: slideUp, width: '100%', position: 'absolute', height: 200 }} key={`card${idx}`}>
                        <LinearGradient colors={card.colors} start={[1, 0]} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                    </Animated.View>
                )
            })}
        </Wrapper>
    )
}

export default Loading
