import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '343308889915-d1pvp7s9povsj2g2resr22oreigebc2u.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: 'streamy',
            }).then(() => {
              this.auth = window.gapi.auth2.getAuthInstance();
              this.setState({ isSignedIn: this.auth.isSignedIn.get() });
              this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
     if (isSignedIn) {
      this.props.signIn();
     } else {
      this.props.signOut();
     }
    };

    onSignInClick = () => {
      this.auth.signIn();
    };

    onSignOutClick = () => {
      this.auth.signOut();
    };

    renderAuthButton() {
      if ( this.state.isSignedIn === null){
        return null;
      } else if (this.state.isSignedIn) {
        return <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      } else {
        return <button onClick={this.onSignInClick} className='ui red google button'>
        <i className='google icon' />
        Sign In with Google
      </button>
      }
    }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

export default connect(null, { signIn, signOut })(GoogleAuth);