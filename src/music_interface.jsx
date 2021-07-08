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
        return (<button onClick={this.PlayPauseMusic()}>{this.state.playing? 'Play' : 'Pause'}</button>);
    }

    PlayPauseMusic()
    {
        var value = this.state.playing? 'pause' : 'play';
        $('#'+this.props.id+'_audio').trigger(value);
    }
}
