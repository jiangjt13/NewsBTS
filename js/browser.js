window.onresize = doLayout;
var isLoading = false;

onload = function () {
  var webview = document.querySelector('webview');
  doLayout();

};

function navigateTo(url) {
  resetExitedState();
  document.querySelector('webview').src = document.getElementById("title-list-instiz").firstChild
}

function doLayout() {
  var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth - 250;
  var webviewHeight = windowHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
  controls.style.height = webviewHeight + 'px';

  var sadWebview = document.querySelector('#sad-webview');
  sadWebview.style.width = webviewWidth + 'px';
  sadWebview.style.height = webviewHeight * 2 / 3 + 'px';
  sadWebview.style.paddingTop = webviewHeight / 3 + 'px';
}

function newsitemclicked(e) {
  var webview = document.querySelector('webview');
  document.getElementById("search_box").value=e.getAttribute("data-href");
  webview.src = e.getAttribute("data-href");
}

function changesourceclicked(e) {
  var navbar = document.getElementById("navbarsExampleDefault").getElementsByClassName("nav-link");
  Array.from(navbar).forEach((item) => {
    item.classList.remove("active");
  });
  e.classList.add("active");
  document.getElementById("title-list-" + "theqoo").style.display = "none";
  document.getElementById("title-list-" + "pann").style.display = "none";
  document.getElementById("title-list-" + "instiz").style.display = "none";
  document.getElementById("title-list-" + e.text).style.display = onpageshow;
}


