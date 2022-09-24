import { Flex, Button, Stack} from '@chakra-ui/react';
import {Input} from '../components/Form/Input';

import { SubmitHandler, useForm } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const {register, watch, handleSubmit, formState } = useForm<SignInFormData>();

  const { errors } = formState;

  // console.log(watch("password"));
  const handleSign: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(values.email)
  }


  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    > 
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"

        onSubmit={handleSubmit(handleSign)}
      >
        <Stack spacing={4}>
           <Input name="email" id="email" label="E-mail" type="email" {...register("email")} />
           <Input name="password" label="Senha" type="password" error={errors.password} {...register("password", {
             required: 'Password obrigatório'
           })} />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex>
  )
}
