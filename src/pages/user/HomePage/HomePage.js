import React from "react";
import BarChart from '../../../components/user/BarChart';
import LineChartComponent from "../../../components/user/LineChartComponent";
import PieChartComponent from "../../../components/user/PieChartComponent";
import MapComponent from "../../../components/user/MapComponent";

function HomePage() {
  return (
    <div className="text-sky-500 flex flex-col overflow-hidden">
      <main className="bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center text-center" style={{ backgroundImage: `url('/assets/images/home.jpg')` }}>
        <p className="text-black text-xl leading-relaxed max-w-lg text-left">
          “Đọc sách rất quan trọng. Đó là cách để chúng ta đặt mình vào hoàn
          cảnh của người khác, từ đó gây dựng lòng đồng cảm sâu sắc. Thế giới
          câu chuyện trong sách cho chúng ta khả năng tĩnh lặng và độc lập, hai
          điều đang biến mất nhanh hơn nước băng tan ở vùng cực.”
        </p>
        <button className="bg-amber-500 text-black px-5 py-2 border border-gray-600 rounded font-bold mt-5 w-32">
          MƯỢN NGAY
        </button>
      </main>
      <div className="w-[90%] mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5 border-b-2 border-gray-300 pb-2">
          Thống kê
        </h2>
        <div className="flex justify-between gap-5 mt-8">
          <div className="flex-2 bg-white rounded shadow-md h-[90vh] p-5">
            <BarChart />
          </div>
          <div className="flex-1 bg-gray-100 rounded p-5 flex items-center justify-center">
            <p className="text-lg">
              Thư viện luôn duy trì sự đa dạng của các thể loại sách để thu hút và phục vụ nhu cầu ngày càng phong phú của độc giả...
            </p>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-10">
        <div className="flex justify-between gap-5 mt-8">
          <div className="flex-2 bg-white rounded shadow-md h-[90vh] p-5">
            <LineChartComponent />
          </div>
          <div className="flex-1 bg-gray-100 rounded p-5 flex items-center justify-center">
            <p className="text-lg">
              Thư viện đang trong giai đoạn tăng trưởng mạnh, phản ánh qua sự gia tăng rõ rệt cả về số lượng tài liệu và bạn đọc...
            </p>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-10">
        <div className="flex justify-between gap-5 mt-8">
          <div className="flex-2 bg-white rounded shadow-md h-[90vh] p-5">
            <PieChartComponent />
          </div>
          <div className="flex-1 bg-gray-100 rounded p-5 flex items-center justify-center">
            <p className="text-lg">
              Số lượng sách mượn tại thư viện phản ánh nhu cầu đa dạng của độc giả...
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-8 py-10 h-screen">
        <h1 className="text-xl font-bold bg-amber-500 text-black px-5 py-2 rounded text-center mb-5">
          LIÊN HỆ VỚI CHÚNG TÔI
        </h1>
        <div className="flex justify-between w-[80%] max-w-5xl p-5 gap-5">
          <div className="flex flex-col w-1/3 bg-gray-100 p-5 rounded h-[400px]">
            <input type="text" placeholder="Họ tên:" className="w-full p-2 mb-4 rounded border border-gray-300 bg-gray-200" />
            <input type="text" placeholder="Số điện thoại:" className="w-full p-2 mb-4 rounded border border-gray-300 bg-gray-200" />
            <input type="email" placeholder="Email:" className="w-full p-2 mb-4 rounded border border-gray-300 bg-gray-200" />
            <textarea placeholder="Gửi cho chúng tôi:" className="w-full p-2 mb-4 rounded border border-gray-300 bg-gray-200 h-32"></textarea>
            <button className="w-1/3 px-4 py-2 text-lg font-bold text-white bg-amber-500 rounded">
              Gửi đi
            </button>
          </div>
          <div className="w-2/3 bg-gray-200 rounded flex items-center justify-center">
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
