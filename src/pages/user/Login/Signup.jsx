// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios

// function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       // Gọi API đăng ký
//       const response = await axios.post('https://library-mana.azurewebsites.net/members/register', {
//         name,
//         email,
//         password
//       });

//       // Kiểm tra nếu đăng ký thành công
//       if (response.status === 200) {
//         alert('Đăng ký thành công!');
//         navigate('/loginemail');  // Điều hướng về trang đăng nhập
//       } else {
//         alert('Đã xảy ra lỗi, vui lòng thử lại.');
//       }
//     } catch (error) {
//       console.error('Đã có lỗi khi đăng ký:', error);
//       alert('Đã xảy ra lỗi, vui lòng thử lại.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <div className="flex">
//         {/* Welcome Section */}
//         <div className="bg-[#OA7075] rounded-l-lg shadow-lg p-10 w-[400px] h-auto flex flex-col items-center text-center">
//           <h2 className="font-bold text-2xl text-black mb-4">CHÀO MỪNG TRỞ LẠI</h2>
//           <p className="text-xl text-black my-6">
//             Hãy đăng nhập bằng thông tin cá nhân của bạn để không bỏ lỡ bất kỳ điều gì từ chúng tôi!
//           </p>
//           <Link
//             to="/loginemail"
//             className="bg-white hover:bg-gray-200 text-[#OA7075] font-bold py-3 px-6 rounded-full mt-6 text-lg transition-colors"
//           >
//             ĐĂNG NHẬP
//           </Link>
//         </div>

//         {/* Signup Form */}
//         <div className="bg-blue-100 rounded-r-lg shadow-lg p-10 w-[400px] h-auto flex flex-col items-center">
//           <h2 className="font-bold text-2xl mb-4">ĐĂNG KÝ</h2>
//           <form onSubmit={handleSignup} className="w-full flex flex-col items-center">
//             <input
//               type="text"
//               placeholder="Họ và tên"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full p-3 my-3 border border-gray-300 rounded-lg text-lg"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 my-3 border border-gray-300 rounded-lg text-lg"
//             />
//             <input
//               type="password"
//               placeholder="Mật khẩu"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 my-3 border border-gray-300 rounded-lg text-lg"
//             />
//             <button
//               type="submit"
//               className="bg-[#OA7075] hover:bg-[#9F5F64] text-black font-bold py-3 px-6 rounded-full mt-6 text-lg transition-colors"
//             >
//               ĐĂNG KÝ
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
