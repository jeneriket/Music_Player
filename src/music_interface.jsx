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

        m_Interface += this.MakePlayPauseButton();
        //MakeScrollBar(interface);

        //alert(m_Interface);
        return m_Interface;
    }

    MakePlayPauseButton()
    {
        if(this.state.playing)
        {
            //make pause button
        }
        else
        {
            //make play button
            return(
                <button onClick={"$('#"+this.props.id+"_audio').trigger('play');"}>Play</button>
            );
        }
    }
}

function MakeMusicInterface(id, playli)
{
    ReactDOM.render(<MusicInterface id={id}/>, document.getElementById('back_panel'));
}

function MakePlaylist(music_data)
{
    alert(music_data[0].id);
    var playlistDiv = <div id="playlist"></div>;
    //todo: loop to add
    ReactDOM.render(<MusicInterface id={music_data[0].id}/>, playlistDiv);
    return playlistDiv;
}