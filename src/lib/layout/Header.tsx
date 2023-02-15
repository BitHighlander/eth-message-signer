import { Box, Flex } from "@chakra-ui/react";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import { useEffect, useState } from "react";

import ThemeToggle from "./ThemeToggle";

const spec = "http://localhost:1646/spec/swagger.json";
const configKeepKey: any = {
  pairingInfo: {
    name: "KeepKey-Template",
    imageUrl: "https://assets.coincap.io/assets/icons/btc@2x.png",
    basePath: spec,
    url: "https://keepkey-template.vercel.app/",
  },
};

const Header = () => {
  // const [keepkeyConnected, setKeepKeyConnected] = useState(false);
  const [keepkeyError, setKeepKeyError] = useState(false);
  // const [features, setKeepKeyFeatures] = useState({});

  const onStart = async function () {
    try {
      const apiKey = localStorage.getItem("apiKey") || "1234";
      configKeepKey.apiKey = apiKey;

      // init
      const sdk = await KeepKeySdk.create(configKeepKey);
      localStorage.setItem("apiKey", configKeepKey.apiKey);

      const featuresKK = await sdk.system.info.getFeatures();
      // eslint-disable-next-line no-console
      console.log("features: ", featuresKK);
      // setKeepKeyFeatures(featuresKK);
      // setKeepKeyConnected(true);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setKeepKeyError("Bridge is offline!");
    }
  };

  // onStart()
  useEffect(() => {
    onStart();
  }, []); // once on startup

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box marginLeft="auto">
        <div>
          {/* {features && <div>features: {features}</div>} */}
          {keepkeyError && <div>error: {keepkeyError}</div>}
        </div>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
