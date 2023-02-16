import { Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { StockDestinyItem } from "./StockDestinyItem";
import { UpdateStockDestiny } from "./UpdateStockDestiny";

interface StockDestiniesProps {
  stockDestinies: StockDestiny[];
  unit: string;
  maxQuantity: number;
}

export function StockDestinies({ stockDestinies, unit, maxQuantity }: StockDestiniesProps) {
  const [stockDestinyToUpdate, setStockDestinyToUpdate] = useState<StockDestiny | null>(null)
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      w="100%"
      gap="1rem"
      mb="5rem"
    >
      {stockDestinies && stockDestinies.length > 0 && stockDestinies.map((stockDestiny) => (
        <StockDestinyItem
          key={stockDestiny.id}
          stockDestiny={stockDestiny}
          unit={unit}
          handleSelectDestinyToUpdate={() => {
            setStockDestinyToUpdate(stockDestiny)
            onOpen();
          }}
        />
      ))}

      {stockDestinyToUpdate && (
        <UpdateStockDestiny
          stockDestiny={stockDestinyToUpdate}
          isOpen={isOpen}
          maxQuantity={maxQuantity}
          unit={unit}
          onClose={() => {
            onClose()
            setTimeout(() => {
              setStockDestinyToUpdate(null);
            }, 1000)
          }}
        />
      )}
    </Flex>
  );
}