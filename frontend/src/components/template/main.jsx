import './main.css'
import React from 'react'
import Header from './header'

export default props => (
    <React.Fragment>
        <Header />
        <main className="content">
            Content
        </main>
    </React.Fragment>
)