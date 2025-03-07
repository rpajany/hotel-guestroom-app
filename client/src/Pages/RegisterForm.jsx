import React, { Component } from 'react';
import Form from "../components/common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {

    state = {
        data: {
            username: "",
            password: "",
            name: ""
        },
        errors: {}
    }


    // schema
    schema = {
        username: Joi.string()
            .required()
            .email()
            .label("Username"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
        name: Joi.string()
            .required()
            .label("Name")
    };



    render() {
        return (

            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>

        )
    }


}

export default RegisterForm;