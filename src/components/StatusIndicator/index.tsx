import { Center } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";

interface StatusIndicatorProps {
  status: 'success' | 'danger' | 'warning' | 'info';
  tooltipText?: string;
  size?: 'sm' | 'md' | 'lg'
}

export function StatusIndicator({ status, tooltipText, size = 'sm' }: StatusIndicatorProps) {
  const iconUrl = status === "success"
    ? '/icons/indicators/check.svg'
    : status === "danger"
      ? '/icons/indicators/danger.svg'
      : status === "warning"
        ? '/icons/indicators/alert.svg'
        : '/icons/info.svg';

  const currentBgColor = status === "success"
    ? 'green.500'
    : status === "danger"
      ? 'red.500'
      : status === 'info'
        ? 'blue.500'
        : 'yellow.500';


  return (
    <Center
      {...sizes[size]}
      bg={currentBgColor}
      rounded="md"
      pos="relative"
      _hover={{
        _after: {
          opacity: 1,
          zIndex: 2,
        }
      }}
      _after={{
        display: tooltipText ? 'block' : 'none',
        content: `"${tooltipText}"`,
        pos: 'absolute',
        fontWeight: '500',
        left: 0,
        top: 'calc(100% + .25rem)',
        w: '18rem',
        maxW: '350px',
        p: '.25rem',
        rounded: 'sm',
        fontSize: '.75rem',
        bg: currentBgColor,
        transition: '.3s',
        zIndex: -3,
        opacity: 0,
        color: status === 'danger' ? 'white' : 'black',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.24)',
      }}
    >
      <ReactSVG src={iconUrl} />
    </Center>
  );
}


const sizes = {
  'sm': {
    w: '3rem',
    h: '3rem',
  },
  'md': {
    w: '4rem',
    h: '4rem',
  },
  'lg': {
    w: '5rem',
    h: '5rem',
  },
}