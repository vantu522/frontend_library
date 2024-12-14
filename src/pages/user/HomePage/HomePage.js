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

  const mostBorrowedBooks = [
    {
      image:
        "https://i.pinimg.com/736x/99/d8/27/99d827231d297e9ddb13874878f33133.jpg",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      borrowCount: 120,
    },
    {
      image:
        "https://i.pinimg.com/736x/78/34/b4/7834b4daa798890c075137730590fd40.jpg",
      title: "Atomic Habits",
      author: "James Clear",
      borrowCount: 95,
    },
    {
      image:
        "https://i.pinimg.com/736x/78/34/b4/7834b4daa798890c075137730590fd40.jpg",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      borrowCount: 80,
    },
    {
      image:
        "https://i.pinimg.com/736x/99/d8/27/99d827231d297e9ddb13874878f33133.jpg",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      borrowCount: 120,
    },
    {
      image:
        "https://i.pinimg.com/736x/99/d8/27/99d827231d297e9ddb13874878f33133.jpg",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      borrowCount: 120,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });

    const loadResources = async () => {
      try {
        // Logic tải dữ liệu (nếu cần)
        setTimeout(() => setIsLoading(false), 2000); // Giả lập tải tài nguyên
      } catch (error) {
        console.error("Lỗi tải tài nguyên", error);
      }
    };

    loadResources();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
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

      {/*Collections*/}
      <div className="grid gap-8 p-8">
        <div className="text-center py-5">
          <h2 className="text-5xl font-bold pt-5">Danh sách được mượn nhiều</h2>
          <p className="text-2xl text-gray-600">
            Những cuốn sách được yêu thích nhất tại thư viện.
          </p>
        </div>

        {/* Hiển thị sách được mượn nhiều */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {mostBorrowedBooks.map((book, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-500">{book.author}</p>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-400">
                  Số lượt mượn: <span className="font-bold">{book.borrowCount}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thống kê Section */}
      <div className="w-[90%] mx-auto" data-aos="fade-right">
        <h2 className="text-5xl font-bold text-center mb-10 mt-5 border-b-4 border-gray-300 pb-4">
          Thống kê
        </h2>
        <div className="flex gap-5 mt-16">
          <div
            className="flex-[60%] bg-white rounded shadow-md h-[70vh] p-5"
            data-aos="fade-up"
          >
            <BarChart />
          </div>
          <div
            className="flex-[40%] bg-gray-100 rounded p-5 flex items-center justify-center"
            data-aos="fade-left"
          >
            <p className="text-lg italic">
              Thư viện duy trì sự đa dạng các thể loại sách như tiểu thuyết, khoa học, nghiên cứu
              và văn học thiếu nhi, đáp ứng nhu cầu phong phú của độc giả.
            </p>
          </div>
        </div>
      </div>

      {/* Section khác (LineChart, PieChart, Map...) */}
      {/* Bạn có thể giữ nguyên logic tương tự cho các phần khác đã gửi */}
      {/* Thống kê 2 Section */}
      <div className="w-[90%] mx-auto mt-10" data-aos="fade-up">
        <div className="flex gap-5 mt-10 items-center">
          {/* Biểu đồ LineChart chiếm 3 phần */}
          <div
            className="flex-[60%] bg-white rounded shadow-md h-[70vh] p-5"
            data-aos="fade-up"
          >
            <LineChartComponent />
          </div>
          {/* Phần text chiếm 2 phần */}
          <div
            className="flex-[40%] bg-gray-100 rounded p-5 flex items-center justify-center h-[70vh]"
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
          {/* Biểu đồ PieChart chiếm 3 phần */}
          <div
            className="flex-[60%] bg-white rounded shadow-md h-[70vh] p-5"
            data-aos="fade-up"
          >
            <PieChartComponent />
          </div>
          {/* Phần text chiếm 2 phần */}
          <div
            className="flex-[40%] bg-gray-100 rounded p-5 flex items-center justify-center h-[70vh]"
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



