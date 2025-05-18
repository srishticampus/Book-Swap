const LibraryEvent = require("./libraryeventSchema");

// Create a new event
const createEvent = async (req, res) => {
  const { libraryId, eventName, description, startDate, endDate } = req.body;

  try {
    const newEvent = new LibraryEvent({
      libraryId,
      eventName,
      description,
      startDate,
      endDate
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await LibraryEvent.find().populate("libraryId");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Get events for a specific library
const getEventsByLibrary = async (req, res) => {
  const { libraryId } = req.params;
  try {
    const events = await LibraryEvent.find({ libraryId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Update status based on date (optional automation helper)
const updateEventStatuses = async () => {
  const today = new Date();

  const events = await LibraryEvent.find();

  for (let event of events) {
    if (today < event.startDate) {
      event.status = "upcoming";
    } else if (today >= event.startDate && today <= event.endDate) {
      event.status = "ongoing";
    } else {
      event.status = "completed";
    }
    await event.save();
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventsByLibrary,
  updateEventStatuses
};
