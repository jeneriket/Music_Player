/*TODO:
Add cookie that keeps track of back panel state
*/

'use strict'

//React object
const e = React.createElement;


//Enum for backPanelState
const BackPanelState = {
    MyMusic:0,
    Playlists:1,
    Upload:2
}

//Class for back panel
class BackPanel extends React.Component
{

    constructor(_props)
    {
        super(_props);

        this.playlist = null;
        
        //have a state for if we are viewing the playlist
        this.currentState = BackPanelState.MyMusic;
    } 

    render()
    {
        //use different methods to render backpanel, depending on the currentstate
        switch(this.currentState)
        {
            case BackPanelState.Playlists:
                return this.RenderPlaylist();
            case BackPanelState.Upload:
                return this.RenderUpload();
            default:
                return this.RenderMusic();
        }
    }

    componentDidMount()
    {
        this.playlist = null;
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState === 4)
            {
                if(xhr.status == 200)
                {

                    //request successful
                    this.music_data = new Array(); 
                    var this_ = this;
                    eval(xhr.response);
                    this.forceUpdate();
                }
                else
                {
                    if(status == "error")
                    {
                        alert(xhr.status + " " + xhr.statusText);
                    }
                }

            }
        });
        xhr.open("GET", "/playlist_displayer.php", true);
        xhr.send();
    }

    //Function to change the current state
    ChangeCurrentState(_currentState)
    {
        this.currentState = _currentState;
        this.forceUpdate();
    }

    //Function to render the backpanel as a list of playlists
    RenderPlaylist()
    {

        return "Feature not ready yet!";
    }

    RenderUpload()
    {
        return (
            <form action="upload_music.php" method="POST" encType="multipart/form-data">
                <p>Upload your music!</p>
                <input type="file" accept="audio/mp3,audio/*,audio/ogg" name="musicFile"/>
                <input type="submit" value="submit" name="submit"/>
            </form>
            //TODO: Add folder upload
        );
    }

    //Function to render the backpanel as the music player
    RenderMusic()
    {
        if(this.music_data == null)
            return "Loading...";

        var playlist = [];
        this.audioSources = [];
        for(let i = 0; i < this.music_data.length; i++)
        {
            var id = this.music_data[i].id;
            var name = this.music_data[i].name;

            //NOTE: You need to move the delete button to music interface
            playlist.push(
            <div id={id+"_div"}>
                {name}<br/>
                <button onClick={() => {PlaySong(name)}}>Play</button>
                <button onClick={() =>{confirmDelete(name, id)}}>
                    Delete?
                </button>
            </div>);
        }

        return <div id="playlist">
            {playlist}
            </div>;
    }
    
}

const domContainer = document.querySelector("#back_panel");
var backPanel = ReactDOM.render(e(BackPanel), domContainer);