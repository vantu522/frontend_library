import React from "react";
import "./HomePage.css";
import BarChart from "../../components/user/BarChart";
import LineChartComponent from "../../components/user/LineChartComponent"
import PieChartComponent from "../../components/user/PieChartComponent";

function HomePage() {
  return (
    <div className="container">
      <main className="content">
        <p className="quote">
          “Đọc sách rất quan trọng. Đó là cách để chúng ta đặt mình vào hoàn
          cảnh của người khác, từ đó gây dựng lòng đồng cảm sâu sắc. Thế giới
          câu chuyện trong sách cho chúng ta khả năng tĩnh lặng và độc lập, hai
          điều đang biến mất nhanh hơn nước băng tan ở vùng cực.”
        </p>
        <button className="btn">MƯỢN NGAY</button>
      </main>
      <div className="statistical">
        <h2>Thống kê</h2>
        <div className="chart">
          <div className="chart-container">
            <BarChart />
          </div>
          <p className="description">
            Thư viện luôn duy trì sự đa dạng của các thể loại sách để thu hút và
            phục vụ nhu cầu ngày càng phong phú của độc giả. Việc cung cấp nhiều
            thể loại như tiểu thuyết, sách khoa học, tài liệu nghiên cứu, và văn
            học thiếu nhi không chỉ giúp đa dạng hóa nguồn tài nguyên mà còn tạo
            ra không gian khám phá cho mọi lứa tuổi và sở thích. Sự phong phú
            này không chỉ khuyến khích thói quen đọc sách mà còn giúp người đọc
            mở rộng kiến thức và hiểu biết về thế giới xung quanh.
          </p>
        </div>
      </div>
      <div className="Line">
        <div className="linechart-container">
          <LineChartComponent />
        </div>
        <p className="description">
          Thư viện đang trong giai đoạn tăng trưởng mạnh, phản ánh qua sự gia
          tăng rõ rệt cả về số lượng tài liệu và bạn đọc. Các bộ sưu tập sách
          mới, tài liệu nghiên cứu, và các ấn phẩm số hóa được cập nhật thường
          xuyên, mở rộng khả năng tiếp cận thông tin cho mọi đối tượng. Số
          lượng người đọc đăng ký và truy cập thư viện trực tuyến cũng tăng
          đột biến, cho thấy xu hướng sử dụng dịch vụ thư viện ngày càng phổ
          biến. Ngoài ra, thư viện cũng đang đẩy mạnh tổ chức nhiều sự kiện
          văn hóa và học thuật, thu hút sự tham gia đông đảo của cộng đồng,
          qua đó nâng cao vị thế của mình trong việc cung cấp kiến thức và hỗ
          trợ học tập.
        </p>
      </div>
      <div className="Pie">
        <div className="piechart-container">
          <PieChartComponent />
        </div>
        <p className="description">
          Số lượng mượn sách qua từng thể loại tại thư viện cũng có sự khác
          biệt đáng kể, phản ánh nhu cầu và sở thích đa dạng của độc giả. Các
          thể loại như tiểu thuyết và sách lãng mạn thường được mượn nhiều hơn
          nhờ vào tính giải trí và khả năng thu hút người đọc ở mọi lứa tuổi.
          Trong khi đó, sách nghiên cứu và tài liệu học thuật tuy không được
          mượn nhiều bằng nhưng lại có giá trị cao đối với sinh viên và giới
          nghiên cứu. Sách thiếu nhi và sách hướng dẫn kỹ năng sống cũng ghi
          nhận mức mượn ổn định, đặc biệt là từ phụ huynh và người làm giáo
          dục. Sự khác biệt này giúp thư viện hiểu rõ hơn về xu hướng đọc của
          độc giả, từ đó điều chỉnh việc cung cấp tài liệu và phát triển dịch
          vụ cho phù hợp.
        </p>
      </div>
      <div className="contact-form">
        <h1 className="contact-title">LIÊN HỆ CHÚNG TÔI</h1>
        <div className="form-map-container">
          <div className="form-container">
            <input type="text" placeholder="Họ tên" className="input-field" />
            <input type="text" placeholder="Số điện thoại" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <textarea placeholder="Gửi cho chúng tôi:" className="textarea-field"></textarea>
            <button className="submit-button">Gửi đi</button>
          </div>
          <div className="map-container">
            <p>Bản đồ</p>
          </div>
        </div>
      </div>
    </div>
);
}

export default HomePage;
