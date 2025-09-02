// src/ChatScreen.js
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Linking,
  Modal
} from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomStatusBar from "../utils/CustomStatusBar";
import ImagePicker from "react-native-image-crop-picker";

const EMOJIS = [
  // 😀 Smileys
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😉", "😊", "😋", "😍", "😘", "😜", "🤔", "🤩", "🤗", "🤨", "😎", "😏",

  // 😢 Sad / Angry
  "😢", "😭", "😡", "😱", "😓", "😴", "🤤", "🤯", "😤", "😞", "😔", "😩", "🥺",

  // 👍 Gestures / Hands
  "👍", "👎", "🙏", "👏", "👌", "🤌", "🤝", "🤟", "✌️", "✊", "👊", "👉", "👈", "☝️", "👇", "🖖", "🤲", "🤚", "✋", "🤘",

  // ❤️ Symbols / Love
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💔", "❣️", "💕", "💞", "💓", "💖", "💘", "💝", "💟",

  // 🔥 Celebrations
  "🔥", "🎉", "✨", "🌟", "💫", "🎊", "🎁", "🥳", "🎂", "🍰", "🍾", "🥂", "🍷", "🍻", "🍺", "🥤", "☕️",

  // ✅ Checks / Marks
  "✅", "☑️", "✔️", "❌", "✖️", "➕", "➖", "➗", "➰", "➿", "🔟", "🔢", "#️⃣", "*️⃣",

  // 🌍 Flags (popular)
  "🇵🇰", "🇮🇳", "🇸🇦", "🇦🇪", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇯🇵", "🇨🇳", "🇰🇷", "🇧🇷", "🇷🇺", "🇹🇷",

  // 👤 Body / Tattoo style emojis
  "💪", "🦵", "🦶", "🦷", "👀", "👁️", "👂", "👃", "👄", "🧠", "🫀", "🫁", "🦴", "🤳", "💅", "🧏", "🙇", "🧎", "🧍",

  // 🐶 Animals
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦",

  // 🍔 Food
  "🍎", "🍊", "🍌", "🍉", "🍇", "🍓", "🍍", "🥭", "🥥", "🥝", "🍅", "🥑", "🍆", "🥔", "🥕", "🌽", "🥒",
  "🍞", "🥖", "🥨", "🧀", "🍗", "🥩", "🍖", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🥗",

  // ⚽ Sports
  "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🥏", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🥍", "🏏",

  // 🚗 Travel
  "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚚", "🚛", "🚜", "🛵", "🏍️", "🚲", "✈️", "🛩️", "🚂", "🚆", "🚇",

  // 🌙 Weather
  "☀️", "🌤️", "⛅", "🌥️", "🌦️", "🌧️", "⛈️", "🌩️", "🌨️", "❄️", "☃️", "🌬️", "💨", "🌪️", "🌈", "🌙", "⭐", "🌍", "🌎", "🌏",
];


export default function AdminChat() {
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [composerText, setComposerText] = useState("");
  const [preview, setPreview] = useState(null); // {type: "image"|"file", uri, name}

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello 👋 Welcome — this is a local demo chat.",
        createdAt: new Date(),
        user: { _id: 2, name: "Admin" },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((prev) => GiftedChat.append(prev, newMessages));
    setComposerText("");
    setShowEmoji(false);
  }, []);


  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 600,
        cropping: false,
        mediaType: "photo",
      });

      const msg = {
        _id: Math.random().toString(36).slice(2),
        text: "",
        image: image.path,  // 🔥 GiftedChat image support karta hai
        createdAt: new Date(),
        user: { _id: 1, name: "You" },
      };

      setMessages((prev) => GiftedChat.append(prev, [msg]));
    } catch (err) {
      console.log("Error picking image:", err);
    }
  };

  const pickFile = async () => {
    try {
      const file = await ImagePicker.openPicker({
        multiple: false,
        mediaType: "any",
      });

      const msg = {
        _id: Math.random().toString(36).slice(2),
        text: file.filename || "📎 File Attached",
        file: file.path,   // custom key
        createdAt: new Date(),
        user: { _id: 1, name: "You" },
      };

      setMessages((prev) => GiftedChat.append(prev, [msg]));
    } catch (err) {
      console.log("Error picking file:", err);
    }
  };

  const renderInputToolbar = (props) => {
    return (
      <View>
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbar}
          primaryStyle={{ alignItems: "center" }}
          renderComposer={() => (
            <View style={styles.composerRow}>
              {/* Emoji toggle */}
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  if (!showEmoji) {
                    Keyboard.dismiss();
                    setTimeout(() => setShowEmoji(true), 50);
                  } else {
                    setShowEmoji(false);
                  }
                }}
              >
                <Text style={{ fontSize: 22 }}>😊</Text>
              </TouchableOpacity>

              {/* Composer */}
              <Composer
                text={composerText}
                onTextChanged={setComposerText}
                textInputStyle={styles.composer}
                placeholder="Type a message..."
                placeholderTextColor="#999"
              />

              {/* Send Button */}
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  const text = composerText.trim();
                  if (!text) return;
                  const msg = {
                    _id: Math.random().toString(36).slice(2),
                    text,
                    createdAt: new Date(),
                    user: { _id: 1, name: "You" },
                  };
                  props.onSend([msg], true);
                  setComposerText("");
                }}
              >
                <Icon name="send" size={22} color="#0b84ff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.pickerStyler, { marginRight: 3 }]} onPress={pickImage}>
                <Text>📷</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pickerStyler} onPress={pickFile}>
                <Text>📎</Text>
              </TouchableOpacity>
            </View>
          )}
        />


        {/* ✅ Custom Emoji Picker */}
        {showEmoji && (
          <View style={styles.emojiContainer}>
            {/* Emoji Header with Close Button */}
            <View style={styles.emojiHeader}>
              <Text style={styles.emojiTitle}>Emojis</Text>
              <TouchableOpacity onPress={() => setShowEmoji(false)}>
                <Icon name="close-circle" size={24} color="#0b84ff" />
              </TouchableOpacity>
            </View>

            {/* Emoji Grid */}
            <FlatList
              data={EMOJIS}
              keyExtractor={(item, index) => index.toString()}
              numColumns={6}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emojiItem}
                  onPress={() => setComposerText((prev) => prev + item)}
                >
                  <Text style={{ fontSize: moderateScale(18) }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <CustomStatusBar />
      <View style={styles.header}>
        <Icon name="account-circle" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Admin</Text>
      </View>

      {/* CHAT */}


      {/* CHAT */}
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: 1, name: "You" }}
        text={composerText}
        onInputTextChanged={setComposerText}
        renderBubble={(props) => (
          <View>
            <Bubble
              {...props}
              wrapperStyle={{
                right: { backgroundColor: "#0b84ff" },
                left: { backgroundColor: "#f1f0f0" },
              }}
              textStyle={{
                right: { color: "#fff" },
                left: { color: "#000" },
              }}
            />
            <Text
              style={{
                fontSize: 11,
                color: props.position === "right" ? "#0b84ff" : "#555",
                marginHorizontal: 8,
                marginTop: 2,
                textAlign: props.position === "right" ? "right" : "left",
              }}
            >
              {props.currentMessage.user.name}
            </Text>
          </View>
        )}

        // ✅ Image show karne ke liye
        renderMessageImage={(props) =>
        (
          <TouchableOpacity
            onPress={() => setPreview({ type: "image", uri: props.currentMessage.image })}
          >
            <Image
              source={{ uri: props.currentMessage.image }}
              style={{ width: 200, height: 200, borderRadius: 10, margin: 5 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

        // ✅ File show karne ke liye
        renderCustomView={(props) => {
          const { currentMessage } = props;
          if (currentMessage.file) {
            return (
              <TouchableOpacity
                onPress={() => setPreview({
                  type: "file",
                  uri: props.currentMessage.file,
                  name: props.currentMessage.fileName || "Attachment",
                })}
                style={{
                  padding: 10,
                  backgroundColor: "#e1e1e1",
                  borderRadius: 8,
                  margin: 5,
                }}
              >
                <Text style={{ color: "#000" }}>📎 {currentMessage.fileName}</Text>
              </TouchableOpacity>
            );
          }
          return null;
        }}
        renderInputToolbar={renderInputToolbar}
        bottomOffset={Platform.OS === "ios" ? 34 : 0}
        keyboardShouldPersistTaps="handled"
      />


      {/* ✅ Preview Modal */}
      <Modal visible={!!preview} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setPreview(null)}
            >
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>

            {preview?.type === "image" ? (
              <Image
                source={{ uri: preview.uri }}
                style={{ width: "100%", height: 300, borderRadius: 12 }}
                resizeMode="contain"
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                <Icon name="document-attach-outline" size={60} color="#fff" />
                <Text style={{ color: "#fff", marginVertical: 10, fontSize: 16 }}>
                  {preview?.name}
                </Text>
                <TouchableOpacity
                  style={styles.openBtn}
                  onPress={() => Linking.openURL(preview.uri)}
                >
                  <Text style={{ color: "#fff" }}>Open File</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56,
    backgroundColor: "#0b84ff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    padding: 6,
  },
  composerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  composer: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    paddingHorizontal: 12,
    color: "#000",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#fafafa",
    marginHorizontal: 6,
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  emojiContainer: {
    height: 260,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  emojiItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  emojiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  emojiTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  pickerStyler:
  {
    borderWidth: 1, padding: moderateScale(3),
    borderRadius: moderateScale(10), borderColor: '#999'
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
  },
  openBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#0b84ff",
    borderRadius: 8,
  },
});
