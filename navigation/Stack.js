import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';
import Detail from '../screen/Detail';
import { useColorScheme } from 'react-native';
import { COLOR_BLACK, COLOR_GREY, COLOR_YELLOW } from '../color';

const Stack = createNativeStackNavigator();

const Stacks = () => {
	const isDark = useColorScheme() === 'dark';

	return (
		<Stack.Navigator
			// target all screen
			screenOptions={{
				animation: 'modal',
				headerBackTitleVisible: false,
				headerStyle: {
					backgroundColor: isDark ? COLOR_BLACK : COLOR_GREY
				},
				headerTitleStyle: {
					color: isDark ? COLOR_YELLOW : COLOR_BLACK
				}
			}}
		>
			<Stack.Screen name="Detail" component={Detail} />
		</Stack.Navigator>
	);
};

export default Stacks;
