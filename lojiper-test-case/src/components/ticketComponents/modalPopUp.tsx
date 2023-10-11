import React, { useState, useContext } from "react";
import { MainContext } from "../../../app/Context/mainProvider";
import "../../styles/ModalPopUpStyles.css";

interface GenderModalProps {
  onGenderSubmit: (gender: string) => void;
  isModalOpen: number;
}

const GenderModal: React.FC<GenderModalProps> = ({
  onGenderSubmit,
  isModalOpen,
}) => {
  const [gender, setGender] = useState<string>("");
  const { setNewUserGender } = useContext(MainContext);

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNewUserGender(gender);
    onGenderSubmit(gender);
  };

  return (
    <div className={`modal-ticket ${isModalOpen === 1 ? "open" : ""}`}>
      <div className="modal-ticket-content ">
        <h2>Cinsiyet Seçimi</h2>
        <div className="row align-items-middle p-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => handleGenderSelect("male")}
            />
            <label className="form-label">Erkek</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => handleGenderSelect("female")}
            />
            <label className="form-label">Kadın</label>
          </div>
        </div>

        <button className="btn btn-dark" onClick={handleSubmit}>
          Onayla
        </button>
      </div>
    </div>
  );
};

export default GenderModal;
