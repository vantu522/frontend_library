import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 20; // Điều chỉnh tốc độ cuộn bằng cách thay đổi số này
    const interval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(interval);
      }
    }, 30); // Điều chỉnh thời gian giữa mỗi bước cuộn
  };

  return (
    <footer className="bg-gray-900 text-white py-8 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-4 relative pb-2">
            Danh mục
            <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-blue-500"></div>
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-2 text-base cursor-pointer hover:text-green-400 hover:translate-x-2 transition-transform">
              <Link to="/" onClick={scrollToTop}>Trang chủ</Link>
            </li>
            <li className="mb-2 text-base cursor-pointer hover:text-green-400 hover:translate-x-2 transition-transform">
              <Link to="/news" onClick={scrollToTop}>Tin tức</Link>
            </li>
            <li className="mb-2 text-base cursor-pointer hover:text-green-400 hover:translate-x-2 transition-transform">
              <Link to="/category" onClick={scrollToTop}>Danh mục</Link>
            </li>
            <li className="mb-2 text-base cursor-pointer hover:text-green-400 hover:translate-x-2 transition-transform">
              <Link to="/shopcart" onClick={scrollToTop}>Giỏ sách</Link>
            </li>
          </ul>
        </div>

        {/* Section 2: Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 relative pb-2">
            Liên hệ với chúng tôi
            <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-blue-500"></div>
          </h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-2 text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-white-400 w-4" />{" "}
              0000-XXXXXX
            </li>
            <li className="mb-2 text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-white-400 w-4" />{" "}
              library@wisdombeacon.com
            </li>
            <li className="mb-2 text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white-400 w-4" />{" "}
              122 Hoàng Quốc Việt, Cầu Giấy, HN
            </li>
            <li className="mb-2 text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-white-400 w-4" />{" "}
              08:00 - 18:00 (Thứ 2 - Thứ 7)
            </li>
          </ul>
        </div>

        {/* Section 3: Social Links and Policies */}
        <div className="flex flex-col items-left text-left">
          <h2 className="text-2xl font-bold mb-4 relative pb-2">
            Kết nối với chúng tôi
            <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-blue-500"></div>
          </h2>
          <div className="flex gap-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-500 hover:text-green-400 transition-colors"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-500 hover:text-green-400 transition-colors"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-pink-500 hover:text-green-400 transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-500 hover:text-green-400 transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <ul className="list-none p-0 m-0">
            <li className="mb-2 text-sm cursor-pointer hover:text-green-400 transition-colors">
              <a
                href="https://maps.google.com/?q=122+Hoang+Quoc+Viet,+Cau+Giay,+HN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit no-underline"
              >
                Bản đồ vị trí
              </a>
            </li>
            <li className="mb-2 text-sm cursor-pointer hover:text-green-400 transition-colors">
              Chính sách bảo mật
            </li>
            <li className="mb-2 text-sm cursor-pointer hover:text-green-400 transition-colors">
              Điều khoản sử dụng
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center mt-8 pt-4 border-t border-white/10">
        <p className="text-xs text-white/70">
          Copyright © 2024 Wisdom's Beacon. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;

