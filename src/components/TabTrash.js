import { ScrollView } from "react-native";
import { ToDoItem } from "../components/ToDoItem";
import { globalStyles } from "../styles/styles";
import { ToDoItemsByDate } from "./ToDoItemsByDate";

export const TabTrash = ({ items, getToDoItems, sortedByDate, screenMode }) => {
  return (
    <ScrollView style={globalStyles.homePage_items_scrollView_1}>
      <ToDoItemsByDate
        items={items}
        screenMode={screenMode}
        getToDoItems={getToDoItems}
        sortedByDate={sortedByDate}
        asyncKey={"trashedItems"}
      />
    </ScrollView>
  );
};
