import Error from "next/error";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

const CustomErrorComponent = (props: ErrorProps) => {
  // Ensure statusCode is always a number
  const statusCode = props.statusCode ?? 404;
  return <Error statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorComponent;
