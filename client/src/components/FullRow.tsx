import React from "react";
import styled from "styled-components";
import { PropsType } from "../helpers/Types";

interface styledComponents {
  current: boolean;
}

const InputStyled: any = styled.input<{ current: string }>`
  display: inline-block;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 30px;
  text-align: center;
  height: 30px;
  background-color: ${props => props.color || ""};
  border: 1.2px solid gray;
  line-height: 30px;
  ${props =>
    props.current ? "box-shadow: 0 0 0 5px rgba(21, 156, 228, 0.4)" : ""}
`;
const Container = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 5px;
`;

//props==>"gad" OR {world:[gray,yellow,green.green.yellow]}

const FullRow: React.FC<PropsType> = ({ toDisplay }): JSX.Element => {
  function colorchecker(a: any): void {
    console.log(a);
  }

  if (toDisplay.active) {
    let current = toDisplay.input.length;
    return (
      <Container>
        <InputStyled
          current={current === 0}
          defaultValue={toDisplay.input[0]}
        />
        <InputStyled
          current={current === 1}
          defaultValue={toDisplay.input[1]}
        />
        <InputStyled
          current={current === 2}
          defaultValue={toDisplay.input[2]}
        />
        <InputStyled
          current={current === 3}
          defaultValue={toDisplay.input[3]}
        />
        <InputStyled
          current={current === 4}
          defaultValue={toDisplay.input[4]}
        />
      </Container>
    );
  }
  //not yet rendered!
  if (!toDisplay.style) {
    return (
      <Container>
        <InputStyled defaultValue={""} />
        <InputStyled defaultValue={""} />
        <InputStyled defaultValue={""} />
        <InputStyled defaultValue={""} />
        <InputStyled defaultValue={""} />
      </Container>
    );
  }
  //conditionally style!
  else {
    let letters = Object.keys(toDisplay.style)[0].split("");
    let colors = Object.values(toDisplay.style)[0];
    let mymap = new Map();
    for (let i = 0; i < 5; i++) {
      mymap.set(letters[i], colors[i]);
    }
    return (
      <Container>
        {letters.map((each, inx) => (
          <InputStyled
            onchange={colorchecker(mymap.get(each))}
            key={inx}
            defaultValue={each}
            color={colors[inx]}
          />
        ))}
      </Container>
    );
  }
};
export default FullRow;
/*  
return (
  <Container>
    <InputStyled defaultValue={toDisplay.input[0]} />
    <InputStyled defaultValue={toDisplay.input[1]} />
    <InputStyled defaultValue={toDisplay.input[2]} />
    <InputStyled defaultValue={toDisplay.input[3]} />
    <InputStyled defaultValue={toDisplay.input[4]} />
  </Container>
);
export default FullRow;

 display: inline-block;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 30px;
  background-color: ${props => (props.color === "green" ? "green" : "")};
  background-color: ${props => (props.color === "yellow" ? "yellow" : "")};
  background-color: ${props => (props.color === "gray" ? "gray" : "")};
  text-align: center;
  height: 30px;
  border: 1.2px solid gray;
  line-height: 30px;
  ${props =>
    props.isActive ? "box-shadow: 0 0 0 5px rgba(21, 156, 228, 0.4)" : ""}
`;

export default function CharInRow(props) {
  return (
    <RowItemContainer color={props.color} isActive={props.isActive}>
      {props.item}
    </RowItemContainer>
  );
*/
