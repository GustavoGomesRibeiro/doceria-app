import { FC } from "react";
import { DefaultProps } from "@/app/shared/interfaces/DefaultProps";

const Container: FC<DefaultProps> = ({ children }) => {
  return <div className="h-screen">{children}</div>;
};

export default Container;
