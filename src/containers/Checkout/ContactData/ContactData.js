import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      delieveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    return isValid;
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let elm in this.state.orderForm) {
      formData[elm] = this.state.orderForm[elm].value;
    }

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(res);
      })
      .catch((err) => {
        this.setState({ loading: false });

        console.log(err);
      });

    // console.log(this.props.ingredients);
  };
  inputChangedHandler = (event, id) => {
    // console.log(event.target.value);
    // this.setState({orderForm:})
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[id] };
    updatedFormElement.value = event.target.value;
    if (updatedFormElement.validation)
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    updatedFormElement.touched = true;

    // console.log(updatedFormElement);

    updatedOrderForm[id] = updatedFormElement;
    let formIsValid = true;
    for (let inputIndetifier in updatedOrderForm)
      formIsValid = updatedOrderForm[inputIndetifier].valid && formIsValid;
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    let formElementArray = [];
    for (let elm in this.state.orderForm) {
      formElementArray.push({ id: elm, config: this.state.orderForm[elm] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
