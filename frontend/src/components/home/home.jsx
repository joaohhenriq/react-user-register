import React from 'react'
import Main from '../template/main'

export default props => (
    <Main icon='home' title='Home' subtitle='An app to register users...'>
        <div className='display-4'>Welcome</div>
        <hr />
        <p className='mb-0'>
            Application to show how to develop a simple CRUD with React JS!
        </p>
    </Main>
)