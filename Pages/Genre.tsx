
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Image, SafeAreaView } from "react-native";
import { P1, H2, H3, H4 } from "../components/atoms/Title";
import { Column, Row } from "../components/atoms/Layout";
import { Link, useScrollToTop } from "@react-navigation/native";

const TMDB_API_KEY = "386be5b03d987a7a051e638ea975f40a"

export default function Genre() {

  const [page, setPage] = useState(1);
  const goNextPage = () => setPage(page + 1);
  const goPrevPage = () => page != 1 && setPage(page - 1);

  useEffect(() => {    
    if(page % 3 == 1) {
      setPageNumbers(Array.from({length: 3},(_,i) => i + page))
    } else if (page % 3 == 0) {
      setPageNumbers(Array.from({length: 3},(_,i) => i + (page - 2)))
    }
  },[page])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=ko`)
      .then(response => setGenreList(response.data.genres))
      setSelectedGenre(28) // 액션
  },[])

  const [selectedGenre, setSelectedGenre]: any = useState();
  
  useEffect(() => {

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=ko&page=${page}&with_genres=${selectedGenre}&include_adult=false`)
    .then(response => setsortedMovies(response.data.results))
  },[page, selectedGenre])


  const [popularMovieList, setPopularMovieList] = useState(); 
  const [pageNumbers,setPageNumbers] = useState(Array.from({length: 3},(_,i) => i + 1))

  const [genreList, setGenreList] = useState();
  const [sortedMovies, setsortedMovies] = useState();

  return <View style={{backgroundColor: "black", flex: 1}}>
          
          <Row style={{alignItems:"center",flex: 1}}>
            <H2> 장르별로 모아보기 🤟</H2>
          </Row>

        <View style={{flex: 0.6}}>
          <FlatList
                data={genreList}
                onScrollToTop={() => console.log("hello")}
                horizontal={true}
                renderItem={(genre) => (
                    <Column justify="center" height={32}>
                        <P1
                            style={{marginRight: 24, height: 24}}
                            color={selectedGenre == genre.item.id ? "white" : "gray"}
                            onPress={() => {
                                setSelectedGenre(genre.item.id)
                                setPage(1)
                            }}>
                            {genre.item.name}
                        </P1>
                    </Column>
            )}/>
        </View>

        <Column style={{marginBottom: 20, flex: 10}}>
              <FlatList
                // horizontal={true}
                numColumns={2}
                extraData={sortedMovies}
                data={sortedMovies}
                renderItem={(movie) => {
                  return (
                      <Column align="center" style={{marginRight: 12,marginBottom: 24, width: 200}}>
                        <Link to={{screen: "Movie", params: {selected : movie}}}>
                        <Image
                            source={{uri:"https://image.tmdb.org/t/p/w200" + movie.item.poster_path}}
                            resizeMode='contain'
                            style={{height: 300, width: 200}}
                        />
                        </Link>
                            <H3 style={{textAlign: "center", width: 200}}>{movie.item.title}</H3>
                            <H4 color="yellow" style={{textAlign:"center", width: 200,  marginVertical: 4}}>★ {movie.item.vote_average}</H4>
                      </Column>
                )}}/>
        </Column>


                    {/* 페이지 변경 */}
          <Row justify="space-around" style={{alignItems:"flex-start",width: "100%",marginTop: 8, flex: 1}}>
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
