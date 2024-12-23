import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react"; // Thêm Heart icon

function FavoriteBooks() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setFavoriteBooks(savedFavorites);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Danh sách yêu thích
      </h2>
      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteBooks.map((book, idx) => (
            <div
              key={book.bookId}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-48 h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-center">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {book.author.join(", ")}
              </p>
              <button
                className="mt-4 text-red-500"
                onClick={() => {
                  const updatedFavorites = favoriteBooks.filter(
                    (fav) => fav.bookId !== book.bookId
                  );
                  localStorage.setItem(
                    "favoriteBooks",
                    JSON.stringify(updatedFavorites)
                  );
                  setFavoriteBooks(updatedFavorites);
                }}
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Chưa có sách yêu thích</p>
      )}

      <div className="fixed bottom-4 right-4 bg-red-500 p-4 rounded-full shadow-lg">
        <Heart className="text-white w-8 h-8" />
      </div>
    </div>
  );
}

export default FavoriteBooks;
