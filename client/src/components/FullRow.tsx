import styled from "styled-components";
import { toDisplayProp } from "../helpers/Types";
const InputStyled: any = styled.input`
  display: inline-block;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  text-transform: uppercase;
  border-radius: 5px;
  width: 30px;
  text-align: center;
  height: 30px;
  border: 1.2px solid gray;
  line-height: 30px;
`;
const Container = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 5px;
`;

//props==>"gad" OR {world:[gray,yellow,green.green.yellow]}

const FullRow: React.FC<toDisplayProp> = ({ toDisplay }): JSX.Element => {
  if (typeof toDisplay === "string") {
    return (
      <Container>
        <InputStyled defaultValue={} />
        <InputStyled defaultValue={} />
        <InputStyled defaultValue={} />
        <InputStyled defaultValue={} />
        <InputStyled defaultValue={} />
      </Container>
    );
  } else {
    //map the styles accordingly!
  }
};

export default FullRow;
