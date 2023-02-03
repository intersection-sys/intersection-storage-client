import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { StockItem } from "./StockItem";

import { Container, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface StockListProps {
  // stocks: Stock[];
  rawMaterial: RawMaterial;
  isRawMaterialsLoading?: boolean;
}

export function StockList({ rawMaterial, isRawMaterialsLoading }: StockListProps) {
  const [stocks, setStocks] = useState(rawMaterial.stocks || [])

  useEffect(() => {
    setStocks(rawMaterial?.stocks || []);
  }, [rawMaterial]);

  return (
    <Flex w="100%" direction="column">
      <Flex w="100%" bg="white" rounded="1rem 1rem 0 0 " h="60px">

      </Flex>

      <Flex direction={'column'}>
        {stocks && stocks.length > 0 && stocks?.map((stock) => (
          <StockItem stock={stock} unit={rawMaterial.unit} key={stock.id} />
        ))}

        {isRawMaterialsLoading && (
          <Flex w="100%">
            <Loading />
          </Flex>
        )}

        {(!stocks || stocks.length === 0) && !isRawMaterialsLoading && (
          <Center flexDirection="column" mt="2rem" gap="1rem">
            <Text fontSize="1.1rem" fontWeight={500}>Nenhum lote cadastrado</Text>
            <Button colorScheme="facebook" fontWeight={500}>Cadastrar primeiro lote de {rawMaterial.name}</Button>
          </Center>
        )}
      </Flex>
    </Flex>
  );
}