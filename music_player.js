'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function PlaySong(source) {
    $('#Music_Player').trigger('pause');

    this.song = source;
    this.setState({ playable: true });

    this.ForcePlayMusic();
}

var MusicPlayer = function (_React$Component) {
    _inherits(MusicPlayer, _React$Component);

    function MusicPlayer(_props) {
        _classCallCheck(this, MusicPlayer);

        var _this = _possibleConstructorReturn(this, (MusicPlayer.__proto__ || Object.getPrototypeOf(MusicPlayer)).call(this, _props));

        _this.state = { playing: false, playable: false };
        _this.song = "No song selected.";
        PlaySong = PlaySong.bind(_this);
        return _this;
    }

    _createClass(MusicPlayer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.state.playable) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'audio',
                        { id: 'Music_Player' },
                        React.createElement('source', { id: 'Music_Player', src: "/uploads/" + this.song })
                    ),
                    React.createElement(
                        'p',
                        null,
                        this.song
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { disabled: true },
                        'Previous'
                    ),
                    React.createElement(
                        'button',
                        { 'class': 'audio_button', onClick: function onClick() {
                                _this2.PlayPauseMusic();
                            } },
                        this.state.playing ? 'Pause' : 'Play'
                    ),
                    React.createElement(
                        'button',
                        { disabled: true },
                        'Next'
                    )
                );
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    null,
                    this.song
                ),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { disabled: true },
                    'Previous'
                ),
                React.createElement(
                    'button',
                    { 'class': 'audio_button', disabled: true },
                    'Play'
                ),
                React.createElement(
                    'button',
                    { disabled: true },
                    'Next'
                )
            );
        }
    }, {
        key: 'PlayPauseMusic',
        value: function PlayPauseMusic() {
            var value = this.state.playing ? 'pause' : 'play';
            this.setState({ playing: !this.state.playing });
            $('#Music_Player').trigger('load');
            $('#Music_Player').trigger(value);
            this.forceUpdate();
        }
    }, {
        key: 'ForcePlayMusic',
        value: function ForcePlayMusic() {
            this.setState({ playing: true });
            this.forceUpdate();
            $('#Music_Player').trigger('load');
            setTimeout(function () {
                $('#Music_Player').trigger('play');
            }, 1000);
        }
    }]);

    return MusicPlayer;
}(React.Component);

//React object


var es = React.createElement;

var domContainer = document.querySelector("#player");
var backPanel = ReactDOM.render(es(MusicPlayer), domContainer);