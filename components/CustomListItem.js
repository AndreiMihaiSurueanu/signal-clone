import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
	const [chatMessages, setChatMessages] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("signal-clone_chats")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setChatMessages(snapshot.docs.map((doc) => doc.data()))
			);

		return unsubscribe;
	}, []);

	return (
		<ListItem
			onPress={() => enterChat(id, chatName)}
			key={id}
			bottomDivider
		>
			<Avatar
				rounded
				source={{
					uri:
						chatMessages?.[0]?.photoURL ||
						"https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					{chatMessages?.[0]?.displayName}:{" "}
					{chatMessages?.[0]?.message}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create();
