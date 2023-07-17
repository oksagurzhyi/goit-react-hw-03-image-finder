import { Component } from 'react';
import css from '../styles.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { children } = this.props;
    return (
      <div className={css.Overlay} onClick={this.onBackdropClick}>
        <div className={css.Modal}>{children}</div>
      </div>
    );
  }
}
