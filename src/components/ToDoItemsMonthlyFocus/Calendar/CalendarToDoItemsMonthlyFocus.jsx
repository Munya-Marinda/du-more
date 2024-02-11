import React, { useEffect, useState } from "react";
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
  const [currentDayTasks, setCurrentDayTasks] = useState(undefined);

  const handleSelectedDate = (newIndex) => {
    setSelectedDate(newIndex);
  };

  useEffect(() => {
    setYearData(generateDatesForYear());
  }, []);

  useEffect(() => {
    setCurrentDayTasks(items[monthsOrder[currentMonth + 1]][selectedDate]);
  }, [currentMonth, selectedDate]);

  function createArray(length, defaultValue) {
    return Array.from({ length }, () => defaultValue);
  }

  function generateDatesForYear(year = 2024) {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const monthName = new Date(year, month, 1).toLocaleString("en-us", {
        month: "long",
      });
      const monthAbbreviation = new Date(year, month, 1).toLocaleString(
        "en-us",
        { month: "short" }
      );
      const maxDays = new Date(year, month + 1, 0).getDate();
      const startingWeekDayNumber = new Date(year, month, 1).getDay();
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
              paddingHorizontal: 10,
              backgroundColor: "black",
            }}
          >
            2024 CALENDAR
          </Text>
          <CalendarToDoItemsMonthlyFocusEvents
            yearData={yearData}
            createArray={createArray}
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
                      // 2024-02-11T07:40:24.783Z
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
                  currentDayTasks.map((data, index2) => {
                    // console.log("data", data);
                    //
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
                                {data?.title}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: "black",
                                }}
                              >
                                {data?.note}
                              </Text>
                            </View>
                          </View>
                        )}
                      </Pressable>
                    );
                  })
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