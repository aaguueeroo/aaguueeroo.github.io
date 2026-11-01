interface LogoProps {
  name: string;
}

export const Logo = ({ name }: LogoProps) => (
  <span className="logo">
    <img className="logo__mark" src="/flatto/images/logo.png" width="96" height="96" alt="" />
    {name}
  </span>
);
