import React, { Component } from 'react'
import Main from '../template/main'

const headerProps = {
    icon: 'users',
    title: "Users",
    subtitle: 'User register: Create, Read, Update and Delete'
}

export default class UserCrud extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <Main {...headerProps}>
                Users regiser
            </Main>
        )
    }
}