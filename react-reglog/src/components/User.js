import React, { Component } from 'react'
import {
    Redirect
} from 'react-router-dom'
export default class User extends Component {
    _isMounted= true;
    constructor(props){
        super(props)
        this.state={
            redir: false,
            user: '',
            mail: '',
            pass: '',
            alert: ''
        }
    }    
    componentDidMount=()=>{
        const API= 'http://localhost:4000/api/users/auth'
        const id= this.props.id // en el server es req.user// aca deberia ser res.user
        fetch(API, {credentials: 'include'})
            .then((res)=>{
                return res.json()
            })
            .then((json)=>{
              if(this._isMounted){
                if(!json.user){
                  this.setState({
                    redir: true,
                  })
                } else{
                  this.setState({
                    redir: false,
                    user: json.user,
                    mail: json.mail,
                    pass: json.pass
                 })
                }
              }       
            })
      }
      componentWillUnmount=()=>{
        this._isMounted=false;
      }
    render(){
        if(this.state.redir){
            return <Redirect to='/'></Redirect>
        } else{
            return(
                <section className='d-flex justify-content-center'>
                    <article className='col-sm-8 col-md-8 col-lg-6 card overflow-hidden'>
                        <h4 className='fw-bold text-center btn-light p-2'>User Name:</h4>
                        <h5 className='text-center mb-3'> {this.state.user} </h5>
    
                        <h4 className='border-top fw-bold text-center btn-light p-2'>Email Adress:</h4>
                        <h5 className='mb-3 text-center'> {this.state.mail} </h5>
    
                        <h4 className='border-top fw-bold text-center btn-light p-2'>Password:</h4>
                        <p className='text-muted text-center'>This section is encrypted to guarantee your security.</p>
                        <h5 className='mb-3 text-center'> {this.state.pass} </h5>
                    </article>
                    <h2>{this.state.alert} </h2>
                </section>
            )
        }  
    }
}