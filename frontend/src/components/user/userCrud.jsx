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

    UNSAFE_componentWillMount() {
        axios.get(baseURL).then(resp => {
            this.setState({ list: resp.data })
        })
    }

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

    getUpdatedList(user, add = true) {
        // filter creates a new list
        // remove all elements that don't match the condition
        // in this case, there will be only one element in the list
        const list = this.state.list.filter(u => u.id !== user.id)
        //unshift put the element in the list, and on top of it
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        console.log(this.state.list)
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

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseURL}/${user.id}`).then(
            resp => {
                const list = this.getUpdatedList(user, false)
                this.setState({ list })
            }
        )
    }

    renderTable() {
        return (
            <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className='btn btn-warning'
                            onClick={() => this.load(user)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className='btn btn-danger ml-2'
                            onClick={() => this.remove(user)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}