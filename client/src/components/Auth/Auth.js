import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import axios from "axios";
import Icon from './icon'
import { signin, signup } from '../../actions/auth.js'
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input.js";
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setisSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
        console.log(e);
    };
    const handleChange = (e) => {
        console.log(formData.firstName)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const switchMode = () => {
        setisSignUp((previsSignUp) => !previsSignUp);
    };

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword);

    // ?. (Optional chaining operator) ensures that we dont get any error if we do not have res as an object
    const googleSuccess = async (res) => {
        console.log(res)
        const result = jwtDecode(res?.credential);
        // const token = res?.clientId;

        try {
            dispatch({ type: 'AUTH', data: { result } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleError = (error) => {
        // console.log(error)
        console.log("Google Sign In was unsuccessful. Try Again Later")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            type="email"
                            handleChange={handleChange}
                        />
                        <Input
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                type="password"
                                handleChange={handleChange}
                            />
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="348170096697-kr430vlmp4noe01d81kind40t7ml036d.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Sign in with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onError={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? "Already have an account? Sign In"
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
