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
        return <button onClick={"$('#"+this.props.id+"_audio').trigger('play');"}>Play</button>;
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
