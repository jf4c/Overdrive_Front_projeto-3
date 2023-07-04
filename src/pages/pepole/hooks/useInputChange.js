import { useContext } from "react";
import { PersonContext } from "../context/PersonContext";

export const useInputChange = () => {
  const { person, setPerson } = useContext(PersonContext);

  const onInputChange = (e, name) => {
    let val = (e.target && e.target.value) || "";
    if (name === "user") {
      val = val.replace(/\s/g, "");
    }

    let _person = { ...person };
    _person[`${name}`] = val;
    setPerson(_person);
  };

  return {
    onInputChange,
  };
};
