const BASE_URL = 'https://localhost:3001';

const handleServerResponse = (res) => {
    return res.okay ? res.json() : Promise.reject(`Error:${res.status}`);
}


const addItem = ({ name, weather, ImageUrl }) => {
    return fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
            name, weather, ImageUrl

        })
    }).then(handleServerResponse);
};

const getItemList = () => {
    return fetch(`${BASE_URL}/items`, {
        headers: {
            'content-Type': 'application/json'
        },
    }).then(handleServerResponse);
};

const api = { addItem, getItemList };

export default api;