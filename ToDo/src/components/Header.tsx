interface HeaderProps {
    title: string;
    subTitle?: string;
}

function Header({title, subTitle}: HeaderProps) {
  return (
    <>
      <h1>{title}</h1>
      {subTitle && <h2>{subTitle}</h2>}
      
    </>
  )
}

export default Header
