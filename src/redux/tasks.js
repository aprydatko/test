const GET_TASKS = 'GET-TASKS';
const GET_TASKS_COUNT = 'GET-TASKS-COUNT';

const CHANGE_SORT_TYPE = 'CHANGE-SORT-TYPE';

const initialState = {
    tasks: [],
    tasksCount: 0,
    sortField: 'username',
    sortDirection: 'ASC',
    page: 1,
}

const Tasks = (state = initialState, action) => {
    switch(action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case GET_TASKS_COUNT: {
            return {
                ...state,
                tasksCount: action.tasksCount
            }
        }
        case CHANGE_SORT_TYPE: {
            return {
                ...state,
                sortField: action.sortField,
            }
        }
        default:
            return state
    }
}


export const getTasks = (tasks) => ({type: GET_TASKS, tasks});
export const getTasksCount = (tasksCount) => ({type: GET_TASKS_COUNT, tasksCount});
export const changeSortField = (sortField) => ({type: CHANGE_SORT_TYPE, sortField});

export default Tasks;