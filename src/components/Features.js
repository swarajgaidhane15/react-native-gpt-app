import { View, Text, Image } from "react-native";

import { wp, hp } from "../utils/dimensions";

const Features = () => {
  return (
    <View style={{ height: hp(60) }} className="space-y-4 mb-2">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700"
      >
        Features
      </Text>

      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/chatgptIcon.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            ChatGPT
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          {/* Description for ChatGPT */}
          ChatGPT is a natural language processing model that can generate text
          based on user input. It is a powerful tool that can help you to create
          engaging and informative conversations.
          {/* Description for ChatGPT */}
        </Text>
      </View>

      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/dalleIcon.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            DALL-E
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          {/* Description for DALL-E */}
          DALL-E is a neural network model that generates images based on text
          input. It can generate images of any size and quality, and can be used
          to generate images for marketing campaigns, product design, and other
          creative tasks. It is a powerful tool that can help you to create
          stunning and visually stunning images.
          {/* Description for DALL-E */}
        </Text>
      </View>

      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/smartaiIcon.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            Smart AI
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          {/* Description for Smart AI */}
          Smart AI is a machine learning model that can analyze financial data,
          perform sentiment analysis, and more. It can help you to make informed
          decisions and make informed decisions.
          {/* Description for Smart AI */}
        </Text>
      </View>
    </View>
  );
};

export default Features;
