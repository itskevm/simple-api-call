import React from 'react'
import { css } from '@emotion/react'
import Template from './components/template/'

const appCss = css`
  color: #fff;
  background: #95A4AA;
  height: 100%;
  min-height: 100vh;
  font-family: "Rubik",sans-serif;
`

const headerCss = css`
  background: linear-gradient(90deg, #ff6900 0%, #ff940f 100%);
  padding: 15px 10px;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2em;
    padding: 25px 10px;
  }
`

const formCss = css`
  margin: 30px auto;
  max-width: 768px;
  text-align: left;
`

const wrapperCss = css`
  padding: 30px;
`

const labelCss = css`
  display: block;
  margin: 20px 0;
  padding: 10px 0;

  p {
    padding: 5px 0;
    font-size: 1.4em;
  }
`

const inputCss = css`
  width: 100%;
  height: 2.5em;
  font-size: 18px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: #ff6900 solid 1px;
  }
`

const buttonCss = css`
  transform: scale(1);
  animation: shadow-pulse 1.5s infinite;
  height: 45px;
  color: #fff;
  background-color: #ff6900;
  cursor: pointer;
  border-radius: 40px;
  width: 250px;
  margin: 5px 0;
  border: none;
  font-family: "Rubik";
  font-size: 1.25em;
  text-transform: uppercase;

  @keyframes shadow-pulse {
    0% {
      box-shadow: 0 0 0 0px rgb(255 105 0 / 70%);
    }

    50% {
      transform: scale(0.95);
    }

    100% {
      box-shadow: 0 0 0 15px rgb(255 105 0 / 0%);
    }
  }
`

let mainLink = "https://jsonplaceholder.typicode.com/users"

export default class App extends React.Component {
  constructor(props) {
    console.log("App constructor called")
    super(props)
    this.state = {getPoint: mainLink, nombre: ''}
    this.handleChange = this.handleChange.bind(this)
    this._onButtonClick = this._onButtonClick.bind(this)
    this.setNombre = this.setNombre.bind(this)
  }

  setNombre = e => {
    this.setState({nombre: e.target.value})
  }

  _onButtonClick() {
    this.setState({
      renderTemplate: true,
    })
  }

  handleChange = e => {
    console.log("we gave: " + e.target.value)
    this.setState({getPoint: e.target.value})
    mainLink = e.target.value
    //console.log("we set: " + this.state.getPoint)
  }



render() {
  return (
    <div css={appCss}>
      <header css={headerCss}>
        Welcome
      </header>
      <div css={wrapperCss}>
        <h1 style={{fontFamily: 'Fjalla One, sans-serif', textAlign: 'center'}}>SIMPLE API CALL</h1>
        <form css={formCss}>
          <label css={labelCss}>
            <p>Data coming from:</p>
            <input
              css={inputCss}
              type="text"
              name="name"
              readOnly={true}
              defaultValue="https://jsonplaceholder.typicode.com/users"
              onChange={this.handleChange}/>
          </label>
          <label css={labelCss}>
            <p>Applicant name</p>
            <input 
              css={inputCss}
              type="text"
              name="nombre"
              onChange={ this.setNombre }
              value={ this.state.nombre } />
          </label>
        </form>
        <button css={buttonCss} onClick={this._onButtonClick}>Send post request</button>
      </div>
      <div>
        {this.state.renderTemplate && <Template url={mainLink} nom={this.state.nombre}/>}
      </div>

      {/*console.log("TIME TO RENDER THE TEMPLATE! w/ " + this.state.getPoint)*/}
    </div>
  )
}
}