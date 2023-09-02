import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ToDoItem } from "../components/ToDoItem";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../styles/styles";
import { useEffect, useState } from "react";
import { TabCompleted } from "../components/TabCompleted";
import { TabTrash } from "../components/TabTrash";
import { TabPending } from "../components/TabPending";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [trash, setTrash] = useState([]);
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
  const _toDoItems = [
    {
      flag: "red",
      status: "completed",
      title: "Wash The Car",
      note: "I must was the red car in the garage so that I can drive it to work tomorrow with my co-workers. Both Android and iOS and most desktop operating systems come with their own set of platform fonts. However, if you want to inject some more brand personality into your app, a well-picked font can go a long way.",
      date: "2023-07-26T14:41:16",
    },
    {
      flag: "yellow",
      status: "completed",
      title: "Write Report",
      note: "Complete the project status report for the team meeting.",
      date: "2023-07-29T09:00:00",
    },
    {
      flag: "orange",
      status: "completed",
      title: "Exercise",
      note: "Go for a 30-minute run in the evening.",
      date: "2023-07-31T17:00:00",
    },
    {
      flag: "blue",
      status: "completed",
      title: "Paint the Living Room",
      note: "Buy paint and start painting the living room walls.",
      date: "2023-08-03T13:30:00",
    },
    {
      flag: "red",
      status: "completed",
      title: "Cook Dinner",
      note: "Prepare a special dinner for a friend's birthday celebration.",
      date: "2023-08-05T19:00:00",
    },
    {
      flag: "green",
      status: "completed",
      title: "Finish Project A",
      note: "Complete all remaining tasks for Project A.",
      date: "2023-08-10T15:30:00",
    },
    {
      flag: "yellow",
      status: "completed",
      title: "Submit Report",
      note: "Submit the quarterly financial report to the management team.",
      date: "2023-08-11T10:00:00",
    },
    {
      flag: "blue",
      status: "completed",
      title: "Plan Anniversary Celebration",
      note: "Plan a surprise anniversary celebration for parents.",
      date: "2023-08-12T18:45:00",
    },
    {
      flag: "blue",
      status: "pending",
      title: "Buy Groceries",
      note: "Need to buy groceries for the weekend family gathering.",
      date: "2023-07-27T10:15:00",
    },
    {
      flag: "purple",
      status: "pending",
      title: "Read a Book",
      note: "Start reading the new novel I bought last week.",
      date: "2023-07-30T18:20:30",
    },
    {
      flag: "cyan",
      status: "pending",
      title: "Plan Vacation",
      note: "Start planning the summer vacation trip with family.",
      date: "2023-08-02T14:00:00",
    },
    {
      flag: "green",
      status: "pending",
      title: "Learn React Native",
      note: "Begin learning React Native for mobile app development.",
      date: "2023-08-04T09:15:00",
    },
    {
      flag: "red",
      status: "pending",
      title: "Schedule Dentist Appointment",
      note: "Need to schedule a dentist appointment for a checkup.",
      date: "2023-08-13T09:15:00",
    },
    {
      flag: "purple",
      status: "pending",
      title: "Read New Book",
      note: "Read the new novel recommended by a friend.",
      date: "2023-08-14T17:30:00",
    },
    {
      flag: "cyan",
      status: "pending",
      title: "Write Blog Post",
      note: "Draft a blog post on the latest technology trends.",
      date: "2023-08-15T12:00:00",
    },
    {
      flag: "green",
      status: "trash",
      title: "Clean the Garage",
      note: "Garage cleaning and organizing task.",
      date: "2023-07-28T16:30:45",
    },
    {
      flag: "pink",
      status: "trash",
      title: "Organize Closet",
      note: "Sort out and declutter the closet in the bedroom.",
      date: "2023-08-01T11:45:00",
    },
    {
      flag: "orange",
      status: "trash",
      title: "Clean Attic",
      note: "Dispose of old items and clean the attic space.",
      date: "2023-08-16T14:20:00",
    },
    {
      flag: "pink",
      status: "trash",
      title: "Organize Garage",
      note: "Declutter and organize the garage for more space.",
      date: "2023-08-17T11:30:00",
    },
    {
      flag: "grey",
      status: "trash",
      title: "Delete Old Files",
      note: "Remove unnecessary files and free up disk space.",
      date: "2023-08-18T16:10:00",
    },
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

  useEffect(() => {
    sortToDoItems(_toDoItems);
  }, []);

  const sortToDoItems = (toDoItems) => {
    const completedItems = [];
    const pendingItems = [];
    const trashItems = [];
    //
    toDoItems.forEach((item) => {
      if (item.status === "completed") {
        completedItems.push(item);
      } else if (item.status === "pending") {
        pendingItems.push(item);
      } else if (item.status === "trash") {
        trashItems.push(item);
      }
    });
    //
    setCompleted(completedItems);
    setPending(pendingItems);
    setTrash(trashItems);
    //
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
  return (
    <View>
      <StatusBar hidden={false} />
      <View style={globalStyles.homePage_top_parent_1}>
        <Text style={globalStyles.homePage_top_header_1}>DU-MORE</Text>
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
