import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Pagination,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { BaseUser, Roles, UserRolesRequest } from "../types/admin";
import {
  axiosInstance,
  blockUser,
  deleteUser,
  unLockUser,
  updateUserRoles,
} from "../api/auth";
import {
  ExclamationCircleFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

interface FilterType {
  search: string;
  sortBy: string;
  sortOrder: string;
  isBlocked: boolean | null;
  limit: number;
  offset: number;
}

export const UserPage = () => {
  const [loading, setLoading] = useState(false);
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

  const loadData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      if (tableParams.pagination.current && tableParams.pagination.pageSize) {
        const response = await axiosInstance.get(
          `/admin/users?limit=${tableParams.pagination.pageSize}&offset=${tableParams.pagination.current}`
        );
        setData(response.data.data);
        setTableParams({
          pagination: {
            ...tableParams.pagination,
            total: response.data.meta.totalAmount,
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("Ошибка при загрузке профиля", error);
      setLoading(false);
      throw error;
    }
  };
  
  useEffect(() => {
    loadData();
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleTableChange = (page: number, pageSize?: number) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize: pageSize || tableParams.pagination.pageSize,
      },
    });
  };

  const roleColors = {
    USER: "purple",
    ADMIN: "blue",
    MODERATOR: "orange",
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue: string = e.target.value;
    setFilters({ ...filters, search: newSearchValue });
    const response = await axiosInstance.get(
      `/admin/users?search=${newSearchValue}`
    );
    setData(response.data.data);
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

  const handleEditUserRoles = async (id: number, data: BaseUser) => {
    try {
      const updatedRoles = [...data.roles];
      const adminIndex = updatedRoles.indexOf(Roles.ADMIN);
      if (adminIndex !== -1) {
        data.roles.splice(adminIndex, 1);
      } else {
        data.roles.push(Roles.ADMIN);
      }

      const request: UserRolesRequest = { roles: updatedRoles };

      await updateUserRoles(id, request);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterBlockUser = async (fil: string) => {
    const blockUserList = async () => {
      try {
        const response = await axiosInstance.get(`/admin/users${fil}`);
        setData(response.data.data);
      } catch (error) {
        console.log("Ошибка при загрузке профиля", error);
        throw error;
      }
    };
    blockUserList();
  };

  const handleDeleteUser = async (id: number) => {
    confirm({
      title: "Вы точно хотите удалить?",
      icon: <ExclamationCircleFilled />,
      content: "После удаления восстановить данные будет невозможно",
      okText: "Да, удалить",
      okType: "danger",
      cancelText: "Отмена",
      onOk() {
        deleteUser(id);
        loadData();
      },
    });
  };

  const fetchSortData = async (sortBy?:string, sortOrder?: 'ascend' | 'descend' | null) => {
    setLoading(true)
    try{
      const response = await axiosInstance.get(`/admin/users?sortBy=${sortBy}&sortOrder=${sortOrder}`);
      setData(response.data.data)
    }catch{
      console.log('НЕ УДАЧА')
    }finally{
      setLoading(false)
    }
  }

  const handleSorterTableChange:TableProps<BaseUser>['onChange'] = (_pagination, _filters,sorter) => {
    if('field' in sorter && 'order' in sorter){
      fetchSortData(sorter.field as string, sorter.order)
    }
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => handleFilterBlockUser("")}
        >
          Все
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => handleFilterBlockUser("?isBlocked=true")}
        >
          Заблокированные
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          style={{ cursor: "pointer", border: "none" }}
          onClick={() => handleFilterBlockUser("?isBlocked=false")}
        >
          Не Заблокированные
        </button>
      ),
    },
  ];

  const columns: TableProps<BaseUser>["columns"] = [
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
      title: (
        <Dropdown menu={{ items }}>
          <span style={{ cursor: "pointer" }}>Блокировка▽</span>
        </Dropdown>
      ),
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (blocked: boolean) => (blocked ? "Заблокирован" : "Активен"),
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
            onClick={() => navigate(`/users/${record.id}`)}
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
          <Button
            type="default"
            onClick={() => {
              handleEditUserRoles(record.id, record);
            }}
          >
            {record.roles.includes(Roles.ADMIN)
              ? "Забрать админку"
              : "Дать админку"}
          </Button>
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
