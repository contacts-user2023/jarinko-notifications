import {Providers} from './providers'
import {Container} from "@chakra-ui/react";
import Header from "./ui/Header";
import FootNav from "./ui/FootNav";
import Footer from "./ui/Footer";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
    <head>
      <title>じゃりん子パワー連絡帳</title>
      <link rel="icon" href="/renraku.ico"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;500&display=swap"
            rel="stylesheet"/>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
      <meta name="theme-color" content="#fca651" />
    </head>
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
