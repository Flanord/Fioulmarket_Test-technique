import React, { useState } from 'react';
import './TabComponent.css';
import LoginForm from "../../Form/LoginForm";
import RegistrationForm from "../../Form/RegistrationForm";

const LOGIN = 'login';
const REGISTER = 'register';

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState(LOGIN);

    return (
        <div className="cover-container">
            <div className="panel panel-default">
                <div className="panel-body">
                    <ul id="dTab" className="nav nav-tabs">
                        <li className={activeTab === LOGIN ? 'nav-item active' : 'nav-item'}>
                            <a className={activeTab === LOGIN ? 'nav-link active' : 'nav-link'}
                               onClick={() => setActiveTab(LOGIN)}>
                                J'ai un compte
                            </a>
                        </li>
                        <li className={activeTab === REGISTER ? 'nav-item active' : 'nav-item'}>
                            <a className={activeTab === REGISTER ? 'nav-link active' : 'nav-link'}
                               onClick={() => setActiveTab(REGISTER)}>
                                Je n'ai pas de compte
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {activeTab === LOGIN && (
                            <div id="login" className="tab-pane fade show active">
                                <LoginForm />
                            </div>
                        )}
                        {activeTab === REGISTER && (
                            <div id="register" className="tab-pane fade show active">
                                <RegistrationForm />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabComponent;
