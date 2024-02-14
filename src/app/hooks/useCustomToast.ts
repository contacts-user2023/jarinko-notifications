import { useToast } from '@chakra-ui/react';

export const useInfoToast = () => {
  const toast = useToast();

  return (title: string, description?: string) => {
    toast({
      title: title,
      description: description,
      status: 'info',
      variant: 'subtle',
      position: 'bottom',
      duration: 5000,
      isClosable: true,
    });
  };
};

export const useSuccessToast = () => {
  const toast = useToast();

  return (title: string, description?: string) => {
    toast({
      title: title,
      description: description,
      status: 'success',
      variant: 'subtle',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };
};

export const useErrorToast = () => {
  const toast = useToast();

  return (title: string, description?: string) => {
    toast({
      title: title,
      description: description,
      status: 'error',
      variant: 'subtle',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };
};
