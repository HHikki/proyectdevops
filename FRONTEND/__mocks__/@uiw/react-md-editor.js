import React from "react";

const MDEditor = ({ value, onChange, ...props }) => (
  <div data-testid="md-editor">
    <textarea
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...props}
    />
  </div>
);

export default MDEditor;
