import { MD3LightTheme } from 'react-native-paper';
import Colors from './Colors';

const CustomTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: Colors.primary, // Màu chính
        accent: Colors.accent, // Màu nhấn
        background: Colors.background, // Màu nền
        surface: Colors.surface, // Màu bề mặt
        text: Colors.text, // Màu chữ
        error: Colors.error, // Màu lỗi
       },
    roundness: 2, // Độ bo góc
};
export default CustomTheme;
