import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useState, useEffect } from "react";
import { globalStyles } from "../styles/styles";
import { formatDate } from "../js/main";
//

export const ToDoItem = ({ item, index }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //
  //
  //
  //
  //
  useEffect(() => {
    // console.log("item loaded");
  }, []);

  //
  //
  //
  //
  //

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 200,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              console.log("opening modal");
            }}
          >
            <Text
              style={{
                color: "black",
              }}
            >
              close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={globalStyles.item_parent_1}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            console.log("opening modal");
          }}
        >
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
        </TouchableOpacity>
      </View>
    </View>
  );
};
