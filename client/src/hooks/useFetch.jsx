import React, { useState, useEffect } from 'react'

const APIKEY = import.meta.env.VITE_GIPHY_API;
const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");
    
    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword])
    
    const fetchGifs = async () => {

        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();
            // console.log(response);

            setGifUrl(data[0]?.images?.downsized_medium?.url);

        } catch (error) {
            setGifUrl('https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif');
            console.log(error);
        }
    }

    return gifUrl;
}

export default useFetch;