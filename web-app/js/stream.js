function checkForm() {
    if($('composer_input').value=="") {
        return true;
    }

    return false;
}
function showButtons(){
    var d = $('composer_buttons');
    d.show().removeClassName('hidden');
}

function hideButtons(){
    if(checkForm()) {
        var d = $('composer_buttons');
        d.hide().addClassName('hidden');
    }
}

function showLoader(){
    var d = $('pagerloader');
    d.show().removeClassName('hidden');
    alert("Need to remove this upon receiving json");
}

function hideLoader(){
    var d = $('pagerloader');
    d.hide().addClassName('hidden');
}