import React from 'react'
import { css } from '@emotion/react'
import Template from './components/template/'

const appCss = css`
  color: #fff;
  background: #95A4AA;
  height: 100%;
  min-height: 100vh;
  min-width: 305px;
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
  &[readOnly]
  {
    background-color: #d3d3d3;
    color: #fff;
  }
  // &[valid] {
  //  background-color: valid;
  // }
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

// Set as globals outside of class because of initial onChange design (kept for simplicity)
let mainLink = "https://jsonplaceholder.typicode.com/users"
let secondLink = "https://scheduler.luminarycxm.com/api/v1/cleaned/data/test/"

export default class App extends React.Component {
  constructor(props) {
    console.log("App constructor called")
    super(props)
    this.state = {
      nombre: '',
      renderTemplate: false,
      highlightError: false
    }
    this._onButtonClick = this._onButtonClick.bind(this)
    this.setNombre = this.setNombre.bind(this)
  }

  // This is like 'handleChange
  setNombre = e => {
    this.setState({
      nombre: e.target.value
    })
    if (this.state.nombre == "") {
      console.log('input error forsure')
      this.setState({
        highlightError: true
      })
    }
  }

  _onButtonClick(e) {
    if (/\S/.test(this.state.nombre)) {
      console.log('we fired IF')
      this.setState({
        renderTemplate: true,
        highlightError: false
      })  
    } else {
      console.log('input error forsure')
      this.setState({
        highlightError: true
      })
    }

    // line below means we put this <button> in <form> without redirect
    e.preventDefault()
  }

  // Keeping for future reference of syntax
  // quick = async (e) => {
  //   console.log('Began')
  //   const response = await fetch('http://localhost:3000/',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: '{"applicantName" : "Kevin", "incomingUrl" : "https://jsonplaceholder.typicode.com/users", "outgoingUrl" : "https://scheduler.luminarycxm.com/api/v1/cleaned/data/test/"}'
  //   })
  //   await preventDefault()
  //   const data = await response.json()
  //   console.log(data)
  //   console.log('End')
  // }

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
                type="incomingUrl"
                name="incomingUrl"
                readOnly
                defaultValue={mainLink} />
            </label>
            <label css={labelCss}>
              <p>Data going to:</p>
              <input 
                css={inputCss}
                type="outgoingUrl"
                name="outgoingUrl"
                readOnly
                defaultValue={secondLink} />
            </label>
            <label css={labelCss}>
              <p>Applicant name</p>
              <input 
                css={inputCss}
                type="text"
                name="nombre"
                placeholder="Name must be entered"
                required
                valid={ this.state.highlightError ? '#ff9999':'#ffffff'}
                onChange={ this.setNombre }
                value={ this.state.nombre } />
            </label>
            <button css={buttonCss} onClick={this._onButtonClick}>Send post request</button>
          </form>
        </div>
        <div>
          {this.state.renderTemplate && <Template incoming={mainLink} outgoing={secondLink} nom={this.state.nombre}/>}
        </div>
      </div>
    )
  }
}