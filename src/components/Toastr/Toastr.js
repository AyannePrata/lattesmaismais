
import toastr from 'toastr';
import './Toastr.css';

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  iconClasses: {
    error: 'fas fa-trash',
    info: 'fa fa-info',
    success: 'fas fa-check',
    warning: 'something',
},
}
  export function showMessage(title, message, type) {
    toastr[type] (message, title);
  }

  export function showErrorMessage(message) {
    showMessage('Erro', message, 'error');
  }

  export function showWarningMessage(message) {
    showMessage('Alerta', message, 'warning');
  }

  export function showSuccessMessage(message) {
    showMessage('Sucesso', message, 'success');
  }
