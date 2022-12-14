import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerBackTitleVisible: false,
			headerTitleAlign: "left",
			headerTitle: () => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Avatar
						rounded
						source={{
							uri:
								messages[0]?.data.photoURL ||
								"https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg",
						}}
					/>
					<Text
						style={{
							color: "white",
							marginLeft: 10,
							fontWeight: "700",
						}}
					>
						{route.params.chatName}
					</Text>
				</View>
			),
			headerLeft: () =>
				Platform.OS !== "android" ? (
					<TouchableOpacity
						style={{
							marginLeft: 10,
						}}
						onPress={navigation.goBack}
					>
						<AntDesign name="arrowleft" size={24} color="white" />
					</TouchableOpacity>
				) : null,
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 70,
						marginRight:
							Platform.OS !== "ios" && Platform.OS !== "android"
								? 20
								: 10,
					}}
				>
					<TouchableOpacity>
						<FontAwesome
							name="video-camera"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name="call" size={24} color="white" />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation, messages]);

	const sendMessage = () => {
		Keyboard.dismiss();

		db.collection("signal-clone_chats")
			.doc(route.params.id)
			.collection("messages")
			.add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message: input,
				displayName: auth.currentUser.displayName,
				email: auth.currentUser.email,
				photoURL: auth.currentUser.photoURL,
			});

		setInput("");
	};

	useLayoutEffect(() => {
		const unsubscribe = db
			.collection("signal-clone_chats")
			.doc(route.params.id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return unsubscribe;
	}, [route]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={140}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView contentContainerStyle={{ paddingTop: 15 }}>
							{messages.map(({ id, data }) =>
								data.email === auth.currentUser.email ? (
									<View key={id} style={styles.receiver}>
										<Avatar
											position="absolute"
											// WEB
											containerStyle={{
												position: "absolute",
												bottom: -15,
												right: -5,
											}}
											bottom={-15}
											right={-5}
											rounded
											size={30}
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text style={styles.receiverText}>
											{data.message}
										</Text>
									</View>
								) : (
									<View key={id} style={styles.sender}>
										<Avatar
											position="absolute"
											containerStyle={{
												position: "absolute",
												bottom: -15,
												left: -5,
											}}
											bottom={-15}
											left={-5}
											rounded
											size={30}
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text style={styles.senderText}>
											{data.message}
										</Text>
										<Text style={styles.senderName}>
											{data.displayName}
										</Text>
									</View>
								)
							)}
						</ScrollView>
						<View style={styles.footer}>
							<TextInput
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
								placeholder="Signal Message"
								style={styles.textInput}
							/>
							<TouchableOpacity
								onPress={sendMessage}
								activeOpacity={0.5}
							>
								<Ionicons
									name="send"
									size={24}
									color="#2b68e6"
								/>
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	receiver: {
		padding: 15,
		backgroundColor: "#ECECEC",
		alignSelf: "flex-end",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	sender: {
		padding: 15,
		backgroundColor: "#2b68e6",
		alignSelf: "flex-start",
		borderRadius: 20,
		margin: 15,
		maxWidth: "80%",
		position: "relative",
	},
	senderText: {
		color: "white",
		fontWeight: "500",
		marginRight: 10,
		marginBottom: 15,
	},
	receiverText: {
		color: "black",
		fontWeight: "500",
		marginRight: 10,
	},
	senderName: {
		left: 10,
		paddingRight: 10,
		fontSize: 10,
		color: "white",
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		padding: 10,
		color: "gray",
		borderRadius: 30,
	},
});
