import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Button type="primary" onClick={() => navigate("/")}>
        На главную
      </Button>
    </div>
  );
};

export default NotFoundPage;
