import { formatFileNameTooltipText } from "@/utils/formatFileNameTooltipText";
import { Button, Flex, Text } from "@chakra-ui/react";

interface UploadedFileListProps {
  files: FileList | null;
  handleRemoveFile: (index: number) => void;
}

export function UploadedFileList({ files, handleRemoveFile }: UploadedFileListProps) {
  return (
    <Flex
      direction="column"
      gap=".5rem"
      mt="1rem"
      pt="1rem"
      borderTop="1px solid"
      borderColor={'gray.200'}
    >
      <Text fontSize=".8rem" fontWeight={600}>Arquivos a serem salvos:</Text>
      {files && Array.from(files).map((file, index) => (
        <Flex
          key={file.name + index}
          w="100%"
          alignItems={'center'}
          bg="gray.100"
          p=".25rem .5rem"
          rounded="md"
          justifyContent={'space-between'}
        >
          <Text>{formatFileNameTooltipText(file.name)}</Text>
          <Button onClick={() => handleRemoveFile(index)} colorScheme={'red'} bg="red.200" w="2rem" maxW="2rem" h="2.25rem">
            X
          </Button>
        </Flex>
      ))}
    </Flex>
  );
}