$(document).ready(function() {

    $(window).on("hashchange", function(e) {

        target = window.location.hash + "-section";
        if ( target ) {
            $('html, body').stop().animate(
                { scrollTop: $(target).offset().top },
                2000
            );
        }

        window.history.replaceState({}, document.title, ".");
        return false;
    });

    $('[data-toggle="tooltip"]').tooltip(); 

    $("#footer-button").click(function() { 
        $(".footer").toggle();
    });
});
