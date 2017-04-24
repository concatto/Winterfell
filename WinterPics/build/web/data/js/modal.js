/**
 * use this to automatize Bootstrap modal calling.
 * @param string modal
 * @param string placement
 * @returns renders modal over specified div
 */
function loadModal(modal){
    var div = $("<div>");
    $("body").append(div);
    div.load("./modal/"+modal+".html");
}