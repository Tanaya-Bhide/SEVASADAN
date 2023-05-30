const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/PatientModel");
const patternn = require("../models/InventoryModel");
const bedmodel = require("../models/BedModel");
const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");
const Billing = require("../client/src/BillingModel");
router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-doctor-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {
        status,
      });

      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your doctor account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

router.post("/register-patient", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      occupation,
      phone,
      address,
      complaints,
      history,
      allergies,
      general_examination,
      level_of_consciousness,
      vitals,
      systematicexam,
      local_examination,
      treatmentPlan,
      assessedBy,
    } = req.body;

    const patient = new Patient({
      name,
      age,
      gender,
      occupation,
      phone,
      address,
      complaints,
      history,
      allergies,
      general_examination,
      level_of_consciousness,
      vitals,
      systematicexam,
      local_examination,
      treatmentPlan,
      assessedBy,
    });

    const result = await patient.save();

    res.status(201).json({
      message: "Patient created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating patient",
      success: false,
      error,
    });
  }
});

/* pateints */
router.get("/patients", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).send({
      message: "Patients fetched successfully",
      success: true,
      data: patients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching patients",
      success: false,
      error,
    });
  }
});
// Route definition
router.delete("/api/patients/:id", (req, res) => {
  const id = req.params.id;

  // Handle the request
  db.deletePatient(id)
    .then(() => {
      // Respond with a success message
      res
        .status(200)
        .json({ success: true, message: "Patient deleted successfully." });
    })
    .catch((error) => {
      // Respond with an error message
      res.status(500).json({ success: false, error: error.message });
    });
});
router.get("/view/patient/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Update patient by ID
router.put("/patients/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    age,
    gender,
    occupation,
    phone,
    address,
    complaints,
    history,
    allergies,
    general_examination,
    level_of_consciousness,
    vitals,
    systematicexam,
    local_examination,
    treatmentPlan,
    assessedBy,
  } = req.body;

  try {
    // Find the patient with the given ID
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update the patient's information
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.occupation = occupation || patient.occupation;
    patient.phone = phone || patient.phone;
    patient.address = address || patient.address;
    patient.complaints = complaints || patient.complaints;
    patient.history = history || patient.history;
    patient.allergies = allergies || patient.allergies;
    patient.general_examination =
      general_examination || patient.general_examination;
    patient.level_of_consciousness =
      level_of_consciousness || patient.level_of_consciousness;
    patient.vitals = vitals || patient.vitals;
    patient.systematicexam = systematicexam || patient.systematicexam;
    patient.local_examination = local_examination || patient.local_examination;
    patient.treatmentPlan = treatmentPlan || patient.treatmentPlan;
    patient.assessedBy = assessedBy || patient.assessedBy;

    // Save the updated patient to the database
    const updatedPatient = await patient.save();

    res.json(updatedPatient);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/patients/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    await patient.remove();
    return res.json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/*beds and inventory */
router.post("/addbed", async (req, res) => {
  try {
    const newbed = new bedmodel({
      roomno: req.body.roomno,
      bedno: req.body.patient,
      patient: req.body.bedno,
    });
    const result = await newbed.save();
    res.json(newbed);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/addinven", async (req, res) => {
  const boody = req.body;
  try {
    const newuser = new patternn(boody);
    await newuser.save();
    res.json(newuser);
  } catch (error) {
    console.log("Error occured", error);
  }
});
router.get("/getinven", async (req, res) => {
  try {
    const all = await patternn.find({});
    res.status(200).json(all);
    // console.log(all);
  } catch (error) {
    console.log("Error Occured", error);
  }
});
router.get("/getbed", async (req, res) => {
  try {
    const all = await bedmodel.find({});
    res.status(200).json(all);
    // console.log(all);
  } catch (error) {
    console.log("Error Occured", error);
  }
});

 
module.exports = router;
