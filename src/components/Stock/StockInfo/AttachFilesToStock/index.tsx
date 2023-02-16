import { useAuth } from "@/hooks/useAuth";
import { updateStockDestiny } from "@/services/api/StockDestinies";
import { uploadStockQualityTests } from "@/services/api/Stocks";
import { formatFileNameTooltipText } from "@/utils/formatFileNameTooltipText";
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
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ReactSVG } from "react-svg";
import { SavedFilesList } from "./SavedFilesList";
import { UploadedFileList } from "./UploadedFileList";

interface UpdateStockDestinyProps {
  stock: Stock;
  postDelete: (newQualityTests: QualityTest[]) => void;
}

export function AttachFilesToStock({ stock, postDelete }: UpdateStockDestinyProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [qualityTests, setQualityTests] = useState<QualityTest[] | undefined>(stock.qualityTests);

  useEffect(() => {
    setQualityTests(stock.qualityTests)
  }, [stock.qualityTests])

  const [files, setFiles] = useState<FileList | null>(null);

  const toast = useToast()
  const { session } = useAuth()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  function handleRemoveFile(index: number) {
    if (!files) return;
    const dt = new DataTransfer()

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i)
        dt.items.add(file) // here you exclude the file. thus removing it.
    }

    setFiles(dt.files);
  }

  function handleInsertFileAtList(files: QualityTest[]) {
    if (!qualityTests) return;
    const newFiles = [...qualityTests, ...files];
    setQualityTests(newFiles);
  }


  function changeFiles(uploadedfiles: any) {
    // if (!files) return;
    console.log(uploadedfiles)
    const dt = new DataTransfer();

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        dt.items.add(file)
      }
    }

    for (let i = 0; i < uploadedfiles.length; i++) {
      const file = uploadedfiles[i]
      dt.items.add(file)
    }

    setFiles(dt.files);
    console.log(dt.files)
  }

  async function handleUploadQualityTests() {
    if (isLoading || !session || !files) return;
    setIsLoading(true);

    const filesArray = Array.from(files);
    const formData = new FormData();
    filesArray.forEach(file => formData.append('qualityTestFiles', file));


    try {
      const res = await uploadStockQualityTests(stock.id, formData, session.accessToken)
      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Testes de qualidade enviados.'
      });

      onClose();
      queryClient.invalidateQueries("stock")
      setFiles(null);
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Erro ao fazer upload dos testes de qualidade.'
      });
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Button colorScheme={'facebook'} w="100%" onClick={onOpen}>Anexar arquivos</Button>

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
              <Flex direction={"column"}>
                <FormLabel>Arquivos</FormLabel>
                <SavedFilesList files={qualityTests} postDelete={postDelete} />

                <UploadedFileList files={files || null} handleRemoveFile={handleRemoveFile} />

                <FormControl>
                  <FormLabel
                    w="100%"
                    p="1rem"
                    mt=".5rem"
                    rounded="md"
                    border="1px solid"
                    borderColor={'blue.300'}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    gap=".5rem"
                    htmlFor="file_input"
                    cursor="pointer"
                    transition=".2s"
                    _hover={{ bg: 'blue.100' }}
                  >
                    <ReactSVG src="/icons/files/upload-file.svg" />
                    Enviar aquivos
                  </FormLabel>
                  <Input type="file" multiple display="none" id="file_input" onChange={e => changeFiles(e.target.files)} />
                </FormControl>
              </Flex>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme='blue'
              isDisabled={isLoading}
              isLoading={isLoading}
              onClick={handleUploadQualityTests}
            >Salvar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
