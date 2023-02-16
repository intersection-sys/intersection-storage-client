import { Button, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { StockItem } from "./StockItem";

import { Container, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";
import { DefineStockDestiny } from "./DefineStockDestiny";

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

  const [stockToDefineDestiny, setStockToDefineDestiny] = useState<Stock | null>();
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    setStocks(rawMaterial?.stocks || []);
  }, [rawMaterial]);

  return (
    <Flex w="100%" direction="column">
      <Flex w="100%" bg="white" rounded="1rem 1rem 0 0 " h="60px">

      </Flex>

      <Flex direction={'column'}>
        {stocks && stocks.length > 0 && stocks?.map((stock) => (
          <StockItem
            stock={stock}
            unit={rawMaterial.unit}
            key={stock.id}
            handlePutStockToDefineDestiny={(stock: Stock) => {
              setStockToDefineDestiny({
                ...stock,
                rawMaterial: {
                  name: rawMaterial.name,
                  id: rawMaterial.id,
                }
              });
              onOpen()
            }}
          />
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

      {stockToDefineDestiny && (
        <DefineStockDestiny
          stock={stockToDefineDestiny}
          isOpen={isOpen}
          unit={rawMaterial.unit}
          onClose={() => {
            setStockToDefineDestiny(null)
            onClose()
          }}
        />
      )}
    </Flex>
  );
}