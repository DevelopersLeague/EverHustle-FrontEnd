import React from 'react'

const FeatureBox = (props) => {
    return (
        <div>
            <div className="a-box">
                <div className="a-b-img">
                    <img src={props.image} alt="feature-image"/>
                </div>
                <div className="s-b-text">
                    <h3>{props.title} </h3>
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default FeatureBox
