import { FC } from "react";
type props = {
  condition: boolean;
  children: React.ReactNode;
};
const ConditionalRender: FC<props> = ({ condition, children }) => {
  return condition ? <div>{children}</div> : null;
};
export default ConditionalRender;
