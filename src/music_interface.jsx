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
        audioSources.forEach(element => {
            element.trigger('pause');
        });

        var value = this.state.playing? 'pause' : 'play';
        this.setState({playing : !this.state.playing});
        $('#'+this.props.id+'_audio').trigger(value);
        this.forceUpdate();
    }
}
