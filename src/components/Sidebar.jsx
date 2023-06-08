import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ToolbarComponent from "./toolbar"
import DrawerComponent from './Drawer';

const drawerWidth = 240;

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState((prevState) => ({
      mobileOpen: !prevState.mobileOpen,
    }));
  };

  render(){
    const { window, children } = this.props;
    const { mobileOpen } = this.state;

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ToolbarComponent handleDrawerToggle={this.handleDrawerToggle} drawerWidth={drawerWidth} />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, 
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DrawerComponent/>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <DrawerComponent/>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, width: "100%" }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  }
  
}


export default ResponsiveDrawer;