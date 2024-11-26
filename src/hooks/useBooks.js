
import useLocalStorageState from '../useLocalStorageState';

const useBooks = () => {
    const [books, setBooks] = useLocalStorageState('books', []);

    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    const handleUpdateBook = (updatedBook) => {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return { books, handleAddBook, handleUpdateBook, handleDeleteBook };
};

export default useBooks;
