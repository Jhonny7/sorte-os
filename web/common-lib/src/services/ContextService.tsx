import { BrowserRouter } from "react-router-dom";

type WrapperFC = React.ComponentType<{ children: React.ReactNode }>;

export let ExternalWrapper: WrapperFC = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

// Permite sobreescribir el wrapper por uno custom
const configureAlertService = (options: { Wrapper?: WrapperFC } = {}) => {
  if (options.Wrapper) ExternalWrapper = options.Wrapper;
};

export default configureAlertService;
