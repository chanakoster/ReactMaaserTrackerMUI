import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AddTransaction from '../components/add-transaction';

const AddIncomePage = () => {

    return (
        <AddTransaction type="Income" />
    )
}

export default AddIncomePage;
