'use client';

import {
  Card,
  CardBody,
  Text,
  VStack,
  InputGroup,
  Input,
  InputLeftAddon,
  ButtonGroup,
  Button,
  useToast,
} from '@chakra-ui/react'
import {getAuth, signInWithEmailAndPassword} from "@src/app/libs/firebaseConfig";
import {FirebaseError} from 'firebase/app'
import {useForm} from 'react-hook-form'
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useState} from "react";
import {PreloadResources} from "@src/app/preload-resources";
import { signIn as signInByNextAuth } from "next-auth/react";

type Data = {
  email: string,
  password: string,
};

export default function Login() {
  PreloadResources();

  const toast = useToast();
  const[isDisabled, setIsDisabled] = useState(false);

  const isValid = async (data: Data) => {
    setIsDisabled(true);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const idToken = await userCredential.user.getIdToken();
      await signInByNextAuth("credentials", {
        idToken,
        callbackUrl: "/contacts",
      });
      toast({
        title: 'ログイン成功',
        status: 'success',
        position:'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
        toast({
          title: 'ログイン失敗',
          description: "メールアドレス、パスワードが正しくありません。",
          status: 'error',
          position:'top',
          duration: 5000,
          isClosable: true,
        })
      }
      setIsDisabled(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Data>();
  return (
    <Card>
      <CardBody>
        <form className='mt-2 flex w-8/12 flex-col lg:w-1/2' onSubmit={handleSubmit(isValid)}>
          <VStack spacing={4}>
            <VStack spacing={1} w="100%" align="left">
              <InputGroup>
                <InputLeftAddon>
                  <ReactIcon iconName="LuMail"/>
                </InputLeftAddon>
                <Input
                  type='email'
                  placeholder='メールアドレス'
                  {...register('email', {required: 'メールアドレスを入力してください'})}
                />
              </InputGroup>
              <Text color="red">{errors.email?.message}</Text>
            </VStack>
            <VStack spacing={1} w="100%" align="left">
              <InputGroup>
                <InputLeftAddon>
                  <ReactIcon iconName="LuKeyRound"/>
                </InputLeftAddon>
                <Input
                  type='password'
                  placeholder='パスワード'
                  {...register('password', {
                    required: 'パスワードを入力してください',
                    minLength: {value: 6, message: '6文字以上入力してください'},
                  })}
                />
              </InputGroup>
              <Text color="red">{errors.password?.message}</Text>
            </VStack>
            <ButtonGroup w="100%" mt={10} justifyContent="right">
              <Button
                type="submit"
                colorScheme="green"
                rightIcon={<ReactIcon iconName='IoMdLogIn'/>}
                isDisabled={isDisabled}
              >ログインする</Button>
            </ButtonGroup>
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}
