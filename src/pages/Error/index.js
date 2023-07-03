import { Icon, Main, Warning, Btn } from "./styled";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <Icon />
      <Warning>{`Erro na requisição`}</Warning>
      <p>Tente retornar para:</p>
      <div>
        <Btn
          label="Empresas"
          icon="pi pi-building"
          onClick={() => navigate("/company")}
        />

        <Btn
          label="Pessoas"
          icon="pi pi-users"
          onClick={() => navigate("/people")}
        />
      </div>
    </Main>
  );
};

export default Error;
