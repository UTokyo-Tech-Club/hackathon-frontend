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
        <div className='wrapper'>
            <div className='profile'>
                <FontAwesomeIcon className='profile-image' icon={faUser} />
                <p className='profile-name'>Profile</p>
                <button className='bookmark-button'>
                    <FontAwesomeIcon icon={faBookmark} />
                </button>
            </div>

            <div className='content'>
                <Content data={DEFAULT_INITIAL_DATA}/>
            </div>

            <div className='metadata'>
                <button className='metadata-button'>
                    <FontAwesomeIcon className='metadata-icon' icon={faComment} />
                    <p className='metadata-counter'>4</p>
                </button>

                <button className='metadata-button'>
                    <FontAwesomeIcon className='metadata-icon' icon={faHeart} />
                    <p className='metadata-counter'>4</p>
                </button>

                <button className='metadata-button'>
                    <FontAwesomeIcon className='metadata-icon' icon={faArrowRightArrowLeft} />
                    <p className='metadata-counter'>4</p>
                </button>

                <button className='metadata-button'>
                    <FontAwesomeIcon className='metadata-icon' icon={faEye} />
                    <p className='metadata-counter'>4</p>
                </button>
            </div>


        </div>
    );
}

export default Tweet;