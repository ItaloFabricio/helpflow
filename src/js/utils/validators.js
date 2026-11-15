export const validateTicket = (payload) => {
  const errors = {};
  if (!payload.title?.trim()) errors.title = 'Informe um título para o chamado.';
  if (!payload.requester?.trim()) errors.requester = 'Informe o nome do solicitante.';
  if (!payload.email?.trim()) errors.email = 'Informe o e-mail do solicitante.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = 'Informe um e-mail válido.';
  if (!payload.description?.trim()) errors.description = 'Descreva o problema.';
  return errors;
};
