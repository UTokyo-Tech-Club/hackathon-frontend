import React from 'react';
import TweetInterface from "../../interfaces/Tweet";
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';


interface Props {
    tweet: TweetInterface;
}

const Tweet: React.FC<Props> = ({ tweet }) => {
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
                <p>{tweet.content}</p>
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