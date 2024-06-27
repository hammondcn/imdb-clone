import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import { RefreshControl, ScrollView } from 'react-native';

import HList from '../components/HList';

const Tv = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const { isLoading: todayLoading, data: todayData } = useQuery(
		['tv', 'today'],
		tvApi.airingToday
	);
	const { isLoading: topLoading, data: topData } = useQuery(
		['tv', 'top'],
		tvApi.topRated
	);
	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		['tv', 'trending'],
		tvApi.trending
	);
	const loading = todayLoading || topLoading || trendingLoading;

	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(['tv']);
		setRefreshing(false);
	};

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
