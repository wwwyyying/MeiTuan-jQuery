(function (){

  // 顶部模板字符串
  var itemTopTemp = `
    <div class="choose-content hide">
      <div class="content-top">
        <div class="clear-car">清空购物车</div>
      </div>
    </div>
  `

  var itemBottomTemp = `
    <div class="bottom-content">
      <div class="shop-icon">
        <div class="dot-num hide"></div>
      </div>
      <div class="price-content">
        <p class="total-price">￥<span class="total-price-span">0</span></p>
        <p class="other-price">另需配送&nbsp;￥<span class="shipping-fee">0</span></p>
      </div>
      <div class="submit-btn">去结算</div>
    </div>

  `

  var $strTop = $(itemTopTemp);
  var $strBottom = $(itemBottomTemp);


  function renderItems () {
    $strTop.find('.choose-item').remove();
    var list = window.food_spu_tags || [];

    // console.log(list);
    var totalPrice = 0;

    list.forEach(item => {
      item.spus.forEach(_item => {

        // 如果有菜品数量大于0就开始渲染这条数据
        if (_item.chooseCount > 0) {
          var price = _item.min_price * _item.chooseCount;
          var row = `
              <div class="choose-item">
                <div class="item-name">${_item.name}</div>
                <div class="price">￥<span class="total">${price}</span></div>
                <div class="select-content">
                  <div class="minus"></div>
                  <div class="count">${_item.chooseCount}</div>
                  <div class="plus"></div>
                </div>
              </div>
            `;
          
          totalPrice += price;

          var $row = $(row);
          $row.data('itemData', _item);
          $strTop.append($row);

        }
      })

      changeTotalPrice(totalPrice);

      changeDot();
    })
  }

  function changeShippingPrice (str) {
    $strBottom.find('.shipping-fee').text(str);
  }

  function changeTotalPrice (str) {
    $strBottom.find('.total-price-span').text(str);
  }

  function changeDot () {
    var $counts = $strTop.find('.count');

    var total = 0;

    for ( var i = 0; i< $counts.length; i++) {
      total += parseInt($($counts[i]).text());
    }

    if(total > 0) {
      $('.dot-num').show().text(total);
    } else {
      $('.dot-num').hide();
    }
  }

  function addClick () {
    $('.shop-bar').on('click', '.shop-icon', function() {
      $('.mask').toggle();
      $strTop.toggle();
    });


    $strTop.on('click', '.plus', function(e) {
      var $count = $(e.currentTarget).parent().find('.count');

      $count.text(parseInt($count.text() || '0') + 1);

      var $item = $(e.currentTarget).parents('.choose-item').first();

      var itemData = $item.data('itemData');

      itemData.chooseCount = itemData.chooseCount + 1;

      renderItems();

      $('.left-item.active').click()
    });

    $strTop.on('click', '.minus', function(e) {
      var $count = $(e.currentTarget).parent().find('.count');

      if ($count.text() == 0) return;

      $count.text(parseInt($count.text() || '0') - 1);

      var $item = $(e.currentTarget).parents('.choose-item').first();

      var itemData = $item.data('itemData');

      itemData.chooseCount = itemData.chooseCount - 1;

      renderItems();

      $('.left-item.active').click()
    });
  }

  function init () {
    $('.shop-bar').append($strTop);
    $('.shop-bar').append($strBottom);
    addClick();
  }

  init();

  window.ShopBar = {
    renderItems: renderItems,
    changeShippingPrice:changeShippingPrice
  }
})();