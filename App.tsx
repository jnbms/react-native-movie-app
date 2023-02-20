// import { Divider } from 'react-native-elements';
import { DefaultTheme, Link, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {H1} from './components/atoms/Title';

import {Provider as RootProvider} from "react-redux";
import store from './redux/store/store';

import Home from './Pages/Home';
import Movie from './Pages/Movie';
import Detail from './Pages/Detail';
import Genre from "./Pages/Genre";

// 
import GlobalLayout from './Pages/_layout';

// 스택 네비게이터 사용
const Stack = createNativeStackNavigator();
const TMDB_API_KEY = "386be5b03d987a7a051e638ea975f40a"

// 컴포넌트 목록으로 등록해야 한다.
const Head = () => <H1 color="red">MOVIES</H1>

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerTitle: Head, headerStyle: { backgroundColor: "black" }, animation: "simple_push"}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Movie' component={Movie}/>
        <Stack.Screen name='Detail' component={Detail}/>
        <Stack.Screen name='Genre' component={Genre}/>

    </Stack.Navigator>
  </NavigationContainer>
);

export default () => {
  return(
  <SafeAreaProvider>
    <SafeAreaView style={{backgroundColor:"black"}}>
      <StatusBar style="light" />
    </SafeAreaView>
    
    <RootProvider store={store}>
      <Router/>       
    </RootProvider>

  </SafeAreaProvider>
  );
}  



// 사이즈 상의 문제와 두번 릴로드로 동작하는 문제 해결하기. flex 개념으로 공간 분할을 파악하고 스크롤이 어느정도 되는 지 예상해보기