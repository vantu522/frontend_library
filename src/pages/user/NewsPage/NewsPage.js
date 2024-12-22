import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Component Banner
const NewsBanner = () => {
  const imageData = [
    "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
    "https://i.pinimg.com/474x/07/8e/02/078e0212bce731f1f7a202767ffd5ca8.jpg",
    "https://i.pinimg.com/474x/07/8e/02/078e0212bce731f1f7a202767ffd5ca8.jpg",
    "https://i.pinimg.com/474x/fe/d3/af/fed3af57eb72d547d800287bd8220955.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 3000); // 5 giây đổi ảnh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[350px] overflow-hidden mt-8">
      {/* Ảnh nền thay đổi */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${imageData[currentImageIndex]})` }}
      ></div>

      {/* Lớp overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 italic">
          Library Newsletters
        </h1>
        <p className="text-sm md:text-lg mb-4">
          Sign up for our email newsletters and get library news and information
          delivered directly to your inbox.
        </p>
        <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

// Component chính cho NewsPage
function NewsPage() {
  const cards = [
    {
      date: "December 21, 2024",
      title: "The Evolution of Digital Art in the 21st Century",
      description:
        "This exhibition explores the innovative ways artists are integrating technology into their creative processes.",
    },
    {
      date: "December 20, 2024",
      title: "Wisdom's Beacon: A Journey Through History",
      description:
        "Join us for a special exhibit showcasing the evolution of Harvard's library and its impact on knowledge dissemination.",
    },
    {
      date: "December 19, 2024",
      title: "The Future of Artificial Intelligence in Libraries",
      description:
        "A look at how AI technologies are revolutionizing library management and data organization.",
    },
    {
      date: "December 18, 2024",
      title: "Exploring the Secret Archives of Harvard Library",
      description:
        "Uncover hidden treasures from Harvard’s secret archives in a rare behind-the-scenes tour.",
    },
    {
      date: "December 17, 2024",
      title: "Sustainability in the Digital Age",
      description:
        "This seminar focuses on the environmental impact of digital technology and strategies for reducing its carbon footprint.",
    },
    {
      date: "December 16, 2024",
      title: "The Impact of Technology on Traditional Publishing",
      description:
        "An in-depth discussion on how digital tools and platforms are transforming the publishing world.",
    },
  ];

  const newsItems = [
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "December 21, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    {
      image:
        "https://i.pinimg.com/474x/f1/26/c6/f126c69e40473c81a2ae7dc900c6a4a5.jpg",
      date: "December 20, 2024",
      title: "Exploring the Hidden Corners of Harvard Library",
    },
    {
      image:
        "https://i.pinimg.com/736x/fa/1b/04/fa1b0435208b02f9350e93a1b814dc39.jpg",
      date: "December 19, 2024",
      title: "Wisdom's Beacon: A New Era in Library Research",
    },
    {
      image:
        "https://i.pinimg.com/474x/ad/72/67/ad7267e32e6a8298b79da501d64da0c2.jpg",
      date: "December 18, 2024",
      title: "Unlocking the Past: Harvard's Rich History",
    },
    {
      image:
        "https://i.pinimg.com/736x/c6/12/c0/c612c003e3207d22bd5aa23dc6faac38.jpg",
      date: "December 17, 2024",
      title: "Exploring New Technologies in Library Management",
    },
    {
      image:
        "https://i.pinimg.com/474x/a1/ab/6f/a1ab6f109de474abcd87a5e6407322c9.jpg",
      date: "December 16, 2024",
      title: "Wisdom's Beacon: The Future of Digital Libraries",
    },
  ];

  return (
    <div className="grid gap-8 p-8">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold pt-10 text-blue-800 italic transform transition duration-300 hover:translate-y-2">
          NEWS
        </h1>
        <p className="text-3xl text-gray-600 italic transform transition duration-300">
          Wisdom's Beacon Library is a hub for learning, sharing and the
          discovery of new ideas. Read about that work in action.
        </p>
      </div>
      {/* Banner Section */}
      <NewsBanner /> {/* Đây là nơi chèn banner vào */}
      {/* News Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
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
      {/* Info Section */}
{/* Info Section */}
<div className="grid gap-4 md:grid-cols-2 items-start">
  {/* Subscribe Section */}
  <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
    <h3 className="text-xl font-bold mb-2">STAY IN THE KNOW</h3>
    <p className="mb-4">
      Sign up for email updates from Wisdom's Beacon Library
    </p>
    <input
      type="email"
      placeholder="Email Address"
      className="w-full p-2 border rounded-lg mb-4"
    />
    <button className="w-full bg-blue-600 text-white py-1.5 text-sm rounded-lg hover:bg-blue-700">
      SIGN UP
    </button>
  </div>

  {/* Social Media Section */}
  <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
    <h3 className="text-xl font-bold mb-2">FOLLOW WISDOM'S BEACON</h3>
    <p className="mb-4">
      You can find us on Facebook, Twitter, YouTube, Instagram, and LinkedIn
    </p>
    <div className="space-y-2">
      <span className="flex items-center space-x-2">
        <i className="fab fa-facebook-square text-xl text-blue-600"></i>
        <span>Facebook</span>
      </span>
      <span className="flex items-center space-x-2">
        <i className="fab fa-youtube text-xl text-red-600"></i>
        <span>YouTube</span>
      </span>
      <span className="flex items-center space-x-2">
        <i className="fab fa-instagram text-xl text-pink-500"></i>
        <span>Instagram</span>
      </span>
    </div>
  </div>
</div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <p className="text-sm text-gray-500 mb-2">{card.date}</p>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {card.title}
            </h2>
            <p className="text-large italic text-gray-600">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;