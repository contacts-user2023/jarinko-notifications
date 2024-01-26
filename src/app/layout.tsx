import {Providers} from './providers'
import {Container} from "@chakra-ui/react";
import Header from "@src/app/components/layout/Header";
import FootNav from "@src/app/components/ui/FootNav";
import Footer from "@src/app/components/layout/Footer";
import {Metadata, Viewport} from "next";
import '@fontsource/zen-maru-gothic/300.css';
import '@fontsource/zen-maru-gothic/500.css';

export const metadata: Metadata = {
  title: 'じゃりん子パワー連絡帳',
  description: 'じゃりん子パワー連絡帳',
  icons: {icon: '/renraku.ico', apple: '/icon-512x512.png'},
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#fca651',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
    <body>
    <Providers>
      <Header/>
      <Container
        minHeight="100vh"
        backgroundColor='#FFF'
        paddingX='1rem'
        paddingY='2rem'
        borderRadius='0.5rem'
      >
        {children}
      </Container>
      <Footer/>
      <FootNav/>
    </Providers>
    </body>
    </html>
  )
}
