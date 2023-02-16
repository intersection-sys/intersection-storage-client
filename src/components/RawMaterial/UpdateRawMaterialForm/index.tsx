import { useAuth } from "@/hooks/useAuth";
import { updateRawMaterial } from "@/services/api/RawMaterials";
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
  useToast,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { ReactSVG } from "react-svg";

interface UpdateRawMaterialPropsForm {
  rawMaterial: RawMaterial;
}

export function UpdateRawMaterialForm({ rawMaterial }: UpdateRawMaterialPropsForm) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(rawMaterial.name);
  const [unit, setUnit] = useState(rawMaterial.unit);
  const [stockLimit, setStockLimit] = useState<number>(rawMaterial.stockLimit || 0);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { session } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  const isUpdateDisabled =
    !name
    || !unit
    || stockLimit <= 0
    || name.trim() === ''
    || unit.trim() === '';

  async function handleUpdateRawMaterial() {
    if (isLoading || !session || isUpdateDisabled) return;
    setIsLoading(true);

    const data = {
      name,
      unit,
      stockLimit
    }

    try {
      await updateRawMaterial(rawMaterial.id, data, session.accessToken);
      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Matéria prima atualizado.'
      });
      queryClient.invalidateQueries('rawMaterial')
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
      <Button
        colorScheme={'blue'}
        onClick={onOpen}
        fontWeight="500"
        sx={{
          svg: {
            w: '24px',
            h: '24px',
            path: {
              fill: 'white'
            }
          }
        }}
      >
        <ReactSVG src="/icons/edit.svg" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Editar Matéria Prima</DrawerHeader>

          <DrawerBody>
            <Stack direction="column" gap="1rem">
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input placeholder='Matéria prima' value={name} onChange={e => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Unidade de medição</FormLabel>
                <Input placeholder='L, Kg, mL, g' value={unit} onChange={e => setUnit(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Quantidade de alerta <Text as="span" fontSize=".8rem" color="gray.500">(opcional)</Text></FormLabel>
                <InputGroup>
                  <Input placeholder='500' type="number" step={0.01} value={stockLimit} onChange={e => setStockLimit(+e.target.value)} />
                  <InputRightAddon>{unit}</InputRightAddon>
                </InputGroup>
                <FormHelperText fontSize=".8rem" pl=".25rem">Nível minimo para emissão de alerta de baixa quantidade em estoque.</FormHelperText>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme='blue'
              isDisabled={isUpdateDisabled}
              isLoading={isLoading}
              onClick={handleUpdateRawMaterial}
            >Atualizar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}