import React from 'react';

const MapComponent = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8635471977637!2d105.78573677500754!3d21.038127280615345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b4220c2bd%3A0x1c9e359e2a4f618c!2sH%E1%BB%8Dc%20vi%E1%BB%87n%20C%C3%B4ng%20ngh%E1%BB%87%20B%C6%B0u%20ch%C3%ADnh%20Vi%E1%BB%85n%20th%C3%B4ng!5e0!3m2!1svi!2s!4v1708012843057!5m2!1svi!2s"
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;