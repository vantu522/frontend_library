import React from "react";

// Component Banner
const NewsBanner = () => {
  const imageData = [
    "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg", 
    "https://i.pinimg.com/474x/07/8e/02/078e0212bce731f1f7a202767ffd5ca8.jpg", 
    "https://i.pinimg.com/474x/07/8e/02/078e0212bce731f1f7a202767ffd5ca8.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 5000); // 5 giây đổi ảnh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] overflow-hidden mt-8">
      {/* Ảnh nền thay đổi */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${imageData[currentImageIndex]})` }}
      ></div>

      {/* Lớp overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Library Newsletters</h1>
        <p className="text-sm md:text-lg mb-6">
          Sign up for our email newsletters and get library news and information delivered directly to your inbox.
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
      date: "November 19, 2024",
      title: "Art Is Technology and Technology Is Art",
      description:
        "Open to the public, the 8th annual Art Tech Psyche fair was a celebration of the intersection of art and technology.",
    },
    {
      date: "November 11, 2024",
      title: "Before Grainy Smartphone Concert Footage, There Was Arthur Freedman",
      description:
        "An exhibit at the Loeb Music Library shares the work of one of Boston's most determined punk scene documenters.",
    },
    {
      date: "November 11, 2024",
      title: "Before Grainy Smartphone Concert Footage, There Was Arthur Freedman",
      description:
        "An exhibit at the Loeb Music Library shares the work of one of Boston's most determined punk scene documenters.",
    },
    {
      date: "November 11, 2024",
      title: "Before Grainy Smartphone Concert Footage, There Was Arthur Freedman",
      description:
        "An exhibit at the Loeb Music Library shares the work of one of Boston's most determined punk scene documenters.",
    },
    {
      date: "November 11, 2024",
      title: "Before Grainy Smartphone Concert Footage, There Was Arthur Freedman",
      description:
        "An exhibit at the Loeb Music Library shares the work of one of Boston's most determined punk scene documenters.",
    },
    {
      date: "November 11, 2024",
      title: "Before Grainy Smartphone Concert Footage, There Was Arthur Freedman",
      description:
        "An exhibit at the Loeb Music Library shares the work of one of Boston's most determined punk scene documenters.",
    },
    // Các item còn lại...
  ];

  const newsItems = [
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "November 4, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "November 4, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "November 4, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "November 4, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "November 4, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    {
      image:
        "https://i.pinimg.com/736x/d8/ae/c4/d8aec4549b5612d008e31e3be96bde0f.jpg",
      date: "November 4, 2024",
      title: "Harvard Affiliates Celebrate Day of the Dead",
    },
    // Các item còn lại...
  ];

  return (
    <div className="grid gap-8 p-8">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold pt-20">NEWS</h1>
        <p className="text-2xl text-gray-600">
          Harvard Library is a hub for learning, sharing and the discovery of
          new ideas. Read about that work in action.
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
      <div className="grid gap-2 md:grid-cols-2">
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">STAY IN THE KNOW</h3>
          <p className="mb-4">Sign up for email updates from Wisdom's Beacon Library</p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            SIGN UP
          </button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">FOLLOW HARVARD LIBRARY</h3>
          <p className="mb-4">You can find us on Facebook, Twitter, and YouTube</p>
          <div className="space-y-2">
            <span className="flex items-center space-x-2">
              <i className="fab fa-facebook-square text-xl text-blue-600"></i>
              <span>Facebook</span>
            </span>
            <span className="flex items-center space-x-2">
              <i className="fab fa-twitter-square text-xl text-blue-400"></i>
              <span>Twitter</span>
            </span>
            <span className="flex items-center space-x-2">
              <i className="fab fa-youtube text-xl text-red-600"></i>
              <span>YouTube</span>
            </span>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
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

export default NewsPage;
