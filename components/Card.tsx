import { StyleSheet, View } from "react-native";
import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  FlatList,
  Image,
  Badge,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  ImagesURL: string;
  title: string;
  score: number;
};

const Card = (props: Props) => {
  return (
    <Box borderRadius={"lg"} margin={1} position='relative'>
      <Flex alignItems={"center"} flexDirection={"column"}>
        <Image
          borderRadius={"lg"}
          source={{
            uri: props.ImagesURL,
          }}
          alt={props.title}
          width={100}
          height={160}
        />
        <Badge
          flexDir={"row"}
          flex={1}
          colorScheme='danger'
          roundedLeft={"lg"}
          zIndex={1}
          roundedTop={"lg"}
          variant='solid'
          position='absolute'
          right={0}
          _text={{
            fontSize: 10,
          }}
        >
          <HStack alignItems={"center"}>
            <AntDesign name='star' size={10} color='black' />
            <Text> {props.score}</Text>
          </HStack>
        </Badge>
        <Flex
          position='absolute'
          bottom={0}
          left={0}
          right={0}
          p={2}
          bg='rgba(0, 0, 0, 0.5)'
        >
          <Text color='white'>{props.title}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Card;

const styles = StyleSheet.create({});
