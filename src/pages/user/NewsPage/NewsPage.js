import React from "react";

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
      date: "November 5, 2024",
      title: "Boston Bohemians: An Evening of Poetry from Local Poets",
      description:
        "The Boston Originals reading series kicked off the Woodberry Poetry Room’s Fall 2024 season of programming.",
    },
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
        "https://i.pinimg.com/474x/07/8e/02/078e0212bce731f1f7a202767ffd5ca8.jpg",
      date: "October 18, 2024",
      title: "Ukraine’s First Lady Shares History with Harvard",
    },
  ];

  return (
    <div className="grid gap-8 p-8">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">NEWS</h1>
        <p className="text-lg text-gray-600">
          Harvard Library is a hub for learning, sharing and the discovery of
          new ideas. Read about that work in action.
        </p>
      </div>

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
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">STAY IN THE KNOW</h3>
          <p className="mb-4">Sign up for email updates from Harvard Library</p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            SIGN UP
          </button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">FOLLOW HARVARD LIBRARY</h3>
          <p className="mb-4">You can find us on Facebook and Twitter</p>
          <div className="space-y-2">
            <span className="block">Facebook</span>
            <span className="block">Twitter</span>
            <span className="block">YouTube</span>
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
