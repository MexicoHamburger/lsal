import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import MainPage from '@pages/MainPage.tsx'
import LoginPage from '@pages/LoginPage.tsx'
import RegisterPage from '@pages/RegisterPage.tsx'
import RegisterSuccessPage from '@pages/RegisterSuccessPage.tsx'
import PersonalPage from '@pages/PersonalPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/success" element = {<RegisterSuccessPage />} />
      <Route path="/personal/:userid" element = {<PersonalPage />} />
    </Routes>
  </BrowserRouter>
)
