import style from "../styles/Loading.module.css";

export const Loading = () => {
  return (
    <div className={style.preloader}>
      <div className={style.loader}></div>
    </div>
  );
};
