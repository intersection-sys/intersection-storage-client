import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import { ReactSVG } from "react-svg";

interface StockItemProps {
  stock: Stock;
  unit: string;
}

export function StockItem({ stock, unit }: StockItemProps) {
  const { batch, supplier, remaining, quantity, used, expirationDate } = stock;

  const displayDate = format(new Date(expirationDate), 'dd/MM/yyyy');
  return (
    <Flex w="100%" alignItems={'center'} gap="1rem" p=".5rem" borderBottom="1px solid" borderColor="gray.300">
      <Flex w="5rem" h="5rem" bg="green.500" rounded="md">
        {/* Status */}
      </Flex>

      <Flex direction="column">
        <Text fontSize=".95rem" fontWeight={500}>{supplier}</Text>
        <Text fontSize=".85rem" color="gray.400" lineHeight="120%">Comprado: {quantity} {unit}</Text>
        <Text fontSize=".85rem" color="gray.400" lineHeight="120%">Lote: {batch}</Text>
        <Text fontSize=".85rem" color="gray.400" lineHeight="120%">Validade: {displayDate}</Text>
      </Flex>

      <Flex direction={'column'} alignItems="center" ml="auto">
        <Text fontSize=".9rem" fontWeight={500} lineHeight="100%">Em estoque</Text>
        <Text fontSize="1.5rem" fontWeight={500}>{remaining}</Text>
      </Flex>

      <Flex direction={'column'} alignItems="center">
        <Text fontSize=".75rem" fontWeight={500} color="gray.500" lineHeight="100%">Usado</Text>
        <Text fontSize="1.125rem" fontWeight={500} color="gray.500">{used}</Text>
      </Flex>

      <Flex gap=".5rem">
        <Link href={`/materiaprima/${stock.id}`}>
          <Button colorScheme={'green'} fontWeight="500">
            Definir destino
          </Button>
        </Link>
        <Link href={`/lote/${stock.id}`}>
          <Button colorScheme={'blue'} fontWeight="500" w="3rem">
            <ReactSVG src="/icons/info.svg" />
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}