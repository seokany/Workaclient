import React, { useState } from 'react';
import styled from 'styled-components/native';

import PopularTab from '../../../components/PopularTab';
import { TouchableOpacity, Modal } from 'react-native';
import { ThemeProps } from '../../../style/theme';

const Wrapper = styled.View`
    flex:1;
    align-items:center;
    padding:30px;
`;

const ModalBackground = styled.View`
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    background-color:rgba(112,112,112,0.8);
`;

const ModalWrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    height:80%;
    background-color:${({ theme }: ThemeProps): string => theme.white};
    align-items:center;
`;

const ModalTitleWrapper = styled.View`
    width:100%;
    align-items:center;
    padding:15px;
    background-color:${({ theme }: ThemeProps): string => theme.textColor};
`;

const ModalTitle = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.lgFont + 2}px;
    color:${({ theme }: ThemeProps): string => theme.white};
    font-weight:600;
`;

const ModalOnWrapper = styled.TouchableOpacity`
    width:100%;
    justify-content:center;
    align-items:center;
`;


const Text = styled.Text`
    font-size: 100px;
`

type modal = {
    onModal: boolean;
    title?: string;
}
const PopularFeed = () => {
    const [modal, setModal] = useState<modal>({ onModal: false, title: undefined });

    return (
        <Wrapper>
            <Modal visible={modal.onModal} transparent={true}>
                <TouchableOpacity onPress={() => setModal({ onModal: false, title: undefined })} style={{ flex: 1 }}>
                    <ModalBackground>
                        <ModalWrapper>
                            <ModalTitleWrapper>
                                <ModalTitle>{modal.title}</ModalTitle>
                            </ModalTitleWrapper>
                        </ModalWrapper>
                    </ModalBackground>
                </TouchableOpacity>
            </Modal>
            <ModalOnWrapper onPress={() => setModal({ onModal: true, title: '2020 고액 연봉 랭킹' })}>
                <PopularTab text={'2020 고액 연봉 랭킹'} />
            </ModalOnWrapper>
            <ModalOnWrapper onPress={() => setModal({ onModal: true, title: "연령별 관심직업" })}>
                <PopularTab text={"연령별 관심직업"} />
            </ModalOnWrapper>
            <ModalOnWrapper onPress={() => setModal({ onModal: true, title: "연령별 관심직업" })}>
                <PopularTab text={"연령별 관심직업"} />
            </ModalOnWrapper>
        </Wrapper>
    )
}

export default PopularFeed
