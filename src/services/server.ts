import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getArtistPage = async (artist: string) => {
    const response = await axios.get(`${baseUrl}/${artist}`)
    return response.data
}

const getSongPage = async (artist: string, song: string) => {
    const response = await axios.get(`${baseUrl}/${artist}/${song}`)
    return response.data
}

const search = async (query: string) => {
    const response = await axios.get(`${baseUrl}/search/${query}`)
    return response.data
}


export default {
    getArtistPage,
    getSongPage,
    search
}