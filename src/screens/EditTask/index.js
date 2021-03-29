import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import EditTaskForm from './EditTaskForm';
import Loading from '../../components/Loading';

const EditTaskComponent = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [task, setTask] = useState({});

    let initialValues = {
        ...task
    }

    useEffect(() => {
        const params = props.match.params.id.split('-');
        setLoading(true);
        axios.get(`?developer=Name&sort_field=name&sort_direction=asc&page=${params[1]}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 'ok') {
                        const task = res.data.message.tasks.find(t => t.id == params[0]);
                        setTask(task)
                        setError(false);
                        setLoading(false);
                    } else {
                        setError(res.data.message);
                        setLoading(false);
                    }
                }
            })
            .catch(err =>{
                setLoading(false);
                setError('Ошибка загрузки');
            });
    }, []);


    const handleSubmit = (data) => {
        const params = props.match.params.id.split('-');
        var form = new FormData();
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("text", data.text);
        form.append("status", data.staus);
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

        const options = {
            method: 'POST',
            data: form,
            url: `/edit/${params[0]}?developer=Name&sort_field=name&sort_direction=asc&page=${params[1]}`,
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
            <Typography className={classes.typography} variant="h5" component="h1">Редактировать таск</Typography>
            {!loading ? <EditTaskForm onSubmit={handleSubmit} initialValues={initialValues} /> : <Loading />}
            {error && <Alert>Ошибка загрузка</Alert>}
             
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        width: 400,
        margin: '16px auto',
    },
})

export default withRouter(EditTaskComponent);
