import { ticketService } from '../../services/ticketService.js';
import { formatDate, escapeHtml, initials } from '../../utils/formatters.js';
import { showToast } from '../../components/toast.js';

export const ticketDetails = {
  open(id) {
    const ticket = ticketService.getById(id);
    if (!ticket) return;
    $('#detail-protocol').text(ticket.id);
    $('#detail-title').text(ticket.title);
    $('#detail-description').text(ticket.description);
    $('#detail-requester').text(ticket.requester);
    $('#detail-email').text(ticket.email);
    $('#detail-category').text(ticket.category);
    $('#detail-assignee').text(ticket.assignee);
    $('#detail-status').val(ticket.status);
    $('#detail-priority').val(ticket.priority);
    $('#detail-avatar').text(initials(ticket.requester));
    $('#detail-date').text(`Aberto em ${formatDate(ticket.createdAt)}`);
    $('#detail-history').empty();
    (ticket.history || []).forEach(item => {
      $('#detail-history').append(`<div class="history-item"><span class="history-marker"></span><div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.detail)}</p><time>${formatDate(item.date)}</time></div></div>`);
    });
    $('#detail-note').val('');
    $('#details-modal').attr('data-ticket-id', id);
    bootstrap.Modal.getOrCreateInstance($('#details-modal')[0]).show();
  },
  init() {
    $('#save-ticket-changes').on('click', () => {
      const id = $('#details-modal').attr('data-ticket-id');
      ticketService.update(id, { status: $('#detail-status').val(), priority: $('#detail-priority').val() });
      const note = $('#detail-note').val().trim();
      if (note) ticketService.addNote(id, note);
      bootstrap.Modal.getOrCreateInstance($('#details-modal')[0]).hide();
      showToast('Alterações salvas com sucesso.');
      $(document).trigger('tickets:updated');
    });
  }
};
