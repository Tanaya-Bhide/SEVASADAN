import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import './AddMedicine.css'; // Import the CSS file

const initialValue = {
  Category: '',
  Dosage: '',
  Strength: '',
  batch: '',
  ExpDate: '',
  Storage: '',
  Manuf: '',
  ndc: '',
  barcode: '',
};

const AddMedicine = () => {
  const [user, setUser] = useState(initialValue);
  const { Category, Dosage, Strength, batch, ExpDate, Storage, Manuf, ndc, barcode } = user;

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await axios.post('api/admin/addinven', user);
    navigate('/getinven');
  };

  return (
    <Layout>
      <div className="add-medicine-container">
        <h4 className="add-medicine-title">Add Medicines</h4>
        <div className="form-group">
          <label htmlFor="dropdown">Category:</label>
          <select id="dropdown" name="Category" value={Category} onChange={onValueChange} className="dropdown-select">
            <option value="">Select</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="Analgesics">Analgesics</option>
            <option value="Antipyretics">Antipyretics</option>
            <option value="Anticoagulants">Anticoagulants</option>
            <option value="Antihypertensives">Antihypertensives</option>
            <option value="Antidepressants">Antidepressants</option>
            <option value="Antidiabetic-medications">Antidiabetic medications</option>
            <option value="Anticonvulsants">Anticonvulsants</option>
            <option value="Antiemetics">Antiemetics</option>
            <option value="Anti-inflammatory drugs">Anti-inflammatory drugs</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="strength-input">Strength:</label>
          <input type="text" onChange={onValueChange} name="Strength" value={Strength} id="strength-input" />
        </div>
        <div className="form-group">
          <label htmlFor="dosage-input">Dosage Form:</label>
          <input type="text" onChange={onValueChange} name="Dosage" value={Dosage} id="dosage-input" />
        </div>
        <div className="form-group">
          <label htmlFor="batch-input">Batch or Lot Number:</label>
          <input type="text" onChange={onValueChange} name="batch" value={batch} id="batch-input" />
        </div>
        <div className="form-group">
          <label htmlFor="expdate-input">Expire Date:</label>
          <input type="text" onChange={onValueChange} name="ExpDate" value={ExpDate} id="expdate-input" />
        </div>
        <div className="form-group">
          <label htmlFor="storage-input">Storage Condition:</label>
          <input type="text" onChange={onValueChange} name="Storage" value={Storage} id="storage-input" />
        </div>
        <div className="form-group">
          <label htmlFor="manuf-input">Manufacturing Date:</label>
          <input type="text" onChange={onValueChange} name="Manuf" value={Manuf} id="manuf-input" />
        </div>
        <div className="form-group">
          <label htmlFor="ndc-input">National Drug Code:</label>
          <input type="text" onChange={onValueChange} name="ndc" value={ndc} id="ndc-input" />
        </div>
        <div className="form-group">
          <label htmlFor="barcode-input">Barcode:</label>
          <input type="text" onChange={onValueChange} name="barcode" value={barcode} id="barcode-input" />
        </div>
        <div className="form-group">
          <button onClick={addUserDetails} className="add-stock-btn">Add Stock</button>
        </div>
      </div>
    </Layout>
  );
};

export default AddMedicine;

