(function () {
  // 商家详情

  function _getStars () {
    var _score = this.score.toString();

    var scoreArray = _score.split('.');

    var fullstar = parseInt(scoreArray[0]);

    var halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;

    var graystar = 5 - fullstar - halfstar;

    var starstr = ``;

    for (var i = 0; i < fullstar; i++) {
      starstr += `
        <div class="star fullstar"></div>
      `
    }

    for (var j = 0; j < halfstar; j++) {
      starstr += `
        <div class="star halfstar"></div>
      `
    }

    for (var k = 0; k < graystar; k++) {
      starstr += `
        <div class="star graystar"></div>
      `
    }

    return `
    <div class="star-score">${starstr}</div>
  `;
  }

  window.StarScore = function (score) {
    this.score = score || '';
    this.getStars = _getStars;
  }
})();