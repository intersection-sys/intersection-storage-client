import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { RawMaterialItem } from "./RawMaterialItem";

import { Container, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { Loading } from "@/components/Loading";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface RawMaterialListProps {
  rawMaterials: RawMaterial[];
  isRawMaterialsLoading?: boolean;
}

export function RawMaterialList({ rawMaterials, isRawMaterialsLoading }: RawMaterialListProps) {
  return (
    <Flex w="100%" direction="column">
      <Flex w="100%" bg="white" rounded="1rem 1rem 0 0 " h="60px">

      </Flex>

      <Flex direction={'column'}>
        {rawMaterials?.length > 0 && rawMaterials?.map((rawMaterial) => (
          <RawMaterialItem rawMaterial={rawMaterial} key={rawMaterial.id} />
        ))}

        {isRawMaterialsLoading && (
          <Flex w="100%">
            <Loading />
          </Flex>
        )}

        {(!rawMaterials || rawMaterials.length === 0) && !isRawMaterialsLoading && (
          <Center flexDirection="column" mt="2rem" gap="1rem">
            <Text fontSize="1.1rem" fontWeight={500}>Nenhuma matéria prima cadastrada</Text>
            <Button colorScheme="facebook" fontWeight={500}>Cadastrar primeira Matéria Prima</Button>
          </Center>
        )}
      </Flex>
    </Flex>
  );
}