import { Center, Container, chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});
interface LoadingProps {

}

export function Loading({ }: LoadingProps) {
  return (
    <Center w="100%" h="10rem">
      <ChakraBox
        w="3rem"
        h="3rem"
        display="flex"
        alignItems={'center'}
        justifyContent={'center'}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        bgGradient="linear-gradient(180deg, #23E0D5 0%, #A8EB12 100%)"
        rounded="full"
      />
    </Center>
  );
}