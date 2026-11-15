export const navigation = {
  init() {
    $(document).on('click', '[data-view]', function () {
      const view = $(this).data('view');
      $('[data-view]').removeClass('active');
      $(`[data-view="${view}"]`).addClass('active');
      $('.app-view').addClass('d-none');
      $(`#view-${view}`).removeClass('d-none');
      $('#page-title').text(view === 'dashboard' ? 'Visão geral' : 'Chamados');
      $('#sidebar').removeClass('mobile-open');
      $('.sidebar-backdrop').removeClass('show');
    });
    $('#mobile-menu-toggle').on('click', () => {
      $('#sidebar').toggleClass('mobile-open');
      $('.sidebar-backdrop').toggleClass('show');
    });
    $('.sidebar-backdrop').on('click', () => {
      $('#sidebar').removeClass('mobile-open');
      $('.sidebar-backdrop').removeClass('show');
    });
  }
};
