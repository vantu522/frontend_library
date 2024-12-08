import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2c3e50] to-[#3498db] text-white py-8 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3498db] via-[#2ecc71] to-[#3498db]"></div>
      <div className="max-w-screen-xl mx-auto flex justify-between px-10 gap-10">
        <div className="flex-1">
          <h2 className="text-white text-3xl mb-6 relative pb-2">
            Danh mục
            <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#3498db]"></div>
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#3498db] hover:transform hover:translate-x-2">Trang chủ</li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#3498db] hover:transform hover:translate-x-2">Tin tức</li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#3498db] hover:transform hover:translate-x-2">Danh mục</li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#3498db] hover:transform hover:translate-x-2">Giỏ sách</li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-white text-3xl mb-6 relative pb-2">
            Liên hệ với chúng tôi
            <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#3498db]"></div>
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-4 text-2xl cursor-pointer flex items-center gap-2 hover:text-[#3498db]">
              <FontAwesomeIcon icon={faPhone} className="text-[#3498db] w-5" /> 0000xxxxx
            </li>
            <li className="mb-4 text-2xl cursor-pointer flex items-center gap-2 hover:text-[#3498db]">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#3498db] w-5" /> LibraryWisdom'sBeacon@gmail.com
            </li>
            <li className="mb-4 text-2xl cursor-pointer flex items-center gap-2 hover:text-[#3498db]">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#3498db] w-5" /> 122 Hoàng Quốc Việt, Cầu Giấy, HN
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10 pt-5 border-t border-white/10">
        <p className="text-md text-white/70">Copyright © 2024 Wisdom's Beacon. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
