import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, getTasksCount } from '../../redux/tasks';

import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';

import SortSelect from '../../components/Select';
import Loading from '../../components/Loading';
import NoPhoto from '../../assets/no-photo.png';

import useStyles from './styles';

const Tasks = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const countPage = useSelector(state => state.tasks.tasksCount);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagePagination, setPagePagination] = useState(1);
    const token = localStorage.getItem('token');

    const getPagination = () => {
        let paginationCount = 0;
        let lastPage = 0;
    
        for (let index = countPage; index > 0; index = index - 3) {
            if (index < 3) {
                lastPage = index
                paginationCount += 1;
                break;
            }
            paginationCount += 1;
        }
        
        return paginationCount;
    }

    useEffect(() => {
        setLoading(true);
        axios.get('?developer=Name&sort_field=name&sort_direction=asc&page=1')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 'ok') {
                        dispatch(getTasks(res.data.message.tasks));
                        dispatch(getTasksCount(res.data.message.total_task_count));
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

    const handleEditClick = (id) => {
        props.history.push(`/edit-task/${id}-${pagePagination}`);
    }

    const handlePaginationChange = (e) => {
        const page = e.target.ariaLabel.replace('Go to page ', '');
        setPagePagination(page);

        setLoading(true);
        axios.get(`?developer=Name&sort_field=name&sort_direction=asc&page=${page}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 'ok') {
                        dispatch(getTasks(res.data.message.tasks));
                        dispatch(getTasksCount(res.data.message.total_task_count));
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
    }

    return (
        <div className={classes.root}>
            <div className={classes.tasks}>
                <Typography className={classes.header} variant="h5" component="h1" gutterBottom>Список задач</Typography>
                <SortSelect />

                {error && <Alert severity="error">{error}</Alert>}
                {loading && <Loading />}

                {!loading && tasks.map(({ username, email, id, status, image_path, text }, index) => (
                    <div className={classes.task} key={id}>
                        <div className={classes.headerWrap}>
                            <Typography variant="h6" component="h6" gutterBottom>Таск {username}</Typography>
                            <div className={classes.iconsWrap}>
                                {token && <EditIcon onClick={() => handleEditClick(id)} className={classes.deleteIcon} />}
                            </div>
                        </div>
                        <div className={classes.imageRoot}>
                            <div>
                                <img className={classes.img} src={image_path ? image_path : NoPhoto} />
                            </div> 
                        </div>
                        <div className={classes.taskItem}>
                            <div>Имя пользователя:</div>
                            <div>{username}</div>
                        </div>
                        <div className={classes.taskItem}>
                            <div>E-mail:</div>
                            <div>{email}</div>
                        </div>
                        <div className={classes.taskItem}>
                            <div>Текст задачи:</div>
                            <div>{text}</div>
                        </div>
                        <div className={classes.taskItem}>
                            <div>Статус задачи:</div>
                            <div>{status}</div>
                        </div>
                    </div>
                ))}

                <div className={classes.pagination}>
                    <Pagination
                        onChange={(e) => handlePaginationChange(e)}
                        count={getPagination()} 
                        hideNextButton={true}
                        hidePrevButton={true}
                        color="primary" 
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Tasks);
