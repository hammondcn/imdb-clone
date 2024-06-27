import { useEffect } from 'react';
import styled from 'styled-components/native';
import { Movie, TV, moviesApi, tvApi } from '../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet } from 'react-native';
import { buildImgPath } from '../utils';
import { COLOR_BLACK } from '../color';
import { LinearGradient } from 'expo-linear-gradient';
import Poster from '../components/Poster';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
	height: ${SCREEN_HEIGHT / 4}px;
	justify-content: flex-end;
	padding: 0 20px;
`;

const Background = styled.Image``;

const Row = styled.View`
	flex-direction: row;
	width: 70%;
`;

const Title = styled.Text`
	color: white;
	font-size: 36px;
	align-self: flex-end;
	margin-left: 15px;
	font-weight: 500;
`;

const Data = styled.View`
	padding: 0px 20px;
`;

const Overview = styled.Text`
	color: ${(props) => props.theme.textColor};
	margin: 20px 0;
`;

const VideoBtn = styled.TouchableOpacity`
	flex-direction: row;
`;

const BtnText = styled.Text`
	color: white;
	line-height: 24px;
	margin-left: 15px;
`;

type RootStackParamList = {
	Detail: Movie | TV;
};

type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const openYTLink = async (videoID: string) => {
	const VIDEO_URL = 'https://m.youtube.com/watch?v=${videoID}';
	await WebBrowser.openBrowserAsync(VIDEO_URL);
};

const Detail: React.FC<DetailProps> = ({
	navigation: { setOptions },
	route: { params }
}) => {
	const isMovie = 'original_title' in params;
	const { isLoading, data } = useQuery(
		[isMovie ? 'movies' : 'tv', params.id],
		isMovie ? moviesApi.detail : tvApi.detail
	);

	useEffect(() => {
		setOptions({
			title: 'original_title' in params ? 'Movie' : 'TV'
		});
	}, []);

	return (
		<Container>
			<Header>
				<Background
					style={StyleSheet.absoluteFill}
					source={{ uri: buildImgPath(params.backdrop_path || '') }}
				/>

				<LinearGradient
					colors={['transparent', COLOR_BLACK]}
					style={StyleSheet.absoluteFill}
				/>
				<Row>
					<Poster posterPath={params.poster_path || ''} />
					<Title>
						{'original_name' in params
							? params.original_name
							: params.original_title}
					</Title>
				</Row>
			</Header>
			<Data>
				<Overview>{params.overview}</Overview>
				{console.log(data)}
				{isLoading ? <Loader /> : null}
				{data?.videos?.results.slice(0, 15).map((video) => {
					return video.site === 'YouTube' ? (
						<VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
							<Ionicons name="logo-youtube" color="white" size={24} />
							<BtnText>
								{video.name.slice(0, 40)}
								{video.name.length > 20 ? '...' : ''}
							</BtnText>
						</VideoBtn>
					) : null;
				})}
			</Data>
		</Container>
	);
};

export default Detail;
