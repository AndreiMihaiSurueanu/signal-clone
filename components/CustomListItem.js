import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import React from "react";

const CustomListItem = ({ id, chatName, enterChat }) => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri: "https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: "800" }}>
					Youtube Chat
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					This is a test subtitle This is a test subtitle This is a
					test subtitle This is a test subtitle
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create();
