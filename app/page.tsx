"use client";
import React, { useEffect, useState } from "react";

const napoleonQuotes = [
  "Tina, come get some ham.",
  "Whatever I feel like I wanna do. Gosh!",
  "It’s pretty much my favorite animal. It’s like a lion and a tiger mixed…",
  "A freakin' 12-gauge, what do you think?",
  "The worst day of my life, what do you think?",
  "Stay home and eat all the freakin' chips, Kip.",
  "What the flip was Grandma doing at the sand dunes?",
  "Ugh. Kip hasn't done flipping anything today!",
  "Girls only want boyfriends who have great skills!",
  "Lucky!",
  "Yes, like Napoleon, dynamite!",
  "Napoleon, don't be jealous that I've been chatting online with babes all day.",
  "You know, like nunchuck skills, bow hunting skills, computer hacking skills...",
  "Vote for Pedro!",
  "I caught you a delicious bass.",
  "Nunchuck skills... bowhunting skills... computer hacking skills... Girls only want boyfriends who have great skills.",
  "I see you're drinking 1%. Is that 'cause you think you're fat? 'Cause you're not. You could be drinking whole if you wanted to.",
  "Your mom goes to college.",
  "Pedro offers you his protection.",
  "Give me some of your tots!",
  "Gosh! Idiot!",
  "You ever take it off any sweet jumps?",
  "Just borrow some from the school nurse. I know she has like five sticks in her drawer.",
  "Can you bring me my chapstick?",
  "Napoleon, don't be jealous that I've been chatting online with babes all day. Besides, we both know that I'm training to be a cage fighter.",
  "Tina, you fat lard, come get some dinner!",
  "Eat the food, Tina!",
  "The worst day of my life, what do you think?",
  "I don't even have any good skills. You know, like nunchuck skills, bowhunting skills, computer hacking skills. Girls only want boyfriends who have great skills!",
  "You got like three feet of air that time.",
  "Freakin' idiot!",
  "So, we're pretty much friends by now, right?",
  "You're such an idiot.",
  "Stay home and eat all the freakin' chips, Kip.",
  "What the flip was Grandma doing at the sand dunes?",
  "I could build you a cake or somethin'.",
  "Why don't you go tell your mom to shut up?",
  "It's pretty much my favorite animal. It's like a lion and a tiger mixed... bred for its skills in magic.",
  "I don't feel very good.",
  "You're not my mom, Don.",
  "No, it's a sledgehammer.",
  "My lips hurt real bad!",
  "Who's the only one here who knows the illegal ninja moves from the government? (raises hand slowly) Me.",
];

export default function Home() {
  const generateRandomNumbers = () => {
    return Array.from({ length: 8 }, () => Math.floor(Math.random() * 6) + 1);
  };

  const [numbers, setNumbers] = useState<number[]>(generateRandomNumbers());
  const [savedDigits, setSavedDigits] = useState<Set<number>>(new Set());
  const [numberOfRolls, setNumberOfRolls] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [quotation, setQuotation] = useState<string>(
    " Whatever I feel like i wanna do, Gosh"
  );

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
    randomQuote();
  };

  const randomQuote = () => {
    const randomQuoteIndex = Math.floor(Math.random() * napoleonQuotes.length);
    const randomQuoteElement = napoleonQuotes[randomQuoteIndex];
    setQuotation(randomQuoteElement);
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

      <div className="mt-4 text-center">
        <h3 className="text-gray-700 text-lg mb-2">{quotation}</h3>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg text-center">
            <h2 className="text-gray-700 text-xl font-bold mb-4">You Win!</h2>
            <p className="text-gray-700 mb-4">
              Number of Rolls: {numberOfRolls}
            </p>
            <iframe
              title="Giphy GIF"
              allow="fullscreen"
              frameBorder="0"
              height="270"
              src="https://giphy.com/embed/VawNgfFSDS4PMl1vHK/video"
              className="max-w-full h-auto mx-auto"
            ></iframe>
            <button
              onClick={() => {
                setShowModal(false);
                resetScore();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
