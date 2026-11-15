import initialTickets from '../../data/tickets.json';

const STORAGE_KEY = 'helpflow:tickets:v1';

export const storage = {
  getAll() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      this.save(initialTickets);
      return [...initialTickets];
    } catch (error) {
      console.error('Não foi possível recuperar os chamados:', error);
      return [...initialTickets];
    }
  },
  save(tickets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
    this.save(initialTickets);
    return [...initialTickets];
  }
};
