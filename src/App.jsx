import { useEffect, useRef, useState } from "react";
import "./App.css";
import InputResult from "./components/InputResult/InputResult";
import LineEnd from "./components/LineEnd/LineEnd";
import Word from "./components/Word/Word";
import setting from "./constants/setting";
import helpers from "./helpers/helpers";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [currentWords, setCurrentWords] = useState([]);
  const initWords = useRef(setting.INIT_WORDS);

  useEffect(() => {
    if (isStart) {
      const timeoutDropWord = setInterval(() => {
        const randomIndexWord = helpers.randomNumber(
          0,
          initWords.current.length - 1
        );

        setCurrentWords((preState) => {
          if (!preState.includes(initWords.current[randomIndexWord])) {
            return [...preState, initWords.current[randomIndexWord]];
          }
          return [...preState];
        });
      }, setting.TIME_ADD_WORD);

      return () => clearInterval(timeoutDropWord);
    }
  }, [isStart]);

  function handleClickStart() {
    setIsStart(true);
    setCurrentWords([]);
  }

  function handleEndGame() {
    setIsStart(false);
    setCurrentWords([]);
  }

  function handleCheckResult(word) {
    console.log(word);
    const newCurrentWord = currentWords.filter(
      (item) => item.toLowerCase() !== word.trim().toLowerCase()
    );
    const isRemoveItem = newCurrentWord.length !== currentWords.length;
    setCurrentWords(newCurrentWord);
    return isRemoveItem;
  }

  return (
    <div className="App">
      {!isStart && (
        <button className="btn-start prevent-select" onClick={handleClickStart}>
          Start game
        </button>
      )}
      {isStart && (
        <>
          <LineEnd />
          {currentWords &&
            currentWords.map((word) => (
              <Word key={word} text={word} handleEndGame={handleEndGame} />
            ))}
          <InputResult handleCheckResult={handleCheckResult} />
        </>
      )}
    </div>
  );
}

export default App;
