import React from "react";

function seatNumberCreator(seatNumber: string) {
  const first = seatNumber.charAt(0);
  const second = seatNumber.charAt(1);

  const firstNumber = parseInt(first, 10);
  const secondNumber = parseInt(second, 10);

  const newSeatNumber = firstNumber * 4 + secondNumber + 1;
  return newSeatNumber;
}

export default seatNumberCreator;
