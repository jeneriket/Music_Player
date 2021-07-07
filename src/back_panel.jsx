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
                    var music_data = new Array();
                    eval(xhr.response);
                    //alert(xhr.response);
                    this.playlist = MakePlaylist(music_data);
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
        if(this.playlist == null)
            return "Loading...";

        return <div dangerouslySetInnerHTML={this.playlist } />
    }
    
}


const domContainer = document.querySelector("#back_panel");
var backPanel = ReactDOM.render(e(BackPanel), domContainer);