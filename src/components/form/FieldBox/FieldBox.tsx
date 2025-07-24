import Styles from "./FieldBox.module.scss"

export default function FieldBox(props:{
  children: string | React.ReactNode;
}) {
  const {children} = props;
  return (
    <div className={Styles.fieldBox}>
      {children}
    </div>
  )
}
