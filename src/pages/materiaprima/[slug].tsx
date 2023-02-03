import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import nookies from 'nookies';

import { getRawMaterialByID } from '@/services/api/RawMaterials';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { StockList } from '@/components/RawMaterial/StockList';

interface RawMaterialInfoProps {
  rawMaterial: RawMaterial
}

const RawMaterialInfo: NextPage<RawMaterialInfoProps> = ({ rawMaterial }: RawMaterialInfoProps) => {
  console.log(rawMaterial);
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
        <Flex direction={'column'}>
          <Heading fontFamily={'Poppins'} fontWeight="500">{rawMaterial.name}</Heading>
          <Text fontSize="1.25rem" color="gray.500" fontWeight={500}>Quantidade total em estoque: {rawMaterial.quantity} {rawMaterial.unit}</Text>
        </Flex>

        <Button colorScheme={'facebook'} fontWeight="500">Novo lote</Button>
      </Flex>

      <Flex maxW="1440px" w="100%">
        <StockList rawMaterial={rawMaterial} />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query;
  const { 'intersection@accessToken': token } = nookies.get(ctx)
  const rawMaterial = await getRawMaterialByID(String(slug), token, { stock: true });

  return {
    props: {
      rawMaterial,
    }
  }
}

export default RawMaterialInfo;