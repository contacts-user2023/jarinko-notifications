import { useToast } from '@chakra-ui/react';

export const useSuccessToast = () => {
  const toast = useToast();

  return (title: string, description?: string) => {
    toast({
      title: title,
      description: description,
      status: 'success',
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
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };
};
