import {
  Grid,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import React, { useEffect } from "react";
import Web3 from "web3";

const Home = () => {
  const [message, setMessage] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [signature, setSignature] = React.useState("");
  const [sdk, setSdk] = React.useState({});
  const handleInputChangeMessage = (e: any) => setMessage(e.target.value);

  const onStart = async function () {
    try {
      localStorage.setItems("chakra-ui-color-mode", "dark");
      const spec = "http://localhost:1646/spec/swagger.json";
      const apiKey = localStorage.getItem("apiKey") || "1234";
      const config = {
        apiKey,
        pairingInfo: {
          name: "eth message signer",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_DfChah0zu_wAkVFIPftsaBz_9UfSd2dxug&usqp=CAU",
          basePath: spec,
          url: "http://localhost:1646",
        },
      };
      // init
      const sdkInit = await KeepKeySdk.create(config);
      setSdk(sdkInit);
      if (config.apiKey !== apiKey)
        localStorage.setItem("apiKey", config.apiKey);

      // Unsigned TX
      const addressInfo = {
        addressNList: [2147483692, 2147483708, 2147483648, 0, 0],
        coin: "Ethereum",
        scriptType: "ethereum",
        showDisplay: false,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const responseAddress = await sdk.address.ethereumGetAddress({
        address_n: addressInfo.addressNList,
      });
      // eslint-disable-next-line no-console
      console.log("responseAddress: ", responseAddress.address);
      setAddress(responseAddress.address);

      // eslint-disable-next-line no-console
      console.log("apiKey: ", config.apiKey);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onSubmit = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("message: ", message);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (sdk && sdk?.eth) {
        // Unsigned TX
        const addressInfo = {
          addressNList: [2147483692, 2147483708, 2147483648, 0, 0],
          coin: "Ethereum",
          scriptType: "ethereum",
          showDisplay: false,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const responseAddress = await sdk.address.ethereumGetAddress({
          address_n: addressInfo.addressNList,
        });
        // eslint-disable-next-line no-console
        console.log("responseAddress: ", responseAddress.address);
        setAddress(responseAddress.address);

        const msg = {
          message: Web3.utils.toHex(message),
          address: "0x2356A15042F98f0a53784F42237bd4b2873AADCF",
        };
        // signMessage
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const responseSign = await sdk.eth.ethSign(msg);
        setSignature(responseSign);
        // eslint-disable-next-line no-console
        console.log("responseSign: ", responseSign);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const isError = false;

  // onstart get data
  useEffect(() => {
    onStart();
  }, []);

  return (
    <Grid gap={4}>
      <div>
        <FormControl isInvalid={isError}>
          <FormLabel>Sign a message! address: {address}</FormLabel>
          <Input
            type="email"
            value={message}
            onChange={handleInputChangeMessage}
          />
          {!isError ? (
            <FormHelperText>Enter your message</FormHelperText>
          ) : (
            <FormErrorMessage>pioneer username is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          // isLoading={props.isSubmitting}
          type="submit"
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
      </div>
      <div>
        {signature ? (
          <div>
            <small>signature: {signature}</small>
          </div>
        ) : (
          <div>no sig</div>
        )}
      </div>
    </Grid>
  );
};

export default Home;
