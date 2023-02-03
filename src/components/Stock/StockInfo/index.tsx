import { formatFileNameTooltipText } from "@/utils/formatFileNameTooltipText";
import { Button, Center, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ReactNode } from "react";
import { ReactSVG } from "react-svg";

interface StockInfoProps {
  stock: Stock
}

export function StockInfo({ stock }: StockInfoProps) {
  const {
    supplier,
    remaining,
    used,
    quantity,
    invoiceNumber,
    qualityTests,
    batch,
    cost,
    expirationDate
  } = stock;

  console.log(stock, 'sotkc')

  return (
    <Flex
      bg="white"
      rounded="lg"
      p={['1rem', '1.5rem', '2rem']}
      direction="column"
      w="100%"
    >
      <Flex direction="column" mb="2rem">
        <Heading size="lg" fontWeight="500" fontFamily={'Poppins'}>Fornecedor: {supplier}</Heading>
        <Text fontSize="1.25rem" color="gray.500" lineHeight="120%" fontWeight={500}>Quantidade em estoque: {remaining}{stock.rawMaterial?.unit}</Text>
      </Flex>

      <Flex gap=".5rem" wrap="wrap">
        <SimpleGrid flex="7" columns={2} w="100%" gap=".5rem">
          <InfoCard
            title={'Preço:'}
            value={
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
              }).format(cost)
            }
          />
          <InfoCard
            title={'Validade:'}
            value={format(new Date(expirationDate), 'dd/MM/yyyy')}
          />
          <InfoCard
            title={'N° da nota fiscal:'}
            value={invoiceNumber}
          />
          <InfoCard
            title={'Lote:'}
            value={batch}
          />
          <InfoCard
            title={'Quantidade comprada:'}
            value={quantity + stock.rawMaterial?.unit}
          />
          <InfoCard
            title={'Quantidade utilizada:'}
            value={used + stock.rawMaterial?.unit}
          />
        </SimpleGrid>

        <Flex direction="column" flex="5">
          <Flex direction="column" gap=".5rem" alignItems={'flex-start'} p=".5rem" rounded="md" border="1px solid" borderColor="blue.200">
            <Text fontWeight={600} lineHeight="120%">Testes de Qualidade</Text>
            <Flex gap=".25rem">
              {qualityTests && qualityTests.length > 0 && qualityTests.map((file, index) => (
                <a href={file.url} key={file.url} target="_blank" rel="noreferrer">
                  <Button
                    w="3rem"
                    h="3.5rem"
                    _hover={{ bg: 'blue.100' }}
                    bg="blue.200"
                    rounded="md"
                    sx={{ '&:hover': {
                      _after: {
                        opacity: 1,
                      }
                    }}}
                    _after={{
                      opacity: 0,
                      content: `"${formatFileNameTooltipText(file.fileName)}"`,
                      position: 'absolute',
                      left: '0',
                      top: '-.25rem',
                      transform: 'translateY(-100%)',
                      p: '.5rem',
                      rounded: 'md',
                      bg: "blue.100",
                      zIndex: 2,
                      transition: '.2s',
                    }}
                  >
                    <ReactSVG src={file.fileName.includes('.pdf') ? "/icons/files/pdf.svg" : "/icons/files/image.svg"} />
                  </Button>
                </a>
              ))}
            </Flex>
            <Button colorScheme={'facebook'} w="100%">Anexar arquivos</Button>
          </Flex>
        </Flex>
      </Flex>

      <Text lineHeight={'100%'} fontSize=".8rem" color="gray.500" mt="1rem">ID no banco de dados: {stock.id}</Text>
    </Flex>
  );
}

function InfoCard({ title, value }: { title: string, value: number | string | ReactNode }) {
  return (
    <Flex direction="column" alignItems={'flex-start'} p=".5rem" rounded="md" border="1px solid" borderColor="blue.200">
      <Text fontWeight={600} lineHeight="120%">{title}</Text>
      <Text w="100%" color="facebook.600" fontWeight={500} fontSize="1.25rem">{value}</Text>
    </Flex>
  )
}