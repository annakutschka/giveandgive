import React, { Component } from 'react'
import axios from 'axios'
import Headline from '../../pices/Headline/Headline.js'
import Title from '../../pices/Title/Title.js'
import KarmaButton from '../../pices/KarmaButton/KarmaButton.js'
import './CreateTask.css'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'
import baseURL from '../../path'

export default class CreateTask extends Component {
	constructor(props) {
        super(props)	

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.handleTopicChange = this.handleTopicChange.bind(this)

        this.state = {
            currentUser: '',
            title: '',
            description: '',
            date: '',
            time: '',
            give_back: '',
            location: '',
            topic: '1',
            message: '',
            falseEntry: false
        }
        this.baseState = this.state;
	}

    // //get Topics for select field -> in topicsForSelect
    componentDidMount(){        
        axios.get(baseURL + '/users.json')
        .then(response => {
            let user = response.data
            user.forEach(u => {
                if(u.token == sessionStorage.getItem('currentUser')){
                    console.log("match User")
                    this.setState({
                        currentUser: u.id
                    })

                }
            })
        })
        .catch(error => console.log(error))

    //     axios.get('http://localhost:3001/api/v1/topics.json')
    //     .then(response => {
    //       this.setState({topicsForSelect: response.data}) 
    //     })
    //     .catch(error => console.log(error))
    }

    handleChange(event){
        const target = event.target;
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleTopicChange(event){
        this.setState({
            topic: event.target.value
        })
    }

    
    //get values into api
    handleSubmit(event){
        event.preventDefault()

        console.log("submit current user" + this.state.currentUser)
        console.log("submited topic" + this.state.topic)
        axios.post(baseURL + '/api/v1/posts', {
            topic_id: this.state.topic,
            creater_id: this.state.currentUser,
            description: this.state.description,
            location: this.state.location,
            date: this.state.date,
            title: this.state.title,
            give_back: this.state.give_back,
            state: 'pending',
            helper_id: '1'
        })
        .then(response => {
            console.log("submited...")
            console.log(response.data)
            console.log(response.data.status)
            this.resetForm()
            this.props.history.push('./home')
        })
        .catch(error => console.log(error))
    }

    resetForm = () => {
        this.setState(this.baseState)
    }

  	render() {
    	return (
	      	<div className="formular">
				<Headline 
                    text="Create Task"
                    path="./home"
				/>

                <form id="createEventForm" onSubmit={this.handleSubmit}>

                    <Title
                        text="Topic"
                    />

                    <div className="formelement">
                        <select className="select" name="input" onChange={this.handleTopicChange} value={this.state.topic} label="Select Topic">
                            <option value="1" label="Shopping"/>
                            <option value="2" label="Entertainment" />
                            <option value="3" label="Education"/>
                            <option value="4" label="Take a Ride" />
                            <option value="5" label="Care" />
                            <option value="6" label="Transportation"/>
                            <option value="7" label="Freetime"/>
                            <option value="8" label="Small Tasks" />
                            <option value="9" label="Other" />
                        </select>
                    </div>

                    <Title
                        text="Title"
                    />

                    <div className="formelement">
                        <input name="title" value={this.state.title} onChange={this.handleChange} type="text" id="title" placeholder="title" maxLength="50" className="inputfield" required/>
                    </div>

                    <Title
                        text="Description"
                    />

                    <div className="formelement">
                        <textarea className="textarea" name="description" placeholder="description" value={this.state.description} className="description" onChange={this.handleChange} id="description" ></textarea>
                    </div>

                    <Title
                        text="Date & Time"
                    />

                    <div className="formelement">
                        <input name="date" value={this.state.date} onChange={this.handleChange} type="date" id="date" className="inputfield" required/>
                    </div>

                    <div className="formelement">
                        <input name="time" value={this.state.time} onChange={this.handleChange} type="time" id="time" className="inputfield" required/>
                    </div>

                    <Title
                        text="Give back"
                    />

                    <div className="formelement">
                        <input name="give_back" value={this.state.give_back} onChange={this.handleChange} type="text" id="give_back" placeholder="I want to give you back ..." className="inputfield" required/>
                    </div>

                    <Title
                        text="Location"
                    />

                    <div className="formelement">
                        <input name="location" value={this.state.location} onChange={this.handleChange} type="text" id="location" placeholder="location" className="inputfield" required/>
                    </div>
                    
                <KarmaButton
                    text="CREATE TASK"
                />
                    
                </form> 

                {this.state.falseEntry &&
                    <p className="wrongEntry">{this.state.message}</p>
                }
	      	</div>
    	)
  	}
}
