import { Link } from 'react-router-dom';

interface FooterProps {
  text: JSX.Element;
  statusView: boolean;
}

export default function Footer({ text, statusView }: FooterProps) {
  return (
    <footer>
      <div className="footer">
        {statusView ? (
          <Link to="/schedule">{text}</Link>
        ) : (
          <Link to="/status">{text}</Link>
        )}
      </div>
    </footer>
  );
}
