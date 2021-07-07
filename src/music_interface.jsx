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

        m_Interface += MakePlayPauseButton();
        //MakeScrollBar(interface);

        alert(m_Interface);
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

function MakeMusicInterface(id)
{
    alert("SD");
    ReactDom.render(<MusicInterface id={id}/>, document.getElementById("root"));
}