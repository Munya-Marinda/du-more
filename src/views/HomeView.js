import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Alert,
  ToastAndroid,
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
import { ToDoItem } from "../components/ToDoItem";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [trash, setTrash] = useState([]);
  const [completedSortedByDate, setCompletedSortedByDate] = useState({});
  const [pendingSortedByDate, setPendingSortedByDate] = useState({});
  const [trashSortedByDate, setTrashSortedByDate] = useState({});
  const [sortedByDate, setSortedByDate] = useState(false);
  const [message, setMessage] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [devMode, setDevMode] = useState(false);
  //
  const [singleItemData, setSingleItemData] = useState({
    flag: "green",
    status: "pending",
    title: "",
    note: "",
    date: new Date(),
    date_created: new Date(),
  });

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

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const generateUniqueID = () => {
    const now = new Date();
    const year = now.getFullYear(); // Get the current year (e.g., 2023)
    const month = now.getMonth() + 1; // Get the current month (0-11, so add 1 to get 1-12)
    const day = now.getDate(); // Get the current day of the month (1-31)
    const timestamp = now.getTime(); // Get the current timestamp

    return `id-${year}-${month}-${day}-${timestamp}`;
  };

  const getToDoItems = async () => {
    //
    const setNullItem = (key) => {
      try {
        AsyncStorage.setItem(key, JSON.stringify([]));
        getToDoItems();
      } catch (e) {}
    };
    //
    setTimeout(() => {
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
                  _message +=
                    value.length + " Completed ToDo Items Were Added. ";
                  setCompletedSortedByDate(sortTasksByDate(value));
                } else {
                  setCompleted([]);
                  setNullItem("completedItems");
                  _message += "No Completed ToDo Items Were Added. ";
                }
                break;
              case "pendingItems":
                if (value !== null && value !== undefined) {
                  setPending(value);
                  _message += value.length + " Pending ToDo Items Were Added. ";
                  setPendingSortedByDate(sortTasksByDate(value));
                } else {
                  setPending([]);
                  setNullItem("pendingItems");
                  _message += "No Pending ToDo Items Were Added. ";
                }
                break;
              case "trashedItems":
                if (value !== null && value !== undefined) {
                  setTrash(value);
                  _message += value.length + " Trashed ToDo Items Were Added. ";
                  setTrashSortedByDate(sortTasksByDate(value));
                } else {
                  setTrash([]);
                  setNullItem("trashedItems");
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
    }, 200);
  };

  const addToDoItems = async () => {
    try {
      const value = await AsyncStorage.getItem("pendingItems");
      if (value !== null) {
        const pendingItems = JSON.parse(value);
        const newItem = singleItemData;
        newItem.id = generateUniqueID();
        pendingItems.unshift(newItem);
        await AsyncStorage.setItem(
          "pendingItems",
          JSON.stringify(pendingItems)
        );
        setModalVisible(false);
        setSingleItemData({
          flag: "green",
          status: "pending",
          title: "",
          note: "",
          date: new Date(),
          date_created: new Date(),
        });
      }
    } catch (e) {}
    getToDoItems();
  };

  const clearTrash = async () => {
    try {
      await AsyncStorage.setItem("trashedItems", JSON.stringify([]));
    } catch (e) {}
    getToDoItems();
  };

  const searchItems = (_value) => {
    //
    setSearchTerm(_value);
    //
    const jsonData = completed.concat(pending, trash);
    if (
      _value !== undefined &&
      _value !== null &&
      _value !== "" &&
      _value.trim().length > 1
    ) {
      // Search for matches
      const matchingItems = jsonData.filter((item) => {
        // Check title and note
        return (
          item.title.toLowerCase().includes(_value.toLowerCase()) ||
          item.note.toLowerCase().includes(_value.toLowerCase())
        );
      });
      //
      if (matchingItems.length > 0) {
        // show the Id
        const matchingIds = matchingItems.map((item) => item.id);
        setSearchedItems(matchingItems);
      } else {
        setSearchedItems([]);
      }
    } else {
      setSearchedItems([]);
    }
  };

  const dev_addToDoItems = async () => {
    try {
      await AsyncStorage.setItem(
        "completedItems",
        JSON.stringify([
          {
            id: "task019",
            flag: "green",
            status: "completed",
            title: "Beach Day",
            note: "Plan a day trip to the beach for relaxation and fun.",
            date: "2023-07-10T09:30:00",
          },
          {
            id: "task020",
            flag: "pink",
            status: "completed",
            title: "Outdoor Barbecue",
            note: "Host a barbecue party with friends and family in the backyard.",
            date: "2023-07-20T16:00:00",
          },
          {
            id: "task021",
            flag: "orange",
            status: "completed",
            title: "Learn a New Skill",
            note: "Start learning a new skill or hobby during free time.",
            date: "2023-07-29T13:45:00",
          },
          {
            id: "task022",
            flag: "green",
            status: "completed",
            title: "Plan a Picnic",
            note: "Organize a picnic in the local park with friends.",
            date: "2023-08-08T12:00:00",
          },
          {
            id: "task023",
            flag: "pink",
            status: "completed",
            title: "DIY Craft Projects",
            note: "Engage in creative DIY craft projects at home.",
            date: "2023-08-18T14:30:00",
          },
          {
            id: "task024",
            flag: "orange",
            status: "completed",
            title: "Virtual Book Club",
            note: "Start or join a virtual book club for literary discussions.",
            date: "2023-08-27T17:15:00",
          },
          {
            id: "task025",
            flag: "green",
            status: "completed",
            title: "Fall Cleaning",
            note: "Prepare the home for the fall season with a thorough cleaning.",
            date: "2023-09-05T10:30:00",
          },
          {
            id: "task026",
            flag: "pink",
            status: "completed",
            title: "Explore Local Trails",
            note: "Take scenic walks and explore local trails for outdoor exercise.",
            date: "2023-09-15T15:00:00",
          },
          {
            id: "task027",
            flag: "orange",
            status: "completed",
            title: "Backyard Bonfire Night",
            note: "Host a cozy bonfire night in the backyard with friends.",
            date: "2023-09-28T19:45:00",
          },
        ])
      );
      await AsyncStorage.setItem(
        "pendingItems",
        JSON.stringify([
          {
            id: "task001",
            flag: "green",
            status: "pending",
            title: "Clean the Garage",
            note: "Garage cleaning and organizing task.",
            date: "2023-01-10T09:30:00",
          },
          {
            id: "task002",
            flag: "pink",
            status: "pending",
            title: "Organize Living Room",
            note: "Arrange furniture and clean the living room.",
            date: "2023-01-15T14:00:00",
          },
          {
            id: "task003",
            flag: "orange",
            status: "pending",
            title: "Home Office Setup",
            note: "Set up a comfortable home office space.",
            date: "2023-01-28T11:00:00",
          },
          {
            id: "task004",
            flag: "green",
            status: "pending",
            title: "Deep Clean Kitchen",
            note: "Thoroughly clean and organize the kitchen.",
            date: "2023-02-05T10:45:00",
          },
          {
            id: "task005",
            flag: "pink",
            status: "pending",
            title: "Plant Indoor Garden",
            note: "Add indoor plants to enhance the home environment.",
            date: "2023-02-18T13:30:00",
          },
          {
            id: "task006",
            flag: "orange",
            status: "pending",
            title: "Home Workout Routine",
            note: "Establish a consistent home workout routine.",
            date: "2023-02-25T15:15:00",
          },
          {
            id: "task007",
            flag: "green",
            status: "pending",
            title: "Organize Bookshelf",
            note: "Arrange books and declutter the bookshelf.",
            date: "2023-03-08T12:00:00",
          },
          {
            id: "task008",
            flag: "pink",
            status: "pending",
            title: "Spring Cleaning",
            note: "Deep clean and refresh the entire house for spring.",
            date: "2023-03-20T09:30:00",
          },
          {
            id: "task009",
            flag: "orange",
            status: "pending",
            title: "Digital Detox Day",
            note: "Take a day off from screens and enjoy offline activities.",
            date: "2023-03-29T14:45:00",
          },
          {
            id: "task010",
            flag: "green",
            status: "pending",
            title: "Outdoor Cleanup",
            note: "Clean up the backyard and prepare for outdoor activities.",
            date: "2023-04-12T11:00:00",
          },
          {
            id: "task011",
            flag: "pink",
            status: "pending",
            title: "Home Painting Project",
            note: "Start a painting project to refresh the home's interior.",
            date: "2023-04-22T14:30:00",
          },
          {
            id: "task012",
            flag: "orange",
            status: "pending",
            title: "Explore New Recipes",
            note: "Try cooking new recipes and explore different cuisines.",
            date: "2023-04-29T12:15:00",
          },
          {
            id: "task013",
            flag: "green",
            status: "pending",
            title: "Gardening Day",
            note: "Plant flowers and vegetables in the garden.",
            date: "2023-05-08T10:00:00",
          },
          {
            id: "task014",
            flag: "pink",
            status: "pending",
            title: "DIY Home Decor",
            note: "Create handmade decorations to personalize the home.",
            date: "2023-05-18T13:45:00",
          },
          {
            id: "task015",
            flag: "orange",
            status: "pending",
            title: "Virtual Home Tour",
            note: "Organize a virtual home tour with friends and family.",
            date: "2023-05-29T15:30:00",
          },
          {
            id: "task016",
            flag: "green",
            status: "pending",
            title: "Family Movie Night",
            note: "Set up a cozy movie night with family at home.",
            date: "2023-06-06T18:00:00",
          },
          {
            id: "task017",
            flag: "pink",
            status: "pending",
            title: "Organize Digital Files",
            note: "Sort and organize digital files on the computer.",
            date: "2023-06-15T11:30:00",
          },
          {
            id: "task018",
            flag: "orange",
            status: "pending",
            title: "Summer Cleaning",
            note: "Deep clean and declutter for a fresh start to summer.",
            date: "2023-06-28T14:45:00",
          },
          {
            id: "task019",
            flag: "green",
            status: "pending",
            title: "Beach Day",
            note: "Plan a day trip to the beach for relaxation and fun.",
            date: "2023-07-10T09:30:00",
          },
          {
            id: "task020",
            flag: "pink",
            status: "pending",
            title: "Outdoor Barbecue",
            note: "Host a barbecue party with friends and family in the backyard.",
            date: "2023-07-20T16:00:00",
          },
          {
            id: "task021",
            flag: "orange",
            status: "pending",
            title: "Learn a New Skill",
            note: "Start learning a new skill or hobby during free time.",
            date: "2023-07-29T13:45:00",
          },
          {
            id: "task022",
            flag: "green",
            status: "pending",
            title: "Plan a Picnic",
            note: "Organize a picnic in the local park with friends.",
            date: "2023-08-08T12:00:00",
          },
          {
            id: "task023",
            flag: "pink",
            status: "pending",
            title: "DIY Craft Projects",
            note: "Engage in creative DIY craft projects at home.",
            date: "2023-08-18T14:30:00",
          },
          {
            id: "task024",
            flag: "orange",
            status: "pending",
            title: "Virtual Book Club",
            note: "Start or join a virtual book club for literary discussions.",
            date: "2023-08-27T17:15:00",
          },
          {
            id: "task025",
            flag: "green",
            status: "pending",
            title: "Fall Cleaning",
            note: "Prepare the home for the fall season with a thorough cleaning.",
            date: "2023-09-05T10:30:00",
          },
          {
            id: "task026",
            flag: "pink",
            status: "pending",
            title: "Explore Local Trails",
            note: "Take scenic walks and explore local trails for outdoor exercise.",
            date: "2023-09-15T15:00:00",
          },
          {
            id: "task027",
            flag: "orange",
            status: "pending",
            title: "Backyard Bonfire Night",
            note: "Host a cozy bonfire night in the backyard with friends.",
            date: "2023-09-28T19:45:00",
          },
          {
            id: "task028",
            flag: "green",
            status: "pending",
            title: "Pumpkin Carving",
            note: "Engage in pumpkin carving activities for Halloween decorations.",
            date: "2023-10-10T14:00:00",
          },
          {
            id: "task029",
            flag: "pink",
            status: "pending",
            title: "Home Movie Night",
            note: "Create a cozy home movie night with favorite films and snacks.",
            date: "2023-10-22T19:30:00",
          },
          {
            id: "task030",
            flag: "orange",
            status: "pending",
            title: "Try a New Recipe",
            note: "Experiment with cooking by trying out a new recipe for dinner.",
            date: "2023-10-30T18:15:00",
          },
          {
            id: "task031",
            flag: "green",
            status: "pending",
            title: "Thanksgiving Prep",
            note: "Prepare for Thanksgiving by planning the menu and decorations.",
            date: "2023-11-10T12:45:00",
          },
          {
            id: "task032",
            flag: "pink",
            status: "pending",
            title: "Nature Walk",
            note: "Take a leisurely nature walk to enjoy the fall foliage.",
            date: "2023-11-18T15:30:00",
          },
          {
            id: "task033",
            flag: "orange",
            status: "pending",
            title: "Gratitude Journaling",
            note: "Start a gratitude journal to reflect on daily blessings.",
            date: "2023-11-27T21:00:00",
          },
          {
            id: "task034",
            flag: "green",
            status: "pending",
            title: "Holiday Decorations",
            note: "Decorate the home with festive holiday decorations and lights.",
            date: "2023-12-05T17:00:00",
          },
          {
            id: "task035",
            flag: "pink",
            status: "pending",
            title: "Virtual Holiday Party",
            note: "Host a virtual holiday party for friends and family.",
            date: "2023-12-18T20:15:00",
          },
          {
            id: "task036",
            flag: "orange",
            status: "pending",
            title: "Year-End Reflection",
            note: "Reflect on the achievements and experiences of the year.",
            date: "2023-12-31T23:59:59",
          },
        ])
      );
      await AsyncStorage.setItem(
        "trashedItems",
        JSON.stringify([
          {
            id: "task011",
            flag: "pink",
            status: "trash",
            title: "Home Painting Project",
            note: "Start a painting project to refresh the home's interior.",
            date: "2023-04-22T14:30:00",
          },
          {
            id: "task012",
            flag: "orange",
            status: "trash",
            title: "Explore New Recipes",
            note: "Try cooking new recipes and explore different cuisines.",
            date: "2023-04-29T12:15:00",
          },
          {
            id: "task013",
            flag: "green",
            status: "trash",
            title: "Gardening Day",
            note: "Plant flowers and vegetables in the garden.",
            date: "2023-05-08T10:00:00",
          },
          {
            id: "task014",
            flag: "pink",
            status: "trash",
            title: "DIY Home Decor",
            note: "Create handmade decorations to personalize the home.",
            date: "2023-05-18T13:45:00",
          },
          {
            id: "task015",
            flag: "orange",
            status: "trash",
            title: "Virtual Home Tour",
            note: "Organize a virtual home tour with friends and family.",
            date: "2023-05-29T15:30:00",
          },
          {
            id: "task016",
            flag: "green",
            status: "trash",
            title: "Family Movie Night",
            note: "Set up a cozy movie night with family at home.",
            date: "2023-06-06T18:00:00",
          },
          {
            id: "task017",
            flag: "pink",
            status: "trash",
            title: "Organize Digital Files",
            note: "Sort and organize digital files on the computer.",
            date: "2023-06-15T11:30:00",
          },
          {
            id: "task018",
            flag: "orange",
            status: "trash",
            title: "Summer Cleaning",
            note: "Deep clean and declutter for a fresh start to summer.",
            date: "2023-06-28T14:45:00",
          },
          {
            id: "task019",
            flag: "green",
            status: "trash",
            title: "Beach Day",
            note: "Plan a day trip to the beach for relaxation and fun.",
            date: "2023-07-10T09:30:00",
          },

          {
            id: "task024",
            flag: "orange",
            status: "trash",
            title: "Virtual Book Club",
            note: "Start or join a virtual book club for literary discussions.",
            date: "2023-08-27T17:15:00",
          },
          {
            id: "task025",
            flag: "green",
            status: "trash",
            title: "Fall Cleaning",
            note: "Prepare the home for the fall season with a thorough cleaning.",
            date: "2023-09-05T10:30:00",
          },
          {
            id: "task026",
            flag: "pink",
            status: "trash",
            title: "Explore Local Trails",
            note: "Take scenic walks and explore local trails for outdoor exercise.",
            date: "2023-09-15T15:00:00",
          },
          {
            id: "task027",
            flag: "orange",
            status: "trash",
            title: "Backyard Bonfire Night",
            note: "Host a cozy bonfire night in the backyard with friends.",
            date: "2023-09-28T19:45:00",
          },
        ])
      );
      getToDoItems();
    } catch (e) {}
  };

  const dev_deleteToDoItems = async () => {
    try {
      AsyncStorage.clear();
      getToDoItems();
    } catch (e) {}
  };

  const sortTasksByDate = (tasks) => {
    return tasks.reduce((result, task) => {
      const date = new Date(task.date);
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();

      if (!result[month]) {
        result[month] = {};
      }

      if (!result[month][day]) {
        result[month][day] = [];
      }

      result[month][day].push(task);
      return result;
    }, {});
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
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 30, right: 30, zIndex: 999 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons name="add-circle" size={50} color="grey" />
      </TouchableOpacity>

      <StatusBar hidden={false} />

      {/* BURGER MENU MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBurgerMenu}
        onRequestClose={() => {
          setShowBurgerMenu(!showBurgerMenu);
        }}
      >
        <Pressable
          onPress={() => {
            setShowBurgerMenu(!showBurgerMenu);
          }}
          style={{
            position: "relative",
            width: windowWidth,
            height: windowHeight,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              bottom: 0,
              // right: 20,
              zIndex: 999,
              width: windowWidth,
              // borderWidth: 1,
              position: "absolute",
              // borderColor: "silver",
              backgroundColor: "white",
            }}
          >
            <Text
              style={[
                {
                  fontSize: 12,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  backgroundColor: "#e1e1e1",
                },
              ]}
            >
              Tabs
            </Text>
            {activeTab !== "PENDING" && (
              <Pressable
                onPress={() => {
                  setShowBurgerMenu(false);
                  setActiveTab("PENDING");
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: "silver",
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    Pending Tasks
                  </Text>
                )}
              </Pressable>
            )}
            {activeTab !== "COMPLETED" && (
              <Pressable
                onPress={() => {
                  setShowBurgerMenu(false);
                  setActiveTab("COMPLETED");
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: "silver",
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    Completed Tasks
                  </Text>
                )}
              </Pressable>
            )}
            {activeTab !== "TRASH" && (
              <Pressable
                onPress={() => {
                  setShowBurgerMenu(false);
                  setActiveTab("TRASH");
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: "silver",
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    View Trash Bin
                  </Text>
                )}
              </Pressable>
            )}

            <Text
              style={[
                {
                  fontSize: 12,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  backgroundColor: "#e1e1e1",
                },
              ]}
            >
              Filter
            </Text>
            <Pressable
              onPress={() => {
                setShowBurgerMenu(false);
                setSortedByDate(!sortedByDate);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {({ pressed }) => (
                <>
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: "silver",
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    Sort By Date
                    <Ionicons
                      name={sortedByDate ? "arrow-up" : "arrow-down"}
                      size={20}
                      color="grey"
                    />
                  </Text>
                </>
              )}
            </Pressable>

            {devMode && (
              <>
                <Text
                  style={[
                    {
                      fontSize: 12,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      backgroundColor: "#ba0000",
                      color: "white",
                    },
                  ]}
                >
                  Developer
                </Text>
                <Pressable
                  onPress={() => {
                    setShowBurgerMenu(false);
                    dev_addToDoItems();
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        {
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: "#ffa1a1",
                        },
                        globalStyles.burgerMenuButton,
                      ]}
                    >
                      Create Test Data
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowBurgerMenu(false);
                    dev_deleteToDoItems();
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        {
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: "#ffa1a1",
                        },
                        globalStyles.burgerMenuButton,
                      ]}
                    >
                      Delete All Data
                    </Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* ADD ITEM MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyles.modal_parent_1}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
            ADD NEW TASK
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
                  placeholderTextColor={"gray"}
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
                  placeholder={"Add A Note\n...\n...\n\n\n\n\n\n\n\n\n\n"}
                  placeholderTextColor={"gray"}
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
                Alert.alert(
                  "Cancel Adding Task",
                  "Are you sure you want to cancel?",
                  [
                    {
                      text: "No",
                      onPress: () => {
                        return false;
                      },
                      style: "cancel",
                    },
                    {
                      text: "YES",
                      onPress: () => {
                        setSingleItemData({
                          flag: "green",
                          status: "pending",
                          title: "",
                          note: "",
                          date: new Date(),
                          date_created: new Date(),
                        });
                        setModalVisible(false);
                      },
                    },
                  ]
                );
              }}
            >
              <Text style={globalStyles.modal_button_1}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                addToDoItems();
              }}
            >
              <Text style={globalStyles.modal_button_1}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* SEARCH ITEMS MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={searchModalVisible}
        onRequestClose={() => {
          setSearchModalVisible(!searchModalVisible);
        }}
      >
        <View style={globalStyles.search_modal_parent_1}>
          {/* SEARCH INPUT */}
          <View style={globalStyles.modal_input_group_1}>
            <TextInput
              style={globalStyles.search_modal_text_input}
              onChangeText={(value) => {
                value;
                searchItems(value);
              }}
              value={searchTerm}
              placeholder="Search ..."
              placeholderTextColor={"gray"}
            />
          </View>
          {/* RESULTS PREVIEW */}
          <ScrollView>
            {searchedItems !== undefined &&
            searchedItems !== null &&
            searchedItems.length > 0 ? (
              <>
                {searchedItems.map((item, index) => {
                  return (
                    <ToDoItem
                      key={index}
                      index={index}
                      item={item}
                      asyncKey={"completedItems"}
                      getToDoItems={getToDoItems}
                    />
                  );
                })}
              </>
            ) : (
              <Text
                style={{
                  color: "gray",
                  marginTop: 150,
                  fontSize: 16,
                }}
              >
                {searchTerm === "" ? "" : "NO RESULTS FOUND"}
              </Text>
            )}
          </ScrollView>
          {/* CANCEL AND SAVE BUTTON */}
          <View style={globalStyles.modal_button_group_1}>
            <TouchableOpacity
              onPress={() => {
                setSearchModalVisible(false);
              }}
            >
              <Text style={globalStyles.modal_button_1}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TOPBAR */}
      <View style={globalStyles.homePage_top_parent_1}>
        {/* <Text
          onLongPress={() => {
            dev_deleteToDoItems();
          }}
          onPress={() => {
            dev_addToDoItems();
          }}
          style={globalStyles.homePage_top_header_1}
        >
          DU-MORE
        </Text> */}
        <TouchableOpacity
          onPress={() => {
            searchItems("");
            setSearchTerm("");
            setSearchModalVisible(true);
          }}
          style={globalStyles.homePage_search_button}
        >
          <Ionicons name="search" size={25} color="gray" />
        </TouchableOpacity>

        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{activeTab}</Text>

        <TouchableOpacity
          onPress={() => {
            setShowBurgerMenu(!showBurgerMenu);
          }}
          onLongPress={() => {
            ToastAndroid.show(
              !devMode ? "MUNYA Dev Mode Actived" : "MUNYA Dev Mode De-Actived",
              ToastAndroid.LONG,
              1000
            );
            setDevMode(!devMode);
          }}
          style={[
            globalStyles.homePage_search_button,
            {
              backgroundColor: !devMode ? "transparent" : "red",
              borderRadius: 50,
              paddingHorizontal: 2,
            },
          ]}
        >
          <Ionicons
            name="menu-outline"
            size={35}
            color={!devMode ? "gray" : "white"}
          />
        </TouchableOpacity>
      </View>

      {/* TABS CONTROL */}
      {/* <View
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 15,
        }}
      >
        <Pressable
          onPress={() => {
            setActiveTab("PENDING");
          }}
        >
          {({ pressed }) => (
            <Text
              style={[
                globalStyles.tab_select_botton,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              PENDING
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setActiveTab("COMPLETED");
          }}
        >
          {({ pressed }) => (
            <Text
              style={[
                globalStyles.tab_select_botton,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              COMPLETED
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setActiveTab("TRASH");
          }}
        >
          {({ pressed }) => (
            <Text
              style={[
                globalStyles.tab_select_botton,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              TRASH
            </Text>
          )}
        </Pressable>
      </View> */}
      {/* TAB OPTIONS */}
      <View style={globalStyles.row_flexEnd}>
        <View>
          {activeTab === "TRASH" && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Clear Trash?",
                  "All tasks in the trash will be deleted.",
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        return false;
                      },
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        clearTrash();
                      },
                    },
                  ]
                );
              }}
            >
              <Text
                style={{
                  color: "red",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                Clear Trash
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* TABS */}
      {activeTab === "PENDING" && (
        <TabPending
          getToDoItems={getToDoItems}
          sortedByDate={sortedByDate}
          items={pendingSortedByDate}
        />
      )}
      {activeTab === "COMPLETED" && (
        <TabCompleted
          getToDoItems={getToDoItems}
          sortedByDate={sortedByDate}
          items={completedSortedByDate}
        />
      )}
      {activeTab === "TRASH" && (
        <TabTrash
          getToDoItems={getToDoItems}
          sortedByDate={sortedByDate}
          items={trashSortedByDate}
        />
      )}
    </View>
  );
};
