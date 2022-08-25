function dropL() {
    background = document.getElementById("contentL");
    iframe = background.firstChild.nextElementSibling;
   

    if (background.style.padding == "0px") {
      background.style.padding = "2vh 2vw";
      iframe.style.height = "90.0vh";
      iframe.style.border = "2px solid black"
    } else {
      background.style.padding = "0px";
      iframe.style.height = "0vh";
      iframe.style.border = "0px"
    }
}
   
function updateSideLights() {

  console.log("here")
  // hard coded due to difficulty obtaining these values from the style sheet
  let imgVW = 6
  let imgMarginVH = 5
  //

  let aspectRatio = 0.9617834394904459 //hard coded to avoid having to wait for image to load to do calculations.

  let left = document.getElementById("left-bar")
  let right = document.getElementById("right-bar")
  let light =  document.createElement('img')

  light.src =  "Images/light.png"
  let height = (document.getElementById("center")).clientHeight - (document.getElementById("footer")).clientHeight
  let imgWidth = vw(imgVW)
  let imgHeight = aspectRatio * imgWidth
  let margin = vh(imgMarginVH)//height * imgMarginVH
  let num = height/(imgHeight + margin) //number of lights that can fit

  num = num % 1 < 0 ? Math.floor(num) : Math.ceil(num) //if decimal place below the value, round down, else round up
  light.classList.add("sidelight")
  let childCount = left.children.length
  
  console.log(margin)
  console.log(height)
  console.log(imgHeight)
  console.log(num)

  //add/remove correct number of lights

  if (childCount < num) {
    for (let i = 0; i < num - childCount; i++) {
      left.appendChild(light.cloneNode(true))
      right.appendChild(light.cloneNode(true))
    }
  } else
  for (let i = 0; i < childCount - num; i++) {
    left.removeChild(left.lastElementChild)
    right.removeChild(right.lastElementChild) 
  }

  }


window.addEventListener('load', updateSideLights(), false);


var addEvent = function(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
      object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
      object.attachEvent("on" + type, callback);
  } else {
      object["on"+type] = callback;
  }
};

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}


addEvent(window, "resize", updateSideLights);

  