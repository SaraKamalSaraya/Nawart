import { configureStore } from "@reduxjs/toolkit";
import Notifications from "./Slice/Notifications";

export default configureStore({
  reducer: {
    Notifications: Notifications,
  },
});