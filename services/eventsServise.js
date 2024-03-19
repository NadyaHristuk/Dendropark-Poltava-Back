const { HttpError } = require("../helpers");
const { Event } = require("../models/event");

const getAllEvents = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Event.find({}, "-createdAt -updatedAt -owner", { skip, limit });
};

const getEventById = async (id) => {
  const result = await Event.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateEvent = async (id, newData) => {
  const result = await Event.findByIdAndUpdate(id, newData, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const deleteEvent = async (id) => {
  const result = await Event.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "delete success" };
};

const createEvent = async (eventData) => {
  return await Event.create(eventData);
};

module.exports = {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createEvent,
};
