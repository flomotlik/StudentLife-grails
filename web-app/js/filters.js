var s = 'navigation_item_';
var navItems = [s + 'all', s + 'mathe1', s + 'mathe2'];
var navActive = s + 'all';

function setActivation(activeItem) {
    //trigger ajax get of new content for stream
    if(activeItem != navActive) {
        $(navActive).removeClassName('selected');

        navActive = activeItem;
        $(navActive).addClassName('loading');
        // upon receiving data, remove loading
        // $(navActive).removeClassName('loading');
        $(navActive).addClassName('selected');
    } else {
        $(navActive).addClassName('loading');
    // upon receiving data, remove loading
    // $(navActive).removeClassName('loading');
    }
}
