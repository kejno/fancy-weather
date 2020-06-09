import React from 'react';

import './MainContainer.css';

export const MainContainer = (props: any) => (
    <main className="main-container">
        {props.children}
    </main>
)
