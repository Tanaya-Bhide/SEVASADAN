import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./update.css";
import Layout from "../../components/Layout";
function Update() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const history = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (event) => {
    const { name, value } = event.target;
    const [parentKey, childKey] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [parentKey]: {
        ...prevData[parentKey],
        [childKey]: value,
      },
    }));
  };

  const validateAge = (age) => {
    if (age <= 0 || age > 150) {
      return "Age must be between 1 and 150";
    }
    return "";
  };

  const validateDate = (date) => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (date > currentDate) {
      return "Date cannot be in the future";
    }
    return "";
  };

  const validateTime = (time) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (time > currentTime) {
      return "Time cannot be in the future";
    }
    return "";
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return "Phone number must be a 10-digit number";
    }
    return "";
  };
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/patients/${id}`,
          { method: "PUT" }
        );
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          throw new Error("Failed to fetch patient data");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPatientData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/patients/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        // Display the toast message
        toast.success("Updated successfully");
        history("/search-patient");
      } else {
        throw new Error("Failed to update patient");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Update Patient</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Render your form fields here */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className={`form-control ${
                    validateAge(formData.age) && "is-invalid"
                  }`}
                  id="age"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleInputChange}
                />
                {validateAge(formData.age) && (
                  <div className="invalid-feedback">
                    {validateAge(formData.age)}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  className={`form-control ${
                    validatePhoneNumber(formData.phone) && "is-invalid"
                  }`}
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                />
                {validatePhoneNumber(formData.phone) && (
                  <div className="invalid-feedback">
                    {validatePhoneNumber(formData.phone)}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="complaints" className="form-label">
                  complaints
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="complaints"
                  name="complaints"
                  value={formData.complaints || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="history" className="form-label">
                  history
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="history"
                  name="history"
                  value={formData.history || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="local_examination" className="form-label">
                  Local Examination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="local_examination"
                  name="local_examination"
                  value={formData.local_examination || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="level_of_consiousness" className="form-label">
                  level_of_consciousness
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=" level_of_consciousness"
                  name=" level_of_consciousness"
                  value={formData.level_of_consciousness || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor=" general_examination" className="form-label">
                  general_examination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="  general_examination"
                  name="  general_examination"
                  value={formData.general_examination || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="allergies" className="form-label">
                  allergies
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allergies"
                  name="allergies"
                  value={formData.allergies || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="local_examinations" className="form-label">
                  local_examination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="local_examination"
                  name="local_examination"
                  value={formData.local_examination || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* ...other fields... */}

              {/* Handle nested fields */}
              <div className="mb-3">
                <label htmlFor="vitals.pulse" className="form-label">
                  Pulse
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pulse"
                  name="vitals.pulse"
                  value={formData.vitals?.pulse || ""}
                  onChange={handleNestedInputChange}
                />
              </div>

              <table>
                <tr>
                  <td>
                    <label for="pulse">Pulse</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      id="pulse"
                      name="vitals.pulse"
                      value={formData.vitals?.pulse || ""}
                      onChange={handleNestedInputChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="temperature">temperature</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      id="temperature"
                      name="vitals.temperature"
                      value={formData.vitals?.temperature || ""}
                      onChange={handleNestedInputChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="oxygenSaturation">oxygenSaturation</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      id="oxygenSaturation"
                      name="vitals.oxygenSaturation"
                      value={formData.vitals?.oxygenSaturation || ""}
                      onChange={handleNestedInputChange}
                      required
                    />
                  </td>
                </tr>
                <td>
                  <label for="bsl">bsl</label>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="bsl"
                    name="vitals.bsl"
                    value={formData.vitals?.bsl || ""}
                    onChange={handleNestedInputChange}
                    required
                  />
                </td>
              </table>
              <table>
                <tr>
                  <td>
                    <label for="cvs">CVS</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="cvs"
                      name="systematicexam.cvs"
                      value={formData.systematicexam?.cvs || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="rs">RS</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="rs"
                      name="systematicexam.rs"
                      value={formData.systematicexam?.rs || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="cns">CNS</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="cns"
                      name="systematicexam.cns"
                      value={formData.systematicexam?.cns || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="pa">PA</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="pa"
                      name="systematicexam.pa"
                      value={formData.systematicexam?.pa || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td>
                    <label for="investadvised">Investigation Advised</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="investadvised"
                      name="treatmentPlan.investadvised"
                      value={formData.treatmentPlan?.investadvised || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="medication">Medication</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="medication"
                      name="treatmentPlan.medication"
                      value={formData.treatmentPlan?.medication || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="specialNeeds">Special Needs</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="specialNeeds"
                      name="treatmentPlan.specialNeeds"
                      value={formData.treatmentPlan?.specialNeeds || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td>
                    <label for="doctorName">Doctor Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="doctorName"
                      name="assessedBy.doctorName"
                      value={formData.assessedBy?.doctorName || ""}
                      onChange={handleNestedInputChange}
                      required
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="date">Date</label>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        className={`form-control ${
                          validateDate(formData.date) && "is-invalid"
                        }`}
                        id="date"
                        name="date"
                        value={formData.date || ""}
                        onChange={handleInputChange}
                      />
                      {validateDate(formData.date) && (
                        <div className="invalid-feedback">
                          {validateDate(formData.date)}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="time">Time</label>
                  </td>
                  <td>
                    <div className="form-group">
                      <label htmlFor="time">Time</label>
                      <input
                        type="time"
                        className={`form-control ${
                          validateTime(formData.time) && "is-invalid"
                        }`}
                        id="time"
                        name="time"
                        value={formData.time || ""}
                        onChange={handleInputChange}
                      />
                      {validateTime(formData.time) && (
                        <div className="invalid-feedback">
                          {validateTime(formData.time)}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </table>

              <button type="submit" className="btn btn-primary">
                Update Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Update;
