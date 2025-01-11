
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import AdminLogin from './components/AdminLogin'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import DashBoard from './pages/DashBoard'
import Addjobs from './pages/Addjobs'
import ManageJob from './pages/ManageJob'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
function App() {
  const {showRecruiterLogin}=useContext(AppContext)

  return (
   <>
  {showRecruiterLogin && <AdminLogin/>} 
  <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/apply-job/:id' element={<ApplyJob/>}/>
<Route path='/application' element={<Application/>} />
<Route path='/dashboard' element={<DashBoard/>}> 
<Route path='add-job' element={<Addjobs/>}/>
<Route path='manage-jobs' element={<ManageJob/>}/>
<Route path='view-applications' element={<ViewApplications/>} />
</Route>

  </Routes>
   
   </>
  )
}

export default App
