import { Alert } from 'react-native'

export const errorHandler = (err: number): void => {
    if (err === 400) {
        Alert.alert("WORKA!", '잘못된 요청입니다.')
    } else if (err === 500) {
        Alert.alert("WORKA!", '네트워크에러')
    } else if (err === 404) {
        Alert.alert("WORKA!", '페이지가 존재하지 않습니다.')
    } else if (err === 413) {
        Alert.alert("WORKA!", '파일이 너무 큽니다')
    } else if (err === 403) {
        Alert.alert("WORKA!", '접근권한이 없습니다')
    } else if (err === 405) {
        Alert.alert("WORKA!", '잘못된 메서드로 요청하였습니다')
    } else if (err === 408) {
        Alert.alert("WORKA!", '서버의 응답이 없습니다(Timeout)')
    } else if (err === 503) {
        Alert.alert("WORKA!", '서버가 과부화중')
    }
}