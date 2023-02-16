import { useAuth } from "@/hooks/useAuth";
import { updateStockDestiny } from "@/services/api/StockDestinies";
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

interface UpdateStockDestinyProps {
  stockDestiny: StockDestiny;
  onClose: () => void
  isOpen: boolean;
  maxQuantity: number;
  unit: string;
}

export function UpdateStockDestiny({ stockDestiny, isOpen, onClose, maxQuantity, unit }: UpdateStockDestinyProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(stockDestiny.quantity);
  const [description, setDescription] = useState(stockDestiny.description);
  const [wasted, setWasted] = useState(stockDestiny.wasted || false);

  const toast = useToast();
  const { session } = useAuth();
  const queryClient = useQueryClient()

  const isDefineDisabled =
    !quantity
    || quantity > maxQuantity
    || quantity <= 0
    || !description
    || description.trim() === '';

  async function handleUpdateStockDestiny() {
    if (isLoading || isDefineDisabled || !session) return;
    setIsLoading(true);

    const data: Partial<StockDestiny> = {
      quantity,
      description,
      wasted: wasted || false,
    }
    try {
      await updateStockDestiny(stockDestiny.id, data, session.accessToken);

      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Destino atualizado.'
      });
      queryClient.invalidateQueries('stock')
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
        <DrawerHeader>Atualizar destino</DrawerHeader>

        <DrawerBody>
          <Stack direction="column" gap="1rem">
            <FormControl>
              <FormLabel>Quantidade <Text color="gray.500" as="span" fontSize={'.8rem'}>({unit})</Text></FormLabel>
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
              <FormHelperText lineHeight={'120%'} fontSize=".85rem">Máximo: {maxQuantity}{unit}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Textarea h="300px" placeholder='Usado em lote...' value={description} onChange={e => setDescription(e.target.value)} />
            </FormControl>
            <Flex transform="translateY(-1rem)">
              <Checkbox checked={wasted} onChange={e => setWasted(e.target.checked)}>
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
            onClick={handleUpdateStockDestiny}
          >Definir</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}