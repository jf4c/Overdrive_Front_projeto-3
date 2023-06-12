import React from "react";
import { Button } from "primereact/button";

const DialogFooter = () => {
  return (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveCompany} />
    </React.Fragment>
  );
};

export default DialogFooter;
