//atoms
export { default as Button } from './components/atoms/button/Button';
export { default as Icon } from './components/atoms/icon/Icon';
export { default as Spinner } from './components/atoms/spinner/Spinner';
export { default as Input } from './components/atoms/input/Input';
export { default as Avatar } from './components/atoms/avatar/Avatar';

//atoms input individual
export { default as InputCheckbox } from "./components/atoms/input/InputCheckbox"

//molecules
export { default as MenuItem } from './components/molecules/menu_item/MenuItem';
export { default as SquareButton } from './components/molecules/square_button/SquareButton';
export { default as Form } from './components/molecules/form/Form';
export { default as DragDrop } from './components/molecules/drag_drop/DragDrop';
export { default as CustomSwiper } from './components/molecules/swiper/CustomSwiper';
export { default as Progress } from './components/molecules/progress/Progress';
export { default as Qr } from './components/molecules/qr/Qr';
export { default as AvatarInformation } from './components/molecules/avatar_information/AvatarInformation';

//organisims
export { default as Content } from './components/organisims/content/Content';
export { default as Header } from './components/organisims/header/Header';
export { default as Layout } from './components/organisims/layout/Layout';
export { default as HeaderApp } from './components/organisims/headerApp/HeaderApp';
export { default as LayoutApp } from './components/organisims/layoutApp/LayoutApp';
export { default as Sidebar } from './components/organisims/sidebar/Sidebar';
export { default as SidebarApp } from './components/organisims/sidebarApp/SidebarApp';
export { default as DynamicTable } from './components/organisims/table/DynamicTable';

//context
export { ThemeProvider, useTheme } from './context/ThemeContext';
export { LanguageProvider, useLanguage } from './context/LanguageContext';

//routes
export { default as PrivateRoute } from './routes/PrivateRoute';
export { default as PublicRoute } from './routes/PublicRoute';

//services
export { default as AlertService } from './services/AlertService';
export { default as configureAlertService } from './services/ContextService';
export { default as EventService } from './services/EventService';
export * from './services/HttpService';
export { default as LocalStorageEncryptService } from './services/LocalStorageEncrypt';
export { default as UtilService } from './services/UtilService';
export { default as LoadingService } from './services/LoadingService';

//translations
export { initTranslations, changeLanguage } from './i18n/i18n';

//hooks
export { default as useDeviceDetect } from './hooks/useDeviceDetect';
export { default as usePipeDate } from './hooks/usePipeDate';
export { default as useUserSession } from './hooks/useUserSession';

//types
export type { InputInterface } from "./types/InputInterface";