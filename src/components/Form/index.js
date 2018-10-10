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
            errors.push('Wprowadź liczbę zdjęć')
        }

        if (parseInt(this.state.number) < 1 || parseInt(this.state.number) > 10) {
            errors.push('Wybrana liczba zdjęć musi być z zakresu 1-10')
        }

        if (!this.state.pet) {
            errors.push('Wybierz zwierzę!')
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
        }
    };

    //Fetching photos
    fetching = () => {
        const animals = ['shibes', 'cats', 'birds'];
        let randomAnimal = animals[Math.floor(Math.random()*animals.length)];
        const mainURL = 'http://shibe.online/api/';
        let petType = this.state.pet;
        let count = this.state.number;
            fetch(`${mainURL}${(petType === 'random') ? randomAnimal : petType}?count=${count}`)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        photos: resp,
                        isLoading: false,
                    })
                }).catch(err => {
            console.log('Błąd!', err);
        })
    };

    render() {
        const { isLoading, error, photos, number, pet } = this.state;
        return (
            <div>
                <form>
                    <label>
                        Liczba zdjęć:
                        <input min="1" max="10" type="number" value={number} onChange={this.inputChange} required/>
                    </label> <br/><br/>
                    <label>
                        Wybierz zwierzę
                        <select value={pet} onChange={this.checkboxChange}>
                            <option value="">Wybierz zwierzę</option>
                            <option value="shibes">Psy</option>
                            <option value="cats">Koty</option>
                            <option value="birds">Ptaki</option>
                            <option value="random">Losowe</option>
                        </select>
                    </label>
                    {!isLoading ?
                    <input type="submit" value="Szukaj" onClick={this.onSubmit}/>
                    :
                    <input type="submit" value="Ładowanie danych" disabled />}
                </form>

                {error.map(item => {
                   return <p style={{color: 'red'}}>{item}</p>
                })}

                {photos.map(item => {
                    return <img src={item}/>
                })}
            </div>
        )
    }

}

export default Form;