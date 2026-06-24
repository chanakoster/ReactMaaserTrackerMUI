import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from '../../node_modules/axios/index';

const OverviewPage = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalMaaser, setTotalMaaser] = useState(0);

    const maaserObligation = totalIncome / 10

    useEffect(() => {
        const loadTotals = async () => {
            const { data } = await axios.get('/api/transaction/gettotals')
            setTotalIncome(data.totalIncome);
            setTotalMaaser(data.totalMaaser);
        }
        loadTotals();
    }, [])

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >
            <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
                <Typography variant="h2" gutterBottom>
                    Overview
                </Typography>
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Total Income: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalIncome)}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Total Maaser: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalMaaser)}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Maaser Obligated: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(maaserObligation)}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Remaining Maaser obligation: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(maaserObligation - totalMaaser)}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default OverviewPage;
