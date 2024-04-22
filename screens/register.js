import { View, StyleSheet, TouchableOpacity, } from "react-native";
import { TextInput } from "react-native-paper";
import { Input, Text, Button } from "native-base";
import { Separator, AuthTextInput, PwdInput } from "../components";
import React, { useState, useEffect } from 'react';
import { registerUser } from '../actions/AuthAction';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
});


const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    if (name && email && password) {
      const data = {
        name: name,
        email: email,
        password: password,
      };

      console.log(data);

      try {
        const user = await registerUser(data, password);
        navigation.replace("HomeTab");
      } catch (error) {
        console.log("Error", error.message);
        setFormError(error.message);
        toggleModal();
      }
    } else {
      setFormError("Harap isi form dengan lengkap dan benar");
      toggleModal();
    }
  };

  const Tabs = () => {
    navigation.navigate("Tabs");
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            color: "#774494",
            fontSize: 35,
          }}
        >
          Sign Up
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        >
          Create account here
        </Text>
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        > Full Name
        </Text>
        <Input
          placeholder="Full Name"
          borderColor={"#774494"}
          borderRadius={"10"}
          width={"95%"}
          variant="outline"
          height={"12"}
          value={name}
          onChangeText={(name) => setName(name)}
          keyboardType="default"
          mt={1}
        />
        <Separator h={20} />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        > Email
        </Text>
        <Input
          placeholder="Email"
          borderColor={"#774494"}
          borderRadius={"10"}
          width={"95%"}
          variant="outline"
          height={"12"}
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="default"
          mt={1}
        />
        <Separator h={20} />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: "#774494",
            fontSize: 15,
          }}
        > Password
        </Text>
        <Input
          placeholder="Password"
          borderColor={"#774494"}
          borderRadius={"10"}
          width={"95%"}
          variant="outline"
          height={"12"}
          value={password}
          onChangeText={(password) => setPassword(password)}
          keyboardType="default"
          mt={1}
        />
        <Separator h={20} />
      </View>
      <View
        style={{ flex: 1.6, justifyContent: "center", alignItems: "center" }}
      >
        <Button text={"Register"} onPress={() => {
          onRegister();
        }} />
        <Separator h={15} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              color: "#774494",
              fontSize: 16,
            }}
          >
            Already have account?
          </Text>
          <Separator w={4} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              color: "#774494",
              fontSize: 16,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
