import React, { useEffect, useRef, useState } from "react";
import style from "./Word.module.css";
import setting from "../../constants/setting";
import helpers from "../../helpers/helpers";

function Word({ text, handleEndGame }) {
  const worldRef = useRef();
  const [isShowWord, setIsShowWorld] = useState(true);

  useEffect(() => {
    const timeoutDropWord = setInterval(() => {
      const yWorld = worldRef.current?.getBoundingClientRect().y;
      if (yWorld < 600) {
        worldRef.current.style.top = `${yWorld + setting.EXTRA_Y_WORD}px`;
      } else {
        // end game
        handleEndGame();

        // remove word
        setIsShowWorld(false);
      }
    }, setting.SPEED_WORLD_DOWN);

    return () => clearInterval(timeoutDropWord);
  }, []);

  useEffect(() => {
    const randomXInit = helpers.randomNumber(600, 1200);
    worldRef.current.style.left = `${randomXInit}px`;
  }, []);

  return (
    isShowWord && (
      <div ref={worldRef} className={style["container-text"]}>
        <span className={`${style["text"]} prevent-select`}>{text}</span>
      </div>
    )
  );
}

export default Word;
