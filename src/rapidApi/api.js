import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://youtube-v31.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '57fdf0c0b6msh77754954949348fp1a0da7jsnc296030e650c',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
});
// export const request = axios.create({
//     baseURL: 'https://youtube-v31.p.rapidapi.com',
//     headers: {
//         'X-RapidAPI-Key': 'f8ce76f6c8msh8ae72f86edcc667p1569cbjsn93db04800c50',
//         'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
//     },
// });

export const short = axios.create({
    baseURL: 'https://youtube-v3-alternative.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '57fdf0c0b6msh77754954949348fp1a0da7jsnc296030e650c',
        'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com',
    },
});

export const category = axios.create({
    baseURL: ' https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: process.env.REACT_APP_YT_API_KEY,
    },
});
