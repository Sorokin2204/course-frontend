import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Business, BusinessCenter, Group, TableView } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authUser } from '../../../redux/actions/user/authUser';
import { resetAuthUser } from '../../../redux/slices/user.slice';

const drawerWidth = 240;

function AdminLayout(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {
    authUser: { data: authUserData, error: authUserError, loading: authUserLoading },
  } = useSelector((state) => state.user);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(authUser());
  }, []);
  React.useEffect(() => {
    if (authUserData?.role == 'user') {
      navigate('/list/dashboard');
    }
  }, [authUserData]);
  const menu = [
    {
      name: 'Пользователи',
      icon: <Group />,
      path: '/admin/users',
    },
    {
      name: 'Виды бизнеса',
      icon: <TableView />,
      path: '/admin/types-of-business',
    },
    {
      name: 'Список бизнесов',
      icon: <BusinessCenter />,
      path: '/admin/business-list',
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menu.map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            onClick={() => {
              navigate(text.path);
            }}>
            <ListItemButton selected={pathname == text.path}>
              <ListItemIcon
                sx={{
                  '& svg': {
                    ...(pathname == text.path && { color: '#1976d2' }),
                  },
                }}>
                {text.icon}
              </ListItemIcon>
              <ListItemText
                primary={text.name}
                primaryTypographyProps={{
                  ...(pathname == text.path && { color: 'primary' }),
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  React.useEffect(() => {
    if (authUserError && !authUserLoading) {
      localStorage.removeItem('token');
      dispatch(resetAuthUser());
      navigate('/');
    }
  }, [authUserError]);
  return (
    authUserData?.role == 'admin' && (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div"></Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}>
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open>
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    )
  );
}

AdminLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminLayout;
