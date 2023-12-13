import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export const InputField = ({ label, type, name, value, onChange, error }) => (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <div className="input-group">
        <input
            type={type}
            className="form-control"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        />
        </div>
        {error && <span className="text-danger">{error}</span>}
    </div>
);

export const PasswordField = ({ label, name, value, onChange, showPassword, setShowPassword,error }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div className="input-group" id="show_hide_password">
            <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            <div className="input-group-text" data-password="true" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} aria-hidden="true"/>
            </div>
        </div>
        {error && <span className="text-danger">{error}</span>}
    </div>
);

export const Button = ({ type, label, className, onClick }) => (
    <button type={type} className={`button ${className}`} onClick={onClick}>
        {label}
    </button>
);

