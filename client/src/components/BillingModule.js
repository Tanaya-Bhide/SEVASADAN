// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router";
// import axios from "axios";
// import Billing from "../BillingModel";
// import Razorpay from "razorpay";

// import "./BillingModule.css";

// const BillingModule = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [expenseType, setExpenseType] = useState("");
//   const [amount, setAmount] = useState("");
//   const [grossTotal, setGrossTotal] = useState(0);
//   const [objectId, setObjectId] = useState("");
//   const [name, setName] = useState("");
//   const [rzpInstance, setRzpInstance] = useState(null); // Razorpay instance

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     setObjectId(params.get("objectId"));
//     setName(params.get("name"));

//     // Initialize Razorpay instance
//     const rzp = new Razorpay({
//       key: "YOUR_RAZORPAY_API_KEY",
//       // Other configuration options
//     });
//     setRzpInstance(rzp);
//   }, [location.search]);
//   const handlePrint = () => {
//     window.print();
//   };
 
  
//   const saveBillingData = async (expenses, grossTotal, objectId, name) => {
//     try {
//       const billing = new Billing({
//         expenses: expenses.map((expense) => ({
//           expenseType: expense.expenseType,
//           amount: expense.amount,
//         })),
//         grossTotal,
//         objectId,
//         name,
//       });

//       // Send the billing data to the API endpoint
//       const response = await axios.post("/api/admin/billing", billing);
//       console.log(response.data); // Handle successful response
//     } catch (error) {
//       console.error(error); // Handle error
//     }
//   };

//   const handleAddExpense = () => {
//     if (expenseType && amount) {
//       const newExpense = {
//         expenseType,
//         amount: parseFloat(amount),
//       };

//       setExpenses([...expenses, newExpense]);
//       setExpenseType("");
//       setAmount("");
//     }
//   };

//   const handleDeleteExpense = (index) => {
//     const updatedExpenses = [...expenses];
//     updatedExpenses.splice(index, 1);
//     setExpenses(updatedExpenses);
//   };

//   const calculateGrossTotal = () => {
//     const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
//     setGrossTotal(total);
//   };

//   const handleFinish = () => {
//     saveBillingData(expenses, grossTotal, objectId, name);
//   };

//   const handlePay = async () => {
//     const options = {
//       amount: grossTotal * 100, // Razorpay accepts amount in paise
//       currency: "INR",
//       name: "Your Company Name",
//       description: "Billing Payment",
//       handler: function (response) {
//         // Handle payment success
//         console.log("Payment successful!", response);

//         // Save the billing data
//         saveBillingData(expenses, grossTotal, objectId, name);

//         // Redirect to success page or perform any other action
//         navigate("/success");
//       },
//       prefill: {
//         name: name,
//       },
//       notes: {
//         objectId: objectId,
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     if (rzpInstance) {
//       rzpInstance.open(options);
//     }
//   };

//   return (
//     <div className="billing-container">
//       {/* Existing code */}
//       {/* ... */}

//       {/* Print button */}
//       <button className="print-btn" onClick={handlePrint}>
//         Print Bill
//       </button>

//       {/* Pay via Razorpay button */}
//       <button className="pay-btn" onClick={handlePay}>
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default BillingModule;
