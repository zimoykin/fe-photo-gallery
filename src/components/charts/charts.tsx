import React, { useEffect, useState } from "react";
import './styles/charts-style.css';
import { ApiClient } from "../../api/networking/api-client";
import { IProfile } from "../../interfaces/profile.interface";
import { useNavigate } from "react-router-dom";

const Charts: React.FC = () => {

    const [users, setUsers] = useState<IProfile[]>([]);
    const [mode, setMode] = useState(0);
    const [, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setIsLoading(true);
        ApiClient.get<IProfile[]>('/public/profiles').finally(() => {
            setIsLoading(false);
        }).then((response) => {
            setUsers(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleCamerasClick = () => {
        setMode(1);
    };
    const handleLensesClick = () => {
        setMode(2);
    };

    const handleUsersClick = () => {
        setMode(0);
    };

    const handleUserClick = (profileId: string) => {
        navigate(`/gallery/${profileId}`);
    }

    return (
        <div className="p-10 charts-box pointer">
            <div className="flex-row w-100 p-3 global-background-layer shadow">
                <div
                    onClick={handleUsersClick}
                    className={`flex-center w-50 p-5 scale-m ${mode === 0 ? 'palitra-3 palitra-color-6' : ''}`}>
                    Users
                </div>
                <div
                    onClick={handleCamerasClick}
                    className={`flex-center w-50 p-5 scale-m ${mode === 1 ? 'palitra-3 palitra-color-6' : ''}`}>
                    Cameras
                </div>
                <div
                    onClick={handleLensesClick}
                    className={`flex-center w-50 p-5 scale-m ${mode === 2 ? 'palitra-3 palitra-color-6' : ''}`}>
                    Lenses
                </div>
            </div>
            <div className="h-100 w-100 p-3 flex-column global-background-layer">
                <div className="scroll">
                    {users.map((user, index) => (
                        <div key={index} className="flex-row w-100 p-3 scale-m"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <div className="w-100 global-secondary-background-layer shadow p-1">
                                <span className="p-3">{user.name}</span>
                            </div>
                            <div className="global-secondary-background-layer shadow p-1">
                                <span className="p-3">{23}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Charts;