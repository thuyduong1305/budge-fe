import Toast from 'react-native-toast-message';

export const successToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'success',
    text1: text1,
    text2: text2,
    visibilityTime: 1000,
    position: 'bottom',
  });
};

export const errorToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
    visibilityTime: 1000,
    position: 'bottom',
  });
};
