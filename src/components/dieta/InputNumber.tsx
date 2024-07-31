import React from "react";
import { InputNumber, Space } from "antd";

const CountInput: React.FC = () => (
    <Space wrap>
    <InputNumber
      size="large"
      min={1}
      max={7}
      defaultValue={4}
      type='number'
      style={{ textAlign: "center" }}
    />
  </Space>
);

export default CountInput;