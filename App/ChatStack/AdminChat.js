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
} from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import EmojiSelector from "react-native-emoji-selector";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AdminChat() {
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

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
    setShowEmoji(false);
  }, []);

  /**
   * renderInputToolbar receives props from GiftedChat.
   * Use the correct prop names:
   * - props.text            (current composer text)
   * - props.onInputTextChanged(text)  (update composer text)
   * - props.onSend(messagesArray, shouldResetInput)  (send)
   */
  const renderInputToolbar = (props) => {
    return (
      <View>
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbar}
          primaryStyle={{ alignItems: "center" }}
          renderComposer={(composerProps) => (
            <View style={styles.composerRow}>
              {/* Emoji toggle */}
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  // toggle emoji: if opening, dismiss keyboard so emoji is visible and touches work
                  if (!showEmoji) {
                    Keyboard.dismiss();
                    // small delay to allow keyboard to dismiss so emoji panel appears correctly
                    setTimeout(() => setShowEmoji(true), 50);
                  } else {
                    setShowEmoji(false);
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 22 }}>😊</Text>
              </TouchableOpacity>

              {/* Composer (uses GiftedChat internal handlers via composerProps) */}
              <Composer
                {...composerProps}
                textInputStyle={styles.composer}
                placeholder="Type a message..."
                placeholderTextColor="#999"
              />

              {/* Send icon — call props.onSend with a message array and true to clear input */}
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => {
                  const text = composerProps.text && composerProps.text.trim();
                  if (!text) return;
                  const msg = {
                    _id: Math.random().toString(36).slice(2),
                    text,
                    createdAt: new Date(),
                    user: { _id: 1, name: "You" },
                  };
                  // use props.onSend (from GiftedChat) so the composer is reset
                  props.onSend([msg], true);
                }}
                activeOpacity={0.7}
              >
                <Icon name="send" size={22} color="#0b84ff" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Emoji selector (controlled via showEmoji). When emoji selected append to composer */}
        {showEmoji && (
          <View style={styles.emojiContainer}>
            <EmojiSelector
              onEmojiSelected={(emoji) => {
                // append emoji to the current composer text
                // props.text is GiftedChat's current composer text
                const current = props.text || "";
                props.onInputTextChanged(current + emoji);
              }}
              showSearchBar={false}
              showSectionTitles={false}
              columns={8}
            />
          </View>
        )}
      </View>
    );
  };

  // choose a bottomOffset according to platform & typical tab height
  const bottomOffset = Platform.OS === "ios" ? 34 : 80; // adjust 80 if your tabbar is taller

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Icon name="account-circle" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Admin</Text>
      </View>

      {/* GiftedChat handles keyboard/scroll. We pass bottomOffset so composer stays above tabs */}
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: 1 }}
        renderBubble={(props) => (
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
        )}
        renderInputToolbar={renderInputToolbar}
        bottomOffset={bottomOffset}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",},
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
   
  
    },
  });