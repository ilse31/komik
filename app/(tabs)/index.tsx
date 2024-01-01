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

export default function TabOneScreen() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["jsonPlaceholder"],
      getNextPageParam: (lastPage: any) => {
        if (lastPage.pagination.has_next_page) {
          return lastPage.pagination.current_page + 1;
        }
      },
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${pageParam}`
        );
        return res.json();
      },
      cacheTime: 1000 * 60 * 5,
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

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
        {/* unlimiate */}
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
            justifyContent: "space-between",
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
          numColumns={3}
          renderItem={({ item }) => (
            <Card
              ImagesURL={item.images.jpg.image_url}
              title={item.title}
              score={item.score}
            />
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
