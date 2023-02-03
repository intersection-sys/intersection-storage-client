import { Header } from '@/components/Header'
import { useAuth } from '@/hooks/useAuth';
import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard: NextPage = () => {
  const { session, isAuthLoading } = useAuth();
  const router = useRouter();

    // AUTH VALIDATION
    useEffect(() => {
      (function isAuth() {
        if (isAuthLoading) return;
        if (!session?.accessToken) {
          router.push('/');
          return;
        } else {
          // FETCH
        }
      })();
  
    }, [isAuthLoading, router, session?.accessToken])
  
  return (
    <Flex>

    </Flex>
  );
}

export default Dashboard;