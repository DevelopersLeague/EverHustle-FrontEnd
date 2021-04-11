import React from 'react'
import '../Styles/articles.css'
const Stories = ({display}) => {
    return (
        <section className="stories">
                {
                    display.map((story) => {
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
    )
}

export default Stories
