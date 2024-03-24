import React from 'react';
import TweetInterface from "../../interfaces/Tweet";
import './index.css';
import Content from './Content';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: "header",
            data: {
                text: "Header...",
            },
        },
        {
            type: "paragraph",
            data: {
                text: "text...",
            },
        },
    ],
};

const Tweet: React.FC<{tweet: TweetInterface;}> = ({ tweet }) => {
    return (
        <div className='tweet'>
            <div className='profile'>
                <FontAwesomeIcon className='icon' icon={faUser} />
                <p>Profile</p>
                <button className='bookmark'>
                    <FontAwesomeIcon icon={faBookmark} />
                </button>
            </div>

            <div className='content'>
                <Content data={DEFAULT_INITIAL_DATA}/>
            </div>

            <div className='meta'>
                <button>
                    <FontAwesomeIcon className='icon' icon={faComment} />
                    <p>4</p>
                </button>

                <button>
                    <FontAwesomeIcon className='icon' icon={faHeart} />
                    <p>4</p>
                </button>

                <button>
                    <FontAwesomeIcon className='icon' icon={faArrowRightArrowLeft} />
                    <p>4</p>
                </button>

                <button>
                    <FontAwesomeIcon className='icon' icon={faEye} />
                    <p>4</p>
                </button>
            </div>


        </div>
    );
}

export default Tweet;