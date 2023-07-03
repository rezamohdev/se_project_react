const BASE_URL = 'https://localhost:3000';

const handleServerResponse = (res) => {
    return res.okay ? res.json() : Promise.reject(`Error:${res.status}`);
}


const addItem = ({ name, weather, ImageUrl }) => {
    return fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            name, weather, ImageUrl

        })
    }).then(handleServerResponse);
}

const api = { addItem };

export default api;