import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { connect } from 'react-redux';


class SearchAppBar extends React.Component {
    render() {
        return (
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${this.props.drawerWidth}px)` },
                    ml: { sm: `${this.props.drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={this.props.handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state?.auth?.user?.email,
    };
};

export default connect(mapStateToProps)(SearchAppBar);

