import { useAuth } from "@/hooks/useAuth";
import { Avatar, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";

interface AccountMenuProps {

}

export function AccountMenu({ }: AccountMenuProps) {
  const { user } = useAuth();

  return (
    <Menu>
      <MenuButton 
      as={Button} 
      h="100%" 
      variant="ghost" 
      _hover={{ bg: 'brand.blue.50'}}
      _focus={{ bg: 'brand.blue.50'}}
      _active={{ bg: 'brand.blue.50'}}
      >
        <Flex alignItems={'center'} gap=".5rem" py=".5rem">
          <Avatar src={user?.imageUrl} name={user?.name} />
          <Flex direction={'column'} alignItems="flex-start" color="white">
            <Text fontSize=".85rem" fontWeight={'500'}>{user?.name || ""}</Text>
            <Text fontSize=".75rem" fontWeight={'400'}>{user?.role.name || ''}</Text>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuDivider />
        <MenuItem color="red" _hover={{ bg: 'red.100' }}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
}