import { useAuth } from "@/hooks/useAuth";
import { searchRawMaterials } from "@/services/api/RawMaterials";
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { MagnifyingGlass, X } from "phosphor-react";
import { useState } from "react";
import { useQueryClient } from "react-query";

interface SearchRawMaterialsProps {
  postSearch: (rawMaterialsFound: RawMaterial[]) => void;
  clearSearch: () => void;
}

export function SearchRawMaterials({ postSearch, clearSearch }: SearchRawMaterialsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { session } = useAuth()
  const toast = useToast()
  const queryClient = useQueryClient()

  async function handleSearch() {
    if (isLoading || !session) return
    setIsLoading(true);

    try {
      const loadingToast = toast({
        status: 'loading',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Pesquisando Matérias primas...'
      })
      const rawMaterials = await searchRawMaterials(searchQuery, session.accessToken);
      toast.update(loadingToast, {
        status: 'success',
        duration: 3000,
        isClosable: true,
        description: 'Busca finalizada.'
      })
      setHasSearched(true)
      postSearch(rawMaterials);
    } catch (error: any) {
      toast({
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
        description: 'Erro ao pesquisar Matérias primas.'
      });
      console.error(error);
    }

    setIsLoading(false)
  }

  async function handleStopSeach() {
    if(isLoading) return;
    clearSearch()
    setSearchQuery('');
  }

  const isSearchDisabled = searchQuery.trim() === '' || isLoading || !session

  return (
    <Flex w="100%" maxW="600px" ml="auto" gap=".5rem">
      <Input placeholder="Pesquisar matéria prima" typeof="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <Button
        onClick={handleSearch}
        isDisabled={isSearchDisabled}
        isLoading={isLoading}
      >
        <MagnifyingGlass size={24} />
      </Button>
      <Button
        onClick={handleStopSeach}
        isDisabled={isLoading || !session || !hasSearched}
        isLoading={isLoading}
      >
        <X size={24} />
      </Button>
    </Flex>
  );
}