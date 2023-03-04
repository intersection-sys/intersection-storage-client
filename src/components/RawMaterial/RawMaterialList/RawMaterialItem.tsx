import { StatusIndicator } from "@/components/StatusIndicator";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ReactSVG } from "react-svg";

interface RawMaterialItemProps {
  rawMaterial: RawMaterial
}

export function RawMaterialItem({ rawMaterial }: RawMaterialItemProps) {
  const { name, quantity, unit, } = rawMaterial;
  const isRunningOut = rawMaterial.stockLimit ? quantity < rawMaterial.stockLimit : false;
  const isCloseToRunningOut = rawMaterial.stockLimit ? (quantity <= (rawMaterial.stockLimit * 1.1) && quantity >= rawMaterial.stockLimit) : false;

  const rawMaterialStatus = isRunningOut ? 'danger' : isCloseToRunningOut ? "warning" : "success"

  return (
    <Flex w="100%" alignItems={'center'} gap="1rem" p=".5rem" borderBottom="1px solid" borderColor="gray.300">
      <StatusIndicator
        status={rawMaterialStatus}
        tooltipText={`${isRunningOut
          ? `Estoque abaixo do nível ideal: ${quantity + unit}/${rawMaterial.stockLimit + unit}.`
          : isCloseToRunningOut ? 'Estoque próximo de acabar!' : 'Estoque regular.'
          }`}
      />

      <Text>{name}</Text>
      <Text ml="auto" fontWeight={'500'}>{quantity}{unit} em estoque</Text>
      <Link href={`/materiaprima/${rawMaterial.id}`}>
        <Button colorScheme={'green'} fontWeight="500">
          Lotes
        </Button>
      </Link>
    </Flex>
  );
}
