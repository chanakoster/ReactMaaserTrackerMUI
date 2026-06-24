import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddTransaction = ({type}) => {
    const [accounts, setAccounts] = useState([]);

    const [transaction, setTransaction] = useState({
        accountId: '',
        memo: '',
        amount: '',
        date: new Date()
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getAccounts = async () => {
            const { data } = await axios.get('/api/account/getallaccounts')
            setAccounts(data)
        }
        getAccounts();
    }, [])

    const onInputChange = e => {
        const copy = { ...transaction }
        copy[e.target.name] = e.target.value
        setTransaction(copy)
    }

    const onAddTransactionClick = async () => {
        await axios.post(`/api/transaction/add${type}`, { amount: transaction.amount, memo: transaction.memo, date: transaction.date, accountId: transaction.accountId })
        navigate(`/${type}`)
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add {type}
            </Typography>
            <Autocomplete
                options={accounts}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Account" variant="outlined" />}
                onChange={(e, account) =>
                    setTransaction({
                        ...transaction,
                        accountId: account?.id || ''
                    })
                }
            />
            <TextField
                label="Memo"
                name="memo"
                variant="outlined"
                type="text"
                fullWidth
                margin="normal"
                value={transaction.memo}
                onChange={onInputChange}
            />
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                type="number"
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={transaction.amount}
                onChange={onInputChange}
            />
            <TextField
                label="Date"
                name="date"
                type="date"
                value={dayjs(transaction.date).format('YYYY-MM-DD')}
                onChange={onInputChange}
                margin="normal"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <Button onClick={onAddTransactionClick} variant="contained" color="primary">Add {type}</Button>
        </Container>
    );
}

export default AddTransaction;
