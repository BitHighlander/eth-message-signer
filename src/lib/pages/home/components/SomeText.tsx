import {
  Grid
} from "@chakra-ui/react";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import React, { useEffect } from "react";

const SomeText = () => {
  const [message, setMessage] = React.useState("");

  const onStart = async function () {
    try {
      const spec = "http://localhost:1646/spec/swagger.json";
      const apiKey = localStorage.getItem("apiKey") || "1234";
      const config = {
        apiKey,
        pairingInfo: {
          name: "KeepKey-template Demo App",
          imageUrl:
            "https://github.com/BitHighlander/keepkey-desktop/raw/master/electron/icon.png",
          basePath: spec,
          url: "http://localhost:1646",
        },
      };
      // init
      const sdk = await KeepKeySdk.create(config);
      if (config.apiKey !== apiKey)
        localStorage.setItem("apiKey", config.apiKey);

      // eslint-disable-next-line no-console
      console.log("apiKey: ", config.apiKey);

    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onstart get data
  useEffect(() => {
    onStart();
  }, []);

  return (
    <Grid textAlign="center" gap={2}>

    </Grid>
  );
};

export default SomeText;
