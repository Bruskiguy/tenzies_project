"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const generateRandomNumbers = () => {
    return Array.from({ length: 8 }, () => Math.floor(Math.random() * 6) + 1);
  };

  const [numbers, setNumbers] = useState<number[]>(generateRandomNumbers());

  const [savedDigits, setSavedDigits] = useState<Set<number>>(new Set());

  const [numberOfRolls, setNumberOfRolls] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const rollDice = () => {
    setNumberOfRolls((prevNumberOfRolls) => prevNumberOfRolls + 1);
    setNumbers((prevNumbers) =>
      prevNumbers.map((number, index) => {
        if (savedDigits.has(index)) {
          return number;
        }
        return Math.floor(Math.random() * 6) + 1;
      })
    );
  };

  const toggleSaveDigit = (index: number) => {
    setSavedDigits((prevSavedDigits) => {
      const newSavedDigits = new Set(prevSavedDigits);
      if (newSavedDigits.has(index)) {
        newSavedDigits.delete(index);
      } else {
        newSavedDigits.add(index);
      }
      return newSavedDigits;
    });
  };

  const resetScore = () => {
    setNumberOfRolls(0);
    setNumbers(generateRandomNumbers());
    setSavedDigits(new Set());
  };

  useEffect(() => {
    const allSaved = numbers.every((num, index) => savedDigits.has(index));
    const allGreen = numbers.every((num) => num === numbers[0]);

    if (allSaved && allGreen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [numbers, savedDigits]);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-wrap justify-center items-center w-80 h-80 bg-white border-2 border-gray-700 rounded-lg p-4">
        {numbers.map((number, index) => (
          <button
            key={index}
            onClick={() => toggleSaveDigit(index)}
            className={`w-16 h-16 m-2 rounded-full flex justify-center items-center text-2xl text-gray-700 transition duration-300 ${
              savedDigits.has(index)
                ? "bg-green-300"
                : "bg-gray-500 bg-opacity-20 hover:bg-gray-700 hover:bg-opacity-40 backdrop-filter backdrop-blur-lg"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={rollDice}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Roll Dice
      </button>
      <button
        onClick={resetScore}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Reset
      </button>

      <h2 className="text-gray-700 text-2xl mt-4">
        Number of Rolls: {numberOfRolls}
      </h2>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg text-center">
            <h2 className="text-gray-700 text-xl font-bold mb-4">You Win!</h2>
            <p className="text-gray-700 mb-4">
              Number of Rolls: {numberOfRolls}
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                resetScore();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
