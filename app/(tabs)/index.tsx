import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import AndroidSafeArea from "../../components/AndroidSafeArea";
import { View } from "../../components/Themed";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useInfiniteQuery, useQuery } from "react-query";
import { AntDesign } from "@expo/vector-icons";
import Card from "../../components/Card";
import { Main } from "../../types/TopAnime";
import React from "react";

const fetchAnimePage = async (page: number): Promise<Main> => {
  const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch anime data");
  }
  return res.json();
};

export default function TabOneScreen() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["topAnime"],
      getNextPageParam: (lastPage: any) => {
        if (lastPage.pagination.has_next_page) {
          return lastPage.pagination.current_page + 1;
        }
      },
      queryFn: async ({ pageParam = 1 }) => fetchAnimePage(pageParam),
      cacheTime: 1000 * 60 * 5,
    });
  const [loadingMore, setLoadingMore] = React.useState(false);

  const loadMore = () => {
    setLoadingMore(true);
    if (hasNextPage) {
      fetchNextPage();
      setLoadingMore(false);
    }
  };
  const windowWidth = useWindowDimensions().width;
  const itemWidth = 100; // Misalnya lebar item adalah 100 (dalam satuan piksel)
  const numColumns = Math.floor(windowWidth / itemWidth);

  if (isLoading) {
    return (
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <View>
          <Text>Error</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <Box
        style={{
          gap: 10,
        }}
      >
        <Box
          width={"35%"}
          borderTopRadius={"xl"}
          borderBottomRightRadius={"xl"}
          backgroundColor={"red.500"}
          flexDir={"row"}
          alignSelf={"flex-end"}
        >
          <Box
            style={{
              gap: 8,
              alignItems: "center",
              flexDirection: "row",
              padding: 12,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name='lightning-bolt'
              size={18}
              color='black'
            />
            <Text>Best Top Anime</Text>
          </Box>
        </Box>

        <FlatList
          columnWrapperStyle={{
            gap: 1,
          }}
          onEndReached={() => {
            loadMore();
          }}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          data={data?.pages.map((page: any) => page.data).flat()}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardDismissMode='on-drag'
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <Box width={100 / numColumns + "%"}>
              <Card
                ImagesURL={item.images.jpg.image_url}
                title={item.title}
                score={item.score}
              />
            </Box>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flatList: {
    flexGrow: 0,
    width: "100%",
  },
});
