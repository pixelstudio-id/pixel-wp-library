import { getIconSVG } from '@lib/helpers.js';

export default class ReactSvgInline extends React.Component {
  constructor() {
    super();
    this.abortController = new AbortController();
    this.timer = null;
    this.state = {
      markup: null
    };
  }

  render() {
    return (this.state.markup ?
      <span className="px-svg-inline" dangerouslySetInnerHTML={{ __html: this.state.markup }} />
      :
      <span className="px-svg-inline">Icon not found</span>
    );
  }

  componentDidMount() {
    this._getMarkup(this.props.src);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.src !== prevProps.src) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this._getMarkup(this.props.src);
      }, 1000);
    }
  }

  async _getMarkup(src) {
    const iconHTML = await getIconSVG(src, false);
    this.props.onFound(iconHTML);
    this.setState({ markup: iconHTML });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }
}