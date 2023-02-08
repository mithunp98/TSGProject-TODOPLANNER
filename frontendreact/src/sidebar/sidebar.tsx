import React from 'react';

import './sidebar.css';

const Sidebar = () => {

    return (
        <>
            <nav>
                <ul className="sidebarbody">
                    <li className="logo"></li>
                    <li>
                        <a href="#">
                            <i className="fa fa-home"></i>&nbsp; Home
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-book"></i>&nbsp; Add Task
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-users"></i>&nbsp; Users
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-picture-o"></i>&nbsp; Contact
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-phone"></i>&nbsp; Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};
export default Sidebar;
