import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Alert,
  ToastAndroid,
  Linking,
  Share,
  Image,
} from "react-native";
import * as Device from "expo-device";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../styles/styles";
import { useEffect, useState } from "react";
import { TabCompleted } from "../components/TabCompleted";
import { TabTrash } from "../components/TabTrash";
import { TabPending } from "../components/TabPending";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToDoItem } from "../components/ToDoItem";
import {
  DEV_TEST_DATA_COMPLETED,
  DEV_TEST_DATA_PENDING,
  DEV_TEST_DATA_TRASH,
} from "../js/main";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const HomePage = () => {
  const initialItemState = {
    flag: "green",
    status: "pending",
    title: "",
    note: "",
    date: new Date(),
    date_created: new Date(),
  };
  //
  const [activeTab, setActiveTab] = useState("PENDING");
  const [screenMode, setScreenMode] = useState({
    handleScreenMode: handleScreenMode,
    value: "",
    selectedItemsID: [],
  });
  //
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [trash, setTrash] = useState([]);
  //
  const [completedSortedByDate, setCompletedSortedByDate] = useState({});
  const [pendingSortedByDate, setPendingSortedByDate] = useState({});
  const [trashSortedByDate, setTrashSortedByDate] = useState({});
  //
  const [sortedByDate, setSortedByDate] = useState(false);
  const [message, setMessage] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  //
  const [singleItemData, setSingleItemData] = useState(initialItemState);

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
    const year = now.getFullYear(); //
    const month = now.getMonth() + 1; //
    const day = now.getDate(); //
    const timestamp = now.getTime(); //

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
                  setCompletedSortedByDate(
                    sortObjectByMonth(sortTasksByDate(value))
                  );
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
                  setPendingSortedByDate(
                    sortObjectByMonth(sortTasksByDate(value))
                  );
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
                  setTrashSortedByDate(
                    sortObjectByMonth(sortTasksByDate(value))
                  );
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
        setActiveTab("PENDING");
        setSingleItemData(initialItemState);
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

  const sortObjectByMonth = (obj) => {
    // Convert the object to an array of key-value pairs
    const entries = Object.entries(obj);

    // Sort the array of key-value pairs by month
    const sortedEntries = entries.sort(([monthA], [monthB]) => {
      const monthsOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB);
    });

    // Convert the sorted array back to an object
    const sortedObject = Object.fromEntries(sortedEntries);

    return sortedObject;
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

  const handleScreenMode = (mode) => {
    setScreenMode((prevScreenMode) => ({
      ...prevScreenMode,
      value: mode,
    }));
  };

  const selectedItemsIds = (item) => {
    if (screenMode.selectedItemsID.indexOf(item) !== -1) {
      setScreenMode((prevScreenMode) => ({
        ...prevScreenMode,
        selectedItemsID: prevScreenMode.selectedItemsID.filter(
          (selectedItem) => selectedItem !== item
        ),
      }));
    } else {
      setScreenMode((prevScreenMode) => ({
        ...prevScreenMode,
        selectedItemsID: [...prevScreenMode.selectedItemsID, item],
      }));
    }
  };

  const editSelectedItems = async (moveTo) => {
    try {
      const asyncKeys = {
        COMPLETED: "completedItems",
        PENDING: "pendingItems",
        TRASH: "trashedItems",
      };
      const value = await AsyncStorage.getItem(asyncKeys[activeTab]);

      if (value !== null) {
        const items = JSON.parse(value);
        const newItems = [];
        const oldItems = [];
        //
        items.forEach((_item) => {
          if (screenMode.selectedItemsID.indexOf(_item.id) === -1) {
            newItems.push(_item);
          } else {
            _item.status = moveTo.toLowerCase();
            oldItems.push(_item);
          }
        });
        //
        switch (asyncKeys[activeTab]) {
          case "completedItems":
            setPendingSortedByDate(sortTasksByDate(newItems));
          case "pendingItems":
            setCompletedSortedByDate(sortTasksByDate(newItems));
          case "trashedItems":
            setTrashSortedByDate(sortTasksByDate(newItems));
          default:
            break;
        }
        // save the new list of items
        await AsyncStorage.setItem(
          asyncKeys[activeTab],
          JSON.stringify(newItems)
        );
        // move the old list of items
        const newAsyncValue = await AsyncStorage.getItem(asyncKeys[moveTo]);
        if (newAsyncValue !== null) {
          const newAsyncItems = JSON.parse(newAsyncValue);
          const newCombinedItems = [...oldItems, ...newAsyncItems];
          await AsyncStorage.setItem(
            asyncKeys[moveTo],
            JSON.stringify(newCombinedItems)
          );
          switch (moveTo) {
            case "COMPLETED":
              setPendingSortedByDate(sortTasksByDate(newCombinedItems));
            case "PENDING":
              setCompletedSortedByDate(sortTasksByDate(newCombinedItems));
            case "TRASH":
              setTrashSortedByDate(sortTasksByDate(newCombinedItems));

            default:
              break;
          }
        }

        //
        setScreenMode((prevScreenMode) => ({
          ...prevScreenMode,
          selectedItemsID: [],
        }));
        handleScreenMode("");
      }
    } catch (e) {}
    getToDoItems();
    setModalVisible(false);
  };

  const selectAllItems = () => {
    let currentItems = [];
    let currentItemsIds = [];
    switch (activeTab) {
      case "PENDING":
        currentItems = pending;
        break;
      case "COMPLETED":
        currentItems = completed;
        break;
      case "TRASH":
        currentItems = trash;
        break;
      default:
        break;
    }

    currentItems.forEach((item) => {
      currentItemsIds.push(item.id);
    });

    if (currentItems.length === screenMode.selectedItemsID.length) {
      setScreenMode((prevScreenMode) => ({
        ...prevScreenMode,
        selectedItemsID: [],
      }));
    } else {
      setScreenMode((prevScreenMode) => ({
        ...prevScreenMode,
        selectedItemsID: currentItemsIds,
      }));
    }
  };

  const deleteSelectedItemsFromTrash = async () => {
    try {
      const asyncKeys = {
        COMPLETED: "completedItems",
        PENDING: "pendingItems",
        TRASH: "trashedItems",
      };
      const value = await AsyncStorage.getItem(asyncKeys[activeTab]);

      if (value !== null) {
        const items = JSON.parse(value);
        const newItems = [];
        //
        items.forEach((_item) => {
          if (screenMode.selectedItemsID.indexOf(_item.id) === -1) {
            newItems.push(_item);
          }
        });
        //
        switch (asyncKeys[activeTab]) {
          case "completedItems":
            setPendingSortedByDate(sortTasksByDate(newItems));
          case "pendingItems":
            setCompletedSortedByDate(sortTasksByDate(newItems));
          case "trashedItems":
            setTrashSortedByDate(sortTasksByDate(newItems));
          default:
            break;
        }
        // save the new list of items
        await AsyncStorage.setItem(
          asyncKeys[activeTab],
          JSON.stringify(newItems)
        );

        //
        setScreenMode((prevScreenMode) => ({
          ...prevScreenMode,
          selectedItemsID: [],
        }));
        handleScreenMode("");
      }
    } catch (e) {}
    getToDoItems();
    setModalVisible(false);
  };

  const openWebLink = (link) => {
    Linking.openURL(link).catch((error) =>
      console.error("Error opening link:", error)
    );
  };

  const openEmailApp = (toEmail, subject, body) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const url = `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    Linking.openURL(url).catch((error) =>
      console.error("Error opening email app:", error)
    );
  };

  const dev_addToDoItems = async () => {
    try {
      await AsyncStorage.setItem(
        "completedItems",
        JSON.stringify(DEV_TEST_DATA_COMPLETED)
      );
      await AsyncStorage.setItem(
        "pendingItems",
        JSON.stringify(DEV_TEST_DATA_PENDING)
      );
      await AsyncStorage.setItem(
        "trashedItems",
        JSON.stringify(DEV_TEST_DATA_TRASH)
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

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
      {/* ADD NEW TASK ICON */}
      {screenMode.value !== "edit" && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 30, right: 30, zIndex: 999 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Ionicons name="add-circle" size={50} color="grey" />
        </TouchableOpacity>
      )}

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
            display: "flex",
            width: windowWidth,
            height: windowHeight,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <ScrollView
            style={{
              width: windowWidth * 0.9,
              maxHeight: windowHeight * 0.8,
              backgroundColor: "white",
            }}
          >
            <>
              {/* FILTER */}
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
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    <Ionicons
                      name={sortedByDate ? "arrow-up" : "arrow-down"}
                      size={20}
                      color="black"
                    />
                    {"  "} Sort By Date
                  </Text>
                )}
              </Pressable>

              {/* ACTIONS */}
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
                Actions
              </Text>
              <Pressable
                onPress={() => {
                  setShowBurgerMenu(false);
                  setModalVisible(true);
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    <Ionicons name={"add"} size={20} color="black" />
                    {"  "} Add New Task
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  searchItems("");
                  setSearchTerm("");
                  setShowBurgerMenu(false);
                  setSearchModalVisible(true);
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
                          backgroundColor: "white",
                          borderTopColor: "gray",
                          borderTopWidth: 1,
                        },
                        globalStyles.burgerMenuButton,
                      ]}
                    >
                      <Ionicons name="search" size={20} color="black" />
                      {"  "} Search Tasks
                    </Text>
                  </>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowBurgerMenu(false);
                  handleScreenMode("edit");
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
                          backgroundColor: "white",
                          borderTopColor: "gray",
                          borderTopWidth: 1,
                        },
                        globalStyles.burgerMenuButton,
                      ]}
                    >
                      <Ionicons name={"pencil-sharp"} size={20} color="black" />
                      {"  "} Edit Tasks
                    </Text>
                  </>
                )}
              </Pressable>

              {/* ABOUT */}
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
                About
              </Text>
              <Pressable
                onPress={() => {
                  // setShowBurgerMenu(false);
                  const shareApp = async () => {
                    try {
                      const result = await Share.share({
                        message:
                          "Hey.\nCheck out this cool To Do app called *Du-More*. It has increased my productivity ALOT! 💯.\n\nhttps://play.google.com/store/apps/details?id=com.munya_m.dumore",
                      });
                      if (result.action === Share.sharedAction) {
                        if (result.activityType) {
                          // shared with activity type of result.activityType
                        } else {
                          // shared
                        }
                      } else if (result.action === Share.dismissedAction) {
                        // dismissed
                      }
                    } catch (error) {
                      Alert.alert(error.message);
                    }
                  };
                  shareApp();
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    <Ionicons name={"share-social"} size={20} color="black" />
                    {"  "} Share with friends
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  // setShowBurgerMenu(false);
                  const link =
                    Device.brand.toUpperCase() === "huawei"
                      ? "https://play.google.com/store/apps/details?id=com.munya_m.dumore"
                      : "https://play.google.com/store/apps/details?id=com.munya_m.dumore";
                  openWebLink(link);
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    <Ionicons name={"star"} size={20} color="black" />
                    {"  "} Rate App
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  // setShowBurgerMenu(false);
                  openEmailApp(
                    "munyathedev@gmail.com",
                    "DuMore App - User Feedback",
                    "\n\n\n\n\n\n\n- BRAND: " +
                      Device.brand +
                      "\n- DESIGNNAME: " +
                      Device.designName +
                      "\n- DEVICENAME: " +
                      Device.deviceName +
                      "\n- DEVICETYPE: " +
                      Device.deviceType +
                      "\n- DEVICEYEARCLASS: " +
                      Device.deviceYearClass +
                      "\n- ISDEVICE: " +
                      Device.isDevice +
                      "\n- MANUFACTURER: " +
                      Device.manufacturer +
                      "\n- MODELID: " +
                      Device.modelId
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    <Ionicons name={"mail-open"} size={20} color="black" />
                    {"  "} Feedback
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowBurgerMenu(false);
                  setShowPrivacyPolicy(true);
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      globalStyles.burgerMenuButton,
                    ]}
                  >
                    <Ionicons name={"eye"} size={20} color="black" />
                    {"  "} Privacy Policy
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  openWebLink(
                    "https://play.google.com/store/apps/dev?id=9171087412603231862"
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      opacity: pressed ? 0.5 : 1,
                      paddingVertical: 30,
                      paddingHorizontal: 20,
                      width: windowWidth * 0.9,
                      backgroundColor: "white",
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Image
                      source={require("../../assets/md-logo.png")}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        Download More Apps By{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#0066a4",
                        }}
                      >
                        MUNYA Dev
                      </Text>
                    </View>
                  </View>
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
                        <Ionicons name={"skull"} size={20} color="black" />
                        {"  "} Create Test Data
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
                        <Ionicons name={"skull"} size={20} color="black" />
                        {"  "} Delete All Data
                      </Text>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setDevMode(false);
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
                        <Ionicons name={"skull"} size={20} color="black" />
                        {"  "} Turn Off Dev Mode
                      </Text>
                    )}
                  </Pressable>
                </>
              )}
            </>
          </ScrollView>

          <Pressable
            onPress={() => {
              setShowBurgerMenu(false);
            }}
          >
            {({ pressed }) => (
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: "white",
                    fontWeight: "bold",
                    paddingVertical: 15,
                    textAlign: "center",
                    paddingHorizontal: 20,
                    backgroundColor: "gray",
                    width: windowWidth * 0.9,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                CLOSE
              </Text>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* PRIVACY POLICY MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPrivacyPolicy}
        onRequestClose={() => {
          setShowPrivacyPolicy(false);
        }}
      >
        <Pressable
          onPress={() => {
            // setShowPrivacyPolicy(false);
          }}
          style={{
            display: "flex",
            width: windowWidth,
            height: windowHeight,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <Pressable
            onPress={() => {
              openWebLink(
                "https://munya-dev.vercel.app/privacy-policy/app/du-more"
              );
              setShowPrivacyPolicy(false);
            }}
            style={{
              width: windowWidth,
              paddingVertical: 20,
              backgroundColor: "black",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {({ pressed }) => (
              <>
                <Text style={{ color: "white", marginRight: 10 }}>
                  {pressed ? "...OPENING BROWSER" : "GO TO WEBSITE"}
                </Text>
                <Ionicons name={"arrow-forward"} size={25} color={"white"} />
              </>
            )}
          </Pressable>
          <ScrollView
            style={{
              width: windowWidth * 1,
              height: windowHeight * 0.8,
              backgroundColor: "white",
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            <WebView
              automaticallyAdjustContentInsets={true}
              source={{
                html: '<!DOCTYPE html>    <html>    <head>      <meta charset="utf-8">      <meta name="viewport" content="width=device-width">      <title>Privacy Policy</title>      <style> body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; padding:1em; } </style>    </head>    <body>    <strong>Privacy Policy</strong> <p>                  Munya Dev built the Du-More app as                  a Free app. This SERVICE is provided by                  Munya Dev at no cost and is intended for use as                  is.                </p> <p>                  This page is used to inform visitors regarding my                  policies with the collection, use, and disclosure of Personal                  Information if anyone decided to use my Service.                </p> <p>                  If you choose to use my Service, then you agree to                  the collection and use of information in relation to this                  policy. The Personal Information that I collect is                  used for providing and improving the Service. I will not use or share your information with                  anyone except as described in this Privacy Policy.                </p> <p>                  The terms used in this Privacy Policy have the same meanings                  as in our Terms and Conditions, which are accessible at                  Du-More unless otherwise defined in this Privacy Policy.                </p> <p><strong>Information Collection and Use</strong></p> <p>                  For a better experience, while using our Service, I                  may require you to provide us with certain personally                  identifiable information, including but not limited to task title, task notes, task date, task color, user email, user device information, user feedback email. The information that                  I request will be retained on your device and is not collected by me in any way.                </p> <div><p>                    The app does use third-party services that may collect                    information used to identify you.                  </p> <p>                    Link to the privacy policy of third-party service providers used                    by the app                  </p> <ul><li><a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Google Play Services</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p>                  I want to inform you that whenever you                  use my Service, in a case of an error in the app                  I collect data and information (through third-party                  products) on your phone called Log Data. This Log Data may                  include information such as your device Internet Protocol                  (“IP”) address, device name, operating system version, the                  configuration of the app when utilizing my Service,                  the time and date of your use of the Service, and other                  statistics.                </p> <p><strong>Cookies</strong></p> <p>                  Cookies are files with a small amount of data that are                  commonly used as anonymous unique identifiers. These are sent                  to your browser from the websites that you visit and are                  stored on your device"s internal memory.                </p> <p>                  This Service does not use these “cookies” explicitly. However,                  the app may use third-party code and libraries that use                  “cookies” to collect information and improve their services.                  You have the option to either accept or refuse these cookies                  and know when a cookie is being sent to your device. If you                  choose to refuse our cookies, you may not be able to use some                  portions of this Service.                </p> <p><strong>Service Providers</strong></p> <p>                  I may employ third-party companies and                  individuals due to the following reasons:                </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>                  I want to inform users of this Service                  that these third parties have access to their Personal                  Information. The reason is to perform the tasks assigned to                  them on our behalf. However, they are obligated not to                  disclose or use the information for any other purpose.                </p> <p><strong>Security</strong></p> <p>                  I value your trust in providing us your                  Personal Information, thus we are striving to use commercially                  acceptable means of protecting it. But remember that no method                  of transmission over the internet, or method of electronic                  storage is 100% secure and reliable, and I cannot                  guarantee its absolute security.                </p> <p><strong>Links to Other Sites</strong></p> <p>                  This Service may contain links to other sites. If you click on                  a third-party link, you will be directed to that site. Note                  that these external sites are not operated by me.                  Therefore, I strongly advise you to review the                  Privacy Policy of these websites. I have                  no control over and assume no responsibility for the content,                  privacy policies, or practices of any third-party sites or                  services.                </p> <p><strong>Children’s Privacy</strong></p> <div><p>                    These Services do not address anyone under the age of 13.                    I do not knowingly collect personally                    identifiable information from children under 13 years of age. In the case                    I discover that a child under 13 has provided                    me with personal information, I immediately                    delete this from our servers. If you are a parent or guardian                    and you are aware that your child has provided us with                    personal information, please contact me so that                    I will be able to do the necessary actions.                  </p></div> <!----> <p><strong>Changes to This Privacy Policy</strong></p> <p>                  I may update our Privacy Policy from                  time to time. Thus, you are advised to review this page                  periodically for any changes. I will                  notify you of any changes by posting the new Privacy Policy on                  this page.                </p> <p>This policy is effective as of 2024-01-16</p> <p><strong>Contact Us</strong></p> <p>                  If you have any questions or suggestions about my                  Privacy Policy, do not hesitate to contact me at <a href="mailto:munyathedev@gmail.com" >munyathedev@gmail.com</a>.                </p> <p>This privacy policy page was created at <a href="https://privacypolicytemplate.net" target="_blank" rel="noopener noreferrer">privacypolicytemplate.net </a>and modified/generated by <a href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">App Privacy Policy Generator</a></p><br/><br/><br/> <strong>Terms &amp; Conditions</strong> <p>                  By downloading or using the app, these terms will                  automatically apply to you – you should make sure therefore                  that you read them carefully before using the app. You’re not                  allowed to copy or modify the app, any part of the app, or                  our trademarks in any way. You’re not allowed to attempt to                  extract the source code of the app, and you also shouldn’t try                  to translate the app into other languages or make derivative                  versions. The app itself, and all the trademarks, copyright,                  database rights, and other intellectual property rights related                  to it, still belong to Munya Dev.                </p> <p>                  Munya Dev is committed to ensuring that the app is                  as useful and efficient as possible. For that reason, we                  reserve the right to make changes to the app or to charge for                  its services, at any time and for any reason. We will never                  charge you for the app or its services without making it very                  clear to you exactly what you’re paying for.                </p> <p>                  The Du-More app stores and processes personal data that                  you have provided to us, to provide my                  Service. It’s your responsibility to keep your phone and                  access to the app secure. We therefore recommend that you do                  not jailbreak or root your phone, which is the process of                  removing software restrictions and limitations imposed by the                  official operating system of your device. It could make your                  phone vulnerable to malware/viruses/malicious programs,                  compromise your phone’s security features and it could mean                  that the Du-More app won’t work properly or at all.                </p> <div><p>                    The app does use third-party services that declare their                    Terms and Conditions.                  </p> <p>                    Link to Terms and Conditions of third-party service                    providers used by the app                  </p> <ul><li><a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Google Play Services</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p>                  You should be aware that there are certain things that                  Munya Dev will not take responsibility for. Certain                  functions of the app will require the app to have an active                  internet connection. The connection can be Wi-Fi or provided                  by your mobile network provider, but Munya Dev                  cannot take responsibility for the app not working at full                  functionality if you don’t have access to Wi-Fi, and you don’t                  have any of your data allowance left.                </p> <p></p> <p>                  If you’re using the app outside of an area with Wi-Fi, you                  should remember that the terms of the agreement with your                  mobile network provider will still apply. As a result, you may                  be charged by your mobile provider for the cost of data for                  the duration of the connection while accessing the app, or                  other third-party charges. In using the app, you’re accepting                  responsibility for any such charges, including roaming data                  charges if you use the app outside of your home territory                  (i.e. region or country) without turning off data roaming. If                  you are not the bill payer for the device on which you’re                  using the app, please be aware that we assume that you have                  received permission from the bill payer for using the app.                </p> <p>                  Along the same lines, Munya Dev cannot always take                  responsibility for the way you use the app i.e. You need to                  make sure that your device stays charged – if it runs out of                  battery and you can’t turn it on to avail the Service,                  Munya Dev cannot accept responsibility.                </p> <p>                  With respect to Munya Dev’s responsibility for your                  use of the app, when you’re using the app, it’s important to                  bear in mind that although we endeavor to ensure that it is                  updated and correct at all times, we do rely on third parties                  to provide information to us so that we can make it available                  to you. Munya Dev accepts no liability for any                  loss, direct or indirect, you experience as a result of                  relying wholly on this functionality of the app.                </p> <p>                  At some point, we may wish to update the app. The app is                  currently available on Android – the requirements for the                   system(and for any additional systems we                  decide to extend the availability of the app to) may change,                  and you’ll need to download the updates if you want to keep                  using the app. Munya Dev does not promise that it                  will always update the app so that it is relevant to you                  and/or works with the Android version that you have                  installed on your device. However, you promise to always                  accept updates to the application when offered to you, We may                  also wish to stop providing the app, and may terminate use of                  it at any time without giving notice of termination to you.                  Unless we tell you otherwise, upon any termination, (a) the                  rights and licenses granted to you in these terms will end;                  (b) you must stop using the app, and (if needed) delete it                  from your device.                </p> <p><strong>Changes to This Terms and Conditions</strong></p> <p>                  I may update our Terms and Conditions                  from time to time. Thus, you are advised to review this page                  periodically for any changes. I will                  notify you of any changes by posting the new Terms and                  Conditions on this page.                </p> <p>                  These terms and conditions are effective as of 2024-01-16                </p> <p><strong>Contact Us</strong></p> <p>                  If you have any questions or suggestions about my                  Terms and Conditions, do not hesitate to contact me                  at <a href="mailto:munyathedev@gmail.com" >munyathedev@gmail.com</a>.</p><br/><p>.</p> </body>    </html>',
              }}
              style={{
                width: windowWidth,
                height: windowHeight * 8,
                // minHeight: windowHeight,
                // borderColor: "yellow",
                // borderWidth: 2,
              }}
            />
          </ScrollView>

          <Pressable
            onPress={() => {
              setShowPrivacyPolicy(false);
            }}
          >
            {({ pressed }) => (
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: "white",
                    fontWeight: "bold",
                    paddingVertical: 15,
                    textAlign: "center",
                    paddingHorizontal: 20,
                    width: windowWidth * 1,
                    backgroundColor: "#3498db",
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                CLOSE
              </Text>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* ADD ITEM MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSingleItemData(initialItemState);
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
                      item={item}
                      key={index}
                      index={index}
                      asyncKey={"completedItems"}
                      getToDoItems={getToDoItems}
                      screenMode={screenMode}
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
      {screenMode.value !== "edit" ? (
        <>
          <View style={[globalStyles.homePage_top_parent_1]}>
            {/* <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
            >
              {activeTab}
            </Text> */}

            <Pressable
              onPress={() => {
                searchItems("");
                setSearchTerm("");
                setSearchModalVisible(true);
              }}
              style={globalStyles.homePage_search_button}
            >
              {({ pressed }) => (
                <Ionicons
                  name="search"
                  size={25}
                  color={!pressed ? "gray" : "rgba(0,0,0,0.4)"}
                />
              )}
            </Pressable>

            <View
              style={{
                // width: windowWidth * 0.5,
                // marginTop: 10,
                display: "flex",
                // marginBottom: 20,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                // backgroundColor: "yellow",
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
                      globalStyles.tab_control_buttons,
                      {
                        opacity: pressed ? 0.3 : 1,
                        backgroundColor:
                          activeTab !== "PENDING" ? "transparent" : "silver",
                      },
                    ]}
                  >
                    PENDING: {pending.length}
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
                      globalStyles.tab_control_buttons,
                      {
                        opacity: pressed ? 0.3 : 1,
                        backgroundColor:
                          activeTab !== "COMPLETED" ? "transparent" : "silver",
                      },
                    ]}
                  >
                    COMPLETED: {completed.length}
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
                      globalStyles.tab_control_buttons,
                      {
                        opacity: pressed ? 0.3 : 1,
                        backgroundColor:
                          activeTab !== "TRASH" ? "transparent" : "silver",
                      },
                    ]}
                  >
                    TRASH: {trash.length}
                  </Text>
                )}
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                setShowBurgerMenu(!showBurgerMenu);
              }}
              style={[
                globalStyles.homePage_search_button,
                {
                  borderRadius: 50,
                  paddingHorizontal: 2,
                },
              ]}
            >
              {({ pressed }) => (
                <Ionicons
                  name="menu-outline"
                  size={35}
                  color={"gray"}
                  style={{ opacity: pressed ? 0.4 : 1 }}
                />
              )}
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={globalStyles.homePage_top_parent_1}>
            <TouchableOpacity
              onPress={() => {
                handleScreenMode("");
                setScreenMode((prevScreenMode) => ({
                  ...prevScreenMode,
                  selectedItemsID: [],
                }));
              }}
              style={globalStyles.homePage_search_button}
            >
              <Ionicons name="close" size={30} color={"gray"} />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {screenMode.selectedItemsID.length} Selected
            </Text>
          </View>
          <View
            style={{
              minHeight: 30,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <ScrollView horizontal={true}>
              <Pressable onPress={selectAllItems}>
                <Text
                  style={[
                    globalStyles.edit_options_pills,
                    {
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: "silver",
                      marginRight: 10,
                      color: "black",
                    },
                  ]}
                >
                  SELECT ALL
                </Text>
              </Pressable>
              {activeTab === "TRASH" && (
                <Pressable
                  style={{
                    opacity: screenMode.selectedItemsID.length > 0 ? 1 : 0.4,
                  }}
                  onPress={() => {
                    Alert.alert(
                      "Delete Tasks From Trash?",
                      "The selected tasks will be deleted from the trash.",
                      [
                        {
                          text: "No",
                          onPress: () => {
                            return false;
                          },
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            deleteSelectedItemsFromTrash();
                          },
                        },
                      ]
                    );
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        globalStyles.edit_options_pills,
                        {
                          backgroundColor: "red",
                          opacity: pressed ? 0.5 : 1,
                        },
                      ]}
                    >
                      DELETE PERMANENTLY
                    </Text>
                  )}
                </Pressable>
              )}
              {activeTab !== "PENDING" && (
                <Pressable
                  style={{
                    opacity: screenMode.selectedItemsID.length > 0 ? 1 : 0.4,
                  }}
                  onPress={() => {
                    if (screenMode.selectedItemsID.length > 0) {
                      Alert.alert(
                        "Set Tasks As Pending",
                        "Set the selected tasks as pending?",
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
                              editSelectedItems("PENDING");
                            },
                          },
                        ]
                      );
                    }
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        globalStyles.edit_options_pills,
                        { opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      SET AS PENDING
                    </Text>
                  )}
                </Pressable>
              )}
              {activeTab !== "COMPLETED" && (
                <Pressable
                  style={{
                    opacity: screenMode.selectedItemsID.length > 0 ? 1 : 0.4,
                  }}
                  onPress={() => {
                    if (screenMode.selectedItemsID.length > 0) {
                      Alert.alert(
                        "Set Tasks As Completed",
                        "Set the selected tasks as completed?",
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
                              editSelectedItems("COMPLETED");
                            },
                          },
                        ]
                      );
                    }
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        globalStyles.edit_options_pills,
                        { opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      SET AS COMPLETED
                    </Text>
                  )}
                </Pressable>
              )}
              {activeTab !== "TRASH" && (
                <Pressable
                  style={{
                    opacity: screenMode.selectedItemsID.length > 0 ? 1 : 0.4,
                  }}
                  onPress={() => {
                    if (screenMode.selectedItemsID.length > 0) {
                      Alert.alert(
                        "Move To Trash Bin",
                        "Are you sure you want to move the selected tasks to the trash bin?",
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
                              editSelectedItems("TRASH");
                            },
                          },
                        ]
                      );
                    }
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        globalStyles.edit_options_pills,
                        { opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      MOVE TO TRASH
                    </Text>
                  )}
                </Pressable>
              )}
            </ScrollView>
          </View>
        </>
      )}

      {/* TABS */}
      {activeTab === "PENDING" && (
        <TabPending
          screenMode={{
            handleScreenMode: handleScreenMode,
            selectedItemsIds: selectedItemsIds,
            value: screenMode.value,
            selectedItemsID: screenMode.selectedItemsID,
          }}
          getToDoItems={getToDoItems}
          sortedByDate={sortedByDate}
          items={pendingSortedByDate}
        />
      )}
      {activeTab === "COMPLETED" && (
        <TabCompleted
          screenMode={{
            handleScreenMode: handleScreenMode,
            selectedItemsIds: selectedItemsIds,
            value: screenMode.value,
            selectedItemsID: screenMode.selectedItemsID,
          }}
          getToDoItems={getToDoItems}
          sortedByDate={sortedByDate}
          items={completedSortedByDate}
        />
      )}
      {activeTab === "TRASH" && (
        <>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                width: 20,
                height: 20,
                backgroundColor: "transparent",
              }}
              onLongPress={() => {
                if (!devMode) {
                  Alert.alert(
                    "SWITCH TO DEVELOPER MODE?",
                    "By turning on developer mode you will lose your current data but gain additional features used when testing this application. Are you sure?",
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
                          ToastAndroid.show(
                            "Developer Mode Actived",
                            ToastAndroid.LONG,
                            1000
                          );
                          setDevMode(true);
                        },
                      },
                    ]
                  );
                } else {
                  ToastAndroid.show(
                    "Developer Mode Already Actived",
                    ToastAndroid.LONG,
                    1000
                  );
                }
              }}
            ></Pressable>
            {trash.length > 0 && screenMode.value !== "edit" && (
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Clear Trash?",
                    "All tasks in the trash will be deleted.",
                    [
                      {
                        text: "No",
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
                {({ pressed }) => (
                  <Text
                    style={{
                      color: "red",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  >
                    Clear Trash
                  </Text>
                )}
              </Pressable>
            )}
          </View>
          <TabTrash
            screenMode={{
              handleScreenMode: handleScreenMode,
              selectedItemsIds: selectedItemsIds,
              value: screenMode.value,
              selectedItemsID: screenMode.selectedItemsID,
            }}
            getToDoItems={getToDoItems}
            sortedByDate={sortedByDate}
            items={trashSortedByDate}
          />
        </>
      )}
    </View>
  );
};
