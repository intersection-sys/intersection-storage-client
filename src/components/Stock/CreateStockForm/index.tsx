import { useAuth } from "@/hooks/useAuth";
import { createStock } from "@/services/api/Stocks";
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
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { useQueryClient } from "react-query";

interface CreateStockFormProps {
  rawMaterialId: string;
}

export function CreateStockForm({ rawMaterialId }: CreateStockFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [batch, setBatch] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [cost, setCost] = useState(0);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  const batchPlaceholder = (new Date()).getFullYear() + '...';

  const { session, user } = useAuth();
  const isCreateDisabled =
    quantity <= 0
    || cost < 0
    || !quantity
    || !cost
    || !supplier
    || !batch
    || !entryDate
    || !expirationDate
    || !invoiceNumber

  async function handleCreateStock() {
    if (isLoading || !session || !user || isCreateDisabled) return;
    setIsLoading(true);
    
    const data = {
      quantity,
      cost,
      supplier,
      batch,
      entryDate: new Date(entryDate),
      expirationDate: new Date(expirationDate),
      invoiceNumber,
      rawMaterialId: rawMaterialId,
      companyId: user.companyId,
    }

    try {
      await createStock(data, session.accessToken);
      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Matéria prima atualizado.'
      });
      await queryClient.invalidateQueries('rawMaterial')
      onClose();
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Erro ao atualizar Matéria prima.'
      });
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <Flex>
      <Button colorScheme={'facebook'} onClick={onOpen} fontWeight="500">Novo Lote</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Novo Lote</DrawerHeader>

          <DrawerBody>
            <Stack direction="column" gap="1rem">
              <FormControl>
                <FormLabel>Quantidade</FormLabel>
                <Input placeholder="200" type={'number'} step={0.01} value={quantity} onChange={e => setQuantity(+e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Fornecedor</FormLabel>
                <Input placeholder='Empresa...' value={supplier} onChange={e => setSupplier(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Lote</FormLabel>
                <Input placeholder={batchPlaceholder} value={batch} onChange={e => setBatch(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Data de entrada</FormLabel>
                <Input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Data de validade</FormLabel>
                <Input type="date" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>N° de nota fiscal</FormLabel>
                <Input placeholder={batchPlaceholder} value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Custo</FormLabel>
                <InputGroup>
                  <InputLeftAddon>R$</InputLeftAddon>
                  <Input placeholder='00,00' value={cost} onChange={e => setCost(+e.target.value)} />
                </InputGroup>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme='blue'
              isDisabled={isCreateDisabled}
              isLoading={isLoading}
              onClick={handleCreateStock}
            >Cadastrar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}