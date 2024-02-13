import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, ToastAndroid } from "react-native";
import { decode as base64_decode, encode as base64_encode } from "base-64";

const ip = "";
export const baseURL = `http://${ip}/munya-server/api/du-more/`;

export const colorOptions = [
  "green",
  "blue",
  "red",
  "yellow",
  "white",
  "orange",
  "purple",
  "pink",
  "black",
  "gray",
  "cyan",
  "magenta",
  "teal",
  "maroon",
];

export const initialItemState = {
  flag: "green",
  status: "pending",
  title: "",
  note: "",
  date: new Date(),
  time: new Date(),
  date_created: new Date(),
  last_modified: new Date(),
};

export const formatDate = (inputDate) => {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const date = new Date(inputDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatTime = (inputTime) => {
  inputTime = typeof inputTime === "object" ? inputTime : new Date(inputTime);
  try {
    return (
      inputTime?.toTimeString().split(":")[0] +
      ":" +
      inputTime?.toTimeString().split(":")[1]
    );
  } catch (error) {
    return (
      new Date()?.toTimeString().split(":")[0] +
      ":" +
      new Date()?.toTimeString().split(":")[1]
    );
  }
};

export const formatDuration = (seconds) => {
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000; // Assuming 30 days in a month
  const secondsInYear = 31536000; // Assuming 365 days in a year

  const years = Math.floor(seconds / secondsInYear);
  seconds %= secondsInYear;

  const months = Math.floor(seconds / secondsInMonth);
  seconds %= secondsInMonth;

  const days = Math.floor(seconds / secondsInDay);
  seconds %= secondsInDay;

  const hours = Math.floor(seconds / secondsInHour);
  seconds %= secondsInHour;

  const minutes = Math.floor(seconds / secondsInMinute);
  seconds %= secondsInMinute;

  const secondsRemaining = seconds;

  const parts = [];
  if (years) parts.push(`${years} year(s)`);
  if (months) parts.push(`${months} month(s)`);
  if (days) parts.push(`${days} day(s)`);
  if (hours) parts.push(`${hours} hour(s)`);
  if (minutes) parts.push(`${minutes} minute(s)`);
  if (secondsRemaining) parts.push(`${secondsRemaining} second(s)`);

  return parts.join(", ");
};

export const mergeTimeAndDate = (date, time) => {
  date = typeof date === "object" ? date : new Date(date);
  time = typeof time === "object" ? time : new Date(time);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(seconds);
  return newDate;
};

export const saveUserData = async (data) => {
  //
  if (data === undefined || data === null || typeof data !== "object") {
    Alert.alert(
      "Invalid User",
      "Failed to save login. Please try again later."
    );
    return;
  }
  //
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("user_data", jsonValue);
    return;
  } catch (e) {
    if (data === undefined || data === null || typeof data !== "object") {
      Alert.alert(
        "Permission Denied",
        "Failed to save login. Please try again later."
      );
      return;
    }
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("user_data");
    return;
  } catch (e) {}
};

export const getUserCloudTasks = async (user, localdata) => {
  try {
    var formdata = new FormData();
    formdata.append("tasks", JSON.stringify(localdata));

    var requestOptions = {
      method: "POST",
      headers: createUserAuthHeaders(user),
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(`${baseURL}?gettasks=1`, requestOptions);
    const result = await response.text();

    if (typeof result === "string" && result?.length > 0) {
      try {
        ToastAndroid.show("... SYNCING TASKS ...", ToastAndroid.LONG, 1000);
        return JSON.parse(result)?.value;
      } catch (error) {
        ToastAndroid.show("FAILED TO SYNC TASKS", ToastAndroid.LONG, 1000);
        console.log("error", error);
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    ToastAndroid.show("FAILED TO SYNC TASKS", ToastAndroid.LONG, 1000);
    console.log("error", error);
    return false;
  }
};

export const syncUserData = async (user, localdata) => {
  try {
    const base64 = base64_encode(`${user?.username}:${user?.session}`);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${base64}`);

    var formdata = new FormData();
    formdata.append("syncuserdata", "1");
    formdata.append("tasks", JSON.stringify(localdata));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // Add the return statement here
    return fetch(baseURL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        try {
          const resultObj = JSON.parse(result);
          return resultObj.value.newUpdatedTasks;
        } catch (error) {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  } catch (error) {
    return false;
  }
};

export const authenticateUser = async () => {
  //
  try {
    let jsonValue = await AsyncStorage.getItem("user_data");
    let jsonObj = jsonValue != null ? JSON.parse(jsonValue) : false;
    const userCloud = await authenticateUserCloud(jsonObj);
    return userCloud;
  } catch (e) {
    return false;
  }
  //
};

const createUserAuthHeaders = (user) => {
  var myHeaders = new Headers();
  const base64 = base64_encode(`${user?.username}:${user?.session}`);
  myHeaders.append("Authorization", `Basic ${base64}`);
  return myHeaders;
};

export const authenticateUserCloud = async (user) => {
  try {
    const base64 = base64_encode(`${user?.username}:${user?.session}`);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${base64}`);

    var formdata = new FormData();
    formdata.append("authenticateuser", "1");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // Add the return statement here
    return fetch(baseURL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log("authenticateuser result", result);
        try {
          const resultObj = JSON.parse(result);

          if (resultObj.result === true) {
            return resultObj.value;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  } catch (error) {
    return false;
  }
};

export const DEV_TEST_DATA_PENDING = [
  {
    id: "d1",
    flag: "green",
    status: "pending",
    title: "Task 1-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
    time: "2024-01-01T23:59:59.051Z",
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-01T08:07:00.001Z",
  },
  {
    id: "d4",
    flag: "yellow",
    status: "pending",
    title: "Task 1-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
    time: "2024-01-01T23:59:59.051Z",
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-01T08:07:00.001Z",
  },
];

export const DEV_TEST_DATA_COMPLETED = [
  {
    id: "d2",
    flag: "green",
    status: "completed",
    title: "Task 2-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
    time: "2024-01-01T23:59:59.051Z",
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-03T08:07:00.001Z",
  },
  {
    id: "d5",
    flag: "yellow",
    status: "completed",
    title: "Task 1-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
    time: "2024-01-01T23:59:59.051Z",
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-01T08:07:00.001Z",
  },
];

export const DEV_TEST_DATA_TRASH = [
  {
    id: "d3",
    flag: "green",
    status: "trash",
    title: "Task 3-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
    time: "2024-01-01T23:59:59.051Z",
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-01T08:07:00.001Z",
  },
  {
    id: "d6",
    flag: "yellow",
    status: "trash",
    title: "Task 1-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
    time: "2024-01-01T23:59:59.051Z",
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-01T08:07:00.001Z",
  },
];
