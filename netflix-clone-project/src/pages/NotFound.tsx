import type { FC } from "react";
import { Link } from "react-router";

interface NotFoundProps {
  content: string;
}
const NotFound: FC<NotFoundProps> = ({
  content = "Oops... Page Not Found",
}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        flexDirection: "column",
        fontSize: "50px",
      }}
    >
      <p>{content}</p>
      <Link
        to={`/`}
        style={{
          fontSize: "20px",
          border: "none",
          backgroundColor: "lightGray",
          textDecoration: "none",
          padding: "10px 10px",
          color: "black",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
