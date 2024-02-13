import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CalendarToDoItemsMonthlyFocusEvents({
  yearData,
  currentYear,
  createArray,
  allTaskDates,
  currentMonth,
  selectedDate,
  handleSelectedDate,
}) {
  return (
    <View>
      <View>
        {[""].map((data, index) => {
          // Compute previous month end number and length outside the loop
          const prevMonthEndNumber =
            yearData[currentMonth]?.startingWeekDayNumber || 0;
          const length = yearData[currentMonth]?.maxDays || 0;

          // Compute arrays outside the loop
          const defaultValue = 0;
          const emptyDaysArray = createArray(prevMonthEndNumber, defaultValue);
          const lastEmptyDaysArray = createArray(
            42 - (length + prevMonthEndNumber),
            defaultValue
          );
          const dynamicArray = createArray(length, defaultValue);

          return (
            <View style={{ marginTop: 10 }} key={index}>
              <Text style={styles.monthText}>
                {yearData[currentMonth]?.month[0]}
              </Text>
              <View style={styles.daysContainer}>
                {emptyDaysArray.map((day, index) => (
                  <Pressable key={index} style={styles.dayCell}>
                    {({ pressed }) => (
                      <Text
                        style={[
                          styles.dayText,
                          { color: pressed ? "silver" : "gray" },
                        ]}
                      >
                        {prevMonthEndNumber - emptyDaysArray.length + index + 1}
                      </Text>
                    )}
                  </Pressable>
                ))}
                {dynamicArray.map((day, index) => {
                  let isCurrentDate =
                    new Date().getDate() === index + 1 &&
                    new Date().getMonth() === currentMonth + 1;

                  let tasksForTheDay = [];
                  const taskColorFlags = [];

                  Object.keys(allTaskDates).forEach((dateKey) => {
                    const taskDate = new Date(dateKey).toDateString();
                    const calendarDate = new Date(
                      currentYear + "-" + (currentMonth + 1) + "-" + (index + 1)
                    ).toDateString();
                    if (taskDate === calendarDate) {
                      tasksForTheDay = allTaskDates[dateKey];
                    }
                  });

                  if (tasksForTheDay?.length > 0) {
                    tasksForTheDay.forEach((task) => {
                      taskColorFlags.push(task?.flag);
                    });
                  }

                  return (
                    <Pressable
                      onPress={() => {
                        handleSelectedDate(index + 1);
                      }}
                      key={index}
                      style={[
                        styles.dayCell,
                        styles.dynamicDayCell,
                        {
                          backgroundColor: isCurrentDate ? "black" : "#ebebeb",
                        },
                        index + 1 === selectedDate
                          ? { borderWidth: 2, borderColor: "blue" }
                          : {},
                      ]}
                    >
                      {({ pressed }) => (
                        <>
                          <Text
                            style={[
                              styles.dayText,
                              {
                                color: isCurrentDate
                                  ? "white"
                                  : pressed
                                  ? "silver"
                                  : "black",
                              },
                            ]}
                          >
                            {index + 1}
                          </Text>
                          {taskColorFlags?.length > 0 && (
                            <View
                              style={{
                                marginTop: 3,
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              {taskColorFlags?.map((color, i) => (
                                <View
                                  key={i}
                                  style={{
                                    width: 7,
                                    height: 7,
                                    marginHorizontal: 1,
                                    borderRadius: 50,
                                    backgroundColor: color,
                                  }}
                                ></View>
                              ))}
                            </View>
                          )}
                        </>
                      )}
                    </Pressable>
                  );
                })}
                {lastEmptyDaysArray.map((day, index) => (
                  <Pressable key={index} style={styles.dayCell}>
                    {({ pressed }) => (
                      <Text
                        style={[
                          styles.dayText,
                          { color: pressed ? "silver" : "gray" },
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

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
