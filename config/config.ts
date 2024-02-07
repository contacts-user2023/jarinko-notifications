export const getVersion = () => {
  return process.env.NEXT_PUBLIC_VERSION || '';
};

export const getHPURL = (): string => {
  return process.env.NEXT_PUBLIC_HP_URL || '';
};
export const getInstagramURL = (): string => {
  return process.env.NEXT_PUBLIC_INSTAGRAM_URL || '';
};

type FirebaseConfig = {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string,
};

export const getFirebaseConfig = (): FirebaseConfig => {
  return {
    apiKey: process.env.NEXT_PUBLIC_APIKEY || '',
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_PROJECTID || '',
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID || '',
    appId: process.env.NEXT_PUBLIC_APPID || '',
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || '',
  }
};

export const getFCMPublicKey = () => {
  return process.env.NEXT_PUBLIC_FIREBASE_CLOUD_MESSAGING_PUBLIC_KEY || '';
};

type FirebaseAdminConfig = {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
  universe_domain: string
};

export const getFirebaseAdminConfig = (): FirebaseAdminConfig => {
  return {
    type: process.env.FIREBASE_ADMIN_TYPE || '',
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID || '',
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID || '',
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID || '',
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI || '',
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI || '',
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL || '',
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL || '',
    universe_domain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN || '',
  }
};

type MicroCMSConfig = {
  serviceDomain: string,
  apiKey: string,
};

export const getMicroCMSConfig = (): MicroCMSConfig => {
  return {
    serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || '',
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
  }
};

export const getNodeEnv = () => process.env.NODE_ENV;
export const getNextRuntime = () => process.env?.NEXT_RUNTIME;

export const getEncryptionKey = () => process.env?.NEXT_PUBLIC_CRYPTO_SECRET || '';
