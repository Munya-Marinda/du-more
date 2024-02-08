import { Dimensions, ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ToDoItemsByDateHorizontalScroll(items) {
  return (
    <ScrollView
      horizontal={true}
      style={{
        marginLeft: 10,
        // borderWidth: 1,
        // borderColor: "blue",
      }}
    >
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
                          <View
                            key={index}
                            style={{
                              padding: 7,
                              marginRight: 10,
                              borderRadius: 10,
                              width: windowWidth / 2.5,
                              height: windowWidth / 3.8,
                              backgroundColor: "#ebebeb",
                            }}
                          >
                            <Text
                              style={globalStyles.item_title_text_1}
                              numberOfLines={1}
                            >
                              {item.title ? item.title : "no title"}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
            </View>
          );
        })}
    </ScrollView>
  );
}

{
  /* <View
                                key={index}
                                style={{
                                  padding: 7,
                                  marginRight: 10,
                                  borderRadius: 10,
                                  width: windowWidth / 2.5,
                                  height: windowWidth / 3.8,
                                  backgroundColor: "#ebebeb",
                                }}
                              >
                                <Text
                                  style={globalStyles.item_title_text_1}
                                  numberOfLines={1}
                                >
                                  {item.title ? item.title : "no title"}
                                </Text>
                              </View> */
}
