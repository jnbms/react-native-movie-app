import { Link } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View, Image, Text, ScrollView } from "react-native";
import { Column, Row } from "../components/atoms/Layout";
import { H1, H2, H3, H4, P1 } from "../components/atoms/Title";

const TMDB_API_KEY = "386be5b03d987a7a051e638ea975f40a"

export default function Home() {

    useEffect(() => {
      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko&page=1`,
      }).then((response) => {
        setPopularMovieList(response.data.results);
      })
  
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=ko`)
        .then(response => setGenreList(response.data.genres))
        
        selectGenre(28);
        setSelectedGenre("액션")
    },[])

    const [searchQuery, setSearchQuery] = useState('');
    const onChnageText = (query: any) => setSearchQuery(query);
    
    const [popularMovieList, setPopularMovieList] = useState(); 
    const [genreList, setGenreList] = useState();

    const [sortedMovies, setsortedMovies] = useState();
    const selectGenre = (gernre: number) => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=ko&page=${page}&with_genres=${gernre}&include_adult=false`)
            .then(response => setsortedMovies(response.data.results))
    }
    const page = 2;


    const [selectedGenre, setSelectedGenre]= useState("");
    return (
          <ScrollView style={{backgroundColor: "black"}}>
           
            <Row align="center" height={48}>
            <H2>흥행 중인 영화</H2>
            <Text style={{marginHorizontal: 8}}/>
            <Link to={{screen: "Detail"}}>
              <P1 color="skyblue">
                자세히보기 👉
              </P1>
            </Link>
            </Row>
            <Column style={{marginVertical: 0}}>
              <FlatList
                horizontal={true}
                data={popularMovieList}
                renderItem={(movie) => {
                  return (
                      <Column style={{marginRight: 12, height: 364}}>
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
            </Column>

            <Row height={48}>
            <H2>장르별로 모아보기</H2>
            <Text style={{marginHorizontal: 8}}/>
            <Link to={{screen: "Genre"}}>
              <P1 color="skyblue">
                자세히보기 👉
              </P1>
            </Link>
            </Row>
          
            <FlatList
                style={{height: 32}}
                data={genreList}
                horizontal={true}
                renderItem={(genre) => (
                    <Column justify="center" height={32}>
                        <P1
                            style={{marginRight: 24, height: 24}}
                            color={selectedGenre == genre.item.name ? "white" : "gray"}
                            onPress={() => {
                                selectGenre(genre.item.id)
                                setSelectedGenre(genre.item.name)
                                }}>
                            {genre.item.name}
                        </P1>
                    </Column>
            )}/>
            <Column style={{marginVertical: 12, height: 364}}>
              <FlatList
                horizontal={true}
                extraData={sortedMovies}
                data={sortedMovies}
                renderItem={(movie) => {
                  return (
                      <Column align="center" style={{marginRight: 12, width: 200}}>
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
            
          </ScrollView>
    );
  }