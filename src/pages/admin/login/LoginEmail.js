import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiUser as UserIcon, HiLockClosed as LockIcon, HiEye as EyeIcon, HiEyeOff as EyeOffIcon } from 'react-icons/hi'
import { toast } from 'react-toastify'

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/librarians/login', {
        username,
        password,
      })

      localStorage.setItem('admin', JSON.stringify({
        name: response.data.name || 'Quản trị viên',
        username: response.data.username,
        librarianId: response.data.librarianId,
        phoneNumber: response.data.phoneNumber,
        avatar: response.data.avatar || 'https://via.placeholder.com/150',
        token: response.data.token,
      }))

      toast.success("Đăng nhập thành công!")
      window.location.href = "/admin"
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
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tên đăng nhập"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
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
                <Link to="/admin/forgotpassword" className="text-sm text-purple-600 hover:underline">
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
