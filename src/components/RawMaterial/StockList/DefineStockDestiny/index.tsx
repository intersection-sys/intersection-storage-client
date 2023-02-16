import { useAuth } from "@/hooks/useAuth";
import { createStockDestiny } from "@/services/api/StockDestinies";
import {
  Button,
  Drawer,
  Flex,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Checkbox,
  useToast,
  InputRightAddon,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { useQueryClient } from "react-query";

interface DefineStockDestinyProps {
  stock: Stock;
  onClose: () => void
  isOpen: boolean;
  unit: string;
}

export function DefineStockDestiny({ stock, isOpen, onClose, unit }: DefineStockDestinyProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [wasted, setWasted] = useState(false);

  const toast = useToast();
  const { session } = useAuth();
  const queryClient = useQueryClient()

  const maxQuantity = stock.remaining;

  const isDefineDisabled =
    !quantity
    || quantity > maxQuantity
    || quantity <= 0
    || !description
    || description.trim() === '';

  async function handleCreateStockDestiny() {
    if (isLoading || isDefineDisabled || !session) return;
    setIsLoading(true);

    const data: CreateStockDestiny = {
      quantity,
      description,
      wasted: wasted,
      rawMaterialId: stock?.rawMaterial?.id,
      stockId: stock.id,
    }

    try {
      await createStockDestiny(data, session.accessToken);

      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Destino atualizado.'
      });
      queryClient.invalidateQueries('rawMaterial')
      onClose();
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Erro ao atualizar Destino.'
      });
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Definir Destino
          <Text fontWeight={'500'} fontSize=".875rem" color="gray.500" lineHeight={'120%'}>
            {stock.rawMaterial?.name} do fornecedor {stock.supplier}, lote {stock.batch}.
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <Stack direction="column" gap="1rem">
            <FormControl>
              <FormLabel>Quantidade</FormLabel>
              <InputGroup>
                <Input
                  placeholder="200"
                  max={maxQuantity}
                  value={quantity}
                  onChange={e => setQuantity(+e.target.value)}
                  type={'number'}
                  step={0.01}
                />
                <InputRightAddon>{unit}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Textarea placeholder='Usado em lote...' value={description} onChange={e => setDescription(e.target.value)} />
            </FormControl>
            <Flex transform="translateY(-1rem)">
              <Checkbox checked={wasted} onChange={e => setWasted(e.target.checked)} >
                <Text fontSize={'1rem'} pt="1.25rem">Matéria prima perdida ou desperdiçada</Text>
              </Checkbox>
            </Flex>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme='blue'
            isDisabled={isDefineDisabled}
            isLoading={isLoading}
            onClick={handleCreateStockDestiny}
          >Definir</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}