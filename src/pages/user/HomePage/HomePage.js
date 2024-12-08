import React from "react";
import BarChart from '../../../components/user/BarChart';
import LineChartComponent from "../../../components/user/LineChartComponent";
import PieChartComponent from "../../../components/user/PieChartComponent";
import MapComponent from "../../../components/user/MapComponent";
import homeBackground from '../../../assets/images/home.jpg';
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BarChart from "../../../components/user/BarChart";
import LineChartComponent from "../../../components/user/LineChartComponent";
import PieChartComponent from "../../../components/user/PieChartComponent";
import MapComponent from "../../../components/user/MapComponent";

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 2000, 
      once: true, 
    });
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <div className="text-sky-500 flex flex-col overflow-hidden">
      <main
        className="bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-end px-40 py-5 text-center"
        style={{ backgroundImage: `url('/assets/images/home.jpg')` }}
        data-aos="fade-up"
      >
        <p className="text-black text-2xl leading-relaxed max-w-lg italic">
          “Đọc sách rất quan trọng. Đó là cách để chúng ta đặt mình vào hoàn
          cảnh của người khác, từ đó gây dựng lòng đồng cảm sâu sắc. Thế giới
          câu chuyện trong sách cho chúng ta khả năng tĩnh lặng và độc lập, hai
          điều đang biến mất nhanh hơn nước băng tan ở vùng cực.”
        </p>
        <button
          className="bg-blue-500 text-white px-30 py-4 border border-gray-600 rounded font-bold mt-5 w-32 transition-all duration-300 hover:bg-blue-700 hover:scale-105"
          data-aos="zoom-in"
        >
>>>>>>> 55ab9b3a8a357721787954d08289959223f0a408
          MƯỢN NGAY
        </button>
      </main>

<<<<<<< HEAD
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
=======
      {/* Thống kê Section */}
      <div className="w-[90%] mx-auto" data-aos="fade-right">
        <h2 className="text-5xl font-bold text-center mb-10 mt-5 border-b-4 border-gray-300 pb-4">
          Thống kê
        </h2>
        <div className="flex gap-5 mt-16">
          <div
            className="flex-[50%] bg-white rounded shadow-md h-[90vh] p-5"
            data-aos="fade-up"
          >
            <BarChart />
          </div>
          <div
            className="flex-[50%] bg-gray-100 rounded p-5 flex items-center justify-center"
            data-aos="fade-left"
          >
            <p className="text-lg italic">
              Thư viện duy trì sự đa dạng các thể loại sách như tiểu thuyết, khoa học, nghiên cứu
              và văn học thiếu nhi, đáp ứng nhu cầu phong phú của độc giả. Điều này không chỉ
              khuyến khích thói quen đọc mà còn mở rộng kiến thức và tạo không gian khám phá cho mọi lứa tuổi.
            </p>
          </div>
        </div>
      </div>

      {/* Thống kê 2 Section */}
      <div className="w-[90%] mx-auto mt-10" data-aos="fade-up">
        <div className="flex gap-5 mt-16">
          <div
            className="flex-[50%] bg-white rounded shadow-md h-[90vh] p-5"
            data-aos="fade-up"
          >
            <LineChartComponent />
          </div>
          <div
            className="flex-[50%] bg-gray-100 rounded p-5 flex items-center justify-center"
            data-aos="fade-left"
          >
            <p className="text-lg italic">
              Thư viện đang phát triển mạnh với sự gia tăng số lượng tài liệu, bạn đọc và các
              ấn phẩm số hóa được cập nhật thường xuyên. Lượng người đăng ký và truy cập trực
              tuyến tăng đột biến, cùng với các sự kiện văn hóa, học thuật thu hút cộng đồng,
              khẳng định vai trò hỗ trợ học tập và cung cấp kiến thức.
            </p>
          </div>
        </div>
      </div>

      {/* Thống kê 3 Section */}
      <div className="w-[90%] mx-auto mt-10" data-aos="fade-up">
        <div className="flex gap-5 mt-16">
          <div
            className="flex-[50%] bg-white rounded shadow-md h-[90vh] p-5"
            data-aos="fade-up"
          >
            <PieChartComponent />
          </div>
          <div
            className="flex-[50%] bg-gray-100 rounded p-5 flex items-center justify-center"
            data-aos="fade-left"
          >
            <p className="text-lg italic">
              Số lượng mượn sách tại thư viện khác nhau theo thể loại, phản ánh sở thích đa dạng
              của độc giả. Tiểu thuyết và sách lãng mạn được mượn nhiều nhờ tính giải trí, trong
              khi sách nghiên cứu và học thuật có giá trị cao với sinh viên, giới nghiên cứu.
              Sách thiếu nhi và kỹ năng sống thu hút phụ huynh, người làm giáo dục. Sự khác biệt
              này giúp thư viện điều chỉnh tài liệu và dịch vụ phù hợp.
            </p>
          </div>
        </div>
      </div>

      {/* Liên hệ Section */}
      <div className="flex flex-col items-center px-8 py-10 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold bg-amber-500 text-black px-6 py-3 rounded-md text-center mb-10 shadow-lg">
          LIÊN HỆ VỚI CHÚNG TÔI
        </h1>

        <div className="flex flex-wrap justify-between w-full max-w-6xl gap-8">
          <div className="flex flex-col w-full lg:w-[45%] bg-white p-6 rounded-md shadow-lg" data-aos="fade-up">
            <input
              type="text"
              placeholder="Họ tên:"
              className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
>>>>>>> 55ab9b3a8a357721787954d08289959223f0a408
            />
            <input
              type="text"
              placeholder="Số điện thoại:"
<<<<<<< HEAD
              className="p-2 mb-4 border border-gray-300 rounded-lg"
=======
              className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
>>>>>>> 55ab9b3a8a357721787954d08289959223f0a408
            />
            <input
              type="email"
              placeholder="Email:"
<<<<<<< HEAD
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
=======
              className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <textarea
              placeholder="Gửi cho chúng tôi:"
              className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-gray-100 h-36 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            ></textarea>
            <button className="w-full px-5 py-3 text-lg font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-shadow shadow-md">
              Gửi đi
            </button>
          </div>

          <div className="w-full lg:w-[50%] bg-gray-100 rounded-md shadow-lg overflow-hidden">
            <div className="h-[400px] flex items-center justify-center" data-aos="fade-up">
              <MapComponent />
            </div>
>>>>>>> 55ab9b3a8a357721787954d08289959223f0a408
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
