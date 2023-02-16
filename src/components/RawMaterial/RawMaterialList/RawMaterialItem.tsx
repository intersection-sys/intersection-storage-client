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

  const currentBg = isRunningOut ? "yellow.500" : "green.500"
  return (
    <Flex w="100%" alignItems={'center'} gap="1rem" p=".5rem" borderBottom="1px solid" borderColor="gray.300">
      <StatusIndicator
        status={rawMaterialStatus}
        tooltipText={`${isRunningOut
          ? `Estoque abaixo do nível ideal: ${quantity + unit}/${rawMaterial.stockLimit + unit}.`
          : isCloseToRunningOut ? 'Estoque próximo de acabar!' : 'Estoque regular.'
          }`}
      />
      {/* <Center
        w="3rem"
        h="3rem"
        bg={currentBg}
        rounded="md"
        pos="relative"
        _hover={{
          _after: {
            opacity: 1,
            zIndex: 2,
          }
        }}
        _after={{
          content: `""`,
          pos: 'absolute',
          fontWeight: '500',
          left: 0,
          top: 'calc(100% + .25rem)',
          w: '18rem',
          maxW: '350px',
          p: '.25rem',
          rounded: 'sm',
          fontSize: '.75rem',
          bg: currentBg,
          transition: '.3s',
          zIndex: -3,
          opacity: 0,
        }}
      >
        <ReactSVG src={isRunningOut ? '/icons/indicators/alert.svg' : '/icons/indicators/check.svg'} />
      </Center> */}

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
