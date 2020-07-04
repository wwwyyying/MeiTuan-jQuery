(function () {
  
  function init () {
    var items = [{
      key: 'index',
      value: '首页'
    }, {
      key: 'order',
      value: '订单'
    }, {
      key: 'my',
      value: '我的'
    }];

    var str = ``;

    items.forEach(element => {
      str += `
      <a class="${element.key} btn-item" href="../${element.key}/${element.key}.html">
        <div class="tab-icon"></div>
        <div class="btn-name">${element.value}</div>
      </a>
    `
    });

    $('.bottom-bar').append($(str));

    var arr = window.location.pathname.split('/');
    var page = arr[arr.length - 2];
    $(`a.${page}`).addClass('active');
  }

  init();
})();