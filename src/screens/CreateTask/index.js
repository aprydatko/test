import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Alert from '../../components/Alert';
import CreateTask from './CreateTaskForm';

const CreateTaskComponent = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (data) => {
        var form = new FormData();
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("text", data.text);
        form.append("status", data.staus);

        const options = {
            method: 'POST',
            data: form,
            url: '/create?developer=NAME',
        };

        axios(options)
            .then(res => {
                if(res.data.status === 'ok') {
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false);
                        props.history.push('/');
                    }, 2000);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={classes.root}>
            <Alert 
                open={open}
                handleClose={handleClose}
                title={'Вы успешно создали новую задачу!'}
                description={'Благодарим за сотрудничество. Через 2 секунды Вы будете перенаправлены на главную страницу!'}
            />
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
