// const BASE_URL = 'https://my-json-server.typicode.com/rezamohdev/se_project_react';
const BASE_URL = 'http://localhost:3001';

export const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function request(url, options) {
    return fetch(url, options).then(handleServerResponse)
}

const addItem = ({ name, imageUrl, weather }, token) => {
    return request(`${BASE_URL}/items`, {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name, imageUrl, weather
        }),

    });

};

const removeItem = (id, token) => {
    return request(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
        headers: {
            'content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },

    });
};

const addItemLike = (id, token) => {
    return request(`${BASE_URL}/items/${id}/likes`, {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
}
const removeItemLike = (id, token) => {
    return request(`${BASE_URL}/items/${id}/likes`, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
}

const getItemList = () => {
    return request(`${BASE_URL}/items`, {
        headers: {
            'content-Type': 'application/json'
        },

    });
};

const api = { addItem, removeItem, addItemLike, removeItemLike, getItemList };

export default api;
