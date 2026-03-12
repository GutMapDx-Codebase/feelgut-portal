// import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/kitRegistered.css";
const thankImage = "/topsellerkit.svg";

const KitRegistered = () => {
  const navigate = useNavigate();

  const handleSubmitAnother = () => {
    navigate("/registeryourkit");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* <img src={thankImage} alt="Thank you" className="modal-image" /> */}
        <h2>Thank you</h2>
        <p>Thank you for registering your kit!</p>
        <p className="subtext">
          You can now send your sample back to our laboratory following the directions in the instructions for use.
        </p>
        <div className="modal-button-group">
          <button
            onClick={handleSubmitAnother}
            className="modal-btn modal-btn-primary"
          >
            Submit Another
          </button>
          {/* <a
            href="https://yourgutmap.co.uk/?v=1cd3c693132f"
            className="modal-btn modal-btn-secondary"
          >
            Order Another Kit
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default KitRegistered;
