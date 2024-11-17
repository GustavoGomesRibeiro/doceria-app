import { FC } from "react";
import { DefaultProps } from "@/app/shared/interfaces/DefaultProps";

const Button: FC<DefaultProps> = ({ className, addProduct, children }) => {
  return (
    <button className={className} onClick={addProduct}>
      {children}
    </button>
  );
};

export default Button;
