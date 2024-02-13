import React, { useEffect, useState, ToastAndroid } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import CalendarToDoItemsMonthlyFocusEvents from "./CalendarToDoItemsMonthlyFocusEvents";
import { formatDate } from "../../../js/main";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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

const CalendarToDoItemsMonthlyFocus = ({ items, setModalVisible }) => {
  const [yearData, setYearData] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(0);
  const [allTaskDates, setAllTaskDates] = useState([]);
  const [currentDayTasks, setCurrentDayTasks] = useState(undefined);

  const handleSelectedDate = (newIndex) => {
    setSelectedDate(newIndex);
  };

  useEffect(() => {
    setYearData(generateDatesForYear());
    handleSetAllTaskDates();
  }, []);

  const handleSetAllTaskDates = () => {
    const monthsWithTasksArray = Object.keys(items);
    const _allTaskDates = {};
    if (monthsWithTasksArray?.length && monthsWithTasksArray?.length > 0) {
      Object.keys(items).map((month, i) => {
        const daysWithTasksArray = Object.keys(items[month]);
        if (daysWithTasksArray?.length && daysWithTasksArray?.length > 0) {
          daysWithTasksArray.map((day, i) => {
            const dateKey =
              currentYear + "-" + (monthsOrder.indexOf(month) + 1) + "-" + day;
            _allTaskDates[dateKey] = items[month][day];
          });
        }
      });
    }
    setAllTaskDates(_allTaskDates);
  };

  useEffect(() => {
    try {
      setCurrentDayTasks(items[monthsOrder[currentMonth]][selectedDate]);
    } catch (error) {}
  }, [currentMonth, selectedDate]);

  function createArray(length, defaultValue) {
    return Array.from({ length }, () => defaultValue);
  }

  function generateDatesForYear() {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const monthName = new Date(currentYear, month, 1).toLocaleString(
        "en-us",
        {
          month: "long",
        }
      );
      const monthAbbreviation = new Date(currentYear, month, 1).toLocaleString(
        "en-us",
        { month: "short" }
      );
      const maxDays = new Date(currentYear, month + 1, 0).getDate();
      const startingWeekDayNumber = new Date(currentYear, month, 1).getDay();
      months.push({
        month: [monthName, monthAbbreviation],
        maxDays,
        startingWeekDayNumber,
      });
    }
    return months;
  }

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "white",
      }}
    >
      {yearData ? (
        <View style={styles.monthContainer}>
          {/* HIGHER PANEL */}
          <Text
            style={{
              fontSize: 18,
              color: "gray",
              fontWeight: "bold",
              paddingVertical: 20,
              textAlign: "center",
              paddingHorizontal: 10,
              backgroundColor: "white",
            }}
          >
            {currentYear} CALENDAR
          </Text>

          <CalendarToDoItemsMonthlyFocusEvents
            yearData={yearData}
            currentYear={currentYear}
            createArray={createArray}
            allTaskDates={allTaskDates}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            handleSelectedDate={handleSelectedDate}
          />

          {/* LOWER PANEL */}
          <ScrollView horizontal={true} style={{ marginVertical: 15 }}>
            {monthsOrder.map((month, i) => {
              return (
                <Pressable
                  key={i}
                  onPress={() => {
                    setCurrentMonth(i);
                    setSelectedDate(1);
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={{
                        fontSize: 12,
                        color: currentMonth === i ? "black" : "gray",
                        marginRight: 5,
                        marginLeft: i === 0 ? 10 : 0,
                        borderRadius: 100,
                        fontWeight: "bold",
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor:
                          pressed || currentMonth === i ? "gray" : "silver",
                      }}
                    >
                      {month}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
          <View
            style={{
              height: 300,
            }}
          >
            <ScrollView>
              <View>
                {!currentDayTasks ? (
                  <Pressable
                    onPress={() => {
                      let currentTime = new Date().toISOString().split("T")[1];
                      setModalVisible(true, {
                        date: `${currentYear}-${
                          currentMonth + 1
                        }-${selectedDate}T${currentTime}`,
                      });
                    }}
                    style={{
                      height: 300,
                      backgroundColor: "#ebebeb",
                      borderTopWidth: 1,
                      borderTopColor: "gray",
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      width: windowWidth,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    {({ pressed }) => (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          opacity: pressed ? 0.2 : 1,
                          justifyContent: "center",
                        }}
                      >
                        <View style={{}}>
                          <Ionicons
                            size={80}
                            color="silver"
                            name={"add-circle"}
                            style={{
                              marginTop: 30,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {`${selectedDate} ${monthsOrder[currentMonth]} ${currentYear}`}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "gray",
                              textAlign: "center",
                            }}
                          >
                            TAP TO ADD NEW TASK
                          </Text>
                        </View>
                      </View>
                    )}
                  </Pressable>
                ) : (
                  <>
                    <Pressable
                      onPress={() => {
                        let currentTime = new Date()
                          .toISOString()
                          .split("T")[1];
                        setModalVisible(true, {
                          date: `${currentYear}-${
                            currentMonth + 1
                          }-${selectedDate}T${currentTime}`,
                        });
                      }}
                      style={{
                        // height: 300,
                        backgroundColor: "#ebebeb",
                        borderTopWidth: 1,
                        borderTopColor: "gray",
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        width: windowWidth,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      {({ pressed }) => (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            opacity: pressed ? 0.2 : 1,
                            paddingVertical: 10,
                            justifyContent: "center",
                          }}
                        >
                          <View style={{}}>
                            <Ionicons
                              size={40}
                              color="gray"
                              name={"add-circle"}
                              style={{
                                marginRight: 10,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              paddingVertical: 5,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                color: "gray",
                                textAlign: "left",
                                fontWeight: "bold",
                              }}
                            >
                              TAP TO ADD NEW TASK
                            </Text>
                          </View>
                        </View>
                      )}
                    </Pressable>
                    {currentDayTasks.map((data, index2) => {
                      return (
                        <Pressable
                          key={index2}
                          style={{
                            backgroundColor: "#ebebeb",
                            borderBottomWidth: 1,
                            borderBottomColor: "gray",
                            width: windowWidth,
                          }}
                        >
                          {({ pressed }) => (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                opacity: pressed ? 0.2 : 1,
                                justifyContent: "flex-start",
                              }}
                            >
                              <View
                                style={{
                                  width: 15,
                                  height: 65,
                                  backgroundColor: data?.flag,
                                }}
                              >
                                <Text style={{ color: "transparent" }}>|</Text>
                              </View>
                              <View
                                style={{
                                  paddingVertical: 10,
                                  paddingHorizontal: 10,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.title ? data.title : "no title"}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: "black",
                                  }}
                                >
                                  {data.note ? data.note : "no note"}
                                </Text>
                              </View>
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View>
          <Text>NOTHING</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  monthText: {
    fontSize: 18,
    color: "black",
    marginBottom: 12,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  daysContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: windowWidth,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dayCell: {
    height: 50,
    width: windowWidth / 7,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "silver",
  },
  dynamicDayCell: {
    backgroundColor: "silver",
  },
  dayText: {
    textAlign: "center",
  },
});

export default CalendarToDoItemsMonthlyFocus;
