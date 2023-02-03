import { RawMaterialList } from '@/components/RawMaterial/RawMaterialList';
import { useAuth } from '@/hooks/useAuth';
import { getRawMaterials } from '@/services/api/RawMaterials';
import { Button, Flex, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const MateriaPrima: NextPage = () => {
  const { session, isAuthLoading } = useAuth();
  const router = useRouter();


  const { data, isLoading, error, refetch } = useQuery('rawMaterials', async () => session && await getRawMaterials(session.accessToken), { enabled: false });

  // AUTH VALIDATION
  useEffect(() => {
    (function isAuth() {
      if (isAuthLoading) return;
      if (!session?.accessToken) {
        router.push('/');
        return;
      } else {
        // FETCH
        if(!data && !isLoading){
           refetch();
        }
      }
    })();

  }, [data, isAuthLoading, isLoading, refetch, router, session?.accessToken])

  return (
    <Flex
      direction={'column'}
      alignItems="center"
      bg="brand.light.background"
      w="100%"
      h="100%"
      pt="5rem"
      gap="1.5rem"
    >
      <Flex alignItems={'center'} justifyContent="space-between" maxW="1440px" w="100%">
        <Heading fontFamily={'Poppins'} fontWeight="500">Matéria Prima</Heading>

        <Button colorScheme={'facebook'} fontWeight="500">Nova Matéria Prima</Button>
      </Flex>

      <Flex maxW="1440px" w="100%">
        <RawMaterialList rawMaterials={data} isRawMaterialsLoading={isLoading} />
      </Flex>
    </Flex>
  );
}

export default MateriaPrima;