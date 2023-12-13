import Swal from 'sweetalert2';

const Dialogs = {
    ALERT_TYPES: {
        SUCCESS: "success",
        WARNING: "warning",
        DANGER: "error",
    },
    showConfirmation: async (message, title = "Confirmation") => {
        const result = await Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
        });
        return result.isConfirmed;
    },
    showAlert: (message, type = Dialogs.ALERT_TYPES.SUCCESS, title = "Alerte") => {
        Swal.fire({
            title: title,
            text: message,
            icon: type,
            confirmButtonColor: '#3085d6',
        });
    }
};

export default Dialogs;
