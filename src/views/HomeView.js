import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../styles/styles";
import { useEffect, useState } from "react";
import { TabCompleted } from "../components/TabCompleted";
import { TabTrash } from "../components/TabTrash";
import { TabPending } from "../components/TabPending";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [trash, setTrash] = useState([]);
  const [message, setMessage] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  //
  const [singleItemData, setSingleItemData] = useState({
    flag: "green",
    status: "pending",
    title: "",
    note: "",
    date: new Date(),
    date_created: new Date(),
  });

  const data = [
    { label: "PENDING", value: 0 },
    { label: "COMPLETED", value: 1 },
    { label: "TRASH", value: 2 },
  ];

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
  //
  //

  useEffect(() => {
    getToDoItems();
  }, []);

  function formatDate(date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  function generateUniqueID() {
    const now = new Date();
    const year = now.getFullYear(); // Get the current year (e.g., 2023)
    const month = now.getMonth() + 1; // Get the current month (0-11, so add 1 to get 1-12)
    const day = now.getDate(); // Get the current day of the month (1-31)
    const timestamp = now.getTime(); // Get the current timestamp

    return `id-${year}-${month}-${day}-${timestamp}`;
  }

  const getToDoItems = async () => {
    const keys = ["completedItems", "pendingItems", "trashedItems"];
    try {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let _message = "";
        stores.map((result, i, store) => {
          //
          let key = store[i][0];
          let value = JSON.parse(store[i][1]);
          //
          switch (key) {
            case "completedItems":
              if (value !== null && value !== undefined) {
                setCompleted(value);
                _message += value.length + " Completed ToDo Items Were Added. ";
              } else {
                setCompleted([]);
                _message += "No Completed ToDo Items Were Added. ";
              }
              break;
            case "pendingItems":
              if (value !== null && value !== undefined) {
                setPending(value);
                _message += value.length + " Pending ToDo Items Were Added. ";
              } else {
                setPending([]);
                _message += "No Pending ToDo Items Were Added. ";
              }
              break;
            case "trashedItems":
              if (value !== null && value !== undefined) {
                setTrash(value);
                _message += value.length + " Trashed ToDo Items Were Added. ";
              } else {
                setTrash([]);
                _message += "No Trashed ToDo Items Were Added. ";
              }
              break;

            default:
              break;
          }
        });
        setMessage(_message);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addToDoItems = async () => {
    try {
      const value = await AsyncStorage.getItem("pendingItems");
      if (value !== null) {
        const pendingItems = JSON.parse(value);
        const newItem = singleItemData;
        newItem.id = generateUniqueID();
        pendingItems.push(newItem);
        console.log("pendingItems", pendingItems);
        await AsyncStorage.setItem(
          "pendingItems",
          JSON.stringify(pendingItems)
        );
        setModalVisible(false);
        set;
        getToDoItems();
      }
    } catch (e) {}
  };

  const dev_addToDoItems = async () => {
    try {
      await AsyncStorage.setItem(
        "completedItems",
        JSON.stringify([
          {
            id: "completed001",
            flag: "red",
            status: "completed",
            title: "Wash The Car",
            note: "I must was the red car in the garage so that I can drive it to work tomorrow with my co-workers. Both Android and iOS and most desktop operating systems come with their own set of platform fonts. However, if you want to inject some more brand personality into your app, a well-picked font can go a long way.",
            date: "2023-07-26T14:41:16",
          },
          {
            id: "completed002",
            flag: "yellow",
            status: "completed",
            title: "Write Report",
            note: "Complete the project status report for the team meeting.",
            date: "2023-07-29T09:00:00",
          },
          {
            id: "completed003",
            flag: "orange",
            status: "completed",
            title: "Exercise",
            note: "Go for a 30-minute run in the evening.",
            date: "2023-07-31T17:00:00",
          },
          {
            id: "completed004",
            flag: "blue",
            status: "completed",
            title: "Paint the Living Room",
            note: "Buy paint and start painting the living room walls.",
            date: "2023-08-03T13:30:00",
          },
          {
            id: "completed005",
            flag: "red",
            status: "completed",
            title: "Cook Dinner",
            note: "Prepare a special dinner for a friend's birthday celebration.",
            date: "2023-08-05T19:00:00",
          },
          {
            id: "completed006",
            flag: "green",
            status: "completed",
            title: "Finish Project A",
            note: "Complete all remaining tasks for Project A.",
            date: "2023-08-10T15:30:00",
          },
          {
            id: "completed007",
            flag: "yellow",
            status: "completed",
            title: "Submit Report",
            note: "Submit the quarterly financial report to the management team.",
            date: "2023-08-11T10:00:00",
          },
          {
            id: "completed008",
            flag: "blue",
            status: "completed",
            title: "Plan Anniversary Celebration",
            note: "Plan a surprise anniversary celebration for parents.",
            date: "2023-08-12T18:45:00",
          },
        ])
      );
      await AsyncStorage.setItem(
        "pendingItems",
        JSON.stringify([
          {
            id: "pending0001",
            flag: "blue",
            status: "pending",
            title: "Buy Groceries",
            note: "Need to buy groceries for the weekend family gathering.",
            date: "2023-07-27T10:15:00",
          },
          {
            id: "pending0002",
            flag: "purple",
            status: "pending",
            title: "Read a Book",
            note: "Start reading the new novel I bought last week.",
            date: "2023-07-30T18:20:30",
          },
          {
            id: "pending0003",
            flag: "cyan",
            status: "pending",
            title: "Plan Vacation",
            note: "Start planning the summer vacation trip with family.",
            date: "2023-08-02T14:00:00",
          },
          {
            id: "pending0004",
            flag: "green",
            status: "pending",
            title: "Learn React Native",
            note: "Begin learning React Native for mobile app development.",
            date: "2023-08-04T09:15:00",
          },
          {
            id: "pending0005",
            flag: "red",
            status: "pending",
            title: "Schedule Dentist Appointment",
            note: "Need to schedule a dentist appointment for a checkup.",
            date: "2023-08-13T09:15:00",
          },
          {
            id: "pending0006",
            flag: "purple",
            status: "pending",
            title: "Read New Book",
            note: "Read the new novel recommended by a friend.",
            date: "2023-08-14T17:30:00",
          },
          {
            id: "pending0007",
            flag: "cyan",
            status: "pending",
            title: "Write Blog Post",
            note: "Draft a blog post on the latest technology trends.",
            date: "2023-08-15T12:00:00",
          },
        ])
      );
      await AsyncStorage.setItem(
        "trashedItems",
        JSON.stringify([
          {
            id: "trash001",
            flag: "green",
            status: "trash",
            title: "Clean the Garage",
            note: "Garage cleaning and organizing task.",
            date: "2023-07-28T16:30:45",
          },
          {
            id: "trash002",
            flag: "pink",
            status: "trash",
            title: "Organize Closet",
            note: "Sort out and declutter the closet in the bedroom.",
            date: "2023-08-01T11:45:00",
          },
          {
            id: "trash003",
            flag: "orange",
            status: "trash",
            title: "Clean Attic",
            note: "Dispose of old items and clean the attic space.",
            date: "2023-08-16T14:20:00",
          },
          {
            id: "trash004",
            flag: "pink",
            status: "trash",
            title: "Organize Garage",
            note: "Declutter and organize the garage for more space.",
            date: "2023-08-17T11:30:00",
          },
          {
            id: "trash005",
            flag: "grey",
            status: "trash",
            title: "Delete Old Files",
            note: "Remove unnecessary files and free up disk space.",
            date: "2023-08-18T16:10:00",
          },
        ])
      );
      getToDoItems();
    } catch (e) {}
  };

  const dev_deleteToDoItems = async () => {
    try {
      await AsyncStorage.setItem("completedItems", JSON.stringify([]));
      await AsyncStorage.setItem("pendingItems", JSON.stringify([]));
      await AsyncStorage.setItem("trashedItems", JSON.stringify([]));
      getToDoItems();
    } catch (e) {}
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
      <StatusBar hidden={false} />

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
          {/* INPUTS */}
          <View style={globalStyles.modal_input_group_1}>
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
              placeholder={"Add A Note\n...\n...\n...\n"}
              placeholderTextColor={"silver"}
              multiline={true}
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
                  value={singleItemData.date}
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
                                borderColor: "white",
                              },
                        ]}
                      ></View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
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
                addToDoItems();
              }}
            >
              <Text style={globalStyles.modal_button_1}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* TOPBAR */}
      <View style={globalStyles.homePage_top_parent_1}>
        <Text
          onLongPress={() => {
            dev_deleteToDoItems();
          }}
          onPress={() => {
            dev_addToDoItems();
          }}
          style={globalStyles.homePage_top_header_1}
        >
          DU-MORE
        </Text>
      </View>
      {/* TAB CONTROL */}
      <View style={globalStyles.tab_dropdown_parent}>
        <View style={globalStyles.tab_dropdown_container}>
          {(value || isFocus) && (
            <Text
              style={[
                globalStyles.tab_dropdown_label,
                isFocus && { color: "blue" },
              ]}
            >
              Sort By
            </Text>
          )}
          <Dropdown
            style={[
              globalStyles.tab_dropdown_dropdown,
              isFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={globalStyles.tab_dropdown_placeholderStyle}
            selectedTextStyle={globalStyles.tab_dropdown_selectedTextStyle}
            inputSearchStyle={globalStyles.tab_dropdown_inputSearchStyle}
            iconStyle={globalStyles.tab_dropdown_iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Sort By" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setActiveTab(item.value);
              setValue(item.value);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <Ionicons name="arrow-down" size={30} color="white" />
            // )}
          />
        </View>
        <View
          style={
            {
              // transform: "translateX(50px)"
            }
          }
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Ionicons name="add-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* TABS */}
      {activeTab === 0 && <TabPending items={pending} />}
      {activeTab === 1 && <TabCompleted items={completed} />}
      {activeTab === 2 && <TabTrash items={trash} />}
      {/* TABS CONTROL */}

      {/* <View style={globalStyles.homePage_tab_parent_1}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab(0);
          }}
          style={[
            globalStyles.homePage_tab_button_1,
            { backgroundColor: activeTab === 0 ? "gray" : "black" },
          ]}
        >
          <Text style={globalStyles.homePage_tab_buttonText_1}>COMPLETED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab(1);
          }}
          style={[
            globalStyles.homePage_tab_button_1,
            { backgroundColor: activeTab === 1 ? "gray" : "black" },
          ]}
        >
          <Text style={globalStyles.homePage_tab_buttonText_1}>PENDING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab(2);
          }}
          style={[
            globalStyles.homePage_tab_button_1,
            { backgroundColor: activeTab === 2 ? "gray" : "black" },
          ]}
        >
          <Text style={globalStyles.homePage_tab_buttonText_1}>TRASH</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
