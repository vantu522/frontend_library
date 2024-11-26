import useLocalStorageState from '../useLocalStorageState'; // Giả sử bạn đã có custom hook này

const useBorrows = (onAdd, onUpdate) => {
    const [borrows, setBorrows] = useLocalStorageState('borrows', []); // Lấy dữ liệu phiếu mượn từ localStorage

    // Thêm phiếu mượn mới
    const handleAddBorrow = (newBorrow) => {
        setBorrows((prevBorrows) => {
            const updatedBorrows = [...prevBorrows, newBorrow];
            if (onAdd) {
                onAdd(newBorrow); // Gọi hàm onAdd khi thêm phiếu mượn mới
            }
            return updatedBorrows;
        });
    };

    // Đánh dấu phiếu mượn là đã trả
    const markAsReturned = (id) => {
        setBorrows((prevBorrows) =>
            prevBorrows.map(borrow =>
                borrow.id === id ? { ...borrow, isReturned: true } : borrow // Cập nhật trạng thái isReturned
            )
        );
    };

    // Đánh dấu phiếu mượn là chưa trả
    const markAsNotReturned = (id) => {
        setBorrows((prevBorrows) =>
            prevBorrows.map(borrow =>
                borrow.id === id ? { ...borrow, isReturned: false } : borrow // Cập nhật trạng thái isReturned
            )
        );
    };

    // Cập nhật thông tin phiếu mượn (chỉnh sửa)
    const handleUpdateBorrow = (updatedBorrow) => {
        setBorrows((prevBorrows) =>
            prevBorrows.map(borrow =>
                borrow.id === updatedBorrow.id ? { ...borrow, ...updatedBorrow } : borrow
            )
        );
        if (onUpdate) {
            onUpdate(updatedBorrow); // Gọi hàm onUpdate khi cập nhật phiếu mượn
        }
    };

    // Xóa phiếu mượn
    const handleDeleteBorrow = (id) => {
        setBorrows((prevBorrows) => prevBorrows.filter(borrow => borrow.id !== id));
    };

    return { borrows, handleAddBorrow, markAsReturned, markAsNotReturned, handleUpdateBorrow, handleDeleteBorrow };
};

export default useBorrows;
