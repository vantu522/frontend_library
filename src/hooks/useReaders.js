
import useLocalStorageState from '../useLocalStorageState';

const useReaders = () => {
    const [readers, setReaders] = useLocalStorageState('readers', []);

    const handleAddReader = (newReader) => {
        setReaders([...readers, newReader]);
    };

    const handleUpdateReader = (updatedReader) => {
        setReaders(readers.map(reader => reader.id === updatedReader.id ? updatedReader : reader));
    };

    const handleDeleteReader = (id) => {
        setReaders(readers.filter(reader => reader.id !== id));
    };

    return { readers, handleAddReader, handleUpdateReader, handleDeleteReader };
};

export default useReaders;
