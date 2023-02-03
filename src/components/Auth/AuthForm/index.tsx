import { Button, Flex, FormControl, FormLabel, Image, Input, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthFormProps {

}

export function AuthForm({ }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isAuthLoading } = useAuth();
  const router = useRouter();
  const toast = useToast()

  async function handleLogin() {
    try {
      console.log(login)
      await login(username, password);
      toast({
        position: "top",
        status: 'success',
        description: 'Usuário conectado com sucesso.',
        duration: 7000,
        isClosable: true,
      })
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        status: 'error',
        description: error.message,
        position: "top",
        duration: 7000,
        isClosable: true,
      })
      console.log(error);
    }
  }

  return (
    <Flex
      p={["1rem", "2rem"]}
      bg={'brand.blue.700'}
      rounded="3xl"
      w="100%"
      maxW="440px"
      direction={'column'}
      gap="2rem"
      sx={{ '*': { color: 'white' } }}
    >
      <Flex direction={'column'} alignItems="center">
        <Image src="/logo.svg" alt="Controle de produção - Intersection" maxW="300px" w="100%" />
      </Flex>

      <Flex direction={"column"} gap="1rem">
        <FormControl>
          <FormLabel>Usuário</FormLabel>
          <Input borderColor="gray.400" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input borderColor="gray.400" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
      </Flex>

      <Button
        w="100%"
        rounded="xl"
        size="lg"
        colorScheme="green"
        onClick={handleLogin}
        isLoading={isAuthLoading}
        disabled={!username || !password || username.length < 3 || password.length < 6}
      >Entrar</Button>
    </Flex>
  );
}