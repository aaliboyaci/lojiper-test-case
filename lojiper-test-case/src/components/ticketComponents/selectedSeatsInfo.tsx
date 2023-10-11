import React from "react";
import seatNumberCreator from "./seatNumberCreator";

function SelectedSeatsInfo() {
  return (
    <>
      <br></br>
      <br></br>
      <h3>SelectedSeatsInfo</h3>
      <div
        className="container-fluid"
        style={{
          border: "1px solid",
          borderRadius: "8px",
          borderColor: "grey",
        }}
      >
        <div className="row">
          <p>Koltuk numarası: {"seatNumber"}</p>
          <p>
            Cinsiyeti:
            {"userNewGender"}
          </p>
        </div>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="TC Kimlik No"
            ></input>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="İsim Soyisim"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default SelectedSeatsInfo;
