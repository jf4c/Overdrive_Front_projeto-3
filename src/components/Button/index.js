import React, { useRef } from "react";

import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";

const Button = () => {
    const toast = useRef(null);
    const items = [
        {
            label: "Update",
            icon: "pi pi-refresh",
            command: () => {
                toast.current.show({
                    severity: "success",
                    summary: "Updated",
                    detail: "Data Updated",
                });
            },
        },
        {
            label: "Delete",
            icon: "pi pi-times",
            command: () => {
                toast.current.show({
                    severity: "warn",
                    summary: "Delete",
                    detail: "Data Deleted",
                });
            },
        },
        {
            label: "React Website",
            icon: "pi pi-external-link",
            command: () => {
                window.location.href = "https://reactjs.org/";
            },
        },
        {
            label: "Upload",
            icon: "pi pi-upload",
            command: () => {
                //router.push('/fileupload');
            },
        },
    ];

    const save = () => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Saved",
        });
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <SplitButton
                label="Save"
                icon="pi pi-plus"
                onClick={save}
                model={items}
            />
        </div>
    );
};

export default Button;
