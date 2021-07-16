'use strict'

function PlaySong(source, position)
{
    $('#Music_Player').trigger('pause');

    this.song=source;
    this.setState({playable: true});
    this.song_position = position;
    this.ForcePlayMusic();
}

class MusicPlayer extends React.Component
{

    constructor(_props)
    {
        super(_props);
        this.state = {playing: false, playable: false};
        this.song = "No song selected.";
        this.song_position = -1;
        PlaySong = PlaySong.bind(this);
    }

    render()
    {
        if(this.state.playable)
        {
            return (
                <div>
                    <p>{this.song}</p><br/>
                    <div id="progress_bar_back"><div id="progress_bar"></div></div>
                    <button onClick={() => {this.PreviousSong()}}>Previous</button>
                    <button class="audio_button" onClick={() => {this.PlayPauseMusic()}}>{this.state.playing? 'Pause' : 'Play'}</button>
                    <button onClick={() => {this.NextSong()}}>Next</button>
                </div>);
        }
        
        return (<div>
            <p>{this.song}</p><br/>
            <button disabled>Previous</button>
            <button class="audio_button" disabled>Play</button>
            <button disabled>Next</button></div>);
    }
    
    componentDidMount()
    {
        //wait for the page to load before calling function
        window.setTimeout(function()
        {
            var mp = document.getElementsByName("Music_Player")[0];
            //alert(mp.name);
            mp.ontimeupdate = (event)=>
            {
                console.log('The currentTime attribute has been updated. Again.');
            };
        }, 1000);
    }

    PlayPauseMusic()
    {
        var value = this.state.playing? 'pause' : 'play';
        this.setState({playing : !this.state.playing});
        MUSICPLAYER.trigger('load');
        MUSICPLAYER.trigger(value);
        this.forceUpdate();
    }
    
    ForcePlayMusic()
    {
        MUSICSOURCE.attr("src", "/uploads/"+this.song);

        this.setState({playing : true});
        this.forceUpdate();
        MUSICPLAYER.trigger('load');
        setTimeout(function(){MUSICPLAYER.trigger('play');}, 1000);
    }

    NextSong()
    {
        this.song_position++;

        if(this.song_position >= CURRENTPLAYLIST.length)
            this.song_position = 0;

        this.song = CURRENTPLAYLIST[this.song_position];
        this.ForcePlayMusic();
    }

    PreviousSong()
    {
        this.song_position--;

        if(this.song_position < 0)
            this.song_position = CURRENTPLAYLIST.length-1;
        
        this.song = CURRENTPLAYLIST[this.song_position];
        this.ForcePlayMusic();
    }
}



//React object
const ES = React.createElement;

const DOMCONTAINER = document.querySelector("#player");
ReactDOM.render(ES(MusicPlayer), DOMCONTAINER);