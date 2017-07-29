var slideIndex = 0;
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        var slide = slides[i];
        $(slide).hide()
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    $(slides[slideIndex-1]).show();  
    setTimeout(showSlides, 10000); // Change image every 10 seconds
}

$(document).ready(function() {

    showSlides();

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

    $(".clickable").on("click", function() {
        $(this).next().slideToggle();
    });
});
