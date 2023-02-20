import React from "react";
import { Image, View, Text, Button} from "react-native";

export default function Movie(props: any){
    const selectedMovie = props.route.params.selected.item;
    const { goBack } = props.navigation
    return (
      <View style={{backgroundColor:"black",flex: 1}}>
        <Image
          source={{uri: "https://image.tmdb.org/t/p/w500" + selectedMovie.backdrop_path}}
          style={{height: 300}}
          resizeMode="contain"
        />
        <Text style={{color:"white",fontSize: 24, fontWeight: 'bold'}}>{selectedMovie.title}</Text>
        <Text style={{color:"white"}}>평점 : {selectedMovie.vote_average} 점</Text>
        <Text style={{color:"white"}}>{selectedMovie.overview}</Text>
  
        <Button
            onPress={() => goBack()}
            title="뒤로 가기"
        >
        </Button>
        <Button title="영화 예매하기" onPress={() => {}}/>
  
      </View>
    );
  }