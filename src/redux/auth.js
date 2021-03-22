const SIGN_IN = 'SIGN-IN';
const LOG_OUT = 'LOG-OUT';

const initialState = {
    user: {
        name: '',
        password: ''
    },
    token: '',
}

const Auth = (state = initialState, action) => {
    switch(action) {
        case SIGN_IN: {
            const user = { name: action.name, password: action.password };
            return {
                ...state,
                user,
                token: action.token,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                user: {
                    name: '',
                    password: '',
                },
                token: '',
            }
        }
        default:
            return state;
    }
}

export const signIn = (data) => ({type: SIGN_IN, data});
export const logOut = () => ({type: LOG_OUT});

export default Auth;