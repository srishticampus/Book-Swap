const { response } = require("express");
const userSchema = require("../User/userSchema");
const { clubEditbyid } = require("./clubController");
const ClubRequest = require("./clubrequestsSchema");

const sendRequest = async (req, res) => {
  const { clubId, userId,users } = req.body;

  try {
    const existingRequest = await ClubRequest.findOne({ clubId, userId });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Request already sent once", existingRequest });
    }

    const newRequest = new ClubRequest({ clubId, userId,users });
    await newRequest.save();
    return res.status(201).json({ message: "Request sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending request", error });
  }
};

const getRequestsForClub = async (req, res) => {
  const { clubId } = req.params;
 
  try {
    const requests = await ClubRequest.find({ clubId ,status:'pending' }).populate("userId")
    console.log('yy',clubId);
    console.log(requests);
    if (!requests) {
      return res
        .status(404)
        .json({ message: "No requests found for this club" });
    }

    return res.status(200).json(requests);
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error fetching requests", error });
  }
};
const getAcceptedRequestForClub = async (req, res) => {
  const { clubId } = req.params;
 
  try {
    const requests = await ClubRequest.find({ clubId ,status:'accepted' }).populate("userId")
    console.log('yy',clubId);
    console.log(requests);
    if (!requests) {
      return res
        .status(404)
        .json({ message: "No requests found for this club" });
    }

    return res.status(200).json(requests);
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error fetching requests", error });
  }
};

const getRequestuser = async (req, res) => {
    try {
      const { userId } = req.param
      const requests = await requestsSchema.find({ userId})
  
      if (requests.length > 0) {
        const userList = await userSchema.find({ _id: { $in: userId } });
        
        if (userList.length > 0) {
          res.json(userList); 
        } else {
          res.status(404).json({ message: "No users found for the provided IDs" });
        }
      } else {
        res.status(404).json({ message: "No pending requests found for the user" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching user details", error: err });
    }
  };

  const acceptRequest = async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const requests = await ClubRequest.findById(requestId);
  
      if (!requests) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      requests.status = "accepted";
      await requests.save();
      if (requests.status==="accepted"){
        return res.status(200).json({ message: "Request accepted successfully" })
      }
    } catch (error) {
      return res.status(500).json({ message: "Error accepting request", error });
    }
  };
  
  const rejectRequest = async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const requests = await ClubRequest.findById(requestId);
  
      if (!requests) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      requests.status = "rejected"; 
      await requests.save();
  
      return res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error rejecting request", error });
    }
  };
  
const userview=(req,res)=>{
  ClubRequest.find({userId:req.params.id}).populate("clubId")
  .exec()
  .then(data=>{
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}

const leftclub=(req,res)=>{
  ClubRequest.findByIdAndDelete({_id:req.params.id})
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg:"deleted sucessfully",
    });
  })
  .catch((err) => {
    res.json({
      status: 500,
      msg: "No data",
      Error: err,
    });
  });
}


const deleteClubMember=(req,res)=>{
  ClubRequest.findByIdAndDelete({_id:req.params.id})
  .then(response=>{
    console.log(response);

      res.json({
          msg:response,
          status:200
      })
  })
  .catch((err)=>{
      console.log(err);
      res.json({
          msg:"err",
          status:500

      })
  })


}

const getAcceptedRequestForuser = async (req, res) => {
  const { userId } = req.params;
 
  try {
    const requests = await ClubRequest.find({ userId ,status:'accepted' }).populate("clubId")
    console.log('yy',userId);
    console.log(requests);
    if (!requests) {
      return res
        .status(404)
        .json({ message: "No requests found for this club" });
    }

    return res.status(200).json(requests);
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error fetching requests", error });
  }
};



module.exports = { getRequestsForClub, sendRequest, getRequestuser,acceptRequest,rejectRequest,userview,getAcceptedRequestForClub,deleteClubMember,getAcceptedRequestForuser };
