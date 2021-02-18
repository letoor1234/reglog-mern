import React, {Component, Fragment} from 'react'

export default class Alert extends Component{
    render(){
        return(
            <Fragment>
                <div className='alert d-flex justify-content-center' style={this.props.style}>
                    <div className='card col-lg-8 col-md-8 col-sm-6' id='alert'>
                        <h3 className='p-3 card-header'> {this.props.title} </h3>
                        <p className='m-4 card-text'> {this.props.content} </p>
                        <button onClick={this.props.func} id='close-alert'className='btn btn-outline-primary'>OK</button> 
                    </div>
                </div>
            </Fragment>
            
        )
    }
}