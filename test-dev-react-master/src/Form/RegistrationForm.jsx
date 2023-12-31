import React, {useState} from 'react';
import './RegisterForm.css';
import {validateEmail, validatePassword, validatePasswordMatch} from '../utils/FormUtils';
import {InputField, PasswordField,Button} from "./FormComponents";
import Dialogs from "../utils/Dialogs";

const RegistrationForm = () => {
    const [values, setValues] = useState({email: '', password: '', confirm: ''});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!validateEmail(values.email)) {
            newErrors.email = 'Veuillez fournir une adresse e-mail valide.';
        }
        if (!validatePassword(values.password)) {
            newErrors.password = 'Votre mot de passe doit contenir entre 5 et 16 caractères.';
        }
        if (!validatePasswordMatch(values.password, values.confirm)) {
            newErrors.confirm = 'Vos mots de passe doivent correspondre.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const isConfirmed = await Dialogs.showConfirmation("Confirmez-vous la soumission du formulaire ?");
            if (isConfirmed) {
                setValues({ email: '', password: '', confirm: '' });
                setErrors({});
                Dialogs.showAlert("Formulaire soumis avec succès !", Dialogs.ALERT_TYPES.SUCCESS);
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
                        <PasswordField
                            label="Mot de passe"
                            name="confirm"
                            value={values.confirm}
                            onChange={handleInputChange}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            error={errors.confirm}
                        />
                        <div className="form-group">
                            <Button type="submit" label="M'INSCRIRE" className="custom-button-class" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
