import React, { Component } from 'react';
import Connect from 'react-redux'
import products from './productReducer';
import { createStore, applyMiddleware } from 'redux';
import logo from './logo.svg';
import './App.css';


// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { Num1: 0, Num2: 0 }
//   }
//   onchange=(e)=>
//   {
//     //alert(e);
//     var elementName = e.target.name;
//     //alert(elemnetName);
//     var elementValue = e.target.value;
//     //alert(elementValue);
//     this.setState({[elementName]:elementValue});
//     //alert(this.state.Num1);
//     //alert(this.state.Num2);
//   }
//   sum = () => {
//     var N1 = parseInt(this.state.Num1);
//     var N2 = parseInt(this.state.Num2);
//     var R = (N1 + N2);
//     alert(R)
//   }
//   render() {
//     return(
//       <div>
//         <input type="text" name="Num1" style={{ borderwidth: 1, margin: 10 }} placeholder="Num1" onChange = {this.onchange.bind(this)} />
//         <input type="text" name="Num2" style={{ borderwidth: 1, margin: 10 }} placeholder="Num2" onChange = {this.onchange.bind(this)} />
//         <input type="button" title="Sum" onClick={this.sum.bind(this)} />
//         <input type="text" style={{ borderwidth: 1, margin: 10 }} value={parseInt(this.state.Num1) + parseInt(this.state.Num2)} />
//       </div>
//     )
//   }
// }

export default class App extends React.Component {
//class MyComponent extends React.Component {
  products
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    //fetch("https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services")
    fetch("https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/providers?include=locations%2Cschedules.location&page%5Bnumber%5D=1&page%5Bsize%5D=10")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      fetch("https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {data.map(data => (
            <li key={data.id}>
             <div>
              {data.id}  {data.type}  
              </div>
              <div>
              {data.links.self} {data.attributes.name}
              </div>
            </li>
          ))}
        </ul>
      );
    }
  }
}