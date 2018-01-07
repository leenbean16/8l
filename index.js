const replaceClass = (newClass) => {
    $("#cube")
        .removeClass("show-bottom show-top show-left show-right show-back")
        .addClass(newClass + " zoom-out")
    setTimeout(() => {
        $("#cube").removeClass("zoom-out")
        console.log('zoom-out')
    }, 1000)
}

$("#show-top-btn").on('click', function() {
    replaceClass("show-top");
})
$("#show-bottom-btn").on('click', function() {
    replaceClass("show-bottom");
})
$("#show-middle-btn").on('click', function() {
    replaceClass("")
})
$("#show-left-btn").on('click', function() {
    replaceClass("show-left")
})
$("#show-right-btn").on('click', function() {
    replaceClass("show-right")
})
$("#show-back-btn").on('click', function() {
    replaceClass("show-back")
})

$(document).ready(function() {
    let timer;
    let counter = 0;
    const screensave = function(e){
        counter =0;
        clearInterval(timer)
        timer = setInterval(()=>{
            counter++
            if(counter === 15){
                clearInterval(timer)
                $("#cube").addClass("spin")
                $(document).off('mousemove')
                $(document).mousemove(function(e){
                $("#cube").removeClass("spin")
                    $(document).off('mousemove')
                    $(document).mousemove(screensave)
                })
            }
        },1000)
    };
    $(document).mousemove(screensave)
})


