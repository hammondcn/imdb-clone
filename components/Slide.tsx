import { BlurView } from 'expo-blur';
import React from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme
} from 'react-native';
import styled from 'styled-components/native';
import { buildImgPath } from '../utils';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/native';

const View = styled.View`
	flex: 1;
`;

const BgImg = styled.Image`
	flex: 1;
`;

const Wrapper = styled.View`
	flex-direction: row;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const Column = styled.View`
	margin-left: 15px;
	width: 50%;
`;

const Title = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: white;
	align-items: center;
	justify-content: center;
`;
const Overview = styled.Text`
	color: rgba(255, 255, 255, 0.8);
	margin-top: 10px;
`;

interface slideProps {
	backdropPath: string;
	posterPath: string;
	originTitle: string;
	voteAverage: number;
	overview: string;
}

const Slide: React.FC<slideProps> = ({
	backdropPath,
	posterPath,
	originTitle,
	voteAverage,
	overview
}) => {
	const isDark = useColorScheme() === 'dark';
	const navigation = useNavigation();

	const goToDetail = () => {
		navigation.navigate('Stack', {
			screen: 'Detail',
			params: {
				originTitle
			}
		});
	};

	return (
		<TouchableWithoutFeedback onPress={goToDetail}>
			<View style={{ width: '100%', justifyContent: 'center' }}>
				<BgImg
					source={{ uri: buildImgPath(backdropPath, 'w500') }}
					style={StyleSheet.absoluteFill}
				/>
				<BlurView
					tint={isDark ? 'dark' : 'light'}
					intensity={60}
					style={StyleSheet.absoluteFill}
				>
					<Wrapper>
						<Poster posterPath={posterPath} />
						<Column>
							<Title>{originTitle}</Title>
							<Votes votes={voteAverage} />
							<Overview>{overview.slice(0, 100)}...</Overview>
						</Column>
					</Wrapper>
				</BlurView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Slide;
