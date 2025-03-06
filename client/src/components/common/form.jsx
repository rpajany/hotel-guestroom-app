import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    handleChange = ({ currentTarget: input }) => {
        // duplicate error
        const errors = { ...this.state.errors };


    }

    validateProperty = ({ name, value }) => {

    }

    // Textbox function
    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    // dropdown function
    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    // Button function
    renderButton(label, btnClass) {
        return (
            <button disabled={this.validate()} className={btnClass}>{label}</button>
        )
    }
}

export default Form;