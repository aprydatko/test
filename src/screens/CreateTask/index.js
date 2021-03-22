import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CreateTask from './CreateTaskForm';

const CreateTaskComponent = (props) => {
    const classes = useStyles();

    const handleSubmit = (data) => {
        var form = new FormData();
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("text", data.text);
        form.append("status", data.staus);

        const options = {
            method: 'POST',
            headers: { 'content-type': 'multipart/form-data' },
            data: form,
            url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=NAME',
        };

        axios(options)
            .then(res => {
                if(res.data.status === 'ok') {
                    props.history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.typography} variant="h5" component="h1">Добавить таск</Typography>
             <CreateTask onSubmit={handleSubmit} />
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        width: 400,
        margin: '16px auto',
    },
})

export default withRouter(CreateTaskComponent);
