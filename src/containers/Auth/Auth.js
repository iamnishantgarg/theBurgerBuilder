import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 7,
        },
      },
    },
    isSignup: true,
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if (rules) return isValid;
  };
  inputChangedHandler = (event, id) => {
    const updateControls = {
      ...this.state.controls,
      [id]: {
        ...this.state.controls[id],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[id].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updateControls });
  };

  switchAuthMode = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });
    if (this.props.loading) form = <Spinner />;
    let errorMessage = null;
    if (this.props.error) errorMessage = <p>{this.props.error.message}</p>;
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthMode}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
