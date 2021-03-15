import React from 'react'
import FeatureBox from './FeatureBox';
import featureImage from '../images/feature_1.png';
import featureImage1 from '../images/feature_2.png';
import featureImage2 from '../images/feature_3.png';
const Features = () => {
    return (
        <div>
            <div id="features">
                <h1><em>Features</em></h1>
                <div className="a-container">
                    <FeatureBox image={featureImage} title="Reminders" text="Set reminders for various events, plan your schedule" />
                    <FeatureBox image={featureImage1} title="Postive Articles" text="Feeling negative? Feel good again by reading productive articles"/>
                    <FeatureBox image={ featureImage2} title="Make Notes" text="Plan your checklist for each day"/>
                </div>
            </div>
        </div>
    )
}

export default Features
