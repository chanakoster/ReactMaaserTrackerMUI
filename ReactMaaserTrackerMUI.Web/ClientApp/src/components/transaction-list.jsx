import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from '../../node_modules/axios/index';
import dayjs from 'dayjs';

const TransactionList = ({ type }) => {
    const [transactions, setTransactions] = useState([]);
    const [groupedTransactions, setGroupTransactions] = useState([]);

    const [groupByAccount, setGroupByAccount] = useState(false);

    const loadTransactions = async () => {
        const { data } = await axios.get(`/api/transaction/getall${type}`)
        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, [])

    const loadGroupedTransactions = async () => {
        const { data } = await axios.get(`/api/account/GetAccountsWithTransactionsByType?type=${type}`);
        setGroupTransactions(data);
    }

    const onCheckBoxChange = () => {
        groupByAccount ? loadTransactions() : loadGroupedTransactions()
        setGroupByAccount(!groupByAccount);
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                {type} History
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={groupByAccount}
                        onChange={onCheckBoxChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Group by account"
            />

            {!groupByAccount ? (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '18px' }}>Account</TableCell>
                                <TableCell sx={{ fontSize: '18px' }}>Memo</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {transaction.account.name}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '18px' }}>{transaction.memo}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>${transaction.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(transaction.date).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                groupedTransactions.map(account => (
                    <div key={account.id} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {account.name}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '18px' }}>Account</TableCell>
                                        <TableCell sx={{ fontSize: '18px' }}>Memo</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {account.transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {account.name}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{transaction.memo}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${transaction.amount}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(transaction.date).format('YYYY-MM-DD')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </Container>
    );
}

export default TransactionList;
