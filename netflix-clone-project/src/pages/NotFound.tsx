import type { FC } from "react";
import { Link } from "react-router-dom";
import "./pageStyles/NotFoundPageStyles.css";
interface NotFoundProps {
  content: string;
}
const NotFound: FC<NotFoundProps> = ({
  content = "Oops... Page Not Found",
}) => {
  return (
    <div className="notFoundContainer">
      <p>{content}</p>
      <Link to={`/`} className="goBackToHomeButton">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
