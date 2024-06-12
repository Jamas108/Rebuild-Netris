import React from "react";
import { Image } from "react-native";
import { NativeBaseProvider, Box, Text, VStack, Button, ScrollView } from "native-base";
import { Header } from "../components";

const ArticleDetail = ({ route, navigation }) => {
  const { article } = route.params;

  return (
    <NativeBaseProvider>
      <Header title={"Article Detail"} withBack={true} navigation={navigation} />
      <ScrollView flex={1} bg="#fff" p={4}>
        <VStack space={4} alignItems="center">
          <Box width="100%" borderRadius="10" overflow="hidden">
            <Image style={{ width: "100%", height: 380 }} source={article.image} />
          </Box>
          <Text fontSize="2xl" color="#5A1781" bold textAlign="center" mt="4">{article.title}</Text>
          <Text fontSize="md" color="gray.600" textAlign="center" px="4" mb="4" bold>{article.description}</Text>
          <Text fontSize="lg" color="#333" textAlign="justify" px="4" mb="4">{article.fullArticle}</Text>
          <Box h={5}/>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ArticleDetail;
