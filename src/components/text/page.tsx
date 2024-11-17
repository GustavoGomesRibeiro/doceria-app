import { FC } from "react";
import { DefaultProps } from "@/app/shared/interfaces/DefaultProps";

const Text: FC<DefaultProps> = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

export default Text;
