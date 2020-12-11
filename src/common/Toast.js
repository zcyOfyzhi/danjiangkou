import Toast from 'react-native-root-toast';

const hint = params => {
    Toast.show(params, {
        position: Toast.positions.CENTER,
        opacity: 0.7,
        textColor: `white`
    });
};

export default hint;
