import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from '@env';

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query)=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '1a4043f786msh332bf52cbb75c98p1fdf39jsn60af39ebda83',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }, 
        params: {...query},
        // params: {query: 'Python developer in Texas, USA', page: '1', num_pages: '1'},
    };

    const fetchData = async ()=>{
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);

    const refetch = ()=>{
        setIsLoading(true);
        fetchData();
    }

    return {
        data,
        isLoading,
        error,
        refetch,
    }
}

export default useFetch;
