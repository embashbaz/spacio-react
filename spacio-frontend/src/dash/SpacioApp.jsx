/* eslint-disable react/react-in-jsx-scope */
import Typography from '@mui/material/Typography';


import {
    BrowserRouter as Router,
    Routes, Route, Navigate
} from 'react-router-dom'

import SideBar from "../components/sideBar"
import appReactRoutes from "../routes"

const SpacioApp = () => {


    return (
        <div className="wrapper" style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%', // full viewport width
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        }}>
            <SideBar />

            <div className="content" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                <Routes>
                    {appReactRoutes}
                </Routes>

            </div>

        </div>
    )



}


export default SpacioApp