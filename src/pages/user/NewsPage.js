import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const NewsBanner = () => {
  const bannerImage =
    "https://i.pinimg.com/474x/36/10/f7/3610f7e77169c14dd96666579c8d8320.jpg";

  return (
    <div className="relative w-[90%] h-[550px] overflow-hidden mt-8 mx-auto">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
          imageRendering: "auto",
        }}
      ></div>
    </div>
  );
};

function NewsPage() {
  const [showAll, setShowAll] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cards = [
    {
      date: "December 21, 2024",
      title: "The Evolution of Digital Art",
      description:
        "Explore how technology is redefining the boundaries of creativity, offering artists innovative ways to express themselves through mediums like VR and AI.",
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
    },
    {
      date: "December 20, 2024",
      title: "Harvard's Hidden Corners",
      description:
        "Uncover the untold stories of Harvard Library's hidden treasures, a journey through its secret archives and rare manuscripts.",
      image:
        "https://i.pinimg.com/474x/f1/26/c6/f126c69e40473c81a2ae7dc900c6a4a5.jpg",
    },
    {
      date: "December 19, 2024",
      title: "AI in Libraries",
      description:
        "Discover the groundbreaking impact of artificial intelligence on library management, from cataloging to personalized user experiences.",
      image:
        "https://i.pinimg.com/736x/fa/1b/04/fa1b0435208b02f9350e93a1b814dc39.jpg",
    },
    {
      date: "December 18, 2024",
      title: "Harvard's Secret Archives",
      description:
        "Dive deep into Harvard's rich history with exclusive access to its secret archives and explore their cultural significance.",
      image:
        "https://i.pinimg.com/474x/ad/72/67/ad7267e32e6a8298b79da501d64da0c2.jpg",
    },
  ];

  const boxs = [
    {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      date: "December 10, 2024",
      title: "Cuốn sách của năm",
      description:
        "Đây là một tác phẩm xuất sắc, khai phá những khía cạnh tâm lý và triết học sâu sắc.",
    },
    {
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
      date: "December 8, 2024",
      title: "Hành trình khám phá",
      description:
        "Tác phẩm này kể về một cuộc phiêu lưu kỳ thú qua những vùng đất xa xôi.",
    },
    {
      image:
        "https://i.pinimg.com/474x/25/5b/2e/255b2e5562fd8efba07a58b0e7150cde.jpg",
      date: "December 7, 2024",
      title: "Sách cho tâm hồn",
      description:
        "Một quyển sách chữa lành, mang lại sự bình yên cho tâm hồn người đọc.",
    },
    {
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      date: "December 5, 2024",
      title: "Bí mật vũ trụ",
      description:
        "Khám phá những bí mật thú vị và những câu chuyện khoa học đầy bất ngờ.",
    },
  ];
  const quote = [
    {
      image:
        "https://i.pinimg.com/474x/35/75/cc/3575cc36a19c5791e65d04a3daa8587e.jpg",
      date: "November 28, 2024",
      title: "Ánh sáng hy vọng",
      description:
        "Cuốn sách khắc họa hành trình vượt qua những thử thách của con người để tìm kiếm ánh sáng hy vọng. Mỗi trang sách là một thông điệp đầy ý nghĩa về việc không bao giờ bỏ cuộc, dù con đường phía trước có mù mịt đến đâu. 'Hãy luôn hướng về phía mặt trời, và bóng tối sẽ ngả phía sau bạn.'",
    },
    {
      image:
        "https://i.pinimg.com/474x/af/ac/74/afac745e98b1f8ab415aa4f8dc466a48.jpg",
      date: "December 8, 2024",
      title: "Những dòng suy tưởng",
      description:
        "Tác phẩm chứa đựng những trích dẫn nổi bật từ các triết gia, nhà văn, và nhà khoa học vĩ đại. 'Cuộc sống không phải là việc chờ đợi cơn bão qua đi, mà là học cách nhảy múa dưới mưa.' Đây là lời nhắn gửi tới độc giả rằng chúng ta luôn có thể tìm thấy niềm vui và ý nghĩa trong chính khoảnh khắc hiện tại.",
    },
    {
      image:
        "https://i.pinimg.com/474x/d8/05/66/d80566e323c722f232f39c01a7614fa5.jpg",
      date: "December 7, 2024",
      title: "Hành trình của tâm hồn",
      description:
        "Được viết với giọng văn nhẹ nhàng nhưng đầy sức mạnh, cuốn sách dẫn dắt người đọc bước qua những nỗi đau, sợ hãi để tìm lại bản ngã. 'Hãy tha thứ cho chính mình, bởi bạn xứng đáng với sự bình yên hơn bất kỳ ai khác.' Đây là một thông điệp sâu sắc và đầy tính nhân văn.",
    },
    {
      image:
        "https://i.pinimg.com/474x/10/c3/4d/10c34dc363b946117595bfaa3b16fa49.jpg",
      date: "December 5, 2024",
      title: "Sự cân bằng của cuộc sống",
      description:
        "Tác phẩm này là lời nhắc nhở rằng cuộc sống là một chuỗi các mảnh ghép giữa niềm vui và nỗi buồn. 'Khi bạn học cách tận hưởng những điều nhỏ bé, cuộc sống sẽ trở nên phong phú và ý nghĩa hơn.' Đây là quyển sách dành cho những ai đang tìm kiếm cách cân bằng trong cuộc sống hiện đại bận rộn.",
    },
  ];
  const renderImage = (image) => {
    if (!image) return "Không có hình ảnh";
    // URL hợp lệ
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return (
        <img
          src={image}
          alt="Hình ảnh"
          className="object-cover w-full h-full rounded-lg"
        />
      );
    }
    // Base64 có tiền tố
    if (image.startsWith("data:image")) {
      return (
        <img
          src={image}
          alt="Hình ảnh Base64"
          className="object-cover w-full h-full rounded-lg"
        />
      );
    }
    // Base64 không có tiền tố
    const base64Image = `data:image/png;base64,${image}`;
    return (
      <img
        src={base64Image}
        alt="Hình ảnh Base64"
        className="object-cover w-full h-full rounded-lg"
      />
    );
  };
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/posts"
        ); // Thay bằng API thật của bạn
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-extrabold text-blue-800 italic relative overflow-hidden animate-slideIn">
          <span className="inline-block">NEWS</span>
        </h1>
        <p className="text-2xl text-gray-600 italic animate-slideIn">
          Explore the latest updates and events at Wisdom's Beacon Library.
        </p>
      </div>

      {/* Banner Section */}
      <NewsBanner />
      <div className="mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-4xl font-extrabold text-blue-900 text-left pl-8 pt-6">
          Bài viết mới
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] mx-auto">
          {posts.map((post, index) => (
            <div
              key={post.id || index}
              className="p-6 rounded-lg shadow-lg bg-white"
            >
              {/* Hình ảnh */}
              <div className="w-full h-48 flex items-center justify-center rounded-lg bg-gray-200">
                {renderImage(post.img)}
              </div>
              {/* Tiêu đề */}
              <h3 className="text-2xl font-bold text-blue-700 mt-4 mb-2">
                {post.title}
              </h3>
              {/* Tác giả */}
              <p className="text-sm text-gray-500">Tác giả: {post.author}</p>
              {/* Nội dung */}
              <p className="text-gray-600 mt-2">{post.content}</p>
              {/* Ngày tạo */}
              <p className="text-gray-500 italic mt-2">
                Ngày tạo: {new Date(post.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          ⬆
        </button>
      </div>

      {/* Old Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 w-[90%] mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div
              className="w-full md:w-1/3 h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${card.image})`,
              }}
            ></div>
            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <p className="text-md text-gray-500 mb-2">{card.date}</p>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 italic">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 1 Card Section */}
      <div className="grid grid-cols-1 gap-8 mt-10 w-[90%] mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-900 text-left pl-8 pt-6 -ml-8">
          Review sách
        </h1>
        {boxs.slice(0, showAll ? boxs.length : 3).map((card, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Image */}
            <div
              className="w-full md:w-1/3 h-48 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${card.image})`,
              }}
            ></div>
            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <p className="text-md text-gray-500 mb-2">{card.date}</p>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 italic">{card.description}</p>
            </div>
          </div>
        ))}
        {/* "Xem thêm" Button */}
        {boxs.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-md hover:bg-blue-800 mx-auto block"
          >
            {showAll ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>

      {/* 1 Cards Section */}
      <div className="grid grid-cols-1 gap-8 mt-10 w-[90%] mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-900 text-left pl-8 pt-6 -ml-8">
          Trích dẫn hay
        </h1>
        {quote.slice(0, showAll ? quote.length : 3).map((card, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Image */}
            <div
              className="w-full md:w-1/3 h-60 bg-cover bg-center rounded-lg flex-shrink-0"
              style={{
                backgroundImage: `url(${card.image})`,
              }}
            ></div>
            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <p className="text-md text-gray-500 mb-2">{card.date}</p>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 italic">{card.description}</p>
            </div>
          </div>
        ))}
        {/* "Xem thêm" Button */}
        {quote.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-md hover:bg-blue-800 mx-auto block"
          >
            {showAll ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
