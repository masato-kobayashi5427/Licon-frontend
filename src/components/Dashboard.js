import React from 'react'

export default function Dashboard(prop) {
  console.log(prop)
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {prop.loggedInStatus}</h2>
    </div>
  )
}