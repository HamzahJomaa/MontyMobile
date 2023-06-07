import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';

import { connect } from 'react-redux';
import { actions as authActions } from '../redux/auth';


class DrawerComponent extends React.Component {
    handleSignOut = () => {
        this.props.signOut();
    };


    render() {
        return (
            <div>
                <Toolbar />
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { window.location.href = "/" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                    <ListItemButton onClick={() => { window.location.href = "/users" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Users"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                    <ListItemButton onClick={() => { window.location.href = "/form" }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dynamic Form"} />
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={this.handleSignOut}>
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Signout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signOut: authActions.signOut
};

export default connect(null, mapDispatchToProps)(DrawerComponent);

