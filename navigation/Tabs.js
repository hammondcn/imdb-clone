import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Movies from '../screen/Movies'
import Tv from '../screen/Tv'
import Search from '../screen/Search'
import { COLOR_BLACK, COLOR_GREY, COLOR_YELLOW } from '../color'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const isDark = useColorScheme() === 'dark'

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: COLOR_BLACK,
      }}
      initialRouteName="Tv"
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? COLOR_BLACK : COLOR_GREY,
        },
        tabBarActiveTintColor: isDark ? COLOR_YELLOW : COLOR_BLACK,
        tabBarInactiveTintColor: isDark ? COLOR_GREY : '#808e9b',
        headerStyle: {
          backgroundColor: isDark ? COLOR_BLACK : COLOR_GREY,
        },
        headerTitleStyle: {
          color: isDark ? COLOR_YELLOW : COLOR_BLACK,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
