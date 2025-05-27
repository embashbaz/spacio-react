import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import entriesService from '../services/entriesService'
import { useNavigate } from 'react-router-dom';

const EntriesEdit = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [timeIn, setTimeIn] = useState('');
    const [timeOut, setTimeOut] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const epochTimeIn = timeIn ? new Date(timeIn).getTime() : null;
        const epochTimeOut = timeOut ? new Date(timeOut).getTime() : null;

        const entryData = {
            personFirstName: firstName,
            personLastName: lastName,
            personEmail: email,
            timeIn: epochTimeIn,
            timeOut: epochTimeOut,
        };

        entriesService.addEntry(entryData).then(res => {
            alert(`A record was created`)
            navigate(-1)
        }).catch(err => {
            if (err.response.data.error) {
                console.log('error', err)
                alert(`${err.response.data.error}`)
            } else {
                alert(`Could not create entry`)
            }
        })


    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', pl: 4, pr: 4, position: 'relative', height: '100%' }}>
            <Typography variant="h4" component="h1" mb={3}>
                Add Entry
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
            />
            {/* Two columns container */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mt: 2,
                }}
            >
                <TextField
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    sx={{ flex: '1 1 45%' }} // about half width, flexible
                />

                <TextField
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    sx={{ flex: '1 1 45%' }}
                />

                <TextField
                    label="Time In"
                    type="datetime-local"
                    value={timeIn}
                    onChange={(e) => setTimeIn(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ flex: '1 1 45%' }}
                />

                <TextField
                    label="Time Out"
                    type="datetime-local"
                    value={timeOut}
                    onChange={(e) => setTimeOut(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: '1 1 45%' }}
                />
            </Box>



            <Box mt={5} px={8}>  {/* px adds padding left & right */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Save Entry
                </Button>
            </Box>
        </Box>
    );
};

export default EntriesEdit;
