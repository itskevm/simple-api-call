import React from 'react';
import { css } from '@emotion/react';
import Template from './components/template/'

const appCss = css`
  color: blue;
`

let google = "https://jsonplaceholder.typicode.com/users"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {getPoint: ""}
    console.log("we just started the class")
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log("we gave: " + event.target.value)
    this.setState({getPoint: event.target.value})
    google = event.target.value
    //console.log("we set: " + this.state.getPoint)
  }

  // async componentDidMount() {
  //   this.setState({ getPoint: "ivvee" })
  // }

render() {
  return (
    <div css={appCss}>API call!
      <form>
        <label>
          Applicant Name:
          <input
            type="text"
            name="name"
            defaultValue="https://jsonplaceholder.typicode.com/users"
            onChange={this.handleChange}/>
        </label>
      </form>
      {console.log("TIME TO RENDER THE TEMPLATE! w/ " + this.state.getPoint)}
      <Template url={google}/>
    </div>
  )
}
}