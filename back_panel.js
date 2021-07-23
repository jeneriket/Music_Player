'use strict';

//Enum for backPanelState

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackPanelState = {
    MyMusic: 0,
    Playlists: 1,
    Upload: 2
};

var CURRENTPLAYLIST = [];

//React object
var E = React.createElement;

function XHRRequest(url, reactComp) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                //request successful
                reactComp.music_data = new Array();
                reactComp.playlist_data = new Array();
                //$("#report").html("<p>"+xhr.response+"</p>");
                eval(xhr.response);
                reactComp.forceUpdate();
            } else {
                if (status == "error") {
                    alert(xhr.status + " " + xhr.statusText);
                }
            }
        }
    });
    xhr.open("GET", url, true);
    xhr.send();
}

//Class for back panel

var BackPanel = function (_React$Component) {
    _inherits(BackPanel, _React$Component);

    function BackPanel(_props) {
        _classCallCheck(this, BackPanel);

        //have a state for if we are viewing the playlist
        var _this = _possibleConstructorReturn(this, (BackPanel.__proto__ || Object.getPrototypeOf(BackPanel)).call(this, _props));

        _this.updating = true;
        _this.currentState = BackPanelState.MyMusic;
        _this.componentDidMount = _this.componentDidUpdate;
        return _this;
    }

    _createClass(BackPanel, [{
        key: "render",
        value: function render() {
            //use different methods to render backpanel, depending on the currentstate
            switch (this.currentState) {
                case BackPanelState.Playlists:
                    return this.RenderPlaylistList();
                case BackPanelState.Upload:
                    return this.RenderUpload();
                default:
                    return this.RenderMusic();
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.updating) {
                switch (this.currentState) {
                    case BackPanelState.Playlists:
                        XHRRequest("/retrieve_playlists.php", this);
                        break;
                    default:
                        XHRRequest("/playlist_displayer.php?playlist=" + CURRENTPLAYLISTID, this);
                        break;
                }

                this.updating = false;
            }
        }

        //Function to change the current state

    }, {
        key: "ChangeCurrentState",
        value: function ChangeCurrentState(_currentState) {
            this.updating = true;
            $("#extra_panel").css("display", "none");
            this.currentState = _currentState;
            this.forceUpdate();
        }

        //Function to render the backpanel as a list of playlists

    }, {
        key: "RenderPlaylistList",
        value: function RenderPlaylistList() {
            var _this3 = this;

            if (this.playlist_data == null) return "Loading...";

            var list = [];

            for (var i = 0; i < this.playlist_data.length; i++) {
                (function (ii) {
                    var _this2 = this;

                    var id = this.playlist_data[ii].id;
                    var fileName = this.playlist_data[ii].name;
                    var position = this.playlist_data[ii].position;
                    var name = this.playlist_data[ii].title;

                    list.push(React.createElement(
                        "div",
                        { id: id + "_playlist_div" },
                        fileName,
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    _this2.SelectPlaylist(id, fileName);
                                } },
                            "Select"
                        ),
                        " ",
                        React.createElement(
                            "button",
                            { disabled: true },
                            "Shuffle Play"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { disabled: true },
                            "Delete"
                        ),
                        React.createElement("hr", null)
                    ));
                }).call(this, i);
            }

            return React.createElement(
                "div",
                { id: "playlist", "class": "paddedLess" },
                React.createElement(
                    "button",
                    { onClick: function onClick() {
                            _this3.CreatePlaylist();
                        } },
                    "Create Playlist"
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                list
            );
        }

        //Function to render the backpanel as the music player

    }, {
        key: "RenderMusic",
        value: function RenderMusic() {
            if (this.music_data == null) return "Loading...";

            if (this.music_data.length == 0) return React.createElement(
                "div",
                { id: "playlistTitle" },
                React.createElement(
                    "h1",
                    null,
                    CURRENTPLAYLISTNAME
                ),
                React.createElement(
                    "button",
                    { onClick: function onClick() {
                            ToggleExtraPanel();
                        } },
                    "Add Song"
                ),
                React.createElement("hr", null),
                React.createElement(
                    "div",
                    { "class": "left" },
                    "No songs in playlist."
                )
            );

            var playlist = [];

            //clear current playlist array
            CURRENTPLAYLIST.splice(0, CURRENTPLAYLIST.length);
            for (var i = 0; i < this.music_data.length; i++) {
                (function (ii) {
                    var id = this.music_data[ii].id;
                    var name = this.music_data[ii].name;
                    var position = this.music_data[ii].position;
                    var title = this.music_data[ii].title;
                    var artist = this.music_data[ii].artist;
                    var album = this.music_data[ii].album;
                    var year = this.music_data[ii].year;

                    //NOTE: You need to move the delete button to music interface
                    playlist.push(React.createElement(
                        "div",
                        { id: id + "_div" },
                        title,
                        React.createElement(
                            "p",
                            { "class": "subtext" },
                            artist
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    PlaySong(name, position, title, artist, album, year);
                                } },
                            "Play"
                        ),
                        React.createElement(
                            "button",
                            { disabled: true },
                            "Remove"
                        ),
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    confirmDelete(name, id);
                                } },
                            "Delete From Website?"
                        ),
                        React.createElement("hr", null)
                    ));
                    CURRENTPLAYLIST.push(name);
                }).call(this, i);
            }

            //TODO: Add title
            return React.createElement(
                "div",
                { id: "playlist" },
                React.createElement(
                    "div",
                    { id: "playlistTitle" },
                    React.createElement(
                        "h1",
                        null,
                        CURRENTPLAYLISTNAME
                    ),
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                ToggleExtraPanel();
                            } },
                        "Add Song"
                    ),
                    React.createElement("hr", null)
                ),
                React.createElement(
                    "div",
                    { "class": "padded" },
                    playlist
                )
            );
        }
    }, {
        key: "RenderUpload",
        value: function RenderUpload() {
            return React.createElement(
                "form",
                { "class": "paddedLess", target: "upload_frame", action: "upload_music.php", method: "POST", encType: "multipart/form-data" },
                React.createElement(
                    "p",
                    null,
                    "Upload your music!"
                ),
                React.createElement("input", { type: "file", accept: "audio/mp3,audio/*,audio/ogg", name: "musicFile" }),
                React.createElement("input", { type: "submit", value: "submit", name: "submit" })
            )
            //TODO: Add folder upload
            ;
        }
    }, {
        key: "CreatePlaylist",
        value: function CreatePlaylist() {
            var playlistName = prompt("Name of playlist:");

            if (playlistName != null) {
                $.ajax({
                    type: "POST",
                    url: 'create_playlist.php',
                    data: { 'name': playlistName },
                    success: function success(response) {
                        alert(response);
                    },
                    error: function error(response) {
                        alert("Error creating " + playlistName);
                    }
                });
            }
        }
    }, {
        key: "SelectPlaylist",
        value: function SelectPlaylist(id, name) {
            SetCookie("CurrentPlaylist", id + "_playlist", 1000);
            SetCookie("CurrentPlaylistName", name, 1000);
            location.replace('index.html');
        }
    }]);

    return BackPanel;
}(React.Component);

var domContainer = document.querySelector("#back_panel");
var backPanel = ReactDOM.render(E(BackPanel), domContainer);