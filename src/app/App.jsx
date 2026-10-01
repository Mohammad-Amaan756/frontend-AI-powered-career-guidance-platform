import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, ThemeProvider } from './providers'
import AppRoutes from './routes'

export default function App() { return <BrowserRouter><AuthProvider><ThemeProvider><AppRoutes/></ThemeProvider></AuthProvider></BrowserRouter> }
