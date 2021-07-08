'use strict'

class MusicInterface extends React.Component
{

    constructor(_props)
    {
        super(_props);
        this.state = {playing: false};
    }

    render()
    {
        return (<button onClick={() => {this.PlayPauseMusic()}}>{this.state.playing? 'Pause' : 'Play'}</button>);
    }

    PlayPauseMusic()
    {
        //pause all other audiosources
        var playButtons = document.getElementsByClassName('audio_button');
        for(var i = 0; i < audioSources.length; i++)
        {
            audioSources[i].click();
        }

        var value = this.state.playing? 'pause' : 'play';
        this.setState({playing : !this.state.playing});
        $('#'+this.props.id+'_audio').trigger(value);
        this.forceUpdate();
    }
}
