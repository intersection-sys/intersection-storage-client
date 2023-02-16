import { AuthForm } from '@/components/Auth/AuthForm'
import { useAuth } from '@/hooks/useAuth';
import { Center } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  // const { isAuthLoading, session } = useAuth()
  // const router = useRouter()

  // AUTH VALIDATION
  // useEffect(() => {
  //   (function isAuth() {
  //     if (isAuthLoading) return;
  //     if (!session?.accessToken) {
  //       // router.push('/');
  //       return;
  //     } else {
  //       router.push('/dashboard');
  //       // FETCH
  //     }
  //   })();

  // }, [isAuthLoading, router, session?.accessToken])
  return (
    <Center h="100vh" w="100vw">
      <AuthForm />
    </Center>
  )
}
