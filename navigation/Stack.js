import { createNativeStackNavigator } from '@react-navigation/native-stack'
import styled from 'styled-components'

const Stack = createNativeStackNavigator()

const Title = styled.Text`
  color: 'teal';
`

const profile = <Title>Home</Title>

const Stacks = () => (
  <Stack.Navigator
    // target all screen
    screenOptions={{
      animation: 'flip',
    }}
  >
    <Stack.Screen name="Home" component={profile} />
  </Stack.Navigator>
)

export default Stacks
