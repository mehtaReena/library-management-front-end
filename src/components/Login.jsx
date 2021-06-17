import { Button, CircularProgress, makeStyles, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import HowToRegSharpIcon from '@material-ui/icons/HowToRegSharp';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
    container: {
        margin: 'auto',
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        padding: '12px',
        width: '50%',
        justifyContent: 'center'
    },
    input: {
        display: 'none',
    },
    button: {
        padding: "9px",
        width: '30%',
        display: 'flex',
        justifySelf: 'end',
        fontSize: '14px'
    },
});


export default function Login() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const [error, setError] = useState('')

    const classes = useStyles()
    const loginurl = 'http://localhost:3300/auth/login'
    let submitForm = async () => {
        setLoading(true)
        let response = await fetch(loginurl, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password

            }),
            headers: { "Content-Type": "application/json" }

        });
        let data = await response.json()

        if (response.status !== 200) {
            console.log(data.message)
             setError(data.message)
            setLoading(false)
            return
        }

        else {

            console.log(" on Success!..", data.access_token);
            setLoading(false)
            window.localStorage.setItem('access_Token', data.access_token);
            window.localStorage.setItem('refresh_Token', data.refresh_token)
            history.push('/books')
        }
    }

    const clickHandler = () => {
        history.push('/signup')

    }

    return (
        <Paper elevation={2} className={classes.container}>
            <h1>Login</h1>
            {/* <form autoComplete='off'> */}

            <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' variant='outlined' />
            <TextField label='Password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' name='password' variant='outlined' />

            <Button
                type='raised'
                disabled={!email.length || !password.length}
                variant='contained'
                color='primary'
                onClick={submitForm}
            >
                {loading ? <CircularProgress size={23} /> : "Login"}
            </Button>



            <Button
                variant="contained"
                color="secondary"
                fontSize="inherit"
                className={classes.button}
                startIcon={<HowToRegSharpIcon fontSize="inherit" />}
                onClick={clickHandler}
                endIcon={'signUp here'}
            />

            <p>
                {error}
            </p>

        </Paper>
    )
}