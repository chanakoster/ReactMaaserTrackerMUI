import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddIncomePage = () => {
    const [accounts, setAccounts] = useState([]);

    const [income, setIncome] = useState({
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
        const copy = { ...income }
        copy[e.target.name] = e.target.value
        setIncome(copy)
        console.log(copy)
    }

    const onAddIncomeClick = async () => {
        await axios.post('/api/transaction/addincome', { amount: income.amount, memo: income.memo, date: income.date, accountId: income.accountId })
        navigate('/income')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={accounts}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Account" variant="outlined" />}
                onChange={(e, account) =>
                    setIncome({
                        ...income,
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
                value={income.memo}
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
                value={income.amount}
                onChange={onInputChange}
            />
            <TextField
                label="Date"
                name="date"
                type="date"
                value={dayjs(income.date).format('YYYY-MM-DD')}
                onChange={onInputChange}
                margin="normal"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <Button onClick={onAddIncomeClick} variant="contained" color="primary">Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
