import Styles from "./Pagination.module.scss";

const Pagination = () => {
    return (
        <div className={Styles.Pagination}>
            <span className={`${Styles.Back} ${Styles.InActive}`}>{`<`}</span>
            {Array.from({ length: 10 }).map((_, index) => (
                <span className={`${Styles.Pages} ${index===0 && Styles.Active}`}>{index + 1}</span>
            ))}
            <span className={`${Styles.Next} ${Styles.Active}`}>{`>`}</span>

        </div>

    );
};
export default Pagination;