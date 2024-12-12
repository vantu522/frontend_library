import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BarChart from "../../../components/user/BarChart";
import LineChartComponent from "../../../components/user/LineChartComponent";
import PieChartComponent from "../../../components/user/PieChartComponent";
import MapComponent from "../../../components/user/MapComponent";
import LoadingScreen from '../../../components/user/LoadingScreen';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000, 
      once: true, 
    });

    const loadResources = async()=>{
      try{

      } catch(error){
        console.error("loi tai tai nguyen", error);
      }
    }

    loadResources();


  }, []);

  const handleLoadingComplete = () =>{
      setIsLoading(false);
    }

  if(isLoading){
      return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }



  return (
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
          MƯỢN NGAY
        </button>
      </main>

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
            />
            <input
              type="text"
              placeholder="Số điện thoại:"
              className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="email"
              placeholder="Email:"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;