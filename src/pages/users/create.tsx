import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button} from "@chakra-ui/react";
import Link from "next/link";
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatório').min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});

export default function CreateUser(){

  const {register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })  

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
  }

  return(
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth="1640" mx="auto" px="6">
        <Sidebar />

        <Box as="form" 
        flex="1" 
        borderRadius={8} 
        bg="gray.800" 
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateUser)}
        >
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
            <Divider my="6" borderColor="gray.700"></Divider>

            <VStack>
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input name="name" label="Nome Completo" {...register('name')} />
                <Input name="email"  type="email" label="E-mail" {...register('email')}  />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input name="password" type="password" label="Senha" {...register('password')} />
                <Input name="password_confirmation"  type="password" label="Confirmação de senha" {...register('password_confirmation')} />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
                <Button type="submit" 
                colorScheme="pink"
                isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
        </Box>
      </Flex>
    </Box>
  )
}