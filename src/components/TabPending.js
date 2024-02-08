import { Dimensions, ScrollView, Text, View } from "react-native";
import { ToDoItem } from "../components/ToDoItem";
import { globalStyles } from "../styles/styles";
import { ToDoItemsByDate } from "./ToDoItemsByDate";
import ToDoItemsByDateHorizontalScroll from "./ToDoItemsByDateHorizontalScroll";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const TabPending = ({
  items,
  getToDoItems,
  sortedByDate,
  screenMode,
}) => {
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "gray",
          marginLeft: 10,
          marginBottom: 10,
        }}
      >
        Today's Focus
      </Text>
      <View
        style={{
          marginVertical: 15,
          height: windowWidth / 3.5,
        }}
      >
        <ToDoItemsByDateHorizontalScroll items={items} />
      </View>
      <ScrollView style={globalStyles.homePage_items_scrollView_1}>
        <ToDoItemsByDate
          items={items}
          screenMode={screenMode}
          getToDoItems={getToDoItems}
          sortedByDate={sortedByDate}
          asyncKey={"pendingItems"}
        />
      </ScrollView>
    </>
  );
};
