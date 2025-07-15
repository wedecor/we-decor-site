import '../styles/globals.css'
import { MDXProvider } from '@mdx-js/react'
import WhyChooseUs from '../components/WhyChooseUs'

const components = {
  WhyChooseUs,
  // Add more MDX-safe components here if needed
}

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
} 