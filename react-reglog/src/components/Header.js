import React, {Component} from 'react'
import { 
    Link,
    Redirect
} from 'react-router-dom'

export default class Header extends Component{
    constructor(props){
        super(props)
        if(this.props.logout === 'true'){
            this.state={
                button:(<button onClick={this.logOut} className={'btn '+this.props.classButton + ' fw-bold my-auto mx-3'}>{this.props.contentButton} </button>),
                redir: false
            }
        }else{
            this.state={
                button:(<Link to='/' className={'btn '+this.props.classButton + ' fw-bold my-auto mx-3'}>{this.props.contentButton} </Link>)
            }
        }
    }
    logOut=()=>{
		const API ='http://localhost:4000/api/users/logout'   
        fetch(API, {credentials:'include'})
            .then((res)=>{
                return res.json()
            })
            .then((json)=>{
                if(json.loguedOut){
                this.setState({
                    redir: true
                })
                console.log('averaverquepaso')
                }else{
                this.setState({
                    alert: "Can't log out! Try in a few minutes!!"
                })
                }
            })
    }
    render(){
        if(this.state.redir){
            return <Redirect to='/'/>
        } else{
            if(this.props.enableButton === 'true'){
                return(
                    <header className='bg-primary d-flex justify-content-between mb-4'>
                        <h1 className='text-light fw-bold p-3 d-flex'><div className='text-light'>reg</div><div className='text-dark'>Log</div> </h1>
                        {this.state.button}
                    </header>
                )
            }else {
                return(
                    <header className='bg-primary mb-4'>
                        <h1 className='text-light fw-bold p-3 d-flex'><div className='text-light'>reg</div><div className='text-dark'>Log</div> </h1>
                    </header>
                )
            }
        }  
    }
}
