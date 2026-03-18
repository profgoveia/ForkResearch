import React, { useState } from "react";
import { Layout, Form, Input, Select, Button, Row, Col, message } from "antd";
import config from "./config";

const { Content } = Layout;
const { Option } = Select;

export default function Cadastro() {
  const [form] = Form.useForm();

  async function onFinish(values: any) {
    try {
      const data = {
        owner_id: "6f7ca60d-d4db-4b84-a6be-800fa03f974a",
        ...values,
        parent_id: values.parent_id == "" ? null : values.parent_id,
      };
      console.log(data);
      const response = await fetch(`${config.uri}/threads`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          apikey: config.apikey,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }
      message.success("Thread criada com sucesso!");
    } catch (error) {
      console.error(error);
      message.error("Ocorreu um erro ao salvar")
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "16px" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={18} md={12} lg={12}>
              <Form.Item
                name="title"
                label="Título"
                rules={[{ required: true, message: "Informe o Título" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6}>
              <Form.Item
                name="type"
                label="Tipo"
                rules={[{ required: true, message: "Informe o resumo" }]}
              >
                <Select>
                  <Option value="tcc">TCC</Option>
                  <Option value="pibic">PIBIC</Option>
                  <Option value="outro">Outro</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item name="parent_id" label="Thread Pai">
                <Input placeholder="Ex: TCC anterior" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="abstract"
            label="Resumo"
            rules={[{ required: true, message: "Informe o resumo" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label={null} style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
