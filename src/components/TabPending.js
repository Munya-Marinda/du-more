import { ScrollView } from "react-native";
import { ToDoItem } from "../components/ToDoItem";
import { globalStyles } from "../styles/styles";

export const TabPending = ({ items, getToDoItems }) => {
  return (
    <ScrollView style={globalStyles.homePage_items_scrollView_1}>
      {items.map((item, index) => {
        return (
          <ToDoItem
            key={index}
            index={index}
            item={item}
            asyncKey={"pendingItems"}
            getToDoItems={getToDoItems}
          />
        );
      })}
    </ScrollView>
  );
};
