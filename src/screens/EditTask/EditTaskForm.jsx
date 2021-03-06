import React from 'react'
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'

const CreateTask = (props) => {
    const { handleSubmit, reset } = props
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
                        component="input"
                        type="text"
                        placeholder="Название пользователя"
                    />
                    </div>
                </div>
                <div>
                    <label className={classes.label}>Email: </label>
                    <div>
                    <Field
                        className={classes.field}
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Ведите свой Email"
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
                        component="input"
                        type="number"
                        placeholder="Статус задачи"
                    />
                    </div>
                </div>
                <div className={classes.btnWrap}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Редактировать
                    </Button>
                    <Button  color="primary" onClick={reset}>
                        Очистить все поля
                    </Button>
                </div>
                </form>
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
    }
})

export default reduxForm({
    form: 'EditTask'  
})(CreateTask)
