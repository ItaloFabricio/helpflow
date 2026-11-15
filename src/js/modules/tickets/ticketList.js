import { ticketService } from '../../services/ticketService.js';
import { formatDate, escapeHtml } from '../../utils/formatters.js';

const PAGE_SIZE = 5;
let currentPage = 1;

const badge = (value, type) => `<span class="status-badge ${type}-${value.toLowerCase().replaceAll(' ', '-')}">${escapeHtml(value)}</span>`;

export const ticketList = {
  render() {
    const search = $('#ticket-search').val()?.toLowerCase().trim() || '';
    const status = $('#status-filter').val() || '';
    const priority = $('#priority-filter').val() || '';
    const sort = $('#sort-filter').val() || 'newest';
    let filtered = ticketService.getAll().filter(ticket => {
      const haystack = `${ticket.id} ${ticket.title} ${ticket.requester}`.toLowerCase();
      return haystack.includes(search) && (!status || ticket.status === status) && (!priority || ticket.priority === priority);
    });
    filtered.sort((a, b) => sort === 'oldest' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, pages);
    const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const $body = $('#tickets-table-body').empty();
    if (!visible.length) {
      $body.append('<tr><td colspan="6"><div class="empty-state"><i class="bi bi-search"></i><strong>Nenhum chamado encontrado</strong><span>Tente ajustar os filtros ou a busca.</span></div></td></tr>');
    } else {
      visible.forEach(ticket => {
        $body.append(`
          <tr>
            <td><span class="protocol">${escapeHtml(ticket.id)}</span></td>
            <td><div class="ticket-cell"><strong>${escapeHtml(ticket.title)}</strong><small>${escapeHtml(ticket.category)} · ${escapeHtml(ticket.requester)}</small></div></td>
            <td>${badge(ticket.status, 'status')}</td>
            <td>${badge(ticket.priority, 'priority')}</td>
            <td><span class="date-text">${formatDate(ticket.createdAt)}</span></td>
            <td><button class="icon-button" type="button" data-action="details" data-id="${escapeHtml(ticket.id)}" aria-label="Ver detalhes de ${escapeHtml(ticket.id)}"><i class="bi bi-arrow-up-right"></i></button></td>
          </tr>`);
      });
    }
    this.renderPagination(filtered.length, pages);
    $('#tickets-count').text(`${filtered.length} ${filtered.length === 1 ? 'chamado' : 'chamados'}`);
  },
  renderPagination(total, pages) {
    const $pagination = $('#pagination').empty();
    if (total <= PAGE_SIZE) return;
    $pagination.append(`<button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Página anterior"><i class="bi bi-chevron-left"></i></button>`);
    for (let page = 1; page <= pages; page++) {
      $pagination.append(`<button class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}" aria-label="Página ${page}" aria-current="${page === currentPage ? 'page' : 'false'}">${page}</button>`);
    }
    $pagination.append(`<button class="page-btn" data-page="${currentPage + 1}" ${currentPage === pages ? 'disabled' : ''} aria-label="Próxima página"><i class="bi bi-chevron-right"></i></button>`);
  },
  setPage(page) { currentPage = page; this.render(); },
  resetPage() { currentPage = 1; this.render(); }
};
