
'use strict'

var EXTRAPANELSHOWN = false;

function UpdateExtraPanel() {
    this.updating = true;   
    this.forceUpdate();
}

function ToggleExtraPanel() {
    UpdateExtraPanel();
    $('#extra_panel').css('display',  (EXTRAPANELSHOWN) ? "none" : "block");
    EXTRAPANELSHOWN = !EXTRAPANELSHOWN;
}

class ExtraPanel extends React.Component 
{
    constructor(_props)
    {
        super(_props);
        this.updating = true;
        UpdateExtraPanel = UpdateExtraPanel.bind(this);
    }

    render()
    {
        if(this.music_data == null)
        {
            return "Loading Songs...";
        }

        var songs = [];
        
        for(var i = 0; i < this.music_data.length; i++)
        {
            (function(ii) {
                var name = this.music_data[ii].title;
                var artist = this.music_data[ii].artist;
    
                //NOTE: You need to move the delete button to music interface
                songs.push(
                <div>
                    {name}
                    <p class="subtext">{artist}</p>
                    <br/>
                    <button onClick={() => {this.AddSong(this.music_data[ii])}}>Add Song</button>
                    <hr/>
                </div>);
            }).call(this, i);
        }

            
        return <div id="add_songs" class="padded">
        {songs}
        </div>;
    }

    componentDidUpdate() 
    {
        if(this.updating)
        {
            XHRRequest("/playlist_displayer.php?playlist=0_playlist", this);
            this.updating = false;
        }
    }

    AddSong(data)
    {
        $.ajax({
            type :"POST",
            url: 'add_song.php',
            data : {'filename':data.title, 'id': data.id, playlist: CURRENTPLAYLISTID},
            success: function(response) 
            { 
                console.log(data.title);
                alert(response); 
                location.replace('index.html');
            }, 
            error: function(response) 
            { 
                alert("Error adding " + filename); 
            } 
        });
    }
}


const ep = document.querySelector("#extra_panel");
const ESY = React.createElement;
var expanel = ReactDOM.render(ESY(ExtraPanel), ep);

$("#extra_panel").css("display", "none");