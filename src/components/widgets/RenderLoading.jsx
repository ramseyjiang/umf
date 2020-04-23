import React from "react";
import { Spinner } from "react-bootstrap";

const RenderLoading = () => (
  <div className="text-center loading">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default RenderLoading;