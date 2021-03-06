'use strict'

function PlaySong(music_data)
{
    console.log(music_data);
    $('#Music_Player').trigger('pause');

    this.setState({playable: true});
    this.song_position = music_data.position;
    this.ForcePlayMusic();
}

function NextSong() {
    this.NextSong()
}

class MusicPlayer extends React.Component
{

    constructor(_props)
    {
        super(_props);
        this.state = {playing: false, playable: false};
        this.song = (<div>
            <h1>No song selected.</h1>
            <h2 class="subtext">No song selected.</h2>
            <h3 class="subtext">No song selected.</h3>
            <h4 class="subtext">No song selected.</h4><br/>
            </div>);
        this.song_position = -1;
        PlaySong = PlaySong.bind(this);
        NextSong = NextSong.bind(this);
    }

    render()
    {
        if(this.state.playable)
        {
            return (
                <div>
                    <h1>{CURRENTPLAYLIST[this.song_position].title}</h1>
                    <h2 class="subtext">{CURRENTPLAYLIST[this.song_position].artist}</h2>
                    <h3 class="subtext">{CURRENTPLAYLIST[this.song_position].album}</h3>
                    <h4 class="subtext">{CURRENTPLAYLIST[this.song_position].year}</h4><br/>
                    <button onClick={() => {this.PreviousSong()}}>Previous</button>
                    <button class="audio_button" onClick={() => {this.PlayPauseMusic()}}>{this.state.playing? 'Pause' : 'Play'}</button>
                    <button onClick={() => {this.NextSong()}}>Next</button>
                </div>);
        }
        
        return (<div>
            {this.song}
            <button disabled>Previous</button>
            <button class="audio_button" disabled>Play</button>
            <button disabled>Next</button></div>);
    }

    PlayPauseMusic()
    {
        var value = this.state.playing? 'pause' : 'play';
        this.setState({playing : !this.state.playing});
        MUSICPLAYER.trigger(value);
        this.forceUpdate();
    }
    
    ForcePlayMusic()
    { 
        $("#progress_bar").css("width", 0);
        MUSICSOURCE.attr("src", "/uploads/"+CURRENTPLAYLIST[this.song_position].source);

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

        this.song = CURRENTPLAYLIST[this.song_position].source;
        this.ForcePlayMusic();
    }

    PreviousSong()
    {
        this.song_position--;

        if(this.song_position < 0)
            this.song_position = CURRENTPLAYLIST.length-1;
        
        this.song = CURRENTPLAYLIST[this.song_position].source;
        this.ForcePlayMusic();
    }
}



//React object
const ES = React.createElement;

const DOMCONTAINER = document.querySelector("#player");
ReactDOM.render(ES(MusicPlayer), DOMCONTAINER);