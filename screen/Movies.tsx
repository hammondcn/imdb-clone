import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, RefreshControl, View } from 'react-native'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import Slide from '../components/Slide'
import HMedia from '../components/HMedia'
import Loader from '../components/Loader'
import VMedia from '../components/VMedia'



const Container = styled.ScrollView`
  flex: 1;
`



const { height: SCREEN_HEIGHT } = Dimensions.get('window')


const ListTitle = styled.Text`
  color:white;
  font-size:18px;
  font-weight:600;
  margin: 20px 0 10px 20px;
`

const ComingSoonTitle = styled(ListTitle)`
  
`

const HSeparator = styled.View`
  height: 20px;
`



const TrendingScroll = styled.FlatList`
  padding-start: 20px;
  padding-top: 10px;
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
    await Promise.all([getNowPlaying(),getUpComing(),getTrending()])
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
    <FlatList 

      ListHeaderComponent={<>
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
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{paddingEnd: 20}}
        ItemSeparatorComponent={() => <View style={{width: 20}}/>}
        keyExtractor={(item) => item.id + ""}
        data={trending}
        renderItem={({item}) => (
          <VMedia 

            posterPath={item.poster_path}
            title={item.title}
            voteAverage={item.vote_average}
          />
        )}
      />
      <ComingSoonTitle>Upcoming Movies</ComingSoonTitle>

      </>}
      data={upComing}
      renderItem={({item}) => (
        <HMedia 
        posterPath={item.poster_path}
        title={item.title}
        releaseDate={item.release_date}
        overview={item.overview}
      />
      )}
      ItemSeparatorComponent={HSeparator}
      />
      

    

    
  )
}

export default Movies
