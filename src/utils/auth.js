import { handleServerResponse } from './Api';
const BASE_URL = 'http://localhost:3001';

function request(url, options) {
    return fetch(url, options).then(handleServerResponse)
}

// signup
const signupUser = ({ name, avatar, email, password }) => {
    return request(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, email, password })
    })
}

const signinUser = ({ email, password }) => {
    return request(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    })
}

const checkToken = (token) => {
    return request(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        }
    })
}

const auth = { signupUser, signinUser, checkToken };

export default auth;