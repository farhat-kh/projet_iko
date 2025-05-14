import React, { useEffect} from "react";
import "../styles/toast.css";


const Toast = ({ message, onClose}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="custom-toast">
      {message}
    </div>
  );
}
export default Toast;