tabris.ui.set("toolbarVisible", false);
var page = new tabris.Page({
  topLevel: true,
  background: "rgb(230,230,230)"
}).open();
//---------------------------------------------------------------------------------------------------------------------------

page.on("touchstart", function(){
  if (menus.get("enabled") == true){
  menus.animate({opacity: 0, transform: {translationY: screen.height-360, scaleX: 0, scaleY: 0}})
  menus.set("enabled", false)
}
});

var menus = new tabris.Composite({
  left: 15, right: 15, bottom: 100, top: 45,
  opacity: 0,
  transform: {translationY: screen.height-360, scaleX: 0, scaleY: 0},
  cornerRadius: 25,
  elevation: 5,
  enabled: false,
  background: "white"
}).once("resize", function(){
  index = 1;
  page.find("#"+(index)).set("background", "rgba(255,255,190,0.9)")
}).on("swipe:down",function(){
if (this.get("enabled") == true){
  this.animate({opacity: 0, transform: {translationY: screen.height-360, scaleX: 0, scaleY: 0}})
  this.set("enabled", false)
}
}).appendTo(page);

for (var index = 1; index < 6; index++) {
  new tabris.Composite({
    id: index,
    layoutData: {bottom: 10, left: "prev() 7.5", height: 10, width: 10},
    cornerRadius: 5,
    background: "rgba(255,255,255,0.9)",
    elevation: 3,
    transform: {translationX: 117.5}
  }).appendTo(menus);
}

var prev = new tabris.TextView({
  layoutData: {left: 20, bottom: 5}
}).appendTo(menus);

var nxt = new tabris.TextView({
  layoutData: {right: 20, bottom: 5}
}).appendTo(menus);

 var scrollMenu = new tabris.ScrollView({
    layoutData: {bottom: 27.5, left: 0, right: 0, top: 40},
    background: "rgb(255,255,255)",
    elevation: 2
 }).on("resize", function(){
   textChange();
 }).on("swipe:left", function(){
  if (index < 5){
  next();
  textChange();
  }
}).on("swipe:right",function(){
  if (index > 1){
  previous();
  textChange();
  }
 }).appendTo(menus);

var text = new tabris.TextView({
  layoutData: {top: 0, left: 10, right: 10, bottom: 10},
  alignment: "center"
}).appendTo(scrollMenu);

var button = new tabris.Composite({
  width: 50, height: 50, bottom: 30, centerX: 0,
  background: "white",
  elevation: 3,
  cornerRadius: 25
}).on("tap", function(){
  list();
}).appendTo(page);

function next(){
      if (index == 4){
      nxt.set("text", "")
      prev.set("text", index)
    } else { 
      nxt.set("text", index + 2)
           }
    prev.set("text", index)
    page.find("#"+(index)).set("background", "rgba(255,255,255,0.9)")
    page.find("#"+(++index)).set("background", "rgba(255,255,190,0.9)")
  menus.animate({opacity: 0.7, transform: {translationX: -screen.width}}, {duration: 350, easing: "ease-in-out"})
  menus.once("animationend", function(){
    menus.set({transform: {translationX: screen.width}})
    menus.animate({opacity: 1, transform: {translationX: 0}}, {duration: 350, easing: "ease-in-out"})
  });
}

function previous(){
    if (index == 2){
      prev.set("text", "")
      nxt.set("text", index)
    } else {
         prev.set("text", index - 2)
    }
    nxt.set("text", index)

  page.find("#"+(index)).set("background", "rgba(255,255,255,0.9)")
  page.find("#"+(--index)).set("background", "rgba(255,255,190,0.9)")
  menus.animate({opacity: 0.7, transform: {translationX: screen.width}}, {duration: 350, easing: "ease-in-out"})
  menus.once("animationend", function(){
    menus.set({transform: {translationX: -screen.width}})
    menus.animate({opacity: 1, transform: {translationX: 0}}, {duration: 350, easing: "ease-in-out"})
  });
}

function list() {
  if (menus.get("enabled") == false){
  menus.animate({opacity: 0.9, transform: {translationY: 0}})
  menus.set("enabled", true)
  } else if (menus.get("enabled") == true){
  menus.animate({opacity: 0, transform: {translationY: screen.height-360, scaleX: 0, scaleY: 0}})
  menus.set("enabled", false)
}
}

function textChange(){
  if (index == 1){
    text.set("text", "Vestibulum efficitur mi suscipit libero bibendum pretium. Donec sed ornare massa, ut rhoncus arcu. Quisque et auctor arcu. Donec aliquet, leo quis commodo tristique, tortor nisl ornare urna, ac fringilla ante enim ut purus. Fusce lacus ipsum, gravida id pulvinar molestie, placerat nec mauris. Aenean auctor vehicula mauris eu condimentum. Pellentesque eget laoreet quam. Donec sagittis, lectus vitae imperdiet cursus, magna nisi porttitor nibh, et pharetra neque nibh vitae orci. Proin a ante et quam imperdiet congue. Morbi arcu ante, efficitur ut pellentesque vel, volutpat nec purus. Sed eleifend purus eu fringilla auctor.")
  } else if (index == 2){
    text.set("text", "Nunc pretium eu magna nec porta. Vivamus orci augue, lobortis ut interdum sed, lobortis ut risus. Suspendisse potenti. Pellentesque a lectus tortor. Donec non sodales odio. Duis quam leo, lacinia eget turpis sit amet, dictum vulputate leo. Donec id libero lacinia, tristique nisl vitae, condimentum risus. Donec posuere accumsan nulla, sed scelerisque felis porttitor pharetra. Morbi cursus pulvinar metus, quis dapibus odio sodales in. Maecenas et auctor diam. Aenean mollis eros nec auctor elementum.")
  } else if (index == 3){
    text.set("text", "Curabitur mattis orci quis velit auctor volutpat. Aliquam suscipit eget quam quis ultrices. Suspendisse pulvinar, nisl eu pretium facilisis, lectus est placerat ipsum, eget congue felis est ut est. Pellentesque sed enim velit. Mauris laoreet, leo ac vehicula sagittis, augue lacus efficitur sapien, vitae malesuada justo eros tristique tellus. Aenean at elit et orci auctor mattis. Donec at ante eleifend mi suscipit interdum eget et augue. Nam lacinia dignissim nisi ut vehicula. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras id nunc et nibh aliquam vestibulum et a mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac ultrices enim. Quisque non diam sit amet lorem consectetur luctus.")
  } else if (index == 4){
    text.set("text", "Phasellus molestie mi quis sem efficitur, ut consequat mauris luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam maximus iaculis risus, nec ultricies velit. Vivamus quam nisl, interdum eget dignissim quis, commodo et nulla. Nam ut accumsan nunc. Duis erat neque, aliquam nec dictum tempus, tempor sed tortor. Aliquam vestibulum dui sed elit laoreet, eu imperdiet nisl molestie. Sed a egestas purus. Mauris tempus magna mauris, at semper magna volutpat et. Etiam interdum mattis sagittis. Integer quis quam ultricies, ornare ligula ut, aliquet magna. Pellentesque iaculis quam nunc, id tempor orci vehicula ac. Nunc id nulla sit amet metus consectetur sollicitudin ac a libero. Ut mattis nisi ut ipsum vulputate dignissim nec ac orci. Nam posuere, ligula eu rutrum viverra, purus nunc mattis nibh, ut egestas magna lacus a enim.")
  } else if (index == 5){
    text.set("text", "Donec faucibus sem nec mauris laoreet elementum. Aenean eget sem fringilla, efficitur odio vitae, volutpat est. Aenean id ornare erat. Aenean faucibus ut nisi vel efficitur. Integer sed velit porta, tempor nunc id, pellentesque nulla. Quisque sagittis est nec nunc tempor, ut luctus massa semper. Cras in arcu et erat ultricies aliquet. Suspendisse sed dolor ut ipsum pharetra iaculis. Donec luctus, neque eu vehicula rhoncus, tellus lacus consequat libero, eget fermentum mi sem in turpis. Phasellus commodo magna magna, eget maximus lorem varius eu. Maecenas gravida sagittis enim, nec dapibus leo condimentum at. Quisque pretium, tortor non venenatis eleifend, felis purus iaculis ipsum, a pharetra metus eros id eros. Curabitur fringilla tellus sit amet massa ultrices, fringilla aliquet purus pulvinar. Proin urna ipsum, condimentum eget ullamcorper at, hendrerit ut elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce vitae venenatis elit, eget maximus eros.")
  }
}
