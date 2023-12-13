import React, { useState } from 'react';
import { InputField, PasswordField,Button } from './FormComponents';
import { validateEmail, validatePassword } from '../utils/FormUtils';
import Dialogs from '../utils/Dialogs';

const LoginForm = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Field name:", name, "Value:", value);
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };
    const validateForm = () => {
        const newErrors = {};
        if (!validateEmail(values.email)) {
            newErrors.email = 'Vous devez fournir une adresse e-mail valide.';
        }
        if (!validatePassword(values.password)) {
            newErrors.password = 'Votre mot de passe doit contenir entre 5 et 16 caractères.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const isConfirmed = await Dialogs.showConfirmation("Confirmez-vous la soumission du formulaire ?");
            if (isConfirmed) {
                Dialogs.showAlert("Formulaire soumis avec succès !", Dialogs.ALERT_TYPES.SUCCESS);
                setValues({ email: '', password: '' });
                setErrors({});
            } else {
                Dialogs.showAlert("Soumission du formulaire annulée.", Dialogs.ALERT_TYPES.WARNING);
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10">
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="E-mail"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <PasswordField
                            label="Mot de passe"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            error={errors.password}
                        />
                        <div className="form-group d-flex justify-content-end">
                            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                        </div>
                        <div className="form-group">
                            <Button
                                type="submit"
                                label="ME CONNECTER"
                                className="custom-button-class"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;
