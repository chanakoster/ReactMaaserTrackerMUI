import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';

const AddMaaserPage =() => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
            />
            <Button variant="contained" color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
