import React from "react";

function NewPage() {
  const cacSuKien = [
    {
      date: "19/11/2024",
      title: "Triển Lãm Sách Quý: Bản Thảo Thời Phục Hưng",
      description:
        "Trưng bày các bản thảo quý hiếm và ấn bản đầu tiên thuộc thời kỳ Phục Hưng, khám phá sự phát triển của nghệ thuật văn học.",
    },
    {
      date: "11/11/2024",
      title: "Tọa Đàm Tác Giả: Khám Phá Văn Học Đương Đại",
      description:
        "Tham gia cuộc trò chuyện đặc biệt với các tác giả đoạt giải, chia sẻ về những tác phẩm mới và quá trình sáng tác.",
    },
    {
      date: "05/11/2024",
      title: "Ra Mắt Kho Lưu Trữ Số: Bảo Tồn Di Sản Văn Chương",
      description:
        "Thư viện giới thiệu kho lưu trữ số toàn diện các tác phẩm văn học lịch sử, mở rộng khả năng truy cập các văn bản quý hiếm trên toàn thế giới.",
    },
    {
      date: "28/10/2024",
      title: "Lớp Học Bảo Quản Sách",
      description:
        "Học nghệ thuật bảo quản sách từ các chuyên gia bảo tồn trong một buổi workshop thực hành chuyên sâu.",
    },
    {
      date: "15/10/2024",
      title: "Chuỗi Đọc Truyện Cho Trẻ Em",
      description:
        "Các buổi kể chuyện hàng tháng đưa những thế giới kỳ diệu đến gần hơn với trẻ nhỏ và gia đình.",
    },
    {
      date: "30/09/2024",
      title: "Đấu Giá Sách Quý Gây Quỹ",
      description:
        "Hỗ trợ các chương trình thư viện đồng thời khám phá những cuốn sách sưu tập độc đáo từ các bộ sưu tập cá nhân.",
    },
  ];

  const diemNhanSach = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/SanDiegoCityCollegeLearningResource_-_bookshelf.jpg/1200px-SanDiegoCityCollegeLearningResource_-_bookshelf.jpg",
      date: "20/11/2024",
      title: "Bổ Sung Mới Trong Lĩnh Vực Nghiên Cứu Trung Cổ",
    },
    {
      image: "https://i.pinimg.com/736x/1f/16/b5/1f16b503508ffa48c99cd97b7ea41604.jpg",
      date: "12/11/2024",
      title: "Mở Rộng Bộ Sưu Tập Khoa Học Viễn Tưởng",
    },
    {
      image: "https://i.pinimg.com/736x/0b/3c/6c/0b3c6cb9ff04ad2ca81c15e95d04cd51.jpg",
      date: "25/10/2024",
      title: "Dự Án Số Hóa Bản Thảo Quý",
    },
    // Các item còn lại...
  ];

  return (
    <div className="grid gap-8 p-8">
      {/* Phần Tiêu Đề */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold pt-20">TIN TỨC THƯ VIỆN</h1>
        <p className="text-2xl text-gray-600">
          Khám phá, nghiên cứu và kết nối thông qua thế giới sách và di sản văn chương.
        </p>
      </div>

      {/* Phần Điểm Nổi Bật Sách */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diemNhanSach.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-500">{item.date}</p>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Phần Thông Tin */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">THAM GIA CỘNG ĐỒNG ĐỌC SÁCH</h3>
          <p className="mb-4">Đăng ký nhận bản tin văn học hàng tháng</p>
          <input
            type="email"
            placeholder="Địa chỉ Email"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            ĐĂNG KÝ
          </button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <p className="mb-4">Theo dõi hành trình văn học của chúng tôi trên mạng xã hội</p>
          <div className="space-y-2">
            <span className="block">Facebook Câu Lạc Bộ Sách</span>
            <span className="block">Twitter Cập Nhật Văn Chương</span>
            <span className="block">Instagram Đánh Giá Sách</span>
          </div>
        </div>
      </div>

      {/* Phần Thẻ Sự Kiện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cacSuKien.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <p className="text-sm text-gray-500 mb-2">{card.date}</p>
            <h2 className="text-lg font-semibold mb-4">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewPage;