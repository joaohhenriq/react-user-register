import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/main'

const headerProps = {
    icon: 'users',
    title: "Users",
    subtitle: 'User register: Create, Read, Update and Delete'
}

const baseURL = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseURL}/${user.id}` : baseURL

        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })

    }

    getUpdatedList(user) {
        // filter creates a new list
        // remove the user from the list, if it exists
        const list = this.state.list.filter(u => u.id !== user.id)
        //unshift put the element on the top of the list
        list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type="text" className='form-control'
                                name='name'
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder='Enter the name...' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type="text" className='form-control'
                                name='email'
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder='Enter the email...' />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end'>
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Save
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}