import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack/src/index";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
	headerStyle: { backgroundColor: "#2c6bed" },
	headerTitleStyle: { color: "white" },
	headerTintColor: "white",
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions}>
				<Stack.Screen name="Login" component={LoginScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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
