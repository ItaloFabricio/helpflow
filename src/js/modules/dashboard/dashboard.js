import { ticketService } from '../../services/ticketService.js';
import { formatDate, escapeHtml } from '../../utils/formatters.js';

export const dashboard = {
  render() {
    const metrics = ticketService.getMetrics();
    $('#metric-total').text(metrics.total);
    $('#metric-open').text(metrics.open);
    $('#metric-progress').text(metrics.progress);
    $('#metric-resolved').text(metrics.resolved);
    $('#metric-critical').text(metrics.critical);
    const recent = ticketService.getAll().slice(0, 4);
    const $list = $('#recent-tickets').empty();
    recent.forEach(ticket => {
      $list.append(`<button class="recent-item" data-action="details" data-id="${escapeHtml(ticket.id)}">
        <span class="recent-dot ${ticket.status === 'Resolvido' ? 'is-done' : ticket.priority === 'Crítica' ? 'is-critical' : ''}"></span>
        <span class="recent-copy"><strong>${escapeHtml(ticket.title)}</strong><small>${escapeHtml(ticket.id)} · ${escapeHtml(ticket.requester)}</small></span>
        <time>${formatDate(ticket.createdAt)}</time>
      </button>`);
    });
    const total = Math.max(metrics.total, 1);
    $('#priority-critical').css('width', `${ticketService.getAll().filter(t => t.priority === 'Crítica').length / total * 100}%`);
    $('#priority-high').css('width', `${ticketService.getAll().filter(t => t.priority === 'Alta').length / total * 100}%`);
    $('#priority-medium').css('width', `${ticketService.getAll().filter(t => t.priority === 'Média').length / total * 100}%`);
    $('#priority-low').css('width', `${ticketService.getAll().filter(t => t.priority === 'Baixa').length / total * 100}%`);
  }
};
