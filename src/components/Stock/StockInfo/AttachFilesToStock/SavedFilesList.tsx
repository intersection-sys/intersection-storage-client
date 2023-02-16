import { useAuth } from "@/hooks/useAuth";
import { removeStockQualityTests } from "@/services/api/Stocks";
import { Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import { QualityTestFile } from "../QualityTestFile";

interface SavedFilesListProps {
  files?: QualityTest[];
  postDelete: (newList: QualityTest[]) => void;
}

export function SavedFilesList({ files, postDelete }: SavedFilesListProps) {
  const [qualityTests, setQualityTests] = useState<QualityTest[] | null>(files || null);
  const [fileToDelete, setFileToDelete] = useState<QualityTest | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { session } = useAuth();
  const toast = useToast();

  function handleRemoveFileFromList(fileId: string) {
    if (!qualityTests) throw new Error("invalid data!");
    const newFiles = [...qualityTests].filter((qualityTest: QualityTest) => qualityTest.id !== fileId);
    setQualityTests(newFiles);
    return newFiles;
  }

  async function handleDeleteFile() {
    if (isLoading || !fileToDelete || !session) return;
    setIsLoading(true);

    try {
      const { data } = await removeStockQualityTests(fileToDelete.id, session.accessToken);
      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Teste de qualidade removido.'
      });
      onClose();
      postDelete(handleRemoveFileFromList(fileToDelete.id))
      setFileToDelete(null);
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Erro ao remover teste de qualidade.'
      });
      console.log(error);
    }

    setIsLoading(false)
  }

  return (
    <>
      <Flex gap="1rem">
        {(qualityTests && qualityTests.length > 0) ? qualityTests.map((file, index) => (
          <Center key={file.url} pos="relative">
            <RemoveButton
              handleRemoveFile={() => {
                setFileToDelete(file);
                onOpen();
              }}
            />
            <QualityTestFile file={file} />
            {/* <ReactSVG src={file.fileName.includes('.pdf') ? "/icons/files/pdf.svg" : "/icons/files/image.svg"} /> */}
          </Center>
        )) : (
          <Text textAlign={'center'} fontSize=".8rem">Nenhum arquivo salvo.</Text>
        )}
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apagar arquivo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold'>
              Tem certeza que deseja apagar o arquivo?
            </Text>
            <Text>
              Essa ação é irreversível e não será possível recuperar o arquivo posteriormente.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" colorScheme='blue' mr={3} onClick={onClose} isDisabled={isLoading}>
              Cancelar
            </Button>
            <Button colorScheme='red' onClick={handleDeleteFile} isLoading={isLoading}>Apagar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


function RemoveButton({ handleRemoveFile }: { handleRemoveFile: () => void }) {
  return (
    <Button
      pos="absolute"
      top="-1rem"
      right={'-1rem'}
      w="2rem"
      transform="scale(.6)"
      fontSize="1.35rem"
      maxW="2rem"
      h="2.5rem"
      rounded="full"
      colorScheme={'red'}
      onClick={handleRemoveFile}
      zIndex="5"
    >
      X
    </Button>
  )
}