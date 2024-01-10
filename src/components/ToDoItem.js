import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { globalStyles } from "../styles/styles";
import { formatDate } from "../js/main";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ToDoItem = ({ item, asyncKey, screenMode, getToDoItems }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  //
  const [singleItemData, setSingleItemData] = useState({
    flag: "green",
    status: "pending",
    title: "",
    note: "",
    date: new Date(),
    date_created: new Date(),
  });
  //
  const colorOptions = [
    "green",
    "blue",
    "red",
    "yellow",
    "orange",
    "purple",
    "pink",
    "black",
    "white",
    "gray",
    "cyan",
    "magenta",
    "teal",
    "maroon",
  ];
  //
  const saveToDoItems = async () => {
    try {
      const value = await AsyncStorage.getItem(asyncKey);
      const asyncKeys = {
        completed: "completedItems",
        pending: "pendingItems",
        trash: "trashedItems",
      };

      if (value !== null) {
        const items = JSON.parse(value);
        if (singleItemData.status === item.status) {
          items.forEach((_item, index) => {
            if (_item.id === item.id) {
              items[index] = singleItemData;
            }
          });
          // SAVE ITEMS
          try {
            await AsyncStorage.setItem(asyncKey, JSON.stringify(items));
          } catch (e) {}
        } else {
          const updateItems = [];
          items.forEach((_item, index) => {
            if (_item.id !== item.id) {
              updateItems.push(_item);
            }
          });
          try {
            await AsyncStorage.setItem(asyncKey, JSON.stringify(updateItems));
          } catch (e) {}
          //
          try {
            const _value = await AsyncStorage.getItem(
              asyncKeys[singleItemData.status]
            );
            if (_value !== null) {
              const existingItems = JSON.parse(_value);
              const newItem = singleItemData;
              existingItems.unshift(newItem);
              await AsyncStorage.setItem(
                asyncKeys[singleItemData.status],
                JSON.stringify(existingItems)
              );
            }
          } catch (e) {}
        }
      }
    } catch (e) {}
    setModalVisible(false);
  };
  //
  const getToDoItemById = async (id) => {
    try {
      const value = await AsyncStorage.getItem(asyncKey);

      if (value !== null) {
        const items = JSON.parse(value);
        let matchFound = false;
        items.forEach((_item, index) => {
          if (_item.id === id) {
            setSingleItemData(_item);
            matchFound = true;
          }
        });
      }
    } catch (e) {}
    // getToDoItems();
    // setModalVisible(false);
  };
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
    <>
      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyles.modal_parent_1}>
          {/* TASK TITLE */}
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
            {singleItemData.title}
          </Text>
          {/* INPUTS */}
          <ScrollView
            style={{
              width: windowWidth,
            }}
          >
            <View
              style={{
                display: "flex",
                paddingBottom: 30,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* INPUTS */}
              <View style={globalStyles.modal_input_group_1}>
                <View style={[globalStyles.row_center, { marginVertical: 10 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      setSingleItemData({
                        ...singleItemData,
                        status: "pending",
                      });
                    }}
                  >
                    <Text
                      style={[
                        globalStyles.modal_status_buttons,
                        singleItemData.status === "pending"
                          ? { backgroundColor: "yellow", color: "black" }
                          : {},
                      ]}
                    >
                      PENDING
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSingleItemData({
                        ...singleItemData,
                        status: "completed",
                      });
                    }}
                  >
                    <Text
                      style={[
                        globalStyles.modal_status_buttons,
                        singleItemData.status === "completed"
                          ? { backgroundColor: "green", color: "white" }
                          : {},
                      ]}
                    >
                      COMPLETED
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSingleItemData({
                        ...singleItemData,
                        status: "trash",
                      });
                    }}
                  >
                    <Text
                      style={[
                        globalStyles.modal_status_buttons,
                        singleItemData.status === "trash"
                          ? { backgroundColor: "red", color: "white" }
                          : {},
                      ]}
                    >
                      TRASH
                    </Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={globalStyles.modal_text_input}
                  onChangeText={(value) => {
                    setSingleItemData({
                      ...singleItemData,
                      title: value,
                    });
                  }}
                  value={singleItemData.title}
                  placeholder="Title"
                  placeholderTextColor={"silver"}
                />

                <TextInput
                  style={globalStyles.modal_multitext_input}
                  onChangeText={(value) => {
                    setSingleItemData({
                      ...singleItemData,
                      note: value,
                    });
                  }}
                  value={singleItemData.note}
                  placeholder={"Add A Note\n...\n...\n...\n\n\n\n\n\n\n\n\n\n"}
                  placeholderTextColor={"silver"}
                  multiline={true}
                  textAlignVertical="top"
                />

                <View style={globalStyles.modal_color_date_group_1}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDatePicker(true);
                    }}
                  >
                    <Text style={globalStyles.modal_button_2}>
                      {formatDate(singleItemData.date)}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(singleItemData.date)}
                      minimumDate={new Date()}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || singleItemData.date;
                        setSingleItemData({
                          ...singleItemData,
                          date: currentDate,
                        });
                        setShowDatePicker(false);
                      }}
                    />
                  )}

                  <ScrollView
                    horizontal={true}
                    style={globalStyles.modal_color_option_group_2}
                  >
                    <View style={globalStyles.modal_color_option_group_1}>
                      {colorOptions.map((option, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            setSingleItemData({
                              ...singleItemData,
                              flag: option,
                            });
                          }}
                        >
                          <View
                            style={[
                              globalStyles.modal_color_option_1,
                              {
                                backgroundColor: option,
                              },
                              singleItemData.flag !== option
                                ? {}
                                : {
                                    borderWidth: 1,
                                    borderColor: "black",
                                  },
                            ]}
                          ></View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* CANCEL AND SAVE BUTTON */}
          <View style={globalStyles.modal_button_group_1}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={globalStyles.modal_button_1}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const _saveToDoItems = async () => {
                  await saveToDoItems();
                  getToDoItems();
                };
                _saveToDoItems();
              }}
            >
              <Text style={globalStyles.modal_button_1}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TASK ITEM CARD */}
      <TouchableOpacity
        onPress={() => {
          if (screenMode.value === "edit") {
            screenMode.selectedItemsIds(item?.id);
          } else {
            setModalVisible(true);
            getToDoItemById(item?.id);
          }
        }}
        onLongPress={() => {
          screenMode.handleScreenMode("edit");
          screenMode.selectedItemsIds(item?.id);
        }}
      >
        <View style={globalStyles.item_parent_1}>
          <View
            style={[
              globalStyles.item_container_1,
              screenMode.value === "edit" &&
              screenMode.selectedItemsID.indexOf(item?.id) !== -1
                ? {
                    borderWidth: 2,
                    borderColor: "blue",
                  }
                : {},
            ]}
          >
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
                <Text style={globalStyles.item_title_text_1} numberOfLines={1}>
                  {item.title ? item.title : "no title"}
                </Text>
              </View>
              <View style={globalStyles.item_date_text_1_parent}>
                <Text style={globalStyles.item_date_text_1}>
                  {item.date ? formatDate(item.date) : "no date"}
                </Text>
              </View>
            </View>

            {screenMode.value === "edit" && (
              <>
                {/* <View
                  style={[
                    { width: 20, height: 20, borderRadius: 70 },
                    screenMode.selectedItemsID.indexOf(item?.id) !== -1
                      ? {
                          backgroundColor: "blue",
                        }
                      : {
                          borderWidth: 2,
                          borderColor: "blue",
                        },
                  ]}
                ></View> */}
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
