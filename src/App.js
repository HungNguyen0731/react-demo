import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';
import Modal from "./components/Modal";
// defaultTheme
import themes from 'themes';
import { ToastContainer } from "react-toastify";
import {
    PermissionsProvider,
    AuthorizedRoute,
    AuthorizedSection
  } from "@tshio/react-router-permissions";
  import { connect } from 'react-redux';
// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //
const authorizationStrategy = (currentRoles, requirement) => {
    return currentRoles.find(role => role === requirement);
  };
  // it's possible to override strategy for single route
  const loginAuthorizationStrategy = (currentRoles, requirement) => {
    return currentRoles && currentRoles.length;
  };
  
const App = ({ roles }) => {
    console.log(roles)
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <PermissionsProvider permissions={roles} authorizationStrategy={authorizationStrategy}>
      
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
                <Modal />
            </ThemeProvider>
            </PermissionsProvider>
        </StyledEngineProvider>
    );
    
};

const mapStateToProps = state => ({
    roles: state.PermissionRoles.authorization.roles
  });
export default connect(mapStateToProps)(App);
