import React, { Component } from 'react';

class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
            number: '',
            pet: '',
            error: [],
            photos: [],
            isLoading: false,
        }
    }

    //Form updating events

    inputChange = (event) => {
         this.setState({
            number: event.target.value,
        })
    };

    checkboxChange = (event) => {
        this.setState({
            pet: event.target.value,
        })
    };

    //Validating

    validate = () => {
        const errors = [];
        if (!this.state.number) {
            errors.push('Put a number of pets')
        }

        if (parseInt(this.state.number) === 0 || parseInt(this.state.number) > 10) {
            errors.push('Choose a number of pets from 1-10 range')
        }

        if (!this.state.pet) {
            errors.push('Choose a pet!')
        }

        if (errors.length > 0) {
            this.setState({
                error: errors
            })
        } else {
            this.setState({
                error: []
            }, this.checkingErrors)
        }
    };

    //Submit

    onSubmit = e => {
        e.preventDefault();
        this.validate();

    };

    //Checking if there are some validation errors

    checkingErrors = () => {
        if (this.state.error.length === 0) {
            this.fetching();
            this.setState({
                isLoading: true,
            });
            console.log('ok!');
        }
    };

    //Fetching photos

    fetching = () => {
        const animals = ['shibes', 'cats', 'birds'];
        let randomAnimal = animals[Math.floor(Math.random()*animals.length)];
        const mainURL = 'http://shibe.online/api/';
        let petType = this.state.pet;
        let count = this.state.number;
        console.log(petType);
        (petType === 'random') ?
            fetch(`${mainURL}${randomAnimal}?count=${count}`)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        photos: resp,
                        isLoading: false,
                    })
                }) :
        fetch(`${mainURL}${petType}?count=${count}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    photos: resp,
                    isLoading: false,
                })
            })
    };

    render() {
        return (
            <div>
                <form>
                    <label>
                        Number of photos:
                        <input type="number" value={this.state.number} onChange={this.inputChange} required/>
                    </label> <br/><br/>
                    <label>
                        Choose a pet:
                        <select value={this.state.pet} onChange={this.checkboxChange}>
                            <option value="">Choose a pet...</option>
                            <option value="shibes">Shibes</option>
                            <option value="cats">Cats</option>
                            <option value="birds">Birds</option>
                            <option value="random">Random</option>
                        </select>
                    </label>
                    {!this.state.isLoading ?
                    <input type="submit" value="Szukaj" onClick={this.onSubmit}/>
                    :
                    <input type="submit" value="Ładowanie danych..." disabled />}
                </form>
                {this.state.error.map(item => {
                   return <p style={{color: 'red'}}>{item}</p>
                })}
                {this.state.photos.map(item => {
                    return <img src={item}/>
                })}

            </div>
        )
    }

}

export default Form