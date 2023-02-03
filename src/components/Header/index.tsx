import { Button, Divider, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AccountMenu } from "./AccountMenu";

interface HeaderProps {

}

export function Header({ }: HeaderProps) {
  const { asPath } = useRouter();

  return (
    <Flex bg="brand.blue.700" w="100%" h="80px" minW="100vw" px="2rem" justifyContent={'center'} alignItems="center">
      <Flex w="100%" maxW="1440px" alignItems={'center'} gap="2rem">
        <Link href="/dashboard">
          <Image src="/logo.svg" alt="Controle de Estoque - Intersection" />
        </Link>

        <Divider orientation="vertical" h="40px" borderColor={'blue.100'} />

        <Flex gap="1rem">
          <HeaderLink
            href="/dashboard"
            title="Dashboard"
            isActive={asPath === '/dashboard'}
          />
          <HeaderLink
            href="/materiaprima"
            title="Matéria prima"
            isActive={asPath === '/materiaprima'}
          />
          <HeaderLink
            href="/lotes"
            title="Lotes"
            isActive={asPath === '/lotes'}
          />
        </Flex>

        <Flex ml="auto">
          <AccountMenu />
        </Flex>
      </Flex>
    </Flex>
  );
}

function HeaderLink({ href, title, isActive }: { href: string; title: string, isActive?: boolean }) {
  return (
    <Link href={href}>
      <Button
        variant={'ghost'}
        bg={isActive ? 'brand.purple.200' : 'transparent'}
        _hover={{ bg: 'brand.blue.50' }}
        _active={{ bg: "brand.purple.200" }}
        _focus={{ bg: "brand.purple.200" }}
        color="white"
        fontWeight={500}
        h="3rem"
      >
        {title}
      </Button>
    </Link>
  )
}