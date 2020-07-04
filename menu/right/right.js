(function () {

  function initRightList (list) {
    $('.right-list-inner').html('');

    list.forEach(element => {

      if (!element.chooseCount) {
        element.chooseCount = 0;
      }

      var temp = `
        <div class="menu-item">
          <img class="img" src="${element.picture}" />
          <div class="menu-item-right">
            <p class="item-title">${element.name}</p>
            <p class="item-desc">${element.description}</p>
            <p class="item-zan">${element.praise_content}</p>
            <p class="item-price">￥${element.min_price}\/<span class="unit">${element.unit}</span></p>
          </div>
          <div class="select-content">
            <div class="minus"></div>
            <div class="count">${element.chooseCount}</div>
            <div class="plus"></div>
          </div>
        </div>
      `;

      
      var $target = $(temp);
      $target.data('itemData', element);
      $('.right-list-inner').append($target);
    });
  }

  function initRightTitle (str) {
    $('.right-title').text(str);
  }

  function addClick () {
    $('.menu-item').on('click', '.plus', function(e) {
      var $count = $(e.currentTarget).parent().find('.count');

      $count.text(parseInt($count.text() || '0') + 1);
      
      var $element = $(e.currentTarget).parents('.menu-item').first();

      var itemData = $element.data('itemData');
      itemData.chooseCount = itemData.chooseCount + 1;

      window.ShopBar.renderItems();
      // console.log('shopbar');
    });

    $('.menu-item').on('click', '.minus', function(e) {
      var $count = $(e.currentTarget).parent().find('.count');

      if ($count.text() == 0) {
        return;
      }

      $count.text(parseInt($count.text() || '0') - 1);

      var $element = $(e.currentTarget).parents('.menu-item').first();
      var itemData = $element.data('itemData');
    
      itemData.chooseCount = itemData.chooseCount - 1;

      window.ShopBar.renderItems();
    });
  }

  function init (data) {
    initRightList(data.spus || []);
    initRightTitle(data.name);
    addClick();
  }

  window.Right = {
    refresh: init
  }

  
})();