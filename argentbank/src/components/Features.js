import React from 'react';
import styled from 'styled-components'
import chat from '../assets/icon-chat.png'
import money from '../assets/icon-money.png'
import security from '../assets/icon-security.png'

function Features () {

    const  FeaturesWrapper = styled.div`
    .features {
      display: flex;
      flex-direction: column;
    }
    
    @media (min-width: 920px) {
      .features {
        flex-direction: row;
      }
    }

    .feature-icon {
      width: 100px;
      border: 10px solid #00bc77;
      border-radius: 50%;
      padding: 1rem;
    }
    
    .feature-item {
      flex: 1;
      padding: 2.5rem;
    }
    
    .feature-item-title {
      color: #222;
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
`
        const infos = [
            {
                id: 1,
                text: 'You are our #1 priority',
                icon: chat,
                desc:' Need to talk to a representative? You can get in touch through our\n' +
                    '            24/7 chat or through a phone call in less than 5 minutes.'
            },
            {
                id: 2,
                text: 'More savings means higher rates',
                icon:  money,
                desc:'The more you save with us, the higher your interest rate will be!\n'
            },
            {
                id: 3,
                text: 'Security you can trust',
                icon: security,
                desc:'We use top of the line encryption to make sure your data and money\n' +
                    '            is always safe.'
            },
        ]
    return (
        <FeaturesWrapper>
        <section className="features">
            <h2 className="sr-only">Features</h2>
                {infos.map((info) => {
                    return (
                        <div className="feature-item">
                            <img src={info.icon} alt="Chat Icon" className="feature-icon"/>
                            <h3 className="feature-item-title">{info.text}</h3>
                            <p>
                                {info.desc}
                            </p>
                        </div>
                    )
                })}

            </section>
        </FeaturesWrapper>
            );

}

    export default Features;
