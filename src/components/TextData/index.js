import React from "react";
import { Data, Icon, Text, Name } from "./styles";

const TextData = ({ data, name, className, icon }) => {
  //   console.log(body);

  return (
    <Data className={className}>
      {/* <i className={`pi ${icon}`}></i> */}
      {icon ? (
        <Name>
          <i className={`pi ${icon}`}></i>
          {name}
        </Name>
      ) : (
        <Name>{name}</Name>
      )}

      <Text className="textData">{data}</Text>
    </Data>
  );
};

export default TextData;
