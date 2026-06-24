import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const maaserPayments = [
    { id: 1, account: 'Charity A', memo: 'tomchei', amount: 500, date: '2023-06-10' },
    { id: 2, account: 'Charity B', memo: 'shela-he', amount: 30, date: '2023-06-09' }
];

const MaaserPage = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Maaser Payments History
            </Typography>
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
                        {maaserPayments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                    {payment.account}
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                    {payment.memo}
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>${payment.amount}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>{payment.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MaaserPage;
