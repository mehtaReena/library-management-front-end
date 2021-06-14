import { Button, CircularProgress, makeStyles, Paper, TextField } from "@material-ui/core";
import { useState } from "react";

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
    }
});


export default function Login() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)


    const classes = useStyles()
    const loginurl = 'http://localhost:3300/auth/login'
    let submitForm = async () => {
        setLoading(true)
        let formData = new FormData()

        formData.append("email", email)
        formData.append("password", password)


        let response = await fetch(loginurl, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }

        });
        let data = await response.json
        if (response.status !== 200) {

            setLoading(false)
            return
        }

        console.log(data)
        setLoading(false)
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

        </Paper>
    )
}