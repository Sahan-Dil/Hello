import React,{ useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';

const alankey = '239fcfcac8ccc9a278160f56606c22af2e956eca572e1d8b807a3e2338fdd0dc/stage';

const NewsApp = () => {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() =>{
        alanBtn({
            key: alankey,
            onCommand: ({ command, articles }) =>{
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                }
                
            }
        })
    },[])

    return (
        <div>
            <h1 style={{textAlign:'center', color:'whitesmoke', fontSize:'40px',marginTop:'20px'}}>'HELLO' News Application Section</h1>
            <NewsCards articles={newsArticles} />
        </div>
    );
}

export default NewsApp;
