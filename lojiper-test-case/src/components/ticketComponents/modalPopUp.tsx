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
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için

    setNewUserGender(gender);
    onGenderSubmit(gender);
  };

  return (
    <div className={`modal ${isModalOpen === 1 ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Cinsiyet Seçimi</h2>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => handleGenderSelect("male")}
            />
            Erkek
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => handleGenderSelect("female")}
            />
            Kadın
          </label>
        </div>
        <button onClick={handleSubmit}>Onayla</button>
      </div>
    </div>
  );
};

export default GenderModal;
