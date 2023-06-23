import React from "react";
import { Data, Icon, Text, Name } from "./styles";

const TextData = ({ data, name, className }) => {
  //   console.log(body);

  return (
    <Data className={className}>
      <Name>{name}</Name>
      <Text className="textData">{data}</Text>
    </Data>
  );
};

export default TextData;
