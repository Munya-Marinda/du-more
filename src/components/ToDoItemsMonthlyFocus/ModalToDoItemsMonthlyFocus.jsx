import { Modal } from "react-native";
import CalendarToDoItemsMonthlyFocus from "./Calendar/CalendarToDoItemsMonthlyFocus";

export default function ModalToDoItemsMonthlyFocus({
  items,
  getToDoItems,
  setModalVisible,
  showCalendarModal,
  handleShowCalendarModal,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCalendarModal}
      onRequestClose={() => {
        handleShowCalendarModal(false);
      }}
    >
      <CalendarToDoItemsMonthlyFocus
        items={items}
        getToDoItems={getToDoItems}
        setModalVisible={setModalVisible}
      />
    </Modal>
  );
}
