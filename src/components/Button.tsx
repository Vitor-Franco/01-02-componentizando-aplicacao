import { Icon } from './Icon';

import '../styles/button.scss';
import { ButtonHTMLAttributes } from 'react';

// Interface com as informações do button.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  selected: boolean;
}

export function Button({ iconName, title, selected, ...rest }: ButtonProps) {
  return (
    // Passamos para o button todas as propriedades que vamos utilizar
    // Além de dar um spread nas informações que são default da tag <button>
    <button
      type="button"
      {...(selected && { className: 'selected' })}
      {...rest}
    >
      {/* Recebemos o icon name para varias conforme o iconName do item e 
      variamos a cor conforme selecionado ou não */}
      <Icon name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} />
      {title}
    </button>
  );
}
