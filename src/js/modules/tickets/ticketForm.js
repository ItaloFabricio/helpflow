import { ticketService } from '../../services/ticketService.js';
import { validateTicket } from '../../utils/validators.js';
import { showToast } from '../../components/toast.js';

export const ticketForm = {
  init() {
    $('#ticket-form').on('submit', (event) => {
      event.preventDefault();
      const payload = {
        title: $('#field-title').val().trim(),
        requester: $('#field-requester').val().trim(),
        email: $('#field-email').val().trim(),
        category: $('#field-category').val(),
        priority: $('#field-priority').val(),
        description: $('#field-description').val().trim()
      };
      const errors = validateTicket(payload);
      $('.form-control, .form-select').removeClass('is-invalid');
      $('.invalid-feedback').text('');
      Object.entries(errors).forEach(([field, message]) => {
        const $field = $(`#field-${field}`);
        $field.addClass('is-invalid');
        $field.siblings('.invalid-feedback').text(message);
      });
      if (Object.keys(errors).length) {
        showToast('Revise os campos destacados.', 'warning');
        return;
      }
      const ticket = ticketService.create(payload);
      bootstrap.Modal.getOrCreateInstance($('#new-ticket-modal')[0]).hide();
      event.target.reset();
      showToast(`Chamado ${ticket.id} criado com sucesso.`);
      $(document).trigger('tickets:updated');
    });
    $('#new-ticket-modal').on('hidden.bs.modal', () => {
      $('#ticket-form')[0].reset();
      $('.form-control, .form-select').removeClass('is-invalid');
      $('.invalid-feedback').text('');
    });
  }
};
