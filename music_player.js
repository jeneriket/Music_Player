'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function PlaySong(music_data) {
    console.log(music_data);
    $('#Music_Player').trigger('pause');

    this.setState({ playable: true });
    this.song_position = music_data.position;
    this.ForcePlayMusic();
}

function NextSong() {
    this.NextSong();
}

var MusicPlayer = function (_React$Component) {
    _inherits(MusicPlayer, _React$Component);

    function MusicPlayer(_props) {
        _classCallCheck(this, MusicPlayer);

        var _this = _possibleConstructorReturn(this, (MusicPlayer.__proto__ || Object.getPrototypeOf(MusicPlayer)).call(this, _props));

        _this.state = { playing: false, playable: false };
        _this.song = React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'No song selected.'
            ),
            React.createElement(
                'h2',
                { 'class': 'subtext' },
                'No song selected.'
            ),
            React.createElement(
                'h3',
                { 'class': 'subtext' },
                'No song selected.'
            ),
            React.createElement(
                'h4',
                { 'class': 'subtext' },
                'No song selected.'
            ),
            React.createElement('br', null)
        );
        _this.song_position = -1;
        PlaySong = PlaySong.bind(_this);
        NextSong = NextSong.bind(_this);
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
                        'h1',
                        null,
                        CURRENTPLAYLIST[this.song_position].title
                    ),
                    React.createElement(
                        'h2',
                        { 'class': 'subtext' },
                        CURRENTPLAYLIST[this.song_position].artist
                    ),
                    React.createElement(
                        'h3',
                        { 'class': 'subtext' },
                        CURRENTPLAYLIST[this.song_position].album
                    ),
                    React.createElement(
                        'h4',
                        { 'class': 'subtext' },
                        CURRENTPLAYLIST[this.song_position].year
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { onClick: function onClick() {
                                _this2.PreviousSong();
                            } },
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
                        { onClick: function onClick() {
                                _this2.NextSong();
                            } },
                        'Next'
                    )
                );
            }

            return React.createElement(
                'div',
                null,
                this.song,
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
            MUSICPLAYER.trigger(value);
            this.forceUpdate();
        }
    }, {
        key: 'ForcePlayMusic',
        value: function ForcePlayMusic() {
            $("#progress_bar").css("width", 0);
            MUSICSOURCE.attr("src", "/uploads/" + CURRENTPLAYLIST[this.song_position].source);

            this.setState({ playing: true });
            this.forceUpdate();
            MUSICPLAYER.trigger('load');
            setTimeout(function () {
                MUSICPLAYER.trigger('play');
            }, 1000);
        }
    }, {
        key: 'NextSong',
        value: function NextSong() {

            this.song_position++;

            if (this.song_position >= CURRENTPLAYLIST.length) this.song_position = 0;

            this.song = CURRENTPLAYLIST[this.song_position].source;
            this.ForcePlayMusic();
        }
    }, {
        key: 'PreviousSong',
        value: function PreviousSong() {
            this.song_position--;

            if (this.song_position < 0) this.song_position = CURRENTPLAYLIST.length - 1;

            this.song = CURRENTPLAYLIST[this.song_position].source;
            this.ForcePlayMusic();
        }
    }]);

    return MusicPlayer;
}(React.Component);

//React object


var ES = React.createElement;

var DOMCONTAINER = document.querySelector("#player");
ReactDOM.render(ES(MusicPlayer), DOMCONTAINER);