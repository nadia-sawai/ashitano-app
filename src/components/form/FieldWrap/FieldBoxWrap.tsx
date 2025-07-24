import Styles from "./FieldBoxWrap.module.scss"

export default function FieldBoxWrap(props:{
  children: string | React.ReactNode;
}) {
  const {children} = props;
  return (
    <div className={Styles.fieldBoxWrap}>
      {children}
    </div>
  )
}
