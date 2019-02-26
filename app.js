(function(){
    var inited = false;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    var filter = audioCtx.createBiquadFilter();

    function initialize(){
        oscillator.start();
        oscillator.connect(filter);    
    }
    function toggleOscillatorOn(){
        if (!inited){
            initialize();
        }
        this.classList.add('pressed');
        oscillator.frequency.value = this.attributes.getNamedItem('data-pinch').nodeValue;
        filter.connect(audioCtx.destination);
    }
    function toggleOscillatorOff(){
        this.classList.remove('pressed');
        filter.disconnect(audioCtx.destination);
    }
    window.addEventListener('load', function(){
        var keys = document.querySelectorAll(".key");
        var octaves = Math.ceil(keys.length / 12);
        for (var j = 1; j <= octaves; j++){
            var refPitch = 220 * j;
            for (var i = (j - 1) * 12; i < keys.length; i++){
                keys[i].setAttribute("data-pinch", refPitch * Math.pow(2, (i % 12) / 12));
                keys[i].addEventListener('mousedown', toggleOscillatorOn);
                keys[i].addEventListener('mouseup', toggleOscillatorOff);
                keys[i].addEventListener('touchstart', toggleOscillatorOn, {passive: true});
                keys[i].addEventListener('touchend', toggleOscillatorOff, {passive: true});
            }
        }
    //     document.querySelector("#wave").addEventListener('change', function(){
    //         if (!inited){
    //             initialize();
    //         }
    //         oscillator.type = this.value;
    //     });   
    //     document.querySelector("#filter").addEventListener('input', function(){
    //         if (!initialized) {
    //             initialize();
    //         }
    //         filter.frequency.value = this.value;
    //     });
    // })


    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}())


// var noise = document.querySelector("#noise");
// noise.addEventListener("click", MakeNoise);

// function MakeNoise(){
//     if(!inited){
//         oscillator.start();
//         inited = true;
//     }
//     num +=1;
//     if (num % 2 != 0){
//         oscillator.connect(audioCtx.destination);
//     }
//     else{
//         oscillator.disconnect(audioCtx.destination);
//     }
// }  