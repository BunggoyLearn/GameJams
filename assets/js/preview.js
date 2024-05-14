const backButton = document.getElementById("back-button");

$( function() {
    $( "#speed" ).selectmenu();
 
    $( "#files" ).selectmenu();
 
    $( "#number" )
      .selectmenu()
      .selectmenu( "menuWidget" )
        .addClass( "overflow" );
 
    $( "#salutation" ).selectmenu();
} );


/*  */

backButton.addEventListener('click', function () {
    location.href = "index.html"
});