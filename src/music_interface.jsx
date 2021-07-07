class MusicInterface extends React.Component
{

    constructor(_props)
    {
        super(_props);
        this.state = {playing: false};
    }

    render()
    {
        var interface = "";

        interface += MakePlayPauseButton();
        //MakeScrollBar(interface);

        alert(interface);
        return interface;
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

MakeMusicInterface(id)
{
    ReactDom.render(<MusicInterface id={id}/>, document.getElementById("root"));
}