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
      loading: true,
      users: null
    }
  }

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
    const response = await fetch(this.state.url)
    const data = await response.json()
    this.setState({ loading: false, users: data })
  }
  
  render() {
    console.log("we got: " + this.state.url)
    return (
      <>
      <div css={templateCss}>
        <div>
          {this.state.users ? "Data found!" : "Loading..."}
          {console.log(this.state.users)}
        </div>
      </div>
      </>
    )
  }
}