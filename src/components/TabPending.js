import { ScrollView, Text, View } from "react-native";
import { ToDoItem } from "../components/ToDoItem";
import { globalStyles } from "../styles/styles";
import { ToDoItemsByDate } from "./ToDoItemsByDate";

export const TabPending = ({ items, getToDoItems, sortedByDate }) => {
  return (
    <ScrollView style={globalStyles.homePage_items_scrollView_1}>
      <ToDoItemsByDate
        items={items}
        getToDoItems={getToDoItems}
        sortedByDate={sortedByDate}
      />
    </ScrollView>
  );
};
