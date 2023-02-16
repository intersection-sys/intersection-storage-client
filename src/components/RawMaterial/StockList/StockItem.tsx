import { StatusIndicator } from "@/components/StatusIndicator";
import { isExpiring } from "@/utils/checkExpirationDate";
import { Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "next/link";
import { ReactSVG } from "react-svg";

interface StockItemProps {
  stock: Stock;
  unit: string;
  handlePutStockToDefineDestiny: (stock: Stock) => void;
}

export function StockItem({ stock, unit, handlePutStockToDefineDestiny }: StockItemProps) {
  const { batch, supplier, remaining, quantity, used, expirationDate } = stock;

  const displayDate = format(new Date(expirationDate), 'dd/MM/yyyy');

  const closeToExpire = isExpiring(new Date(expirationDate))
  return (
    <Flex w="100%" alignItems={'center'} gap="1rem" p=".5rem" borderBottom="1px solid" borderColor="gray.300">
      <StatusIndicator 
        status={closeToExpire ? "danger" : "success"}
        tooltipText={''}
        size="lg"
      />

      <Flex direction="column">
        <Text fontSize=".95rem" fontWeight={500}>{supplier}</Text>
        <Text fontSize=".85rem" color="gray.400" lineHeight="120%">Comprado: {quantity}{unit}</Text>
        <Text fontSize=".85rem" color="gray.400" lineHeight="120%">Lote: {batch}</Text>
        <Text fontSize=".85rem" color="gray.400" lineHeight="120%">Validade: {displayDate}</Text>
      </Flex>

      <Flex direction={'column'} alignItems="center" ml="auto">
        <Text fontSize=".9rem" fontWeight={500} lineHeight="100%">Em estoque</Text>
        <Text fontSize="1.5rem" fontWeight={500}>{remaining}{unit}</Text>
      </Flex>

      <Flex direction={'column'} alignItems="center">
        <Text fontSize=".75rem" fontWeight={500} color="gray.500" lineHeight="100%">Usado</Text>
        <Text fontSize="1.125rem" fontWeight={500} color="gray.500">{used}{unit}</Text>
      </Flex>

      <Flex gap=".5rem">
        <Button colorScheme={'green'} fontWeight="500" onClick={() => handlePutStockToDefineDestiny(stock)}>
          Definir destino
        </Button>
        <Link href={`/lote/${stock.id}`}>
          <Button colorScheme={'blue'} fontWeight="500" w="3rem">
            <ReactSVG src="/icons/info.svg" />
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}