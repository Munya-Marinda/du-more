import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const _cardWidth = windowWidth * 0.95;

export const globalStyles = StyleSheet.create({
  homePage_top_parent_1: {
    paddingTop: 40,
    display: "flex",
    paddingBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  homePage_top_header_1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  homePage_items_scrollView_1: {
    width: windowWidth,
  },
  //
  //
  //
  //
  //
  //
  //
  // TABS 1
  homePage_tab_parent_1: {
    display: "flex",
    borderTopWidth: 5,
    width: windowWidth,
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "black",
    justifyContent: "space-between",
  },
  homePage_tab_button_1: {
    display: "flex",
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    width: windowWidth / 3,
    justifyContent: "center",
  },
  homePage_tab_buttonText_1: {
    color: "white",
  },
  //
  //
  //
  //
  //
  //
  //
  // ITEM CARD
  item_parent_1: {
    display: "flex",
    width: windowWidth,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  item_container_1: {
    display: "flex",
    marginBottom: 15,
    borderRadius: 10,
    width: _cardWidth,
    flexDirection: "row",
    position: "relative",
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  item_flag_1: {
    width: 20,
    marginLeft: -3,
    minHeight: 120,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  item_flag_text_1: {
    color: "transparent",
  },
  item_info_parent_1: {
    paddingLeft: 10,
    paddingTop: 20,
    width: _cardWidth * 0.9,
  },
  item_status_text_1_parent: {
    top: 7,
    right: 5,
    position: "absolute",
  },
  item_status_text_1: {
    fontSize: 12,
    marginRight: 5,
    display: "none",
  },
  item_title_text_1_parent: {
    marginBottom: 5,
  },
  item_title_text_1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item_note_text_1_parent: {
    marginBottom: 5,
  },
  item_note_text_1: {
    fontSize: 12,
  },
  item_date_text_1_parent: {
    bottom: 10,
    right: 10,
    position: "absolute",
  },
  item_date_text_1: {
    fontSize: 12,
  },

  //
  //
  //
  //
  //
  //
  //
  // MALICIOUS
  row_apart: {
    width: _cardWidth * 0.9,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row_flexEnd: {
    width: _cardWidth * 0.9,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
