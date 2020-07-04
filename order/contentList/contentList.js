(function () {

  var page = 0;
  var isLoading = false;

  function getList () {
    page++;
    isLoading = true;
    $.get('../json/orders.json', function (data) {
      console.log(data);
      var list = data.data.digestlist || [];

      initContentList(list);
      isLoading = false;
    });
  }

  function initContentList (list) {
    var str = ``;
    list.forEach(element => {
      str += `
      <div class="order-item">
        <div class="order-item-inner">
          <img class="item-img" src="${element.poi_pic}"/>
          <div class="item-right">
            <div class="item-top">
              <p class="order-name one-line">${element.poi_name}</p>
              <div class="arrow"></div>
              <div class="order-state">${element.status_description}</div>
            </div>
            <div class="item-bottom">${getProduct(element)}</div>
          </div>
        </div>
        ${getComment(element)}
      </div>
    `
    });

    $('.order-list').append($(str));
  }

  function getProduct (data) {
    var list = data.product_list || [];

    list.push({type: 'more'});

    var str = ``;

    list.forEach(element => {
      if (element.type === 'more') {
        str += getTotalPrice(data);
      } else {
        str += `
          <div class="product-item">
            ${element.product_name}
            <div class="p-count">x
              ${element.product_count}
            </div>
          </div>
        `
      }
    });
    return str;
  }

  function getTotalPrice (data) {
    var str = `
      <div class="product-item">
        <span>...</span>
        <div class="p-total-count">
          总计${data.product_count}个菜，实付
          <span class="total-price">￥${data.total}</span>
        </div>
      </div>
    `

    return str;
  }

  function getComment (data) {
    var evaluation = !data.is_comment;

    if (evaluation) {
      return `
        <div class="evaluation clearfix">
          <div class="evaluation-btn">评价</div>
        </div>
      `
    }
    return '';
  }

  function addEvent () {
    window.addEventListener('scroll', function () {
      var clientHeight = document.documentElement.clientHeight;
      var scrollHeight = document.body.scrollHeight;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      var preDis = 30;

      if (scrollTop + clientHeight + preDis >= scrollHeight) {
        if (page < 3) {
          if (isLoading) {
            return ;
          }
          getList();
        } else {
          $('.loading').text('加载完成');
        }
      }
    })
  }

  function init () {
    getList();
    addEvent();
  }

  init();
})();