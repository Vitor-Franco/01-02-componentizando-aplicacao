interface HeaderProps {
  children: string;
}

export function Header(props: HeaderProps) {
  return (
    <header>
      <span className="category">
        Categoria:<span> {props.children}</span>
      </span>
    </header>
  );
}
