
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Image, SafeAreaView } from "react-native";
import { H2, H3, H4 } from "../components/atoms/Title";
import { Column, Row } from "../components/atoms/Layout";
import { Link } from "@react-navigation/native";

const TMDB_API_KEY = "386be5b03d987a7a051e638ea975f40a"

export default function Detail() {

  // 훅으로 구성하면 좋은 것 같다.
  const [page, setPage] = useState(1);
  const goNextPage = () => setPage(page + 1);
  const goPrevPage = () => page != 1 && setPage(page - 1);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko&page=${page}`,
    }).then((response) => {
      setPopularMovieList(response.data.results);
    })
    
    if(page % 3 == 1) {
      setPageNumbers(Array.from({length: 3},(_,i) => i + page))
    } else if (page % 3 == 0) {
      setPageNumbers(Array.from({length: 3},(_,i) => i + (page - 2)))
    }
  },[page])

  const [popularMovieList, setPopularMovieList] = useState(); 
  const [pageNumbers,setPageNumbers] = useState(Array.from({length: 3},(_,i) => i + 1))
  // console.log(pages)

  return <View 
            style={{backgroundColor: "black", flex: 1}}>
          
          <Row style={{alignItems:"center",flex: 1}}>
            <H2> 흥행 중인 영화 🤟</H2>
          </Row>

          <View style={{flex: 12}}>
            <FlatList
                  style={{marginVertical: 4}}
                  numColumns={2}
                  data={popularMovieList}
                  renderItem={(movie) => {
                    return (
                      <Column style={{marginRight: 12, marginVertical: 12}}>
                          <Link to={{screen: "Movie", params: {selected : movie}}}>
                          <Image
                              source={{uri:"https://image.tmdb.org/t/p/w200" + movie.item.poster_path}}
                              resizeMode='contain'
                              style={{height: 300, width: 200}}
                              />
                          </Link>
                              <H3 style={{textAlign: "center", width: 200, marginVertical: 4}}>{movie.item.title}</H3>
                              <H4 color="yellow" style={{textAlign:"center",width: 200}}>★ {movie.item.vote_average}</H4>
                        </Column>
                  )}}/>
          </View>


          <Row justify="space-around" style={{alignItems:"flex-start",width: "100%",marginTop: 8, flex: 2}}>
            <H4 color="skyblue" onPress={goPrevPage}>〈 이전 페이지</H4>
            {pageNumbers.map((pageNumber) => 
              <H4 
                color={pageNumber == page ? "white" : "gray"}
                onPress={() => setPage(pageNumber)}>
                  {pageNumber}
              </H4>
              )}
            <H4 color="skyblue" onPress={goNextPage}>다음 페이지 〉</H4>
          </Row>
  </View>;
}
