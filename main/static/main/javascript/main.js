$(document).ready(function() {

    $(window).on("hashchange", function(e) {

        target = window.location.hash + "-section";
        if ( target ) {
            $('html, body').stop().animate(
                { scrollTop: $(target).offset().top },
                2000
            );
        }
        history.replaceState({}, document.title, ".");
        return false;
    });

});
