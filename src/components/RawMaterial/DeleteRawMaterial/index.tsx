import { useAuth } from "@/hooks/useAuth";
import { deleteRawMaterial } from "@/services/api/RawMaterials";
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { ReactSVG } from "react-svg";

interface DeleteRawMaterialProps {
  rawMaterialName: string;
  rawMaterialId: string;
}

export function DeleteRawMaterial({ rawMaterialName, rawMaterialId }: DeleteRawMaterialProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { session } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleDeleteRawMaterial() {
    if (isLoading || !session || !rawMaterialId) return;
    setIsLoading(true)

    try {
      await deleteRawMaterial(rawMaterialId, session.accessToken)

      toast({
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Matéria prima apagada.'
      });
      await queryClient.invalidateQueries('rawMaterials')
      onClose();
      router.push('/materiaprima');
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Erro ao apagar Matéria prima.'
      });
      console.log(error);
    }

    setIsLoading(false)
  }

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        sx={{
          svg: {
            transform: 'scale(.85)',
            path: {
              fill: 'white'
            },
          },
        }}
      >
        <ReactSVG src="/icons/trash.svg" />
      </Button>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Tem certeza que deseja apagar está matéria prima?</ModalHeader>
          <ModalBody>
            <Text fontWeight={500} color="red.600">Você pretende apagar a matéria prima {rawMaterialName}?</Text>
            <Text fontSize=".9rem" color="gray.600">
              Essa é uma ação irreversivel e apagará também os lotes e seus destinos.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" colorScheme='blue' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme={'red'}
              onClick={handleDeleteRawMaterial}
              isLoading={isLoading}
            >Apagar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}