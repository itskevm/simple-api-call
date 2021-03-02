import React from 'react'
import { css } from '@emotion/react'

const templateCss = css`
  color: red !important;
  font-size: 28px;
`
export default class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.url,
      nom: props.nom,
      loading: true,
      users: null,
      success: true,
    }
  }

  // ignore for now
  async componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      try {
        this.setState({ loading: true })
        const response = await fetch(this.props.url)
        const data = await response.json()
        this.setState({ loading: false, users: data })
      } catch(e) {
        console.error(e.message)
      }
    }
  }

  async componentDidMount() {
    console.log('Component Mounting')
    fetch(this.state.url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => {
      console.log('got eem')
    })
    .catch((error) => {
      this.setState({ loading: false, success: false })
      console.log(error)
    })

    const response = await fetch(this.state.url)
    const data = await response.json()
    this.setState({ loading: false, users: data, success: true })
    console.log('Name prop: ' + this.props.nom)
    console.log('Component Finished Mounting')
    const fullObject = { applicant: this.props.nom , users: data}
    const foJSON = JSON.stringify(fullObject)

    fetch('https://scheduler.luminarycxm.com/api/v1/cleaned/data/test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullObject),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  render() {
    console.log("we got: " + this.state.url)
    return (
      <>
      <div css={templateCss}>
        <div>
          {this.state.users ? "Data found!" : "Loading..."}
          {!this.state.success && "Failed to load"}
        </div>
      </div>
      </>
    )
  }
}