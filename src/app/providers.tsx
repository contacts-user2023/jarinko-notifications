'use client';
import {extendTheme} from "@chakra-ui/react"
import {ChakraProvider} from '@chakra-ui/react'
import SessionProvider from "@src/app/SessionProvider";
import {useFCMMessage} from "@src/app/libs/useFCMGetMessage";

export function Providers({children}: { children: React.ReactNode }) {
  useFCMMessage();

  return <SessionProvider>
    <ChakraProvider
      theme={extendTheme({
        config: {
          initialColorMode: 'light',
          useSystemColorMode: false,
        },
        fonts: {
          heading: '"Zen Maru Gothic", sans-serif;',
          body: '"Zen Maru Gothic", sans-serif;',
        },
        styles: {
          global: {
            body: {
              minHeight: '100vh',
              backgroundColor: '#fcfaf2',
            },
          }
        }
      })}
    >{children}</ChakraProvider>
  </SessionProvider>
}
