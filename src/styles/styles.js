import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const _cardWidth = windowWidth * 0.95;

export const globalStyles = StyleSheet.create({
  homePage_top_parent_1: {
    display: "flex",
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    // paddingVertical: 5,
    // backgroundColor: "green",
    justifyContent: "space-between",
  },
  homePage_top_header_1: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  homePage_items_scrollView_1: {
    width: windowWidth,
    // backgroundColor: "green",
  },
  homePage_search_button: {
    // position: "absolute",
    // right: 40,
    // bottom: 25,
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
    // paddingVertical: 10,
    borderRadius: 10,
    width: _cardWidth,
    flexDirection: "row",
    // position: "relative",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    justifyContent: "flex-start",
  },
  item_flag_1: {
    width: 15,
    minHeight: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    // height: 20,
    // marginLeft: 10,
    // borderWidth: 2,
    // borderRadius: 20,
  },
  item_flag_text_1: {
    color: "transparent",
  },
  item_info_parent_1: {
    marginLeft: 15,
    // minHeight: 60,
    width: _cardWidth * 0.8,
  },
  item_status_text_1_parent: {
    // top: 7,
    // right: 5,
    // position: "absolute",
  },
  item_status_text_1: {
    fontSize: 12,
    marginRight: 5,
    display: "none",
  },
  item_title_text_1_parent: {
    marginBottom: 2,
  },
  item_title_text_1: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  item_note_text_1_parent: {
    marginBottom: 5,
  },
  item_note_text_1: {
    fontSize: 12,
    color: "black",
  },
  item_date_text_1_parent: {
    // bottom: 10,
    // right: 10,
    // position: "absolute",
  },
  item_date_text_1: {
    fontSize: 10,
    color: "black",
  },
  item_indicator: {
    marginRight: 5,
    height: 20,
    width: 20,
    borderRadius: 50,
  },
  //
  //
  //
  //
  //
  //
  //
  // ADD ITEM MODAL
  modal_parent_1: {
    paddingTop: 30,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "rgba(255, 255, 255, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal_input_group_1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: windowWidth / 1.5,
  },
  modal_text_input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    color: "black",
    borderRadius: 5,
    borderColor: "silver",
    width: windowWidth / 1.2,
  },
  modal_multitext_input: {
    color: "black",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "silver",
    padding: 10,
    margin: 10,
    width: windowWidth / 1.2,
  },
  modal_button_group_1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
    justifyContent: "center",
    paddingBottom: 15,
  },
  modal_button_1: {
    margin: 10,
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    borderColor: "silver",
  },
  modal_button_2: {
    marginRight: 15,
    padding: 10,
    color: "black",
    borderBottomWidth: 2,
    textAlign: "center",
    borderBottomColor: "silver",
  },
  modal_color_date_group_1: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: windowWidth / 1.2,
    justifyContent: "space-between",
  },
  modal_color_option_group_1: {
    padding: 2,
    display: "flex",
    flexDirection: "row",
    borderColor: "silver",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_color_option_group_2: {
    borderBottomWidth: 2,
    borderBottomColor: "silver",
    width: windowWidth / 1.2,
  },
  modal_color_option_1: {
    width: 30,
    margin: 2,
    height: 30,
  },
  modal_status_buttons: {
    fontSize: 9,
    color: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 7,
    fontWeight: "bold",
    marginHorizontal: 7,
    borderColor: "silver",
    paddingHorizontal: 10,
  },
  //
  //
  //
  //
  //
  //
  //
  // SEARCH ITEMS MODAL
  search_modal_parent_1: {
    paddingBottom: 10,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search_modal_text_input: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    color: "black",
    borderBottomColor: "gray",
    width: windowWidth * 0.9,
    textAlign: "center",
  },

  //
  //
  //
  //
  //
  //
  //
  // TAB Burger Menu
  burgerMenuButton: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: windowWidth * 0.8,
  },
  edit_options_pills: {
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
    marginLeft: 5,
    borderRadius: 80,
    borderColor: "gray",
    paddingHorizontal: 9,
    backgroundColor: "gray",
  },
  tab_control_buttons: {
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 9,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: "silver",
    borderWidth: 1,
    paddingHorizontal: 9,
  },
  //
  //
  //
  //
  //
  //
  //
  // TAB DROPDOWN
  tab_select_botton: {
    fontSize: 12,
    color: "black",
    borderWidth: 1,
    paddingVertical: 5,
    textAlign: "center",
    borderColor: "black",
    width: windowWidth / 3,
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
  row_center: {
    width: _cardWidth * 0.9,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  row_flexEnd: {
    // width: _cardWidth * 0.9,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
