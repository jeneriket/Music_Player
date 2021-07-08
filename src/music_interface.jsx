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
        var m_Interface = "";

        //m_Interface += this.MakePlayPauseButton();
        //MakeScrollBar(interface);

        //alert(m_Interface);
        return this.MakePlayPauseButton;
    }

    MakePlayPauseButton()
    {
        if(this.state.playing)
        {
            //make pause button
            
        }
            //make play button
        return(
            <button onClick={"$('#"+this.props.id+"_audio').trigger('play');"}>Play</button>
        );
    }
}

function MakePlaylist(music_data)
{
    var playlistDiv = <div id="playlist"><MusicInterface id={music_data[0].id}/></div>;
    //todo: loop to add
    ReactDOM.render(playlistDiv, domContainer);
}