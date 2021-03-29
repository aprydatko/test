import React, { useState } from 'react';
import axios from 'axios';
import { getTasks } from '../redux/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { changeSortField } from '../redux/tasks';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';

import Loading from './Loading';

const SelectComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sortField = useSelector(state => state.tasks.sortField);
    const page = useSelector(state => state.tasks.page);
    const sortDirection = useSelector(state => state.tasks.sortDirection);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSortTypeChange = (event) => {
        const sortField = event.target.value;

        setLoading(true);
        axios.get(`?developer=Name&sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 'ok') {
                        dispatch(getTasks(res.data.message.tasks));
                        dispatch(changeSortField(sortField));
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
    };

    return (
        <div className={classes.root}>
            <div className={classes.sort}>Сортировка по: </div>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <Loading />}

            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortField}
                    onChange={handleSortTypeChange}
                    >
                    <MenuItem value={'username'}>По имени</MenuItem>
                    <MenuItem value={'email'}>По e-mail</MenuItem>
                    <MenuItem value={'status'}>По статусу</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sort: {
        fontSize: 16,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default SelectComponent
