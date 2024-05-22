
import { Routes, Route } from 'react-router-dom'
import LoginScreen from '../pages/authentication/login/login'

const Unprotected = () => {
  return (
    <Routes>
      <Route path="/" element={ <LoginScreen />} />
    </Routes>
  )
}

export default Unprotected
