import * as React from 'react';
import { Avatar, Button, CssBaseline, IconButton, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Alert} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignInApi } from '../APIs/Auth';
import { connect } from 'react-redux';
import { actions } from '../redux/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const defaultTheme = createTheme();

class SignInPage extends React.Component {
  constructor(){
    super()
    this.state = {
      redirectToHome: false
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  };




  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')

    try {
      let result = await SignInApi()
      let user = result?.data?.find(item => item.email == email)
      if (!user){
        return toast.error("Email Doesn't Exists")
      }

      if (password !== user?.password){
        return toast.error("Wrong Password")
      }
      this.props.signIn(user);
      window.location.href = "/"

    } catch (e) {
      console.log(e)
    }
  };

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}



// Map Redux state to component props
const mapStateToProps = (state) => {
  return {
    authenticated: state?.auth?.authenticated,
    user: state?.auth?.user,
  };
};

// Map Redux actions to component props
const mapDispatchToProps = {
  signIn: actions.signIn,
};

// Connect the component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
