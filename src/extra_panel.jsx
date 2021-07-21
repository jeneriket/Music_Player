
'use strict'

function UpdateExtraPanel() {
    this.updating = true;   
    this.forceUpdate();
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
                var name = this.music_data[ii].name;
    
                //NOTE: You need to move the delete button to music interface
                songs.push(
                <div>
                    {name}<br/>
                    <button onClick={() => {this.AddSong(this.music_data[ii])}}>Add Song</button>
                    <hr/>
                </div>);
            }).call(this, i);
        }

            
        return <div id="add_songs">
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
            data : {'filename':data.name, 'id': data.id, playlist: CURRENTPLAYLISTID},
            success: function(response) 
            { 
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