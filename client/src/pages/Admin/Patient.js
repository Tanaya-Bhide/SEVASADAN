import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Patient.css";
import Layout from "../../components/Layout";
function Patient() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    phone: "",
    address: "",
    complaints: "",
    history: "",
    allergies: "",
    general_examination: "",
    level_of_consciousness: "",
    vitals: {
      pulse: null,
      bloodPressure: {
        systolic: null,
        diastolic: null,
      },
      temperature: null,
      oxygenSaturation: null,
      bsl: null,
    },
    systematicexam: {
      cvs: null,
      rs: null,
      cns: null,
      pa: null,
    },
    local_examination: "",
    treatmentPlan: {
      investadvised: null,
      medication: null,
      specialNeeds: null,
    },
    assessedBy: {
      doctorName: null,
      date: null,
      time: null,
    },
    assistedBy: {
      doctorName1: null,
      date1: null,
      time1: null,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [dateError, setDateError] = useState("");

  /*const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientData({ ...patientData, [name]: value });
  };
  
*/
  const validateAge = (value) => {
    if (!value) {
      return "Age is required";
    }

    const age = parseInt(value);
    if (isNaN(age) || age <= 0 || age >= 200) {
      return "Age must be valid";
    }

    // Additional age validation logic can be added here if needed
    {
      ageError && <div style={{ color: "red" }}>{ageError}</div>;
    }

    return "";
  };
  const validatePhoneNumber = (value) => {
    if (!value) {
      return "Phone number is required";
    }

    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return "Phone number must be a 10-digit number";
    }

    return "";
  };
  const validateDate = (value) => {
    if (!value) {
      return "Date is required";
    }

    const inputDate = new Date(value);
    if (isNaN(inputDate.getTime())) {
      return "Invalid date format";
    }

    const today = new Date();
    const nextYear = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );

    if (inputDate < today) {
      return "Selected date cannot be older than today";
    }

    if (inputDate > nextYear) {
      return "Selected date cannot be in the next year";
    }

    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const error = validatePhoneNumber(value);
      setPhoneError(error);
    }
    if (name === "age") {
      const ageError = validateAge(value);
      setAgeError(ageError);
    }
    if (name === "date") {
      const dateError = validateDate(value);
      setDateError(dateError);
    }

    const nameArray = name.split(".");
    let newData = { ...patientData };

    nameArray.reduce((acc, curr, index) => {
      if (index === nameArray.length - 1) {
        acc[curr] = value;
      } else {
        if (!acc[curr]) {
          acc[curr] = isNaN(nameArray[index + 1]) ? {} : [];
        }
      }
      return acc[curr];
    }, newData);

    setPatientData(newData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !patientData.name ||
      !patientData.age ||
      !patientData.gender ||
      !patientData.address ||
      !patientData.phone ||
      !patientData.occupation ||
      !patientData.history ||
      !patientData.complaints ||
      !patientData.allergies ||
      !patientData.vitals.pulse ||
      !patientData.vitals.bloodPressure.systolic ||
      !patientData.vitals.bloodPressure.diastolic ||
      !patientData.vitals.temperature ||
      !patientData.vitals.oxygenSaturation ||
      !patientData.vitals.bsl ||
      !patientData.systematicexam.cvs ||
      !patientData.systematicexam.rs ||
      !patientData.systematicexam.cns ||
      !patientData.systematicexam.pa ||
      !patientData.local_examination ||
      !patientData.treatmentPlan.investadvised ||
      !patientData.treatmentPlan.medication ||
      !patientData.treatmentPlan.specialNeeds ||
      !patientData.assessedBy.doctorName ||
      !patientData.assessedBy.date ||
      !patientData.assessedBy.time ||
      !patientData.assistedBy.doctorName1 ||
      !patientData.assistedBy.date1 ||
      !patientData.assistedBy.time1 ||
      !patientData.level_of_consciousness
    ) {
      let errorMessage = "Please fill in all the required fields:";
      if (!patientData.name) errorMessage += "Name";
      if (!patientData.age) errorMessage += " Age";
      if (!patientData.gender) errorMessage += " Gender";
      if (!patientData.address) errorMessage += " Address";
      if (!patientData.phone) errorMessage += " Phone";
      if (!patientData.occupation) errorMessage += " Occupation";
      if (!patientData.history) errorMessage += " History";
      if (!patientData.complaints) errorMessage += " Complaints";
      if (!patientData.allergies) errorMessage += " Allergies";
      if (!patientData.vitals.pulse) errorMessage += " Pulse";
      if (!patientData.vitals.bloodPressure.systolic)
        errorMessage += " Systolic Blood Pressure";
      if (!patientData.vitals.bloodPressure.diastolic)
        errorMessage += " Diastolic Blood Pressure";
      if (!patientData.vitals.temperature) errorMessage += " Temperature";
      if (!patientData.vitals.oxygenSaturation) errorMessage += " Oxygen";
      if (!patientData.vitals.bsl) errorMessage += " Blood Sugar Level";
      if (!patientData.systematicexam.cvs) errorMessage += " CVS";
      if (!patientData.systematicexam.rs) errorMessage += " RS";
      if (!patientData.systematicexam.cns) errorMessage += " CNS";
      if (!patientData.systematicexam.pa) errorMessage += " PA";
      if (!patientData.local_examination) errorMessage += " Local Examination";
      if (!patientData.treatmentPlan.investadvised)
        errorMessage += " Invest Advised";
      if (!patientData.treatmentPlan.medication) errorMessage += " Medication";
      if (!patientData.treatmentPlan.specialNeeds)
        errorMessage += " Special Needs";
      if (!patientData.assessedBy.doctorName)
        errorMessage += " Assessed By Doctor Name";
      if (!patientData.assessedBy.date) errorMessage += " Assessed By Date";
      if (!patientData.assessedBy.time) errorMessage += " Assessed By Time";
      if (!patientData.assistedBy.doctorName1)
        errorMessage += " Assisted By Doctor Name";
      if (!patientData.assistedBy.date1) errorMessage += " Assisted By Date";
      if (!patientData.assistedBy.time1) errorMessage += " Assisted By Time";
      if (!patientData.level_of_consciousness)
        errorMessage += " Assisted By consss";
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const response = await fetch("/api/admin/register-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsSubmitted(true);
      navigate.push("/");
      // TODO: handle successful submission
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <p>Form successfully submitted!</p>
      </div>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
            style={{ border: "2px solid black" }} // Add this line to apply the border
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={patientData.age}
            onChange={handleInputChange}
            style={{ border: ageError ? "2px solid red" : "2px solid black" }}
          />
          {ageError && <div style={{ color: "red" }}>{ageError}</div>}
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={patientData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Occupation:
          <textarea
            name="occupation"
            value={patientData.occupation}
            onChange={handleInputChange}
          ></textarea>
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={patientData.address}
            onChange={handleInputChange}
          ></textarea>
        </label>

        <label>
          Phone:
          <input
            type="number"
            name="phone"
            value={patientData.phone}
            onChange={handleInputChange}
            style={{
              border: phoneError ? "2px solid red" : "2px solid black",
            }}
          />
          {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
        </label>

        <label>
          complaints:
          <textarea
            name="complaints"
            value={patientData.complaints}
            onChange={handleInputChange}
          ></textarea>
        </label>

        <label>
          Medical history:
          <textarea
            name="history"
            value={patientData.history}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          allergies:
          <textarea
            name="allergies"
            value={patientData.allergies}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          Level of Conciousness:
          <textarea
            name="level_of_consciousness"
            value={patientData.level_of_consciousness}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          General Examination:
          <textarea
            name="general_examination"
            value={patientData.general_examination}
            onChange={handleInputChange}
          ></textarea>
        </label>

        <label>
          <table>
            <thead>
              <tr>
                <th>Vital Parameters</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pulse</td>
                <td>
                  <input
                    type="number"
                    name="vitals.pulse"
                    value={patientData.vitals.pulse}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Blood Pressure (systolic)</td>
                <td>
                  <input
                    type="number"
                    name="vitals.bloodPressure.systolic"
                    value={patientData.vitals.bloodPressure.systolic}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Blood Pressure (diastolic)</td>
                <td>
                  <input
                    type="number"
                    name="vitals.bloodPressure.diastolic"
                    value={patientData.vitals.bloodPressure.diastolic}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Temperature</td>
                <td>
                  <input
                    type="number"
                    name="vitals.temperature"
                    value={patientData.vitals.temperature}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Oxygen saturation</td>
                <td>
                  <input
                    type="number"
                    name="vitals.oxygenSaturation"
                    value={patientData.vitals.oxygenSaturation}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>BSL (Blood Sugar Level)</td>
                <td>
                  <input
                    type="number"
                    name="vitals.bsl"
                    value={patientData.vitals.bsl}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </label>

        <label>
          <table>
            <thead>
              <tr>
                <th>Systematic Examination</th>
                <th>Findings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cardiovascular System (CVS)</td>
                <td>
                  <textarea
                    name="systematicexam.cvs"
                    value={patientData.systematicexam.cvs}
                    onChange={handleInputChange}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Respiratory System (RS)</td>
                <td>
                  <textarea
                    name="systematicexam.rs"
                    value={patientData.systematicexam.rs}
                    onChange={handleInputChange}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Central Nervous System (CNS)</td>
                <td>
                  <textarea
                    name="systematicexam.cns"
                    value={patientData.systematicexam.cns}
                    onChange={handleInputChange}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Per Abdomen (PA)</td>
                <td>
                  <textarea
                    name="systematicexam.pa"
                    value={patientData.systematicexam.pa}
                    onChange={handleInputChange}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </label>
        <label>
          Local Examination:
          <textarea
            name="local_examination"
            value={patientData.local_examination}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          Investigations advised:
          <textarea
            name="treatmentPlan.investadvised"
            value={patientData.treatmentPlan.investadvised}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          Medication as per order form:
          <textarea
            name="treatmentPlan.medication"
            value={patientData.treatmentPlan.medication}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          Special needs:
          <textarea
            name="treatmentPlan.specialNeeds"
            value={patientData.treatmentPlan.specialNeeds}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Assessed By</td>
                <td>
                  <input
                    type="text"
                    name="assessedBy.doctorName"
                    value={patientData.assessedBy.doctorName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="assessedBy.date"
                    value={patientData.assessedBy.date}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="assessedBy.time"
                    value={patientData.assessedBy.time}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <td>Assisted By</td>
              <td>
                <input
                  type="text"
                  name="assistedBy.doctorName1"
                  value={patientData.assistedBy.doctorName1}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="assistedBy.date1"
                  value={patientData.assistedBy.date1}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="assistedBy.time1"
                  value={patientData.assistedBy.time1}
                  onChange={handleInputChange}
                />
              </td>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </label>

        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}

export default Patient;
