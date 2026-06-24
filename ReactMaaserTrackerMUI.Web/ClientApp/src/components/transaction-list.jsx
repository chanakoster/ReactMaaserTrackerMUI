import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from '../../node_modules/axios/index';
import dayjs from 'dayjs';

const groupedIncomes = [
    {
        account: "Job",
        incomes:
            [
                { id: 1, account: "Job", memo: 'Salary', amount: 5000, date: "2023-06-13" },
                { id: 3, account: "Job", memo: 'Salary', amount: 2500, date: "2023-06-11" }
            ]
    },
    {
        account: "Gift",
        incomes:
            [
                { id: 2, account: "Gift", amount: 300, date: "2023-06-11" }
            ]
    },
    {
        account: "Investments",
        incomes:
            [
                { id: 4, account: "Investments", memo: 'Investments', amount: 1000, date: "2023-06-10" }
            ]
    }
]


const TransactionList = ({ type }) => {
    const [transactions, setTransactions] = useState([]);

    const [groupByAccount, setGroupByAccount] = useState(false);

    useEffect(() => {
        const loadTransactions = async () => {
            const { data } = await axios.get(`/api/transaction/getall${type}`)
            setTransactions(data);
            console.log(data)
        }
        loadTransactions();
    }, [])


    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                {type} History
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={groupByAccount}
                        onChange={(event) => setGroupByAccount(event.target.checked)}
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
                groupedIncomes.map(({ account, incomes }) => (
                    <div key={account} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {account}
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
                                    {incomes.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {transaction.account}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{transaction.memo}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${transaction.amount}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{transaction.date}</TableCell>
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
