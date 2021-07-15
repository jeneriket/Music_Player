'use strict'

function PlaySong(source)
{
    this.song=source;
    this.setState({playable: true});

    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    this.PlayPauseMusic();
}

class MusicPlayer extends React.Component
{

    constructor(_props)
    {
        super(_props);
        this.state = {playing: false, playable: false};
        this.song = "No song selected.";
        PlaySong = PlaySong.bind(this);
    }

    render()
    {
        if(this.state.playable)
        {
            return (<div>
                <audio id="Music_Player"><source id="Music_Player" src={"/uploads/"+ this.song}/></audio>
                <p>{this.song}</p><br/>
                <button disabled>Previous</button>
                <button class="audio_button" onClick={() => {this.PlayPauseMusic()}}>{this.state.playing? 'Pause' : 'Play'}</button>
                <button disabled>Next</button></div>);
        }
        
        return (<div>
            <p>{this.song}</p><br/>
            <button disabled>Previous</button>
            <button class="audio_button" disabled>Play</button>
            <button disabled>Next</button></div>);
    }

    PlayPauseMusic()
    {

        var value = this.state.playing? 'pause' : 'play';
        this.setState({playing : !this.state.playing});
        $('#Music_Player').trigger(value);
        this.forceUpdate();
    }
}

//React object
const e = React.createElement;

const domContainer = document.querySelector("#player");
var backPanel = ReactDOM.render(e(MusicPlayer), domContainer);