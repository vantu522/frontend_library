
import useLocalStorageState from '../useLocalStorageState';

const useEmployees = () => {
    const [employees, setEmployees] = useLocalStorageState('employees', []);

    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        setEmployees(employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee));
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    return { employees, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee };
};

export default useEmployees;
