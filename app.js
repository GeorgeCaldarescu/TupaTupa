// create the class
class DrumKit{
    constructor(){
        // add property
        this.pads = document.querySelectorAll('.pad');

        // the play button
        this.playBtn = document.querySelector('.play');
        
        // add the changing sound 
        this.currentKick = './allSounds/kick-classic.wav';
        this.currentSnare = './allSounds/snare-acoustic01.wav';
        this.currentHihat = './allSounds/hihat-acoustic01.wav';
        // here it grab the audio from the hmtl file, to understand look for kick-sound 
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0; // is the pad number 0, the pads are numbered from 0-7 and is usefull for the loop
        this.bpm = 150; // create the bpm
        this.isPlaying = null;
        
        // grab the selector to be able to change the sound
        this.selects = document.querySelectorAll('select');
    }

    // active pad
    activePad(){
        this.classList.toggle('active');  //add the class active
    }

    // create the loop 
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`); // with this is possible to select each b0 from the pad in index and then go to the next one
        
        // loop over the pads 
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2 `;
            
            // create the if statement that if is active need to play the sound
            if (bar.classList.contains('active')){
                           
                // check which pad is active to choose the right sound
                if (bar.classList.contains('kick-pad')){
                    // set the current time of the audio to 0 in order to play more sound in a row
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }   
         });
        this.index++;
    }

    start(){
        const interval = (60/this.bpm) * 1000; // times 1000 because the time is in ms
        // check if is playing
        if (!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    } else {
        // clear the interval and add the stop if play button is pressed once more
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
    }
    // to change the text inside the play button REMEMBER TO ADD THE UPDATE BUTTON IN EVENT LISTENER AT THE END OF THE FILE
    updateBtn(){
        if (!this.isPlaying){
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else{
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
    // create the change sound function
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;

        // switch the tracks from the default to the one selected
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }   
    }
}




const drumKit = new DrumKit();

// Event Listeners

// change the color when become active
drumKit.pads.forEach(pad =>{
    pad.addEventListener('click', drumKit.activePad);

    // to create the animation loop
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});
 