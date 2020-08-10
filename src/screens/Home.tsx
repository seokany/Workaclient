import React from 'react'
import styled from 'styled-components/native'
import { TopTapParamList } from '../navigator/TopNavigation'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'


type HomeTopNavigationProp = MaterialTopTabNavigationProp<TopTapParamList, 'News'>;

    // type Props = {
    //     navigation: HomeTopNavigationProp;
    // }


const Text = styled.Text`
    font-size: 100px;
    align-items: center;
`

function Home() {
    return (
        <Text >Hello</Text>
    )
}


export default Home