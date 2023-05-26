import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import ReactToPrint from "react-to-print";
import "./BillingModule.css";
import Layout from "../../components/Layout";

const BillingModule = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [grossTotal, setGrossTotal] = useState(0);
  const [objectId, setObjectId] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const billPrintRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setObjectId(params.get("objectId"));
    setName(params.get("name"));
  }, [location.search]);

  const handleAddExpense = () => {
    if (expenseType && amount) {
      const newExpense = {
        expenseType,
        amount: parseFloat(amount),
      };

      setExpenses([...expenses, newExpense]);
      setExpenseType("");
      setAmount("");
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const calculateGrossTotal = () => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setGrossTotal(total);
  };

  const handlePrint = () => {
    if (billPrintRef.current) {
      billPrintRef.current.handlePrint();
    }
  };

  return (
    <Layout>
    <div className="billing-container">
      {objectId && name ? (
        <div>
          <h1 className="hospital-name">SEVASADAN LIFELINE</h1>
          <h2 className="patient-info">Patient Name: {name}</h2>
          <h2 className="patient-info">Patient ID: {objectId}</h2>
        </div>
      ) : (
        <p>No patient information found.</p>
      )}
      <div className="add-expense">
        <h3>Add Expense</h3>
        <div className="input-group">
          <label htmlFor="expenseType">Expense Type:</label>
          <input
            type="text"
            id="expenseType"
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="add-expense-btn" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>
      <div className="expense-list">
        <h3>Expenses</h3>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Expense Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.expenseType}</td>
                <td>{expense.amount}</td>
                <td>
                  <button
                    className="delete-expense-btn"
                    onClick={() => handleDeleteExpense(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="gross-total">
        <h3>Gross Total: {grossTotal}</h3>
        <button
          className="calculate-total-btn"
          onClick={calculateGrossTotal}
        >
          Calculate Gross Total
        </button>
      </div>
      <div className="print-section">
        <ReactToPrint
          trigger={() => <button className="print-btn">Print Bill</button>}
          content={() => billPrintRef.current}
        />
      </div>
      <div style={{ display: "none" }}>
        {/* Hidden component used for printing */}
        <BillPrintContent
          ref={billPrintRef}
          expenses={expenses}
          grossTotal={grossTotal}
          name={name}
          objectId={objectId}
        />
      </div>
    </div>
    </Layout>
  );
};

// Separate component for printing the bill content
const BillPrintContent = React.forwardRef(
  ({ expenses, grossTotal, name, objectId }, ref) => {
    return (
      <div ref={ref}>
        <div className="bill-header">
          <h1>SEVASADAN LIFELINE</h1>
          <h2>Patient Name: {name}</h2>
          <h2>Patient ID: {objectId}</h2>
        </div>
        <div className="expense-list">
          <h3>Expenses</h3>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.expenseType}</td>
                  <td>{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="gross-total">
          <h3>Gross Total: {grossTotal}</h3>
        </div>
      </div>
    );
  }
);

 

export default BillingModule;
