import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace("Home");
			}
		});

		return unsubscribe;
	}, []);

	const signIn = () => {
		auth.signInWithEmailAndPassword(email, password)
			.then(() => {
				navigation.replace("Home");
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<StatusBar style="light" />
			<Image
				source={{
					uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
				}}
				containerStyle={{
					width: 200,
					height: 200,
				}}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Email"
					autoFocus
					type="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					secureTextEntry
					type="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={signIn}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={signIn}
				title="Login"
			/>
			<Button
				onPress={() => navigation.navigate("Register")}
				containerStyle={styles.button}
				type="outline"
				title="Register"
			/>
			<View style={{ height: 100 }} />
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
	},
	inputContainer: {
		width: 300,
	},
	button: {
		width: 200,
		marginTop: 10,
	},
});
