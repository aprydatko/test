import { makeStyles } from '@material-ui/core';

export default makeStyles({
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
        '& > div': {
            marginBottom: 8,
        }
    },
    label: {
        display: 'block',
        fontSize: 14,
        marginBottom: 6,
    },
    field: {
        width: '100%',
    }
});