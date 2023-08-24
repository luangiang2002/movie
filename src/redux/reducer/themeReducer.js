import { CHANGE_THEME } from '../actionType';

const userInfo = JSON.parse(localStorage.getItem('watch-user'));
const newState = {
    mode: userInfo.interfaceMode,
};

export const themeReducer = (state = newState, action) => {
    const { payload, type } = action;

    switch (type) {
        case CHANGE_THEME:
            localStorage.setItem(
                'watch-user',
                JSON.stringify({
                    ...userInfo,
                    interfaceMode: payload,
                }),
            );
            return {
                mode: payload,
            };
        default:
            return state;
    }
};
