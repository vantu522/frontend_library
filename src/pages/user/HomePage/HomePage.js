import React from "react";
import BarChart from '../../../components/user/BarChart';
import LineChartComponent from "../../../components/user/LineChartComponent";
import PieChartComponent from "../../../components/user/PieChartComponent";
import MapComponent from "../../../components/user/MapComponent";
import homeBackground from '../../../assets/images/home.jpg';

function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden text-gray-700">
      <main
        className="flex flex-col justify-center items-center text-center w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${homeBackground})` }}
      >
        <p className="text-lg md:text-2xl text-black max-w-lg text-left leading-relaxed">
          “Đọc sách rất quan trọng. Đó là cách để chúng ta đặt mình vào hoàn cảnh
          của người khác, từ đó gây dựng lòng đồng cảm sâu sắc. Thế giới câu chuyện
          trong sách cho chúng ta khả năng tĩnh lặng và độc lập, hai điều đang biến
          mất nhanh hơn nước băng tan ở vùng cực.”
        </p>
        <button className="mt-5 px-6 py-2 bg-yellow-400 text-black font-bold rounded-md shadow-md hover:bg-yellow-500">
          MƯỢN NGAY
        </button>
      </main>

      <section className="w-11/12 mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center border-b-2 border-gray-300 pb-2">
          Thống kê
        </h2>
        <div className="flex flex-wrap justify-between gap-8 mt-8">
          <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <BarChart />
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-lg">
            <p className="text-base leading-relaxed">
              Thư viện luôn duy trì sự đa dạng của các thể loại sách để thu hút và
              phục vụ nhu cầu ngày càng phong phú của độc giả. Việc cung cấp nhiều
              thể loại như tiểu thuyết, sách khoa học, tài liệu nghiên cứu, và văn
              học thiếu nhi không chỉ giúp đa dạng hóa nguồn tài nguyên mà còn tạo
              ra không gian khám phá cho mọi lứa tuổi và sở thích.
            </p>
          </div>
        </div>
      </section>

      <section className="w-11/12 mx-auto mt-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <LineChartComponent />
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-lg">
            <p className="text-base leading-relaxed">
              Thư viện đang trong giai đoạn tăng trưởng mạnh, phản ánh qua sự gia
              tăng rõ rệt cả về số lượng tài liệu và bạn đọc. Số lượng người đọc
              đăng ký và truy cập thư viện trực tuyến cũng tăng đột biến, cho thấy
              xu hướng sử dụng dịch vụ thư viện ngày càng phổ biến.
            </p>
          </div>
        </div>
      </section>

      <section className="w-11/12 mx-auto mt-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <PieChartComponent />
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-lg">
            <p className="text-base leading-relaxed">
              Số lượng sách mượn tại thư viện phản ánh nhu cầu đa dạng của độc giả.
              Các thể loại như tiểu thuyết và sách lãng mạn thường được ưa chuộng
              hơn do tính giải trí cao, trong khi sách nghiên cứu và tài liệu học
              thuật lại quan trọng đối với sinh viên và nhà nghiên cứu.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-10 mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 bg-yellow-400 text-black p-2 rounded-lg w-fit mx-auto">
          LIÊN HỆ VỚI CHÚNG TÔI
        </h1>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          <div className="flex flex-col w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Họ tên:"
              className="p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Số điện thoại:"
              className="p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email:"
              className="p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Gửi cho chúng tôi:"
              className="p-2 mb-4 border border-gray-300 rounded-lg"
              rows="5"
            ></textarea>
            <button className="w-fit px-6 py-2 bg-yellow-400 text-black font-bold rounded-md shadow-md hover:bg-yellow-500 mx-auto">
              Gửi đi
            </button>
          </div>
          <div className="w-full md:w-1/2 h-[400px] bg-gray-300 rounded-lg">
            <MapComponent />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
