import React, { useEffect, useState } from "react";
import { Layout, List, Card, Input } from "antd";
import config from "./config";

const { Content } = Layout;
const { Search } = Input;

export default function Home() {
  const [threads, setThreads] = useState<any>([]);

  useEffect(() => {
    getThreads();
  }, []);

  async function getThreads() {
    try {
      const response = await fetch(`${config.uri}/threads`, {
        headers: {
          apikey: config.apikey,
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }
      const threads = await response.json();
      setThreads(threads);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content style={{ margin: 16 }}>
          <Search
            placeholder="Buscar pesquisas..."
            allowClear
            enterButton="Buscar"
            size="large"
            style={{ marginBottom: 16 }}
          />
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={threads}
            renderItem={(item: any) => (
              <List.Item>
                <Card title={item.title}>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Tipo:</span>{" "}
                    {item.type}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Thread Pai:</span>{" "}
                    {item.parent_id ? item.parent_id : "Nenhum"}
                  </div>
                  <p>{item.abstract}</p>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
