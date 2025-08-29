import {useToast} from 'react-native-toast-notifications';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = message => {
    toast.show(message, {
      type: 'normal',
      placement: 'bottom',
      duration: 3000,
      offset: 30,
      animationType: 'zoom-in',
      zIndex: 11000,
    });
  };

  return {showToast};
};
