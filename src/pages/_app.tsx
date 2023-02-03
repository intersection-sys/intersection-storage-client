import { Header } from '@/components/Header'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { theme } from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          {asPath !== '/' && (
            <Header />
          )}
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
