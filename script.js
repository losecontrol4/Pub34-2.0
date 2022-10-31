function mobileDrop() {
  let dropIcon = document.getElementById("mobile-icon")
  let drop = document.getElementById("mobile-drop")
  if (drop.style.display == "flex") {
    drop.style.display = "none"
    dropIcon.style.content ="url(Images/drop-down-menu.svg)"
  } else {
    drop.style.display = "flex"
    dropIcon.style.content = "url(Images/drop-down-x.svg)"
  }
}


function prepare() { //sets the values to be viewable inline
  let imageOne = document.getElementById("intro-image-1")
  let imageTwo = document.getElementById("intro-image-2")


  initializeDrop(document.getElementById("contentL"))
  initializeDrop(document.getElementById("contentD"))
  initializeDrop(document.getElementById("contentC"))

  imageOne.style.opacity = "100%"
  imageOne.style.content = "url(rotationImages/1.webp)"
  imageTwo.style.opacity = "0%"
  imageTwo.style.content = "url(rotationImages/2.webp)"

}

function initializeDrop(background) {
  let iframe = background.firstChild.nextElementSibling;
  background.style.padding = "0px";
  iframe.style.height = "0vh";
  iframe.style.border = "0px"
}

function rotateImages() {
  
  let imageOne = document.getElementById("intro-image-1")
  let imageTwo = document.getElementById("intro-image-2")


  if (parseInt(imageOne.style.opacity, 10) > 0) {
    imageOne.style.opacity = "0%"
    imageTwo.style.opacity = "100%"
  } else if (parseInt(imageTwo.style.opacity, 10) > 0) {
    imageTwo.style.opacity = "0%"
    imageOne.style.opacity = "100%"
  }

}

function changeImages() { //to be called when rotateImages' transition ends
  const numFiles = 4 //hard coded because this would be impossible to obtain without a dedicated server to the best of my knowledge
  let imageOne = document.getElementById("intro-image-1")
  let imageTwo = document.getElementById("intro-image-2")


  if (parseInt(imageOne.style.opacity, 10) == 1) {
    let next = (parseInt(imageTwo.style.content.split("/").at(-1), 10) + 1) % numFiles + 1
    imageTwo.style.content = "url(" + createPath(next) + ")"
  } else if (parseInt(imageTwo.style.opacity, 10) == 1) {
    let next = (parseInt(imageOne.style.content.split("/").at(-1), 10) + 1) % numFiles + 1
    imageOne.style.content = "url(" + createPath(next) + ")"
  }


}

function createPath(number) {
  return "rotationImages/" + number + ".webp"
}


function drop(num) {
  
    let background = null
    let iframe = null
    if(num == 0) {
      background = document.getElementById("contentL");
      iframe = background.firstChild.nextElementSibling;
    } else if (num == 1) {
      background = document.getElementById("contentD");
      iframe = background.firstChild.nextElementSibling;
    } else {
      background = document.getElementById("contentC");
      iframe = background.firstChild.nextElementSibling;
    }
    if (background.style.padding == "0px") {
      background.style.padding = "1.2vw 1.2vw";
      iframe.style.height = "70.0vh";
      iframe.style.border = "2px solid black"
      adjustSideLights((vh(70) + vw(1.2)), true)
    } else {
      background.style.padding = "0px";
      iframe.style.height = "0vh";
      iframe.style.border = "0px"
      adjustSideLights((vh(70) + vw(1.2)), false)
    }

    


}

function adjustSideLights (height, add) {
  //for use with menu drop functions
  let imgVW = 6
  let imgMarginVH = 5
  //

  let aspectRatio = 0.9617834394904459 //hard coded to avoid having to wait for image to load to do calculations.

  let left = document.getElementById("left-bar")
  let right = document.getElementById("right-bar")
  let light =  document.createElement('img')

  light.src =  "Images/light.png"
  let imgWidth = vw(imgVW)
  let imgHeight = aspectRatio * imgWidth
  
  let margin = vh(imgMarginVH)//height * imgMarginVH
  let num = (height - vh(1))/(imgHeight + margin) //number of lights that can fit

  num = (num + .3) % 1 < 0 ? Math.floor(num) : Math.ceil(num) //if decimal place below the value, round down, else round up

  // light.style.height = imgHeight
  // light.style.width = vw(imgVW)
  // light.style.marginBottom = vh(imgMarginVH)
  light.classList.add("sidelight")


  if (add) {
    for (let i = 0; i < num; i++) {
      left.appendChild(light.cloneNode(true))
      right.appendChild(light.cloneNode(true))
    }
  } else
  for (let i = 0; i < num; i++) {
    left.removeChild(left.lastElementChild)
    right.removeChild(right.lastElementChild) 
  }
}


function checkSideLights() {
  let left = document.getElementById("left-bar").childElementCount
  left = left * (vh(10.77)) //element amount times margin plus height of each light
  let height = (document.getElementById("center")).clientHeight - (document.getElementById("footer")).clientHeight

  if(height + height * .03 < left || left + left * .03 < height) {
    updateSideLights()
  }
}
   
function updateSideLights() {

   

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
  let num = (height - vh(1))/(imgHeight + margin) //number of lights that can fit

  num = num % 1 < 0 ? Math.floor(num) : Math.ceil(num) //if decimal place below the value, round down, else round up
  
  // light.style.height = imgHeight
  // light.style.width = vw(imgVW)
  // light.style.marginBottom = vh(imgMarginVH)
  light.classList.add("sidelight")

  let childCount = left.children.length
  


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
window.addEventListener('load', prepare(), false);

// window.setInterval(updateSideLights(), 10000);

// $(window).on('resize touchmove', updateSideLights());


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

// document.getElementById("contentL").addEventListener("transitionend", updateSideLights)

document.getElementById("intro-image-1").addEventListener("transitionend", changeImages)

setInterval(rotateImages, 5000)

setInterval(checkSideLights, 2000)