import './header.css';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  title: string;
  subTitle?: string;
}

function Header({ title, subTitle }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>{title}</h1>
          {subTitle && <h2>{subTitle}</h2>}
        </div>
        
        <button 
          onClick={toggleTheme}
          className="theme-button"
          title={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

export default Header;