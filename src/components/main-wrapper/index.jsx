// Main wrapper
// ============
//
// This just provides a DOM for the Instructor to act on. It's completely
// unrelated to the library itself.

import React from 'react'

export default class MainWrapper extends React.Component {
  render() {
    return <main className="main-wrapper">
      <div className="box blue" data-instructable="blue-box">
        A blue box
      </div>
      <div className="box green" data-instructable="green-box">
        A green box
      </div>
    </main>
  }
}
