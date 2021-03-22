import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signIn, logOut } from '../../redux/auth';
import { makeStyles, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Auth from './Auth';
import Loading from '../../components/Loading';

const AuthComponent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    dispatch(signIn({token: '123'}));

    const handleSubmit = (data) => {
        let formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);

        setLoading(true);
        axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Name', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    let signData = {
                        token: res.data.message.token,
                        ...data
                    }
                    localStorage.setItem('token', res.data.message.token);
                    // dispatch(signIn(signData));
                    setError(false);
                    setLoading(false);
                    setTimeout(() => props.history.push('/'), 1000);
                } else {
                    const message = {
                        name: res.data.message.name,
                        password: res.data.message.password
                    }

                    setError(message);
                    setLoading(false);
                }
            })
            .catch(err =>{
                setLoading(false);
                setError('Ошибка загрузки');
            });
    }
    return (
        <div className={classes.root}>
            <Typography className={classes.typography} variable="h1" component="h1">Форма для входа</Typography>
           {!loading ?  <Auth onSubmit={handleSubmit} messageError={error} /> : <Loading />}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        width: 500,
        margin: '0 auto',
    },
    typography: {
        fontSize:  22,
        marginTop: 24,
    }
})

export default withRouter(AuthComponent)
