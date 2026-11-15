export const showToast = (message, type = 'success') => {
  const $toast = $('#app-toast');
  $toast.removeClass('text-bg-success text-bg-danger text-bg-warning')
    .addClass(type === 'success' ? 'text-bg-success' : type === 'error' ? 'text-bg-danger' : 'text-bg-warning');
  $toast.find('.toast-body').text(message);
  bootstrap.Toast.getOrCreateInstance($toast[0], { delay: 3200 }).show();
};
