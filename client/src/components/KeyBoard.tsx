// a list of keyboard letters and controld-->
// -->will send each button to unique dynamic style using styled!
// -->return the keyboard nicely
import Button from "./Button";

import styled from "styled-components";
const KeyBoardWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(10, 1fr);
  padding-top: 35px;
`;
const QWERTY = `QWERTYUIOPASDFGHJKLZXCVBNM`.split("").concat(["del"]);

//change the any type!

const KeyBoard = (props: any): JSX.Element => {
  // styling the Keyboard with styled extension!
  console.log(props);

  return (
    <KeyBoardWrapper>
      {QWERTY.map(item => (
        <Button
          color={props.colorsMap.get(item)}
          key={item}
          letter={item}
          OnVirtualKeyPress={props.OnVirtualKeyPress}
        />
      ))}
    </KeyBoardWrapper>
  );
};
export default KeyBoard;
