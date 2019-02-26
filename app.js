(function (){
    var num = 0;
    var inited = false;
    window.onload = function () {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var oscillator = audioCtx.createOscillator();
        var noise = document.querySelector("#noise");
        noise.addEventListener("click", MakeNoise);
        
        function MakeNoise(){
            if(!inited){
                oscillator.start();
                inited = true;
            }
            num +=1;
            if (num % 2 != 0){
                oscillator.connect(audioCtx.destination);
            }
            else{
                oscillator.disconnect(audioCtx.destination);
            }
        }  
    }
}());
