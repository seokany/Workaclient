import { SetStateAction } from "react";

const validCheck = (type: string) => (state: string, setState: React.Dispatch<SetStateAction<string>>): void => {
    console.log('validCheck');
    if (type === 'email') {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(state).toLowerCase()) ? setState('') : setState('email 타입이 올바르지 않습니다.');
    } else if (type === 'username') {
        state.length >= 5 ? setState('') : setState('username은 5글자 이상입니다.');
    } else if (type === "password") {
        state.length >= 8 ? setState('') : setState('password 는 8글자 이상입니다.');
    } else if (type === 'year') {
        state.length === 4 ? setState('') : setState('not YYYY');
    } else if (type === 'month') {
        state.length === 2 ? setState('') : setState("not MM");
    } else if (type === 'day') {
        state.length === 2 ? setState('') : setState("mpt DD");
    } else if (type === 'url') {
        // const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        // '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        // '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        // '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        // '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        // '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        // pattern.test(String(state))? setState('') : setState('페이지 주소가 올바르지 않습니다.');
        const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        regex.test(String(state).toLowerCase()) ? setState(''): setState('페이지 주소를 정확히 써주세요.')
    }
}
export default validCheck