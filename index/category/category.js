(function () {

  /* 
    渲染category元素
    @param  
  */
  function initCategory () {
    // 获取category的数据
    $.get('../json/head.json', function (data) {
      
      var list = data.data.primary_filter;
      
      var str = ``;

      list.forEach((element, index) => {

        str +=  `
          <div class="category-item">
            <img class="item-icon" src=${element.url} />
            <p class="item-name">${element.name}</p>
          </div>
        `
      });
      $('.category-content').append($(str));
    })
  }

  /* 
    绑定item的click事件
    @param
  */
 function addClick () {
   $('.category-content').on('click', '.category-item', function () {
    alert(1);
   });
 }

  function init () {
    initCategory();
    addClick();
  }

  init();
})();