/* eslint-disable react/react-in-jsx-scope */

import Typography from '@mui/material/Typography';
import entriesService from '../services/entriesService'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
    useNavigate
} from 'react-router-dom'

const EntriesListing = () => {
const navigate = useNavigate()

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [entryId, setEntryId] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setEntryId(id)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setEntryId(null)
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const deleteEntry = () => {

        const idToDelete = entryId
        if (idToDelete) {
            if (window.confirm(`Are you sure you want to delete this record`)) {
                entriesService.deleteEntry(idToDelete).then(res => {
                    getEntries(query)
                    alert(`A record was deleted`)
                }).catch(err => {
                    if (err.response.data.error) {
                        console.log(err.response.data)
                        alert(`${err.response.data.error}`)
                    } else {
                        alert(`Could not delete entry`)
                    }
                })
            }
        }
    }

    const checkOut = () => {
        const idToCheckout = entryId
        const rec = results.filter(p => p.id === idToCheckout).at(0)
        if(idToCheckout && !rec.timeOut){
            const newTimeOut = new Date().getTime()
            entriesService.updateEntry(idToCheckout, {timeOut: newTimeOut}).then(res => {
                getEntries(query)
                alert(`A record was updated`)
            }).catch(err => {
                if (err.response.data.error) {
                    console.log(err.response.data)
                    alert(`${err.response.data.error}`)
                } else {
                    alert(`Could not update entry`)
                }
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            getEntries(query)

        };

        const debounceTimeout = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const getEntries = (query) => {
        entriesService.getAll(query).then(res => {
            console.log(`data is`, res)
            setResults(res)
        }).catch(err => {
            if (err.response.data.error) {
                console.log(err.response.data)
                alert(`${err.response.data.error}`)
            } else {
                alert(`Could not get entries`)
            }
        })
    }

    const getDateTime = (dateTime) => {
        if (!dateTime)
            return ''
        return new Date(dateTime).toLocaleString()
    }





    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 4, pr: 4, position: 'relative', height: '100%' }}>
            <div style={{ width: '100%', height: '100vh' }}>
                <Typography variant="h4" component="h4" align="left" sx={{ pt: 2, pb: 4 }}>
                    Search and view entries
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    value={query}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ display: 'flex' }}
                    InputProps={{
                        sx: {
                            padding: '2px',         // reduce inner vertical padding
                            height: '46px',         // control height if needed
                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            padding: '0 4px',       // adjust label padding if needed
                        },
                    }}
                />

                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">First name</TableCell>
                                <TableCell align="left">Last name</TableCell>
                                <TableCell align="left">Time in</TableCell>
                                <TableCell align="left">Time out</TableCell>
                                <TableCell align="left">More</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((row) => (

                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">{row.person?.firstName || ''}</TableCell>
                                    <TableCell align="left">{row.person?.lastName || ''}</TableCell>
                                    <TableCell align="left">{getDateTime(row.timeIn)}</TableCell>
                                    <TableCell align="left">{getDateTime(row.timeOut)}</TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            onClick={ev => handleClick(ev, row.id)}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <MoreVertOutlinedIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="action-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&::before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={e =>  {
                                                handleClose()
                                                checkOut()
                                            }
                                            }>
                                                <ListItemIcon>
                                                    <LogoutOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                Check out
                                            </MenuItem>

                                            <Divider />
                                            <MenuItem onClick={e => {
                                                deleteEntry()
                                                handleClose()
                                            }
                                            }>
                                                <ListItemIcon>
                                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                Delete
                                            </MenuItem>

                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 10,
                }}
                onClick={ e => {
                        navigate('/edit')
                    }
                }
            >
                <AddIcon />
            </Fab>
        </Box>
    );
}


export default EntriesListing