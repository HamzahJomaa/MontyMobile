import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';


import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import UsersPage from "./pages/Users";
import CrudPage from "./pages/CRUD_Page";
import LoginPage from "./pages/login";

class App extends React.Component {
  render() {
    const { authenticated, id } = this.props;
    if (authenticated) {
      return (
        <Sidebar>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/form" element={<CrudPage />} />

              {/* Add other private routes */}
            </Routes>
          </Router>
        </Sidebar>
      );
    } else {
      return (
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      );
    }
  }
}


// Map Redux state to component props
const mapStateToProps = (state) => {
  return {
    authenticated: state?.auth?.authenticated,
    id: state?.auth?.user?.id,
  };
};

// Connect the component to Redux store
export default connect(mapStateToProps)(App);


