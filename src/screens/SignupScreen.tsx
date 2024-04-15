import { useState } from 'react';
import {AuthContent} from '../components/Auth/AuthContent';
import { ILogin } from '../models/interfaces/ILogin';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signupHandler = async ({email, password}:ILogin) => {
    setIsAuthenticating(true)
    try{
      await createUser(email, password)
    }catch(err){
      Alert.alert(
        'Authentication failed', 
        'Could not log you in - please check your credentials or try again later!'
      )
    }
    setIsAuthenticating(false)
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user..."/>
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;