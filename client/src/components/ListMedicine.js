import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'

import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        color:  #000000;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const ListMedicine = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await axios.get('api/admin/getinven')
        setUsers(response.data);
    }

    return (
        <Layout>
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Category</TableCell>
                    <TableCell>Dosage</TableCell>
                    <TableCell>Strength</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>ExpDate</TableCell>
                    <TableCell>Storage</TableCell>
                    <TableCell>Manuf</TableCell>
                    <TableCell>ndc</TableCell>
                    <TableCell>Barcode</TableCell>
                    <TableCell></TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TRow key={user.id}>
                        <TableCell>{user.Category}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{user.Dosage}</TableCell>
                        <TableCell>{user.Strength}</TableCell>
                        <TableCell>{user.batch}</TableCell>
                        <TableCell>{user.ExpDate}</TableCell>
                        <TableCell>{user.Storage}</TableCell>
                        <TableCell>{user.Manuf}</TableCell>
                        <TableCell>{user.ndc}</TableCell>
                        <TableCell>{user.barcode}</TableCell>
                        <TableCell>
    <Button style={{ backgroundColor: "rgb(0, 128, 0)", marginRight: 10 }} variant="contained" component={Link} to={`/edit/${user._id}`}>
        Edit
    </Button>
    <Button style={{ backgroundColor: "#E74C3C" }} variant="contained" onClick={() => deleteUserData(user._id)}>
        Delete
    </Button>
</TableCell>

                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
        </Layout>
    )
}

export default ListMedicine;