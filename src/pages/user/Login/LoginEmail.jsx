import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { motion } from 'framer-motion'
import { HiMail as MailIcon, HiUser as UserIcon, HiLockClosed as LockIcon, HiEye as EyeIcon, HiEyeOff as EyeOffIcon } from 'react-icons/hi';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate() // Hook điều hướng

  const toggleMode = () => setIsLogin(!isLogin)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      if (isLogin) {
        // Gọi API đăng nhập
        const response = await axios.post('https://library-mana.azurewebsites.net/login', {
          email,
          password
        })
        console.log('Đăng nhập thành công:', response.data)

        // Điều hướng về trang chủ (HomePage)
        navigate('/')
      } else {
        // Gọi API đăng ký
        const response = await axios.post('https://library-mana.azurewebsites.net/members/register', {
          name,
          email,
          password
        })
        console.log('Đăng ký thành công:', response.data)

        // Hiển thị thông báo và quay lại trang đăng nhập
        alert('Đăng ký thành công! Hãy đăng nhập để tiếp tục.')
        setIsLogin(true) // Chuyển về chế độ đăng nhập
      }
    } catch (error) {
      console.error('Lỗi:', error.response?.data || error.message)
      setErrorMessage('Đăng nhập hoặc đăng ký thất bại, vui lòng kiểm tra lại thông tin.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản'}
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {isLogin ? 'Vui lòng đăng nhập để tiếp tục' : 'Điền thông tin của bạn để bắt đầu'}
          </p>
        </div>
        <div className="p-6">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên đầy đủ</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" 
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@example.com" 
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                />
              </div>
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
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
              {isLogin && (
                <div className="text-right">
                <Link to="/forgotpassword" className="text-sm text-purple-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              )}
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </motion.form>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-center">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <button onClick={toggleMode} className="ml-1 text-purple-600 hover:underline">
              {isLogin ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
