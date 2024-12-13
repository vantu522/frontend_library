import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2c3e50] to-[#3498db] text-white py-12 relative">
      {/* Gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3498db] via-[#2ecc71] to-[#3498db]"></div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Categories */}
        <div>
          <h2 className="text-3xl font-bold mb-6 relative pb-2">
            Danh mục
            <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#3498db]"></div>
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] hover:translate-x-2 transition-transform">Trang chủ</li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] hover:translate-x-2 transition-transform">Tin tức</li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] hover:translate-x-2 transition-transform">Danh mục</li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] hover:translate-x-2 transition-transform">Giỏ sách</li>
          </ul>
        </div>

        {/* Section 2: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6 relative pb-2">
            Liên hệ với chúng tôi
            <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#3498db]"></div>
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-4 text-2xl flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-[#2ecc71] w-5" /> 0000-XXXXXX
            </li>
            <li className="mb-4 text-2xl flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#2ecc71] w-5" /> library@wisdombeacon.com
            </li>
            <li className="mb-4 text-2xl flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2ecc71] w-5" /> 122 Hoàng Quốc Việt, Cầu Giấy, HN
            </li>
            <li className="mb-4 text-2xl flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-[#2ecc71] w-5" /> 08:00 - 18:00 (Thứ 2 - Thứ 7)
            </li>
          </ul>
        </div>

        {/* Section 3: Social Links and Policies */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6 relative pb-2">
            Kết nối với chúng tôi
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-[3px] bg-[#3498db]"></div>
          </h2>
          <div className="flex gap-4 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-[#3498db] hover:text-[#2ecc71] transition-colors"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-[#3498db] hover:text-[#2ecc71] transition-colors"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-[#3498db] hover:text-[#2ecc71] transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-[#3498db] hover:text-[#2ecc71] transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <ul className="list-none p-0 m-0">
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] transition-colors">
              Bản đồ vị trí
            </li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] transition-colors">
              Chính sách bảo mật
            </li>
            <li className="mb-4 text-2xl cursor-pointer hover:text-[#2ecc71] transition-colors">
              Điều khoản sử dụng
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center mt-10 pt-5 border-t border-white/10">
        <p className="text-md text-white/70">Copyright © 2024 Wisdom's Beacon. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;