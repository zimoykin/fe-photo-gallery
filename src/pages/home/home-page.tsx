import React from 'react';
import './home-style.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const profile = useSelector((state: RootState) => state.profile);

    return (
        <div className="home-container">
            <div className="home-box-container">
                {profile.user?.id && <div
                    className='gallery-box-container'
                    onClick={() => navigate('/gallery?userId=' + profile.user?.id)}>
                    {'Your gallery is here.'}
                </div>}
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum architecto molestiae. Porro rem iure itaque provident expedita, nulla sint voluptas similique iste labore, quas quod consequatur ratione esse beatae?
                </div>

                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quos, iure accusantium tenetur repellendus laborum culpa unde exercitationem dolorum. Deleniti, fugiat vitae? Inventore repellendus voluptatibus laudantium quisquam doloremque nemo obcaecati. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, consequatur saepe? Minima temporibus dolorum delectus cupiditate veritatis nostrum, accusamus reprehenderit iure provident nemo unde corporis odit, vero quia voluptatibus omnis.
                </div>
            </div>
        </div>
    );
};