import { makeStyles } from '@material-ui/core';

export default makeStyles({
    root: {
        marginTop: 30,
        marginBottom: 30,
    },
    tasks: {
        width: 600,
        margin: '0 auto',
    },
    taskItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 1.6,
    },
    headerWrap: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    header: {
        marginBottom: 16,
    },
    task: {
        padding: '8px 16px 24px 16px',
        background: '#f5f5f5',
        marginBottom: 16,
        '&:hover': {
        }
    },
    imageRoot: {
        width: 100,
        float: 'left',
        marginRight: 16,
    },
    img: {
        width: '100%',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    }
})