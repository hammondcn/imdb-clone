import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Movie, TV } from '../api';

const Container = styled.View`
	align-items: center;
`;

const Title = styled.Text`
	color: white;
	font-size: 14px;
	margin-top: 7px;
	margin-bottom: 5px;
`;

const Vote = styled.Text`
	color: white;
	opacity: 0.8;
	font-size: 12px;
`;

interface VMovieProps {
	posterPath: string;
	title: string;
	voteAverage: number;
	fullData: Movie | TV;
}

const VMedia: React.FC<VMovieProps> = ({
	posterPath,
	title,
	voteAverage,
	fullData
}) => {
	const navigation = useNavigation();
	const goToDetail = () => {
		navigation.navigate('Stack', {
			screen: 'Detail',
			params: {
				...fullData
			}
		});
	};
	return (
		<TouchableOpacity onPress={goToDetail}>
			<Container>
				<Poster posterPath={posterPath} />
				<Title>
					{title?.slice(0, 11)}
					{title?.length > 11 ? '...' : null}
				</Title>
				<Votes votes={voteAverage} />
			</Container>
		</TouchableOpacity>
	);
};

export default VMedia;
