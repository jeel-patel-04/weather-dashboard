import './App.css'
import { BrowserRouter ,Route ,Routes} from 'react-router-dom'
import { Button } from './components/ui/button'
import  Layout  from './components/ui/layout'
import { ThemeProvider } from './components/ui/theme-provider'
import WeatherDashboard from './pages/weather-dashboard'
import CityPage from './pages/city-page'

function App() {

  return (
    <>
      <BrowserRouter>
      <ThemeProvider defaultTheme='dark'> 
      <Layout>
        <Routes>
          <Route path='/' element={<WeatherDashboard/>} />
          <Route path='/city/:cityName' element={<CityPage/>} />
        </Routes>
      </Layout>
      </ThemeProvider>
      </BrowserRouter>
      
    </>
  )
}

export default App
