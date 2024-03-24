import log from 'loglevel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const NavBar: React.FC = () => {
    return (
        <>
            <div className='profile'>
                <FontAwesomeIcon className='profile-image' icon={faUser} />
                <p className='profile-name'>Profile</p>
                <button className='bookmark-button'>
                    <FontAwesomeIcon icon={faUser} />
                </button>
            </div>
        </>
    );
}

export default NavBar;