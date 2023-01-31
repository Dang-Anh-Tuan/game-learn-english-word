import React, { useRef, useState } from "react";

function InputResult({ handleCheckResult }) {
  const [currentTextInput, setCurrentTextInput] = useState("");
  const inputResultRef = useRef();

  function handleInputResult(e) {
    const isRemoveWord = handleCheckResult(e.target.value);
    console.log(isRemoveWord);
    if (isRemoveWord) {
      setCurrentTextInput("");
      inputResultRef.current?.focus();
    } else {
      setCurrentTextInput(e.target.value);
    }
  }

  return (
    <input
      ref={inputResultRef}
      autoFocus
      className="input-result"
      type="text"
      placeholder="Enter a word ..."
      value={currentTextInput}
      onInput={handleInputResult}
    />
  );
}

export default InputResult;
