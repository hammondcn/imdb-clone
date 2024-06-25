import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './Tabs'
import Stacks from './Stack'

const Nav = createNativeStackNavigator()

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
    <Nav.Screen name="tabs" component={Tabs}></Nav.Screen>
    <Nav.Screen name="Stack" component={Stacks}></Nav.Screen>
  </Nav.Navigator>
)

export default Root
