import React, { useRef } from "react";

import { Button } from "primereact/button";

const ButtonStatus = () => {
  return (
    <React.Fragment>
      <Button
        icon="pi pi-search"
        rounded
        // outlined
        // severity="warning"
        // onClick={() => openViewCompanyComplete(rowData)}
        tooltip="View"
        // tooltipOptions={configTooltip}
      />
    </React.Fragment>
  );
};

export default ButtonStatus;
