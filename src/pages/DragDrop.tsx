import React, { useState } from 'react';
import { Card, Row, Col, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Dummy user data with random profile images
const initialUsers = [
  { id: '1', name: 'Alice', designation: 'Frontend Dev', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', color: '#a78bfa' },
  { id: '2', name: 'Bob', designation: 'Backend Dev', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', color: '#7c3aed' },
  { id: '3', name: 'Charlie', designation: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', color: '#c4b5fd' },
  { id: '4', name: 'Diana', designation: 'QA Engineer', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', color: '#ede9fe' },
  { id: '5', name: 'Eve', designation: 'DevOps', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', color: '#6366f1' },
];

type ColumnKey = 'users' | 'project1' | 'project2' | 'project3';
type DragSource = { from: ColumnKey; index: number } | null;

const initialColumns = {
  project1: { name: 'Project 1', items: [] as typeof initialUsers },
  project2: { name: 'Project 2', items: [] as typeof initialUsers },
  project3: { name: 'Project 3', items: [] as typeof initialUsers },
};

/**
 * DragDrop page with draggable user cards and 3 project columns using native HTML5 drag-and-drop.
 */
const DragDrop: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [columns, setColumns] = useState(initialColumns);
  const [dragSource, setDragSource] = useState<DragSource>(null);

  // Handle drag start
  const handleDragStart = (from: ColumnKey, index: number) => {
    setDragSource({ from, index });
  };

  // Handle drop on a column or top row
  const handleDrop = (to: ColumnKey) => {
    if (!dragSource) return;
    const { from, index } = dragSource;
    // Drag from top row to a project column
    if (from === 'users' && to.startsWith('project')) {
      const user = users[index];
      setUsers(prev => prev.filter((_, idx) => idx !== index));
      setColumns(prev => {
        const newCol = { ...prev };
        // Prevent duplicate: only add if not already present in the column
        if (!newCol[to as keyof typeof prev].items.some(u => u.id === user.id)) {
          newCol[to as keyof typeof prev].items = [user, ...newCol[to as keyof typeof prev].items];
        }
        return newCol;
      });
    }
    // Move within or between project columns
    else if (from.startsWith('project') && to.startsWith('project')) {
      if (from === to) return; // No-op if same column
      const fromCol = columns[from as keyof typeof columns];
      const toCol = columns[to as keyof typeof columns];
      const [moved] = fromCol.items.splice(index, 1);
      // Prevent duplicate: only add if not already present
      if (!toCol.items.some(u => u.id === moved.id)) {
        toCol.items.unshift(moved);
      }
      setColumns({ ...columns });
    }
    // Move from project column back to top row
    else if (from.startsWith('project') && to === 'users') {
      const fromCol = columns[from as keyof typeof columns];
      const [moved] = fromCol.items.splice(index, 1);
      // Prevent duplicate: only add if not already present
      if (!users.some(u => u.id === moved.id)) {
        setUsers(prev => [moved, ...prev]);
      }
      setColumns({ ...columns });
    }
    setDragSource(null);
  };

  // Allow drop
  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 24 }}>
      {/* Title with full-width background strip */}
      <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ede9fe', padding: '24px 0', marginBottom: 32 }}>
        <Typography.Title level={2} style={{ color: '#7c3aed', textAlign: 'center', margin: 0 }}>Drag and Drop Team Assignment</Typography.Title>
      </div>
      {/* Top row: draggable user cards */}
      <Row
        gutter={[16, 16]}
        style={{ marginBottom: 32, minHeight: 120 }}
        onDrop={() => handleDrop('users')}
        onDragOver={allowDrop}
      >
        {users.map((user, idx) => (
          <Col key={user.id} style={{ minWidth: 200 }}>
            <Card
              hoverable
              draggable
              onDragStart={() => handleDragStart('users', idx)}
              onDragEnd={() => setDragSource(null)}
              style={{
                borderRadius: 16,
                background: user.color,
                color: '#222',
                boxShadow: '0 2px 8px #a78bfa22',
                cursor: 'grab',
                minHeight: 120, // Make card taller
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar
                  size={56}
                  src={user.avatar}
                  icon={<UserOutlined />}
                  style={{ background: '#fff', border: `3px solid ${user.color}`, color: user.color, marginRight: 8 }}
                />
                <div>
                  <Typography.Text strong style={{ fontSize: 18 }}>{user.name}</Typography.Text>
                  <div style={{ fontSize: 14 }}>{user.designation}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Bottom: 3 project columns */}
      <Row gutter={24} justify="center">
        {Object.entries(columns).map(([colId, col]) => (
          <Col xs={24} sm={8} key={colId}>
            <Card
              title={<span style={{ color: '#7c3aed', fontWeight: 600 }}>{col.name}</span>}
              style={{ minHeight: 350, borderRadius: 16, background: '#ede9fe', marginBottom: 24 }}
              onDrop={() => handleDrop(colId as ColumnKey)}
              onDragOver={allowDrop}
            >
              {col.items.length === 0 && <div style={{ color: '#aaa', textAlign: 'center', margin: 16 }}>No team members</div>}
              {col.items.map((user, idx) => (
                <div
                  key={user.id}
                  draggable
                  onDragStart={() => handleDragStart(colId as ColumnKey, idx)}
                  onDragEnd={() => setDragSource(null)}
                  style={{
                    marginBottom: 12,
                    borderRadius: 12,
                    background: user.color,
                    boxShadow: '0 2px 8px #a78bfa22',
                    cursor: 'grab',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
                    <Avatar
                      size={40}
                      src={user.avatar}
                      icon={<UserOutlined />}
                      style={{ background: '#fff', border: `2px solid ${user.color}`, color: user.color }}
                    />
                    <div>
                      <Typography.Text strong>{user.name}</Typography.Text>
                      <div style={{ fontSize: 13 }}>{user.designation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DragDrop; 