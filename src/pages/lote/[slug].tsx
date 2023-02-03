import { StockInfo } from '@/components/Stock/StockInfo';
import { getStockByID } from '@/services/api/Stocks';
import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import nookies from 'nookies';
import { ReactSVG } from 'react-svg';

interface LoteProps {
  stock: Stock;
}

const Lote: NextPage<LoteProps> = ({ stock }) => {
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
      <Flex alignItems={'center'} pos="relative" gap="2rem" maxW="1120px" w="100%">
        <Button colorScheme={'facebook'} h="3.5rem" w="3.5rem" bg="blue.200" fontWeight="500">
          <ReactSVG src="/icons/arrow-back.svg" />
        </Button>

        <Flex direction={'column'}>
          <Heading fontFamily={'Poppins'} fontWeight="500">{stock.rawMaterial?.name || ''}</Heading>
        </Flex>
      </Flex>

      <Flex maxW="1120px" w="100%">
        <StockInfo stock={stock} />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;
  const { 'intersection@accessToken': token } = nookies.get(ctx)
  const stock = await getStockByID(String(slug), token, { stockDestiny: true, qualityTests: true });

  return {
    props: {
      stock,
    }
  }
}

export default Lote;