import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { authModalClose } from '../../redux/actions/authActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const CssTextField = withStyles({
  root: {
    width: '100%',
    minWidth: 170,
    marginTop: 10,
    marginBottom: 10,
    '& label.Mui-focused': {
      color: '#FF5722'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FF5722'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: '#FF5722'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FF5722'
      }
    },
    color: '#FFFFFF'
  }
})(TextField);

const useStyles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textfield: {
    width: '100%'
  },
  textFieldInput: {
    color: 'white'
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#FF5722',
    marginTop: 10,
    marginBottom: 10,
    '&:hover': {
      backgroundColor: 'white'
    }
  }
});

class RegisterForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert severity='error'>{error}</Alert>;
    }
  }

  renderInputField = ({ input, label, meta }) => {
    const { classes } = this.props;
    return (
      <div>
        <CssTextField
          label={label}
          type={input.name}
          {...input}
          variant='outlined'
          className={classes.textfield}
          InputProps={{
            className: classes.textFieldInput
          }}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderInputPassword = ({ input, label, meta }) => {
    const { classes } = this.props;
    return (
      <div>
        <CssTextField
          label={label}
          type='password'
          {...input}
          variant='outlined'
          className={classes.textfield}
          InputProps={{
            className: classes.textFieldInput
          }}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formVals => {
    this.props.onSubmit(formVals);
  };

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={classes.container}
      >
        <Field
          name='username'
          component={this.renderInputField}
          label='Username'
        />
        <Field name='email' component={this.renderInputField} label='Email' />
        <Field
          name='password'
          component={this.renderInputPassword}
          label='Password'
        />
        <Field
          name='repassword'
          component={this.renderInputPassword}
          label='Re-enter Password'
        />
        <Button
          type='submit'
          variant='contained'
          className={classes.registerButton}
        >
          Register
        </Button>
      </form>
    );
  }
}

const validate = formVal => {
  const errors = {};
  console.log('FORM VAL');
  console.log(formVal);
  if (!formVal.username) {
    errors.username = 'You must enter a username';
  }
  if (!formVal.email) {
    errors.email = 'You must enter an email';
  }
  if (!formVal.password) {
    errors.password = 'You must enter a password';
  }
  if (!formVal.repassword) {
    errors.repassword = 'You must enter re-enter your password';
  }
  return errors;
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

RegisterForm = connect(
  mapStateToProps,
  { authModalClose }
)(withStyles(useStyles)(RegisterForm));
export default reduxForm({ form: 'registerForm', validate })(RegisterForm);
