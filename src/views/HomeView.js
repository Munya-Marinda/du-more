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
import { ToDoItem } from "../components/ToDoItem";
import {
  DEV_TEST_DATA_COMPLETED,
  DEV_TEST_DATA_PENDING,
  DEV_TEST_DATA_TRASH,
} from "../js/main";

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
          <View
            style={{
              width: windowWidth * 0.8,
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
                      backgroundColor: "white",
                      borderTopColor: "gray",
                      borderTopWidth: 1,
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
                      width: windowWidth * 0.8,
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                >
                  CLOSE
                </Text>
              )}
            </Pressable>
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
                          showBurgerMenu(true);
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
