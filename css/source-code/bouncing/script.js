var zonewrap = $("#zone-wrap");
var zone = $("#zone");

var blur = $("#blur");
var contrast = $("#contrast");
var brightness = $("#brightness");

$("input").on("change", function() {
  
  var newValue = $(this).val();
  var relatedThing = this.id;
  
  if (relatedThing == "blur") {
    zone.css({
      "filter": "blur(" + newValue + "px)"
    });
  }
  
  if (relatedThing == "contrast" || relatedThing == "brightness") {
    zonewrap.css({
      "filter": "brightness(" + brightness.val() + ") contrast(" + contrast.val() + ")"
    });
  }
  
});