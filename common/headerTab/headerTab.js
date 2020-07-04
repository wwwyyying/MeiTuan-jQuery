(function () {
  
  function init () {
    var items = [{
      key: 'menu',
      value: '点菜'
    }, {
      key: 'comment',
      value: '评价'
    }, {
      key: 'restaurant',
      value: '商家'
    }];

    var str = ``;

    items.forEach(element => {
      str += `
      <a class="${element.key} tab-item" href="../${element.key}/${element.key}.html">${element.value}
      </a>
    `
    });

    $('.tab-bar').append($(str));

    var arr = window.location.pathname.split('/');
    var page = arr[arr.length - 2];
    $(`a.${page}`).addClass('active');
  }

  init();
})();