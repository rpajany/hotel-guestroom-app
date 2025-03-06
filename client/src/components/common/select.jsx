import React, { Component } from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-7">
                <select name={name} id={name} {...rest} className="form-control">
                    {/* <option value="" /> */}
                    {options.map(option => (
                        <option key={option._id} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
}

export default Select;