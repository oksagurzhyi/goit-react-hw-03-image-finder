import css from '../styles.module.css';

export function Button({ onClickBtnMore }) {
  return (
    <div className={css.Brn_wrapper}>
      <button className={css.Button} onClick={onClickBtnMore}>
        Load more
      </button>
    </div>
  );
}
