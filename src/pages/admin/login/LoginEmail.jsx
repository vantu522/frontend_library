import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiMail as MailIcon, HiLockClosed as LockIcon, HiEye as EyeIcon, HiEyeOff as EyeOffIcon } from 'react-icons/hi'
import { toast } from 'react-toastify'

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email) => {
    // Kiểm tra email rỗng
    if (!email) {
      setEmailError('Email không được để trống')
      return false
    }

    // Kiểm tra định dạng email với domain cụ thể
    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|stu\.ptit\.edu\.vn)$/
    if (!emailRegex.test(email)) {
      setEmailError('Email phải có định dạng @gmail.com hoặc @stu.ptit.edu.vn')
      return false
    }

    setEmailError('')
    return true
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate before submission
    const isEmailValid = validateEmail(email)
    if (!isEmailValid) {
      return
    }

    try {
      const response = await axios.post('https://library-mana.azurewebsites.ne/librarians/login', {
        email,
        password
      })

      localStorage.setItem('admin', JSON.stringify({
        name: response.data.name || 'Người dùng',
        email: response.data.email,
        memberId: response.data.memberId,
        phoneNumber: response.data.phoneNumber,
        avatar: response.data.avatar || 'https://via.placeholder.com/150',
        token: response.data.token
      }))

      toast.success("Đăng nhập thành công!")
      window.location.href = "/"
    } catch (error) {
      console.error('Lỗi:', error.response?.data || error.message)
      setErrorMessage('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.')
    }
  }

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Chào mừng trở lại!</h2>
          <p className="text-center text-gray-600 mt-2">Vui lòng đăng nhập để tiếp tục</p>
        </div>
        <div className="p-6">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value)
                    validateEmail(e.target.value)
                  }}
                  placeholder="example@stu.ptit.edu.vn" 
                  className={`pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  required
                  minLength={6}
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
              <div className="text-right">
                <Link to="/forgotpassword" className="text-sm text-purple-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Đăng nhập
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
