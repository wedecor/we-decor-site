import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'
import WhyChooseUs from '../components/WhyChooseUs'

const components = {
  WhyChooseUs
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
} 