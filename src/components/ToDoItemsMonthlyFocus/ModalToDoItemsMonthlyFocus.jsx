import { Modal } from "react-native";
import CalendarToDoItemsMonthlyFocus from "./Calendar/CalendarToDoItemsMonthlyFocus";

export default function ModalToDoItemsMonthlyFocus({
  items,
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
        setModalVisible={setModalVisible}
      />
    </Modal>
  );
}
