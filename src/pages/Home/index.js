import React from "react";

import { Title, Text, Main, Infos, ActionButtons, Container } from "./styled";

import ImageZoom from "./components/ImageZoom";
import ImageButton from "./components/ImageButton";
import backEnd from "./img/Back.png";
import frontEnd from "./img/Front.png";
import company from "./img/company.jpg";
import person from "./img/person.png";

const Home = () => {
  const toolsBack = [".Net", "C#", "Entity framework", "MySQL"];
  const toolsFront = [
    "React",
    "PrimeReact",
    "stitches",
    "react-router-dom",
    "Axios",
  ];

  return (
    <Main>
      <Title>Controle Empresarial</Title>

      <Text>
        <span>3º</span> projeto do estágio na Overdrive Softwares e Consultoria.
        O objetivo deste projeto é desenvolver a interface do usuário
        (front-end) para complementar o trabalho realizado anteriormente no
        estágio, na segunda etapa, que se concentrou no desenvolvimento do
        back-end.
      </Text>

      <Container>
        <Infos>
          <ImageZoom
            id="back"
            src={backEnd}
            text={"Back-End"}
            tools={toolsBack}
          />
          <ImageZoom
            id="front"
            src={frontEnd}
            text={"Front-End"}
            position="right"
            tools={toolsFront}
          />
        </Infos>

        <ActionButtons>
          <ImageButton
            src={company}
            label="Empresas"
            icon="pi pi-building"
            nav="/company"
          />

          <ImageButton
            src={person}
            label="Pessoas"
            icon="pi pi-users"
            nav="/people"
          />

          {/* <Btn
            label="Empresas"
            icon="pi pi-building"
            onClick={() => navigate("/company")}
          />
          <ImageButton />
          <Btn
            label="Pessoas"
            icon="pi pi-users"
            onClick={() => navigate("/people")}
          /> */}
        </ActionButtons>
      </Container>
    </Main>
  );
};

export default Home;
