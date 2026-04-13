// Header.tsx
import './header.css'

interface HeaderProps {
  title: string;
  subTitle?: string;
}

function Header({ title, subTitle }: HeaderProps) {
  return (
    <div className="header">
      <h1>{title}</h1>
      {subTitle && <h2>{subTitle}</h2>}
    </div>
  )
}

export default Header