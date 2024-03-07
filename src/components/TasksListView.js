import { ScrollView, Text } from "react-native";
import { globalStyles } from "../styles/styles";
import { ToDoItemsByDate } from "./ToDoItemsByDate";
import { asyncKeys } from "../js/main";

export const TasksListView = ({
  activeTab,
  screenMode,
  _getToDoItems,
  itemsSortedByDate,
}) => {
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  return (
    <ScrollView style={globalStyles.homePage_items_scrollView_1}>
      <ToDoItemsByDate
        asyncKey={asyncKeys[activeTab]}
        items={itemsSortedByDate}
        screenMode={screenMode}
        _getToDoItems={_getToDoItems}
      />
    </ScrollView>
  );
};
