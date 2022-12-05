import axios from 'axios';
import { useState, useEffect } from 'react';

const useSerLoginApi = (token) => {

    const [isLoading, setIsLoading] = useState(true); // 로딩 유무
    const [errorData, setErrorData] = useState(''); // 에러 저장
    const [tokenData, setTokenData] = useState(); // 데이터 저장

    useEffect(() => {
        const axiosData = async () => {
            try {
                await axios.get('/together/login/oauth2/code/naver', {params:{access_token:token}} )
                    .then((response) => {
                        console.log(response.data);
                        setTokenData(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch(error) {
                setErrorData(error);
                console.log(errorData);
            }
        }

        if(isLoading) {
            axiosData();
        }
    }, [token])
    
    return tokenData;
}

export default useSerLoginApi;