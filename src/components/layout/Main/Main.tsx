import Styles from "./Main.module.scss"

type Props = {
  children: React.ReactNode
}

export default function Main({children}: Props) {
  return (
    <main  className={Styles.main}>
      {children}
    </main>
  )
}
