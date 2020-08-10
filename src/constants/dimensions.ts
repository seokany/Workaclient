import { Dimensions, Platform, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('screen');
export const HEIGHT: number = height - (StatusBar.currentHeight || 0);

