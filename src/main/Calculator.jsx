import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'
import { findAllByTestId } from '@testing-library/react'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props){
        super(props)
        //inicialização this pelo Constructor
        this.setOperation = this.setOperation.bind(this)
    }

    //Volta valores para estado inicial 
    clearMemory = () => {this.setState({...initialState})}

    addDigit(nr){
        let n = nr.target.value
        if(n === '.' && this.state.displayValue.includes('.')){
            return;
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + n

        this.setState({displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    setOperation = (op) => {console.log(op.target.value)}
    render(){
        //Inicialização do this fora do construct
        const clearMemory = () => this.clearMemory
        const addDigit = (n) => this.addDigit(n)
        
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label='AC' click={() => clearMemory()} triple/>
                <Button label='/' click={op => this.setOperation} operation/>
                <Button label='7' click={n => addDigit}/>
                <Button label='8' click={n => addDigit}/>
                <Button label='9' click={n => addDigit}/>
                <Button label='*' click={op => this.setOperation} operation/>
                <Button label='4' click={n => addDigit}/>
                <Button label='5' click={n => addDigit}/>
                <Button label='6' click={n => addDigit}/>
                <Button label='-' click={op => this.setOperation} operation/>
                <Button label='1' click={n => addDigit}/>
                <Button label='2' click={n => addDigit}/>
                <Button label='3' click={n => addDigit}/>
                <Button label='+' click={op => this.setOperation} operation/>
                <Button label='0' click={n => addDigit} double/>
                <Button label='.' click={n => addDigit}/>
                <Button label='=' click={op => this.setOperation} operation/>
            </div>
        )
    }
}