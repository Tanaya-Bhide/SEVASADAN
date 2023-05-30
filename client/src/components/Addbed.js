import React, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from './Layout';

const initialValue = {
  bedno: '',
  roomno: '',
  patient: ''
};

const AddBeds = () => {
  const [user, setUser] = useState(initialValue);
  const { bedno, roomno, patient } = user;

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    try {
      await axios.post('/api/admin/addbed', {
        bedno: bedno,
        roomno: roomno,
        patient: patient
      });
      navigate('/getbed');
    } catch (error) {
      console.log(error);
    }
  };

  const formStyles = {
    width: '50%',
    margin: '5% 0 0 25%'
  };

  const formControlStyles = {
    marginTop: '30px'
  };

  return (
    <Layout>
      <Typography variant="h4" style={{ fontSize: '24px', marginBottom: '20px' }}>Add Beds</Typography>

      <FormGroup style={formStyles}>
        <InputLabel htmlFor="bedno-input">Bed Number</InputLabel>
        <Input onChange={onValueChange} name="bedno" value={bedno} id="bedno-input" />
      </FormGroup>
      <FormGroup style={formStyles}>
        <InputLabel htmlFor="roomno-input">Room Number</InputLabel>
        <Input onChange={onValueChange} name="roomno" value={roomno} id="roomno-input" />
      </FormGroup>
      <FormGroup style={formStyles}>
        <InputLabel htmlFor="patient-input">Patient</InputLabel>
        <Input onChange={onValueChange} name="patient" value={patient} id="patient-input" />
      </FormGroup>
      <FormGroup style={formStyles}>
        <Button className='add-bed-button' color="primary" onClick={addUserDetails} style={{ marginTop: '20px' }}>Add Bed</Button>
      </FormGroup>
    </Layout>
  );
};

export default AddBeds;
