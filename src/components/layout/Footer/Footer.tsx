import Styles from "./Footer.module.scss"
export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerInner}>&copy; Nadia.inc</div>
    </footer>
  )
}
