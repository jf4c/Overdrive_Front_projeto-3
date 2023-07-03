import { Icon, Main, Warning, Btn } from "./styled";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <Icon />
      <Warning>{`Pagina não Encontrada`}</Warning>
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

export default PageNotFound;
