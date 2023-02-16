import { formatFileNameTooltipText } from "@/utils/formatFileNameTooltipText";
import { Button } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";

interface QualityTestFileProps {
  file: QualityTest;
}

export function QualityTestFile({ file }: QualityTestFileProps) {
  return (
    <a href={file.url} key={file.url} target="_blank" rel="noreferrer">
      <Button
        w="3rem"
        h="3.5rem"
        _hover={{ bg: 'blue.100' }}
        bg="blue.200"
        rounded="md"
        sx={{
          '&:hover': {
            _after: {
              opacity: 1,
              zIndex: 2,
            }
          }
        }}
        _after={{
          opacity: 0,
          content: `"${formatFileNameTooltipText(file.fileName)}"`,
          position: 'absolute',
          left: '0',
          bottom: '-.25rem',
          transform: 'translateY(100%)',
          p: '.5rem',
          rounded: 'md',
          bg: "blue.100",
          zIndex: -1,
          transition: '.2s',
        }}
      >
        <ReactSVG src={file.fileName.includes('.pdf') ? "/icons/files/pdf.svg" : "/icons/files/image.svg"} />
      </Button>
    </a>

  );
}