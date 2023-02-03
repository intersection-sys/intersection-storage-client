import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface RawMaterialItemProps {
  rawMaterial: RawMaterial
}

export function RawMaterialItem({ rawMaterial }: RawMaterialItemProps) {
  const { name, quantity, unit } = rawMaterial;
  return (
    <Flex w="100%" alignItems={'center'} gap="1rem" p=".5rem" borderBottom="1px solid" borderColor="gray.300">
      <Flex w="3rem" h="3rem" bg="green.500" rounded="md">
        {/* Status */}
      </Flex>

      <Text>{name}</Text>
      <Text ml="auto">{quantity} {unit} em estoque</Text>
      <Link href={`/materiaprima/${rawMaterial.id}`}>
        <Button colorScheme={'green'} fontWeight="500">
          Lotes
        </Button>
      </Link>
    </Flex>
  );
}