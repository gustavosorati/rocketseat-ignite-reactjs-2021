import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(){
    return(
      <Html lang="pt-br">
        <Head>
          <title>NextTrip</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}