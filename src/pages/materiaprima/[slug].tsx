import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import nookies from 'nookies';

import { getRawMaterialByID } from '@/services/api/RawMaterials';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { StockList } from '@/components/RawMaterial/StockList';
import { CreateStockForm } from '@/components/Stock/CreateStockForm';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { UpdateRawMaterialForm } from '@/components/RawMaterial/UpdateRawMaterialForm';
import { DeleteRawMaterial } from '@/components/RawMaterial/DeleteRawMaterial';

const RawMaterialInfo: NextPage = () => {
  const { session, isAuthLoading } = useAuth();
  const router = useRouter();

  const rawMaterialId = router.query.slug;
  const { data: rawMaterial, isLoading, error, refetch } = useQuery(
    'rawMaterial',
    async () => session && await getRawMaterialByID(String(rawMaterialId), session.accessToken, { stock: true })
  );

  // AUTH VALIDATION
  useEffect(() => {
    (function isAuth() {
      if (isAuthLoading) return;
      if (!session?.accessToken) {
        router.push('/');
        return;
      } else {
        // FETCH
        if (!rawMaterial && !isLoading) {
          refetch();
        }
      }
    })();

  }, [rawMaterial, isAuthLoading, isLoading, refetch, router, session?.accessToken]);

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
      <Flex alignItems={'center'} gap="2rem" maxW="1440px" w="100%">
        <Link href={`/materiaprima`}>
          <Button colorScheme={'facebook'} h="3.5rem" w="3.5rem" bg="blue.200" fontWeight="500">
            <ReactSVG src="/icons/arrow-back.svg" />
          </Button>
        </Link>

        <Flex direction={'column'} mr="auto">
          <Heading fontFamily={'Poppins'} fontWeight="500">{rawMaterial?.name || ''}</Heading>
          <Text fontSize="1.25rem" color="gray.500" fontWeight={500}>Quantidade total em estoque: {rawMaterial?.quantity} {rawMaterial?.unit}</Text>
        </Flex>

        <Flex gap=".5rem">
          {rawMaterial && (
            <>
              <CreateStockForm
                rawMaterialId={rawMaterial.id}
              />
              <UpdateRawMaterialForm
                rawMaterial={rawMaterial}
              />
              <DeleteRawMaterial
                rawMaterialName={rawMaterial.name}
                rawMaterialId={rawMaterial.id}
              />
            </>
          )}
        </Flex>
      </Flex>

      <Flex maxW="1440px" w="100%">
        {rawMaterial && (
          <StockList
            rawMaterial={rawMaterial}
          />
        )}
      </Flex>
    </Flex>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const { slug } = ctx.query;
//   const { 'intersection@accessToken': token } = nookies.get(ctx)
//   const rawMaterial = await getRawMaterialByID(String(slug), token, { stock: true });

//   return {
//     props: {
//       rawMaterial,
//     }
//   }
// }

export default RawMaterialInfo;