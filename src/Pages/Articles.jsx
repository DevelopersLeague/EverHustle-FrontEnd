import React, { useEffect, useState } from 'react'
import { useFetch } from "../Hooks/UseFetch";
import '../Styles/articles.css'
const Articles = () => {

    const [productive, setProductive] = useState([])
    const [selfhelp, setSelfhelp] = useState([])
    const [motivation, setMotivation] = useState([])

    const [data, setData] = useState([])

    const [loading1, isLoading1] = useState(true)
    const [loading2, isLoading2] = useState(true)
    const [loading3, isLoading3] = useState(true)
    const display = productive;
    const url1 = 'https://hn.algolia.com/api/v1/search?query=productivity&page=0';
    const url2 = 'https://hn.algolia.com/api/v1/search?query=selfhelp&page=0';
    const url3 = 'https://hn.algolia.com/api/v1/search?query=motivation&page=0';
    
    
    const fetchProductivity = async (url) => {
        // isLoading1(true)
        try {
            const response = await fetch(url)
            const data = await response.json()
            setProductive(data.hits)
            isLoading1(false)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSelfHelp = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setSelfhelp(data.hits)
            isLoading2(false)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMotivation = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setMotivation(data.hits)
            isLoading3(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProductivity(url1)
        fetchSelfHelp(url2)
        fetchMotivation(url3)
    }, [url1, url2, url3, display])

    
    if (loading1 || loading2 || loading3)
    {
        return<div className="loading"></div>
    }
    return (
        <>
            <header className="header text-center my-4 py-4">
                <div className="heading_text">
                    <h3>Articles</h3>
                </div>
            </header>
            {/* {console.log(productive)} */}

            <div className="btn-container">
                <button className="filter-btn">Productivity</button>
                <button className="filter-btn" onClick={()=>{fetchProductivity('https://hn.algolia.com/api/v1/search?query=selfhelp&page=0')}}>Self-Help</button>
                <button className="filter-btn">Motivation</button>
            </div>

            <section className="stories">
                {
                    productive.map((story) => {
                    const { objectID, title, num_comments, url, author } = story;
                    
                        return (
                            <article className="story" key={objectID}>
                                <h4 className="title">{title}</h4>
                                <p className="info">
                                    <span>{author} | </span> {num_comments}
                                    comments
                                </p>
                                <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="read-link"
                                >
                                Read more
                                </a>
                            </article>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Articles
