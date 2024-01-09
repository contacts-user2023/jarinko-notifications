export const getHPURL = (): string => {
  return process.env.NEXT_PUBLIC_HP_URL || '';
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
