import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, RefreshControl } from 'react-native'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import Slide from '../components/Slide'
import HMedia from '../components/HMedia'
import VMovie from '../components/VMedia'
import Loader from '../components/Loader'


const Container = styled.ScrollView`
  flex: 1;
`



const { height: SCREEN_HEIGHT } = Dimensions.get('window')


const ListTitle = styled.Text`
  color:white;
  font-size:18px;
  font-weight:600;
  margin-top:20px;
  margin-start: 20px;
`

const TrendingScroll = styled.ScrollView`
  padding-start: 20px;
  padding-top: 10px;
`



const ComingScroll = styled.ScrollView``




const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmI1ZWRjZjZlYmEwMGIwOThjMjkzMjBlYzNhYzRiNyIsIm5iZiI6MTcxOTMxMzk2My41NDkwOTcsInN1YiI6IjY2N2FhNTNjMDhiODY1ZTAzNDVhMzJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wh92Hh3-T5x04QYqJJTwfV5wdMsvl9eSQodXgOQC5jw',
  },
}

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loading, setLoading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState([])
  const [upComing, setUpComing] = useState([])
  const [trending, setTrending] = useState([])
  

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        options
      )
    ).json();

    setNowPlaying(results);

  }
  const getUpComing = async () => {
    const { results } = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        options
      )
    ).json();

    setUpComing(results);

  }
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
        options
      )
    ).json();

    setTrending(results);

  }

  const getData = async () => {
    await Promise.all(getNowPlaying(),getUpComing(),getTrending())
    setLoading(false)
  }


  useEffect(() => {
    getData()
  }, [])

  const handlrRefresh = async() => {
    setIsRefreshing(true)
    await getData()
    setIsRefreshing(false)
  }

  return loading ? (
    <Loader/>
  ) : (
    <Container 
      refreshControl={
        <RefreshControl onRefresh={handlrRefresh} refreshing={isRefreshing}/>
      }
    >
      <Swiper
        containerStyle={{ height: SCREEN_HEIGHT / 4 }}
        horizontal={true}
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originTitle={movie.title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll horizontal showsHorizontalScrollIndicator={false} >{trending.map(movie => (
        <VMovie 
          key={movie.id} 
          posterPath={movie.poster_path}
          title={movie.title}
          voteAverage={movie.vote_average}
        />
      ))}</TrendingScroll>
      <ListTitle>Coming Soon</ListTitle>
      <ComingScroll horizontal={false}>
      {upComing.map(movie => (
        <HMedia 
          posterPath={movie.poster_path}
          title={movie.title}
          releaseDate={movie.release_date}
          overview={movie.overview}
        />
      ))}
      </ComingScroll>
    </Container>
  )
}

export default Movies
