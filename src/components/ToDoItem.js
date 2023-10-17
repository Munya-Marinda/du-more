import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { globalStyles } from "../styles/styles";
import { formatDate } from "../js/main";
//

export const ToDoItem = ({ item, index }) => {
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
  //
  //
  //
  //
  //
  //
  //

  return (
    <View>
      <View style={globalStyles.item_parent_1}>
        <View style={globalStyles.item_container_1}>
          <View
            style={[
              globalStyles.row_flexEnd,
              globalStyles.item_status_text_1_parent,
            ]}
          >
            {!item.status ? (
              "no status"
            ) : (
              <>
                {item.status === "completed" && (
                  <>
                    <Text
                      style={[
                        globalStyles.item_status_text_1,
                        { color: "green" },
                      ]}
                    >
                      {item.status ? item.status : "no status"}
                    </Text>
                    <View
                      style={[
                        globalStyles.item_indicator,
                        {
                          backgroundColor: "green",
                        },
                      ]}
                    />
                  </>
                )}
                {item.status === "pending" && (
                  <>
                    <Text
                      style={[
                        globalStyles.item_status_text_1,
                        { color: "orange" },
                      ]}
                    >
                      {item.status ? item.status : "no status"}
                    </Text>
                    <View
                      style={[
                        globalStyles.item_indicator,
                        {
                          backgroundColor: "orange",
                        },
                      ]}
                    />
                  </>
                )}
                {item.status === "trash" && (
                  <>
                    <Text
                      style={[
                        globalStyles.item_status_text_1,
                        { color: "red" },
                      ]}
                    >
                      {item.status ? item.status : "no status"}
                    </Text>
                    <View
                      style={[
                        globalStyles.item_indicator,
                        {
                          backgroundColor: "red",
                        },
                      ]}
                    />
                  </>
                )}
              </>
            )}
          </View>
          <View
            style={[
              globalStyles.item_flag_1,
              { backgroundColor: item.flag ? item.flag : "gray" },
            ]}
          >
            <Text style={globalStyles.item_flag_text_1}>|</Text>
          </View>
          <View style={globalStyles.item_info_parent_1}>
            <View style={globalStyles.item_title_text_1_parent}>
              <Text style={globalStyles.item_title_text_1}>
                {item.title ? item.title : "no title"}
              </Text>
            </View>
            <View style={globalStyles.item_note_text_1_parent}>
              <Text
                style={globalStyles.item_note_text_1}
                multiline={true}
                numberOfLines={2}
              >
                {item.note ? item.note : "no note"}
              </Text>
            </View>
          </View>
          <View style={globalStyles.item_date_text_1_parent}>
            <Text style={globalStyles.item_date_text_1}>
              {item.date ? formatDate(item.date) : "no date"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
