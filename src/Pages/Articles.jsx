import React, { useEffect, useState } from 'react'
import Contact from '../Components/Contact'

import '../Styles/articles.css'
const Articles = () => {

    const [data, setData] = useState([])
    const [loading, isLoading] = useState(true)
    // const display = productive;
    const url1 = 'https://hn.algolia.com/api/v1/search?query=productivity&page=0';
    const url2 = 'https://hn.algolia.com/api/v1/search?query=selfhelp&page=0';
    const url3 = 'https://hn.algolia.com/api/v1/search?query=motivate&page=0';
    
    const fetchSingle = async () => {
        try {
            const response = await fetch(url1)
            const data = await response.json()
            setData(data.hits)
            isLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setData(data.hits)
            isLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    
    useEffect(() => {
        fetchSingle()
    }, [])

    
    if (loading)
    {
        return<div className="loading"></div>
    }
    return (
        <>
            <header className="header text-center mt-4 pt-4 article-header">
                <div>
                    <h3>Articles</h3>
                    <div className="underline mx-auto"></div>
                </div>
            </header>
            {/* {console.log(productive)} */}
            
            <div className="btn-container">
                <button className="filter-btn" onClick={() => {
                    fetchData(url1)
                    isLoading(true)
                }}>Productivity</button>
                <button className="filter-btn" onClick={() => {
                    fetchData(url2)
                    isLoading(true)
                }}>Self-Help</button>
                <button className="filter-btn" onClick={() => {
                    fetchData(url3)
                    isLoading(true)
                }}>Motivation</button>
            </div>
            <div className="mega_wrapper">
            <section className="stories">
                {
                    data.map((story) => {
                    const { objectID, title, num_comments, url, author } = story;
                    
                        return (
                            <article className="story" key={objectID}>
                                <h4 className="title">{title}</h4>
                                <p className="info">
                                    <span>{author} | </span> {num_comments} {' '}
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
            </div>

            <Contact/>
        </>
    )
}

export default Articles
