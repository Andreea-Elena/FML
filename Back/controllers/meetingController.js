const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const MeetingService = require("../services/meetingService");

const createMeeting = async (req, res, next) => {
    const meeting = req.body;
    try{
      const result = await MeetingService.create(meeting);
      res.status(201).send({
        result
      });
  } catch(err) {
      res.status(400).send({
        message: "Invalid meeting!",
      });
    }
  };

  const getMeeting = async (req, res) => {
    const id = req.params.id;
    if (id) {
      const meeting = await MeetingService.getMeetingById(id);
      res.status(200).send(meeting);
    }
  };
  
  
  const deleteMeeting = async (req, res) => {
    const id = req.params.id;
    if (id) {
      const result = await MeetingService.deleteMeeting(id);
      res.status(200).send({
        message: "Meeting deleted succesfully!",
      });
    }
  };
  
  const getMeetings = async (req, res) => {
    const result = await MeetingService.getAll();
    res.status(200).send(result);
  };
  
  module.exports = {
    createMeeting,
    getMeeting,
    deleteMeeting,
    getMeetings,
  };