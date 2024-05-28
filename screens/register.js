// import { View, StyleSheet, TouchableOpacity, } from "react-native";
// import { TextInput } from "react-native-paper";
// import { Input, Text, Button } from "native-base";
// import { Separator, AuthTextInput, PwdInput } from "../components";
// import React, { useState, useEffect } from 'react';
// import { registerUser } from '../actions/AuthAction';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     backgroundColor: "#ffffff",
//   },
// });


// const Register = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const onRegister = async () => {
//     if (name && email && password) {
//       const data = {
//         name: name,
//         email: email,
//         password: password,
//       };

//       console.log(data);

//       try {
//         const user = await registerUser(data, password);
//         navigation.replace("HomeTab");
//       } catch (error) {
//         console.log("Error", error.message);
//         setFormError(error.message);
//         toggleModal();
//       }
//     } else {
//       setFormError("Harap isi form dengan lengkap dan benar");
//       toggleModal();
//     }
//   };

//   const Tabs = () => {
//     navigation.navigate("Tabs");
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
//       >
//         <Text
//           style={{
//             fontFamily: "Inter_600SemiBold",
//             color: "#774494",
//             fontSize: 35,
//           }}
//         >
//           Sign Up
//         </Text>
//         <Text
//           style={{
//             fontFamily: "Inter_400Regular",
//             color: "#774494",
//             fontSize: 15,
//           }}
//         >
//           Create account here
//         </Text>
//       </View>
//       <View style={{ flex: 3, justifyContent: "center" }}>
//         <Text
//           style={{
//             fontFamily: "Inter_400Regular",
//             color: "#774494",
//             fontSize: 15,
//           }}
//         > Full Name
//         </Text>
//         <Input
//           placeholder="Full Name"
//           borderColor={"#774494"}
//           borderRadius={"10"}
//           width={"95%"}
//           variant="outline"
//           height={"12"}
//           value={name}
//           onChangeText={(name) => setName(name)}
//           keyboardType="default"
//           mt={1}
//         />
//         <Separator h={20} />
//         <Text
//           style={{
//             fontFamily: "Inter_400Regular",
//             color: "#774494",
//             fontSize: 15,
//           }}
//         > Email
//         </Text>
//         <Input
//           placeholder="Email"
//           borderColor={"#774494"}
//           borderRadius={"10"}
//           width={"95%"}
//           variant="outline"
//           height={"12"}
//           value={email}
//           onChangeText={(email) => setEmail(email)}
//           keyboardType="default"
//           mt={1}
//         />
//         <Separator h={20} />
//         <Text
//           style={{
//             fontFamily: "Inter_400Regular",
//             color: "#774494",
//             fontSize: 15,
//           }}
//         > Password
//         </Text>
//         <Input
//           placeholder="Password"
//           borderColor={"#774494"}
//           borderRadius={"10"}
//           width={"95%"}
//           variant="outline"
//           height={"12"}
//           value={password}
//           onChangeText={(password) => setPassword(password)}
//           keyboardType="default"
//           mt={1}
//         />
//         <Separator h={20} />
//       </View>
//       <View
//         style={{ flex: 1.6, justifyContent: "center", alignItems: "center" }}
//       >
//         <Button text={"Register"} onPress={() => {
//           onRegister();
//         }} />
//         <Separator h={15} />
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("Login");
//           }}
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: "Inter_400Regular",
//               color: "#774494",
//               fontSize: 16,
//             }}
//           >
//             Already have account?
//           </Text>
//           <Separator w={4} />
//           <Text
//             style={{
//               fontFamily: "Inter_600SemiBold",
//               color: "#774494",
//               fontSize: 16,
//             }}
//           >
//             Sign in
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Text, Button, VStack, Center, Box, Heading } from 'native-base';
import { registerUser } from '../actions/AuthAction';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const onRegister = async () => {
    if (name && email && password) {
      const data = { name, email, password };
      console.log(data);

      try {
        const user = await registerUser(data, password);
        navigation.replace("HomeTab");
      } catch (error) {
        console.log("Error", error.message);
        setFormError(error.message);
      }
    } else {
      setFormError("Harap isi form dengan lengkap dan benar");
    }
  };

  return (
    <View style={styles.container}>
      <Center flex={1}>
        <VStack space={3} alignItems="center" w="90%">
          <Box style={styles.header}>
            <Heading color="#774494">Sign Up</Heading>
            <Text color="#774494" fontSize="sm">Create account here</Text>
          </Box>
          <Input
            placeholder="Full Name"
            variant="outline"
            borderColor="#774494"
            borderRadius="10"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <Input
            placeholder="Email"
            variant="outline"
            borderColor="#774494"
            borderRadius="10"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Input
            placeholder="Password"
            variant="outline"
            borderColor="#774494"
            borderRadius="10"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {formError ? (
            <Text color="red.500" fontSize="xs">{formError}</Text>
          ) : null}
          <Button
            onPress={onRegister}
            colorScheme="purple"
            style={styles.button}
          >
            Register
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ flexDirection: "row", marginTop: 15 }}
          >
            <Text color="#774494" fontSize="sm">Already have account?</Text>
            <Text color="#774494" fontSize="sm" fontWeight="bold" ml={1}>Sign in</Text>
          </TouchableOpacity>
        </VStack>
      </Center>
    </View>
  );
};

export default Register;
