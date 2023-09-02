import { View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/styles";
import { formatDate } from "../js/main";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ToDoItem = ({ item, index }) => {
  return (
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
                  <Ionicons
                    name="checkbox"
                    style={{ marginRight: 5 }}
                    size={25}
                    color="green"
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
                  <Ionicons
                    name="time"
                    style={{ marginRight: 5 }}
                    size={25}
                    color="orange"
                  />
                </>
              )}
              {item.status === "trash" && (
                <>
                  <Text
                    style={[globalStyles.item_status_text_1, { color: "red" }]}
                  >
                    {item.status ? item.status : "no status"}
                  </Text>
                  <Ionicons
                    name="time"
                    style={{ marginRight: 5 }}
                    size={25}
                    color="red"
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
  );
};
