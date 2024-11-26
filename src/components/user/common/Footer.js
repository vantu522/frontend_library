import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './common.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
            <h2>Danh mục</h2>
            <ul>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Thể Loại</li>
            <li>Trả sách</li>
            </ul>
        </div>
        <div className="footer-contact">
            <h2>Liên hệ với chúng tôi</h2>
            <ul>
            <li><FontAwesomeIcon icon={faPhone} /> 0000xxxxx</li>
            <li><FontAwesomeIcon icon={faEnvelope} /> LibraryWisdom'sBeacon@gmail.com</li>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 122 Hoàng Quốc Việt, Cầu Giấy, HN</li>
            </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright © 2024 Wisdom's Beacon. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
