import {
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState([]);

	const signOutUser = () => {
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};

	useEffect(() => {
		const unsubscribe = db
			.collection("signal-clone_chats")
			.onSnapshot((snapshot) =>
				setChats(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return unsubscribe;
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "white" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<View
					style={{
						marginRight: 10,
						marginLeft:
							Platform.OS !== "ios" && Platform.OS !== "android"
								? 20
								: 0,
					}}
				>
					<TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
						<Avatar
							rounded
							source={{ uri: auth?.currentUser?.photoURL }}
						/>
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginRight:
							Platform.OS !== "ios" && Platform.OS !== "android"
								? 30
								: 10,
						width: 70,
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name="camerao" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("AddChat")}
						activeOpacity={0.5}
					>
						<SimpleLineIcons
							name="pencil"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{chats.map(({ id, data: { chatName } }) => (
					<CustomListItem
						key={id}
						id={id}
						chatName={chatName}
						enterChat={enterChat}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
