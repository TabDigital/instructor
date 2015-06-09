// Main wrapper
// ============
//
// This just provides a DOM for the Instructor to act on. It's completely
// unrelated to the library itself.

import React from 'react'

export default class MainWrapper extends React.Component {
  render() {
    return <main className="main-wrapper">
      <div className="box blue">
        A blue box
      </div>
      <div className="box green">
        A green box
      </div>
    </main>
  }
}
