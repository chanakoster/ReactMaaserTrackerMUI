import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const OverviewPage = () => {
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
            Total Income: $5000
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser: $500
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: $500
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser obligation: $0
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
