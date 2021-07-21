
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function UpdateExtraPanel() {
    this.updating = true;
    this.forceUpdate();
}

var ExtraPanel = function (_React$Component) {
    _inherits(ExtraPanel, _React$Component);

    function ExtraPanel(_props) {
        _classCallCheck(this, ExtraPanel);

        var _this = _possibleConstructorReturn(this, (ExtraPanel.__proto__ || Object.getPrototypeOf(ExtraPanel)).call(this, _props));

        _this.updating = true;
        UpdateExtraPanel = UpdateExtraPanel.bind(_this);
        return _this;
    }

    _createClass(ExtraPanel, [{
        key: "render",
        value: function render() {
            if (this.music_data == null) {
                return "Loading Songs...";
            }

            var songs = [];

            for (var i = 0; i < this.music_data.length; i++) {
                (function (ii) {
                    var _this2 = this;

                    var name = this.music_data[ii].name;

                    //NOTE: You need to move the delete button to music interface
                    songs.push(React.createElement(
                        "div",
                        null,
                        name,
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    _this2.AddSong(_this2.music_data[ii]);
                                } },
                            "Add Song"
                        ),
                        React.createElement("hr", null)
                    ));
                }).call(this, i);
            }

            return React.createElement(
                "div",
                { id: "add_songs" },
                songs
            );
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.updating) {
                XHRRequest("/playlist_displayer.php?playlist=0_playlist", this);
                this.updating = false;
            }
        }
    }, {
        key: "AddSong",
        value: function AddSong(data) {
            $.ajax({
                type: "POST",
                url: 'add_song.php',
                data: { 'filename': data.name, 'id': data.id, playlist: CURRENTPLAYLISTID },
                success: function success(response) {
                    alert(response);
                    location.replace('index.html');
                },
                error: function error(response) {
                    alert("Error adding " + filename);
                }
            });
        }
    }]);

    return ExtraPanel;
}(React.Component);

var ep = document.querySelector("#extra_panel");
var ESY = React.createElement;
var expanel = ReactDOM.render(ESY(ExtraPanel), ep);

$("#extra_panel").css("display", "none");