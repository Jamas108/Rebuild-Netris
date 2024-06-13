import React, { useState } from "react";
import { Text, Button, Box, VStack, Input, Heading, FormControl, Pressable, StatusBar, Image, HStack, Center } from "native-base";
import { loginUser } from "../actions/AuthAction";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const login = () => {
    setIsLoading(true); // Set loading to true when login is pressed
    if (email && password) {
      loginUser(email, password)
        .then(() => {
          navigation.replace('HomeTab');
        })
        .catch((error) => {
          console.log('Error', error.message);
          setFormError('Email atau Password salah, Harap masukan Email atau Password dengan benar');
        })
        .finally(() => {
          setIsLoading(false); // Set loading back to false when login process finishes
        });
    } else {
      setFormError('Harap isi form login dengan lengkap dan benar');
      setIsLoading(false); // Set loading back to false if form is incomplete
    }
  };

  const Register = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView>
      <Box mt={"0"} bgColor={"blue.100"}>
        <StatusBar barStyle="dark-content" />
        <Box alignItems={"flex-end"} w={"container"} mr={8} mt={0} h={"container"}>
          <Box alignItems="center" mb={1} mt={12}>
          </Box>
        </Box>
        <Box>
          <Heading fontSize={"3xl"} mt={-11} color={"purple.900"} alignSelf={"center"} >
            LOGIN
          </Heading>
        </Box>
        <Center>
          <Box bgColor={"purple.900"} mt={4} width={"400"} h={"full"} borderTopLeftRadius={"50"} borderTopRightRadius={"50"} shadow={"4"}>
            <Box mt={"6"} alignSelf={"start"} ml={10} >
              <Heading fontSize={"2xl"} color={"white"} fontWeight={"light"} shadow={"4"} ml={2} bold>
                Silahkan melakukan Login
              </Heading>
            </Box>
            <Box>
              <VStack space={3} mt="3" mx={5}>
                <FormControl>
                  <Box mt={0} ml={7}>
                    <FormControl.Label>
                      <Text fontSize={"md"} color={"white"}>Email</Text>
                    </FormControl.Label>
                  </Box>
                  <Box h={"12"} bgColor={"purple.200"} borderColor={"black"} mt={0} ml={5} mr={5} borderRadius={20} shadow={"4"} >
                    <Input h={12} w={"100%"} mt={"0"} borderColor={"black"} borderWidth={"2"} borderRadius={20} fontSize={"md"} placeholder="Masukan Email" bgColor={"purple.200"} value={email} onChangeText={(email) => setEmail(email)} />
                  </Box>
                  <Box mt={0} ml={7}>
                    <FormControl.Label>
                      <Text fontSize={"md"} color={"white"}>Password</Text>
                    </FormControl.Label>
                  </Box>
                  <Box h={"12"} bgColor={"purple.200"} borderColor={"black"} mt={0} ml={5} mr={5} borderRadius={20} shadow={"4"} >
                    <Input h={12} w={"100%"} mt={"0"} borderColor={"black"} borderWidth={"2"} borderRadius={20} fontSize={"md"} placeholder="Masukan Email" bgColor={"purple.200"} value={password} onChangeText={(password) => setPassword(password)} secureTextEntry  />
                  </Box>
                </FormControl>
                {formError && <Text ml={5} mt={2} color="red.500" fontSize={"sm"}>{formError}</Text>}
                <Button h={12} borderColor={"purple.200"} bgColor={"purple.200"} borderWidth={"2"} ml={5} mr={5} fontSize={18} borderRadius={20} shadow={"6"} mt={5} onPress={() => login()} isLoading={isLoading}> 
                  <Text color={"black"} fontSize={"md"} bold>Login</Text>
                </Button>
                <Box mt={"10"} alignSelf={"center"} ml={""} ></Box>
                <HStack mt="2" justifyContent="center">
                  <Text fontSize={15} color={"white"} fontWeight={"light"} shadow={"4"} bold>
                    Belum memiliki Akun?
                  </Text>
                  <Pressable onPress={Register} ml={2} mt={-1}  bgColor={"purple.600"} borderRadius={20}  borderColor={"white"} borderWidth={1}>
                    <Text fontStyle={"italic"} w={20} ml={2} fontSize={16} color={"white"} fontWeight={"light"} alignItems={"center"} bold >Registrasi</Text>
                  </Pressable>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Login;
