function showStatus(message, type) {
    var alertSection = document.querySelector('#alerts');
    alertSection.innerHTML = "<div class=\"alert alert-"+type+"\" role=\"alert\">"+message+"</div>";
    setTimeout( ( ) => { alertSection.innerHTML = ""; }, 3000 );
}

export {showStatus}