import { View, Text, Dimensions } from "react-native";
import { ToDoItem } from "./ToDoItem";
import { useEffect } from "react";

export const ToDoItemsByDate = ({ items, getToDoItems, sortedByDate }) => {
  //
  useEffect(() => {
    console.log("ToDoItemsByDate re-rendered");
  }, []);
  //
  return (
    <>
      {!sortedByDate ? (
        <>
          {Object.keys(items).map((month, index) => {
            //
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
                {Object.keys(items[month]).map((day, index) => {
                  //
                  return (
                    <View key={index}>
                      {items[month][day].map((item, index) => {
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
                    </View>
                  );
                })}
              </View>
            );
          })}
        </>
      ) : (
        <>
          {Object.keys(items)
            .reverse()
            .map((month, index) => {
              //
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
                  {Object.keys(items[month])
                    .reverse()
                    .map((day, index) => {
                      //
                      return (
                        <View key={index}>
                          {items[month][day].reverse().map((item, index) => {
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
                        </View>
                      );
                    })}
                </View>
              );
            })}
        </>
      )}
    </>
  );
};
