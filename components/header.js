import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, HStack, Image, Heading, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = React.memo(({ title, withBack = false }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['right', 'left', 'top']}>
      <StatusBar barStyle="auto" backgroundColor="#774494" />
      <Box bgColor={"#774494"} p={2} h={16}>
        <HStack justifyContent="space-between" alignContent="center">
          <HStack alignContent="center">
            {!withBack ? (
              <Image
                source={require('../assets/slide3.png')}
                w={"24%"}
                h={10}
                alt="Logo"
                mr={2}
                mt={2}
              />
            ) : (
              <Pressable
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <Box mr={3} mt={1}>
                  <Ionicons name="arrow-back-outline" size={34}  color="white" />
                </Box>
              </Pressable>
            )}
            <Heading fontSize={22} mt={3} color="white">{title}</Heading>
          </HStack>
        </HStack>
      </Box>
    </SafeAreaView>
  );
});

export default Header;
