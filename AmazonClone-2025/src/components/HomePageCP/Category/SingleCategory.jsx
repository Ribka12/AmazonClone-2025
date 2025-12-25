import styles from "./category.module.css";
import { Link } from "react-router-dom";

const SingleCategory = ({ title, imglink ,name}) => {
  return (
    <Link className={styles.card} to={`/category/${name}`}>
      <span className={styles.title}>{title}</span>
      <div className={styles.imgWrapper}>
        <img className={styles.image} src={imglink} alt={title} />
      </div>

      <p>Shop NOW</p>
    </Link>
  );
};

export default SingleCategory;
