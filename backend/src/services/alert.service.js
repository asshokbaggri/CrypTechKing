import Alert from "../models/Alert.model.js";

const getAlerts = async () => {
  return Alert.find().sort({ createdAt: -1 }).lean();
};

const createAlert = async (data) => {
  return Alert.create(data);
};

export default {
  getAlerts,
  createAlert,
};
