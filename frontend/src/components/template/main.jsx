import './main.css'
import React from 'react'
import Header from './header'

export default props => (
    <React.Fragment>
        <Header {...props} />
        <main className="content">
            Content
        </main>
    </React.Fragment>
)