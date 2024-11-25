import { FC } from "react";
type props = {
  condition: boolean;
  children: React.ReactNode;
};
const ConditionalRender: FC<props> = ({ condition, children }) => {
  return <div>{condition ? children : null}</div>;
};

export default ConditionalRender;
