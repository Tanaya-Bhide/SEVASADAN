import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import "./view.css";
import Layout from "../../components/Layout";

function View() {
  const [patient, setPatient] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchPatientData = useCallback(
    async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/view/patient/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data) {
          setPatient(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoading());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(showLoading());
    fetchPatientData(id);
  }, [dispatch, fetchPatientData, id]);

  return (
    <Layout>
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Patient Details</h5>
        </div>
        <div className="card-body">
          <div className="patient-info">
            <label>ID:</label>
            <p>{patient.id}</p>
          </div>
          <div className="patient-info">
            <label>Name:</label>
            <p>{patient.name}</p>
          </div>
          <div className="patient-info">
            <label>Age:</label>
            <p>{patient.age}</p>
          </div>
          <div className="patient-info">
            <label>Phone:</label>
            <p>{patient.phone}</p>
          </div>
          <div className="patient-info">
            <label>Address:</label>
            <p>{patient.address}</p>
          </div>
          <div className="patient-info">
            <label>Gender:</label>
            <p>{patient.gender}</p>
          </div>
          <div className="patient-info">
            <label>Occupation:</label>
            <p>{patient.occupation}</p>
          </div>
          <div className="patient-info">
            <label>Complaints:</label>
            <p>{patient.complaints}</p>
          </div>
          <div className="patient-info">
            <label>History:</label>
            <p>{patient.history}</p>
          </div>
          <div className="patient-info">
            <label>Allergies:</label>
            <p>{patient.allergies}</p>
          </div>
          <div className="patient-info">
            <label>General Examination:</label>
            <p>{patient.general_examination}</p>
          </div>
          <div className="patient-info">
            <label>Level of Consciousness:</label>
            <p>{patient.level_of_consciousness}</p>
          </div>
          <div className="patient-info">
            <label>Local Examination:</label>
            <p>{patient.local_examination}</p>
          </div>

          <div className="patient-info">
            <label>Treatment Plan</label>
            {patient.treatmentPlan ? (
              <table className="table">
                <tbody>
                  <tr>
                    <th>Investigation Advised</th>
                    <td>{patient.treatmentPlan.investadvised}</td>
                  </tr>
                  <tr>
                    <th>Medication</th>
                    <td>{patient.treatmentPlan.medication}</td>
                  </tr>
                  <tr>
                    <th>Special Needs</th>
                    <td>{patient.treatmentPlan.specialNeeds}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No treatment plan available.</p>
            )}
          </div>

          <div className="patient-info">
            <label>Assessed By</label>
            {patient.assessedBy ? (
              <table className="table">
                <tbody>
                  <tr>
                    <th>Doctor's Name</th>
                    <td>{patient.assessedBy.doctorName}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{patient.assessedBy.date}</td>
                  </tr>
                  <tr>
                    <th>Time</th>
                    <td>{patient.assessedBy.time}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No assessment information available.</p>
            )}
          </div>

          <div className="patient-info">
            <label>Systematic Examination</label>
            {patient.systematicexam ? (
              <table className="table">
                <tbody>
                  <tr>
                    <th>CVS</th>
                    <td>{patient.systematicexam.cvs}</td>
                  </tr>
                  <tr>
                    <th>RS</th>
                    <td>{patient.systematicexam.rs}</td>
                  </tr>
                  <tr>
                    <th>CNS</th>
                    <td>{patient.systematicexam.cns}</td>
                  </tr>
                  <tr>
                    <th>PA</th>
                    <td>{patient.systematicexam.pa}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No systematic examination information available.</p>
            )}
          </div>

          <div className="patient-info">
            <label>Vitals</label>
            {patient.vitals ? (
              <table className="table">
                <tbody>
                  <tr>
                    <th>Pulse</th>
                    <td>{patient.vitals.pulse}</td>
                  </tr>
                  <tr>
                    <th>Blood Pressure</th>
                    <td>
                      <span>
                        Systolic: {patient.vitals.bloodPressure.systolic}
                      </span>
                      <span>
                        Diastolic: {patient.vitals.bloodPressure.diastolic}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Temperature</th>
                    <td>{patient.vitals.temperature}</td>
                  </tr>
                  <tr>
                    <th>Oxygen Saturation</th>
                    <td>{patient.vitals.oxygenSaturation}</td>
                  </tr>
                  <tr>
                    <th>BSL</th>
                    <td>{patient.vitals.bsl}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No vitals information available.</p>
            )}
          </div>

          <div className="back-btn">
            <Link to="/search-patient">Back to Patients</Link>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default View;
