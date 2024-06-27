import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HMovie = styled.View`
	padding: 0 20px;
	flex-direction: row;
`;

const Column = styled.View`
	margin-left: 15px;
	width: 80%;
`;

const Title = styled.Text`
	color: white;
	font-size: 14px;
	margin-top: 7px;
	margin-bottom: 5px;
`;

const Release = styled.Text`
	color: white;
	opacity: 0.8;
	font-size: 12px;
	margin-top: 5px;
	margin-bottom: 7px;
`;

const Overview = styled.Text`
	color: white;
	opacity: 0.8;
	width: 80%;
`;

interface HMediaProps {
	posterPath: string;
	title: string;
	releaseDate?: string;
	voteAverage?: number;
	overview: string;
}

const HMedia: React.FC<HMediaProps> = ({
	posterPath,
	title,
	releaseDate,
	voteAverage,
	overview
}) => {
	const navigation = useNavigation();
	const goToDetail = () => {
		navigation.navigate('Stack', {
			screen: 'Detail',
			params: {
				title
			}
		});
	};
	return (
		<TouchableOpacity onPress={goToDetail}>
			<HMovie>
				<Poster posterPath={posterPath} />
				<Column>
					<Title>{title}</Title>
					{releaseDate ? (
						<Release>
							{new Date(releaseDate).toLocaleDateString('cn', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}
						</Release>
					) : null}
					{voteAverage ? <Votes votes={voteAverage} /> : null}
					<Overview>
						{overview !== '' && overview.length > 100
							? overview.slice(0, 100) + '...'
							: overview}
					</Overview>
				</Column>
			</HMovie>
		</TouchableOpacity>
	);
};

export default HMedia;
