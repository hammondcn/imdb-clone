import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import VMedia from './VMedia';

const ListContainer = styled.View`
	margin-left: 30px;
`;

const ListTitle = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 20px;
	margin-top: ${(props) => (props.$isTop ? 0 : '30px')};
`;

const HListSeparator = styled.View`
	width: 20px;
`;

interface HListProps {
	title: string;
	data: any[];
	$isTop?: boolean;
}

const HList: React.FC<HListProps> = ({ title, data, $isTop = false }) => (
	<ListContainer>
		<ListTitle $isTop={$isTop}>{title}</ListTitle>
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={HListSeparator}
			keyExtractor={(item) => item.id + ''}
			data={data}
			renderItem={({ item }) => (
				<VMedia
					posterPath={item.poster_path}
					title={item.title ?? item.original_name}
					voteAverage={item.vote_average}
				/>
			)}
		/>
	</ListContainer>
);

export default HList;
