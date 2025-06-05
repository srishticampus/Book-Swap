const express = require("express");
const userexchangeschema = require("./userExchangeSchema");

const userExchangebook = (req, res) => {
  let exchange = new userexchangeschema({
    bookname: req.body.bookname,
    authername: req.body.authername,
    discription: req.body.discription,
    userid: req.body.userid,
  });
  exchange
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "saved",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "error",
      });
    });
};

const getuserExchangebook = async (req, res) => {
  const { userid } = req.params;
  //  console.log("in Api",req.params);
  let data=[]
   await userexchangeschema.find({status:"pending"}).populate('userid').then(requests=>{
          //  console.log("req",requests);
      if(requests.length>0){
 requests.map(x=>{
//   // console.log("in map",x.userid);
   if(((x.userid._id).toString())!=userid){
     data.push(x)
   }
 })
}    if (data.length <=0) {
//       console.log("worked 0 ");
        res
      .json({ status:500,message: "No Exchange Requests found" })
    }
    else{
      res.json({
        status:200,
        msg:"ok",
        data:data
      })   
     }
   }).catch (error=>{
    console.log(error);
    res.json({status:500, message: "Error fetching requests", error });
  })

};

const acceptExchangeIdRequest = async (req, res) => {
    const { exchangeId } = req.params;
    const { userId } = req.body; 
    // console.log('ex',exchangeId);
    // console.log('user',userId);
  
    try {
      const request = await userexchangeschema.findById(exchangeId);
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      request.status = "Accepted";
      request.acceptedDate = new Date();
      request.statusChangedBy = userId; 
      await request.save();
  
      return res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error accepting request", error });
    }
  };
  
  const rejectExchangeIdRequest = async (req, res) => {
    const { exchangeId } = req.params;
    const { userId } = req.body; 
  
    try {
      const request = await userexchangeschema.findById(exchangeId);
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      request.status = "rejected";
      request.statusChangedBy = userId; 
      await request.save();
  
      return res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error rejecting request", error });
    }
  };
  
  const displayExchangeRequest = async (req, res) => {
    try {
      const requests = await userexchangeschema.find({})
        .populate("userid")
        .populate("statusChangedBy");
  
      const filteredRequests = requests.filter((request) => request.statusChangedBy !== null);
  
      if (filteredRequests.length === 0) {
        return res.status(404).json({ message: "No requests found for this book" });
      }
      // console.log(filteredRequests);
      return res.status(200).json(filteredRequests);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching requests", error });
    }
  };
    

module.exports = {
  userExchangebook,
  getuserExchangebook,
  acceptExchangeIdRequest,
  rejectExchangeIdRequest,
  displayExchangeRequest
};
