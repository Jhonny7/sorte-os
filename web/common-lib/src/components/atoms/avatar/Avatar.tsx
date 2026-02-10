import UtilService from './../../../services/UtilService';
import { useTheme } from './../../../context/ThemeContext';
import './avatar.scss'

interface IconProps {
  name: string
}

export default function Avatar({ name }: IconProps) {
  const {theme} = useTheme();
  return <section className='avatar' 
  style={{
    backgroundColor: UtilService.hexToRgbA(theme.primary, 30),
    borderColor: theme.primary
  }}>
    {(() => {
      if (!name.trim()) return '-';

      const words = name.trim().split(/\s+/);

      if (words.length >= 2) {
        const ini1 = words[0].charAt(0).toUpperCase() || '-';
        const ini2 = words[1].charAt(0).toUpperCase() || '-';
        return ini1 + ini2;
      }

      if (words.length === 1) {
        const word = words[0];
        if (word.length >= 2) {
          return word.substring(0, 2).toUpperCase();
        }
        if (word.length === 1) {
          return word.toUpperCase() + '-';
        }
      }

      return '-';
    })()}
  </section>
}
