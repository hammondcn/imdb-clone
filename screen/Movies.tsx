import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

import styled from 'styled-components/native'
import Slide from '../components/Slide'
import Poster from '../components/Poster'


const Container = styled.ScrollView`
  flex: 1;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`

const Title = styled.Text`
  color: white;
  font-size:14px;
  margin-top: 7px;
  margin-bottom: 5px;
`


const Vote = styled.Text`
  color: white;
  opacity: .8;
  font-size: 12px;
`

const ComingScroll = styled.ScrollView``

const HMovie = styled.View`
  padding: 0 20px;
  flex-direction: row;
  margin-top: 20px;
`

const Column = styled.View`
  margin-left: 15px;
  width: 80%;

`

const Release = styled.Text`
  color: white;
  opacity: .8;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 7px;
`

const Overview = styled.Text`
   color: white;
  opacity: .8;
  width: 80%;

`


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

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
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
        <Movie>
          <Poster key={movie.id} posterPath={movie.poster_path}/>
          <Title>
            {movie.title.slice(0,13)}
            {movie.title.length > 13 ? "..." : null}
          </Title>
          <Vote>{movie.vote_average > 0 ? `⭐️ ${movie.vote_average.toFixed(1)} / 10` : 'coming soon'}</Vote>
        </Movie>
      ))}</TrendingScroll>
      <ListTitle>Coming Soon</ListTitle>
      <ComingScroll horizontal={false}>
      {upComing.map(movie => (
        <HMovie>
          <Poster posterPath={movie.poster_path}/>
          <Column>
          <Title>{movie.title}</Title>
          <Release>{new Date(movie.release_date).toLocaleDateString("cn",{month: 'short', day: 'numeric', year: 'numeric'})}</Release>
          <Overview>{movie.overview !== '' && movie.overview.length > 100 ? movie.overview.slice(0,100) + '...' : movie.overview}</Overview>
          </Column>
        </HMovie>
      ))}
      </ComingScroll>
    </Container>
  )
}

export default Movies
