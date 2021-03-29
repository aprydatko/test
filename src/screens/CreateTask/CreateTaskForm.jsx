import React from 'react'
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import renderField from '../../components/UI-form/Input';

import useStyles from './styles';

const required = value => value ? null : 'Обязятельно';

const CreateTask = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div>
                    <label className={classes.label}>Название пользователя: </label>
                    <div>
                    <Field
                        className={classes.field}
                        name="username"
                        component={renderField}
                        type="text"
                        placeholder="Название пользователя"
                        validate={[required]}
                    />
                    </div>
                </div>
                <div>
                    <label className={classes.label}>Email: </label>
                    <div>
                    <Field
                        className={classes.field}
                        name="email"
                        component={renderField}
                        type="email"
                        placeholder="Ведите свой Email"
                        validate={[required]}
                    />
                    </div>
                </div>
                <div>
                    <label className={classes.label}>Текст таска: </label>
                    <div>
                        <Field className={classes.field} name="text" component="textarea" />
                    </div>
                </div>
                <div>
                    <label className={classes.label}>Статус задачи: </label>
                    <div>
                    <Field
                        className={classes.field}
                        name="status"
                        component={renderField}
                        type="number"
                        placeholder="Статус задачи"
                    />
                    </div>
                </div>
                <div className={classes.btnWrap}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={pristine || submitting}>
                        Создать
                    </Button>
                    <Button  color="primary" disabled={pristine || submitting} onClick={reset}>
                        Очистить все поля
                    </Button>
                </div>
                </form>
        </div>
    )
}

export default reduxForm({
    form: 'CreateTask'  
})(CreateTask)
