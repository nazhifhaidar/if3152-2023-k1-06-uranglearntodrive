import React, { CSSProperties } from "react";
import Image from "next/image";

interface EditButtonProps {
  onClick?: () => any;
  style?: CSSProperties;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, style }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style ?? { width: "40px", height: "40px" }}
    >
      <Image
        src="/edit_icon.svg"
        alt="Edit Icon"
        width={32}
        height={32}
        style={{ borderRadius: "8px" }}
      ></Image>
    </button>
  );
};

export default EditButton;

