import Link from "next/link"
import styles from "./navbar.module.css" 

export default function NavBar(){
  return (
    <div className={styles.navbarContainer}>
      <ul>
        <div className={styles.leftMenu}>
          <li><Link href="/">Star Wars</Link></li>
          <li><Link href={`/pages/filmsList/`}>Movies</Link></li>
          <li><Link href={`/pages/characterList/`}>Characters</Link></li>
          <li><Link href={`/pages/planetsList/`}>Planets</Link></li>
        </div>
        <div className={styles.rightMenu}>
          <li><Link href="#">Login</Link></li>
        </div>
      </ul>
    </div>
  )
}