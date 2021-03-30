import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

export default class Room extends Component {

  constructor(props){
    super(props)

    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false
    }
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.leaveRoom = this.leaveRoom.bind(this)
    this.updateShowSettings = this.updateShowSettings.bind(this)
  }

  leaveRoom(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }
    fetch('/api/leave-room', requestOptions)
    .then(response => {
      this.props.leaveRoomCallback()
      this.props.history.push('/')
    })
  }

  getRoomDetails() {
    fetch('/api/get-room' + '?code=' + this.roomCode)
    .then((response) => {
      if (!response.ok){
        this.props.leaveRoomCallback()
        this.props.history.push('/')
      }
      return response.json()
    })
    .then((data) => { //data is basically response.json()
      this.setState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host
      })
    })
  }

  updateShowSettings(value){
    this.setState({
      showSettings: value
    })
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    )
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={this.leaveRoom}>
            Leave room
          </Button>
        </Grid>
    </Grid>
    )
  }
}

// <div>
//       <h4>{this.roomCode}</h4>
//       <p>{this.state.votesToSkip}</p>
//       <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
//       <p>Host: {this.state.isHost.toString()}</p>
//     </div>