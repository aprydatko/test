import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { withRouter, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'

const Header = () => {
    const classes = useStyles();
    const isAdmin = localStorage.getItem('token');

    const handleClose = () => {
        localStorage.setItem('token', '');
    }
    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h1"><Link to={'/'}>Задачи</Link></Typography>

            <div className={classes.authWrap}>
                <Link className={classes.link} to={'/create-task'}>Добавить таск</Link>
                {!isAdmin && <Link className={classes.link}  to={'/auth'}>Вход для администратора</Link>}
                {isAdmin && (
                    <>
                        <div className={classes.link}>Добро пожаловать, Админ</div>
                        <Link className={classes.link} onClick={handleClose}>Выход</Link>
                    </>
                )}
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#f5f5f5',
        padding: '16px'
    },
    authWrap: {
        display: 'flex',
    },
    link: {
        display: 'block',
        padding: '0 16px',
    }
})

export default withRouter(Header);
