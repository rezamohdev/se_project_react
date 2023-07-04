const BASE_URL = 'http://localhost:3001';

const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}


// const addItem = ({ name, ImageUrl, weather }) => {
//     return fetch(`${BASE_URL}/items`, {
//         method: "POST",
//         headers: { 'content-Type': 'application/json' },
//         body: JSON.stringify({
//             name, ImageUrl, weather

//         })
//     }).then(handleServerResponse);
// };

const addItem = ({ name, imageUrl, weather }) => {
    return fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
            name, imageUrl, weather
        })
    }).then(handleServerResponse);
};

const removeItem = (id) => {
    return fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
        headers: { 'content-Type': 'application/json' },
    }).then(handleServerResponse);
};

const getItemList = () => {
    return fetch(`${BASE_URL}/items`, {
        headers: {
            'content-Type': 'application/json'
        },
    }).then(handleServerResponse);
};

const api = { addItem, removeItem, getItemList, };

export default api;