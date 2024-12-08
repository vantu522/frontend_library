import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

const DatePickerInput = ({ selectedDate, onChangeDate, placeholder }) => {
  return (
    <div className="relative flex items-center">
      <DatePicker
        selected={selectedDate}
        onChange={onChangeDate}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        className="w-4/5 py-2 pl-2 pr-10 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
      />
      <FaCalendarAlt className="absolute right-2 text-gray-600 text-lg pointer-events-none" />
    </div>
  );
};

export default DatePickerInput;
