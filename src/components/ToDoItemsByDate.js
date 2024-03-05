import { View, Text, Dimensions } from "react-native";
import { SingleToDoItem } from "./SingleToDoItem/SingleToDoItem";
import { globalStyles } from "../styles/styles";

export const ToDoItemsByDate = ({
  items,
  getToDoItems,
  sortedByDate,
  screenMode,
  asyncKey,
}) => {
  //
  return (
    <>
      {Object.keys(items)?.length > 0 && (
        <View style={globalStyles.homePage_items_scrollView_viewChild_1}>
          {Object.keys(items).map((month, index) => {
            const itemsForThisMonth = sortedByDate
              ? Object.keys(items[month]).reverse()
              : Object.keys(items[month]);
            return (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "gray",
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  {month}
                </Text>
                {itemsForThisMonth.map((day, index) => {
                  return (
                    <View key={index}>
                      {items[month][day].map((item, index) => {
                        return (
                          <SingleToDoItem
                            item={item}
                            key={index}
                            index={index}
                            screenMode={screenMode}
                            asyncKey={asyncKey}
                            getToDoItems={getToDoItems}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};
