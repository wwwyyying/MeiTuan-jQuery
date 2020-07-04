(function () {

  function getList () {
    $.get('../json/food.json', function (data) {

      window.food_spu_tags = data.data.food_spu_tags || [];
      
      initContentList(window.food_spu_tags);

      window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0);
    })
  }

  function getItemContent (data) {
    if (data.icon) {
      return `
        <img class="item-icon" src="${data.icon}"/>${data.name}
      `
    } else {
      return data.name;
    }
  }

  function initContentList (list) {
  
    list.forEach(element => {
      var temp = `
        <div class="left-item">
          <div class="item-text">${getItemContent(element)}</div>
        </div>
      `;

      // 将element数据挂载到left-item上面
      var $target = $(temp);
      $target.data('itemData', element);
      $('.left-bar-inner').append($target);
    });

  }

  function addClick () {

    $('.menu-inner').on('click', '.left-item', function(e) {
      var $target = $(e.currentTarget);  
      
      $target.addClass('active');
      $target.siblings().removeClass('active');

      // 将数据传给右侧详情列表，进行渲染
      window.Right.refresh($target.data('itemData'));
    })
  }

  function init () {
    getList();
    addClick();
  }

  init();
})();