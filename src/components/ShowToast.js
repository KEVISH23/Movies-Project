import React from 'react'
import { toast } from 'react-toastify'

export const ShowToast = (type,msg) => {
    switch(type){
        case "success":toast.success(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            break;
        case "error":toast.error(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
}

