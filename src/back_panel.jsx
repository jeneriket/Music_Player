'use strict'

//Enum for backPanelState
const BackPanelState = {
    MyMusic:0,
    Playlists:1,
    Upload:2
}

const CURRENTPLAYLIST = [];

//React object
const E = React.createElement;

function XHRRequest(url, reactComp) {
    var xhr = new XMLHttpRequest();
            
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4)
        {
            if(xhr.status == 200)
            {
                //request successful
                reactComp.music_data = new Array(); 
                reactComp.playlist_data = new Array();
                //$("#report").html("<p>"+xhr.response+"</p>");
                eval(xhr.response);
                reactComp.forceUpdate();
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
    xhr.open("GET", url, true);
    xhr.send();
}
function RemoveSong(song_id, playlist_id, song_name) {
    $.ajax({
        type :"POST",
        url: 'remove_song.php',
        data : {'song_id':song_id, 'playlist_id':playlist_id},
        success: function(response) 
        { 
            alert(song_name+" removed.");
            $("#"+song_id+"_div").remove();
        }, 
        error: function(response) 
        { 
            alert("Error removing " + song_name); 
        } 
    });
}

//Class for back panel
class BackPanel extends React.Component
{

    constructor(_props)
    {
        super(_props);
        
        //have a state for if we are viewing the playlist
        this.updating = true;
        this.currentState = BackPanelState.MyMusic;
        this.componentDidMount = this.componentDidUpdate;
    } 

    render()
    {
        //use different methods to render backpanel, depending on the currentstate
        switch(this.currentState)
        {
            case BackPanelState.Playlists:
                return this.RenderPlaylistList();
            case BackPanelState.Upload:
                return this.RenderUpload();
            default:
                return this.RenderMusic();
        }
    }

    componentDidUpdate()
    { 
        if(this.updating)
        {
            switch(this.currentState)
            {
                case BackPanelState.Playlists:
                    XHRRequest("/retrieve_playlists.php", this);
                    break;
                default:
                    XHRRequest("/playlist_displayer.php?playlist="+CURRENTPLAYLISTID, this);
                    break;
            }
            
            this.updating = false;
        }
    }

    //Function to change the current state
    ChangeCurrentState(_currentState)
    {
        this.updating = true;
        $("#extra_panel").css("display", "none");
        this.currentState = _currentState;
        this.forceUpdate();
    }

    //Function to render the backpanel as a list of playlists
    RenderPlaylistList()
    {
        if(this.playlist_data == null)
            return "Loading...";
            
        var list = [];

        for(var i = 0; i < this.playlist_data.length; i++)
        {
            (function(ii) {
                var id = this.playlist_data[ii].id;
                var fileName = this.playlist_data[ii].name;
                var position = this.playlist_data[ii].position;
                var name = this.playlist_data[ii].title;

                list.push(
                    <div id={id+"_playlist_div"}>
                        {fileName}<br/>
                        <button onClick={() => {this.SelectPlaylist(id, fileName)}}>Select</button> <button disabled>Shuffle Play</button><br/>
                        <button disabled>Delete</button>
                        <hr/>
                    </div>
                );
            }).call(this, i);
        }

        
        return <div id="playlist" class="paddedLess">
            <button onClick={() => {this.CreatePlaylist()}}>Create Playlist</button>
            <br/>
            <br/>
            {list}
            </div>;
    }

    //Function to render the backpanel as the music player
    RenderMusic()
    {
        if(this.music_data == null)
            return "Loading...";

        if(this.music_data.length == 0)
            return (<div id="playlistTitle">
                <h1>{CURRENTPLAYLISTNAME}</h1>
                <button onClick={() =>{ToggleExtraPanel()}}>Add Song</button>
                <hr/>
                <div class="left">No songs in playlist.</div>
            </div>);
            
        var playlist = [];

        //clear current playlist array
        CURRENTPLAYLIST.splice(0,CURRENTPLAYLIST.length);
        for(var i = 0; i < this.music_data.length; i++)
        {
            (function(ii) {
                var id = this.music_data[ii].id;
                var source = this.music_data[ii].source;
                var position = this.music_data[ii].position;
                var title = this.music_data[ii].title;
                var artist = this.music_data[ii].artist;
                var album = this.music_data[ii].album;
                var year = this.music_data[ii].year;
    
                //NOTE: You need to move the delete button to music interface
                playlist.push(
                <div id={id+"_div"}>
                    {title}<p class="subtext">{artist}</p><br/>
                    <button onClick={() => {PlaySong(this.music_data[ii])}}>Play</button>
                    <button onClick={() => {RemoveSong(id, CURRENTPLAYLISTID, title)}}>Remove</button>
                    <button onClick={() =>{ConfirmDelete(source, id)}}>
                        Delete From Website?
                    </button>
                    <hr/>
                </div>);
                CURRENTPLAYLIST.push(this.music_data[ii]);
            }).call(this, i);
        }

        //TODO: Add title
        return <div id="playlist">
            <div id="playlistTitle">
                <h1>{CURRENTPLAYLISTNAME}</h1>
                <button onClick={() =>{ToggleExtraPanel()}}>Add Song</button>
                <hr/>
            </div>
            <div class="padded">{playlist}</div>
            </div>;
    }

    RenderUpload()
    {
        return (
            <form class="paddedLess" target="upload_frame" action="upload_music.php" method="POST" encType="multipart/form-data">
                <p>Upload your music!</p>
                <input type="file" accept="audio/mp3,audio/*,audio/ogg" name="musicFile"/>
                <input type="submit" value="submit" name="submit"/> 
            </form>
            //TODO: Add folder upload
        );
    }

    CreatePlaylist()
    {
        var playlistName = prompt("Name of playlist:");

        if(playlistName != null)
        {
            $.ajax({
                type :"POST",
                url: 'create_playlist.php',
                data : {'name':playlistName},
                success: function(response) 
                { 
                    alert(response); 
                }, 
                error: function(response) 
                { 
                    alert("Error creating " + playlistName); 
                } 
            });
        }
    }

    SelectPlaylist(id, name)
    {
        SetCookie("CurrentPlaylist", id+"_playlist", 1000);
        SetCookie("CurrentPlaylistName", name, 1000);
        location.replace('index.html');
    }
    
}

const domContainer = document.querySelector("#back_panel");
var backPanel = ReactDOM.render(E(BackPanel), domContainer);