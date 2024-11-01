import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
            <h3>Danh mục</h3>
            <ul>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Thể Loại</li>
            <li>Trả sách</li>
            </ul>
        </div>
        <div className="footer-contact">
            <h3>Liên hệ với chúng tôi</h3>
            <ul>
            <li><FontAwesomeIcon icon={faPhone} /> 0000xxxxx</li>
            <li><FontAwesomeIcon icon={faEnvelope} /> library@gmail.com</li>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 122 HQV, Cầu Giấy</li>
            </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright © 2024 TÊN. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
