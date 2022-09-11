import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
	headerStyle: { backgroundColor: "#2c6bed" },
	headerTitleStyle: { color: "white" },
	headerTintColor: "white",
};

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={globalScreenOptions}>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
