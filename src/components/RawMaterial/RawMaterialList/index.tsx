import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { RawMaterialItem } from "./RawMaterialItem";
import { MagnifyingGlass } from 'phosphor-react';
import { Loading } from "@/components/Loading";
import { useLayoutEffect, useState } from "react";
import { SearchRawMaterials } from "./SearchRawMaterial";

interface RawMaterialListProps {
  rawMaterials: RawMaterial[];
  isRawMaterialsLoading?: boolean;
}

export function RawMaterialList({ rawMaterials, isRawMaterialsLoading }: RawMaterialListProps) {
  const [searchResult, setSearchResult] = useState<RawMaterial[]>([]);

  function postSearch(rawMaterialsFound: RawMaterial[]) {
    setSearchResult(rawMaterialsFound)
  }

  return (
    <Flex w="100%" direction="column">
      <Flex w="100%" bg="white" rounded="1rem 1rem 0 0 " p="1rem">
        <SearchRawMaterials postSearch={postSearch} clearSearch={() => setSearchResult([])} />
      </Flex>

      <Flex direction={'column'}>
        {searchResult.length > 0 ? searchResult?.map(rawMaterial => (
          <RawMaterialItem rawMaterial={rawMaterial} key={rawMaterial.id} />
        )) : (rawMaterials?.length > 0) && rawMaterials?.map((rawMaterial) => (
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