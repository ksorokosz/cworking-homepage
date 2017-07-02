window.onhashchange = function() {
    window.history.pushState("", document.title, window.location.pathname);
};

$( document ).ready(function() {

});
