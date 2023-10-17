import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Voice from '@react-native-community/voice';

import { hp, wp } from "../utils/dimensions";

import Features from "../components/Features";
import { apiCall } from "../api/openai";

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [result, setResult] = useState("");
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const ScrollViewRef = useRef();

  const clear = () => {
    setMessages([]);
  };

  const onSpeechStartHandler = () => {
    console.log("Listening...");
  };

  const onSpeechEndHandler = () => {
    setRecording(false);
    console.log("Stopped listening");
  };

  const onSpeechResultsHandler = (evt) => {
    setResult(evt.value[0]);
  };

  const onSpeechErrorHandler = (err) => {
    console.log("Error: ", err);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start("en-US");
    } catch (error) {
      throw new Error(error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);

      fetchResponse();
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchResponse = () => {
    if (result.trim().length > 0) {
      setLoading(true);

      let newMessages = [...messages];
      newMessages.push({ role: "user", content: result.trim() });
      setMessages(newMessages);

      updateScrollView();

      apiCall(result.trim(), newMessages).then((res) => {
        if (res.success) {
          setMessages(res.data);
          setResult("");
          updateScrollView();
        } else {
          Alert.alert(res.error);
        }
        setLoading(false);
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  if (loading) {
    return (
      <Image
        source={require("../../assets/images/loading.gif")}
        style={{ height: hp(10), width: hp(10) }}
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/bot.png")}
            style={{ height: hp(20), width: hp(20) }}
          />
        </View>

        {messages.length ? (
          <View className="space-y-2 flex-1">
            <Text
              className="text-gray-700 space-y-2 font-semibold ml-1"
              style={{ fontSize: wp(5) }}
            >
              Assistant
            </Text>
            <View
              className="bg-neutral-200 rounded-3xl p-4"
              style={{ height: hp(64) }}
            >
              <ScrollView
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}
                ref={ScrollViewRef}
              >
                {messages.map((message, idx) => {
                  if (message.role === "assistant") {
                    if (message.content.includes("https://")) {
                      // Image
                      return (
                        <View key={idx} className="flex-row justify-start">
                          <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{ uri: message.content }}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{ height: wp(60), width: wp(60) }}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // Text
                      return (
                        <View
                          key={idx}
                          style={{ width: wp(70) }}
                          className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                        >
                          <Text>{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    // User input
                    return (
                      <View key={idx} className="flex-row justify-end">
                        <View
                          style={{ width: wp(70) }}
                          className="bg-white rounded-xl p-2 rounded-tr-none"
                        >
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        <View className="flex justify-center items-center">
          {Voice && Voice.isAvailable() && recording ? (
            // Recording stop button
            <TouchableOpacity onPress={stopRecording}>
              <Image
                source={require("../../assets/images/voiceLoading.gif")}
                className="rounded-full"
                style={{ height: hp(10), width: hp(10) }}
              />
            </TouchableOpacity>
          ) : (
            // Recording start button
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={require("../../assets/images/recordingIcon.png")}
                className="rounded-full"
                style={{ height: hp(10), width: hp(10) }}
              />
            </TouchableOpacity>
          )}

          {messages.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
            >
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}

          {Voice && speaking && (
            <TouchableOpacity
              onPress={() => setSpeaking(false)}
              className="bg-red-400 rounded-3xl p-2 absolute left-10"
            >
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
