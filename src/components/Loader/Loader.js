import { RingLoader } from 'react-spinners';
import css from '../styles.module.css';

export const Loader = () => {
  return (
    <div className={css.BackDrop}>
      <RingLoader color="#36d7b7" />
    </div>
  );
};
