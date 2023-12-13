/**
 * Valide l'adresse e-mail.
 * @param {string} email - L'adresse e-mail à valider.
 * @returns {boolean} - Retourne true si l'e-mail est valide, sinon false.
 */
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
};

/**
 * Valide le mot de passe.
 * @param {string} password - Le mot de passe à valider.
 * @returns {boolean} - Retourne true si le mot de passe est dans les limites de longueur spécifiées, sinon false.
 */
export const validatePassword = (password) => {
    return password.length >= 5 && password.length <= 16;
};

/**
 * Vérifie si deux mots de passe sont identiques.
 * @param {string} password - Le mot de passe.
 * @param {string} confirmPassword - Le mot de passe de confirmation.
 * @returns {boolean} - Retourne true si les deux mots de passe correspondent, sinon false.
 */
export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};
