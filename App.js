import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Image, useColorScheme } from 'react-native';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { DarkTheme, lightTheme } from './theme';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from 'react-query';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
	images.map((image) => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.loadAsync(image);
		}
	});

export default function App() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				const fonts = loadFonts([Ionicons.font]);
				const assets = loadImages(['https://reactnative.dev/img/oss_logo.svg']);
				await Promise.all([...fonts, ...assets]);
			} catch (e) {
				// console.warn(e);
			} finally {
				setReady(true);
				SplashScreen.hideAsync();
			}
		}

		prepare();
	}, []);
	const isDark = useColorScheme() === 'dark';

	//  launch screen remain visible until it has been explicitly told hide
	if (!ready) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={isDark ? DarkTheme : lightTheme}>
				<NavigationContainer>
					<Root />
				</NavigationContainer>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
