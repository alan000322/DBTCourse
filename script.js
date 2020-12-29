//import "./all.css";
$(document).ready(function () {
    $('.nav-link').hover(function () {
            // over
            $(this).addClass('border-bottom border-dark');
        }, function () {
            // out
            $(this).removeClass('border-bottom border-dark'); 
        }
    );
    
    
});