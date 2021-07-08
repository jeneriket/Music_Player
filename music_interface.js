'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MusicInterface = function (_React$Component) {
    _inherits(MusicInterface, _React$Component);

    function MusicInterface(_props) {
        _classCallCheck(this, MusicInterface);

        var _this = _possibleConstructorReturn(this, (MusicInterface.__proto__ || Object.getPrototypeOf(MusicInterface)).call(this, _props));

        _this.state = { playing: false };
        return _this;
    }

    _createClass(MusicInterface, [{
        key: "render",
        value: function render() {
            var m_Interface = "";

            m_Interface += this.MakePlayPauseButton();
            //MakeScrollBar(interface);

            //alert(m_Interface);
            return m_Interface;
        }
    }, {
        key: "MakePlayPauseButton",
        value: function MakePlayPauseButton() {
            if (this.state.playing) {
                //make pause button
            } else {
                //make play button
                return React.createElement(
                    "button",
                    { onClick: "$('#" + this.props.id + "_audio').trigger('play');" },
                    "Play"
                );
            }
        }
    }]);

    return MusicInterface;
}(React.Component);

function MakeMusicInterface(id, playli) {
    ReactDOM.render(React.createElement(MusicInterface, { id: id }), document.getElementById('back_panel'));
}

function MakePlaylist(music_data) {
    var playlistDiv = React.createElement(
        "div",
        { id: "playlist" },
        React.createElement(MusicInterface, { id: music_data[0].id })
    );
    //todo: loop to add
    return playlistDiv;
}