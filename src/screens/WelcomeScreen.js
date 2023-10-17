import { useNavigation } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { wp } from "../utils/dimensions";

const WelcomeScreen = ({ navigation }) => {
  const navigateToHome = () => navigation.navigate("Home");

  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text
          style={{ fontSize: wp(10) }}
          className="text-center font-bold text-gray-700"
        >
          Fronts
        </Text>
        <Text
          style={{ fontSize: wp(4) }}
          className="text-center tracking-wider text-gray-600 font-semibold"
        >
          Your questions, answered here
        </Text>
      </View>

      <View className="flex-row justify-center">
        <Image
          source={require("../../assets/images/welcome.png")}
          style={{ width: wp(75), height: wp(75) }}
        />
      </View>

      <TouchableOpacity
        onPress={navigateToHome}
        className="bg-emerald-600 mx-5 p-4 rounded-2xl"
      >
        <Text
          className="text-center font-bold text-white"
          style={{ fontSize: wp(6) }}
        >
          Get started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
