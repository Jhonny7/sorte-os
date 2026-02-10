import React from 'react';
import ReactDOM from "react-dom/client";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ExternalWrapper } from './ContextService';

const MySwal = withReactContent(Swal);

interface AlertOptions {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cssClass?: string;
    acceptAction?: () => void;
    cancelAction?: () => void;
    hasCancel?: boolean;
}


interface ToastOptions {
    message: string | React.ReactNode;
    durationMs?: number;
    position?: 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start' | 'top' | 'bottom' | 'center';
    cssClass?: string;
    level?: 'success' | 'error' | 'warn' | 'info';
}


const AlertService = {
    show: async ({
        title,
        message,
        cssClass,
        acceptAction,
        cancelAction,
        hasCancel = false,
    }: AlertOptions) => {
        await MySwal.fire({
            title: <>{title}</>,
            html: <>{message}</>,
            customClass: {
                popup: cssClass || '',
            },
            showCancelButton: hasCancel,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            allowOutsideClick: true, // ⬅️ permite cerrar al hacer click fuera
            allowEscapeKey: true,     // ⬅️ permite cerrar con Esc
            backdrop: true,
            didOpen: () => {
                // Para asegurarse de que botones funcionen si usas HTML React
                const confirmBtn = document.querySelector('.swal2-confirm') as HTMLButtonElement;
                const cancelBtn = document.querySelector('.swal2-cancel') as HTMLButtonElement;

                confirmBtn?.addEventListener('click', () => {
                    if (acceptAction) acceptAction();
                    MySwal.close(); // ⬅️ Forzamos cierre
                });

                cancelBtn?.addEventListener('click', () => {
                    if (cancelAction) cancelAction();
                    MySwal.close(); // ⬅️ Forzamos cierre
                });
            },
            // Este evita que se quede pegado
            willClose: () => {
                // Limpieza si necesitas
            },
        });
    },
    showWithComponent: async ({
        title,
        component,
        cssClass,
        acceptAction,
        cancelAction,
        hasCancel = false,
        hasConfirm = true,
    }: {
        title?: string | React.ReactNode;
        component: React.ReactNode;
        cssClass?: string;
        acceptAction?: () => void;
        cancelAction?: () => void;
        hasCancel?: boolean;
        hasConfirm?: boolean;
    }) => {
        const container = document.createElement("div");
        const root = ReactDOM.createRoot(container);

        // 👇 Envuelve con el Wrapper inyectado por la app host
        root.render(<ExternalWrapper>{component}</ExternalWrapper>);

        const result = await MySwal.fire({
            ...(title && { title: <>{title}</> }),
            html: container,
            customClass: {
                popup: cssClass || "",
            },
            showCancelButton: hasCancel,
            showConfirmButton: hasConfirm,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            willClose: () => {
                root.unmount();
            },
        });

        if (result.isConfirmed && acceptAction) acceptAction();
        if (result.isDismissed && cancelAction) cancelAction();
    },
    toast: async ({
        message,
        durationMs = 5000,
        position = 'bottom-end',
        cssClass,
        level = 'info'
    }: ToastOptions) => {
        let levelClass = '';
        switch (level) {
            case 'success':
                levelClass = 'toast-success';
                break;
            case 'error':
                levelClass = 'toast-error';
                break;
            case 'warn':
                levelClass = 'toast-warn';
                break;
            case 'info':
            default:
                levelClass = 'toast-info';
        }

        await MySwal.fire({
            toast: true,
            position,
            html: <>{message}</>,
            showConfirmButton: false,
            showCloseButton: true,
            timer: durationMs,
            timerProgressBar: true,
            customClass: {
                popup: `my-toast-popup ${levelClass} ${cssClass || ''}`
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
    }
};

export default AlertService;
