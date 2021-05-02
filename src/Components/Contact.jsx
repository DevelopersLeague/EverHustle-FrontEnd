import React from 'react'
import GitHubButton from 'react-github-btn'

const Contact = () => {
    return (
        <div id="contact">
            {/* <h3>Contact us</h3> */}
            {/* <div className="contact-input"> */}
                <GitHubButton href='https://github.com/DevelopersLeague/EverHustle-FrontEnd'
                data-size='large'
                data-show-count='true'
                aria-label='Star EverHustle on GitHub ❤'
                type='stargazers'
                className="px-4 mx-0"
                ></GitHubButton>
                <h4 className="text-light text-bold">Star EverHustle on GitHub ❤</h4>
                
            {/* </div> */}
        </div>
    )
}

export default Contact
