import React from "react";

interface BirthdateInputProps {
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({
  birthDay,
  birthMonth,
  birthYear,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className="form-group">
      <label className="form-label">Doğum Günü</label>
      <div className="birthdate-inputs">
        <input
          className="form-control"
          type="text"
          placeholder="gün"
          maxLength={2}
          value={birthDay}
          onChange={(e) => onDayChange(e.target.value)}
        />
        <span>/</span>
        <input
          className="form-control"
          type="text"
          placeholder="ay"
          maxLength={2}
          value={birthMonth}
          onChange={(e) => onMonthChange(e.target.value)}
        />
        <span>/</span>
        <input
          className="form-control"
          type="text"
          placeholder="yyyy"
          maxLength={4}
          value={birthYear}
          onChange={(e) => onYearChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BirthdateInput;
