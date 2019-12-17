import React from "react";
import { Card } from "antd";

export default function RepoCard({ userData }) {
  return (
    <>
    {
      userData && userData.map(data => {
        return (
          <Card key={data.id} title={data.name} style={{ width: 700,  marginBottom: 30 }}>
            <p>{data.description}</p>
            <a href={data.html_url}>Repo 連結</a>
          </Card>
        )
      }) 
    }
    </>
  );
}
