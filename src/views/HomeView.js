import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../styles/styles";
import { useEffect, useState } from "react";
import { TabCompleted } from "../components/TabCompleted";
import { TabTrash } from "../components/TabTrash";
import { TabPending } from "../components/TabPending";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [trash, setTrash] = useState([]);
  const [message, setMessage] = useState("null");
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

  useEffect(() => {
    getToDoItems();
  }, []);

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
  return (
    <View>
      <StatusBar hidden={false} />
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

        <View style={{ transform: "translateX(50px)" }}>
          <Ionicons name="add-circle" size={30} color="white" />
        </View>
      </View>

      {activeTab === 0 && <TabCompleted items={completed} />}
      {activeTab === 1 && <TabPending items={pending} />}
      {activeTab === 2 && <TabTrash items={trash} />}

      <View style={globalStyles.homePage_tab_parent_1}>
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
      </View>
    </View>
  );
};
