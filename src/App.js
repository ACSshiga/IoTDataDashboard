import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  // データ取得関数
  const fetchData = () => {
    fetch("https://0bdqosd2o2.execute-api.ap-northeast-1.amazonaws.com/dev/GetMessagesFromDynamoDB")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("データ取得エラー:", error));
  };

  return (
    <div>
      <h1>IoT データ表示</h1>
      <button onClick={fetchData}>データ更新</button>
      {data ? (
        data.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h2>データセット {index + 1}</h2>
            <p><strong>messageId:</strong> {item.messageId}</p>
            {item.message && <p><strong>Message:</strong> {item.message}</p>}
            {item.timestamp && <p><strong>Timestamp:</strong> {item.timestamp}</p>}
            {item.payload_raw && <p><strong>Payload Raw:</strong> {item.payload_raw}</p>}
          </div>
        ))
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
}

export default App;
