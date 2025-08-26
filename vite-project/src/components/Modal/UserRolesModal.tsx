import React, { useState } from 'react';
import { Modal, Button, Checkbox, Space, message } from 'antd';
import { BaseUser, Roles, UserRolesRequest } from '../../types/admin';
import { updateUserRoles } from '../../api/auth';

interface Props {
  user: BaseUser;
  onSuccess?: () => void;
}
type CheckboxValueType = string | number | boolean;

const UserRolesModal: React.FC<Props> = ({ user, onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>(user.roles || []);

  const roleOptions = [
    { label: 'Пользователь', value: Roles.USER },
    { label: 'Модератор', value: Roles.MODERATOR },
    { label: 'Администратор', value: Roles.ADMIN },
  ];

  const handleOpen = () => {
    setSelectedRoles(user.roles || []);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setLoading(false);
  };

  const handleRoleChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedRoles(checkedValues as Roles[]);
  };

  const handleSave = async () => {
    if (selectedRoles.length === 0) {
      message.error('Выберите хотя бы одну роль');
      return;
    }

    setLoading(true);
    try {
      const request: UserRolesRequest = { roles: selectedRoles };
      await updateUserRoles(user.id, request);
      
      message.success('Роли успешно обновлены');
      setVisible(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      message.error('Ошибка при обновлении ролей');
      console.error('Error updating roles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        Изменить роли
      </Button>

      <Modal
        title={`Изменение ролей пользователя: ${user.username || user.email}`}
        open={visible}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Отмена
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={loading}
            onClick={handleSave}
          >
            Сохранить
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Checkbox.Group
            options={roleOptions}
            value={selectedRoles}
            onChange={handleRoleChange}
          />
          
          {selectedRoles.length === 0 && (
            <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
              Пользователь без ролей не сможет войти в систему
            </div>
          )}
        </Space>
      </Modal>
    </>
  );
};

export default UserRolesModal;