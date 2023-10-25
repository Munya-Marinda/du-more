import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const _cardWidth = windowWidth * 0.95;

export const globalStyles = StyleSheet.create({
  homePage_top_parent_1: {
    paddingTop: 40,
    display: "flex",
    paddingBottom: 20,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  homePage_top_header_1: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  homePage_items_scrollView_1: {
    width: windowWidth,
    backgroundColor: "black",
  },
  homePage_search_button: {
    position: "absolute",
    right: 40,
    bottom: 25,
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
    backgroundColor: "gray",
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
    color: "white",
    fontWeight: "bold",
  },
  item_note_text_1_parent: {
    marginBottom: 5,
  },
  item_note_text_1: {
    fontSize: 12,
    color: "white",
  },
  item_date_text_1_parent: {
    bottom: 10,
    right: 10,
    position: "absolute",
  },
  item_date_text_1: {
    fontSize: 12,
    color: "white",
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
    paddingBottom: 100,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    color: "white",
    borderRadius: 5,
    borderColor: "white",
    width: windowWidth / 1.2,
  },
  modal_multitext_input: {
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    padding: 10,
    margin: 10,
    width: windowWidth / 1.2,
  },
  modal_button_group_1: {
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth / 3,
    justifyContent: "center",
  },
  modal_button_1: {
    margin: 10,
    padding: 10,
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    borderColor: "white",
  },
  modal_button_2: {
    marginRight: 15,
    padding: 10,
    color: "white",
    borderBottomWidth: 2,
    textAlign: "center",
    borderBottomColor: "white",
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
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_color_option_group_2: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    width: windowWidth / 1.2,
  },
  modal_color_option_1: {
    width: 30,
    margin: 2,
    height: 30,
  },
  modal_status_buttons: {
    fontSize: 9,
    color: "white",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 7,
    fontWeight: "bold",
    marginHorizontal: 7,
    borderColor: "white",
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
    paddingTop: 30,
    paddingBottom: 50,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search_modal_text_input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    color: "white",
    borderRadius: 5,
    borderColor: "white",
    width: windowWidth / 1.5,
  },

  //
  //
  //
  //
  //
  //
  //
  // TAB DROPDOWN
  tab_dropdown_parent: {
    display: "flex",
    paddingBottom: 20,
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  tab_dropdown_container: {
    width: 150,
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
    paddingHorizontal: 8,
    borderColor: "transparent",
    backgroundColor: "black",
  },
  tab_dropdown_icon: {
    marginRight: 5,
  },
  tab_dropdown_label: {
    top: -10,
    left: 8,
    zIndex: 999,
    fontSize: 10,
    color: "white",
    textAlign: "center",
    position: "absolute",
    paddingHorizontal: 8,
    backgroundColor: "black",
  },
  tab_dropdown_placeholderStyle: {
    fontSize: 50,
  },
  tab_dropdown_selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  tab_dropdown_iconStyle: {
    width: 20,
    height: 20,
  },
  tab_dropdown_inputSearchStyle: {
    height: 40,
    fontSize: 14,
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
    width: _cardWidth * 0.9,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
