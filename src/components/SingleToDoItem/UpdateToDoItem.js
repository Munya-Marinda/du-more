import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import PushNotification from "../PushNotification";
import { globalStyles } from "../../styles/styles";
import {
  colorOptions,
  formatDate,
  formatTime,
  initialItemState,
  mergeTimeAndDate,
} from "../../js/main";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function UpdateToDoItem({
  item,
  asyncKey,
  getToDoItems,
  setModalVisible,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [singleItemData, setSingleItemData] = useState(initialItemState);

  const getToDoItemById = async (id) => {
    try {
      const value = await AsyncStorage.getItem(asyncKey);
      if (value !== null) {
        const items = JSON.parse(value);
        items.forEach((_item, index) => {
          if (_item.id === id) {
            setSingleItemData(_item);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

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

  useEffect(() => {
    getToDoItemById(item?.id);
  }, [item]);

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
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    marginRight: 25,
                    fontWeight: "bold",
                  }}
                >
                  Due Date:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                >
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
                  <Text style={globalStyles.modal_button_2}>
                    {formatDate(singleItemData.date)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowTimePicker(true);
                  }}
                >
                  {showTimePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(singleItemData.time)}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || singleItemData.time;
                        setSingleItemData({
                          ...singleItemData,
                          time: currentTime,
                        });
                        setShowTimePicker(false);
                      }}
                    />
                  )}
                  <Text style={globalStyles.modal_button_2}>
                    {formatTime(singleItemData.time)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 10,
                  display: "flex",
                  marginBottom: 20,
                  alignItems: "flex-start",
                  flexDirection: "column",
                  width: windowWidth / 1.2,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Select A Color Tag:
                </Text>
                <View style={globalStyles.modal_color_option_group_2}>
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
                </View>
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
          <PushNotification
            title={"SAVE"}
            addToDoItems={() => {
              const _saveToDoItems = async () => {
                await saveToDoItems();
                getToDoItems();
              };
              _saveToDoItems();
            }}
            taskTitle={singleItemData.title}
            taskNote={singleItemData.note}
            datetime={mergeTimeAndDate(
              singleItemData.date,
              singleItemData.time
            )}
          />
        </View>
      </View>
    </View>
  );
}
