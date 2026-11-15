import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import '../scss/main.scss';
import $ from 'jquery';
import { navigation } from './modules/navigation/navigation.js';
import { dashboard } from './modules/dashboard/dashboard.js';
import { ticketList } from './modules/tickets/ticketList.js';
import { ticketForm } from './modules/tickets/ticketForm.js';
import { ticketDetails } from './modules/tickets/ticketDetails.js';
import { ticketService } from './services/ticketService.js';

window.$ = window.jQuery = $;

const shell = `
<div class="app-shell">
  <div class="sidebar-backdrop"></div>
  <aside class="sidebar" id="sidebar">
    <a class="brand" href="#" aria-label="HelpFlow início"><span class="brand-mark"><i class="bi bi-life-preserver"></i></span><span>help<span>flow</span><small>SUPPORT WORKSPACE</small></span></a>
    <div class="workspace-label">WORKSPACE</div>
    <nav class="side-nav" aria-label="Navegação principal">
      <button class="nav-link active" data-view="dashboard"><i class="bi bi-grid-1x2"></i>Visão geral</button>
      <button class="nav-link" data-view="tickets"><i class="bi bi-ticket-perforated"></i>Todos os chamados<span class="nav-count" id="nav-ticket-count">06</span></button>
    </nav>
    <div class="sidebar-bottom">
      <div class="help-card"><span class="help-icon"><i class="bi bi-lightbulb"></i></span><strong>Precisa de ajuda?</strong><p>Consulte as orientações da central de suporte.</p><a href="mailto:suporte@helpflow.demo">Falar com suporte <i class="bi bi-arrow-up-right"></i></a></div>
      <div class="profile"><div class="profile-avatar">LM</div><div><strong>Lucas Martins</strong><small>Agente de suporte</small></div><button class="profile-menu" aria-label="Opções do perfil"><i class="bi bi-three-dots"></i></button></div>
    </div>
  </aside>
  <main class="main-area">
    <header class="topbar">
      <div class="topbar-left"><button id="mobile-menu-toggle" class="icon-button mobile-toggle" aria-label="Abrir menu"><i class="bi bi-list"></i></button><div class="breadcrumb-label">Workspace <i class="bi bi-chevron-right"></i> <strong id="page-title">Visão geral</strong></div></div>
      <div class="topbar-actions"><span class="today-label"><i class="bi bi-calendar3"></i> <span id="today-date"></span></span><button class="icon-button notification-button" aria-label="Notificações"><i class="bi bi-bell"></i><span></span></button><div class="topbar-avatar">LM</div></div>
    </header>
    <div class="content-wrap">
      <section class="app-view" id="view-dashboard">
        <div class="page-heading"><div><span class="eyebrow">QUARTA-FEIRA · CENTRAL DE OPERAÇÕES</span><h1>Bom dia, Lucas <span>✦</span></h1><p>Acompanhe o que está acontecendo com seus atendimentos.</p></div><button class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#new-ticket-modal"><i class="bi bi-plus-lg"></i> Novo chamado</button></div>
        <div class="metrics-grid">
          <article class="metric-card"><div class="metric-top"><span>Total de chamados</span><span class="metric-icon icon-blue"><i class="bi bi-inbox"></i></span></div><strong id="metric-total">0</strong><small>Registros na central</small></article>
          <article class="metric-card"><div class="metric-top"><span>Abertos</span><span class="metric-icon icon-amber"><i class="bi bi-envelope-open"></i></span></div><strong id="metric-open">0</strong><small>Aguardando atendimento</small></article>
          <article class="metric-card"><div class="metric-top"><span>Em andamento</span><span class="metric-icon icon-violet"><i class="bi bi-arrow-repeat"></i></span></div><strong id="metric-progress">0</strong><small>Em atendimento</small></article>
          <article class="metric-card"><div class="metric-top"><span>Resolvidos</span><span class="metric-icon icon-green"><i class="bi bi-check2-circle"></i></span></div><strong id="metric-resolved">0</strong><small>Atendimentos concluídos</small></article>
        </div>
        <div class="dashboard-grid">
          <section class="panel recent-panel"><div class="panel-heading"><div><h2>Atividade recente</h2><p>Últimos chamados registrados na central</p></div><button class="text-button" data-view="tickets">Ver todos <i class="bi bi-arrow-right"></i></button></div><div id="recent-tickets" class="recent-list"></div></section>
          <section class="panel priority-panel"><div class="panel-heading"><div><h2>Prioridades</h2><p>Distribuição dos chamados</p></div><span class="panel-more"><i class="bi bi-three-dots"></i></span></div><div class="priority-summary"><strong id="metric-critical">0</strong><span>críticos em aberto</span></div>
            <div class="priority-bars"><div class="priority-row"><div><span>Crítica</span><strong>Crítica</strong></div><div class="progress"><div id="priority-critical" class="progress-bar bar-critical"></div></div></div><div class="priority-row"><div><span>Alta</span><strong>Alta</strong></div><div class="progress"><div id="priority-high" class="progress-bar bar-high"></div></div></div><div class="priority-row"><div><span>Média</span><strong>Média</strong></div><div class="progress"><div id="priority-medium" class="progress-bar bar-medium"></div></div></div><div class="priority-row"><div><span>Baixa</span><strong>Baixa</strong></div><div class="progress"><div id="priority-low" class="progress-bar bar-low"></div></div></div></div>
          </section>
        </div>
        <div class="insight-banner"><div class="insight-symbol"><i class="bi bi-stars"></i></div><div><strong>Um bom atendimento começa com clareza.</strong><p>Mantenha os chamados atualizados para que toda a equipe acompanhe cada etapa.</p></div><span class="insight-decoration">HF.</span></div>
      </section>
      <section class="app-view d-none" id="view-tickets">
        <div class="page-heading tickets-heading"><div><span class="eyebrow">ATENDIMENTO / SOLICITAÇÕES</span><h1>Central de chamados</h1><p>Organize solicitações e acompanhe cada atendimento.</p></div><button class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#new-ticket-modal"><i class="bi bi-plus-lg"></i> Novo chamado</button></div>
        <section class="panel table-panel"><div class="table-toolbar"><div><h2>Todos os chamados</h2><span id="tickets-count" class="results-count"></span></div><div class="filters"><div class="search-field"><i class="bi bi-search"></i><input id="ticket-search" type="search" placeholder="Buscar chamado..." aria-label="Buscar chamados"></div><select id="status-filter" class="form-select" aria-label="Filtrar por status"><option value="">Todos os status</option><option>Aberto</option><option>Em andamento</option><option>Resolvido</option></select><select id="priority-filter" class="form-select" aria-label="Filtrar por prioridade"><option value="">Prioridades</option><option>Crítica</option><option>Alta</option><option>Média</option><option>Baixa</option></select><select id="sort-filter" class="form-select sort-select" aria-label="Ordenar chamados"><option value="newest">Mais recentes</option><option value="oldest">Mais antigos</option></select></div></div>
          <div class="table-responsive"><table class="table align-middle ticket-table"><thead><tr><th>PROTOCOLO</th><th>CHAMADO / SOLICITANTE</th><th>STATUS</th><th>PRIORIDADE</th><th>ABERTURA</th><th></th></tr></thead><tbody id="tickets-table-body"></tbody></table></div><div class="table-footer"><span class="footer-note">Os dados são armazenados neste navegador.</span><div id="pagination" class="pagination"></div></div>
        </section>
      </section>
    </div>
  </main>
</div>
<div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="app-toast" class="toast align-items-center border-0" role="status" aria-live="polite" aria-atomic="true"><div class="d-flex"><div class="toast-body"></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button></div></div></div>
<div class="modal fade" id="new-ticket-modal" tabindex="-1" aria-labelledby="new-ticket-title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content custom-modal"><div class="modal-header"><div><span class="eyebrow">NOVA SOLICITAÇÃO</span><h2 class="modal-title" id="new-ticket-title">Abrir chamado</h2><p>Preencha os dados para registrar o atendimento.</p></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button></div><form id="ticket-form" novalidate><div class="modal-body"><div class="mb-3"><label class="form-label" for="field-title">Título do chamado</label><input id="field-title" class="form-control" placeholder="Ex.: Não consigo acessar o sistema" required><div class="invalid-feedback"></div></div><div class="row g-3"><div class="col-md-6"><label class="form-label" for="field-requester">Solicitante</label><input id="field-requester" class="form-control" placeholder="Nome completo" required><div class="invalid-feedback"></div></div><div class="col-md-6"><label class="form-label" for="field-email">E-mail</label><input id="field-email" type="email" class="form-control" placeholder="nome@empresa.com" required><div class="invalid-feedback"></div></div><div class="col-md-6"><label class="form-label" for="field-category">Categoria</label><select id="field-category" class="form-select"><option>Sistema</option><option>Acesso</option><option>Infraestrutura</option><option>Integração</option><option>Cadastro</option><option>Orientação</option></select></div><div class="col-md-6"><label class="form-label" for="field-priority">Prioridade</label><select id="field-priority" class="form-select"><option>Baixa</option><option selected>Média</option><option>Alta</option><option>Crítica</option></select></div><div class="col-12"><label class="form-label" for="field-description">Descrição</label><textarea id="field-description" class="form-control" rows="4" placeholder="Conte o que aconteceu e quais passos levaram ao problema..." required></textarea><div class="invalid-feedback"></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-light-custom" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-primary-custom">Criar chamado <i class="bi bi-arrow-right"></i></button></div></form></div></div></div>
<div class="modal fade" id="details-modal" tabindex="-1" aria-labelledby="detail-title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content custom-modal"><div class="modal-header"><div><span class="eyebrow" id="detail-protocol">HF-0000</span><h2 class="modal-title" id="detail-title">Detalhes do chamado</h2><p id="detail-date"></p></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button></div><div class="modal-body"><div class="detail-layout"><div class="detail-main"><h3>Descrição da solicitação</h3><p id="detail-description" class="detail-description"></p><div class="detail-requester"><div class="requester-avatar" id="detail-avatar"></div><div><strong id="detail-requester"></strong><small id="detail-email"></small></div><span id="detail-category" class="category-tag"></span></div><div class="note-field"><label class="form-label" for="detail-note">Adicionar observação</label><textarea id="detail-note" class="form-control" rows="2" placeholder="Registre uma atualização para o histórico..."></textarea></div></div><aside class="detail-side"><label class="form-label" for="detail-status">Status</label><select id="detail-status" class="form-select mb-3"><option>Aberto</option><option>Em andamento</option><option>Resolvido</option></select><label class="form-label" for="detail-priority">Prioridade</label><select id="detail-priority" class="form-select mb-3"><option>Baixa</option><option>Média</option><option>Alta</option><option>Crítica</option></select><span class="form-label">Responsável</span><div id="detail-assignee" class="assignee-value"></div></aside></div><div class="history-section"><h3>Histórico de atividades</h3><div id="detail-history" class="history-list"></div></div></div><div class="modal-footer"><button type="button" class="btn btn-light-custom" data-bs-dismiss="modal">Fechar</button><button type="button" id="save-ticket-changes" class="btn btn-primary-custom">Salvar alterações</button></div></div></div></div>
`;
$('#app').html(shell);

const refresh = () => {
  dashboard.render();
  ticketList.render();
  $('#nav-ticket-count').text(String(ticketService.getAll().length).padStart(2, '0'));
};
$(function () {
  $('#today-date').text(new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()));
  navigation.init();
  ticketForm.init();
  ticketDetails.init();
  refresh();
  $('#ticket-search, #status-filter, #priority-filter, #sort-filter').on('input change', () => ticketList.resetPage());
  $('#pagination').on('click', '[data-page]', function () { ticketList.setPage(Number($(this).data('page'))); });
  $(document).on('click', '[data-action="details"]', function () { ticketDetails.open($(this).data('id')); });
  $(document).on('tickets:updated', refresh);
});
