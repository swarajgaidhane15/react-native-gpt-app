import AppNavigation from "./src/navigations";

import { NativeWindStyleSheet } from "nativewind";

const App = () => {
  return <AppNavigation />;
};

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default App;
