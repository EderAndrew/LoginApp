import { useContext, useState } from 'react';
import {AuthContent} from '../components/Auth/AuthContent';
import { ILogin } from '../models/interfaces/ILogin';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)

  const signupHandler = async ({email, password}:ILogin) => {
    setIsAuthenticating(true)
    try{
      const token = await createUser(email, password)
      authCtx?.authenticate(token)
    }catch(err){
      Alert.alert(
        'Authentication failed', 
        'Could not log you in - please check your credentials or try again later!'
      )
      setIsAuthenticating(false)
    }
    
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user..."/>
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;