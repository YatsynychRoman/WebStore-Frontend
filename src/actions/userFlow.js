import {SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from '../types';

import requester from "../factories/requester";

export function signUp(userData, staySigned) {
    return async dispatch => {
        try {
            const tokens = JSON.stringify({
                accessToken: userData.tokenPair?.accessToken,
                refreshToken: userData.tokenPair?.refreshToken
            });
            const user = {
                name: userData.name,
                surname: userData.surname,
                login: userData.login,
                email: userData.email,
                id: userData.id,
                avatar_url: userData.avatar_url,
                role: userData.role
            };

            staySigned ? localStorage.setItem('tokens', tokens) : sessionStorage.setItem('tokens', tokens);

            JSON.parse(localStorage.getItem('staySigned')) ? localStorage.setItem('tokens', tokens) : sessionStorage.setItem('tokens', tokens);

            dispatch({type: SIGN_IN_SUCCESS, payload: user});
        } catch (e) {
            console.log(e);
        }
    };
}

export function signUpByToken(history, signOut) {
    return async dispatch => {
        try {
            const {data: {user}} = await requester('post', 'http://localhost:3000/auth/getUserByAccessToken', {}, history, signOut)

            dispatch({type: SIGN_IN_SUCCESS, payload: user});
        } catch (e) {
            console.log(e);
        }
    };
}

export function signOut() {
    return async dispatch => {
        try {
            localStorage.clear();
            sessionStorage.clear();
            dispatch({type: SIGN_OUT_SUCCESS});
        } catch (e) {
            console.log(e);
        }
    }
}
