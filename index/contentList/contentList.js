(function () {

  var page = 0;
  var isLoading = false;

  /* 
    渲染商家列表元素
    @param  
  */
  function initList () {
    page++;
    isLoading = true;
    // 获取商家列表数据
    $.get('../json/homelist.json', function (data) {
      
      var list = data.data.poilist;
      
      var str = ``;
      // console.log(list);

      list.forEach((element, index) => {

        str +=  `
          <div class="r-item-content">
            <img class="item-img" src=${element.pic_url} />
            ${getBrand(element)}
            <div class="item-info-content">
              <p class="item-title"><a class="item-link" href="../menu/menu.html">${element.name}</a></p>
              <div class="item-desc clearfix">
                <div class="item-score">${new StarScore(element.wm_poi_score).getStars()}</div>
                <div class="item-count">月售${getMonthNum(element)}</div>
                <div class="item-distance">&nbsp;${element.distance}</div>
                <div class="item-time">${element.mt_delivery_time}&nbsp;|</div>
              </div>
              <div class="item-price">
                <div class="item-pre-price">${element.min_price_tip}</div>
              </div>
              <div class="item-others">
                ${getOthers(element)}
              </div>
            </div>
          </div>
        `
      });
      $('.list-wrap').append($(str));

      isLoading = false;
    })
  }


  /* 
    渲染商家品牌
  */
  function getBrand (data) {
    if (data.brand_type) {
      return '<div class="brand brand-pin">品牌</div>';
    } else {
      return '<div class="brand brand-xin">新到</div>';
    }
  }

  /* 
  渲染商家月售 
  */
  function getMonthNum (data) {
    var num = data.month_sale_num;
    if (num > 999) {
      return '999+';
    } else {
      return num;
    }
  }


  /* 
    渲染商家其他活动
  */
  function getOthers (data) {
    var array = data.discounts2;
    var str = ``;
    array.forEach(element => {
      str += `
        <div class="other-info">
          <img src=${element.icon_url} class="other-tag" />
          <p class="other-content one-line">${element.info}</p>
        </div>
      `
    });
    return str;
  }

  function addEvent () {
    window.addEventListener('scroll', function () {
      var clientHeight = document.documentElement.clientHeight;
      var scrollHeight = document.body.scrollHeight;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      var preDis = 30;
      if (scrollTop + clientHeight + preDis >= scrollHeight) {
        if (page < 3) {
          // 在发送ajax请求时避免触发多次滚动加载
          if (isLoading) {
            return;
          }
          initList();
        } else {
          $('.loading').text('加载完成');
        }
      }
    })
  }

  function init () {
    initList();
    addEvent();
  }

  init();
})();