import React, {Fragment, Component} from 'react'
import Alert from './Alert'
import {
    Redirect,
    Link
} from 'react-router-dom';

export default class Login extends Component{
    _isMounted=false;
    constructor(props){
        super(props)
        this.state={
            user: '',
            pass: '',
            resMsg: '',
            redir: false,
            alert: '',
            alertStyle: {
                position: "absolute",
                top: "-100%",
                transition: "all 1s"
            }
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
    closeTerms=()=>{
        this.setState({
            alertStyle: {
                position: "absolute",
                top: "-100%",
                transition: "all 1s"
            }
        })
    }
    userChange=(event)=>{
        const text = event.target.value;
        
        this.setState({
            user: text
        })
    }
    passChange=(event)=>{
        const text = event.target.value;

        this.setState({
            pass: text
        })
        
    }
    login=(event)=>{
        const API = 'http://localhost:4000/api/users/login'

        const postData = {
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
                'Origin': '*'//sigue fallando el puto cors
            },
            method: 'POST',
            body: JSON.stringify({
                user: this.state.user,
                pass: this.state.pass,
            }),
			credentials:'include'
        }

        fetch(API, postData)
        .then((res)=>{
            return res.json()
        })
        .then((json)=>{
            const user= json.user;
            if(!user){
                if(!json.userExist){
                    //NO USER!!
                    console.log("no existis gato");
                    this.setState({
                        alert: "This user isn't registered on database.",
                        alertStyle: {
                            position: "absolute",
                            top: "20%",
                            transition: "all 1s"
                        }
                    })
                } else{
                    //PASS INCORR
                    if(!json.passVerified){
                        console.log("password falsuki");
                        this.setState({
                            alert: 'Your password is incorrect! Try again or click in "Forgot password?"',
                            alertStyle: {
                                position: "absolute",
                                top: "20%",
                                transition: "all 1s"
                            }
                        })
                    }
                }
            } else{
                this.setState({
                    redir: true
                })
            }
        })
        .catch((err)=>{
            this.setState({
                alert: 'Something went wrong when we connected to the database. ERR:'+{err},
                alertStyle: {
                    position: "absolute",
                    top: "20%",
                    transition: "all 1s"
                }
            })
        })
            
        event.preventDefault()
    }
    render(){
        if(!this.state.redir){
            return(
                <Fragment>
                    <h2 className='mb-3 text-center fw-bold'>Login</h2>
                    <div className='d-flex justify-content-center'>
                        <form onSubmit={(e)=>this.login(e)} className='col-lg-3 col-md-6'>
                            <label className='fw-bold' htmlFor="user">User Name</label>
                            <input className='form-control mb-3'id='user'type="text" value={this.state.user} onChange={ (user)=>this.userChange(user) } />
    
                            <label className='fw-bold' htmlFor="password">Password</label>
                            <input className='form-control mb-3'id='pass'type="password" value={this.state.pass} onChange={ (pass)=>this.passChange(pass) } />
    
                            
    
    
                            <input className='fw-bold form-control mb-2 btn btn-lg btn-success' type="submit" value='Login'/>
    
                            <Link className='text-center m-3 d-block' to='/forgot-password'>Forgot password?</Link>
                            <Link className='text-center m-3 d-block' to='/register'>Create account</Link>
                        </form>
                    </div>
                    <Alert 
                        title= 'Fail!'
                        content={this.state.alert}
                        style= {this.state.alertStyle}
                        func= {this.closeTerms}
                    />
                </Fragment>
            )
        } else{
            return(
                <Redirect to='/user'/>
            )
        }
        
    }
}