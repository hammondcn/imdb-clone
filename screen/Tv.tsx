import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import { RefreshControl, ScrollView } from 'react-native';

import HList from '../components/HList';

const Tv = () => {
	const queryClient = useQueryClient();
	const {
		isLoading: todayLoading,
		data: todayData,
		isRefetching: todayRefetching
	} = useQuery(['tv', 'today'], tvApi.airingToday);
	const {
		isLoading: topLoading,
		data: topData,
		isRefetching: topRefetching
	} = useQuery(['tv', 'top'], tvApi.topRated);
	const {
		isLoading: trendingLoading,
		data: trendingData,
		isRefetching: trendingRefetching
	} = useQuery(['tv', 'trending'], tvApi.trending);
	const loading = todayLoading || topLoading || trendingLoading;

	const onRefresh = () => {
		queryClient.refetchQueries(['tv']);
	};
	const refreshing = trendingRefetching || topRefetching || todayRefetching;

	console.log(refreshing);
	if (loading) {
		return <Loader />;
	}

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<HList title="today show" data={todayData.results} $isTop={true} />
			<HList title="top show" data={topData.results} />
			<HList title="trending show" data={trendingData.results} />
		</ScrollView>
	);
};

export default Tv;
