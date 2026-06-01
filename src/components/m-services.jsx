import "../styles/m-services.css";
import { FaTimes } from "react-icons/fa";

export default function MServices({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>
        <div className="modal-header">
          <div className="modal-icon">{service.icon}</div>
          <h2>{service.title}</h2>
        </div>
        <div className="modal-body">
          <p>{service.description}</p>

        </div>
      </div>
    </div>
  );
}