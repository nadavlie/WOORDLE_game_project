import styled from "styled-components";
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
const FullRow: React.FC = () => {
  return (
    <Container>
      <InputStyled />
      <InputStyled />
      <InputStyled />
      <InputStyled />
      <InputStyled />
    </Container>
  );
};

export default FullRow;

// import styled from "styled-components";

// interface Props {
//   isActive: boolean;
// }

// const StyledButton = styled.button<Props>`
//   background-color: ${({ isActive }) => (isActive ? "green" : "red")};
//   color: white;
//   padding: 10px 20px;
//   border-radius: 5px;
// `;

// const Button = ({ isActive }: Props) => {
//   return <StyledButton isActive={isActive}>Click me</StyledButton>;
// };
