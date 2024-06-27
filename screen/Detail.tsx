import { useEffect } from 'react';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
	useEffect(() => {
		setOptions({
			title: params.title ?? params.originTitle
		});
	}, []);

	return <Container></Container>;
};

export default Detail;
