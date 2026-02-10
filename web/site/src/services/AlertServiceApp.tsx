import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';
import ReactDOM from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import { themes } from '@/environment/environment.prod';
import { ThemeProvider } from 'common-lib';
import i18next from 'i18next';
import { SwipeableDrawer } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

const MySwal = withReactContent(Swal);

interface AlertOptions {
    title?: string | React.ReactNode;
    message?: string | React.ReactNode;
    cssClass?: string;
    acceptAction?: () => void;
    cancelAction?: () => void;
    hasCancel?: boolean;
    backdrop?: boolean;
    didOpenAction?: Function;
}

interface ToastOptions {
    message: string | React.ReactNode;
    durationMs?: number;
    position?: 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start' | 'top' | 'bottom' | 'center';
    cssClass?: string;
    level?: 'success' | 'error' | 'warn' | 'info';
}

export const AlertWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider themes={themes}>
            <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
        </ThemeProvider>
    );
};

const AlertServiceApp = {
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
            allowOutsideClick: true,
            allowEscapeKey: true,
            backdrop: true,
            didOpen: () => {
                const confirmBtn = document.querySelector('.swal2-confirm') as HTMLButtonElement;
                const cancelBtn = document.querySelector('.swal2-cancel') as HTMLButtonElement;

                confirmBtn?.addEventListener('click', () => {
                    if (acceptAction) acceptAction();
                    MySwal.close();
                });

                cancelBtn?.addEventListener('click', () => {
                    if (cancelAction) cancelAction();
                    MySwal.close();
                });
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

        root.render(<AlertWrapper>{component}</AlertWrapper>);

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
    },
    showBottomModal: async ({
        title,
        message,
        acceptAction,
        cancelAction,
        hasCancel = false,
        backdrop = true,
        didOpenAction = () => { }
    }: AlertOptions) => {
        await MySwal.fire({
            title: <>{title}</>,
            html: <>{message}</>,
            showCancelButton: hasCancel,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            backdrop: backdrop,
            customClass: {
                popup: 'bottom-slide-alert alert-complete',
            },
            didOpen: () => {
                setTimeout(() => {
                    didOpenAction();
                }, 200);
                const confirmBtn = document.querySelector('.swal2-confirm') as HTMLButtonElement;
                const cancelBtn = document.querySelector('.swal2-cancel') as HTMLButtonElement;

                confirmBtn?.addEventListener('click', () => {
                    if (acceptAction) acceptAction();
                    MySwal.close();
                });

                cancelBtn?.addEventListener('click', () => {
                    if (cancelAction) cancelAction();
                    MySwal.close();
                });
            },
        });
    },
    showFromBottomComponentModal: ({
        component,
        open = true,
        onClose = () => { },
        cssClass = '',
        disableSwipeToClose = false,
    }: {
        component: React.ReactNode;
        open?: boolean;
        onClose?: () => void;
        cssClass?: string;
        disableSwipeToClose?: boolean;
    }) => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = ReactDOM.createRoot(container);

        const handleClose = () => {
            root.unmount();
            container.remove();
            onClose();
        };

        root.render(
            <MemoryRouter>
                <AlertWrapper>
                    <SwipeableDrawer
                        anchor="bottom"
                        open={open}
                        onClose={handleClose}
                        onOpen={() => { }}
                        disableSwipeToOpen={disableSwipeToClose}
                        PaperProps={{
                            className: cssClass
                        }}
                    >
                        {component}
                    </SwipeableDrawer>
                </AlertWrapper>
            </MemoryRouter>
        );
    }
};

export default AlertServiceApp;
