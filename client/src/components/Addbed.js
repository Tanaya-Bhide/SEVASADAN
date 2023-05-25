import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './addbed.css'

const initialValue = {
  roomno:'',
  bedno:'',
  patient: ''
}

const AddBeds=()=>{
  const navigate= useNavigate();

  const [user, setUser]= useState(initialValue);
  const { roomno, bedno, patient } = user;

    const onValueChange=(e)=>{
      setUser({...user, [e.target.name]:e.target.value})
        console.log(e.target.value);
    }

    const addUserDetails=async()=>{
        await axios.post('api/admin/addbed', user)
        navigate('/getbed');
    }

    return(
        <>
           
  <div className="container">
    <div className="content">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Room Number</span>
            <input type="text" onChange={(e)=>{onValueChange(e)}} value={roomno} placeholder="Enter Room Number" name="roomno"/>
          </div>
          <div className="input-box">
            <span className="details">Bed Number</span>
            <input type="text" onChange={(e)=>{onValueChange(e)}} value={bedno} placeholder="Enter Bed Number"  name="bedno"/>
          </div>
          <div className="input-box">
            <span className="details">Patient</span>
            <input type="text" onChange={(e)=>{onValueChange(e)}} value={patient} placeholder="Enter Patients name" name="patient" />
          </div>
        <div class="bed-button">
         <button className="button" onClick={()=>addUserDetails()}>Add Bed</button>
        </div>
    </div>
  </div>
  </div>
        </>
        
    )

}

export default AddBeds;