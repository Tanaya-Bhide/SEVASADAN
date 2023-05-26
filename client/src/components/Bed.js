import react, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
// import { getUsers, deleteUser } from '../services/api';
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;

    color: #000000;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllBed = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await axios.get("api/admin/getbed");
    setUsers(response.data);
  };

  return (
    <Layout>
      Bed List
      <StyledTable>
        <TableHead>
          <THead>
            {/* <TableCell>Id</TableCell> */}
            <TableCell>Bed No</TableCell>
            <TableCell>Room No</TableCell>
            <TableCell>Patient</TableCell>
            {/* <TableCell>Disease</TableCell> */}
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TRow key={user.id}>
              {/* <TableCell>{user._id}</TableCell> change it to user.id to use JSON Server */}
              <TableCell>{user.bedno}</TableCell>
              <TableCell>{user.roomno}</TableCell>
              <TableCell>{user.patient}</TableCell>
              {/* <TableCell>{user.disease}</TableCell> */}
              <TableCell>
                <Button
                  style={{ backgroundColor: "rgb(0, 128, 0)", marginRight: 10 }}
                  variant="contained"
                  component={Link}
                  to={`/edit/${user._id}`}
                >
                  Edit
                </Button>
                <Button
                  style={{ backgroundColor: "#E74C3C" }}
                  variant="contained"
                  onClick={() => deleteUserData(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </Layout>
  );
};

export default AllBed;
