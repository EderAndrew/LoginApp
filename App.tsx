import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './src/constants/styles';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { RootStackParamList } from './src/models/types/RootStackParamList';
import AuthContextProvider, { AuthContext } from './src/store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './src/components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen'


const Stack = createStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight:({tintColor}) => <IconButton icon="exit" color={tintColor as string} size={24} onPress={authCtx!.logout}/>
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authCtx?.isAuthenticated &&<AuthStack />}
      {authCtx?.isAuthenticated &&<AuthenticatedStack />}
    </NavigationContainer>
  );
}
const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    (async() => {
        const storedToken = await AsyncStorage.getItem('authToken')

        if(storedToken){
           authCtx?.authenticate(storedToken)
        }
        
        setIsTryingLogin(false)
    })()
  },[])

  /* if(isTryingLogin){
    SplashScreen.preventAutoHideAsync()
  } */

  return <Navigation />
}
export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}