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
      <StatusBar barStyle="auto" backgroundColor="white" />
      <Box bgColor={"purple.400"} p={2}>
        <HStack justifyContent="space-between" alignContent="center">
          <HStack alignContent="center">
            {!withBack ? (
              <Image
                source={require('../assets/slide3.png')}
                w={12}
                h={12}
                alt="Logo"
                mr={3}
              />
            ) : (
              <Pressable
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <Box mr={3}>
                  <Ionicons name="arrow-back-outline" size={34} color="black" />
                </Box>
              </Pressable>
            )}
            <Heading mt={1} color="black">{title}</Heading>
          </HStack>
        </HStack>
      </Box>
    </SafeAreaView>
  );
});

export default Header;
