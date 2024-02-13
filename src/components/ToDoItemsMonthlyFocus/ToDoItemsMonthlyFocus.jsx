import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalToDoItemsMonthlyFocus from "./ModalToDoItemsMonthlyFocus";

const ToDoItemsMonthlyFocus = ({ items, setModalVisible }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate an array of dates representing each day of the year
  const daysInYear = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const daysInMonth = new Date(currentYear, month, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, j) => `${currentYear}-${month}-${j + 1}`
    );
  }).flat();

  const handleShowCalendarModal = () => {
    setShowCalendarModal(!showCalendarModal);
  };

  return (
    <>
      <ModalToDoItemsMonthlyFocus
        items={items}
        showCalendarModal={showCalendarModal}
        handleShowCalendarModal={handleShowCalendarModal}
        setModalVisible={setModalVisible}
      />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={handleShowCalendarModal}>
          {({ pressed }) => (
            <View
              style={{
                // width: 45,
                height: 25,
                borderWidth: 1,
                display: "flex",
                borderRadius: 100,
                alignItems: "center",
                borderColor: "silver",
                paddingHorizontal: 10,
                flexDirection: "column",
                justifyContent: "center",
                transform: "translateY(-12px)",
                backgroundColor: pressed ? "gray" : "silver",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                OPEN CALENDAR
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </>
  );
};

export default ToDoItemsMonthlyFocus;
