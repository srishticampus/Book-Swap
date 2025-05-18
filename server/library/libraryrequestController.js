const userSchema = require("../User/userSchema");
const LibraryRequest = require("./libraryrequestsSchema");

// Send a request to join a library
const sendRequest = async (req, res) => {
  const { libraryId, userId } = req.body;

  try {
    const existingRequest = await LibraryRequest.findOne({ libraryId, userId });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Request already sent once", existingRequest });
    }

    const newRequest = new LibraryRequest({ libraryId, userId });
    await newRequest.save();
    return res.status(201).json({ message: "Request sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending request", error });
  }
};

// Get all pending requests for a library
const getRequestsForLibrary = async (req, res) => {
  const { libraryId } = req.params;

  try {
    const requests = await LibraryRequest.find({ libraryId, status: 'pending' }).populate("userId");

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found for this library" });
    }

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching requests", error });
  }
};

// Get all accepted requests for a library
const getAcceptedRequestsForLibrary = async (req, res) => {
  const { libraryId } = req.params;

  try {
    const requests = await LibraryRequest.find({ libraryId, status: 'accepted' }).populate("userId");

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No accepted requests found for this library" });
    }

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching accepted requests", error });
  }
};

// Accept a request
const acceptRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await LibraryRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    return res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error accepting request", error });
  }
};

// Reject a request
const rejectRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await LibraryRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error rejecting request", error });
  }
};

// View library requests by user
const viewUserLibraryRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const requests = await LibraryRequest.find({ userId }).populate("libraryId");

    if (requests.length > 0) {
      return res.status(200).json({ status: 200, msg: "Data obtained successfully", data: requests });
    } else {
      return res.status(200).json({ status: 200, msg: "No data obtained" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error fetching data", error: err });
  }
};

// User leaves a library
const leaveLibrary = async (req, res) => {
  try {
    await LibraryRequest.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 200, msg: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error deleting request", error: err });
  }
};

// Admin deletes a library member
const deleteLibraryMember = async (req, res) => {
  try {
    const response = await LibraryRequest.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 200, msg: "Member removed", data: response });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error deleting member", error: err });
  }
};

// Get all accepted libraries for a user
const getAcceptedLibrariesForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await LibraryRequest.find({ userId, status: 'accepted' }).populate("libraryId");

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No accepted requests found for this user" });
    }

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching requests", error });
  }
};

module.exports = {
  sendRequest,
  getRequestsForLibrary,
  getAcceptedRequestsForLibrary,
  acceptRequest,
  rejectRequest,
  viewUserLibraryRequests,
  leaveLibrary,
  deleteLibraryMember,
  getAcceptedLibrariesForUser,
};
