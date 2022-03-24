import { useEffect, useRef, useState } from 'react';
import styles from './Carousel/Slider.module.css';
import cn from 'classnames'


const Flask = () => {
  const slider = useRef(null)

  const [flasc, setFlasc] = useState([]);
  // const [s, setS] = useState('1');

  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)
  let flascs;

  let position = 0;

  console.log(flasc);


  useEffect(async () => {
    async function getWeapon() {
      try {
        const response = await fetch('/flasc');
        if (response.ok) {
          flascs = await response.json();
          console.log(flascs);
          if (flascs.failed) {
            alert('Something went wrong')
          } else {
            console.log(flascs)
            setFlasc(flascs);

          }
        }
      } catch (e) {
        alert(e)
      }
    }
    await getWeapon()
    // script()
  }, [])

  const prevHandler = () => {
    if (position === 0){
      setPrev(true)
    } else {
      position += 300
      console.log(slider);
      slider.current.childNodes.forEach((element) => {
        element.style = `transform: translateX(${position}px)`
      })
    }
  }


  const nextHandler = () => {
    if (position <= -(flasc.length - 1) * 100) {
      setNext(true)
      setPrev(false)
    } else {
      setNext(false)
      position -= 300
      slider.current.childNodes.forEach((element) => {
        element.style = `transform: translateX(${position}px)`
      })
    }
  }
  return (  <div className={styles.Slider}>
    <div className={styles.track} ref={slider}>
      {flasc.map((el) => {
        return (
          <div className={styles.item}>{el.price}<img style={{width: '10vw'}} src={el.image} alt="" /><button>Купить</button></div>
          
        )
      })}
    </div>
    <button className={cn(styles.button, styles.button_prev)} onClick={prevHandler}>{`<`}</button>
    <button className={cn(styles.button, styles.button_next)} onClick={nextHandler}>{`>`}</button>
  </div>);
}
 
export default Flask;

