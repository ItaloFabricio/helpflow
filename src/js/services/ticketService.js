import { storage } from '../core/storage.js';

let tickets = storage.getAll();

const persist = () => storage.save(tickets);

export const ticketService = {
  getAll() {
    return [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getById(id) {
    return tickets.find(ticket => ticket.id === id) ?? null;
  },
  create(payload) {
    const now = new Date().toISOString();
    const nextNumber = Math.max(2048, ...tickets.map(t => Number(t.id.split('-')[1]) || 0)) + 1;
    const ticket = {
      ...payload,
      id: `HF-${nextNumber}`,
      status: 'Aberto',
      assignee: 'Não atribuído',
      createdAt: now,
      updatedAt: now,
      history: [{ label: 'Chamado aberto', detail: `Solicitação registrada por ${payload.requester}.`, date: now }]
    };
    tickets = [ticket, ...tickets];
    persist();
    return ticket;
  },
  update(id, changes) {
    const index = tickets.findIndex(ticket => ticket.id === id);
    if (index < 0) return null;
    const previous = tickets[index];
    const now = new Date().toISOString();
    const history = [...(previous.history || [])];
    Object.entries(changes).forEach(([key, value]) => {
      if (previous[key] !== value) {
        const labels = { status: 'Status atualizado', priority: 'Prioridade atualizada', assignee: 'Responsável atualizado' };
        history.unshift({ label: labels[key] || 'Chamado atualizado', detail: `${key}: ${value}`, date: now });
      }
    });
    tickets[index] = { ...previous, ...changes, updatedAt: now, history };
    persist();
    return tickets[index];
  },
  addNote(id, note) {
    const ticket = this.getById(id);
    if (!ticket) return null;
    const updated = { ...ticket, history: [{ label: 'Observação adicionada', detail: note, date: new Date().toISOString() }, ...(ticket.history || [])], updatedAt: new Date().toISOString() };
    tickets = tickets.map(item => item.id === id ? updated : item);
    persist();
    return updated;
  },
  getMetrics() {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Aberto').length,
      progress: tickets.filter(t => t.status === 'Em andamento').length,
      resolved: tickets.filter(t => t.status === 'Resolvido').length,
      critical: tickets.filter(t => t.priority === 'Crítica' && t.status !== 'Resolvido').length
    };
  },
  reset() {
    tickets = storage.reset();
    return this.getAll();
  }
};
