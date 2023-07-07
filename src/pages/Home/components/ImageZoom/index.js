import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { ViewInfo, Image, ToolList, Tool, Text, Box } from "./styled";

const ImageZoom = ({ id, src, alt, text, tools }) => {
  const [imgActive, setImgActive] = useState(false);
  const handlerImage = () => {
    setImgActive(true);
  };

  return (
    <Box>
      <ViewInfo>
        <Image
          id={id}
          src={src}
          alt={alt}
          onMouseEnter={handlerImage}
          onMouseLeave={() => {
            setImgActive(false);
          }}
        />
        <ToolList className="toolList">
          {tools &&
            tools.map((e, i) => {
              return <Tool key={i}>{e}</Tool>;
            })}
        </ToolList>
      </ViewInfo>
      <Text className="textImage">{text}</Text>
      {imgActive ? (
        <div className="overlay active"></div>
      ) : (
        <div className="overlay"></div>
      )}
    </Box>
  );
};

export default ImageZoom;
