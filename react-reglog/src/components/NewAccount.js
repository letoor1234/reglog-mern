import React, { Component, Fragment } from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'

import Alert from './Alert'

export default class NewAccount extends Component {
    constructor(props){
        super(props)
        this.state={
            user: '',
            mail: '',
            pass: '',
            cPass: '',
            confirmedPass: false,
            cPAlertColor: '',
            cPassText: '',
            terms: false,
            alertStyle: {
                position: "absolute",
                top: "-100%",
                transition: "all 1s"
            },
            alert2Text: {
                title: '',
                content: ''
            },
            alert2Style: {
                position: "absolute",
                top: "-100%",
                transition: "all 1s"
            },
            redir: false
        }
    }
    componentDidMount=()=>{
        this._isMounted= true;
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
                    redir: false,
                  })
                } else{
                  this.setState({
                    redir: true,
                 })
                }
              }       
            })
    }
    componentWillUnmount=()=>{
        this._isMounted=false;
    }
    userChange=(event)=>{
        //agregar confirmacion de nombre!!! (length)
        const text = event.target.value;

        this.setState({
            user: text
        })
    }
    mailChange=(event)=>{
        //agregar confirmacion de formato!!
        const text = event.target.value;

        this.setState({
            mail: text
        })
    }
    passChange=(event)=>{
        //agregar dificultad y seguridad en la confirmacion!!
        const text = event.target.value;

        this.setState({
            pass: text
        })
    }
    cPassChange=(event)=>{
        const text = event.target.value;
        this.setState({
            cPass: text
        })
        if(text === this.state.pass){
            
            this.setState({
                confirmedPass: true,
                cPAlertColor: '',
                cPassText: ""
            })
        } else{
            
            this.setState({
                confirmedPass: false,
                cPAlertColor: ' btn-danger ',
                cPassText: "Passwords do not match!"
            })
        }
        
    }
    inputChange=(e)=>{
        this.setState({
            terms: !this.state.terms
        })
    }
    showTerms=()=>{
        this.setState({
            alertStyle: {
                position: "absolute",
                top: "20%",
                transition: "all 1s"
            }
        })
    }
    closeTerms=()=>{
        this.setState({
            alertStyle: {
                position: "absolute",
                top: "-100%",
                transition: "all 1s"
            },
            alert2Style: {
                position: "absolute",
                top: "-100%",
                transition: "all 1s"
            }
        })
    }
    register=(e)=>{
        if(this.state.terms && this.state.confirmedPass){
            //execute the fetch
            console.log("booleanos bien")
            const API = 'http://localhost:4000/api/users/register'

            const postData = {
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json',
                    'Origin': '*'//sigue fallando el puto cors
                },
                method: 'POST',
                body: JSON.stringify({
                    user: this.state.user,
                    mail: this.state.mail,
                    pass: this.state.pass,
                    
                }),
                credentials:'include'
            }

            fetch(API, postData)
                .then((res)=>{
					console.log(res)
                    return res.json()
                })
                .then((json)=>{
                    const user = json.user
                    if(!user){
                        if(!json.mailExist){
                            if(json.userExist){
                                //USER EXIST
                                this.setState({
                                    redir: false,
                                    alert2Text:{
                                        title: 'User already in use',
                                        content: "This user is already register in the database, plase try with a diferent user name."
                                    },
                                    alert2Style: {
                                        position: "absolute",
                                        top: "20%",
                                        transition: "all 1s"
                                    }
                                })
                                console.log("el usuario ya existe")
                            }
                        } else{
                            //MAIL EXISTS
                            this.setState({
                                redir: false,
                                alert2Text:{
                                    title: 'Email already in use',
                                    content: "This email adress is already register in the database."
                                },
                                alert2Style: {
                                    position: "absolute",
                                    top: "20%",
                                    transition: "all 1s"
                                }
                            })
                        }
                    } else{
                        this.setState({
                            redir: true
                        })
                        //OK!!
                        console.log(json);
                    }
                    
                })
                .catch((err)=>{
                    console.log('errorrrr: ', err)
                    this.setState({
                        resMsg: 'Connection failed: '+ err
                    })
                }) 
        }
        e.preventDefault()
    }
    render(){
        if(!this.state.redir){
            return(
                <Fragment>
                    <h2 className='mb-3 text-center fw-bold'>Create account</h2>
                    <div className='d-flex justify-content-center'>           
                        <form onSubmit={(e)=>this.register(e)} className='col-lg-3 col-md-6'>
                            <label className='fw-bold' htmlFor="user">User name</label>
                            <input className='form-control mb-3' id='user'type="text" value={this.state.user} onChange={ (user)=>this.userChange(user) } />
    
                            <label className='fw-bold' htmlFor="mail">Eail address</label>
                            <input className='form-control mb-3'  id='mail'type="mail" value={this.state.mail} onChange={(mail)=>this.mailChange(mail)} />
    
                            <label className='fw-bold' htmlFor="pass">Password</label>
                            <input  className='form-control mb-3' id='pass'type="password" value={this.state.pass} onChange={ (pass)=>this.passChange(pass) } />
    
                            <label className='fw-bold' htmlFor="c-pass">Confirm password</label>
                            <input  className={'form-control mb-3'+this.state.cPAlertColor} id='c-pass'type="password" value={this.state.cPass} onChange={ (cPass)=>this.cPassChange(cPass) } />
                            <p className='text-center text-danger'>{this.state.cPassText} </p>
    
                            <div className='form-check form-switch my-3'>
                                <input onChange={(e)=>this.inputChange(e)} className='form-check-input' id='accept-terms' type="checkbox"/>
                                <label  onClick={()=>this.showTerms()} id='sub-view-terms' className='btn btn-sm form-check-label text-muted'>I accept the <u>terms and conditions</u> of this site</label>
                            </div>
                            
                            <input  className='fw-bold form-control btn btn-lg btn-success' type="submit" value='Subscribe'/>
                        </form>
                    </div>
    
                    <Alert 
                        title="Terms and conditions of use"
                        content="This is a site developed as a test. We don't need your cookies, but we save your session when you login. When you logout, that session will destroyed."
                        style= {this.state.alertStyle}
                        func= {this.closeTerms}
                    />
                    <Alert 
                        title={this.state.alert2Text.title}
                        content={this.state.alert2Text.content}
                        style= {this.state.alert2Style}
                        func= {this.closeTerms}
                    />
                </Fragment>
            )
        } else {
            return(
                <Redirect to='/user'/>
            )
        }    
    }
}