const urlMapObjDefault = {
    'show-left': '/left',
    'show-right': '/right',
    'show-bottom': '/Bottom',
    'show-top': '/top',
    'show-back': '/back',
    'show-middle': '/middle',
}

const urlMapObj = {
    'show-left': '/AboutLina',
    'show-right': '/AboutAlex',
    'show-bottom': '/Bottom',
    'show-top': '/Projects',
    'show-back': '/back',
    'show-middle': '/Home',

}
const animations = [{
    side: 'show-top',
    target: '#cube',
    class: 'spin'
}]

const resizeCube =  function() {
    document.documentElement.style.
    setProperty('--cube-height', ($(window).innerHeight()) + "px")
    document.documentElement.style.
    setProperty('--half-height', ($(window).innerHeight() / 2) + "px")
    document.documentElement.style.
    setProperty('--double-height', ($(window).innerHeight() * 2) + "px")
}

$(window).on("resize", resizeCube);

$(document).ready(function() {
    resizeCube()
    const page = window.location.pathname
    $('#cube').addClass('instantChange')
    Object.keys(urlMapObj).forEach(cubeSide => {
        if (urlMapObj[cubeSide] === page) {
            $('#cube').addClass(cubeSide + ' instantChange')
        }
    })
    $('#cube').removeClass('instantChange')
})


const replaceClass = (newClass) => {
    $("#cube")
        .removeClass("show-bottom show-top show-middle show-left show-right show-back")
        .addClass(newClass + " zoom-out")
    setTimeout(() => {
        $("#cube").removeClass("zoom-out")
    }, 1000)
}

const replaceClassNoZoomOut = (newClass) => {
    $("#cube")
        .removeClass("show-bottom show-top show-left show-right show-back")
        .addClass(newClass)
}


const changeSideClickEvent = function(animations = [], urlMapObj = urlMapObjDefault) {
    const clickEvent = function() {
        $(this).off('click')
        //grab slide to change to
        const newSide = $(this).attr('data-side')
        //change address bar to match provided object or deafults to sides
        window.history.pushState(null, null, '.' + urlMapObj[newSide])
        //check if it needs a full animation or quick side change
        $(this).attr('data-zoomOut') !== 'false' ?
            replaceClass(newSide) :
            replaceClassNoZoomOut(newSide);
        //activates any animations once the side is cahnges
        setTimeout(() => {
            $(this).on('click', clickEvent)
            animations.forEach(animateObj => {
                if (newSide === animateObj.side || newSide === "") {
                    console.log($(animateObj.target))
                    $(animateObj.target).removeClass(animateObj.class)
                        .addClass(animateObj.class)
                }
            })
        }, $(this).attr('data-zoomOut') !== 'false' ? 3000 : 1000)

    }
    return clickEvent
}


$('.box-nav').on('click', changeSideClickEvent([], urlMapObj))
//<button class="test" data-zoomOut = 'false' data-side="show-top">top</button>

$(document).ready(function() {
    //to cancel and set a timer
    let timer;
    let counter = 0;
    //main screensave function for recursion
    const screensave = function(e) {
        //clear counter and timer then restart timer
        counter = 0;
        clearInterval(timer)
        timer = setInterval(() => {
            //increase counter ever cycle
            counter++
            if (counter === 3) {
                clearInterval(timer)
                $("#cube").addClass("spin zoom-out")
                //turn off listeners
                $(document).off('mousemove')
                //start new one to stop screen saver
                $(document).mousemove(function(e) {
                    setTimeout(() => {
                        $("#cube").removeClass("spin zoom-out")
                    }, 500)
                    $(document).off('mousemove')
                    $(document).mousemove(screensave)
                })
            }
        }, 1000)
    };
    $(document).mousemove(screensave)
})