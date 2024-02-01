import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, ToastAndroid } from "react-native";
import { decode as base64_decode, encode as base64_encode } from "base-64";

const ip = "192.168.43.214";
export const baseURL = `http://${ip}/munya-server/api/du-more/`;

export function formatDate(inputDate) {
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
}

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
        console.log("result 1", result);
        console.log("result user 1", user);
        try {
          const resultObj = JSON.parse(result);
          return resultObj.value.newUpdatedTasks;
        } catch (error) {
          console.log("error 0", error);
          console.log("result 2", result);
          return false;
        }
      })
      .catch((error) => {
        console.log("error 1", error);
        return false;
      });
  } catch (error) {
    console.log("error 2", error);
    return false;
  }
};

export const authenticateUser = async () => {
  //
  try {
    const jsonValue = await AsyncStorage.getItem("user_data");
    return jsonValue != null ? JSON.parse(jsonValue) : false;
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

export const DEV_TEST_DATA_PENDING = [
  {
    id: "d1",
    flag: "green",
    status: "pending",
    title: "Task 1-2",
    note: "Task 1 xxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx.",
    date: "2024-01-01T08:06:37.051Z",
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
    date_created: "2024-01-01T08:06:00.001Z",
    last_modified: "2024-01-01T08:07:00.001Z",
  },
];
