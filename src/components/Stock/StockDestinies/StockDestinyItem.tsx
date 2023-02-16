import { Button, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReactSVG } from "react-svg";

interface StockDestinyItemProps {
  stockDestiny: StockDestiny;
  unit: string;
  handleSelectDestinyToUpdate: () => void;
}

export function StockDestinyItem({ stockDestiny, unit, handleSelectDestinyToUpdate }: StockDestinyItemProps) {
  return (
    <Flex
      w="100%"
      bg="white"
      rounded="lg"
      p={['1rem']}
    >
      <Flex direction="column" w="100%" gap=".5rem">
        <Flex alignItems={'center'} gap=".5rem">
          <Flex
            direction="column"
            borderColor="blue.300"
            rounded="md"
            p=".5rem"
          >
            <Text fontWeight={600}>Quantidade utilizada</Text>
            <Text fontSize="1.5rem">{stockDestiny.quantity}{unit}</Text>
          </Flex>

          <Text ml="auto" mr=".5rem" fontSize="1rem" color="gray.500" fontWeight={500}>{format(new Date(String(stockDestiny.createdAt)), 'dd/MM/yyyy, HH:mm', { locale: ptBR }).replace(', ', ', às ')}</Text>
          <Button
            colorScheme={'blue'}
            w="3rem"
            onClick={handleSelectDestinyToUpdate}
            sx={{
              svg: {
                width: '24px',
                height: '24px',
                path: {
                  fill: 'white'
                },
              },
            }}
          >
            <ReactSVG src="/icons/edit.svg" />
          </Button>
          <Button
            colorScheme={'red'}
            w="3rem"
            sx={{
              svg: {
                width: '24px',
                height: '24px',
                transform: 'scale(.85)', 
                path: {
                  fill: 'white'
                },
              },
            }}
          >
            <ReactSVG src="/icons/trash.svg" />
          </Button>
        </Flex>

        <Flex
          direction="column"
          bg="gray.100"
          border="1px solid"
          borderColor="blue.300"
          rounded="md"
          p=".5rem"
          w="100%"
        >
          <Text fontWeight={600}>Descrição de uso</Text>
          <Text>{stockDestiny.description}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}