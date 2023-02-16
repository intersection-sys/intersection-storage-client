import { StockDestinies } from '@/components/Stock/StockDestinies';
import { StockInfo } from '@/components/Stock/StockInfo';
import { useAuth } from '@/hooks/useAuth';
import { getStockByID } from '@/services/api/Stocks';
import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ReactSVG } from 'react-svg';

const Lote: NextPage = () => {
  const { session, isAuthLoading } = useAuth();
  const router = useRouter();

  const stockId = String(router.query.slug)
  const { data, isLoading, error, refetch } = useQuery<Stock>(
    'stock',
    async () => session && await getStockByID(stockId, session.accessToken, { stockDestiny: true, qualityTests: true })
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
        if (!data && !isLoading) {
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
      h="calc(100vh - 80px)"
      overflowY="auto"
      pt="5rem"
      gap="1.5rem"
    >
      <Flex alignItems={'center'} pos="relative" gap="2rem" maxW="1120px" w="100%">
        <Link href={`/materiaprima/${data?.rawMaterial.id || data?.rawMaterialId || ''}`}>
          <Button colorScheme={'facebook'} h="3.5rem" w="3.5rem" bg="blue.200" fontWeight="500">
            <ReactSVG src="/icons/arrow-back.svg" />
          </Button>
        </Link>

        <Flex direction={'column'}>
          <Heading fontFamily={'Poppins'} fontWeight="500">{data?.rawMaterial?.name || ''}</Heading>
        </Flex>
      </Flex>

      <Flex maxW="1120px" w="100%" direction={'column'} gap="2rem">
        {data && (
          <StockInfo stock={data} />
        )}

        {data?.stockDestinies && data?.stockDestinies.length > 0 && (
          <>
            <Heading fontFamily={'Poppins'} fontWeight="500" size="lg" my="1rem">Destinos</Heading>
            <StockDestinies stockDestinies={data?.stockDestinies} unit={data?.rawMaterial.unit} maxQuantity={data?.remaining} />
          </>
        )}

      </Flex>
    </Flex>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const { slug } = ctx.query;
//   const { 'intersection@accessToken': token } = nookies.get(ctx)
//   const stock = await getStockByID(String(slug), token, { stockDestiny: true, qualityTests: true });

//   return {
//     props: {
//       stock,
//     }
//   }
// }

export default Lote;