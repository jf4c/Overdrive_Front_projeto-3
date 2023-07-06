import React from "react";
import { Btn, Container, Image } from "./styled";
import { useNavigate } from "react-router-dom";

const ImageButton = ({ src, alt, label, icon, nav }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`${nav}`)}>
      <div className="container-img">
        <Image className="img" src={src} alt={alt} />
        <div className="overlay">
          <span>{`${label}`}</span>
        </div>
      </div>
      <Btn className="btn" label={label} icon={icon} />
    </Container>
  );
};

export default ImageButton;
