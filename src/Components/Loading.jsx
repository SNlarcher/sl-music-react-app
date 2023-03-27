import { Button, Spinner, Container } from "react-bootstrap";

function Loading({ children, loading }) {
  if (loading) {
    return (
      <Container style={{ maxWidth: "500px", height: "100vh" }}>
        <Button
          variant="warning"
          disabled
          style={{ width: "4vw", height: "4vw", position: "fixed", top: "40%" }}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>
      </Container>
    );
  } else {
    return <>{children}</>;
  }
}

export default Loading;
