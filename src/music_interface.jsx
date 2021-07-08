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
        return (<button class="audio_button" onClick={() => {this.PlayPauseMusic()}}>{this.state.playing? 'Pause' : 'Play'}</button>);
    }

    PlayPauseMusic()
    {

        var value = this.state.playing? 'pause' : 'play';
        this.setState({playing : !this.state.playing});
        $('#'+this.props.id+'_audio').trigger(value);
        this.forceUpdate();
    }
}
