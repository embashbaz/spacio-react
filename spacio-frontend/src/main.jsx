/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom/client'

import App from './App'
import Login from './login/Login'
import SpacioApp from './dash/SpacioApp'
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
<ThemeProvider theme={theme}>
<CssBaseline enableColorScheme />
<App />
</ThemeProvider>
)
