import { useContext } from "react";
import { PersonContext } from "../context/PersonContext";

export const useInputChange = () => {
  const { person, setPerson } = useContext(PersonContext);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";

    let _person = { ...person };

    _person[`${name}`] = val;

    setPerson(_person);
  };

  return {
    onInputChange,
  };
};
