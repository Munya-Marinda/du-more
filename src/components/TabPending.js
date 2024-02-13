import { Dimensions, ScrollView, Text, View } from "react-native";
import { ToDoItem } from "../components/ToDoItem";
import { globalStyles } from "../styles/styles";
import { ToDoItemsByDate } from "./ToDoItemsByDate";
import ToDoItemsMonthlyFocus from "./ToDoItemsMonthlyFocus/ToDoItemsMonthlyFocus";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const TabPending = ({
  items,
  setModalVisible,
  getToDoItems,
  sortedByDate,
  screenMode,
}) => {
  return (
    <>
      {/* <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "gray",
          marginLeft: 10,
        }}
      >
        This Month's Focus
      </Text> */}
      <ToDoItemsMonthlyFocus items={items} setModalVisible={setModalVisible} />
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
