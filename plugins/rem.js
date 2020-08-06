import Vue from 'vue'

var htmlEle = document.documentElement;
var winWidth = htmlEle.clientWidth || document.body.clientWidth;
Vue.prototype.isMobile = false;
if (winWidth <= 750) {
    // 手机端样式
    let htmFontSize = Math.ceil(16 * (winWidth / 750))
    htmlEle.style.fontSize = htmFontSize + 'px';
    Vue.prototype.isMobile = true;
    Vue.prototype.htmFontSize = htmFontSize;
}