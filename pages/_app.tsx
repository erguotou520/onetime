import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { mono } from '../components/fonts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --f-mono: ${mono.style.fontFamily};
        }
        .f-mono {
          font-family: ${mono.style.fontFamily};
        }
      `}</style>
      <main className={mono.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
