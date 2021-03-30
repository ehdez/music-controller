import React, { Component } from 'react';
import { BrowserRouter as Router, 
  Switch, 
  Route, 
  Link, 
  Redirect 
} from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomCode: null
    }
    this.clearRoomCode = this.clearRoomCode.bind(this)
  }

  async componentDidMount() {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code
        })
      })
  }

  renderHomePage(){
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disabledElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }

  clearRoomCode(){
    this.setState({
      roomCode: null
    })
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => {
            return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`}/>) : (this.renderHomePage())
          }}>
          </Route>
          <Route path='/join' component={RoomJoinPage}></Route>
          <Route path='/create' component={CreateRoomPage}></Route>
          <Route 
            path='/room/:roomCode' 
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode}/>
            }}
          >  
          </Route>
        </Switch>
      </Router>
    )
  }
}