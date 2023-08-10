import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://youtube-v31.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': 'f8ce76f6c8msh8ae72f86edcc667p1569cbjsn93db04800c50',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
});
