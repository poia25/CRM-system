import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { BaseUser } from "../types/admin";
import { blockUser, deleteUser, TEST, unLockUser } from "../api/auth";
import {
  ExclamationCircleFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnType } from "antd/es/table";
import UserRolesModal from "../components/Modal/UserRolesModal";

interface FilterType {
  search: string;
  sortBy: string | null;
  sortOrder: string | null;
  isBlocked: boolean | null;
  limit: number;
  offset: number;
}

export const UserPage = () => {
  const [_loading, setLoading] = useState(false);
  const [data, setData] = useState<BaseUser[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: null,
    limit: 20,
    offset: 0,
  });
  const [tableParams, setTableParams] = useState<{
    pagination: TablePaginationConfig;
  }>({
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },
  });
  const navigate = useNavigate();
  const { confirm } = Modal;

  const filtersRef = useRef(filters);
  const loadingRef = useRef(false);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  const loadData = async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await TEST(filtersRef.current);
      setData(response.data.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.meta.totalAmount,
        },
      });
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  const handleTableChange = (page: number, pageSize?: number) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize: pageSize || tableParams.pagination.pageSize,
      },
    });
    if (pageSize)
      setFilters((prevFilters) => ({
        ...prevFilters,
        limit: pageSize,
        offset: page,
      }));
  };

  const roleColors = {
    USER: "purple",
    ADMIN: "blue",
    MODERATOR: "orange",
  };

  const handleGoingToProfile = (id: number) => {
    navigate(`/users/${id}`);
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue: string = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, search: newSearchValue }));
  };

  const handleEditBLocked = async (id: number, isBlocked: boolean) => {
    if (isBlocked) {
      await unLockUser(id);
      loadData();
    } else {
      await blockUser(id);
      loadData();
    }
  };

  const handleDeleteUser = async (id: number) => {
    const del = async () => {
      await deleteUser(id);
      loadData();
    };

    confirm({
      title: "Вы точно хотите удалить?",
      icon: <ExclamationCircleFilled />,
      content: "После удаления восстановить данные будет невозможно",
      okText: "Да, удалить",
      okType: "danger",
      cancelText: "Отмена",
      onOk() {
        del();
      },
    });
  };

  const handleSorterTableChange: TableProps<BaseUser>["onChange"] = (
    _pagination,
    _filters,
    sorter
  ) => {
    if ("field" in sorter)
      setFilters((prev) => {
        const newState = { ...prev };

        // Если это сброс сортировки (все поля undefined)
        if (!sorter.field && !sorter.order) {
          return {
            ...newState,
            sortBy: null,
            sortOrder: null,
            isBlocked: null, // Явно устанавливаем null при сбросе
          };
        }

        // Если сортировка по isBlocked
        if (sorter.field === "isBlocked") {
          newState.isBlocked = sorter.order === "ascend" ? true : false;
        }

        // Общие параметры сортировки
        newState.sortBy = sorter.field ? String(sorter.field) : prev.sortBy;
        newState.sortOrder = sorter.order
          ? sorter.order === "ascend"
            ? "asc"
            : "desc"
          : null;

        return newState;
      });
  };

  const columns: ColumnType<BaseUser>[] = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {text}
        </div>
      ),
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <a href={`mailto:${text}`}>
          <MailOutlined style={{ marginRight: 5 }} />
          {text}
        </a>
      ),
      sorter: true,
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text: string) => (
        <span>
          <PhoneOutlined style={{ marginRight: 5 }} />
          {text}
        </span>
      ),
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: "USER" | "ADMIN" | "MODERATOR") => (
        <Tag color={roleColors[roles]}>{roles}</Tag>
      ),
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      filters: [
        {
          text: "Active",
          value: false,
        },
        {
          text: "Blocked",
          value: true,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        if (value === null) return true;
        return record.isBlocked === value;
      },
      render: (value) =>
        value === true ? (
          <Tag color="red">Blocked</Tag>
        ) : value === false ? (
          <Tag color="green">Active</Tag>
        ) : (
          "Any"
        ),
    },
    {
      title: "Дата регистр",
      dataIndex: "date",
      key: "date",
      render: (dater: number) => {
        const date = new Date(dater);

        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
      },
    },
    {
      title: "Действия",
      key: "action",
      render: (record: BaseUser) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="default"
            onClick={() => handleGoingToProfile(record.id)}
          >
            Перейти к профилю
          </Button>
          <Button
            type="default"
            onClick={() => {
              handleEditBLocked(record.id, record.isBlocked);
            }}
          >
            {record.isBlocked ? "разблок" : "блок"}
          </Button>
          <Space>
            <UserRolesModal user={record} onSuccess={loadData} />
          </Space>
          <Button
            type="default"
            danger
            onClick={() => handleDeleteUser(record.id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ position: "absolute", left: 205, width: "80%" }}>
      <h1>Пользователи</h1>

      <Input.Search
        enterButton="Search"
        placeholder="Search by name or email"
        value={filters.search}
        allowClear
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
        onChange={handleSorterTableChange}
        sortDirections={["ascend", "descend"]} // Важно!
        showSorterTooltip={false} // Для чистоты тестирования
      />
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        current={tableParams.pagination.current}
        pageSize={tableParams.pagination.pageSize}
        total={tableParams.pagination.total}
        onChange={handleTableChange}
        showSizeChanger
        pageSizeOptions={["10", "20", "50"]}
      />
    </div>
  );
};
