import React from 'react'
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import renderField from '../../components/UI-form/Input'

const required = text => text ? null : 'Обязательное поле';

const Auth = (props) => {
    const { handleSubmit, pristine, reset, submitting, messageError } = props
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
                    <label className={classes.label}>Пароль: </label>
                    <div>
                    <Field
                        className={classes.field}
                        name="password"
                        component={renderField}
                        type="password"
                        placeholder="Ведите свой Пароль"
                        validate={[required]}
                    />
                    </div>
                </div>
                <div className={classes.btnWrap}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={pristine || submitting}>
                        Войти
                    </Button>
                    <Button  color="primary" disabled={pristine || submitting} onClick={reset}>
                        Очистить все поля
                    </Button>
                </div>
                </form>
                {messageError && (
                    <div className={classes.errorWrap}>
                        <Alert severity="error">{messageError.username ? messageError.username : messageError.password}, попробуйте еще</Alert>
                    </div>
                )}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        marginTop: '26px',
    },
    typography: {
        marginTop: 24,
        marginBottom: 16,
    },
    btnWrap: {
        marginTop: 24,
        '& > button': {
            marginRight: '16px'
        }
    },
    form: {
        background: '#f5f5f5',
        padding: '8px 16px',
    },
    label: {
        display: 'block',
        fontSize: 14,
        marginBottom: 6,
    },
    field: {
        width: '100%',
    },
    error: {
        color: 'red'
    },
    errorWrap: {
        marginTop: 26,
    }
})

export default reduxForm({
    form: 'Auth'  
})(Auth)
