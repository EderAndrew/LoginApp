import { useState } from 'react';
import {AuthContent} from '../components/Auth/AuthContent';
import { ILogin } from '../models/interfaces/ILogin';
import { createUser, login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const loginHandler = async ({email, password}:ILogin) => {
    setIsAuthenticating(true)
    try{
      await login(email, password)
    }catch(err){
      Alert.alert(
        'Authentication failed', 
        'Could not log you in - please check your credentials or try again later!'
      )
    }
    setIsAuthenticating(false)
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Logging you in..."/>
  }
  
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;