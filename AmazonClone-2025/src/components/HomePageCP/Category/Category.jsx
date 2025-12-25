import React, { useEffect } from 'react'
import SingleCategory from './SingleCategory'
import styles from "./category.module.css";
import category from '../../../assets/category'

function Category() {

  return (
    <>
      <div className={styles.row}>
        {category.map((item,index) => (
          <SingleCategory
            key={index}
            {...item}
          />
        ))}
      </div>
    </>
  );
}

export default Category
