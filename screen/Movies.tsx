import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import Loader from '../components/Loader';
import { useQuery, useQueryClient } from 'react-query';
import { Movie, MovieResponse, moviesApi } from '../api';
import HList from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListTitle = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 600;
	margin: 20px 0 10px 20px;
`;

const ComingSoonTitle = styled(ListTitle)``;

const HSeparator = styled.View`
	height: 20px;
`;

const movieKeyExtractor = (item: Movie) => item.id + '';

const renderHMedia = ({ item }: { item: Movie }) => (
	<HMedia
		posterPath={item.poster_path || ''}
		title={item.title}
		releaseDate={item.release_date}
		overview={item.overview}
		fullData={item}
	/>
);

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
	navigation: { navigate }
}) => {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const {
		isLoading: nowPlayingLoading,
		data: nowPlayingData,
		isRefetching: isRefetchingNowPlaying
	} = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);
	const {
		isLoading: upComingLoading,
		data: upComingData,
		isRefetching: isRefetchingUpComing
	} = useQuery<MovieResponse>(['movies', 'upComing'], moviesApi.upComing);
	const {
		isLoading: trendingLoading,
		data: trendingData,
		isRefetching: isRefetchingTrending
	} = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);
	const queryClient = useQueryClient();

	const loading = nowPlayingLoading || upComingLoading || trendingLoading;
	const isRefetching =
		isRefetchingNowPlaying || isRefetchingUpComing || isRefetchingTrending;
	console.log(isRefetching);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await queryClient.refetchQueries(['movies']);
		setIsRefreshing(false);
	};

	return loading ? (
		<Loader />
	) : (
		<FlatList
			onRefresh={handleRefresh}
			refreshing={isRefreshing}
			ListHeaderComponent={
				<>
					<Swiper
						containerStyle={{ height: SCREEN_HEIGHT / 4 }}
						horizontal={true}
						loop
						autoplay
						autoplayTimeout={3.5}
						showsButtons={false}
						showsPagination={false}
					>
						{(nowPlayingData || { results: [] }).results.map((movie) => (
							<Slide
								key={movie.id}
								backdropPath={movie.backdrop_path || ''}
								posterPath={movie.poster_path || ''}
								originTitle={movie.title}
								voteAverage={movie.vote_average}
								overview={movie.overview}
								fullData={movie}
							/>
						))}
					</Swiper>
					<HList title="Trending Movies" data={trendingData.results} />
					<ComingSoonTitle>Upcoming Movies</ComingSoonTitle>
				</>
			}
			data={upComingData?.results}
			renderItem={renderHMedia}
			keyExtractor={movieKeyExtractor}
			ItemSeparatorComponent={HSeparator}
		/>
	);
};

export default Movies;
