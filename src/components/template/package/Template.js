import React from 'react'
import { css } from '@emotion/react'

const templateCss = css`
  color: #fff;
  font-size: 28px;
`

const isLocal = () => {
  if (window.location.href == "http://localhost:8080/") {
    return true
  }
  return false
}

export default class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incoming: props.incoming,
      outgoing: props.outgoing,
      server: isLocal() ? 'http://localhost:3000/':'https://simple-api-backend.herokuapp.com/',
      nom: props.nom,
      loading: true,
      success: false,
      message: ''
    }
  }

  /*  // ignore: attempt at onChange urls address (proj uses static urls)
  async componentDidUpdate(prevProps) {
    if (this.props.incoming !== prevProps.incoming) {
      try {
        this.setState({ loading: true })
        const response = await fetch(this.props.incoming)
        const data = await response.json()
        this.setState({ loading: false, users: data })
      } catch(e) {
        console.error(e.message)
      }
    }
  }*/

  async componentDidMount() {
    isLocal() && console.log('Local env mode')
    const bodyObj = { 
      applicantName : this.state.nom,
      incomingUrl : this.state.incoming,
      outgoingUrl : this.state.outgoing
    }
    const bodyJson = JSON.stringify(bodyObj)
  
    fetch(this.state.server,{
      method: 'POST',
      headers: new Headers({
                 'Content-Type': 'application/json',
        }),
      body: bodyJson
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ success: true, message: data.message, loading: false })
      console.log('Success:', data)
    })
    .catch((error) => {
      this.setState({ success: false, message: error, loading: false})
      console.error('Error:', error)
    })
  }

  // Same way of doing the previous fetch part
  // Keeping for future reference
  //   const response = await fetch(this.state.server, {
  //     method: 'POST',
  //     headers: new Headers({
  //       'Content-Type':'application/json',
  //     }),
  //     body: bodyJson
  //   })
  //   const data = await response.json()
  //   this.setState({ loading: false, message: data.message, success: true })

  
  render() {
    return (
      <>
      <div css={templateCss}>
        <div>
          {this.state.loading ? "Loading..." : this.state.message}
        </div>
      </div>
      </>
    )
  }
}