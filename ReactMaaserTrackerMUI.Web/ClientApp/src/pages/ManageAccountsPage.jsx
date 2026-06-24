import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ManageAccountsPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [addEditOpen, setaddEditOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({ id: 0, name: '', transactions: [] });
    const [editingAccountName, setEditingAccountName] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    const loadAccounts = async () => {
        const { data } = await axios.get('/api/account/getaccountswithtransactions')
        setAccounts(data)
    }

    useEffect(() => {
        loadAccounts();
    }, [])


    const handleAddEditOpen = (account = { id: 0, name: '', transactions: [] }) => {
        setaddEditOpen(true);
        setSelectedAccount(account);
        setEditingAccountName(account.name);
    };

    const handleAddEditClose = () => {
        setaddEditOpen(false);
        setSelectedAccount({ id: 0, name: '' });
        setEditingAccountName(null);
    };

    const handleAddEdit = async () => {
        const action = selectedAccount.id > 0 ? 'update' : 'add'
        await axios.post(`/api/account/${action}account`, { id: selectedAccount.id, name: editingAccountName })

        loadAccounts();
        handleAddEditClose();
    };

    const handleDelete = (account) => {
        setSelectedAccount(account);
        account.transactions.length > 0 ? setConfirmOpen(true) : handleDeleteConfirmation(account)

    };

    const handleCloseDeleteDialog = () => {
        setSelectedAccount({ id: 0, name: '' });
        setConfirmOpen(false);
    };

    const handleDeleteConfirmation = async (account = selectedAccount) => {
        console.log(account)
        await axios.post('/api/account/deleteaccount', { id: account.id, name: account.name })
        loadAccounts();
        handleCloseDeleteDialog();
    }


    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleAddEditOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add account
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Account</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{account.name}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleAddEditOpen(account)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(account)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={addEditOpen} onClose={handleAddEditClose} fullWidth maxWidth="md">
                <DialogTitle>{editingAccountName ? 'Edit account' : 'Add account'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Account" type="text" fullWidth value={editingAccountName || ''} onChange={(e) => setEditingAccountName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="primary">
                        {editingAccountName ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleCloseDeleteDialog} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    This account has some income associated with it, are you sure you want to delete it?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteConfirmation()} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ManageAccountsPage;
