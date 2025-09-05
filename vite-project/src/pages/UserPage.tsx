import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { BaseUser } from "../types/admin";
import { blockUser, deleteUser, getFilterData, unLockUser } from "../api/auth";
import {
  ExclamationCircleFilled,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ColumnType } from "antd/es/table";
import UserRolesModal from "../components/Modal/UserRolesModal";
import { AppDispatch, useAppDispatch } from "../store/store";
import { useFilters } from "../components/hooks/useFilters";
import { SorterResult, SortOrder } from "antd/es/table/interface";
import { setLimit, setPagination } from "../store/authReducer";

export const UserPage = () => {
  const [data, setData] = useState<BaseUser[]>([]);
  const { filters, setSearch, setSort, totalAmount } = useFilters();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const dispatch: AppDispatch = useAppDispatch();

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
  }, [filters.limit, filters.offset]);

  const loadData = async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;

    try {
      const response = await getFilterData(filtersRef.current);
      setData(response.data.data);
      dispatch(setLimit(response.data.meta.totalAmount));
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
    } finally {
      loadingRef.current = false;
    }
  };

  const handleTableChange = (page: number, pageSize?: number) => {
    if (pageSize) {
      dispatch(setPagination({ limit: pageSize, offset: page }));
    }
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
    setSearch(newSearchValue);
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
    sorter: SorterResult<BaseUser> | SorterResult<BaseUser>[]
  ) => {
    const sorters = Array.isArray(sorter) ? sorter : [sorter];

    const activeSorter = sorters.find((item) => item.order);

    if (
      activeSorter?.field &&
      typeof activeSorter.field === "string" &&
      activeSorter.order &&
      (activeSorter.order === "ascend" || activeSorter.order === "descend")
    ) {
      const sortOrder = activeSorter.order === "ascend" ? "asc" : "desc";
      console.log(sortOrder);
      setSort(activeSorter.field as "asc" | "desc", sortOrder);
    } else {
      setSort("id", null);
    }
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
      sortOrder:
        filters.sortBy === "username"
          ? filters.sortOrder === "asc"
            ? "ascend"
            : ("descend" as SortOrder)
          : undefined,
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
      sortOrder:
        filters.sortBy === "email"
          ? filters.sortOrder === "asc"
            ? "ascend"
            : ("descend" as SortOrder)
          : undefined,
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
      render: (roles: string[]) => (
        <Space size={[0, 8]} wrap>
          {roles?.map((role) => (
            <Tag key={role} color={roleColors[role as keyof typeof roleColors]}>
              {role}
            </Tag>
          ))}
        </Space>
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
        key={`table-${filters.sortBy}-${filters.sortOrder}`}
        dataSource={data}
        pagination={false}
        rowKey="id"
        onChange={handleSorterTableChange}
        sortDirections={["ascend", "descend"]} // Важно!
        showSorterTooltip={false} // Для чистоты тестирования
      />
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        current={filters.limit}
        pageSize={filters.offset}
        total={totalAmount}
        onChange={handleTableChange}
        showSizeChanger
        pageSizeOptions={["10", "20", "50"]}
      />
    </div>
  );
};
