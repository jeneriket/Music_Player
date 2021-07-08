/*TODO:
Add cookie that keeps track of back panel state
*/

'use strict';

//React object

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

//Enum for backPanelState
var BackPanelState = {
    MyMusic: 0,
    Playlists: 1,
    Upload: 2

    //Class for back panel
};
var BackPanel = function (_React$Component) {
    _inherits(BackPanel, _React$Component);

    function BackPanel(_props) {
        _classCallCheck(this, BackPanel);

        var _this = _possibleConstructorReturn(this, (BackPanel.__proto__ || Object.getPrototypeOf(BackPanel)).call(this, _props));

        _this.playlist = null;

        //have a state for if we are viewing the playlist
        _this.currentState = BackPanelState.MyMusic;
        return _this;
    }

    _createClass(BackPanel, [{
        key: "render",
        value: function render() {
            //use different methods to render backpanel, depending on the currentstate
            switch (this.currentState) {
                case BackPanelState.Playlists:
                    return this.RenderPlaylist();
                case BackPanelState.Upload:
                    return this.RenderUpload();
                default:
                    return this.RenderMusic();
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.playlist = null;
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === 4) {
                    if (xhr.status == 200) {

                        //request successful
                        _this2.music_data = new Array();
                        var this_ = _this2;
                        eval(xhr.response);
                        _this2.forceUpdate();
                    } else {
                        if (status == "error") {
                            alert(xhr.status + " " + xhr.statusText);
                        }
                    }
                }
            });
            xhr.open("GET", "/playlist_displayer.php", true);
            xhr.send();
        }

        //Function to change the current state

    }, {
        key: "ChangeCurrentState",
        value: function ChangeCurrentState(_currentState) {
            this.currentState = _currentState;
            this.forceUpdate();
        }

        //Function to render the backpanel as a list of playlists

    }, {
        key: "RenderPlaylist",
        value: function RenderPlaylist() {

            return "Feature not ready yet!";
        }
    }, {
        key: "RenderUpload",
        value: function RenderUpload() {
            return React.createElement(
                "form",
                { action: "upload_music.php", method: "POST", encType: "multipart/form-data" },
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

        //Function to render the backpanel as the music player

    }, {
        key: "RenderMusic",
        value: function RenderMusic() {
            if (this.music_data == null) return "Loading...";
            return React.createElement(
                "div",
                { id: "playlist" },
                React.createElement(MusicInterface, { id: this.music_data[0].id })
            );
        }
    }]);

    return BackPanel;
}(React.Component);

var domContainer = document.querySelector("#back_panel");
var backPanel = ReactDOM.render(e(BackPanel), domContainer);