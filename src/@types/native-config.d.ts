declare module 'react-native-config' {
    export interface NativeConfig {
      ENV?: string;
      BASE_URL?: string;
      SOCKET_SERVER_URL?: string;
      WEB_CLIENT_ID?: string;
      IOS_CLIENT_ID?: string;
      HOST_NAME?: string;
      PRIVATE_KEY_CERT_1?: string;
      PRIVATE_KEY_CERT_2?: string;
      PRIVATE_KEY_CERT_3?: string;
      URL_REFERRAL?: string;
      AVATAR_DEFAULT?: string;
    }

    export const Config: NativeConfig;
    export default Config;
  }
