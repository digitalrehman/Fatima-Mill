import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/AppText';
import {APPCOLORS} from '../../utils/APPCOLORS';
import AppInput from '../../components/AppInput';
import {responsiveFontSize, responsiveHeight} from '../../utils/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppButton from '../../components/AppButton';
import {useDispatch} from 'react-redux';
import {CurrentLogin, setLoader} from '../../redux/AuthSlice';
import Toast from 'react-native-toast-message';
import BaseUrl from '../../utils/BaseUrl';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const loginUser = () => {
    if (username == '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter a username',
      });
      return;
    } else if (password == '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter a password',
      });
      return;
    }

    dispatch(setLoader(true))
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BaseUrl}users.php`,
      headers: {},
    };

    dispatch(CurrentLogin({config, username, password}));

  };
  return (
    <LinearGradient
      colors={['#0784B5', '#9BD4E4']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: responsiveHeight(15),
      }}>
      <AppText
        title="DeSolutions"
        titleSize={4}
        titleWeight
        titleColor={APPCOLORS.WHITE}
      />

      <View style={{gap: 20}}>
        <AppInput
          logo={
            <Ionicons
              name={'person'}
              size={responsiveFontSize(2)}
              color={APPCOLORS.WHITE}
            />
          }
          placeHolder="Username"
          onChangeText={res => setUsername(res)}
          value={username}
          txtColor={APPCOLORS.WHITE}
        />
        <AppInput
          logo={
            <FontAwesome5
              name={'key'}
              size={responsiveFontSize(2)}
              color={APPCOLORS.WHITE}
            />
          }
          placeHolder="Password"
          onChangeText={res => setPassword(res)}
          value={password}
          txtColor={APPCOLORS.WHITE}
          secureTextEntry={true}
        />
       
      </View>

      <AppButton title="Login" onPress={() =>loginUser()} />
    </LinearGradient>
  );
};

export default Login;
